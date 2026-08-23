"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/help-you-prompt", label: "Help You Prompt" },
  { href: "/talents", label: "Talents" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 px-6 md:px-10 py-6 flex items-center justify-between z-50">
      {/* fixed, not `sticky`/`relative`: the hero (and the Talents index
          page) are meant to be genuinely full-bleed, extending under the
          nav from y=0, with the nav floating transparently on top the
          whole time, at rest and while scrolling/snapping — not reserving
          its own flow space above them (that reserved space was reading
          as a solid black bar sitting on top of the dot-grid, since
          nothing was drawn behind it). Every other page compensates with
          top padding sized to clear the nav's real height, see each
          page's pt-32. */}
      <Link href="/" onClick={() => setOpen(false)}>
        <Image
          src="/logo/Mo_logo_white.svg"
          alt="Mõ Music House"
          width={48}
          height={16}
          priority
        />
      </Link>

      {/* Desktop: plain horizontal link row, white text only, no box */}
      <nav className="hidden md:flex items-center gap-8">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white text-sm tracking-wide hover:text-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile: hamburger, not specified in the brief, default pattern */}
      <button
        type="button"
        className="md:hidden text-white text-sm"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-black flex flex-col gap-6 px-6 py-8 rounded-b-2xl">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-lg"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
