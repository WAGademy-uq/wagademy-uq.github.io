import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sessions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sessions' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    subtitle: z.string(),
    strand: z.string(),
    blurb: z.string(),
    minutes: z.number(),
    kind: z.enum(['reading', 'hands-on']),
    slides: z.string().optional(),
  }),
});

export const collections = { sessions };
