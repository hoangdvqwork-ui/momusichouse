import { toEmbedUrl } from "@/lib/embedUrl";

export default function HeroMedia({
  type,
  videoUrl,
  fileUrl,
}: {
  type?: string;
  videoUrl?: string;
  fileUrl?: string;
}) {
  if (type === "Uploaded file" && fileUrl) {
    return (
      <video
        src={fileUrl}
        controls
        className="w-full aspect-video bg-black"
      />
    );
  }

  if (type === "Video link" && videoUrl) {
    const embed = toEmbedUrl(videoUrl);
    if (embed) {
      return (
        <iframe
          src={embed}
          className="w-full aspect-video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
    // Not YouTube/Vimeo — try it as a direct video file URL.
    return (
      <video
        src={videoUrl}
        controls
        className="w-full aspect-video bg-black"
      />
    );
  }

  return null;
}
