export const getQueryParam = (query: string | null): string => {
  return Array.isArray(query) ? query[0] : query || '';
};
