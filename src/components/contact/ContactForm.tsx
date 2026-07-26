"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { identity } from "@/content/profile";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = { name: "", email: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!EMAIL_REGEX.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sending message...");

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

      await emailjs.send(
        serviceId,
        templateAutoReply,
        {
          to_name: form.name,
          to_email: form.email,
          message: "Thank you for reaching out. I'll get back to you soon.",
          from_name: identity.name,
        },
        publicKey
      );

      toast.success("Message sent. I'll get back to you soon.", { id: toastId });
      setForm(initialForm);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-4 py-12"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background"
              aria-hidden
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10.5L8 14.5L16 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <p className="text-lg font-medium">Message sent.</p>
            <p className="text-foreground/60">Thanks for reaching out — I&apos;ll reply soon.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground/70">Full name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="rounded-lg border border-foreground/15 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground/70">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="rounded-lg border border-foreground/15 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground/70">Message</span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What are you reaching out about?"
                className="rounded-lg border border-foreground/15 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-accent"
              />
            </label>

            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? "Sending..." : "Send message"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
