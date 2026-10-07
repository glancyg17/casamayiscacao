/**
 * TODO(casa-mayis): este archivo es el único lugar que necesitas editar para
 * cambiar precios, links de Stripe, horario o WhatsApp.
 */

export const site = {
  name: 'Casa Mayis',
  url: 'https://casamayis.com',
  whatsapp: '529381341778',
  whatsappDisplay: '+52 938 134 1778',
  instagram: 'https://instagram.com/casamayis',
  instagramHandle: '@casamayis',
  // Dirección: completa calle / código postal cuando los tengas (sirve para Google y para el esquema).
  address: {
    streetAddress: 'Hacienda Santa María',
    locality: 'Campeche',
    region: 'Campeche',
    postalCode: '', // TODO(casa-mayis): código postal
    country: 'MX',
  },
  // Cuando tengas el pin exacto de Google Maps, pega aquí las coordenadas y el link.
  geo: null as null | { lat: number; lng: number },
  mapsUrl: '', // TODO(casa-mayis): link de tu Perfil de Negocio en Google
  hours: { open: '09:00', close: '18:00', days: 'Lunes a domingo', daysEn: 'Monday to Sunday' },
  founder: 'Mayra Damian (Mayis)',
};

export type Product = {
  size: number; // gramos
  form: { es: string; en: string };
  price: number; // MXN
  sku: string;
  /** Link de pago de Stripe. Si está vacío, el botón manda a WhatsApp. */
  stripeUrl: string;
};

/**
 * Pega aquí los links de Stripe (https://buy.stripe.com/...). Nunca pegues claves secretas.
 * Mientras estén vacíos, los botones de compra abren WhatsApp con el pedido listo.
 */
export const products: Product[] = [
  { size: 30, form: { es: 'Disco', en: 'Disc' }, price: 50, sku: 'CM-CAC-030', stripeUrl: '' },
  { size: 100, form: { es: 'Disco', en: 'Disc' }, price: 140, sku: 'CM-CAC-100', stripeUrl: '' },
  { size: 200, form: { es: 'Bolita', en: 'Ball' }, price: 240, sku: 'CM-CAC-200', stripeUrl: '' },
  { size: 500, form: { es: 'Bloque', en: 'Block' }, price: 500, sku: 'CM-CAC-500', stripeUrl: '' },
];

export const wa = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const buyUrl = (p: Product, lang: 'es' | 'en' = 'es') =>
  p.stripeUrl ||
  wa(
    lang === 'es'
      ? `Hola Mayis, quiero pedir cacao ceremonial de ${p.size} g (${p.form.es.toLowerCase()}).`
      : `Hi Mayis, I'd like to order ${p.size} g of ceremonial cacao (${p.form.en.toLowerCase()}).`
  );

export const perGram = (p: Product) => (p.price / p.size).toFixed(2);

/** Eventos próximos. Agrega o quita líneas; las fechas pasadas se ocultan solas. */
export type Evento = {
  date: string; // AAAA-MM-DD
  time: string;
  title: string;
  place: string;
  note: string;
  womenOnly?: boolean;
};
export const eventos: Evento[] = [
  // Ejemplo (bórralo o edítalo):
  // { date: '2026-11-04', time: '19:00', title: 'Círculo de cacao de luna llena', place: 'Hacienda Santa María', note: 'Cupo limitado. Reserva por WhatsApp.', womenOnly: true },
];
