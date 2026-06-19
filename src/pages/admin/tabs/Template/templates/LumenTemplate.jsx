import React, { useEffect, useState } from 'react';
import {
  ShoppingBag, Search, Heart, Menu, X, ArrowRight, ArrowUpRight, ArrowDown,
  Recycle, Leaf, Sparkles, Globe2, Truck, ShieldCheck, RotateCcw,
  Plus, Minus, Star, MapPin, Mail, Phone
} from 'lucide-react';

import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import TemplatePreviewMeta from '../TemplatePreviewMeta';

/* HERO */
import HeroFashion from "../../../../../assets/templates/lumen/hero/hero-fashion.jpg";

/* COLLECTIONS */
import OuterwearImg from "../../../../../assets/templates/lumen/collections/outerwear.jpg";
import KnitwearImg from "../../../../../assets/templates/lumen/collections/knitwear.jpg";
import DenimImg from "../../../../../assets/templates/lumen/collections/denim.jpg";
import BasicsImg from "../../../../../assets/templates/lumen/collections/basics.jpg";

/* PRODUCTS */
import FieldOvershirtImg from "../../../../../assets/templates/lumen/products/field-overshirt.jpg";
import LoopKnitImg from "../../../../../assets/templates/lumen/products/loop-knit.jpg";
import LumenDenimImg from "../../../../../assets/templates/lumen/products/denim.jpg";
import SoftCrewImg from "../../../../../assets/templates/lumen/products/soft-crew.jpg";
import TrailCardiganImg from "../../../../../assets/templates/lumen/products/trail-cardigan.jpg";
import LinenTrouserImg from "../../../../../assets/templates/lumen/products/linen-trouser.jpg";

/* STORY */
import StoryImg from "../../../../../assets/templates/lumen/story/story.jpg";

/* ---------- Theme tokens ---------- */
// const SAGE = '#5d6e54';
// const SAGE_DEEP = '#2f3a2a';
// const CREAM = '#efece4';
// const CREAM_DARK = '#e6e2d6';
// const DISPLAY = { fontFamily: '"Instrument Serif", "Cormorant Garamond", Georgia, serif' };
// const SANS = { fontFamily: '"Inter Tight", "Inter", system-ui, sans-serif' };
const SAGE = '#5d6e54';
const SAGE_DEEP = '#2f3a2a';
const CREAM = '#efece4';
const CREAM_DARK = '#e6e2d6';

const BLACK = '#050505';
const BLACK_SOFT = '#0F0F14';

const PURPLE = '#6D28D9';
const PURPLE_LIGHT = '#8B5CF6';
const PURPLE_GLOW = '#A855F7';

const TEXT = '#FFFFFF';
const TEXT_MUTED = '#A1A1AA';

const DISPLAY = {
  fontFamily: '"Clash Display","Space Grotesk",sans-serif'
};

const SANS = {
  fontFamily: '"Inter",sans-serif'
};

/* ---------- Data ---------- */
const COLLECTIONS = [
  { slug: 'outerwear', name: 'Outerwear', count: 14, img: OuterwearImg },
  { slug: 'knitwear',  name: 'Knitwear',  count: 22, img: KnitwearImg },
  { slug: 'denim',     name: 'Denim',     count: 18, img: DenimImg },
  { slug: 'basics',    name: 'Basics',    count: 31, img: BasicsImg },
];

const PRODUCTS = [
  { id: 'p1', name: 'Field Overshirt', price: 168, tag: 'Recycled Cotton', img: FieldOvershirtImg },
  { id: 'p2', name: 'Loop Knit Sweater', price: 142, tag: 'Regenerated Wool', img: LoopKnitImg },
  { id: 'p3', name: 'Lumen Denim', price: 188, tag: 'Hemp Blend', img: LumenDenimImg },
  { id: 'p4', name: 'Soft Crew Tee', price: 48, tag: 'Organic Cotton', img: SoftCrewImg },
  { id: 'p5', name: 'Trail Cardigan', price: 210, tag: 'Recycled Wool', img: TrailCardiganImg },
  { id: 'p6', name: 'Linen Trouser', price: 158, tag: 'Linen 100%', img: LinenTrouserImg },
];

const PROCESS = [
  { step: '01', title: 'Source', text: 'We reclaim post-consumer textiles and pair them with low-impact fibers.', icon: Recycle },
  { step: '02', title: 'Design', text: 'Each piece is patterned for longevity and re-circulation, not seasonality.', icon: Sparkles },
  { step: '03', title: 'Make', text: 'Cut and sewn in small batches by certified partner lumen.', icon: Leaf },
  { step: '04', title: 'Return', text: 'Send your worn pieces back. We restore, resell, or recycle — never landfill.', icon: Globe2 },
];

const FAQS = [
  { q: 'What does "circular fashion" mean for Lumen?', a: 'Every garment is designed to come back to us — to be resold, repaired, or broken down into new fiber. Nothing is made to be discarded.' },
  { q: 'Where are your clothes made?', a: 'All Lumen pieces are produced in family-run lumens in Portugal and Italy under GOTS and Fair Wear certifications.' },
  { q: 'Do you offer take-back?', a: 'Yes. Return any Lumen piece in any condition and receive store credit toward your next purchase.' },
  { q: 'How should I care for my pieces?', a: 'Cold wash, line dry, and store folded. We include a care card with every order — it makes a real difference.' },
];

/* ---------- Global styles ---------- */
// const GlobalStyles = () => (
//   <style>{`
//     @keyframes spinSlow { from { transform: rotate(0); } to { transform: rotate(360deg); } }
//     @keyframes scrollX { from { transform: translateX(0); } to { transform: translateX(-50%); } }
//     @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
//     @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
//     .spin-slow { animation: spinSlow 22s linear infinite; }
//     .marquee { animation: scrollX 36s linear infinite; }
//     .fade-up { animation: fadeUp .9s cubic-bezier(.2,.7,.2,1) both; }
//     .bob { animation: bob 5s ease-in-out infinite; }
//     .img-zoom { transition: transform 1s cubic-bezier(.2,.7,.2,1); }
//     .group:hover .img-zoom { transform: scale(1.06); }
//     .lift { transition: transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s; }
//     .lift:hover { transform: translateY(-4px); box-shadow: 0 24px 60px -24px rgba(0,0,0,.25); }
//     .underline-grow { position: relative; }
//     .underline-grow::after { content:''; position:absolute; left:0; bottom:-3px; height:1px; width:0; background:currentColor; transition: width .4s cubic-bezier(.2,.7,.2,1); }
//     .underline-grow:hover::after { width:100%; }
//   `}</style>
// );

const GlobalStyles = () => (
<style>{`

body{
  background:#050505;
}

.glass{
  background:rgba(255,255,255,.04);
  backdrop-filter:blur(20px);
  border:1px solid rgba(255,255,255,.08);
}

.purple-glow{
  box-shadow:
  0 0 30px rgba(139,92,246,.4),
  0 0 80px rgba(139,92,246,.2);
}

.text-glow{
  text-shadow:
  0 0 30px rgba(168,85,247,.45);
}

@keyframes float{
  0%,100%{
    transform:translateY(0px);
  }
  50%{
    transform:translateY(-20px);
  }
}

.float{
  animation:float 6s ease-in-out infinite;
}

`}
</style>
)

/* ---------- Spinning circular badge ---------- */
const CircleBadge = ({ text = 'Circular · Fashion · Lumen · Studio · ', size = 180 }) => {
  const chars = text.split('');
  const step = 360 / chars.length;
  return (
    <div className="spin-slow relative" style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current" style={{ fontSize: 14, letterSpacing: 4, ...SANS }}>
          <textPath href="#circ" startOffset="0">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-current">
          <ArrowDown className="h-5 w-5" style={{ color: SAGE }} />
        </div>
      </div>
    </div>
  );
};

/* ---------- Main ---------- */
const LumenTemplate = ({ template, onApply }) => {
  const brand = template?.name || 'Lumen';
  const [open, setOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [legal, setLegal] = useState(null);

  useEffect(() => {
    const id = 'lumen-fonts';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      // l.href = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300..700&family=Instrument+Serif:ital@0;1&display=swap';
      l.href =
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;700&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BLACK, color: TEXT, ...SANS }}>
    {/* <div className="w-full" style={{ backgroundColor: CREAM, color: SAGE_DEEP, ...SANS }}> */}
      <GlobalStyles />

            {/* Top Announcement Bar */}
      <div
        className="border-b border-white/10 py-3"
        style={{
          background: BLACK,
          color: PURPLE_LIGHT,
        }}
      >
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="text-center text-xs uppercase tracking-[0.4em]">
            LIMITED EDITION • PREMIUM COLLECTION • FUTURE OF FASHION
          </div>
        </div>
      </div>

      {/* Header */}
      {/* <header className="sticky top-0 z-40 border-b" style={{ borderColor: '#d6d2c4', background: `${CREAM}f2`, backdropFilter: 'blur(8px)' }}> */}
       <header
  className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
  style={{
    background: 'rgba(5,5,5,0.8)',
    backdropFilter: 'blur(20px)',
  }}
>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          <button className="md:hidden" onClick={() => setOpen(!open)} data-testid="mobile-menu-toggle">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
         <a
  href="#"
  className="flex items-center gap-3 text-3xl font-bold tracking-tight text-white"
  style={DISPLAY}
  data-testid="brand-logo"
>
  <span
    className="h-3 w-3 rounded-full"
    style={{
      background: PURPLE,
      boxShadow: `0 0 20px ${PURPLE_LIGHT}`,
    }}
  />
  {brand}
</a>
          {/* <a href="#" className="flex items-center gap-2 text-2xl tracking-tight" style={DISPLAY} data-testid="brand-logo">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: SAGE }} />
            {brand}
          </a> */}
          <nav className="hidden items-center gap-10 text-sm text-white md:flex" data-testid="primary-nav">
            <a href="#collections" className="transition duration-300 hover:text-violet-400">Shop</a>
            <a href="#story" className="transition duration-300 hover:text-violet-400">Our Circle</a>
            <a href="#process" className="transition duration-300 hover:text-violet-400">Process</a>
            <a href="#journal" className="transition duration-300 hover:text-violet-400">Journal</a>
            <a href="#contact" className="transition duration-300 hover:text-violet-400">Contact</a>
          </nav>
          <div className="flex items-center gap-2 text-white">
            <button className="rounded-full p-2 transition hover:bg-white/10" data-testid="search-btn"><Search className="h-4 w-4" /></button>
            <button className="rounded-full p-2  transition hover:bg-white/10" data-testid="wishlist-btn"><Heart className="h-4 w-4" /></button>
            <button className="relative rounded-full p-2 transition hover:bg-white/10" data-testid="cart-btn">
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white" style={{ background: PURPLE }}>0</span>
            </button>
            <button
  onClick={onApply}
  className="
    ml-2
    hidden
    sm:inline-flex
    items-center
    rounded-full
    px-6
    py-3
    text-sm
    font-medium
    text-white
    transition
    hover:bg-violet-500
  "
  style={{
    background: PURPLE,
  }}
>
  Shop Now
</button>
            {/* <button onClick={onApply} className="ml-2 hidden rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:opacity-90 sm:inline-block" style={{ background: SAGE_DEEP }} data-testid="apply-template-btn">Try theme</button> */}
          </div>
        </div>
        {open && (
          <div className="border-t px-6 py-4 md:hidden" style={{ borderColor: '#d6d2c4' }} data-testid="mobile-nav">
            <div className="flex flex-col gap-3 text-sm">
              <a href="#collections" onClick={() => setOpen(false)}>Shop</a>
              <a href="#story" onClick={() => setOpen(false)}>Our Circle</a>
              <a href="#process" onClick={() => setOpen(false)}>Process</a>
              <a href="#journal" onClick={() => setOpen(false)}>Journal</a>
              <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 pb-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="fade-up">
              <p className="text-xs uppercase tracking-[0.5em]" style={{ color: SAGE }}>— Circular Wardrobe · 2026</p>
              <h1 className="mt-6 text-[12vw] leading-[0.92] tracking-tight md:text-[8.4vw]" style={DISPLAY}>
                {template?.hero_heading || (<>Wear it. <br /><em style={{ color: SAGE }}>Return it.</em><br /> Re-loop.</>)}
              </h1>
              <p className="mt-8 max-w-md text-base leading-8 text-stone-700">
                {template?.hero_subtext || 'Modern essentials made from regenerated and reclaimed fibers — designed to come back to us, not the landfill.'}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#collections" className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-xs uppercase tracking-[0.3em] text-white transition hover:opacity-90" style={{ background: SAGE_DEEP }} data-testid="hero-shop-btn">
                  Shop the collection <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                {/* <button onClick={onApply} className="text-xs uppercase tracking-[0.3em] underline-offset-8 hover:underline">Try this theme</button> */}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[40px]">
                <img src={HeroFashion} alt="Hero" className="h-[640px] w-full object-cover" />
              </div>
              {/* Floating spinning badge */}
              <div className="absolute -left-8 -top-8 bob" style={{ color: SAGE }}>
                <CircleBadge text={` ${brand.toUpperCase()} · CIRCULAR · STUDIO · `} />
              </div>
              {/* Stat card */}
              <div className="absolute -right-4 bottom-6 max-w-[220px] rounded-2xl p-5 text-white shadow-2xl" style={{ background: SAGE_DEEP }}>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Since 2021</p>
                <p className="mt-2 text-3xl tracking-tight" style={DISPLAY}>62 tons</p>
                <p className="mt-1 text-xs text-white/70">of textiles re-looped through Lumen members.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto max-w-[1400px] border-y px-6 py-8" style={{ borderColor: '#d6d2c4' }}>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { k: '94%', v: 'Reclaimed fibers' },
              { k: '14k+', v: 'Garments returned' },
              { k: '0', v: 'To landfill' },
              { k: '38', v: 'Countries shipping' },
            ].map((s, i) => (
              <div key={s.v} style={{ animationDelay: `${i * 0.1}s` }} className="fade-up">
                <p className="text-4xl tracking-tight" style={DISPLAY}>{s.k}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-stone-500">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS — bento */}
      <section id="collections" className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.5em]" style={{ color: SAGE }}>— 01 / Collections</p>
            <h2 className="mt-4 text-5xl tracking-tight md:text-7xl" style={DISPLAY}>Shop the circle.</h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] hover:underline">View all <ArrowUpRight className="h-4 w-4" /></a>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <a href="#" className="lift group relative col-span-2 row-span-2 overflow-hidden rounded-[32px]" data-testid="collection-outerwear">
            <img src={COLLECTIONS[0].img} alt={COLLECTIONS[0].name} className="img-zoom h-full min-h-[520px] w-full object-cover" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">{COLLECTIONS[0].count} pieces</p>
                <h3 className="mt-2 text-5xl md:text-6xl" style={DISPLAY}>{COLLECTIONS[0].name}</h3>
              </div>
              <ArrowUpRight className="h-6 w-6" />
            </div>
          </a>
          {COLLECTIONS.slice(1).map(c => (
            <a key={c.slug} href="#" className="lift group relative overflow-hidden rounded-[28px]" data-testid={`collection-${c.slug}`}>
              <img src={c.img} alt={c.name} className="img-zoom h-full min-h-[250px] w-full object-cover" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">{c.count} pieces</p>
                  <h3 className="mt-1 text-3xl" style={DISPLAY}>{c.name}</h3>
                </div>
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SHINE MARQUEE */}
      <section className="overflow-hidden border-y py-8" style={{ borderColor: '#d6d2c4' }}>
        <div className="marquee flex whitespace-nowrap text-7xl md:text-9xl" style={{ ...DISPLAY, color: SAGE }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 px-10">
              Re-loop <span style={{ color: SAGE_DEEP }}>✦</span>
              Re-wear <span style={{ color: SAGE_DEEP }}>✦</span>
              Re-make <span style={{ color: SAGE_DEEP }}>✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.5em]" style={{ color: SAGE }}>— 02 / Selected</p>
            <h2 className="mt-4 text-5xl tracking-tight md:text-7xl" style={DISPLAY}>Best looped.</h2>
          </div>
          <div className="flex gap-2 text-xs uppercase tracking-[0.3em]">
            {['All', 'New', 'Best', 'Limited'].map((t, i) => (
              <button key={t} className={`rounded-full px-4 py-1.5 transition ${i===0 ? 'text-white' : 'hover:bg-black/5'}`} style={i===0 ? { background: SAGE_DEEP } : { background: CREAM_DARK, color: SAGE_DEEP }} data-testid={`product-filter-${t.toLowerCase()}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <div key={p.id} className="group" data-testid={`product-card-${p.id}`} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="lift relative overflow-hidden rounded-[28px]" style={{ background: CREAM_DARK }}>
                <img src={p.img} alt={p.name} className="img-zoom h-[440px] w-full object-cover" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[10px] uppercase tracking-[0.3em]" style={{ color: SAGE_DEEP }}>
                  <Leaf className="h-3 w-3" /> {p.tag}
                </span>
                <button className="absolute right-4 top-4 rounded-full bg-white/95 p-2.5 transition hover:bg-stone-900 hover:text-white" data-testid={`wishlist-${p.id}`}><Heart className="h-4 w-4" /></button>
                <button className="absolute inset-x-4 bottom-4 translate-y-12 rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100" style={{ background: SAGE_DEEP }} data-testid={`add-cart-${p.id}`}>Add to bag</button>
              </div>
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-stone-500">— {String(i+1).padStart(2,'0')}</p>
                  <h3 className="mt-1 text-2xl tracking-tight" style={DISPLAY}>{p.name}</h3>
                </div>
                <span className="text-lg tracking-tight" style={DISPLAY}>${p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY / CIRCULAR */}
      <section id="story" className="py-24" style={{ background: SAGE_DEEP, color: CREAM }}>
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-white/60">— 03 / Our circle</p>
              <h2 className="mt-4 text-5xl leading-[1.05] md:text-7xl" style={DISPLAY}>
                A wardrobe that <em>returns</em>.
              </h2>
              <p className="mt-8 max-w-xl text-base leading-8 text-white/80">
                Lumen is built around a single idea: clothes should circulate, not accumulate. Every piece is designed to be returned to us — to be worn again, repaired, or remade into new fiber.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { k: '12 months', v: 'Average garment afterlife extension' },
                  { k: '3 routes', v: 'Resell · Repair · Recycle' },
                ].map(s => (
                  <div key={s.v}>
                    <p className="text-3xl" style={DISPLAY}>{s.k}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-[40px]">
                <img src={StoryImg} alt="Lumen" className="h-[600px] w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 spin-slow" style={{ color: CREAM }}>
                <CircleBadge text=" RE-LOOP · RE-WEAR · RE-MAKE · " size={150} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.5em]" style={{ color: SAGE }}>— 04 / Process</p>
          <h2 className="mt-4 text-5xl tracking-tight md:text-7xl" style={DISPLAY}>How the loop closes.</h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map(({ step, title, text, icon: Icon }) => (
            <div key={step} className="lift rounded-[28px] border p-7" style={{ borderColor: '#d6d2c4', background: 'white' }} data-testid={`process-${step}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-stone-500">{step}</span>
                <Icon className="h-5 w-5" style={{ color: SAGE }} />
              </div>
              <h3 className="mt-8 text-3xl tracking-tight" style={DISPLAY}>{title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial split */}
      <section id="journal" className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-[40px]">
            <img src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5c6?auto=format&w=1400&q=80" alt="Editorial" className="h-[600px] w-full object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.5em]" style={{ color: SAGE }}>— 05 / Journal</p>
            <h2 className="mt-4 text-5xl leading-[1.05] tracking-tight md:text-6xl" style={DISPLAY}>
              Notes from the studio.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-700">
              Field reports on materials, repair tutorials, and slow style — written by the team and our makers.
            </p>
            <div className="mt-10 space-y-2">
              {[
                { t: 'A short guide to caring for regenerated wool', d: 'Jan 12, 2026' },
                { t: 'Inside our take-back partner in Porto', d: 'Dec 28, 2025' },
                { t: 'Five small fixes that double a garment\'s life', d: 'Dec 14, 2025' },
              ].map((j, i) => (
                <a key={i} href="#" className="group flex items-center justify-between border-b py-5 transition" style={{ borderColor: '#d6d2c4' }} data-testid={`journal-row-${i}`}>
                  <div>
                    <h3 className="text-2xl tracking-tight transition group-hover:translate-x-2" style={DISPLAY}>{j.t}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-stone-500">{j.d}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y" style={{ borderColor: '#d6d2c4' }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-6 py-10 text-sm md:grid-cols-4">
          {[
            { icon: Truck, l: 'Carbon-neutral shipping' },
            { icon: ShieldCheck, l: 'Lifetime repair' },
            { icon: RotateCcw, l: 'Take-back guaranteed' },
            { icon: Star, l: '4.9 / 5 member rating' },
          ].map(({ icon: Icon, l }) => (
            <div key={l} className="flex items-center gap-3"><Icon className="h-5 w-5" style={{ color: SAGE }} />{l}</div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL — single oversized */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="flex justify-center gap-1" style={{ color: SAGE_DEEP }}>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
        </div>
        <p className="mt-8 text-3xl leading-snug md:text-5xl" style={DISPLAY}>
          "Lumen has changed how I think about owning clothes. I send pieces back, get credit, and start again. It just makes sense."
        </p>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-stone-500">— Iris W., member since 2023</p>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: CREAM_DARK }}>
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs uppercase tracking-[0.5em]" style={{ color: SAGE }}>— 06 / FAQ</p>
          <h2 className="mt-4 text-5xl tracking-tight md:text-6xl" style={DISPLAY}>The fine print.</h2>
          <div className="mt-12 divide-y border-y" style={{ borderColor: '#cdc8b9' }}>
            {FAQS.map((f, i) => (
              <button key={i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full py-6 text-left" data-testid={`faq-${i}`}>
                <div className="flex items-center justify-between gap-6">
                  <span className="text-xl md:text-2xl" style={DISPLAY}>{f.q}</span>
                  {openFaq === i ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
                </div>
                {openFaq === i && <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">{f.a}</p>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.5em]" style={{ color: SAGE }}>— 07 / Stay in the loop</p>
        <h2 className="mt-4 text-5xl tracking-tight md:text-7xl" style={DISPLAY}>Join the circle.</h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-stone-700">Quarterly updates, drop access, and a 10% welcome.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row" data-testid="newsletter-form">
          <input type="email" placeholder="Your email" className="flex-1 rounded-full border bg-white px-5 py-3.5 text-sm focus:outline-none" style={{ borderColor: '#cdc8b9' }} data-testid="newsletter-email" />
          <button type="submit" className="rounded-full px-7 py-3.5 text-xs uppercase tracking-[0.3em] text-white" style={{ background: SAGE_DEEP }} data-testid="newsletter-submit">Subscribe</button>
        </form>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-[1400px] px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.5em]" style={{ color: SAGE }}>— 08 / Contact</p>
            <h2 className="mt-4 text-5xl tracking-tight md:text-6xl" style={DISPLAY}>Visit. Write. Call.</h2>
            <div className="mt-10 space-y-4 text-sm">
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4" /> Rua das Flores 22, Porto, Portugal</p>
              <p className="flex items-center gap-3"><Mail className="h-4 w-4" /> hello@{brand.toLowerCase().replace(/\s/g,'')}.studio</p>
              <p className="flex items-center gap-3"><Phone className="h-4 w-4" /> +351 22 555 0119</p>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 rounded-[28px] border p-8" style={{ borderColor: '#cdc8b9', background: 'white' }} data-testid="contact-form">
            <div className="grid gap-4 sm:grid-cols-2">
              <input placeholder="Name" className="rounded-full border px-5 py-3 text-sm focus:outline-none" style={{ borderColor: '#cdc8b9' }} data-testid="contact-name" />
              <input type="email" placeholder="Email" className="rounded-full border px-5 py-3 text-sm focus:outline-none" style={{ borderColor: '#cdc8b9' }} data-testid="contact-email" />
            </div>
            <input placeholder="Subject" className="w-full rounded-full border px-5 py-3 text-sm focus:outline-none" style={{ borderColor: '#cdc8b9' }} data-testid="contact-subject" />
            <textarea placeholder="Message" rows={5} className="w-full rounded-3xl border px-5 py-3 text-sm focus:outline-none" style={{ borderColor: '#cdc8b9' }} data-testid="contact-message" />
            <button type="submit" className="w-full rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] text-white" style={{ background: SAGE_DEEP }} data-testid="contact-submit">Send message</button>
          </form>
        </div>
      </section>

      <TemplatePreviewMeta template={template} />

      {/* FOOTER */}
      <footer style={{ background: SAGE_DEEP, color: CREAM }}>
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-3xl" style={DISPLAY}>
                <span className="inline-block h-2 w-2 rounded-full bg-white" /> {brand}
              </div>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">Modern essentials made to circulate. Designed in Porto, made in Europe, returned to us — never to landfill.</p>
              <div className="mt-6 flex gap-2">
                <a href="#" className="rounded-full bg-white/5 p-2.5 hover:bg-white/10"><FaInstagram className="h-4 w-4" /></a>
                <a href="#" className="rounded-full bg-white/5 p-2.5 hover:bg-white/10"><FaFacebookF className="h-4 w-4" /></a>
                <a href="#" className="rounded-full bg-white/5 p-2.5 hover:bg-white/10"><FaXTwitter className="h-4 w-4" /></a>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Shop</p>
              <ul className="mt-4 space-y-2 text-sm">
                {COLLECTIONS.map(c => <li key={c.slug}><a href="#" className="hover:text-white">{c.name}</a></li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Circle</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#story" className="hover:text-white">Our Story</a></li>
                <li><a href="#process" className="hover:text-white">Process</a></li>
                <li><a href="#journal" className="hover:text-white">Journal</a></li>
                <li><a href="#" className="hover:text-white">Take-back</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Support</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white">Repair Guide</a></li>
                <li><button onClick={() => setLegal('privacy')} className="hover:text-white" data-testid="footer-privacy">Privacy Policy</button></li>
                <li><button onClick={() => setLegal('terms')} className="hover:text-white" data-testid="footer-terms">Terms & Conditions</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {brand}. All rights reserved.</p>
            <p>B-Corp · Fair Wear · GOTS</p>
          </div>
        </div>

        {/* Giant brand mark */}
        <div className="overflow-hidden border-t border-white/10 py-10">
          <div className="marquee flex whitespace-nowrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="px-8 text-[14vw] leading-none text-white/5" style={DISPLAY}>{brand} ✦ </span>
            ))}
          </div>
        </div>
      </footer>

      {/* Legal modal */}
      {legal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" onClick={() => setLegal(null)} data-testid="legal-modal">
          <div onClick={(e) => e.stopPropagation()} className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-10" style={{ background: CREAM, color: SAGE_DEEP }}>
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-3xl" style={DISPLAY}>{legal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}</h3>
              <button onClick={() => setLegal(null)} className="rounded-full p-2 hover:bg-black/5"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 space-y-4 text-sm leading-7 text-stone-700">
              {legal === 'privacy' ? (
                <>
                  <p>We respect your privacy. This explains what data we collect and how we use it.</p>
                  <p><strong>Data we collect:</strong> name, email, shipping address, payment details (via a PCI-compliant processor), and basic analytics.</p>
                  <p><strong>How we use it:</strong> to fulfill your order, send transactional emails, and — only with consent — share occasional updates.</p>
                  <p><strong>Your rights:</strong> request access, correction, or deletion anytime by emailing privacy@{brand.toLowerCase().replace(/\s/g,'')}.studio.</p>
                  <p>We never sell your data. Last updated: January 2026.</p>
                </>
              ) : (
                <>
                  <p>By placing an order with {brand}, you agree to these terms.</p>
                  <p><strong>Orders:</strong> subject to availability and price confirmation.</p>
                  <p><strong>Pricing:</strong> in EUR; may change without notice.</p>
                  <p><strong>Shipping:</strong> estimated delivery times are not guaranteed.</p>
                  <p><strong>Returns & take-back:</strong> unworn pieces within 30 days. Worn pieces eligible for store credit via take-back.</p>
                  <p>Last updated: January 2026.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LumenTemplate;