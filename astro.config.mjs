// @ts-check
import { defineConfig } from 'astro/config';

// The repo lives at github.com/wagademy-uq/wagademy-uq.github.io.
// If it ever moves to a personal account, change `site` to https://<user>.github.io
// and add `base: '/wagademy'`.
export default defineConfig({
  site: 'https://wagademy-uq.github.io',
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
