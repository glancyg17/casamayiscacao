import { defineConfig } from 'astro/config';

// Sitio estático para GitHub Pages con dominio propio (casamayis.com).
export default defineConfig({
  site: 'https://casamayis.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
});
