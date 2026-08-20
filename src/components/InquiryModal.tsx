"use client";

import { useState } from "react";

/**
 * Name/email/phone lead capture, used by Help You Prompt's CTA. No
 * backend wired yet — submission destination is an open build-plan
 * decision (reuse PakGud's Vercel-function-to-Notion pattern). This is
 * the UI only, onSubmit just closes the modal for now.
 */
export default function InquiryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-black border border-white/20 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <p className="text-white">Got it, we&rsquo;ll be in touch.</p>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              required
              placeholder="Name"
              className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-accent outline-none"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-accent outline-none"
            />
            <input
              required
              type="tel"
              placeholder="Phone number"
              className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-accent outline-none"
            />
            <button
              type="submit"
              className="mt-2 bg-accent text-black py-2 font-medium hover:opacity-90 transition-opacity"
            >
              Send
            </button>
          </form>
        )}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
