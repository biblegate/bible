export type VerseMap = Record<string, string>;
export type ChapterMap = Record<string, VerseMap>;
export type BibleData = Record<string, ChapterMap>;

export interface RouteParams {
  book?: string;
  chapter?: string;
  verse?: string;
}
