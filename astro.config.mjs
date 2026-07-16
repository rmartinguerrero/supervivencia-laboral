// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://job-survival.netlify.app',

  i18n: {
    locales: ['es', 'it'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [react()],
  adapter: netlify(),

  server: {
    port: 4321,
  },
});
