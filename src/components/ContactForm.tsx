"use client";

import { useState } from "react";

// Wired to /api/inquiry -> Notion, 2026-08-24 (was previously a fake
// submit that just flipped local state, see the build log for the
// backend decision this settles). Help You Prompt's InquiryModal has
// the same unresolved-backend note in PromptBuilder.tsx -- out of
// scope here, "the Web form" meant this one specifically.
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  if (status === "done") {
    return <p className="text-white">Got it, we&rsquo;ll be in touch.</p>;
  }

  return (
    <form
      className="flex flex-col gap-4 max-w-md"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("submitting");
        setError(null);

        const form = e.currentTarget;
        const data = new FormData(form);
        const payload = {
          name: data.get("name")?.toString() ?? "",
          email: data.get("email")?.toString() ?? "",
          phone: data.get("phone")?.toString() ?? "",
          message: data.get("message")?.toString() ?? "",
        };

        try {
          const res = await fetch("/api/inquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body.error || "Something went wrong.");
          }
          setStatus("done");
        } catch (err) {
          setStatus("error");
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      }}
    >
      <input
        required
        name="name"
        placeholder="Name"
        className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-accent outline-none"
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Email"
        className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-accent outline-none"
      />
      <input
        required
        type="tel"
        name="phone"
        placeholder="Phone number"
        className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-accent outline-none"
      />
      <textarea
        name="message"
        placeholder="What are you working on?"
        rows={4}
        className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-accent outline-none resize-none"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 bg-accent text-black py-2 font-medium hover:opacity-90 transition-opacity w-fit px-8 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
