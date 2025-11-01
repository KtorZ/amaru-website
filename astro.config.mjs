// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import fs from 'node:fs';
import path from 'node:path';

function loadEDRs() {
  const dir = path.join(__dirname, 'src', 'content', 'docs', 'engineering-decision-records');
  console.log(dir);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://pragma-org.github.io/amaru',
  integrations: [
    starlight({
      title: 'Amaru Docs',
      description: 'An open source Cardano node client, written in Rust.',
      favicon: '/favicon/favicon.svg',
      logo: {
        light: './public/layout/logo-light.svg',
        dark: './public/layout/logo-dark.svg',
        replacesTitle: true,
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Installation', slug: 'installation' },
            { label: 'Configuration', slug: 'configuration' },
          ],
        },
        {
          label: 'Guides & Tutorials',
          items: [
            { label: 'Monitoring', slug: 'monitoring' },
            { label: 'Profiling', slug: 'profiling' },
          ],
        },
      ],
      expressiveCode: {
        themes: ['github-light', 'github-dark'],
      },
    }),
    mdx(),
    sitemap(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
