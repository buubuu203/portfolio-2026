import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import {
  buildFitCheckSystemInstruction,
  fitCheckResponseSchema,
  JOB_DESCRIPTION_MAX_LENGTH,
  JOB_DESCRIPTION_MIN_LENGTH,
  type FitCheckResult,
} from "@/lib/fitCheck";

const RATE_LIMIT_MAX_REQUESTS = 8;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// Best-effort only — resets on cold start since serverless instances aren't persistent.
const requestLog = new Map<string, number[]>();
const MAX_TRACKED_IPS = 1000;
let lastCleanup = Date.now();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (now - lastCleanup > RATE_LIMIT_WINDOW_MS || requestLog.size > MAX_TRACKED_IPS) {
    for (const [key, ts] of requestLog) {
      const fresh = ts.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (fresh.length === 0) requestLog.delete(key);
      else requestLog.set(key, fresh);
    }
    lastCleanup = now;
  }

  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a bit." },
      { status: 429 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set.");
    return NextResponse.json({ error: "Fit check is not configured yet." }, { status: 500 });
  }

  let jobDescription: unknown;
  try {
    const body = await request.json();
    jobDescription = body?.jobDescription;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof jobDescription !== "string") {
    return NextResponse.json({ error: "jobDescription is required." }, { status: 400 });
  }

  const trimmed = jobDescription.trim();
  if (trimmed.length < JOB_DESCRIPTION_MIN_LENGTH) {
    return NextResponse.json(
      { error: `Paste a bit more of the job description (at least ${JOB_DESCRIPTION_MIN_LENGTH} characters).` },
      { status: 400 }
    );
  }
  if (trimmed.length > JOB_DESCRIPTION_MAX_LENGTH) {
    return NextResponse.json(
      { error: `That's too long — please paste under ${JOB_DESCRIPTION_MAX_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const MODELS = ["gemini-2.0-flash", "gemini-3.5-flash-lite", "gemini-3.8-flash"] as const;
  let lastError: unknown;

  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: `Job description to evaluate:\n\n${trimmed}`,
          config: {
            systemInstruction: buildFitCheckSystemInstruction(),
            responseMimeType: "application/json",
            responseSchema: fitCheckResponseSchema,
            maxOutputTokens: 4096,
            thinkingConfig: { thinkingBudget: 0 },
          },
        });

        const finishReason = response.candidates?.[0]?.finishReason;
        if (finishReason === "MAX_TOKENS") {
          throw new Error("Model response was truncated (hit maxOutputTokens).");
        }

        const text = response.text;
        if (!text) {
          throw new Error("Empty response from model.");
        }

        const result = JSON.parse(text) as FitCheckResult;
        return NextResponse.json(result);
      } catch (err) {
        lastError = err;
        const isRetryable =
          err instanceof Error &&
          /503|UNAVAILABLE|high demand|overloaded|rate.?limit|429|RESOURCE_EXHAUSTED/i.test(err.message);

        if (isRetryable && attempt < 2) {
          console.warn(`Fit check ${model} attempt ${attempt} hit 503, retrying...`);
          await new Promise((resolve) => setTimeout(resolve, attempt * 800));
          continue;
        }
        if (isRetryable) {
          console.warn(`${model} unavailable, trying next model...`);
        }
        break;
      }
    }
  }

  console.error("Fit check generation failed:", lastError);
  const isRetryableError =
    lastError instanceof Error &&
    /503|UNAVAILABLE|high demand|overloaded|rate.?limit|429|RESOURCE_EXHAUSTED/i.test(lastError.message);
  return NextResponse.json(
    {
      error: isRetryableError
        ? "The AI model is experiencing high demand right now. Please try again in a minute."
        : "Couldn't analyze that right now. Please try again.",
    },
    { status: 502 }
  );
}
