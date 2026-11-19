/* =========================================================
   MY Pet · Lógica de la página
   ========================================================= */

/* ==== 1. CONFIGURACIÓN: edita solo esta parte ==== */
const CONFIG = {
  // Número de WhatsApp con indicativo de país, sin "+", espacios ni guiones. Ej: '573001234567'
  whatsapp: '573137744379',

  // Precios en pesos colombianos (solo números, ej: 45000).
  // Si los dejas en null, la página muestra "Precio según diseño" y no calcula estimados.
  precios: {
    estilos: { flores: null, cobra: null, trenza: null, mini: null }, // precio base de cada estilo
    nombre: null, // valor adicional por poner el nombre (0 si ya va incluido)
    dije: null,   // valor por cada dije
  },

  // Analítica (opcional). Pega tus IDs para medir visitas y clics a WhatsApp.
  ga4: '',       // Google Analytics 4, ej: 'G-ABC123XYZ'
  metaPixel: '', // Pixel de Meta (Facebook/Instagram Ads), ej: '123456789012345'
};

/* ==== 2. CATÁLOGO DEL PERSONALIZADOR ==== */
const ESTILOS = {
  flores: { nombre: 'Flores', desc: 'Flores con perlas', img: 'minnie', c1: 'Flores', c2: 'Flores alternas', usaC2: true, broche: false },
  cobra: { nombre: 'Cobra', desc: 'Plano y clásico', img: 'hanna', c1: 'Bordes', c2: 'Centro', usaC2: true, broche: true },
  trenza: { nombre: 'Trenza', desc: 'Gruesa tipo espiga', img: 'rino', c1: 'Color 1', c2: 'Color 2', usaC2: true, broche: true },
  mini: { nombre: 'Mini', desc: 'Cordón ajustable', img: 'danna', c1: 'Cordón', usaC2: false, broche: false },
};

const COLORES = {
  negro: ['Negro', '#1E1E24'],
  blanco: ['Blanco', '#F6F6F3'],
  gris: ['Gris', '#A3A8AF'],
  rojo: ['Rojo', '#D62839'],
  naranja: ['Naranja', '#FF7417'],
  fucsia: ['Fucsia', '#C2185B'],
  rosapalo: ['Rosa palo', '#F4A7B9'],
  lila: ['Lila', '#A98BF5'],
  morado: ['Morado', '#5B2A9E'],
  azul: ['Azul rey', '#1E40AF'],
  turquesa: ['Turquesa', '#12A6B3'],
  menta: ['Menta', '#7FDFC4'],
  limon: ['Verde limón', '#9BE12E'],
  verdebotella: ['Verde botella', '#0D4A3A'],
};
const BROCHES = ['negro', 'blanco', 'rojo', 'naranja', 'azul', 'morado'];

const O = 'stroke="#1F2937" stroke-width="1.6" stroke-linejoin="round"';
const puntosEstrella = (R, r) => Array.from({ length: 10 }, (_, i) => {
  const a = -Math.PI / 2 + (i * Math.PI) / 5;
  const rad = i % 2 ? r : R;
  return `${(Math.cos(a) * rad).toFixed(1)},${(Math.sin(a) * rad).toFixed(1)}`;
}).join(' ');
const anillos = (pts, r, fill, stroke) =>
  pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`).join('');

// Dibujos de los dijes, centrados en (0,0)
const DIJES = {
  corazon: {
    nombre: 'Corazón',
    svg: `<path d="M0 13C-16 3 -15 -12 -6.5 -12C-2.5 -12 0 -9 0 -7C0 -9 2.5 -12 6.5 -12C15 -12 16 3 0 13Z" fill="#C4B5FD" ${O}/><path d="M0 6C-8 1.5 -7.5 -5 -3.5 -5C-1.5 -5 0 -3.8 0 -3C0 -3.8 1.5 -5 3.5 -5C7.5 -5 8 1.5 0 6Z" fill="#F472B6"/>`,
  },
  estrella: { nombre: 'Estrella', svg: `<polygon points="${puntosEstrella(15, 7)}" fill="#F9A8D4" ${O}/>` },
  dona: {
    nombre: 'Dona',
    svg: `<circle r="13.5" fill="#E9B872" ${O}/><circle r="11" fill="#7B4A2E"/><circle r="4.5" fill="#E9B872" ${O}/><g stroke-width="2.2" stroke-linecap="round"><path d="M-7 -5l3 -2M6 -8l2 3" stroke="#FDE047"/><path d="M7 3l3 1M-8 4l1 3" stroke="#60A5FA"/><path d="M-1 8l3 1M-2 -9h3" stroke="#F472B6"/></g>`,
  },
  mono: {
    nombre: 'Moño',
    svg: `<path d="M0 0L-14 -9Q-18 0 -14 9Z" fill="#93C5FD" ${O}/><path d="M0 0L14 -9Q18 0 14 9Z" fill="#93C5FD" ${O}/><rect x="-4.5" y="-5.5" width="9" height="11" rx="3.5" fill="#60A5FA" ${O}/>`,
  },
  galleta: {
    nombre: 'Galleta',
    svg: `<rect x="-13" y="-13" width="26" height="26" rx="6" fill="#F6B860" ${O}/><g fill="#C2410C">${[-6, 0, 6].flatMap((y) => [-6, 0, 6].map((x) => `<circle cx="${x}" cy="${y}" r="1.6"/>`)).join('')}</g>`,
  },
  flor: {
    nombre: 'Flor',
    svg: `${anillos([0, 72, 144, 216, 288].map((g) => { const a = ((g - 90) * Math.PI) / 180; return [(Math.cos(a) * 7.5).toFixed(1), (Math.sin(a) * 7.5).toFixed(1)]; }), 6.5, '#FDBA8C', '#1F2937')}<circle r="5" fill="#FACC15" ${O}/>`,
  },
  fresa: {
    nombre: 'Fresa',
    svg: `<path d="M0 14C-11 8 -14 -3 -8 -8C-4 -11 4 -11 8 -8C14 -3 11 8 0 14Z" fill="#E11D48" ${O}/><g fill="#FDE68A"><ellipse cx="-4" cy="-2" rx="1" ry="1.6"/><ellipse cx="4" cy="-2" rx="1" ry="1.6"/><ellipse cx="0" cy="3" rx="1" ry="1.6"/><ellipse cx="-5" cy="5" rx="1" ry="1.6"/><ellipse cx="5" cy="5" rx="1" ry="1.6"/><ellipse cx="0" cy="9" rx="1" ry="1.6"/></g><path d="M-8 -8L-3 -14L0 -9L3 -14L8 -8Z" fill="#22C55E" ${O}/>`,
  },
  cereza: {
    nombre: 'Cerezas',
    svg: `<path d="M-6 3Q-4 -8 3 -14M6 4Q5 -6 3 -14" fill="none" stroke="#15803D" stroke-width="2.2" stroke-linecap="round"/><path d="M3 -14q8 -4 10 2q-7 2 -10 -2Z" fill="#4ADE80" ${O}/><circle cx="-6" cy="6" r="7.5" fill="#DC2626" ${O}/><circle cx="6.5" cy="7" r="7.5" fill="#DC2626" ${O}/><circle cx="-8.5" cy="3.5" r="2" fill="#fff" opacity=".7"/><circle cx="4" cy="4.5" r="2" fill="#fff" opacity=".7"/>`,
  },
  trebol: {
    nombre: 'Trébol',
    svg: `${anillos([[0, -6.5], [6.5, 0], [0, 6.5], [-6.5, 0]], 6.2, '#4ADE80', '#1F2937')}<circle r="2.5" fill="#16A34A"/>`,
  },
  muneco: {
    nombre: 'Muñeco de nieve',
    navidad: true,
    svg: `<circle cy="7" r="9.5" fill="#fff" ${O}/><circle cy="-6" r="7" fill="#fff" ${O}/><path d="M-6.5 -9.5h13l-3 -8h-7z" fill="#DC2626" ${O}/><rect x="-7.5" y="0" width="15" height="3.5" rx="1.5" fill="#16A34A"/><g fill="#1F2937"><circle cx="-2.5" cy="-6.5" r="1.2"/><circle cx="2.5" cy="-6.5" r="1.2"/><circle cy="7" r="1.3"/><circle cy="11.5" r="1.3"/></g><path d="M-1 -3.5h2.5l-1.2 1.4z" fill="#F97316"/>`,
  },
};
const ANILLO = '<circle cy="-21" r="3.5" fill="none" stroke="#8B95A5" stroke-width="2"/>';
const COLORES_LETRAS = ['#E5484D', '#7C3AED', '#F59E0B', '#16A34A', '#EC4899', '#0EA5E9'];
const MAX_DIJES = 3;
const MAX_CANTIDAD = 10;

const MENSAJES = {
  general: 'Hola MY Pet 🐾 Quiero pedir un collar para mi peludo. ¿Me ayudan?',
  hermanos: 'Hola MY Pet 🐾 Me interesan collares a juego para varios peludos. ¿Me cuentan cómo funciona?',
  talla: 'Hola MY Pet 🐾 Necesito ayuda con la talla del collar. Les envío una foto de mi peludo y su peso aproximado.',
};

/* ==== 3. UTILIDADES ==== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt = (v) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v);
const hex = (k) => (COLORES[k] || COLORES.negro)[1];
const nombreColor = (k) => (COLORES[k] || ['—'])[0];

function rgb(h) { return h.match(/\w\w/g).map((x) => parseInt(x, 16)); }
function oscurecer(h, p) {
  return '#' + rgb(h).map((v) => Math.round(v * (1 - p)).toString(16).padStart(2, '0')).join('');
}
function esClaro(h) {
  const [r, g, b] = rgb(h);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}
function urlWhatsApp(texto) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
}
function desplazarA(el) {
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('visible'), 3600);
}

/* ==== 4. ANALÍTICA ==== */
function cargarAnalitica() {
  if (CONFIG.ga4) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.ga4}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.ga4);
  }
  if (CONFIG.metaPixel) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', CONFIG.metaPixel);
    window.fbq('track', 'PageView');
  }
}

const EVENTOS_META = { whatsapp_click: 'Contact', pedido_diseno: 'Lead', personalizar: 'CustomizeProduct' };
function track(evento, datos = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', evento, datos);
  else (window.dataLayer = window.dataLayer || []).push({ event: evento, ...datos });
  if (typeof window.fbq === 'function') {
    const std = EVENTOS_META[evento];
    if (std) window.fbq('track', std, datos.value ? { value: datos.value, currency: 'COP' } : {});
    else window.fbq('trackCustom', evento, datos);
  }
}

/* ==== 5. ESTADO DEL PERSONALIZADOR ==== */
const estado = {
  estilo: 'flores',
  c1: 'fucsia',
  c2: 'rosapalo',
  broche: 'negro',
  nombre: '',
  dijes: ['fresa'],
  mascota: 'perro',
  cuello: '',
  sinMedida: false,
  cantidad: 1,
};
let interactuo = false;

function limpiarNombre(v) {
  return v.toUpperCase()
    .replace(/Ñ/g, '\u0001').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\u0001/g, 'Ñ')
    .replace(/[^A-ZÑ0-9 ]/g, '').replace(/\s{2,}/g, ' ').replace(/^\s/, '')
    .slice(0, 10);
}

function validarEstado(p) {
  const s = {};
  if (ESTILOS[p.estilo]) s.estilo = p.estilo;
  if (COLORES[p.c1]) s.c1 = p.c1;
  if (COLORES[p.c2]) s.c2 = p.c2;
  if (BROCHES.includes(p.broche)) s.broche = p.broche;
  if (typeof p.nombre === 'string') s.nombre = limpiarNombre(p.nombre).trim();
  if (Array.isArray(p.dijes)) s.dijes = [...new Set(p.dijes.filter((d) => DIJES[d]))].slice(0, MAX_DIJES);
  if (p.mascota === 'perro' || p.mascota === 'gato') s.mascota = p.mascota;
  const cm = parseFloat(p.cuello);
  if (cm >= 10 && cm <= 90) s.cuello = String(cm);
  if (typeof p.sinMedida === 'boolean') s.sinMedida = p.sinMedida;
  const q = parseInt(p.cantidad, 10);
  if (q >= 1 && q <= MAX_CANTIDAD) s.cantidad = q;
  return s;
}

/* Parámetros cortos para compartir el diseño por enlace */
const CLAVES_URL = { e: 'estilo', c1: 'c1', c2: 'c2', b: 'broche', n: 'nombre', d: 'dijes', m: 'mascota', cm: 'cuello', q: 'cantidad', ay: 'sinMedida' };

function estadoDesdeURL() {
  const q = new URLSearchParams(location.search);
  if (!q.has('e')) return false;
  const p = {};
  for (const [corta, larga] of Object.entries(CLAVES_URL)) if (q.has(corta)) p[larga] = q.get(corta);
  if (p.dijes !== undefined) p.dijes = p.dijes ? p.dijes.split(',') : [];
  if (p.sinMedida !== undefined) p.sinMedida = p.sinMedida === '1';
  Object.assign(estado, validarEstado(p));
  return true;
}

function parametrosDiseno() {
  const e = ESTILOS[estado.estilo];
  const q = new URLSearchParams({ e: estado.estilo, c1: estado.c1 });
  if (e.usaC2) q.set('c2', estado.c2);
  if (e.broche) q.set('b', estado.broche);
  if (estado.nombre) q.set('n', estado.nombre);
  q.set('d', estado.dijes.join(','));
  q.set('m', estado.mascota);
  if (estado.cuello && !estado.sinMedida) q.set('cm', estado.cuello);
  if (estado.sinMedida) q.set('ay', '1');
  if (estado.cantidad > 1) q.set('q', estado.cantidad);
  return q;
}

function urlDiseno() {
  return `${location.href.split(/[?#]/)[0]}?${parametrosDiseno()}#personaliza`;
}

let urlTimer;
function guardarEnURL() {
  clearTimeout(urlTimer);
  urlTimer = setTimeout(() => {
    const actual = new URLSearchParams(location.search);
    Object.keys(CLAVES_URL).forEach((k) => actual.delete(k));
    parametrosDiseno().forEach((v, k) => actual.set(k, v));
    history.replaceState(null, '', `${location.pathname}?${actual}${location.hash}`);
  }, 400);
}

/* ==== 6. VISTA PREVIA (SVG) ==== */
function hebilla(x, cy, color) {
  const s = oscurecer(color, esClaro(color) ? 0.18 : 0.35);
  return `<rect x="${x}" y="${cy - 25}" width="46" height="50" rx="9" fill="${color}" stroke="#1F2937" stroke-width="2.5"/>
    <rect x="${x + 10}" y="${cy - 15}" width="6" height="30" rx="3" fill="${s}"/>
    <rect x="${x + 22}" y="${cy - 15}" width="6" height="30" rx="3" fill="${s}"/>
    <path d="M${x + 46} ${cy - 19}h24a10 10 0 0 1 10 10v18a10 10 0 0 1 -10 10h-24z" fill="${color}" stroke="#1F2937" stroke-width="2.5"/>
    <rect x="${x + 56}" y="${cy - 9}" width="15" height="18" rx="4" fill="${s}"/>`;
}

function perla(cx, cy, r = 9) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#F4EAD5" stroke="#B9A47E" stroke-width="1.5"/><circle cx="${(cx - r * 0.35).toFixed(1)}" cy="${(cy - r * 0.35).toFixed(1)}" r="${(r * 0.3).toFixed(1)}" fill="#fff" opacity=".85"/>`;
}

// Ancho del lienzo: en celulares el collar se dibuja más corto para que letras y dijes se vean más grandes
const mqCompacto = window.matchMedia('(max-width: 599px)');
const anchoLienzo = () => (mqCompacto.matches ? 460 : 640);

function bezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const pt = (i) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i];
  const dv = (i) => 3 * u * u * (p1[i] - p0[i]) + 6 * u * t * (p2[i] - p1[i]) + 3 * t * t * (p3[i] - p2[i]);
  return { x: pt(0), y: pt(1), ang: (Math.atan2(dv(1), dv(0)) * 180) / Math.PI };
}

function svgCobra(c1, c2, br, W) {
  const x0 = 24, x1 = W - 92, y = 64, h = 48;
  const s1 = oscurecer(c1, 0.25), s2 = oscurecer(c2, 0.3);
  return `<defs><pattern id="pv-cobra" x="${x0}" y="${y}" width="26" height="${h}" patternUnits="userSpaceOnUse">
      <rect width="26" height="${h}" fill="${s2}"/>
      <rect x="3.5" y="10" width="19" height="28" rx="8" fill="${c2}" stroke="${s2}" stroke-width="1.5"/>
      <rect x="1.5" y="1.5" width="23" height="12" rx="6" fill="${c1}" stroke="${s1}" stroke-width="1.5"/>
      <rect x="1.5" y="34.5" width="23" height="12" rx="6" fill="${c1}" stroke="${s1}" stroke-width="1.5"/>
    </pattern></defs>
    <rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h}" rx="14" fill="url(#pv-cobra)" stroke="#1F2937" stroke-width="2.5"/>
    ${hebilla(x1 - 8, y + h / 2, br)}`;
}

function svgTrenza(c1, c2, br, W) {
  const x0 = 24, x1 = W - 92, y = 60, h = 56, m = y + h / 2;
  const s1 = oscurecer(c1, 0.28), s2 = oscurecer(c2, 0.3), fondo = oscurecer(c2, 0.5);
  const tile = (id, skew, yy) => `<pattern id="${id}" x="${x0}" y="${yy}" width="30" height="${h / 2}" patternUnits="userSpaceOnUse" patternTransform="skewX(${skew})">
      <rect width="30" height="${h / 2}" fill="${fondo}"/>
      <rect x="1" y="1" width="13" height="${h / 2 - 2}" rx="6" fill="${c1}" stroke="${s1}" stroke-width="1.5"/>
      <rect x="16" y="1" width="13" height="${h / 2 - 2}" rx="6" fill="${c2}" stroke="${s2}" stroke-width="1.5"/>
    </pattern>`;
  return `<defs>${tile('pv-t1', -38, y)}${tile('pv-t2', 38, m)}<clipPath id="pv-tc"><rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h}" rx="18"/></clipPath></defs>
    <g clip-path="url(#pv-tc)"><rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h / 2}" fill="url(#pv-t1)"/><rect x="${x0}" y="${m}" width="${x1 - x0}" height="${h / 2}" fill="url(#pv-t2)"/></g>
    <rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h}" rx="18" fill="none" stroke="#1F2937" stroke-width="2.5"/>
    ${hebilla(x1 - 8, m, br)}`;
}

function cordon(d, color, ancho) {
  return `<path d="${d}" fill="none" stroke="#1F2937" stroke-width="${ancho + 4}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="${color}" stroke-width="${ancho}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="${oscurecer(color, 0.3)}" stroke-width="${ancho}" stroke-dasharray="2 5" opacity=".35"/>`;
}

function svgFlores(c1, c2, anchoNombre, cy, W) {
  const filaY = 80, c = W / 2;
  const mitad = Math.max(56, anchoNombre / 2 + 30);
  const izq = Math.max(44, c - mitad - 54), der = Math.min(W - 44, c + mitad + 54);
  const hebra = `M${izq} ${filaY + 6}Q${c - mitad - 8} ${cy} ${c - mitad} ${cy}H${c + mitad}Q${c + mitad + 8} ${cy} ${der} ${filaY + 6}`;
  let out = cordon(hebra, c1, 5) + cordon(`M34 ${filaY}H${W - 34}`, c1, 11);
  const sep = 52, n = Math.floor((W - 100) / sep) + 1, ini = c - ((n - 1) * sep) / 2;
  for (let i = 0; i < n; i++) {
    const cx = ini + i * sep, color = i % 2 ? c2 : c1, s = oscurecer(color, 0.3);
    for (let k = 0; k < 5; k++) {
      const a = ((-90 + k * 72) * Math.PI) / 180;
      out += `<circle cx="${(cx + Math.cos(a) * 12).toFixed(1)}" cy="${(filaY + Math.sin(a) * 12).toFixed(1)}" r="10.5" fill="${color}" stroke="${s}" stroke-width="1.5"/>`;
    }
    out += perla(cx, filaY, 8.5);
  }
  const borde = anchoNombre / 2 + 16;
  out += perla(c - borde, cy, 10) + perla(c + borde, cy, 10);
  return out;
}

function svgMini(c1, anchoNombre, cy, W) {
  const c = W / 2;
  const mitad = Math.min(W / 2 - 70, Math.max(80, anchoNombre / 2 + 62));
  const a = c - mitad, b = c + mitad, L = a - 34;
  const p0 = [34, 62], p1 = [34 + L * 0.45, cy], p2 = [a - L * 0.35, cy], p3 = [a, cy];
  const d = `M${p0}C${p1} ${p2} ${p3}H${b}C${W - p2[0]},${cy} ${W - p1[0]},${cy} ${W - 34},62`;
  const s1 = oscurecer(c1, 0.3);
  const nudo = (x, y, rot) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})"><rect x="-17" y="-11" width="34" height="22" rx="10" fill="${c1}" stroke="#1F2937" stroke-width="2"/><path d="M-8 -9v18M0 -10v20M8 -9v18" stroke="${s1}" stroke-width="2" opacity=".6"/></g>`;
  const k = bezier(p0, p1, p2, p3, 0.32);
  let out = cordon(d, c1, 12) + nudo(k.x, k.y, k.ang) + nudo(W - k.x, k.y, -k.ang);
  const e1 = anchoNombre / 2 + 15, e2 = e1 + 23;
  out += perla(c - e2, cy, 11) + perla(c - e1, cy, 11) + perla(c + e1, cy, 11) + perla(c + e2, cy, 11);
  return out;
}

function anchoCuentas(texto) {
  return [...texto].reduce((w, ch, i) => w + (ch === ' ' ? 10 : 24) + (i ? 3 : 0), 0);
}

function cuentas(cx, cy, texto, fantasma) {
  let x = cx - anchoCuentas(texto) / 2, out = '', i = 0;
  for (const ch of texto) {
    if (ch === ' ') { x += 13; continue; }
    const color = fantasma ? '#9AA3B2' : COLORES_LETRAS[i % COLORES_LETRAS.length];
    out += `<g transform="translate(${x.toFixed(1)} ${cy - 12})"><rect width="24" height="24" rx="5" fill="#fff" stroke="${fantasma ? '#9AA3B2' : '#1F2937'}" stroke-width="1.6" ${fantasma ? 'stroke-dasharray="3 3"' : ''}/><text x="12" y="17.5" text-anchor="middle" font-family="Fredoka, system-ui, sans-serif" font-weight="700" font-size="15" fill="${color}">${ch}</text></g>`;
    x += 27; i++;
  }
  return `<g${fantasma ? ' opacity=".75"' : ''}>${out}</g>`;
}

function posicionesDijes(k, cx, anchoNombre) {
  if (!k) return [];
  if (k === 1) return [cx];
  const ext = Math.max(anchoNombre / 2 - 12, k === 3 ? 50 : 30);
  return k === 2 ? [cx - ext, cx + ext] : [cx - ext, cx, cx + ext];
}

function dibujarPreview() {
  const e = estado.estilo;
  const c1 = hex(estado.c1), c2 = hex(estado.c2), br = hex(estado.broche);
  const fantasma = !estado.nombre;
  const texto = estado.nombre || 'NOMBRE';
  const w = anchoCuentas(texto);
  const W = anchoLienzo();
  const cxCorrea = (24 + W - 92) / 2; // centro de la correa (sin contar el broche)
  let base, cx, cy, ancla;
  if (e === 'cobra') { cx = cxCorrea; cy = 92; ancla = 104; base = svgCobra(c1, c2, br, W); }
  else if (e === 'trenza') { cx = cxCorrea; cy = 94; ancla = 106; base = svgTrenza(c1, c2, br, W); }
  else if (e === 'flores') { cx = W / 2; cy = 124; ancla = 136; base = svgFlores(c1, c2, w, cy, W); }
  else { cx = W / 2; cy = 110; ancla = 122; base = svgMini(c1, w, cy, W); }

  const xs = posicionesDijes(estado.dijes.length, cx, w);
  const dijes = estado.dijes.map((d, i) => `<g transform="translate(${xs[i]} ${ancla + 22})">${ANILLO}${DIJES[d].svg}</g>`).join('');

  const svg = $('#preview');
  svg.setAttribute('viewBox', `0 46 ${W} 136`);
  svg.innerHTML = base + dijes + cuentas(cx, cy, texto, fantasma);
  svg.setAttribute('aria-label', `Vista previa del collar. ${resumen().map(([k, v]) => `${k}: ${v}`).join('. ')}`);
}

/* ==== 7. RESUMEN, PRECIO Y MENSAJE ==== */
function resumen() {
  const e = ESTILOS[estado.estilo];
  const items = [['Estilo', e.nombre]];
  if (!e.usaC2) items.push(['Color', nombreColor(estado.c1)]);
  else if (estado.estilo === 'trenza') items.push(['Colores', `${nombreColor(estado.c1)} y ${nombreColor(estado.c2)}`]);
  else items.push(['Colores', `${nombreColor(estado.c1)} (${e.c1.toLowerCase()}) y ${nombreColor(estado.c2)} (${e.c2.toLowerCase()})`]);
  if (e.broche) items.push(['Broche', nombreColor(estado.broche)]);
  items.push(['Nombre', estado.nombre || 'Sin nombre']);
  items.push(['Dijes', estado.dijes.length ? estado.dijes.map((d) => DIJES[d].nombre).join(', ') : 'Sin dijes']);
  const medida = estado.sinMedida ? 'necesito ayuda con la medida' : estado.cuello ? `cuello de ${estado.cuello} cm` : 'medida por confirmar';
  items.push(['Para', `${estado.mascota === 'gato' ? 'Gato' : 'Perro'}, ${medida}`]);
  if (estado.cantidad > 1) items.push(['Cantidad', `${estado.cantidad} collares a juego`]);
  return items;
}

function precioEstimado() {
  const p = CONFIG.precios;
  const base = p.estilos[estado.estilo];
  if (base == null) return null;
  const unidad = base + (estado.nombre ? p.nombre || 0 : 0) + estado.dijes.length * (p.dije || 0);
  return unidad * estado.cantidad;
}

function mensajeDiseno() {
  let m = `Hola MY Pet 🐾 Quiero pedir este collar:\n\n${resumen().map(([k, v]) => `• ${k}: ${v}`).join('\n')}`;
  const p = precioEstimado();
  if (p != null) m += `\n\nPrecio estimado en la web: ${fmt(p)}`;
  m += `\n\nMi diseño: ${urlDiseno()}\n\n¿Me confirman el precio y el tiempo de entrega?`;
  return m;
}

/* ==== 8. CONSTRUCCIÓN DEL FORMULARIO ==== */
function iconoDije(d) {
  return `<svg viewBox="-18 -26 36 44" aria-hidden="true">${ANILLO}${DIJES[d].svg}</svg>`;
}

function construirFormulario() {
  $('#opt-estilo').innerHTML = Object.entries(ESTILOS).map(([k, e]) => `
    <label class="opt-estilo">
      <input type="radio" name="estilo" value="${k}">
      <span class="opt-estilo__card">
        <img src="img/opt/${e.img}-120.webp" alt="" width="52" height="52" loading="lazy" decoding="async">
        <span><strong>${e.nombre}</strong><small>${e.desc}</small></span>
      </span>
    </label>`).join('');

  const swatch = (grupo, k) => {
    const [nombre, h] = COLORES[k];
    return `<label class="swatch" title="${nombre}">
      <input type="radio" name="${grupo}" value="${k}" aria-label="${nombre}">
      <span class="swatch__color" style="--c:${h};--tick:${esClaro(h) ? '#1F2937' : '#fff'}"><svg aria-hidden="true"><use href="#i-check"/></svg></span>
    </label>`;
  };
  $('#opt-c1').innerHTML = Object.keys(COLORES).map((k) => swatch('c1', k)).join('');
  $('#opt-c2').innerHTML = Object.keys(COLORES).map((k) => swatch('c2', k)).join('');
  $('#opt-broche').innerHTML = BROCHES.map((k) => swatch('broche', k)).join('');

  $('#opt-dijes').innerHTML = Object.entries(DIJES).map(([k, d]) => `
    <label class="dije">
      <input type="checkbox" name="dijes" value="${k}">
      <span class="dije__card">${iconoDije(k)}${d.nombre}${d.navidad ? '<span class="dije__badge">Navidad</span>' : ''}</span>
    </label>`).join('');
}

function sincronizarFormulario() {
  const f = $('#config');
  ['estilo', 'c1', 'c2', 'broche', 'mascota'].forEach((n) => {
    const r = f.querySelector(`input[name="${n}"][value="${estado[n]}"]`);
    if (r) r.checked = true;
  });
  $$('input[name="dijes"]', f).forEach((c) => { c.checked = estado.dijes.includes(c.value); });
  $('#nombre').value = estado.nombre;
  $('#cuello').value = estado.cuello;
  $('#sin-medida').checked = estado.sinMedida;
}

/* ==== 9. ACTUALIZAR TODO ==== */
function actualizar() {
  const e = ESTILOS[estado.estilo];

  $('#lbl-c1').textContent = e.c1;
  $('#out-c1').textContent = nombreColor(estado.c1);
  $('#campo-c2').hidden = !e.usaC2;
  $('#lbl-c2').textContent = e.c2 || 'Color 2';
  $('#out-c2').textContent = nombreColor(estado.c2);
  $('#campo-broche').hidden = !e.broche;
  $('#out-broche').textContent = nombreColor(estado.broche);

  $('#nombre-cuenta').textContent = estado.nombre.replace(/ /g, '').length;

  const lleno = estado.dijes.length >= MAX_DIJES;
  $$('input[name="dijes"]').forEach((c) => { c.disabled = lleno && !c.checked; });

  $('#cuello').disabled = estado.sinMedida;
  $('#cantidad').textContent = estado.cantidad;
  $('[data-paso="-1"]').disabled = estado.cantidad <= 1;
  $('[data-paso="1"]').disabled = estado.cantidad >= MAX_CANTIDAD;

  $('#resumen').innerHTML = resumen().map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');

  const p = precioEstimado(), caja = $('#precio-est');
  caja.hidden = p == null;
  if (p != null) caja.innerHTML = `<span>Precio estimado<small>Te lo confirmamos por WhatsApp</small></span><strong>${fmt(p)}</strong>`;

  const url = urlWhatsApp(mensajeDiseno());
  $('#cta-pedido').href = url;
  $('#barra-cta').href = url;

  dibujarPreview();
}

function cambio(parcial) {
  Object.assign(estado, parcial);
  if (!interactuo) { interactuo = true; track('personalizar', { estilo: estado.estilo }); }
  actualizar();
  guardarEnURL();
}

/* ==== 10. EVENTOS DEL PERSONALIZADOR ==== */
function iniciarPersonalizador() {
  construirFormulario();
  const desdeURL = estadoDesdeURL();
  sincronizarFormulario();
  actualizar();

  mqCompacto.addEventListener('change', dibujarPreview);

  const f = $('#config');
  f.addEventListener('submit', (ev) => ev.preventDefault());
  f.addEventListener('change', (ev) => {
    const t = ev.target;
    if (['estilo', 'c1', 'c2', 'broche', 'mascota'].includes(t.name)) cambio({ [t.name]: t.value });
    else if (t.name === 'dijes') {
      const dijes = $$('input[name="dijes"]:checked', f).map((c) => c.value).slice(0, MAX_DIJES);
      cambio({ dijes });
    } else if (t.id === 'sin-medida') cambio({ sinMedida: t.checked });
  });

  $('#nombre').addEventListener('input', (ev) => {
    const limpio = limpiarNombre(ev.target.value);
    if (limpio !== ev.target.value) ev.target.value = limpio;
    cambio({ nombre: limpio.trim() });
  });

  $('#cuello').addEventListener('input', (ev) => {
    const v = parseFloat(ev.target.value);
    cambio({ cuello: v >= 10 && v <= 90 ? String(v) : '' });
  });

  $$('[data-paso]').forEach((b) => b.addEventListener('click', () => {
    const q = Math.min(MAX_CANTIDAD, Math.max(1, estado.cantidad + Number(b.dataset.paso)));
    cambio({ cantidad: q });
  }));

  const pedir = (origen) => () => track('pedido_diseno', {
    origen, estilo: estado.estilo, dijes: estado.dijes.length, con_nombre: !!estado.nombre,
    cantidad: estado.cantidad, value: precioEstimado() || undefined,
  });
  $('#cta-pedido').addEventListener('click', pedir('resumen'));
  $('#barra-cta').addEventListener('click', pedir('barra_movil'));

  $('#compartir').addEventListener('click', async () => {
    const url = urlDiseno();
    track('compartir_diseno', { estilo: estado.estilo });
    if (navigator.share) {
      try { await navigator.share({ title: 'Mi diseño MY Pet', text: '¿Qué tal este collar para nuestro peludo? 🐾', url }); return; }
      catch (err) { if (err.name === 'AbortError') return; }
    }
    try { await navigator.clipboard.writeText(url); toast('Enlace copiado. ¡Compártelo con quien quieras!'); }
    catch { window.prompt('Copia este enlace:', url); }
  });

  // Botones "Diseñar" de cada estilo
  $$('[data-estilo]').forEach((b) => {
    if (b.tagName !== 'BUTTON') return;
    b.addEventListener('click', () => {
      cambio({ estilo: b.dataset.estilo });
      sincronizarFormulario();
      track('disenar_estilo', { estilo: b.dataset.estilo });
      desplazarA($('#personaliza'));
    });
  });

  // "Quiero uno así" de la galería
  $$('[data-preset]').forEach((b) => b.addEventListener('click', () => {
    let preset = {};
    try { preset = JSON.parse(b.dataset.preset); } catch { /* preset inválido */ }
    cambio({ cantidad: 1, ...validarEstado(preset), nombre: '' });
    sincronizarFormulario();
    track('preset_galeria', { pieza: b.dataset.nombre, estilo: estado.estilo });
    desplazarA($('#personaliza'));
    toast(`Cargamos el diseño de ${b.dataset.nombre}. Ahora escribe el nombre de tu peludo ✨`);
  }));

  if (desdeURL) {
    interactuo = true;
    requestAnimationFrame(() => desplazarA($('#personaliza')));
  }
}

/* ==== 11. RESTO DE LA PÁGINA ==== */
function iniciarWhatsApp() {
  if (/x/i.test(CONFIG.whatsapp)) {
    console.warn('⚠️ MY Pet: configura tu número de WhatsApp en assets/js/app.js (CONFIG.whatsapp).');
  }
  $$('[data-wa]').forEach((a) => {
    const tipo = a.dataset.wa;
    a.href = urlWhatsApp(MENSAJES[tipo] || MENSAJES.general);
    a.target = '_blank';
    a.rel = 'noopener';
    a.addEventListener('click', () => track('whatsapp_click', { origen: a.dataset.origen || 'otro', tipo }));
  });
  $$('[data-track]').forEach((a) => a.addEventListener('click', () => track('cta_click', { cta: a.dataset.track })));
}

function iniciarPrecios() {
  $$('[data-precio]').forEach((el) => {
    const v = CONFIG.precios.estilos[el.dataset.precio];
    if (v != null) el.textContent = `Desde ${fmt(v)}`;
  });
}

function iniciarMenu() {
  const btn = $('.menu-btn'), nav = $('#nav');
  const cerrar = () => { nav.classList.remove('abierto'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Abrir menú'); };
  btn.addEventListener('click', () => {
    const abrir = !nav.classList.contains('abierto');
    nav.classList.toggle('abierto', abrir);
    btn.setAttribute('aria-expanded', String(abrir));
    btn.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  });
  $$('a', nav).forEach((a) => a.addEventListener('click', cerrar));
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') cerrar(); });
  document.addEventListener('click', (ev) => { if (!ev.target.closest('.header')) cerrar(); });
}

function iniciarGaleria() {
  const botones = $$('[data-filtro]'), piezas = $$('.pieza');
  const filtrar = (estilo) => {
    botones.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === estilo)));
    piezas.forEach((p) => { p.hidden = estilo !== 'todos' && p.dataset.estilo !== estilo; });
  };
  botones.forEach((b) => b.addEventListener('click', () => {
    filtrar(b.dataset.filtro);
    track('filtro_galeria', { estilo: b.dataset.filtro });
  }));
  $$('[data-filtrar]').forEach((a) => a.addEventListener('click', () => filtrar(a.dataset.filtrar)));
}

function iniciarVisibilidad() {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal').forEach((el) => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => io.observe(el));

  // Botón flotante: se oculta en el inicio, en el personalizador y en el cierre (ya hay botones ahí)
  const flotante = $('.wa-flotante'), barra = $('#barra-pedido'), barraCta = $('#barra-cta');
  const zonas = new Map();
  let enConfig = false, resumenVisible = false;
  const refrescar = () => {
    flotante.classList.toggle('oculto', [...zonas.values()].some(Boolean));
    const mostrarBarra = enConfig && !resumenVisible;
    barra.classList.toggle('visible', mostrarBarra);
    barra.setAttribute('aria-hidden', String(!mostrarBarra));
    barraCta.tabIndex = mostrarBarra ? 0 : -1;
  };
  const ioZonas = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      zonas.set(en.target, en.isIntersecting);
      if (en.target.id === 'personaliza') enConfig = en.isIntersecting;
      if (en.target.id === 'resumen-box') resumenVisible = en.isIntersecting;
    });
    refrescar();
  });
  ['.hero', '#personaliza', '.cierre'].forEach((s) => ioZonas.observe($(s)));
  const ioResumen = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => { resumenVisible = en.isIntersecting; });
    refrescar();
  });
  ioResumen.observe($('#resumen-box'));
}

document.addEventListener('DOMContentLoaded', () => {
  cargarAnalitica();
  iniciarWhatsApp();
  iniciarPrecios();
  iniciarMenu();
  iniciarGaleria();
  iniciarPersonalizador();
  iniciarVisibilidad();
  $('#anio').textContent = new Date().getFullYear();
});
