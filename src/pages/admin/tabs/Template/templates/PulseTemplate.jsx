import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import { useTemplateScroll } from '../../../../../context/ScrollContainerContext';
import {
  Heart,
  ShoppingCart,
  Menu as MenuIcon,
  X,
  Coffee,
  Utensils,
  Cake,
  Wine,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  // Instagram,
  // Globe,
  // MessageCircle,
  ChevronRight,
  Sparkles,
  Flame,
  Leaf,
  ArrowRight,
} from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';


/* ============================================================
   PULSE — Neon Cafe / Restaurant Template
   Multi-page feel via in-component routing (no backend, no router).
   Palette: pitch black + electric cyan + neon magenta.
   ============================================================ */

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'about', label: 'Story' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'reserve', label: 'Reserve' },
  { id: 'contact', label: 'Contact' },
];

const MENU_CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'mains', label: 'Mains', icon: Utensils },
  { id: 'desserts', label: 'Desserts', icon: Cake },
  { id: 'drinks', label: 'Drinks', icon: Wine },
];

const MENU_ITEMS = [
  { id: 1, cat: 'coffee', name: 'Neon Espresso', price: '$4.50', desc: 'Double shot, electric kick, velvet crema.', img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&w=900&q=80', tag: 'Signature' },
  { id: 2, cat: 'coffee', name: 'Magenta Mocha', price: '$6.20', desc: 'Beetroot infused mocha with rose foam art.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&w=900&q=80', tag: 'New' },
  { id: 3, cat: 'mains', name: 'Voltage Bowl', price: '$13.80', desc: 'Charred salmon, ramen, neon scallion oil.', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&w=900&q=80', tag: 'Hot' },
  { id: 4, cat: 'mains', name: 'Truffle Smash Burger', price: '$15.40', desc: 'Wagyu patty, truffle aioli, brioche.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&w=900&q=80', tag: 'Chef Pick' },
  { id: 5, cat: 'desserts', name: 'Lumen Cheesecake', price: '$7.90', desc: 'Yuzu cheesecake glazed in raspberry mirror.', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&w=900&q=80', tag: 'Loved' },
  { id: 6, cat: 'desserts', name: 'Galaxy Donut', price: '$5.10', desc: 'Cosmic glaze, edible glitter, brûlée crust.', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&w=900&q=80', tag: 'New' },
  { id: 7, cat: 'drinks', name: 'Cyan Lemonade', price: '$6.00', desc: 'Butterfly pea, citrus, electric tonic.', img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&w=900&q=80', tag: 'Cool' },
  { id: 8, cat: 'drinks', name: 'Sunset Mojito', price: '$9.50', desc: 'Passionfruit, mint, rum, sunset gradient.', img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&w=900&q=80', tag: 'Bar' },
  { id: 9, cat: 'coffee', name: 'Cold Brew Tonic', price: '$5.80', desc: 'Slow brewed, citrus tonic, smoked ice.', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&w=900&q=80', tag: 'Trending' },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&w=900&q=80',
];

const TESTIMONIALS = [
  { name: 'Aria K.', role: 'Food Blogger · @ariaeats', text: 'Pulse feels like a neon dream. The Magenta Mocha is unreal.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&w=200&q=80' },
  { name: 'Devon M.', role: 'Local Regular', text: 'My after-work ritual. Voltage Bowl > everything.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=200&q=80' },
  { name: 'Sana R.', role: 'Photographer', text: 'Every corner is a shot. It glows even in daylight.', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&w=200&q=80' },
];

/* ---------- Reusable bits ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const NeonText = ({ children, color = 'cyan', className = '' }) => {
  const map = {
    cyan: 'text-cyan-300 [text-shadow:0_0_18px_rgba(34,211,238,0.55),0_0_42px_rgba(34,211,238,0.35)]',
    magenta: 'text-fuchsia-400 [text-shadow:0_0_18px_rgba(232,121,249,0.55),0_0_42px_rgba(232,121,249,0.35)]',
    white: 'text-white [text-shadow:0_0_18px_rgba(255,255,255,0.4)]',
  };
  return <span className={`${map[color]} ${className}`}>{children}</span>;
};

const NeonButton = ({ children, onClick, variant = 'primary', testId, className = '' }) => {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300';
  const styles = {
    primary:
      'bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.55)] hover:shadow-[0_0_48px_rgba(34,211,238,0.85)]',
    magenta:
      'bg-fuchsia-500 text-black hover:bg-fuchsia-400 shadow-[0_0_24px_rgba(232,121,249,0.55)] hover:shadow-[0_0_48px_rgba(232,121,249,0.85)]',
    ghost:
      'border border-cyan-400/40 text-cyan-200 hover:border-cyan-300 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.45)]',
  };
  return (
    <button data-testid={testId} onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
};

const SectionLabel = ({ children, color = 'cyan' }) => (
  <span
    className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.45em] ${
      color === 'magenta' ? 'text-fuchsia-300' : 'text-cyan-300'
    }`}
  >
    <span className={`h-px w-8 ${color === 'magenta' ? 'bg-fuchsia-400' : 'bg-cyan-400'}`} />
    {children}
  </span>
);

/* ---------- Backdrop FX ---------- */

const NeonBackdrop = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-cyan-500/20 blur-[140px]" />
    <div className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-fuchsia-500/20 blur-[160px]" />
    <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[140px]" />
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(34,211,238,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(232,121,249,0.7) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />
  </div>
);

const Marquee = ({ items, color = 'cyan' }) => (
  <div
    className={`relative overflow-hidden border-y ${
      color === 'magenta' ? 'border-fuchsia-500/30' : 'border-cyan-400/30'
    } bg-black/70 py-4`}
  >
    <div className="flex animate-[marquee_30s_linear_infinite] gap-12 whitespace-nowrap">
      {[...items, ...items, ...items].map((t, i) => (
        <span
          key={i}
          className={`flex items-center gap-4 text-2xl font-bold uppercase tracking-[0.25em] ${
            color === 'magenta' ? 'text-fuchsia-300' : 'text-cyan-300'
          }`}
        >
          {t}
          <Sparkles className="h-5 w-5 text-white/50" />
        </span>
      ))}
    </div>
    <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
  </div>
);

/* ---------- HEADER ---------- */

const Header = ({ template, page, setPage, onApply }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-testid="pulse-header"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-cyan-400/20 bg-black/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => setPage('home')} className="flex items-center gap-2" data-testid="pulse-logo">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-black">
            <Flame className="h-4 w-4" />
            <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/40" />
          </span>
          <span className="text-lg font-extrabold uppercase tracking-[0.35em] text-white">
            {template?.name || 'Pulse'}
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              data-testid={`nav-${n.id}`}
              onClick={() => setPage(n.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                page === n.id ? 'text-white' : 'text-slate-400 hover:text-cyan-200'
              }`}
            >
              {n.label}
              {page === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 ring-1 ring-cyan-300/40"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            data-testid="pulse-fav"
            className="hidden rounded-full border border-white/10 bg-white/5 p-2.5 text-cyan-200 transition hover:border-cyan-300/40 hover:text-white sm:inline-flex"
          >
            <Heart className="h-4 w-4" />
          </button>
          <NeonButton onClick={onApply} testId="pulse-launch" className="hidden sm:inline-flex">
            Use Template
          </NeonButton>
          <button
            data-testid="pulse-menu-toggle"
            className="rounded-full border border-white/10 p-2.5 text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-cyan-400/20 bg-black/95 md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setPage(n.id);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between py-3 text-left text-sm uppercase tracking-[0.25em] ${
                    page === n.id ? 'text-cyan-300' : 'text-slate-300'
                  }`}
                >
                  {n.label}
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
              <NeonButton onClick={onApply} className="mt-3">Use Template</NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ---------- HERO ---------- */

const Hero = ({ template, setPage }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useTemplateScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
              <SectionLabel>Neon · Cafe · Bar</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Where flavour
              <br />
              meets <NeonText color="cyan">electricity</NeonText>.
              <br />
              <NeonText color="magenta">Taste the pulse.</NeonText>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="max-w-xl text-base leading-8 text-slate-300"
            >
              {template?.hero_subtext ||
                'A neon-lit kitchen and bar serving electric coffee, modern plates, and after-dark vibes. Book your table, order online, or just glow with us.'}
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <NeonButton testId="hero-reserve" onClick={() => setPage('reserve')}>Reserve a Table</NeonButton>
              <NeonButton testId="hero-menu" onClick={() => setPage('menu')} variant="ghost">Explore Menu</NeonButton>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="flex flex-wrap gap-6 pt-8 text-sm text-slate-400">
              {[
                { k: '12k+', v: 'Cups poured weekly' },
                { k: '4.9★', v: 'Google rating' },
                { k: '24/7', v: 'Insta orders' },
              ].map((s) => (
                <div key={s.v} className="border-l border-cyan-400/30 pl-4">
                  <p className="text-2xl font-extrabold text-white">{s.k}</p>
                  <p className="uppercase tracking-[0.2em]">{s.v}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-[36px] border border-cyan-400/30 shadow-[0_0_80px_rgba(34,211,238,0.25)]"
            >
              <img
                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&w=1200&q=80"
                alt="Pulse signature plate"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300">Tonight&apos;s Special</p>
                  <p className="text-lg font-bold text-white">Voltage Bowl · $13.80</p>
                </div>
                <Star className="h-5 w-5 fill-cyan-300 text-cyan-300" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="absolute -bottom-6 -left-6 hidden w-44 rounded-2xl border border-fuchsia-400/40 bg-black/80 p-4 backdrop-blur lg:block"
            >
              <div className="flex items-center gap-2 text-fuchsia-300">
                <Clock className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.25em]">Open Now</p>
              </div>
              <p className="mt-2 text-sm text-white">Mon–Sun · 8am – 1am</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

/* ---------- FEATURED ---------- */

const Featured = ({ setPage }) => {
  const items = MENU_ITEMS.slice(0, 6);
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-4">
            <SectionLabel color="magenta">House Favourites</SectionLabel>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Bestsellers <NeonText color="magenta">on the pass</NeonText>
            </h2>
          </div>
          <NeonButton onClick={() => setPage('menu')} variant="ghost">Full Menu</NeonButton>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={i}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-2 transition-all hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <img src={item.img} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-fuchsia-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-black">{item.tag}</span>
                <button className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-cyan-300 opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between px-3 pt-4 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
                </div>
                <p className="text-lg font-extrabold text-cyan-300">{item.price}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- STORY / ABOUT ---------- */

const Story = () => (
  <section className="relative px-6 py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <SectionLabel>Our Story</SectionLabel>
        <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">
          A kitchen that <NeonText color="cyan">hums</NeonText> after sundown.
        </h2>
        <p className="text-base leading-8 text-slate-300">
          Pulse started as a 4-seat coffee window on a side street. We brewed louder than the city told us to.
          Today we plate modern comfort food, pour electric coffee by day, and turn into a neon-lit bar after eight.
        </p>
        <div className="grid grid-cols-3 gap-4 pt-2">
          {[
            { icon: Leaf, k: 'Local', v: 'Sourced' },
            { icon: Flame, k: 'Fire', v: 'Cooked' },
            { icon: Sparkles, k: 'Hand', v: 'Crafted' },
          ].map((b) => (
            <div key={b.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <b.icon className="mx-auto h-5 w-5 text-fuchsia-300" />
              <p className="mt-2 text-sm font-bold text-white">{b.k}</p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">{b.v}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative grid grid-cols-2 gap-4"
      >
        {[
          'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&w=800&q=80',
          'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&w=800&q=80',
          'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&w=800&q=80',
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&w=800&q=80',
        ].map((src, i) => (
          <div key={src} className={`overflow-hidden rounded-3xl border border-cyan-400/20 ${i % 2 === 0 ? 'translate-y-6' : ''}`}>
            <img src={src} alt="cafe" className="h-56 w-full object-cover transition duration-700 hover:scale-110" />
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ---------- TESTIMONIALS ---------- */

const Testimonials = () => (
  <section className="relative px-6 py-24">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 flex items-end justify-between">
        <div className="space-y-4">
          <SectionLabel color="magenta">Word on the street</SectionLabel>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            Loved by <NeonText color="magenta">night owls</NeonText>.
          </h2>
        </div>
        <div className="hidden text-right text-sm text-slate-400 md:block">
          <p className="text-3xl font-extrabold text-white">4.9 / 5</p>
          <p>Across 2,400+ reviews</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/[0.06] to-fuchsia-500/[0.06] p-7 backdrop-blur"
          >
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-cyan-300 text-cyan-300" />
              ))}
            </div>
            <p className="text-base leading-7 text-slate-200">&ldquo;{t.text}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3">
              <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-fuchsia-400/60" />
              <div>
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- NEWSLETTER / CTA ---------- */

const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <section className="relative px-6 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[40px] border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-black to-fuchsia-500/10 p-10 text-center shadow-[0_0_80px_rgba(232,121,249,0.15)] sm:p-16">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/30 blur-3xl" />
        <SectionLabel>Stay on the list</SectionLabel>
        <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
          Get the <NeonText color="cyan">drop</NeonText> before everyone else.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Secret menu items, late-night events, and IG-only offers. No spam, ever.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            data-testid="newsletter-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-full border border-white/15 bg-black/60 px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
          />
          <button
            data-testid="newsletter-submit"
            className="rounded-full bg-fuchsia-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-black shadow-[0_0_24px_rgba(232,121,249,0.6)] transition hover:bg-fuchsia-400"
          >
            {sent ? 'Subscribed ✓' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

/* ---------- PAGES ---------- */

const HomePage = ({ template, setPage }) => (
  <>
    <Hero template={template} setPage={setPage} />
    <Marquee items={['Open Late', 'Neon Coffee', 'Street Plates', 'Live DJ Fridays', 'Vegan Friendly']} />
    <Featured setPage={setPage} />
    <Story />
    <Testimonials />
    <NewsletterCTA />
  </>
);

const MenuPage = () => {
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? MENU_ITEMS : MENU_ITEMS.filter((m) => m.cat === cat);
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <SectionLabel color="magenta">The Full Menu</SectionLabel>
          <h1 className="mt-4 text-5xl font-black text-white sm:text-6xl">
            Eat. Drink. <NeonText color="cyan">Glow</NeonText>.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Every plate is built in-house, daily. Prices are in USD, allergens on request.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {MENU_CATEGORIES.map((c) => {
            const Icon = c.icon;
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                data-testid={`menu-cat-${c.id}`}
                onClick={() => setCat(c.id)}
                className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm uppercase tracking-[0.2em] transition ${
                  active
                    ? 'border-cyan-300 bg-cyan-400/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.35)]'
                    : 'border-white/15 text-slate-400 hover:border-fuchsia-400/50 hover:text-fuchsia-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {c.label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition hover:border-fuchsia-400/40 hover:shadow-[0_0_40px_rgba(232,121,249,0.2)]"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0" />
                  <span className="absolute left-4 top-4 rounded-full bg-cyan-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-black">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <span className="text-lg font-extrabold text-fuchsia-300">{item.price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.desc}</p>
                  <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200 transition hover:bg-cyan-400 hover:text-black">
                    Add <ShoppingCart className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const AboutPage = () => (
  <section className="relative px-6 py-20">
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <SectionLabel>The Brand</SectionLabel>
        <h1 className="mt-4 text-5xl font-black text-white sm:text-6xl">
          We cook with <NeonText color="magenta">voltage</NeonText>.
        </h1>
      </div>
      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-[40px] border border-cyan-400/30">
            <img
              src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&w=1400&q=80"
              alt="chef at work"
              className="h-[520px] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden w-56 rounded-3xl border border-fuchsia-400/40 bg-black/80 p-5 backdrop-blur md:block">
            <p className="text-3xl font-black text-fuchsia-300">07</p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-300">Years in the city</p>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-lg leading-8 text-slate-300">
            Pulse is a tiny crew of cooks, baristas, and bartenders building the kind of place we wanted to hang out in.
            Industrial steel, glowing tubes, vinyl on the back wall.
          </p>
          <p className="text-base leading-8 text-slate-400">
            Most of what we serve is made within 24 hours of you eating it. Bread, sauces, ice cream, syrups — all in-house.
            We work with three local farms and one very stubborn coffee roaster.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
            {[
              { k: '07', v: 'Years' },
              { k: '14', v: 'Cooks' },
              { k: '03', v: 'Farms' },
              { k: '01', v: 'Roaster' },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <p className="text-3xl font-black text-cyan-300">{s.k}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-slate-400">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const GalleryPage = () => (
  <section className="relative px-6 py-20">
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <SectionLabel color="magenta">Through the lens</SectionLabel>
        <h1 className="mt-4 text-5xl font-black text-white sm:text-6xl">
          A night at <NeonText color="cyan">Pulse</NeonText>.
        </h1>
      </div>
      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {GALLERY.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
            className="mb-5 break-inside-avoid overflow-hidden rounded-3xl border border-white/10"
          >
            <img
              src={src}
              alt={`gallery ${i}`}
              className="w-full transition duration-700 hover:scale-110"
              style={{ height: i % 3 === 0 ? 360 : i % 3 === 1 ? 280 : 440, objectFit: 'cover' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ReservePage = () => {
  const [data, setData] = useState({ name: '', email: '', date: '', time: '', guests: '2' });
  const [done, setDone] = useState(false);
  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionLabel>Reserve</SectionLabel>
          <h1 className="mt-4 text-5xl font-black text-white sm:text-6xl">
            Book your <NeonText color="magenta">corner</NeonText>.
          </h1>
          <p className="mt-5 max-w-md text-slate-300">
            We hold tables for 15 minutes past your booking. For groups of 8+, please call us directly.
          </p>
          <div className="mt-8 space-y-4 text-sm text-slate-300">
            <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-cyan-300" /> Mon–Sun · 8:00am – 1:00am</div>
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-cyan-300" /> +1 (415) 555-0142</div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-cyan-300" /> 24 Voltage Lane, Mission, SF</div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => { e.preventDefault(); setDone(true); }}
          className="space-y-4 rounded-[36px] border border-cyan-400/30 bg-black/60 p-8 backdrop-blur"
        >
          {[
            { k: 'name', label: 'Full name', type: 'text', placeholder: 'Jane Voltage' },
            { k: 'email', label: 'Email', type: 'email', placeholder: 'jane@pulse.co' },
          ].map((f) => (
            <div key={f.k}>
              <label className="text-[11px] uppercase tracking-[0.25em] text-slate-400">{f.label}</label>
              <input
                required
                type={f.type}
                placeholder={f.placeholder}
                value={data[f.k]}
                onChange={(e) => update(f.k, e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-slate-600 focus:border-cyan-300 focus:outline-none"
              />
            </div>
          ))}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Date</label>
              <input required type="date" value={data.date} onChange={(e) => update('date', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-3 text-white focus:border-cyan-300 focus:outline-none" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Time</label>
              <input required type="time" value={data.time} onChange={(e) => update('time', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-3 text-white focus:border-cyan-300 focus:outline-none" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Guests</label>
              <select value={data.guests} onChange={(e) => update('guests', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-3 text-white focus:border-cyan-300 focus:outline-none">
                {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n} className="bg-black">{n}</option>)}
              </select>
            </div>
          </div>
          <button
            data-testid="reserve-submit"
            type="submit"
            className="mt-2 w-full rounded-full bg-cyan-400 py-3.5 text-sm font-bold uppercase tracking-[0.25em] text-black shadow-[0_0_30px_rgba(34,211,238,0.55)] transition hover:bg-cyan-300"
          >
            {done ? 'Table held ✓ — see you soon' : 'Confirm reservation'}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

const ContactPage = () => (
  <section className="relative px-6 py-20">
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <SectionLabel color="magenta">Say hi</SectionLabel>
        <h1 className="mt-4 text-5xl font-black text-white sm:text-6xl">
          Slide into the <NeonText color="magenta">DMs</NeonText>.
        </h1>
      </div>
      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {[
          { icon: MapPin, title: 'Visit', lines: ['24 Voltage Lane', 'Mission, SF 94110'] },
          { icon: Phone, title: 'Call / WhatsApp', lines: ['+1 (415) 555-0142', 'Daily 8am – 1am'] },
          { icon: Mail, title: 'Email', lines: ['hi@pulse.cafe', 'press@pulse.cafe'] },
        ].map((b) => (
          <div key={b.title} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 transition hover:border-cyan-400/40">
            <b.icon className="h-6 w-6 text-cyan-300" />
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-fuchsia-300">{b.title}</p>
            {b.lines.map((l) => <p key={l} className="mt-1 text-base text-white">{l}</p>)}
          </div>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-[40px] border border-cyan-400/30">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&w=1600&q=80" alt="map" className="h-80 w-full object-cover" />
      </div>
    </div>
  </section>
);

/* ---------- FOOTER ---------- */

const Footer = ({ template }) => (
  <footer className="relative border-t border-cyan-400/20 bg-black px-6 py-14">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-fuchsia-500 text-black">
              <Flame className="h-4 w-4" />
            </span>
            <span className="text-lg font-extrabold uppercase tracking-[0.35em] text-white">
              {template?.name || 'Pulse'}
            </span>
          </div>
          <p className="text-sm text-slate-400">Neon-lit cafe, kitchen and bar. Built for late nights and slow mornings.</p>
        </div>
        {[
          { title: 'Visit', items: ['Menu', 'Reserve', 'Private events', 'Gift cards'] },
          { title: 'Brand', items: ['Story', 'Press', 'Careers', 'Wholesale'] },
          { title: 'Follow', items: ['Instagram', 'TikTok', 'WhatsApp', 'Newsletter'] },
        ].map((col) => (
          <div key={col.title}>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {col.items.map((it) => (
                <li key={it}><a href="#" className="transition hover:text-white">{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {template?.name || 'Pulse'}. All flavours reserved.</p>
        <div className="flex gap-3 text-slate-400">
          <a href="#" className="rounded-full border border-white/10 p-2 transition hover:border-cyan-400/50 hover:text-cyan-300"><Heart className="h-4 w-4" /></a>
          <a href="#" className="rounded-full border border-white/10 p-2 transition hover:border-cyan-400/50 hover:text-cyan-300"><Star className="h-4 w-4" /></a>
          <a href="#" className="rounded-full border border-white/10 p-2 transition hover:border-cyan-400/50 hover:text-cyan-300"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </div>
  </footer>
);

/* ---------- ROOT ---------- */

const PulseTemplate = ({ template = {}, onApply = () => {} }) => {
  const [page, setPage] = useState('home');

  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const pages = {
    home: <HomePage template={template} setPage={setPage} />,
    menu: <MenuPage />,
    about: <AboutPage />,
    gallery: <GalleryPage />,
    reserve: <ReservePage />,
    contact: <ContactPage />,
  };

  return (
    <div
      data-testid="pulse-template"
      className="relative min-h-screen w-full overflow-hidden bg-black font-sans text-white antialiased selection:bg-fuchsia-400 selection:text-black"
    >
      <NeonBackdrop />
      <div className="relative z-10">
        <Header template={template} page={page} setPage={setPage} onApply={onApply} />

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {pages[page]}
            </motion.div>
          </AnimatePresence>
        </main>

        <TemplatePreviewMeta template={template} />
        <Footer template={template} />
      </div>
    </div>
  );
};

export default PulseTemplate;