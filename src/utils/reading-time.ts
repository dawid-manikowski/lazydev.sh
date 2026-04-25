const WORDS_PER_MINUTE = 220;

export interface ReadingTime {
  minutes: number;
  iso8601: string;
}

export function readingTimeOf(text: string): ReadingTime {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return { minutes, iso8601: `PT${minutes}M` };
}
