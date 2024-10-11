import { formatDistance, isSameDay } from "date-fns";
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

export function limitLines(text: string, limit = 10) {
  const lines = text.split("\n");
  return lines.length <= limit ? text : lines.slice(0, limit).join("\n");
}

export function formatNumber(number: number) {
  return Intl.NumberFormat("en", {
    notation: "compact",
    maximumSignificantDigits: 3,
  }).format(number);
}

export function formatDate(createdAt: Date, updatedAt: Date) {
  const options = {
    addSuffix: true,
  };
  if (isSameDay(createdAt, updatedAt)) {
    return `Created ${formatDistance(createdAt, new Date(), options)}`;
  }
  return `Last Active ${formatDistance(updatedAt, new Date(), options)}`;
}

export function createSortQuery(sortOption: {
  direction: "desc" | "asc";
  sort: string;
}) {
  let field: string = "";
  switch (sortOption.sort) {
    case "created":
      field = "createdAt";
      break;
    case "updated":
      field = "updatedAt";
      break;
    default:
      field = "createdAt";
  }

  return {
    [field]: sortOption.direction,
  };
}
