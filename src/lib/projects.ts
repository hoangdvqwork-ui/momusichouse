// Placeholder project data, mirrors the Work section content plan in
// automation-os/.claude/skills/momusic-content/modes/website-copy.md.
// Replace with real Sanity data once that project exists (blocked, see
// build plan). Years left "—" where not confirmed anywhere in this
// system rather than guessed; legacy projects' years come from the old
// sheet Hoàng shared.

export type Category =
  | "Commercial & TVC Scoring"
  | "Brand Sound & Sonic Identity"
  | "Talent Booking & Artist Collaboration"
  | "Live Event & Music Direction";

export type Project = {
  slug: string;
  name: string;
  year: string;
  category: Category;
};

export const PROJECTS: Project[] = [
  { slug: "omo-matic", name: "Omo Matic: Sạch siêu bẩn, sáng chuyện hay", year: "2022", category: "Commercial & TVC Scoring" },
  { slug: "vpbank-khoai-lang-thang", name: "VPBank x Khoai Lang Thang", year: "2022", category: "Commercial & TVC Scoring" },
  { slug: "sony-vietnam-tet", name: "Sony Vietnam: Đón Sony, đón Tết về", year: "2022", category: "Commercial & TVC Scoring" },
  { slug: "vinfast-e-scooter", name: "Vinfast E-Scooter", year: "2020", category: "Commercial & TVC Scoring" },

  { slug: "wwf-pizza-4ps", name: "WWF Vietnam x Pizza 4P's: A Date With The Earth", year: "—", category: "Brand Sound & Sonic Identity" },
  { slug: "lost-and-found", name: "Lost & Found: Sunlife Delasol Sound Design", year: "—", category: "Brand Sound & Sonic Identity" },
  { slug: "audemars-piguet-grand-opening", name: "Audemars Piguet Grand Opening", year: "—", category: "Brand Sound & Sonic Identity" },

  { slug: "x-men-real-men", name: "X-Men x HIEUTHUHAI x Anh Tú: Real Men", year: "2022", category: "Talent Booking & Artist Collaboration" },

  { slug: "rue-miche-2-pulse", name: "Rue Miche 2 PULSE", year: "—", category: "Live Event & Music Direction" },
  { slug: "rue-miche-orbit", name: "Rue Miche ORBIT", year: "—", category: "Live Event & Music Direction" },
  { slug: "kimmese-1st-concert", name: "For Me'se: Kimmese 1st Concert", year: "—", category: "Live Event & Music Direction" },
];
