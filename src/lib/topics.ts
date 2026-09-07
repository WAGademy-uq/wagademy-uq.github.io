import type { CollectionEntry } from 'astro:content';

// Topics have no order. Keep the familiar strands together and in a sensible
// sequence, with anything new appended alphabetically as it gets written.
const STRAND_ORDER = ['Writing', 'Research skills', 'Career & wellbeing'];

const rank = (s: string) => {
  const i = STRAND_ORDER.indexOf(s);
  return i === -1 ? STRAND_ORDER.length : i;
};

/** Flat list, same-strand topics adjacent. Reads well at five topics or fifty. */
export function sorted(topics: CollectionEntry<'topics'>[]) {
  return [...topics].sort(
    (a, b) =>
      rank(a.data.strand) - rank(b.data.strand) ||
      a.data.strand.localeCompare(b.data.strand) ||
      a.data.title.localeCompare(b.data.title),
  );
}
