import { defineConfig } from 'astro/config';

// Dos modos, sin tocar el contenido:
//  - Producción (por defecto): https://casamayis.com en la raíz.
//  - Vista previa: la define el workflow con SITE_URL y SITE_BASE (ver .github/workflows/deploy.yml).
const site = process.env.SITE_URL || 'https://casamayis.com';
const base = process.env.SITE_BASE || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
});
