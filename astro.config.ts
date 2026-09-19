import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://gusdorfcardiology.com',
  output: 'static',
  integrations: [preact()],
  // Astro and the Tailwind adapter currently bundle adjacent Vite versions;
  // the runtime plugin API is compatible, but their duplicated type identities are not.
  vite: { plugins: [tailwindcss() as any] },
});
