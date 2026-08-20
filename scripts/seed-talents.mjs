// One-off seed script, run via:
//   npx sanity@latest exec scripts/seed-talents.mjs --with-user-token
// Creates name/slug/photo only for both talents, as drafts. Bios are
// deliberately NOT written here — website-structure.md's own rule:
// don't fabricate biographical detail that isn't already documented
// somewhere in this system, and no bio material exists yet.
import { getCliClient } from "sanity/cli";
import { readFile } from "node:fs/promises";

const client = getCliClient();

const talents = [
  { slug: "mess", name: "mess.", file: "public/talents/mess.jpg" },
  { slug: "tailor-m8s", name: "Tailor M8S", file: "public/talents/tailorm8s.jpg" },
];

for (const t of talents) {
  const buffer = await readFile(t.file);
  const asset = await client.assets.upload("image", buffer, { filename: t.file.split("/").pop() });
  await client.createOrReplace({
    _id: `drafts.talent-${t.slug}`,
    _type: "talent",
    name: t.name,
    slug: { _type: "slug", current: t.slug },
    photo: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  });
  console.log(`Seeded talent draft: ${t.name}`);
}
