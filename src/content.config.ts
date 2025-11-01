import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const edrs = defineCollection({
  loader: glob({ base: './src/content/edrs', pattern: '**/*.{md}' }),
  schema: z.object({
    type: z.string(),
    status: z.string(),
  }),
});

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

export const collections = { docs, edrs };
