import { MouseEvent as MouseEventReact } from "react";

export interface CodeEditorInstance {
  id: string;
  fileName: string;
  lang: string;
  content: string;
}

export interface SortOption {
  direction: "asc" | "desc";
  sortType: string;
  sortTitle: string;
}

export interface SearchParamsType {
  page?: string;
  direction?: "asc" | "desc";
  sort?: string;
}

export type ButtonClickEvent = MouseEventReact<HTMLButtonElement, MouseEvent>;
export type InputClickEvent = MouseEventReact<HTMLInputElement, MouseEvent>;
