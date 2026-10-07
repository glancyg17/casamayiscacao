// Después de `astro build`: si el sitio se publica bajo una subcarpeta (vista previa en
// usuario.github.io/repositorio/), agrega esa subcarpeta a los links y rutas que empiezan con "/".
// En producción (base "/") no hace nada.
import { readdirSync, readFileSync, writeFileSync, statSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const dist = 'dist';

if (process.env.PREVIEW === 'true') {
  // En vista previa no debe reclamar el dominio casamayis.com.
  if (existsSync(join(dist, 'CNAME'))) rmSync(join(dist, 'CNAME'));
}
if (!base) {
  console.log('[apply-base] producción: sin cambios');
  process.exit(0);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

let files = 0, links = 0;
for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  const out = html.replace(/\b(href|src|poster|action)="\/(?!\/)([^"]*)"/g, (m, attr, rest) => {
    if (('/' + rest).startsWith(base + '/') || ('/' + rest) === base) return m;
    links++;
    return `${attr}="${base}/${rest}"`;
  });
  if (out !== html) { writeFileSync(file, out); files++; }
}
console.log(`[apply-base] base "${base}": ${links} rutas en ${files} páginas`);
