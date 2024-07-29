export function createPageNums(totalItems: number): number[] {
  const totalPagesCount = Math.ceil(totalItems / 10);

  return Array.from({ length: totalPagesCount }, (_, i) => i + 1);
}
