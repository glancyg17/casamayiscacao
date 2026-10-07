import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).optional();

// Páginas largas (guías, envíos, sobre Mayis...). Un archivo .md por idioma.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    key: z.string(), // une la versión ES y EN de la misma página
    lang: z.enum(['es', 'en']),
    urlSlug: z.string(), // URL sin barras al inicio ni al final (se llama urlSlug porque "slug" es palabra reservada del sistema)
    title: z.string(), // H1
    seoTitle: z.string().optional(), // <title>, máx. ~60 caracteres
    description: z.string(), // meta description, máx. ~155 caracteres
    updated: z.coerce.date(),
    image: z.string().optional(),
    faq,
    cta: z.enum(['buy', 'whatsapp', 'none']).default('buy'),
    type: z.enum(['article', 'page']).default('page'),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    key: z.string(),
    lang: z.enum(['es', 'en']),
    urlSlug: z.string(),
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string().optional(),
    faq,
  }),
});

export const collections = { pages, blog };
