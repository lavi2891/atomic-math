export type MediaRole = "instructional" | "decorative";

export interface ImageMedia {
  readonly type: "image";
  readonly src: string;
  readonly alt: string;
  readonly role: MediaRole;
  readonly caption?: string;
}

export type LearningMedia = ImageMedia;

export function mediaValidationIssues(media: LearningMedia): string[] {
  const issues: string[] = [];
  if (media.type !== "image") issues.push("media type must be image");
  if (!media.src.trim()) issues.push("image media requires a source");
  if (media.role === "instructional" && !media.alt.trim()) issues.push("instructional image media requires useful alt text");
  if (media.role !== "instructional" && media.role !== "decorative") issues.push("image media role is invalid");
  return issues;
}
