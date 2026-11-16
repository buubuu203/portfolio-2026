"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";
import { JOB_DESCRIPTION_MAX_LENGTH, JOB_DESCRIPTION_MIN_LENGTH, type FitCheckResult } from "@/lib/fitCheck";

const verdictColor: Record<string, string> = {
  "Strong fit": "text-[var(--accent)]",
  "Good fit": "text-[var(--accent)]",
  "Partial fit": "text-[var(--text-secondary)]",
  "Not a fit": "text-[var(--text-tertiary)]",
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
          className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
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
      className="glass flex items-center gap-3 px-6 py-5 text-[var(--text-secondary)]"
      style={{ borderRadius: "var(--radius-inner)" }}
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
          className={cn("absolute h-1.5 w-1.5 rounded-full", i % 3 === 0 ? "bg-[var(--text-tertiary)]" : "bg-[var(--accent)]")}
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
      <form
        onSubmit={handleSubmit}
        className="glass"
        style={{ borderRadius: "var(--radius-card)", padding: 32, display: "flex", flexDirection: "column", gap: 18 }}
      >
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <label htmlFor="jd" className="text-[17px] font-semibold">Job description</label>
          <span className="text-[15px] font-semibold tabular-nums text-[var(--text-secondary)]">
            {jobDescription.trim().length}/{JOB_DESCRIPTION_MAX_LENGTH}
          </span>
        </div>
        <textarea
          id="jd"
          rows={10}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          maxLength={JOB_DESCRIPTION_MAX_LENGTH}
          placeholder="Paste a job description here..."
          className="field w-full text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
          style={{ resize: "vertical" }}
        />
        <div className="flex items-center gap-4 flex-wrap">
          <Button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Check fit"}
          </Button>
          {loading && (
            <span className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-[var(--text-secondary)]">
              <span
                className="inline-block h-[18px] w-[18px] rounded-full"
                style={{
                  border: "3px solid rgba(29,29,31,.2)",
                  borderTopColor: "#1d1d1f",
                  animation: "spin .8s linear infinite",
                }}
              />
              Reading the job description…
            </span>
          )}
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
            className="text-sm text-red-600"
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
            className="glass flex flex-col gap-5"
            style={{ borderRadius: "var(--radius-card)", padding: 32 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="squircle squircle-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></svg>
              </span>
              <div className="flex items-baseline gap-3 flex-1">
                <span className="relative inline-block">
                  {flourish === "burst" && <ConfettiBurst />}
                  <motion.span
                    className={cn("text-[24px] font-bold tracking-tight", verdictColor[result.verdict] ?? "text-[var(--text-primary)]")}
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
                  </motion.span>
                </span>
                <span className="text-[15px] font-semibold tabular-nums text-[var(--text-secondary)]">
                  <AnimatedCounter value={Math.max(0, Math.min(100, result.score))} suffix="/100" duration={1} />
                </span>
              </div>
            </div>

            <div className="h-[6px] w-full overflow-hidden rounded-[3px] bg-[rgba(29,29,31,.14)]">
              <motion.div
                className="h-full rounded-[3px] bg-gradient-to-r from-[#5c5c63] to-[#1d1d1f]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(100, result.score))}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div style={{ borderRadius: 20, background: "rgba(255,255,255,.22)", border: "1px solid rgba(255,255,255,.55)", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <p className="text-[13px] font-semibold uppercase tracking-[.05em] text-[var(--text-secondary)]" style={{ margin: 0 }}>Verdict</p>
              <p className="text-[var(--text-secondary)]" style={{ margin: 0 }}>{result.summary}</p>
            </div>

            {result.strengths.length > 0 && (
              <div style={{ borderRadius: 20, background: "rgba(255,255,255,.22)", border: "1px solid rgba(255,255,255,.55)", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                <p className="text-[13px] font-semibold uppercase tracking-[.05em] text-[var(--text-secondary)]" style={{ margin: 0 }}>Where it lines up</p>
                <ul className="flex flex-col gap-2">
                  {result.strengths.map((s, i) => (
                    <motion.li
                      key={s}
                      className="flex gap-2.5 text-[var(--text-secondary)]"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {result.gaps.length > 0 && (
              <div style={{ borderRadius: 20, background: "rgba(255,255,255,.22)", border: "1px solid rgba(255,255,255,.55)", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                <p className="text-[13px] font-semibold uppercase tracking-[.05em] text-[var(--text-secondary)]" style={{ margin: 0 }}>Where it does not</p>
                <ul className="flex flex-col gap-2">
                  {result.gaps.map((g, i) => (
                    <motion.li
                      key={g}
                      className="flex gap-2.5 text-[var(--text-tertiary)]"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.15 + (result.strengths.length + i) * 0.08 }}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
                      {g}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={() => { setResult(null); setJobDescription(""); }}
                className="ghost spring-hover"
                style={{ cursor: "pointer" }}
              >
                Check another
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
