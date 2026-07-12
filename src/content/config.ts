import { defineCollection, z } from 'astro:content';

const exhibits = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    exhibit: z.string(),
    country: z.string(),
    status: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    teaser: z.string(),
    ledgerTitle: z.string(),
    ledger: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        gap: z.boolean().optional(),
      })
    ),
    ledgerNote: z.string().optional(),
    verdict: z.array(
      z.object({
        key: z.string(),
        value: z.string(),
        long: z.boolean().optional(),
      })
    ),
    verdictNote: z.string(),
    chartNote: z.string().optional(),
    sources: z.array(
      z.object({
        name: z.string().optional(),
        text: z.string(),
        url: z.string().optional(),
        urlLabel: z.string().optional(),
      })
    ),
    disclosure: z.string(),
  }),
});

export const collections = { exhibits };
