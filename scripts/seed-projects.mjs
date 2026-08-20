// One-off seed script, run via:
//   npx sanity@latest exec scripts/seed-projects.mjs --with-user-token
// Creates the 6 ready Work projects as Sanity DRAFTS (not published) —
// the Sanity MCP connector's own token lacks org access, this uses the
// CLI's already-authenticated user session instead. Draft-and-hold:
// nothing here publishes, Hoàng reviews in /studio and publishes
// himself when ready.
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
    slug: "rue-miche-2-pulse",
    name: "Rue Miche 2 PULSE",
    category: "Live Event & Music Direction",
    persona: "Creative Directors / Executive Creative Directors",
    seoTitle: "Rue Miche PULSE Runway Music Direction | Mõ Music House",
    seoDescription:
      "How Mõ Music House built one heartbeat to hold strings, opera, and electronic music together for Rue Miche's PULSE runway, ending in one symphonic close.",
    credit: "Music Direction: mess. (Mõ Music House). Co-Producing: Keight.",
    musicLink: "https://open.spotify.com/album/5jeRrdVACGYj4HURemrMni?si=2dffd221c29741c6",
    caseStudy: [
      block("Three sonic languages. One runway. One heartbeat holding it together."),
      block(
        "For Rue Miche 2's PULSE runway, the brief needed strings, opera, and electronic music to live in one show without fighting each other. Instead of separating them into segments, we built the whole set around one heartbeat, and let every brand's segment escalate from that same pulse."
      ),
      block(
        "Three languages read as one continuous story instead of three separate acts, ending in one symphonic close as every collection appeared onstage. Thanh Bui came back as Opera Singer, strings and all, from his own Soul Academy."
      ),
      block(
        "Anyone can license a track for a runway. Can it hold three sonic languages together, though? Let's find out: hello@momusichouse.com"
      ),
    ],
  },
  {
    slug: "rue-miche-orbit",
    name: "Rue Miche ORBIT",
    category: "Live Event & Music Direction",
    persona: "Creative Directors / Executive Creative Directors",
    seoTitle: "Rue Miche ORBIT Soft Opening Music | Mõ Music House",
    seoDescription:
      "Techno, drum and bass, guitar, piano, and a singing bowl: the live music direction behind Rue Miche's brand soft opening for Saigon's fashion scene.",
    credit: "Music Direction: mess. (Mõ Music House). Guitar: Bill Võ. Piano: Võ Hà Hạnh Nhân. Singing bowl: Miên Phạm.",
    caseStudy: [
      block("A soft opening needed its own sound, not a playlist."),
      block(
        "Rue Miche's soft opening needed music that read as this generation's fashion, not a genre. We built the set around techno, drum and bass, and bass music, then ran electric guitar and piano through it to find where Saigon fashion actually sits right now."
      ),
      block(
        "A singing bowl opened the room before any of it started, its own quiet space for the brand before the set began. mess. carried that same thread through the rest of the night, curating, producing, and DJing the set himself, so the room never broke character."
      ),
      block(
        "Anyone can build a playlist for an opening. Can it sound like the room's actual generation, though? Let's find out: hello@momusichouse.com"
      ),
    ],
  },
  {
    slug: "wwf-pizza-4ps",
    name: "WWF Vietnam x Pizza 4P's: A Date With The Earth",
    category: "Brand Sound & Sonic Identity",
    persona: "Creative Directors / Executive Creative Directors",
    seoTitle: "WWF x Pizza 4P's: Music You Feel | Mõ Music House",
    seoDescription:
      "Three tracks mixed for a haptic device that turns sound into vibration in your hand, a sonic identity project for WWF Vietnam and Pizza 4P's.",
    credit: "Music Production: Mõ Music House.",
    mediaLink: "https://pizza4ps.com/vn/library/1603/",
    caseStudy: [
      block("Music you feel before you hear it."),
      block(
        "WWF Vietnam and Pizza 4P's wanted a way to feel the earth, not just talk about protecting it. We produced three tracks, Earth, Water, Air, mixed specifically for a device that sends sound through the body as vibration in the palm."
      ),
      block(
        "A fourth pillar layers all three into one master, so a visitor can hear the individual elements or feel them collapse into one."
      ),
      block(
        "Anyone can write a nature soundtrack. Can you feel it in your hand, though? Let's find out: hello@momusichouse.com"
      ),
    ],
  },
  {
    slug: "audemars-piguet-grand-opening",
    name: "Audemars Piguet Grand Opening",
    category: "Brand Sound & Sonic Identity",
    persona: "Creative Directors / Executive Creative Directors",
    seoTitle: "Audemars Piguet Grand Opening Sound | Mõ Music House",
    seoDescription:
      "An opening track built entirely from watchmaking foley, resolving into piano and ambient, for Audemars Piguet's grand opening dinner in Vietnam.",
    credit: "Music Direction: mess. (Mõ Music House). In partnership with Pyramid Vietnam.",
    caseStudy: [
      block("The sound of making something by hand."),
      block(
        "For Audemars Piguet's grand opening dinner, the brief was atmosphere for a room that already has nothing to prove. We built the opening track entirely from foley, the actual sounds of watchmaking, tools, mechanisms, craft, then let it resolve into piano and ambient texture."
      ),
      block(
        "The music earns the room instead of decorating it. mess. directed the whole evening on that same idea, from the opening track through a curated set and a live DJ close, so nothing broke the room's own logic."
      ),
      block(
        "Anyone can score a luxury event with strings. Can you build it from the sound of the craft itself, though? Let's find out: hello@momusichouse.com"
      ),
    ],
  },
  {
    slug: "lost-and-found",
    name: "Lost & Found: Sunlife Delasol Sound Design",
    category: "Brand Sound & Sonic Identity",
    persona: "Creative Directors / Executive Creative Directors",
    seoTitle: "Lost & Found Sound Design | Mõ Music House",
    seoDescription:
      "Spatial sound design across a three-part art installation representing birth, wedding, and funeral on one table, three tracks that also layer into one.",
    credit: "Sound Design: Mõ Music House.",
    mediaLink: "https://www.cosmos.so/thaodongco/lost-and-found",
    caseStudy: [
      block("Three stories, one table, and sound that changes as you move around it."),
      block(
        "Lost & Found's installation put Birth, Wedding, and Funeral on the same table, three life stages side by side. We designed sound for each zone separately, three speakers, three tracks, so the music changes the moment you move to a different part of the table."
      ),
      block(
        "All three tracks can also layer into a single master, the whole life cycle heard at once, or peeled apart one layer at a time."
      ),
      block(
        "Anyone can play ambient music in a gallery. Can the sound know exactly where you're standing, though? Let's find out: hello@momusichouse.com"
      ),
    ],
  },
  {
    slug: "kimmese-1st-concert",
    name: "For Me'se: Kimmese 1st Concert",
    category: "Talent Booking & Artist Collaboration",
    persona: "Artists / producers / composers",
    seoTitle: "Kimmese 20th Anniversary Concert | Mõ Music House",
    seoDescription:
      "mess.'s first concert as Music Director: shaping 20 years of Kimmese's music into one emotional arc for a career-retrospective concert, live.",
    credit: "Music Direction: mess. (Mõ Music House).",
    caseStudy: [
      block("Twenty years of music. One night. mess.'s first time as Music Director."),
      block(
        "For Kimmese's 20th-anniversary concert, the brief was a career's worth of material and one night to hold all of it. A 20-year catalog doesn't read as one story by default, it has to be shaped into one, live."
      ),
      block(
        "We built a single emotional arc instead of a chronological greatest-hits run, tempo, medleys, and transitions carrying it, with staging and choreography locked to that same arc in the room."
      ),
      block(
        "Anyone can play a greatest-hits set. Can it feel like one story, though? Let's find out: hello@momusichouse.com"
      ),
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
console.log(`Created/updated ${result.results.length} draft project documents.`);
