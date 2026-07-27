import { Type } from "@google/genai";
import { identity, education, skills, experience } from "@/content/profile";

export const JOB_DESCRIPTION_MIN_LENGTH = 40;
export const JOB_DESCRIPTION_MAX_LENGTH = 6000;

export type FitCheckResult = {
  verdict: string;
  score: number;
  strengths: string[];
  gaps: string[];
  summary: string;
};

export const fitCheckResponseSchema = {
  type: Type.OBJECT,
  properties: {
    verdict: {
      type: Type.STRING,
      enum: ["Strong fit", "Good fit", "Partial fit", "Not a fit"],
    },
    score: { type: Type.NUMBER },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    gaps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    summary: { type: Type.STRING },
  },
  required: ["verdict", "score", "strengths", "gaps", "summary"],
};

function buildCandidateProfile(): string {
  const experienceBlock = experience
    .map((role) => {
      const metrics = role.metrics.map((m) => `${m.prefix ?? ""}${m.value}${m.suffix ?? ""} ${m.label}`).join(", ");
      return [
        `- ${role.title} @ ${role.company} (${role.period}) — ${role.role}`,
        `  ${role.summary.replace(/\*\*/g, "")}`,
        ...role.highlights.map((h) => `  * ${h.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}`),
        metrics ? `  Metrics: ${metrics}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  return `Candidate: ${identity.name}
Current role: ${identity.heroHeadline} (${identity.heroEyebrow})
Location: ${identity.location}

Education: ${education.degree}, ${education.school} (${education.period}), GPA ${education.gpa}, ${education.ielts}

Methods: ${skills.methods.join("; ")}
Tools: ${skills.tools.join(", ")}
Languages: ${skills.languages.join(", ")}

Experience:
${experienceBlock}`;
}

export function buildFitCheckSystemInstruction(): string {
  return `You are a blunt, credible hiring-fit analyst embedded in ${identity.name}'s portfolio site. A visitor pastes a job description; you compare it against the candidate profile below and judge fit honestly — you are not a marketing tool, and an all-positive verdict on every job is not credible. Call out real gaps when they exist.

CANDIDATE PROFILE:
${buildCandidateProfile()}

Respond only with JSON matching the required schema. Rules:
- "score" is 0-100, calibrated: below 40 means largely unrelated field/seniority, 40-65 means partial overlap with real gaps, 65-85 means solid overlap, above 85 means very strong alignment.
- "strengths": 2-4 concrete, specific bullets tying the candidate's actual experience to this specific job description. No generic filler.
- "gaps": 0-3 concrete bullets on what's missing or mismatched (seniority, domain, a specific required skill). Leave empty only if genuinely no meaningful gap exists.
- "summary": 2-3 sentences, written for the person who pasted the JD (e.g. a recruiter), plain and direct.
- Do not invent candidate experience that isn't in the profile above.`;
}
