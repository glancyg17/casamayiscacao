# Casa Mayis (casamayis.com)

Sitio de **cacao ceremonial de Tabasco**, tostado y molido por Mayis en Campeche.
Hecho con [Astro](https://astro.build), publicado gratis en GitHub Pages, con pagos por **Stripe Payment Links**.

## Lo que más vas a editar

| Quiero cambiar... | Archivo |
|---|---|
| Precios, links de Stripe, horario, WhatsApp, dirección | `src/data/site.ts` |
| Fechas de eventos | `src/data/site.ts` (lista `eventos`) |
| Una página (Qué es, Envíos, Sobre Mayis, FAQ...) | `src/content/pages/es/*.md` y `src/content/pages/en/*.md` |
| Un artículo del blog | `src/content/blog/es/*.md` |
| Textos de la página de inicio o de la página del cacao | `src/views/Home.astro` y `src/views/Producto.astro` |

Puedes editar los archivos `.md` y `site.ts` directamente en github.com (botón del lápiz). Al guardar, el sitio se publica solo en 1 o 2 minutos.

## Conectar Stripe (cuando tengas tu cuenta)

1. En Stripe: **Productos > Payment Links > Crear**. Haz un link por tamaño (30, 100, 200, 500 g).
2. Activa **recolectar dirección de envío** (México) y agrega las **opciones de envío** (por ejemplo "Recoger en Casa Mayis $0" y "Correos de México $X").
3. Activa **permitir cambiar la cantidad** para que puedan comprar más de uno.
4. Copia cada link (`https://buy.stripe.com/...`) y pégalo en `stripeUrl` dentro de `src/data/site.ts`.
5. Mientras `stripeUrl` esté vacío, el botón abre WhatsApp con el pedido ya escrito. Nunca pegues claves secretas en este repositorio.

## Escribir un artículo nuevo

Copia un archivo de `src/content/blog/es/`, cambia el contenido y estos campos arriba:

- `key`: nombre corto único. `urlSlug`: la parte final de la URL.
- `title`: título. `seoTitle`: título para Google (hasta unos 60 caracteres). `description`: resumen (hasta unos 155 caracteres).
- `date`: fecha de publicación. `faq`: preguntas y respuestas opcionales (Google y las IAs las leen).

Si un valor lleva dos puntos, ponlo entre comillas simples.

## Cambiar las fotos

Hoy hay marcadores ("Foto por agregar") y formas ilustradas del cacao. Para poner fotos reales:

1. Sube la foto a `public/images/` (JPG, de preferencia menos de 300 KB).
2. En `src/views/Producto.astro` y `src/views/Home.astro`, busca `<Photo` y agrega `src="/images/tu-foto.jpg" alt="descripción de la foto"`.

Fotos que faltan, en orden de importancia:

1. El cacao: disco de 30 g, disco de 100 g, bolita de 200 g y bloque de 500 g (con y sin empaque).
2. Manos sosteniendo una taza de cacao caliente.
3. Mayis preparando cacao con el molinillo.
4. Cacao tostándose o molido, y el empaque.
5. La entrada o el espacio en Hacienda Santa María.

Todas con buena luz natural o de vela, que es la sensación del sitio.

## Publicar (GitHub Pages): vista previa y lanzamiento

El sitio tiene dos modos. Se elige solo, con una variable de GitHub; el contenido no cambia.

**Vista previa (modo actual).** Se publica en `https://USUARIO.github.io/REPOSITORIO/`, no se indexa en Google y no toca `casamayis.com`. Sirve para revisar y seguir desarrollando mientras el sitio anterior sigue en línea.

1. Una sola vez: en GitHub, **Settings > Pages > Source: GitHub Actions**.
2. Cada cambio en la rama `main` se publica solo (`.github/workflows/deploy.yml`).

**Lanzamiento (cuando esté listo).**

1. En el repositorio nuevo: **Settings > Secrets and variables > Actions > Variables > New repository variable**: nombre `PRODUCTION`, valor `true`.
2. **Actions > Publicar en GitHub Pages > Run workflow**, y espera a que termine en verde.
3. En el repositorio anterior: **Settings > Pages > Custom domain**: borra `casamayis.com`.
4. En el repositorio nuevo: **Settings > Pages > Custom domain**: escribe `casamayis.com`, guarda y activa **Enforce HTTPS** cuando aparezca disponible.

Como los dos repositorios están en la misma cuenta de GitHub, no hay que cambiar nada en el DNS del dominio. Para volver a vista previa, borra la variable `PRODUCTION`.

## Trabajar en tu computadora (opcional)

```
npm install
npm run dev      # ver el sitio en http://localhost:4321
npm run build    # genera la carpeta dist/
```

## Estructura

```
src/data/        configuración (site.ts), textos de menú (ui.ts), rutas (routes.ts)
src/content/     páginas y blog en markdown (es/ y en/)
src/views/       inicio y página del cacao (comparten español e inglés)
src/layouts/     estructura de las páginas, SEO y datos estructurados
src/components/  piezas reutilizables (encabezado, pie, repisa...)
src/styles/      estilos y colores
public/          imágenes, robots.txt, llms.txt, CNAME
_archivo/        sitio anterior (no se publica)
```

## Idiomas

Español es el principal. El inglés vive en `/en/`. Cada página en markdown se une a su traducción con el mismo `key`. Si una página no tiene versión en inglés, el botón "English" lleva al inicio en inglés.
Pendiente de traducir: Campeche, eventos, blog.

## Pendientes para el lanzamiento

Busca `TODO(casa-mayis)` en el código. Lo principal:

- Pegar los 4 links de Stripe.
- Fotos reales del producto, de Mayis y del espacio.
- Código postal, coordenadas y link de Google Maps (Perfil de Negocio).
- Confirmar política de envíos, devoluciones y recolección en `envios.md`.
- Revisión de los textos por las personas que revisan contenido.

## Palabras que NO usamos hasta tener respaldo

- **"Orgánico":** en México requiere certificación. Hoy no la anunciamos.
- **Promesas de salud** (cura, previene, trata, ayuda con depresión, diabetes, etc.). Hablamos de tradición y de experiencia personal.
- **"De la finca" o "de un solo origen":** compramos en mercados de Villahermosa, no directo de una finca.
