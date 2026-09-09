export function calculateReadingTime(markdown: string): number {
  const wordsPerMinute = 200;
  const plainText = markdown.replace(/[#>*_\[\]()]/g, '');
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
