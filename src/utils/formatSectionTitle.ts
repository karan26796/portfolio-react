/** Strip leading emoji / numbering prefixes from markdown headings for display. */
export const formatSectionTitle = (text: string): string =>
  text
    .replace(/^\d+[️⃣#\s]*/u, '')
    .replace(/^[^\p{L}\p{N}]+/u, '')
    .trim();
