// One-off seed script for the 13 additional legacy projects with real
// extractable narrative from the old (2021-2023) sheet Hoàng shared.
// Rewritten in v2 voice, not copy-pasted (old tone was generic ad-copy
// register). Run via:
//   npx sanity@latest exec scripts/seed-projects-legacy.mjs --with-user-token
// Draft-and-hold: created as Sanity DRAFTS, not published. Rights and
// current client-relationship status for these are UNCONFIRMED (this
// material is 3-5 years old), flagged again in the summary to Hoàng,
// not something this script or session can verify.
import { getCliClient } from "sanity/cli";

const client = getCliClient();

function block(text) {
  return {
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", text }],
  };
}

const projects = [
  {
    slug: "lifebuoy-tet",
    name: "Lifebuoy Lunar New Year",
    category: "Commercial & TVC Scoring",
    persona: "Brand marketers",
    seoTitle: "Lifebuoy Tet Campaign Music | Mõ Music House",
    seoDescription:
      "How Mõ Music House blended retro vinyl samples and Vietnamese flutes into a modern electronic space for Lifebuoy's Lunar New Year debut.",
    credit: "Music Production: Mõ Music House. Music Producers: mess., Dustin Ngo.",
    caseStudy: [
      block("Nostalgic without being dated. Modern without losing the roots."),
      block(
        "Lifebuoy needed a Tet debut that felt both rooted and new for the Trà Phúc và Muối Lộc line. We built the piece around culturally rooted materials, samples pulled from retro vinyl records, Vietnamese flutes, then let them run through a dynamic electronic space instead of sitting them in a purely traditional arrangement."
      ),
      block("The result reads as spring itself: nostalgic, youthful, and current all at once, not a costume of tradition."),
      block("Anyone can sample a flute over a beat. Can it actually sound like spring, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "comfort-toc-tien-chong-nhan",
    name: "Comfort x Tóc Tiên: Chống Nhăn Mới",
    category: "Commercial & TVC Scoring",
    persona: "Brand marketers",
    seoTitle: "Comfort x Tóc Tiên Anti-Wrinkle TVC | Mõ Music House",
    seoDescription:
      "Hip-hop rhythm against smooth saxophone: how Mõ Music House scored Comfort's Anti-wrinkle fabric softener battle concept with Tóc Tiên.",
    credit: "Music Production: Mõ Music House. Music Producer: mess.",
    caseStudy: [
      block("A fabric softener needed to win a fight, musically."),
      block(
        "Comfort's Anti-wrinkle campaign staged a literal battle, Mr. Twisted versus the new formula, and the brief was a melody as charming as the scent and as dramatic as a fight. We ran hip-hop rhythm against smooth saxophone, so the track itself argues both sides before the product wins."
      ),
      block("Anyone can score a product demo. Can the music actually argue the fight, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "highlands-coffee-ca-phe-cai-da",
    name: "Highlands Coffee: Cà Phê Cái Đã",
    category: "Commercial & TVC Scoring",
    persona: "Brand marketers",
    seoTitle: "Highlands Coffee Cà Phê Cái Đã TVC | Mõ Music House",
    seoDescription:
      "A rap verse and the literal sound of sipping coffee, woven into one track for Highlands Coffee's Cà Phê Cái Đã campaign.",
    credit: "Music Production & Supervisor: Mõ Music House. Music Producer: Dustin Ngo. Composer/Talent: Minh Lai.",
    caseStudy: [
      block("A coffee break needed its own rap verse."),
      block(
        "Highlands Coffee wanted a moment of recharge to feel earned, not just advertised. Rapper Minh Lai's verse carries the actual message, taking a break amid the chaos, while the track weaves in the literal sound of sipping coffee through a straw as a rhythmic element in its own right."
      ),
      block("Anyone can put a jingle under a coffee ad. Can the coffee itself become part of the beat, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "walls-ice-cream",
    name: "Wall's: Ngất Ngây Vị Giác Với Bí Thuật 100 Năm",
    category: "Brand Sound & Sonic Identity",
    persona: "Creative Directors / Executive Creative Directors",
    seoTitle: "Wall's Ice Cream Sound Design | Mõ Music House",
    seoDescription:
      "Bells, folk textures, and sound effects synced ingredient by ingredient, for Wall's Asian Delight's ice cream campaign.",
    credit: "Music Production: Mõ Music House. Music Producers: mess., Pixel Neko.",
    caseStudy: [
      block("A recipe you can hear before you see it."),
      block(
        "Wall's wanted its ice cream to feel handcrafted, not manufactured. We built the atmosphere from bells and folk textures, then synced a sound effect to each ingredient as the ice cream stick pointed to it onscreen."
      ),
      block("Anyone can add whimsical sound effects to a food ad. Can the sound actually walk through the recipe, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "7up-fiber-summer",
    name: "7UP Fiber: Summer TikTok Campaign",
    category: "Commercial & TVC Scoring",
    persona: "Brand marketers",
    seoTitle: "7UP Summer TikTok Campaign Music | Mõ Music House",
    seoDescription:
      "Built around Bass House, the genre already driving TikTok's belly dance trend, for 7UP's summer refresh campaign.",
    credit: "Music Production: Mõ Music House. Music Producer: Pixel Neko.",
    caseStudy: [
      block("A summer drink needed a dance floor, not just a jingle."),
      block(
        "7UP wanted to own the TikTok summer moment. Pixel Neko built the track around Bass House, the genre already driving belly dance's rise on the platform, so the music didn't chase a trend, it plugged directly into one already in motion."
      ),
      block("Anyone can make a summer jingle. Can it actually fit the dance already trending, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "7up-tet",
    name: "7UP: Mở 7UP, Mở Tết Xôm",
    category: "Commercial & TVC Scoring",
    persona: "Brand marketers",
    seoTitle: "7UP Tet Campaign Music | Mõ Music House",
    seoDescription:
      "Folk melodies and rhythms tuned mischievous instead of reverent, for 7UP's 60-second Lunar New Year spot.",
    credit: "Music Production: Mõ Music House. Composer: Nguyên Lê. Vocal: Nân, Coldzy.",
    caseStudy: [
      block("A 60-second Tet spot, and a mischievous kind of tradition."),
      block(
        "7UP came to us to extend a happy new year story without it sounding like every other Tet ad. We used the studio's own folk melodies and rhythms, tuned mischievous instead of reverent, to fit 7UP's tone while still landing the traditional Tet gathering."
      ),
      block("Anyone can score a Tet ad with folk instruments. Can it still sound mischievous, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "tititada-jingle",
    name: "Tititada: Đầu Tư Chứng Khoán Với Số Vốn Bất Kỳ",
    category: "Brand Sound & Sonic Identity",
    persona: "Brand marketers",
    seoTitle: "Tititada Investment App Jingle | Mõ Music House",
    seoDescription:
      "A chantable hook and folk elements, making stock investing sound approachable instead of intimidating, for the Tititada app.",
    credit: "Music Production: Mõ Music House. Music Producer: Nguyên Lê.",
    caseStudy: [
      block("Making stock investing sound like it's for everyone."),
      block(
        "Tititada needed its name to actually stick, and investing to sound approachable instead of intimidating. We built the hook around the app's own name repeated as a chant, then ran folk elements underneath it, so the jingle reads as human rather than corporate."
      ),
      block("Anyone can write a catchy jingle. Can it make investing feel approachable, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "topzone-launch",
    name: "TopZone: Một Trải Nghiệm Chưa Từng Có",
    category: "Talent Booking & Artist Collaboration",
    persona: "Creative Directors / Executive Creative Directors",
    seoTitle: "TopZone Store Launch Music | Mõ Music House",
    seoDescription:
      "Underground rapper Minh Lai and a fast, sharp beat, built to match TopZone's Apple-Store-level retail experience.",
    credit: "Music Production & Supervisor: Mõ Music House. Music Producer: Dustin Ngo, mess. Composer/Rapper: Minh Lai.",
    caseStudy: [
      block("A retail launch that needed underground credibility, not a jingle."),
      block(
        "TopZone wanted its new store experience to set an Apple-Store-level bar. We brought in underground rapper Minh Lai to carry a concise, memorable flow, and built the beat fast and sharp underneath it, so the store's premium positioning came from a real artist's voice, not something interchangeable with any other retail launch."
      ),
      block("Anyone can hire a rapper for a jingle. Can the collaboration actually carry the brand's premium bar, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "omo-juno-tiktok",
    name: "OMO Juno: Beat Bởi Tay Xinh",
    category: "Brand Sound & Sonic Identity",
    persona: "Creative Directors / Executive Creative Directors",
    seoTitle: "OMO Juno TikTok Sound Design | Mõ Music House",
    seoDescription:
      "Basins and detergent became the actual instruments, played by real hands, for OMO Juno's TikTok campaign.",
    credit: "Music Production: Mõ Music House. Music Composer: Thái Sơn. Music Producer: Pixel Neko.",
    caseStudy: [
      block("Turning real laundry into real percussion."),
      block(
        "OMO's brief was open-ended on purpose, beat by beautiful hands. We took that literally: basins, detergent, and everyday laundry tools became the instruments, played by real people doing real washing, no samples standing in for them."
      ),
      block("Anyone can write a catchy jingle for a detergent. Can the detergent itself be the instrument, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "1111-oceanmob-booking",
    name: "11:11 x OceanMOB",
    category: "Talent Booking & Artist Collaboration",
    persona: "Artists / producers / composers",
    seoTitle: "OceanMOB x 11:11 Talent Booking | Mõ Music House",
    seoDescription:
      "Bringing OceanMOB into the Balling Loud Indoor Music Festival lineup alongside bbno$, a bridge between two Hip-Hop cultures.",
    credit: "Talent Booking: Mõ Music House. Artists: OceanMOB (Gill, Will, XOLITXO, wAvy).",
    caseStudy: [
      block("A last-minute lineup call, and a real cultural bridge."),
      block(
        "When bbno$ was confirmed for the Balling Loud Indoor Music Festival, we moved fast to bring OceanMOB into the lineup. Each member had already left a mark on Vietnamese Hip-Hop on their own, so the booking wasn't filling a slot, it was putting American and Vietnamese Hip-Hop culture on the same stage on purpose."
      ),
      block("Anyone can book an opening act. Can the booking actually mean something culturally, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "comfort-tet-bigsync",
    name: "Comfort Tet",
    category: "Commercial & TVC Scoring",
    persona: "Brand marketers",
    seoTitle: "Comfort Tet Campaign Music | Mõ Music House",
    seoDescription:
      "A distinct lyric and melody for silk, wool, and jeans, brought together into one spring melody for Comfort's Tet line.",
    credit: "Music Production: Mõ Music House. Music Producer: Pixel Neko. Talent: Tóc Tiên.",
    caseStudy: [
      block("Every fabric got its own story."),
      block(
        "Comfort's Tet line needed each material, silk, wool, jeans, to feel individually cared for, not interchangeable with the others. We wrote a distinct lyric and melody for each thread, then brought them together into one lively, modern spring melody that still reads as a single campaign."
      ),
      block("Anyone can score a wardrobe montage. Can every fabric get its own real story, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "tiktok-awards-2022",
    name: "TikTok Awards Vietnam 2022",
    category: "Talent Booking & Artist Collaboration",
    persona: "Creative Directors / Executive Creative Directors",
    seoTitle: "TikTok Awards Vietnam 2022 Performance | Mõ Music House",
    seoDescription:
      "Piano, saxophone, and Orange reunited on a refreshed 'Khi Em Lớn,' produced to give each performer real space at TikTok Awards Vietnam.",
    credit: "Talent Curation & Production: Mõ Music House. Performers: Tuấn Mạnh, An Trần, Orange.",
    caseStudy: [
      block("Honoring individual creators meant giving each performer real space."),
      block(
        "TikTok Awards Vietnam 2022 celebrated the people who made 2022 feel more human online. We paired Tuấn Mạnh on piano and An Trần on saxophone with singer Orange on a refreshed 'Khi Em Lớn,' and the real work was spatial: giving each artist's technique room to read clearly instead of disappearing into a shared backing arrangement."
      ),
      block("Anyone can book good musicians for an awards show. Can each one still sound like themselves, though? Let's find out: hello@momusichouse.com"),
    ],
  },
  {
    slug: "bia-saigon-chill",
    name: "Bia Saigon Chill: Bật Mood Hè, Chill Sảng Khoái",
    category: "Commercial & TVC Scoring",
    persona: "Brand marketers",
    seoTitle: "Bia Saigon Chill Summer Campaign | Mõ Music House",
    seoDescription:
      "New, unfamiliar EDM samples instead of the expected chill-genre defaults, for Bia Saigon Chill's summer campaign.",
    credit: "Music Production: Mõ Music House. Music Producer: Pixel Neko.",
    caseStudy: [
      block("Summer in a beer can, built from sound."),
      block(
        "Saigon Chill wanted its can to feel like the summer it's selling. We picked new, unfamiliar EDM samples over the expected chill-genre defaults, so the blue sea and cold glass the ad shows actually has a soundtrack that feels fresh instead of borrowed."
      ),
      block("Anyone can license a chill EDM track. Can it actually sound new, though? Let's find out: hello@momusichouse.com"),
    ],
  },
];

const tx = client.transaction();
for (const p of projects) {
  const { slug, ...rest } = p;
  tx.createOrReplace({
    _id: `drafts.project-${slug}`,
    _type: "project",
    slug: { _type: "slug", current: slug },
    ...rest,
  });
}

const result = await tx.commit();
console.log(`Created/updated ${result.results.length} legacy draft project documents.`);
