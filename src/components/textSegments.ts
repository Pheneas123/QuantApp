export type TextSegment = { kind: 'text' | 'code'; text: string; language?: string };

/** Recognise line-delimited fences only. Code remains literal text, never HTML or maths. */
export function textSegments(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const fence = /^```([\w+-]*)\r?\n([\s\S]*?)\r?\n```[ \t]*(?=\r?$)/gm;
  let offset = 0;
  for (const match of text.matchAll(fence)) {
    if (match.index > offset) segments.push({ kind: 'text', text: text.slice(offset, match.index) });
    segments.push({ kind: 'code', text: match[2], language: match[1] || undefined });
    offset = match.index + match[0].length;
  }
  if (offset < text.length || !segments.length) segments.push({ kind: 'text', text: text.slice(offset) });
  return segments;
}
