"use client";

import { useState } from "react";

// Same field set and same open backend question as Help You Prompt's
// InquiryModal (see build plan blocker: lead-form backend not decided).
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <p className="text-white">Got it, we&rsquo;ll be in touch.</p>;
  }

  return (
    <form
      className="flex flex-col gap-4 max-w-md"
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
      <textarea
        placeholder="What are you working on?"
        rows={4}
        className="bg-transparent border border-white/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-accent outline-none resize-none"
      />
      <button
        type="submit"
        className="mt-2 bg-accent text-black py-2 font-medium hover:opacity-90 transition-opacity w-fit px-8"
      >
        Send
      </button>
    </form>
  );
}
