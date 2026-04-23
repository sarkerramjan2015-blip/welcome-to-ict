import { chapter1 } from "./chapters/chapter1/index";
import { chapter2 } from "./chapters/chapter2/index";
import { chapter3 } from "./chapters/chapter3/index";
import { chapter4 } from "./chapters/chapter4/index";
import { chapter5 } from "./chapters/chapter5/index";
import { chapter6 } from "./chapters/chapter6/index";

export interface ShortQuestion {
  q: string;
  a: string;
  type: "জ্ঞানমূলক" | "অনুধাবনমূলক";
}

export interface PracticeMCQ {
  q: string;
  options: string[];
  correct: string;
  explanation: string;
}

export interface QuizMCQ {
  q: string;
  options: string[];
  correct: string;
}

export interface CQ {
  stem: string;
  qC: string;
  qD: string;
}

export interface Topic {
  id: string;
  title: string;
  thumbnail: string;
  board_notes: string;
  video_url: string;
  importance?: "High" | "Medium" | "Low";
  shortQuestions: ShortQuestion[];
  practiceMcqs: PracticeMCQ[];
  cqs: CQ[];
  quizMcqs: QuizMCQ[];
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  topics: Topic[];
}

export const ictSyllabus: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
];
