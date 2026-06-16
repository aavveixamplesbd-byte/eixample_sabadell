// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  integrations: [react(), tailwind()],
  i18n: {
    defaultLocale: 'ca',
    locales: ['ca', 'es'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  redirects: {
    '/es/admin': '/admin'
  }
});