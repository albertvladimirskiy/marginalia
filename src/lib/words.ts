/**
 * Counts words: runs of letters/digits, allowing inner apostrophes and hyphens
 * ("don't", "well-made" are one word). Dashes and slashes separate words.
 */
export function countWords(text: string): number {
  return text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}
