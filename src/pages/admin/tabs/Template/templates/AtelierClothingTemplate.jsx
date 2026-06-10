import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  ArrowUpRight,
  ArrowRight,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';

/* ----------------------------------------------------------------------------
   AtelierClothingTemplate
   Full editorial clothing storefront — preview only, no backend.
   Matches MonoTemplate pattern: props { template, onApply }.
---------------------------------------------------------------------------- */

// Inlined SVG fallback — used if any Unsplash URL ever fails. No network needed.
const FALLBACK_IMG =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#efe7da"/>
          <stop offset="100%" stop-color="#cdbfa6"/>
        </linearGradient>
      </defs>
      <rect width="600" height="800" fill="url(#g)"/>
      <text x="50%" y="50%" text-anchor="middle" font-family="Georgia, serif"
        font-size="28" fill="#7a6a4f" letter-spacing="6">ATELIER</text>
    </svg>`
  );

const SafeImage = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    onError={(e) => {
      if (e.currentTarget.src !== FALLBACK_IMG) {
        e.currentTarget.src = FALLBACK_IMG;
      }
    }}
    className={className}
  />
);

// Inline Instagram glyph — avoids dependency on lucide-react version
const InstagramIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80',
  heroSide:
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
  cat1: 'https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&w=900&q=80',
  cat2: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
  cat3: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80',
  prod1: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=900&q=80',
  prod2: 'https://images.unsplash.com/photo-1485231183945-fffde7cc051e?auto=format&fit=crop&w=900&q=80',
  prod3: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=900&q=80',
  prod4: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?auto=format&fit=crop&w=900&q=80',
  look1: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
  look2: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80',
  look3: 'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=900&q=80',
  editorial:
    'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=1400&q=80',
};

const PRODUCTS = [
  { name: 'Linen Overshirt — Bone', tag: 'New Season', price: '$148', img: IMAGES.prod1, colors: ['#efe7da', '#1f1d1a', '#a47148'] },
  { name: 'Wide-Leg Trouser — Ink', tag: 'Best Seller', price: '$182', img: IMAGES.prod2, colors: ['#1f1d1a', '#7a6a4f', '#efe7da'] },
  { name: 'Selvedge Denim — Indigo', tag: 'Limited',   price: '$224', img: IMAGES.prod3, colors: ['#2b3a55', '#1f1d1a'] },
  { name: 'Cashmere Knit — Sand',   tag: 'Restocked', price: '$268', img: IMAGES.prod4, colors: ['#cdbfa6', '#a47148', '#1f1d1a'] },
];

const AtelierClothingTemplate = ({ template = {}, onApply }) => {
  const [email, setEmail] = useState('');
  const brand = template.name || 'MAISON ÉCHO';

  return (
    <div
      data-testid="clothing-template-root"
      className="w-full bg-[#f5f0e7] text-neutral-900"
      style={{ fontFamily: '"Outfit", "Helvetica Neue", Arial, sans-serif' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Outfit:wght@300;400;500;600&display=swap');
        .font-serif-display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .marquee-track { animation: atelier-marquee 32s linear infinite; }
        @keyframes atelier-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* Announcement marquee */}
      <div className="overflow-hidden border-b border-neutral-900/10 bg-neutral-900 text-[11px] uppercase tracking-[0.35em] text-[#f5f0e7]">
        <div className="marquee-track flex whitespace-nowrap py-2.5">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-12 px-6">
              <span>Complimentary shipping over $150</span>
              <span aria-hidden>✦</span>
              <span>Atelier-made in Lisbon</span>
              <span aria-hidden>✦</span>
              <span>Free returns within 30 days</span>
              <span aria-hidden>✦</span>
              <span>New Resort Collection — Now live</span>
              <span aria-hidden>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-900/10 bg-[#f5f0e7]/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-5 lg:px-10">
          <nav className="hidden items-center gap-7 text-[12px] uppercase tracking-[0.28em] text-neutral-700 lg:flex">
            <a href="#shop" className="transition hover:text-neutral-900">Women</a>
            <a href="#shop" className="transition hover:text-neutral-900">Men</a>
            <a href="#lookbook" className="transition hover:text-neutral-900">Lookbook</a>
            <a href="#journal" className="transition hover:text-neutral-900">Journal</a>
          </nav>
          <button className="rounded-full p-2 text-neutral-700 transition hover:bg-neutral-900/5 lg:hidden" data-testid="mobile-menu-btn">
            <Menu className="h-5 w-5" />
          </button>

          <a href="#top" className="font-serif-display text-center text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl" data-testid="brand-logo">
            {brand}
          </a>

          <div className="flex items-center justify-end gap-1 text-neutral-700">
            <button className="rounded-full p-2.5 transition hover:bg-neutral-900/5" aria-label="Search"><Search className="h-4 w-4" /></button>
            <button className="hidden rounded-full p-2.5 transition hover:bg-neutral-900/5 sm:inline-flex" aria-label="Account"><User className="h-4 w-4" /></button>
            <button className="rounded-full p-2.5 transition hover:bg-neutral-900/5" aria-label="Wishlist"><Heart className="h-4 w-4" /></button>
            <button className="relative rounded-full p-2.5 transition hover:bg-neutral-900/5" aria-label="Bag">
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#a4452f]" />
            </button>
            {onApply && (
              <button
                onClick={onApply}
                data-testid="apply-template-btn"
                className="ml-3 hidden rounded-full bg-neutral-900 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#f5f0e7] transition hover:bg-neutral-800 sm:inline-flex"
              >
                Apply
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-neutral-500">
              <span className="h-px w-10 bg-neutral-400" />
              Resort 26 — Collection 04
            </div>
            <h1 className="font-serif-display mt-6 text-[clamp(2.5rem,7vw,5.75rem)] font-medium leading-[1.02] tracking-tight text-neutral-900">
              {template.hero_heading || (
                <>Quiet clothes <br />for <em className="italic text-[#a4452f]">loud</em> lives.</>
              )}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-neutral-600">
              {template.hero_subtext ||
                'Considered tailoring, natural fibres, and a palette borrowed from the Iberian coast. Built in small batches at our atelier in Lisbon.'}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#shop" className="group inline-flex items-center gap-3 rounded-full bg-neutral-900 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.3em] text-[#f5f0e7] transition hover:bg-neutral-800">
                Shop the collection
                <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
              </a>
              <a href="#lookbook" className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-700 underline-offset-8 hover:underline">
                View lookbook <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-neutral-900/10 pt-8 text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              <div><p className="font-serif-display text-3xl font-medium tracking-tight text-neutral-900">12k+</p><p className="mt-2">Happy wearers</p></div>
              <div><p className="font-serif-display text-3xl font-medium tracking-tight text-neutral-900">38</p><p className="mt-2">Countries shipped</p></div>
              <div><p className="font-serif-display text-3xl font-medium tracking-tight text-neutral-900">100%</p><p className="mt-2">Natural fibres</p></div>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-neutral-200">
              <SafeImage src={IMAGES.hero} alt="Atelier hero" className="h-full w-full object-cover" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-[#f5f0e7]/95 px-4 py-3 backdrop-blur-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Featured</p>
                  <p className="font-serif-display text-base text-neutral-900">The Bone Overshirt</p>
                </div>
                <button className="rounded-full bg-neutral-900 p-2.5 text-[#f5f0e7] transition hover:bg-neutral-800">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 hidden h-44 w-36 overflow-hidden rounded-[24px] border-4 border-[#f5f0e7] shadow-xl lg:block">
              <SafeImage src={IMAGES.heroSide} alt="Atelier side" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="border-y border-neutral-900/10 bg-[#efe7da]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-7 lg:px-10">
          {['VOGUE', 'KINFOLK', 'CEREAL', 'WALLPAPER*', 'AnOther', 'GQ'].map((p) => (
            <span key={p} className="font-serif-display text-lg italic tracking-[0.15em] text-neutral-500">{p}</span>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="shop" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">Shop by category</p>
            <h2 className="font-serif-display mt-3 max-w-2xl text-4xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-5xl">
              Three edits, one wardrobe.
            </h2>
          </div>
          <a href="#shop" className="hidden items-center gap-2 text-[12px] uppercase tracking-[0.3em] text-neutral-700 hover:text-neutral-900 sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            { label: 'Womenswear', count: '142 pieces', img: IMAGES.cat1 },
            { label: 'Menswear',   count: '96 pieces',  img: IMAGES.cat2 },
            { label: 'Accessories',count: '58 pieces',  img: IMAGES.cat3 },
          ].map((c, i) => (
            <a key={c.label} href="#shop" className="group relative block aspect-[3/4] overflow-hidden rounded-[24px] bg-neutral-200">
              <SafeImage src={c.img} alt={c.label} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/55 via-neutral-900/0 to-neutral-900/0" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[#f5f0e7]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#f5f0e7]/80">0{i + 1}</p>
                  <p className="font-serif-display mt-2 text-3xl">{c.label}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#f5f0e7]/80">{c.count}</p>
                </div>
                <span className="rounded-full bg-[#f5f0e7] p-3 text-neutral-900 transition group-hover:bg-[#a4452f] group-hover:text-[#f5f0e7]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="bg-[#efe7da] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">New arrivals</p>
              <h2 className="font-serif-display mt-3 text-4xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-5xl">
                Fresh off the atelier floor.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em]">
              {['All', 'Tops', 'Trousers', 'Denim', 'Knitwear'].map((f, i) => (
                <button key={f}
                  className={`rounded-full border px-4 py-2 transition ${
                    i === 0
                      ? 'border-neutral-900 bg-neutral-900 text-[#f5f0e7]'
                      : 'border-neutral-300 bg-transparent text-neutral-700 hover:border-neutral-900 hover:text-neutral-900'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p, i) => (
              <article key={p.name} data-testid={`product-card-${i}`} className="group relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-neutral-200">
                  <SafeImage src={p.img} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#f5f0e7]/95 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-neutral-900">
                    {p.tag}
                  </span>
                  <button className="absolute right-3 top-3 rounded-full bg-[#f5f0e7]/95 p-2 text-neutral-900 transition hover:bg-[#a4452f] hover:text-[#f5f0e7]">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="absolute bottom-3 left-3 right-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-[#f5f0e7] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Quick add <ShoppingBag className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif-display text-lg leading-tight text-neutral-900">{p.name}</h3>
                    <div className="mt-2 flex items-center gap-1.5">
                      {p.colors.map((c, ci) => (
                        <span key={ci} className="h-3 w-3 rounded-full border border-neutral-300" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-medium tracking-wide text-neutral-900">{p.price}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a href="#shop" className="inline-flex items-center gap-3 rounded-full border border-neutral-900 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-900 hover:text-[#f5f0e7]">
              View all 142 pieces <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Lookbook */}
      <section id="lookbook" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:pt-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">The lookbook</p>
            <h2 className="font-serif-display mt-3 text-4xl font-medium leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl">
              An Iberian summer, in linen.
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-neutral-600">
              Shot along the cliffs of Sagres at golden hour — a study in sea-bleached
              tones, slow tailoring, and the kind of clothes you keep for a decade.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#lookbook" className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-[#f5f0e7] transition hover:bg-neutral-800">
                Read the journal <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-7 lg:grid-cols-6">
            <div className="lg:col-span-4 lg:row-span-2">
              <div className="aspect-[4/5] overflow-hidden rounded-[24px] bg-neutral-200">
                <SafeImage src={IMAGES.look1} alt="Lookbook 1" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="aspect-square overflow-hidden rounded-[24px] bg-neutral-200">
                <SafeImage src={IMAGES.look2} alt="Lookbook 2" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="aspect-square overflow-hidden rounded-[24px] bg-neutral-200">
                <SafeImage src={IMAGES.look3} alt="Lookbook 3" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="bg-neutral-900 py-20 text-[#f5f0e7] lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-[#f5f0e7]/60">Our promise</p>
              <h2 className="font-serif-display mt-3 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
                Made slowly, <br /> worn forever.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-8 text-[#f5f0e7]/70">
                Each piece is cut in batches of fewer than 80. No deadstock,
                no markdowns, no rushing the cloth.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { icon: Truck,       label: 'Free shipping',     sub: 'On orders over $150' },
                { icon: RotateCcw,   label: '30-day returns',    sub: 'Free, no questions' },
                { icon: ShieldCheck, label: 'Lifetime repairs',  sub: 'In-atelier mending' },
              ].map((v, i) => (
                <div key={i} className="rounded-[24px] border border-[#f5f0e7]/15 bg-[#f5f0e7]/5 p-6">
                  <v.icon className="h-5 w-5 text-[#f5f0e7]/80" />
                  <p className="font-serif-display mt-4 text-xl">{v.label}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#f5f0e7]/60">{v.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">Words from our wearers</p>
          <h2 className="font-serif-display mx-auto mt-3 max-w-3xl text-4xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-5xl">
            “Clothes that feel like a quiet decision.”
          </h2>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {[
            { quote: 'The linen overshirt has lived through three summers and looks better than the day it arrived. Cut like nothing else I own.', name: 'Camille R.', place: 'Paris' },
            { quote: 'I bought one trouser. I now own four. The fit is unrushed in a way I didn\'t know I needed.', name: 'Jonah M.', place: 'Brooklyn' },
            { quote: 'Packaging, fabric, finishing — every detail has been considered. The closest thing to a perfect wardrobe.', name: 'Aiko S.', place: 'Kyoto' },
          ].map((t, i) => (
            <figure key={i} className="flex h-full flex-col justify-between rounded-[24px] border border-neutral-900/10 bg-[#efe7da] p-8">
              <div className="flex gap-1 text-[#a4452f]">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="font-serif-display mt-6 text-xl leading-snug text-neutral-900">“{t.quote}”</blockquote>
              <figcaption className="mt-8 text-[11px] uppercase tracking-[0.3em] text-neutral-500">{t.name} — {t.place}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Editorial banner */}
      <section className="relative overflow-hidden">
        <div className="relative h-[60vh] min-h-[420px] w-full">
          <SafeImage src={IMAGES.editorial} alt="Editorial" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-neutral-900/35" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div className="max-w-3xl text-[#f5f0e7]">
              <p className="text-[11px] uppercase tracking-[0.4em] text-[#f5f0e7]/80">Coming February</p>
              <h2 className="font-serif-display mt-4 text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
                The Winter Capsule, <br /> in twelve pieces.
              </h2>
              <a href="#shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f5f0e7] px-7 py-4 text-[12px] uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-[#a4452f] hover:text-[#f5f0e7]">
                Reserve a piece <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="journal" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 rounded-[28px] border border-neutral-900/10 bg-[#efe7da] p-10 lg:grid-cols-2 lg:items-center lg:p-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">The Letter</p>
            <h2 className="font-serif-display mt-3 text-4xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-5xl">
              Slow stories, <br /> straight to your inbox.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-neutral-600">
              One thoughtful note a month — collection previews, atelier dispatches,
              and 10% off your first order.
            </p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
            className="flex flex-col gap-3 sm:flex-row"
            data-testid="newsletter-form"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full flex-1 rounded-full border border-neutral-900/20 bg-[#f5f0e7] px-6 py-4 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:outline-none"
            />
            <button type="submit" className="rounded-full bg-neutral-900 px-7 py-4 text-[11px] uppercase tracking-[0.3em] text-[#f5f0e7] transition hover:bg-neutral-800">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <TemplatePreviewMeta template={{ ...template, name: brand, tags: template.tags || ['clothing', 'editorial', 'lookbook'] }} />

      {/* Footer */}
      <footer className="bg-neutral-900 text-[#f5f0e7]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <a href="#top" className="font-serif-display text-3xl tracking-tight">{brand}</a>
              <p className="mt-5 max-w-xs text-sm leading-7 text-[#f5f0e7]/65">
                A small atelier making quiet, considered clothing in Lisbon since 2018.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a className="rounded-full border border-[#f5f0e7]/20 p-2.5 transition hover:bg-[#f5f0e7] hover:text-neutral-900" href="#" aria-label="Instagram">
                  <InstagramIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
            {[
              { title: 'Shop',    items: ['Women', 'Men', 'Accessories', 'Gift cards'] },
              { title: 'Atelier', items: ['Our story', 'Sustainability', 'Repairs', 'Journal'] },
              { title: 'Help',    items: ['Shipping', 'Returns', 'Size guide', 'Contact'] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#f5f0e7]/60">{col.title}</p>
                <ul className="mt-5 space-y-3 text-sm text-[#f5f0e7]/85">
                  {col.items.map((i) => (
                    <li key={i}><a href="#" className="transition hover:text-[#f5f0e7]">{i}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[#f5f0e7]/10 pt-6 text-[11px] uppercase tracking-[0.25em] text-[#f5f0e7]/55 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {brand}. Made slowly in Lisbon.</p>
            <div className="flex gap-5">
              <a href="#" className="transition hover:text-[#f5f0e7]">Privacy</a>
              <a href="#" className="transition hover:text-[#f5f0e7]">Terms</a>
              <a href="#" className="transition hover:text-[#f5f0e7]">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AtelierClothingTemplate;