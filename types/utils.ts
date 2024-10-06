import { MouseEvent as MouseEventReact } from "react";

export interface CodeEditorInstance {
  id: string;
  fileName: string;
  lang: string;
  content: string;
}

export type ButtonClickEvent = MouseEventReact<HTMLButtonElement, MouseEvent>;
export type InputClickEvent = MouseEventReact<HTMLInputElement, MouseEvent>;
