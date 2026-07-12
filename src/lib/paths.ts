export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, '-');
}
