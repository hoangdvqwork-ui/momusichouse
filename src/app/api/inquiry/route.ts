import { NextResponse } from "next/server";

// Contact form -> Notion, 2026-08-24. Destination is the "Web-form
// Inquiries" database Hoàng created under Mõ Music House's own Notion
// page (not shared VIC content, confirmed before building this) --
// id below, hardcoded since it's not sensitive on its own. NOTION_TOKEN
// is the actual secret, set as a Vercel env var (production + preview),
// never committed. See website-copy.md's build log for the setup note.
const NOTION_DATABASE_ID = "3c610156-bbda-8014-a082-d5db8ee8ddeb";

export async function POST(request: Request) {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    console.error("NOTION_TOKEN is not set -- inquiry form can't submit.");
    return NextResponse.json({ error: "Form isn't configured yet, sorry." }, { status: 500 });
  }

  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const message = body.message?.trim() ?? "";

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email },
        Phone: { phone_number: phone },
        Message: { rich_text: message ? [{ text: { content: message } }] : [] },
        Submitted: { date: { start: new Date().toISOString() } },
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Notion API error:", res.status, errText);
    return NextResponse.json({ error: "Couldn't submit right now, please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
