export function createPageNums(totalItems: number): { totalPages: number; pages: number[] } {
  const totalPages = Math.ceil(totalItems / 10);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return { totalPages, pages };
}
