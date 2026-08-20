// One-off seed script for the remaining 28 projects that have real
// credit info (client/agency/producer) but NO documented story, only
// "Chưa có Description" or a bare credit line in the source material.
// Per Hoàng's explicit instruction, drafted anyway with placeholder
// case-study text rather than fabricated narrative — the difference
// matters: placeholder text is understood by everyone as filler, a
// fabricated "why we did it this way" would not be. Categories/personas
// here are best guesses from client type alone, not from a real brief,
// flagged as such in the placeholder text itself.
//
// Run via:
//   npx sanity@latest exec scripts/seed-projects-placeholder.mjs --with-user-token
//
// Draft-and-hold: Sanity DRAFTS only. These are especially not ready to
// publish, more so than the other batches, don't treat "seeded" as
// "reviewed."
import { getCliClient } from "sanity/cli";

const client = getCliClient();

function placeholderBlock() {
  return {
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        text: "Case study copy not written yet, no documented story exists for this project beyond the credit line below. Category assignment is a best guess from client type, not a real brief. Needs an intake conversation before this is ready for real copy, let alone publishing.",
      },
    ],
  };
}

const projects = [
  // --- 9 old-sheet rows with "Chưa có Description" / blank narrative ---
  { slug: "tlinh-hoang-ton", name: "tlinh x Hoàng Tôn", year: "2022", category: "Talent Booking & Artist Collaboration", credit: "Project Management: Mõ Music House." },
  { slug: "surf-bigsync", name: "Surf x BigSync", year: "2022", category: "Commercial & TVC Scoring", credit: "Music Production/Composing: Mõ Music House. Client: Unilever Vietnam (Surf)." },
  { slug: "kasho-oceanmob", name: "Kasho x OceanMOB", year: "2022", category: "Talent Booking & Artist Collaboration", credit: "Talent Booking: Mõ Music House. Artists: OceanMOB (Will, XOLITXO, wAvy)." },
  { slug: "khu13-oceanmob", name: "Khu13 x OceanMOB", year: "2022", category: "Talent Booking & Artist Collaboration", credit: "Event/Talent Booking: Mõ Music House. Artists: OceanMOB (Will, XOLITXO, wAvy)." },
  { slug: "cif-u-studio", name: "CIF x U Studio", year: "2022", category: "Commercial & TVC Scoring", credit: "Music Solution: Mõ Music House. Production House: U Studio." },
  { slug: "lazada-echo", name: "Lazada x Echo", year: "2022", category: "Commercial & TVC Scoring", credit: "Music Solution: Mõ Music House. Production House: Echo." },
  { slug: "surf-loudspeaker", name: "Surf Loudspeaker x U Studio", year: "2022", category: "Commercial & TVC Scoring", credit: "Music Solution: Mõ Music House. Client: Unilever Vietnam (Surf). Production House: U Studio." },
  { slug: "sunlight-u-studio", name: "Sunlight x U Studio", year: "2022", category: "Commercial & TVC Scoring", credit: "Music Solution: Mõ Music House. Production House: U Studio." },
  { slug: "vinamilk-tbwa", name: "Vinamilk x TBWA", year: "2022", category: "Commercial & TVC Scoring", credit: "Music/Talent Solution: Mõ Music House. Agency: TBWA Group." },

  // --- 13 profile-deck-only entries, credit lines only, no narrative anywhere ---
  { slug: "momo-ai", name: "Momo: Trợ Thủ Tài Chính Với AI", year: "—", category: "Brand Sound & Sonic Identity", credit: "Music Production: Mõ Music House. Client: Momo. Production House: Plan A. Sonic Logo Producer: mess." },
  { slug: "traveloka-ninh-duong-lan-ngoc", name: "Traveloka x Ninh Dương Lan Ngọc", year: "—", category: "Commercial & TVC Scoring", credit: "Music Production: Mõ Music House. Client: Traveloka. Production House: Startling Production. Music Producer: Nguyên Lê. Composer: Nam Ngô." },
  { slug: "aji-ngon", name: "Aji-Ngon: Cải Tiến Mới", year: "—", category: "Brand Sound & Sonic Identity", credit: "Music Production: Mõ Music House. Client: Aji-Ngon. Production House: ViewFinder Vietnam. Sonic Logo & Music Producer: mess." },
  { slug: "omachi-hieuthuhai", name: "Omachi x HIEUTHUHAI", year: "—", category: "Commercial & TVC Scoring", credit: "Music Production: Mõ Music House. Client: Omachi. Production House: Plan A. Music Producer: Nguyên Lê, mess." },
  { slug: "myvib", name: "myVIB", year: "—", category: "Commercial & TVC Scoring", credit: "Music Production: Mõ Music House. Client: VIB. Production House: Flex Film. Music Producer: Larria." },
  { slug: "vinamilk-dielac-hieuthuhai", name: "Vinamilk Dielac Alpha Gold x HIEUTHUHAI", year: "—", category: "Talent Booking & Artist Collaboration", credit: "Music Production & Supervisor, Talent Booking & Management: Mõ Music House. Client: Vinamilk Dielac Alpha Gold. Agency: TBWA Group. Music Producer: mess." },
  { slug: "cake-vpbank", name: "CAKE by VPBank", year: "—", category: "Commercial & TVC Scoring", credit: "Music Production: Mõ Music House. Client: CAKE by VPBank. Production House: May Production. Music Producer: Nguyên Lê." },
  { slug: "comfort-ao-xuan-tuoi-mau", name: "Comfort: Áo Xuân Tươi Màu", year: "—", category: "Commercial & TVC Scoring", credit: "Music Production: Mõ Music House. Client: Comfort - Unilever Vietnam. Producer/Composer: Pixel Neko. Singer: Tóc Tiên." },
  { slug: "larue-beer", name: "Larue Beer", year: "—", category: "Commercial & TVC Scoring", credit: "Music Production: Mõ Music House. Client: Larue Beer. Production House: View Finder Media. Music Producer: Nguyên Lê." },
  { slug: "bia-viet", name: "Bia Việt", year: "—", category: "Commercial & TVC Scoring", credit: "Music Production: Mõ Music House. Client: Bia Việt. Production House: Flex Films. Music Producer: mess." },
  { slug: "yamaha-pg1", name: "Yamaha PG1", year: "—", category: "Commercial & TVC Scoring", credit: "Music Production: Mõ Music House. Client: Yamaha. Production House: May Production. Music Producer: Nguyên Lê." },
  { slug: "bosch-likeabosch", name: "Bosch: Sống #LikeABosch", year: "—", category: "Commercial & TVC Scoring", credit: "Music Production & Supervisor: Mõ Music House. Client: Bosch. Agency: Vero Agency. Music Producer/Composer: Nguyên Lê. Talent: Limitlxss, Nguyên Lê." },
  { slug: "vinamilk-xom-03-khoe", name: "Vinamilk: Sữa Bịch Dinh Dưỡng Xóm 03 Khoẻ", year: "—", category: "Commercial & TVC Scoring", credit: "Music Production: Mõ Music House. Client: Vinamilk. Agency: TBWA Group. Music Producer/Composer: Chuột Sấm Sét. Talent: Chuột Sấm Sét, Lâm Vỹ Dạ, Tài Smile." },

  // --- 6 current-pipeline "Needs Detail" rows, name only, no credit info yet ---
  { slug: "sxsw", name: "SXSW", year: "—", category: "Live Event & Music Direction", credit: "" },
  { slug: "jbl-academy", name: "JBL Academy", year: "—", category: "Commercial & TVC Scoring", credit: "" },
  { slug: "jbl-tomorrowland", name: "JBL's Tomorrowland", year: "—", category: "Live Event & Music Direction", credit: "" },
  { slug: "eva-exhibition-hcmc", name: "EVA (Exposed Virtual Anonymity) Exhibition, HCMC", year: "—", category: "Brand Sound & Sonic Identity", credit: "" },
  { slug: "more-than-human-beijing", name: "More Than Human, Groundless Factory, Beijing", year: "—", category: "Brand Sound & Sonic Identity", credit: "" },
  { slug: "fragmented-city-tung-khi-rmit", name: "Fragmented City x Tùng Khỉ, RMIT", year: "—", category: "Talent Booking & Artist Collaboration", credit: "" },
];

const tx = client.transaction();
for (const p of projects) {
  const { slug, ...rest } = p;
  tx.createOrReplace({
    _id: `drafts.project-${slug}`,
    _type: "project",
    slug: { _type: "slug", current: slug },
    caseStudy: [placeholderBlock()],
    ...rest,
  });
}

const result = await tx.commit();
console.log(`Created/updated ${result.results.length} placeholder draft project documents.`);
