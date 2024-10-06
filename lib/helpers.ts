import { extensionToLanguageMap } from "@/constants";
import { PositionTip } from "@/types/unions";

export function getClassOfPositionTip(position: PositionTip) {
  switch (position) {
    case "right":
      return "right-tip";
    case "center":
      return "center-tip";
    default:
      return "center-tip";
  }
}

export function getLanguageFromFilename(filename: string): string {
  // Extract the file extension from the filename
  const ext = filename.split(".").pop()?.toLowerCase();
  if (!ext) return "txt";

  return extensionToLanguageMap[ext] || "txt";
}

export function shortenText(text: string, maxSize = 12) {
  return text.length <= maxSize ? text : text.slice(0, maxSize) + "...";
}
