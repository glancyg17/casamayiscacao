import type { APIRoute } from 'astro';
import { allRoutes } from '../data/routes';
import { site } from '../data/site';

export const GET: APIRoute = async () => {
  const routes = [...(await allRoutes()).values()];
  const abs = (p: string) => site.url + p;
  const urls: string[] = [];
  for (const r of routes) {
    for (const lang of ['es', 'en'] as const) {
      const path = r.alt[lang];
      if (!path) continue;
      const links = r.alt.es && r.alt.en
        ? [
            `<xhtml:link rel="alternate" hreflang="es-MX" href="${abs(r.alt.es)}"/>`,
            `<xhtml:link rel="alternate" hreflang="en" href="${abs(r.alt.en)}"/>`,
            `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(r.alt.es)}"/>`,
          ].join('')
        : '';
      urls.push(
        `<url><loc>${abs(path)}</loc>${r.lastmod ? `<lastmod>${r.lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}<priority>${r.priority.toFixed(2)}</priority>${links}</url>`
      );
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
