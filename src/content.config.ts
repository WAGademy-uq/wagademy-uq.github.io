import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Topics are the optional themed material. They have no order and no thread —
// a WAGademy session runs perfectly well without any of them. Add a file to
// src/content/topics/ and it appears everywhere by itself.
const topics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    strand: z.string(),
    blurb: z.string(),
    minutes: z.number(),
    kind: z.enum(['reading', 'hands-on']),
    slides: z.string().optional(),
  }),
});

export const collections = { topics };
