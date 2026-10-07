import { getCollection } from 'astro:content';
import { customRoutes, type Lang } from './ui';

export type Alternates = Partial<Record<Lang, string>>;

const urlFor = (lang: Lang, slug: string, prefix = '') =>
  (lang === 'es' ? '/' : '/en/') + prefix + (slug ? slug + '/' : '');

/** Todas las páginas indexables con sus alternativas de idioma (para hreflang y sitemap). */
export async function allRoutes() {
  const map = new Map<string, { alt: Alternates; lastmod?: Date; priority: number }>();
  const put = (key: string, lang: Lang, path: string, lastmod?: Date, priority = 0.6) => {
    const cur = map.get(key) ?? { alt: {}, lastmod, priority };
    cur.alt[lang] = path;
    if (lastmod && (!cur.lastmod || lastmod > cur.lastmod)) cur.lastmod = lastmod;
    cur.priority = Math.max(cur.priority, priority);
    map.set(key, cur);
  };
  const prio: Record<string, number> = {
    home: 1, product: 0.95, 'how-to': 0.85, what: 0.85, origin: 0.8, campeche: 0.85,
    mayis: 0.6, faq: 0.7, shipping: 0.5, wholesale: 0.6, events: 0.6, blog: 0.6,
  };
  for (const [key, r] of Object.entries(customRoutes))
    for (const lang of ['es', 'en'] as Lang[]) if (r[lang]) put(key, lang, r[lang]!, undefined, prio[key] ?? 0.5);
  for (const p of await getCollection('pages'))
    put(p.data.key, p.data.lang, urlFor(p.data.lang, p.data.urlSlug), p.data.updated, prio[p.data.key] ?? 0.5);
  for (const b of await getCollection('blog'))
    put('blog:' + b.data.key, b.data.lang, urlFor(b.data.lang, b.data.urlSlug, 'blog/'), b.data.updated ?? b.data.date, 0.6);
  return map;
}

export async function alternatesFor(key: string): Promise<Alternates> {
  return (await allRoutes()).get(key)?.alt ?? {};
}
