"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { identity } from "@/content/profile";

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = { name: "", email: "", message: "" };

const inputClass =
  "glass w-full px-4 py-3 text-[15px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]/50 focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 focus-visible:ring-offset-0 transition-shadow duration-200";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, a valid email and a message.");
      return;
    }

    if (!EMAIL_REGEX.test(form.email)) {
      setError("Please fill in your name, a valid email and a message.");
      return;
    }

    setLoading(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateReceive = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_RECEIVE;
      const templateAutoReply = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_AUTOREPLY;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateReceive || !templateAutoReply || !publicKey) {
        throw new Error("Missing EmailJS environment variables.");
      }

      await emailjs.send(
        serviceId,
        templateReceive,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: identity.name,
          to_email: identity.email,
        },
        publicKey
      );

      emailjs.send(
        serviceId,
        templateAutoReply,
        {
          to_name: form.name,
          to_email: form.email,
          message: "Thank you for reaching out. I'll get back to you soon.",
          from_name: identity.name,
        },
        publicKey
      ).catch(() => {});

      setForm(initialForm);
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendAnother = () => {
    setSent(false);
    setForm(initialForm);
    setError(null);
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-5"
          style={{ minHeight: 300, justifyContent: "center" }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex h-16 w-16 items-center justify-center"
            style={{ borderRadius: 20, background: "linear-gradient(145deg,#7a7a82,#2c2c30)" }}
            aria-hidden
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </motion.div>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
            Message sent.
          </h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.4, color: "var(--text-secondary)" }}>
            Thanks, I will get back to you soon.
          </p>
          <button
            type="button"
            onClick={handleSendAnother}
            className="glass spring-hover rounded-full px-5 py-[10px] text-[15px] font-semibold text-[var(--text-primary)]"
          >
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-[18px]"
          noValidate
        >
          <label className="flex flex-col gap-2">
            <span className="text-[15px] font-semibold text-[var(--text-secondary)]">Full name</span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              aria-label="Full name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClass}
              style={{ borderRadius: 28 }}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[15px] font-semibold text-[var(--text-secondary)]">Email address</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              aria-label="Email address"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass}
              style={{ borderRadius: 28 }}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[15px] font-semibold text-[var(--text-secondary)]">Message</span>
            <textarea
              rows={6}
              name="message"
              required
              aria-label="Message"
              value={form.message}
              onChange={handleChange}
              placeholder="What are you reaching out about?"
              className={inputClass}
              style={{ borderRadius: 28, resize: "vertical" }}
            />
          </label>

          {error && (
            <p
              className="text-[15px] font-semibold"
              style={{ background: "rgba(255,255,255,.5)", borderRadius: 14, padding: "10px 14px", margin: 0, color: "#dc2626" }}
              role="alert"
            >
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="mt-1">
            {loading ? "Sending..." : "Send message"}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
