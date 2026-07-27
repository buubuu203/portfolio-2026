"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";
import { JOB_DESCRIPTION_MAX_LENGTH, JOB_DESCRIPTION_MIN_LENGTH, type FitCheckResult } from "@/lib/fitCheck";

const verdictColor: Record<string, string> = {
  "Strong fit": "text-accent",
  "Good fit": "text-accent",
  "Partial fit": "text-foreground/70",
  "Not a fit": "text-foreground/50",
};

const verdictFlourish: Record<string, "burst" | "wobble" | "shake" | undefined> = {
  "Strong fit": "burst",
  "Good fit": "burst",
  "Partial fit": "wobble",
  "Not a fit": "shake",
};

const loadingMessages = [
  "Reading the job description twice, like a good PM would...",
  "Cross-referencing against 30+ shipped features...",
  "Checking what \"fast-paced environment\" actually means here...",
  "Politely interrogating the requirements section...",
  "Pulling up the GA4 dashboards for backup...",
  "Making sure this isn't just \"wears many hats\" in disguise...",
  "Running the fit math (no spreadsheet required)...",
];

const springPop: Transition = { type: "spring", bounce: 0.45, duration: 0.6 };

function ThinkingDots() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <span className="flex gap-1.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

function LoadingPanel() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % loadingMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-3 rounded-2xl border border-foreground/10 px-6 py-5 text-foreground/60"
    >
      <ThinkingDots />
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-sm"
        >
          {loadingMessages[messageIndex]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

function ConfettiBurst() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  const pieces = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 34 + ((i * 7) % 24);
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, delay: (i % 4) * 0.03 };
  });

  return (
    <div className="pointer-events-none absolute -left-1 -top-1 h-4 w-4" aria-hidden>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className={cn("absolute h-1.5 w-1.5 rounded-full", i % 3 === 0 ? "bg-foreground/40" : "bg-accent")}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
          transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function FitCheckForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FitCheckResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = jobDescription.trim();
    if (trimmed.length < JOB_DESCRIPTION_MIN_LENGTH) {
      setError(`Paste a bit more of the job description (at least ${JOB_DESCRIPTION_MIN_LENGTH} characters).`);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/fit-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setResult(data as FitCheckResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const flourish = result ? verdictFlourish[result.verdict] : undefined;

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground/70">Job description</span>
          <textarea
            rows={10}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            maxLength={JOB_DESCRIPTION_MAX_LENGTH}
            placeholder="Paste a job description here..."
            className="rounded-lg border border-foreground/15 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
          />
        </label>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-foreground/40">
            {jobDescription.trim().length}/{JOB_DESCRIPTION_MAX_LENGTH}
          </p>
          <Button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Check fit"}
          </Button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {loading && <LoadingPanel />}

        {!loading && error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}

        {!loading && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 rounded-2xl border border-foreground/15 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="relative inline-block">
                {flourish === "burst" && <ConfettiBurst />}
                <motion.p
                  className={cn("text-2xl font-black tracking-tight", verdictColor[result.verdict] ?? "text-foreground")}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: flourish === "shake" ? [0, -6, 6, -4, 4, 0] : 0,
                    rotate: flourish === "wobble" ? [0, -3, 3, -2, 2, 0] : 0,
                  }}
                  transition={{
                    default: { ...springPop, delay: 0.1 },
                    x: flourish === "shake" ? { duration: 0.5, delay: 0.1, ease: "easeInOut" } : undefined,
                    rotate: flourish === "wobble" ? { duration: 0.5, delay: 0.1, ease: "easeInOut" } : undefined,
                  }}
                >
                  {result.verdict}
                </motion.p>
              </span>
              <p className="text-sm font-medium text-foreground/50">
                <AnimatedCounter value={Math.max(0, Math.min(100, result.score))} suffix="/100" duration={1} />
              </p>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(100, result.score))}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <p className="text-foreground/70">{result.summary}</p>

            {result.strengths.length > 0 && (
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-foreground/50">Strengths</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {result.strengths.map((s, i) => (
                    <motion.li
                      key={s}
                      className="flex gap-2.5 text-foreground/80"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {result.gaps.length > 0 && (
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-foreground/50">Gaps</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {result.gaps.map((g, i) => (
                    <motion.li
                      key={g}
                      className="flex gap-2.5 text-foreground/60"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.15 + (result.strengths.length + i) * 0.08 }}
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-foreground/30" aria-hidden />
                      {g}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
