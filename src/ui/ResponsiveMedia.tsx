import type { LearningMedia } from "../domain/media/types.ts";
import "./responsiveMedia.css";

function mediaSource(src: string): string {
  if (/^(?:https?:|data:|blob:|\/\/)/iu.test(src)) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;
}

export function ResponsiveMedia({ media }: { media: LearningMedia }) {
  return <figure className="learning-media" data-media-role={media.role}>
    <img src={mediaSource(media.src)} alt={media.role === "decorative" ? "" : media.alt} loading="lazy" decoding="async" />
    {media.caption ? <figcaption>{media.caption}</figcaption> : null}
  </figure>;
}
