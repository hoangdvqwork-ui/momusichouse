// Shared by HeroMedia.tsx (per-project video) and ShowreelSection.tsx
// (homepage showreel) — same URL-to-embed-URL logic, extracted so it's
// not duplicated between the two.
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
    // Facebook Watch / facebook.com video posts — no numeric ID to
    // extract, Facebook's own public embed plugin takes the original
    // URL as a query param instead. Works for public videos without
    // an API key.
    if (u.hostname.includes("facebook.com") || u.hostname === "fb.watch") {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;
    }
    // TikTok video (not a profile/tag/hashtag page) — extract the
    // numeric video id from /@user/video/<id> and use TikTok's public
    // embed endpoint. Non-video TikTok URLs (tags, profiles) fall
    // through to null, same as any other unrecognized link.
    if (u.hostname.includes("tiktok.com")) {
      const match = u.pathname.match(/\/video\/(\d+)/);
      return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
    }
    return null; // not a known embeddable platform, caller falls back to a <video> tag
  } catch {
    return null;
  }
}
