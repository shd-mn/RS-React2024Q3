export function findId(url: string): string {
  const parts = url.split('/');
  const id = parts[parts.length - 2];
  return id ?? '';
}
