import type { CollectionEntry } from 'astro:content';

// Newest first by date; ties broken by exhibit number, descending.
// Every listing page (home, tag, country) must use this so exhibits
// published the same day keep the same order everywhere.
export function sortExhibits(exhibits: CollectionEntry<'exhibits'>[]) {
  return [...exhibits].sort((a, b) => {
    const byDate = b.data.date.valueOf() - a.data.date.valueOf();
    if (byDate !== 0) return byDate;
    return b.data.exhibit.localeCompare(a.data.exhibit);
  });
}
