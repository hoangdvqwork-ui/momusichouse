// Shared by HeroMedia.tsx (per-project video) and ShowreelSection.tsx
// (homepage showreel) — same YouTube/Vimeo URL-to-embed-URL logic,
// extracted so it's not duplicated between the two.
export function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname === "youtu.be") {
      const id =
        u.hostname === "youtu.be"
          ? u.pathname.slice(1)
          : u.searchParams.get("v") ?? u.pathname.split("/embed/")[1];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null; // not a known embeddable platform, caller falls back to a <video> tag
  } catch {
    return null;
  }
}
