"use client";

import { useState } from "react";
import InquiryModal from "./InquiryModal";

/**
 * Mad-lib sentence builder. Word-bank content is sourced from
 * automation-os/.claude/skills/momusic-content/reference/
 * prompt-builder-words.md — Feeling/Adjectives are a curated subset of
 * the venture's real glossary terms, not invented placeholders. Keep
 * this array in sync with that file if it changes. Click a card to
 * cycle to the next option — a simpler stand-in for "connect the cards"
 * than full drag-and-drop, revisit if the real interaction needs to be
 * literally draggable.
 */

function Card({
  options,
  value,
  onNext,
}: {
  options: string[];
  value: number;
  onNext: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onNext}
      className="inline-flex items-center justify-center rounded-md bg-accent px-3 py-1 mx-1 text-black hover:brightness-95 transition-[filter] align-baseline"
    >
      {options[value]}
    </button>
  );
}

const ASSET_TYPES = ["jingle", "sonic logo", "theme song", "score", "sound design"];
// Feeling/Adjectives: glossary.md's English terms, see prompt-builder-words.md
const FEELINGS = ["warm", "cold", "bright", "dark", "intimate", "expansive", "premium", "authentic"];
const ADJECTIVES = ["distinctive", "catchy", "raw", "polished", "organic", "refined", "youthful", "sophisticated", "restrained", "subtle"];
const MEDIUMS = ["social media", "TV", "livestream", "OOH", "film", "in-store"];
const USAGE_LENGTHS = ["3 months", "6 months", "1 year", "perpetual"];
const TERRITORIES = ["Vietnam", "Worldwide"];
const EXTRAS = ["a cutdown", "a derivative"];

export default function PromptBuilder() {
  const [asset, setAsset] = useState(0);
  const [feeling, setFeeling] = useState(0);
  const [adj1, setAdj1] = useState(0);
  const [adj2, setAdj2] = useState(1);
  const [adj3, setAdj3] = useState(2);
  const [duration, setDuration] = useState("");
  const [medium, setMedium] = useState(0);
  const [usage, setUsage] = useState(0);
  const [territory, setTerritory] = useState(0);
  const [extraOn, setExtraOn] = useState(false);
  const [extra, setExtra] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const cycle = (setter: (fn: (v: number) => number) => void, len: number) =>
    setter((v) => (v + 1) % len);

  const [copied, setCopied] = useState(false);

  function buildPromptText() {
    let text = `I want to make ${ASSET_TYPES[asset]} that describes the feeling of ${FEELINGS[feeling]}. Make it ${ADJECTIVES[adj1]}, ${ADJECTIVES[adj2]}, ${ADJECTIVES[adj3]} and last ${duration || "___"}. It will be used in ${MEDIUMS[medium]} and needs to be licensed for ${USAGE_LENGTHS[usage]} in ${TERRITORIES[territory]}.`;
    if (extraOn) text += ` It needs ${EXTRAS[extra]}.`;
    return text;
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildPromptText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard permission denied or unavailable, fail quietly
    }
  }

  return (
    <div className="max-w-3xl">
      <p className="text-2xl md:text-4xl leading-relaxed text-white font-[family-name:var(--font-display-h2h3)]">
        I want to make{" "}
        <Card options={ASSET_TYPES} value={asset} onNext={() => cycle(setAsset, ASSET_TYPES.length)} />
        that describes the feeling of{" "}
        <Card options={FEELINGS} value={feeling} onNext={() => cycle(setFeeling, FEELINGS.length)} />
        . Make it{" "}
        <Card options={ADJECTIVES} value={adj1} onNext={() => cycle(setAdj1, ADJECTIVES.length)} />,{" "}
        <Card options={ADJECTIVES} value={adj2} onNext={() => cycle(setAdj2, ADJECTIVES.length)} />,{" "}
        <Card options={ADJECTIVES} value={adj3} onNext={() => cycle(setAdj3, ADJECTIVES.length)} /> and
        last{" "}
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="15s"
          className="w-20 mx-1 rounded-md border border-white/30 bg-transparent px-2 py-1 text-white text-2xl md:text-4xl placeholder:text-white/30 focus:border-accent outline-none"
        />
        . It will be used in{" "}
        <Card options={MEDIUMS} value={medium} onNext={() => cycle(setMedium, MEDIUMS.length)} />
        and needs to be licensed for{" "}
        <Card options={USAGE_LENGTHS} value={usage} onNext={() => cycle(setUsage, USAGE_LENGTHS.length)} />
        in{" "}
        <Card options={TERRITORIES} value={territory} onNext={() => cycle(setTerritory, TERRITORIES.length)} />
        .
      </p>

      <button
        type="button"
        onClick={() => setExtraOn((v) => !v)}
        className="mt-6 text-white/40 text-lg hover:text-white/60 transition-colors"
      >
        {extraOn ? (
          <>
            It needs{" "}
            <Card options={EXTRAS} value={extra} onNext={() => cycle(setExtra, EXTRAS.length)} />.
          </>
        ) : (
          "+ It needs a cutdown or derivative"
        )}
      </button>

      <div className="mt-16 flex items-center gap-6">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="text-white text-sm underline underline-offset-4 hover:text-accent transition-colors"
        >
          Send your inquires now
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="text-white/60 text-sm underline underline-offset-4 hover:text-accent transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <InquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
