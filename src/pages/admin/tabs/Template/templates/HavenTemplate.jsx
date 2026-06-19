import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { useTemplateScroll } from '../../../../../context/ScrollContainerContext';
import {
  Heart,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Search,
  Star,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Leaf,
  Hammer,
  ShieldCheck,
  Truck,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';

/* ============================================================
   HAVEN — Premium Shoe Boutique Template (v2 — distinctive UI)
   ============================================================ */

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Shop' },
  { id: 'collections', label: 'Collections' },
  { id: 'story', label: 'Story' },
  { id: 'lookbook', label: 'Lookbook' },
  { id: 'contact', label: 'Contact' },
];

const SHOP_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'sneakers', label: 'Sneakers' },
  { id: 'loafers', label: 'Loafers' },
  { id: 'boots', label: 'Boots' },
  { id: 'sandals', label: 'Sandals' },
  { id: 'running', label: 'Running' },
];

const SHOE_IMAGES = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&w=900&q=80',
  'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&w=900&q=80',
];

const PRODUCTS = [
  { id: 1, cat: 'sneakers', name: 'Atelier Low 01', price: 198, color: 'Bone / Forest', img: SHOE_IMAGES[0], tag: 'New' },
  { id: 2, cat: 'sneakers', name: 'Drift Court', price: 168, color: 'Cream / Sand', img: SHOE_IMAGES[1], tag: 'Bestseller' },
  { id: 3, cat: 'loafers', name: 'Sienna Loafer', price: 245, color: 'Walnut', img: SHOE_IMAGES[2], tag: 'Hand-stitched' },
  { id: 4, cat: 'boots', name: 'North Chelsea', price: 320, color: 'Espresso', img: SHOE_IMAGES[3], tag: 'Limited' },
  { id: 5, cat: 'sandals', name: 'Coast Slide', price: 128, color: 'Sand', img: SHOE_IMAGES[4], tag: 'Summer' },
  { id: 6, cat: 'running', name: 'Tempo Runner', price: 215, color: 'Off-White', img: SHOE_IMAGES[5], tag: 'New' },
  { id: 7, cat: 'sneakers', name: 'Atelier Mid 02', price: 220, color: 'Forest', img: SHOE_IMAGES[6], tag: 'New' },
  { id: 8, cat: 'loafers', name: 'Penny Editor', price: 268, color: 'Cognac', img: SHOE_IMAGES[7], tag: 'Heritage' },
  { id: 9, cat: 'boots', name: 'Field Hiker', price: 295, color: 'Tan', img: SHOE_IMAGES[8], tag: 'Waterproof' },
];

const COLLECTIONS = [
  {
    slug: 'autumn-atelier',
    name: 'Autumn Atelier',
    items: 24,
    img: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&w=1600&q=80',
    blurb: 'Warm tones, brushed leathers, and a brief flirtation with shearling. Built for cold light and long walks.',
  },
  {
    slug: 'field-notes',
    name: 'Field Notes',
    items: 24,
    img: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&w=1600&q=80',
    blurb: 'A workwear-leaning capsule for studios, gardens, and grey Sundays. Rubber soles, rope laces, no fuss.',
  },
  {
    slug: 'studio-whites',
    name: 'Studio Whites',
    items: 24,
    img: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&w=1600&q=80',
    blurb: 'White-on-white silhouettes that get better as they age. Minimal lines, full-grain leather, considered detail.',
  },
];

const PRODUCT_NAMES = [
  'Atelier Low', 'Atelier Mid', 'Drift Court', 'Sienna Loafer', 'North Chelsea',
  'Coast Slide', 'Tempo Runner', 'Penny Editor', 'Field Hiker', 'Mariner Boot',
  'Studio Trainer', 'Garden Mule', 'Harbour Slip', 'Porto Derby', 'Cedar Oxford',
  'Linen Plimsoll', 'Cloud Runner', 'Range Boot', 'Atrium Loafer', 'Shore Slide',
  'Quill Brogue', 'Maple Mule', 'Tide Sneaker', 'Slate Chelsea',
];
const COLORS = ['Bone', 'Forest', 'Walnut', 'Espresso', 'Sand', 'Cream', 'Cognac', 'Off-White', 'Tan', 'Stone'];
const TAGS = ['New', 'Bestseller', 'Limited', 'Heritage', 'Hand-stitched', 'Waterproof', 'Summer', 'Resole-ready'];

const buildCollectionProducts = (slug) => {
  const out = [];
  for (let i = 0; i < 24; i++) {
    const seed = (slug.length * (i + 1)) % 100;
    out.push({
      id: `${slug}-${i + 1}`,
      name: `${PRODUCT_NAMES[i % PRODUCT_NAMES.length]} 0${(i % 9) + 1}`,
      price: 128 + ((seed * 7) % 240),
      color: `${COLORS[(i + 1) % COLORS.length]} / ${COLORS[(i + 4) % COLORS.length]}`,
      img: SHOE_IMAGES[i % SHOE_IMAGES.length],
      tag: TAGS[i % TAGS.length],
      cat: ['sneakers', 'loafers', 'boots', 'sandals', 'running'][i % 5],
      size: [38, 39, 40, 41, 42, 43, 44, 45][i % 8],
    });
  }
  return out;
};

const LOOKBOOK = [
  'https://images.unsplash.com/photo-1542219550-37153d387c27?auto=format&w=1000&q=80',
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&w=1000&q=80',
  'https://images.unsplash.com/photo-1518894781321-630e638d0742?auto=format&w=1000&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&w=1000&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&w=1000&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&w=1000&q=80',
  'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&w=1000&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&w=1000&q=80',
];

const TESTIMONIALS = [
  { name: 'Mira O.', city: 'Copenhagen', text: 'The Sienna Loafer broke in like an old book. Quietly perfect.', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&w=200&q=80' },
  { name: 'Theo A.', city: 'Lisbon', text: 'Bought the Atelier Low. Three months in, they only look better.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=200&q=80' },
  { name: 'Lina V.', city: 'Tokyo', text: 'Everything Haven makes feels like it was meant for you.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&w=200&q=80' },
];

const CRAFT_STEPS = [
  { n: '01', t: 'Last', d: 'A wooden form is hand-shaped over six weeks until the shoe’s silhouette is set.' },
  { n: '02', t: 'Cut', d: 'Vegetable-tanned leather is hand-cut to the grain, never stamped.' },
  { n: '03', t: 'Stitch', d: 'Each upper is closed by one maker, in one sitting. Never split between hands.' },
  { n: '04', t: 'Welt', d: 'A Goodyear welt is sewn so the sole can be removed and replaced — for life.' },
  { n: '05', t: 'Finish', d: 'Edges are burnished by hand, then waxed, brushed, and polished slow.' },
];

/* ---------- Reusable atoms ---------- */

const Serif = ({ children, className = '', as = 'span', ...rest }) => {
  const Tag = as;
  return (
    <Tag
      style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif' }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Mono = ({ children, className = '' }) => (
  <span
    style={{ fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace' }}
    className={className}
  >
    {children}
  </span>
);

const Eyebrow = ({ children, color = 'forest' }) => (
  <span
    className={`inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] ${
      color === 'terracotta' ? 'text-orange-800' : 'text-emerald-900'
    }`}
  >
    <span className={`h-px w-10 ${color === 'terracotta' ? 'bg-orange-800/60' : 'bg-emerald-900/60'}`} />
    <Mono>{children}</Mono>
  </span>
);

const MagneticButton = ({ children, onClick, variant = 'solid', testId, className = '' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const styles = {
    solid: 'bg-emerald-950 text-stone-100 hover:bg-emerald-900',
    outline: 'border border-emerald-950/40 text-emerald-950 hover:bg-emerald-950 hover:text-stone-100',
    terracotta: 'bg-orange-800 text-stone-100 hover:bg-orange-900',
    ghost: 'text-emerald-950 hover:text-orange-800',
  };

  return (
    <motion.button
      ref={ref}
      data-testid={testId}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[10px] font-medium tracking-[0.3em] uppercase transition-colors duration-500 ${styles[variant]} ${className}`}
    >
      <Mono>{children}</Mono>
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
    </motion.button>
  );
};

const Counter = ({ to = 100, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const t0 = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

const SplitReveal = ({ text, className = '', delay = 0, italic = false }) => {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block overflow-hidden align-baseline" aria-hidden>
          <motion.span
            className={`inline-block ${italic ? 'italic' : ''}`}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: delay + wi * 0.07, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {wi < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const DualMarquee = ({ items, dir = 'left' }) => (
  <div className="relative overflow-hidden border-y border-emerald-950/15 bg-stone-100/60 py-5">
    <div
      className={`flex gap-12 whitespace-nowrap ${
        dir === 'left' ? 'animate-[hmarquee_38s_linear_infinite]' : 'animate-[hmarqueeR_38s_linear_infinite]'
      }`}
    >
      {[...items, ...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center gap-5 text-[10px] uppercase tracking-[0.5em] text-emerald-950/80">
          <Mono>{t}</Mono>
          <span className="inline-block h-1 w-1 rounded-full bg-orange-800/70" />
        </span>
      ))}
    </div>
    <style>{`
      @keyframes hmarquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
      @keyframes hmarqueeR { from { transform: translateX(-33.333%) } to { transform: translateX(0) } }
    `}</style>
  </div>
);

const CustomCursor = ({ hint }) => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28 });
  const sy = useSpring(y, { stiffness: 350, damping: 28 });

  useEffect(() => {
    const onMove = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
      style={{
        x: sx,
        y: sy,
        background: hint ? 'rgb(6, 78, 59)' : 'rgba(6, 78, 59, 0.0)',
        border: hint ? '1px solid rgb(6, 78, 59)' : '1px solid rgba(6, 78, 59, 0.45)',
        mixBlendMode: hint ? 'normal' : 'difference',
      }}
      animate={{ scale: hint ? 1 : 0.25 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence>
        {hint && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[9px] uppercase tracking-[0.3em] text-stone-50"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {hint}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ---------- Header ---------- */

const Header = ({ template, page, setPage, onApply, setCursor }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-testid="haven-header"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-emerald-950/10 bg-stone-50/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <button onClick={() => setPage({ id: 'home' })} data-testid="haven-logo" className="flex items-center gap-2">
          <motion.span
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-950/50 text-emerald-950"
          >
            <Serif className="text-base font-semibold leading-none">h</Serif>
          </motion.span>
          <Serif className="text-2xl font-medium tracking-[0.25em] text-emerald-950">
            {template?.name || 'Haven'}
          </Serif>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              data-testid={`nav-${n.id}`}
              onClick={() => setPage({ id: n.id })}
              onMouseEnter={() => setCursor('GO')}
              onMouseLeave={() => setCursor(null)}
              className={`relative px-4 py-2 text-[10px] uppercase tracking-[0.35em] transition-colors ${
                page === n.id ? 'text-emerald-950' : 'text-emerald-950/55 hover:text-emerald-950'
              }`}
            >
              <Mono>{n.label}</Mono>
              {page === n.id && (
                <motion.span
                  layoutId="haven-underline"
                  className="absolute bottom-1 left-1/2 h-px w-6 -translate-x-1/2 bg-orange-800"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button data-testid="haven-search" className="hidden rounded-full p-2.5 text-emerald-950/70 transition hover:bg-emerald-950/5 hover:text-emerald-950 sm:inline-flex">
            <Search className="h-4 w-4" />
          </button>
          <button data-testid="haven-fav" className="hidden rounded-full p-2.5 text-emerald-950/70 transition hover:bg-emerald-950/5 hover:text-emerald-950 sm:inline-flex">
            <Heart className="h-4 w-4" />
          </button>
          <button data-testid="haven-bag" className="relative rounded-full p-2.5 text-emerald-950/70 transition hover:bg-emerald-950/5 hover:text-emerald-950">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-800 text-[10px] font-medium text-stone-50">2</span>
          </button>
          {/* <MagneticButton onClick={onApply} testId="haven-launch" className="ml-2 hidden sm:inline-flex">Use Template</MagneticButton> */}
          <button
            data-testid="haven-menu-toggle"
            className="rounded-full border border-emerald-950/20 p-2.5 text-emerald-950 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-emerald-950/10 bg-stone-50 md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => { setPage({ id: n.id }); setOpen(false); }}
                  className={`flex items-center justify-between py-3 text-left text-[10px] uppercase tracking-[0.35em] ${
                    page === n.id ? 'text-orange-800' : 'text-emerald-950/70'
                  }`}
                >
                  <Mono>{n.label}</Mono>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
              {/* <MagneticButton onClick={onApply} className="mt-3 self-start">Use Template</MagneticButton> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ---------- HERO ---------- */

const Hero = ({ template, setPage, setCursor }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useTemplateScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pb-24 pt-10 lg:pt-16">
      <div className="pointer-events-none absolute -left-10 top-32 select-none opacity-[0.05]">
        <Serif className="text-[24rem] font-medium leading-none text-emerald-950">h</Serif>
      </div>

      <motion.div style={{ y }} className="relative mx-auto max-w-7xl">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <Eyebrow color="terracotta">Autumn / Winter · 26</Eyebrow>
            <h1 className="text-emerald-950">
              <Serif className="block text-7xl font-medium leading-[0.95] tracking-tight sm:text-8xl lg:text-[8.5rem]">
                <SplitReveal text="Footwear," />
              </Serif>
              <Serif className="block text-7xl font-light leading-[0.95] tracking-tight text-orange-800 sm:text-8xl lg:text-[8.5rem]">
                <SplitReveal text="quietly made." italic delay={0.4} />
              </Serif>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="max-w-md text-base leading-8 text-emerald-950/70"
            >
              {template?.hero_subtext ||
                'Haven is a small atelier crafting shoes that improve with every step. No seasons, no shouting — just considered objects you’ll wear for years.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <MagneticButton testId="hero-shop" onClick={() => setPage({ id: 'shop' })}>Shop the Edit</MagneticButton>
              <MagneticButton testId="hero-story" onClick={() => setPage({ id: 'story' })} variant="outline">Our Story</MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex gap-10 pt-6"
            >
              {[
                { k: 14, suffix: '', v: 'Years crafting' },
                { k: 42, suffix: '', v: 'Artisans' },
                { k: 96, suffix: '%', v: 'Recycled materials' },
              ].map((s) => (
                <div key={s.v}>
                  <Serif className="block text-4xl font-medium text-emerald-950"><Counter to={s.k} suffix={s.suffix} /></Serif>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-emerald-950/55"><Mono>{s.v}</Mono></p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            onMouseEnter={() => setCursor('VIEW')}
            onMouseLeave={() => setCursor(null)}
            style={{ y: heroImgY }}
            className="relative"
          >
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2px]"
            >
              <motion.img
                style={{ scale: heroImgScale }}
                src={SHOE_IMAGES[0]}
                alt="Haven hero shoe"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-stone-50/80" />
              <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-stone-50/80" />
              <span className="absolute left-3 bottom-3 h-3 w-3 border-l border-b border-stone-50/80" />
              <span className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-stone-50/80" />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute -left-6 -bottom-6 hidden w-56 border border-emerald-950/15 bg-stone-50 p-5 sm:block"
            >
              <Eyebrow>Editor’s Pick</Eyebrow>
              <Serif className="mt-3 block text-2xl text-emerald-950">Atelier Low 01</Serif>
              <div className="mt-3 flex items-center justify-between text-sm text-emerald-950/70">
                <Mono>$198</Mono>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

/* ---------- Horizontal scroll Featured ---------- */

const FeaturedHScroll = ({ setPage, setCursor }) => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const items = PRODUCTS;

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.45 : clientWidth * 0.45;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const textX = `${20 - scrollProgress * 40}%`;
  const textX2 = `${-10 + scrollProgress * 35}%`;

  return (
    <section className="relative bg-stone-50 py-24 overflow-hidden border-b border-stone-200/50">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col justify-between py-24 select-none">
        <motion.div
          style={{ x: textX }}
          className="text-[14vw] font-serif font-light uppercase tracking-widest text-emerald-950/[0.02] whitespace-nowrap"
        >
          HAVEN STUDIO · WEARING NOW · THE EDIT · AUTUMN WINTER
        </motion.div>
        <motion.div
          style={{ x: textX2 }}
          className="text-[10vw] font-serif italic font-light text-orange-800/[0.015] whitespace-nowrap self-end"
        >
          slow fashion · hand crafted · porto edit · minimal luxury
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Eyebrow>The Edit · 09 pieces</Eyebrow>
            <Serif className="mt-4 block text-4xl font-medium leading-[1.1] text-emerald-950 sm:text-5xl lg:text-6xl">
              Pieces we’re <em className="italic text-orange-800">wearing now</em>.
            </Serif>
          </div>
          <div className="flex items-center gap-4 z-10">
            <MagneticButton variant="outline" onClick={() => setPage({ id: 'shop' })}>
              Shop All
            </MagneticButton>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-950/20 text-emerald-950 transition hover:bg-emerald-950 hover:text-stone-50"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-950/20 text-emerald-950 transition hover:bg-emerald-950 hover:text-stone-50"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="no-scrollbar flex gap-8 overflow-x-auto scroll-smooth py-4 pr-12 snap-x snap-mandatory"
          style={{
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              onMouseEnter={() => setCursor('VIEW')}
              onMouseLeave={() => setCursor(null)}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-[75vw] sm:w-[45vw] lg:w-[30vw] flex-shrink-0 snap-start"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                <span className="absolute left-4 top-4 bg-stone-50 px-3 py-1 text-[9px] uppercase tracking-[0.4em] text-emerald-950">
                  <Mono>{p.tag}</Mono>
                </span>
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-emerald-950 px-5 py-4 text-stone-50 transition-transform duration-700 group-hover:translate-y-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <Serif className="block text-lg">{p.name}</Serif>
                      <p className="text-[9px] uppercase tracking-[0.4em] text-stone-50/65"><Mono>{p.color}</Mono></p>
                    </div>
                    <Mono className="text-sm">${p.price}</Mono>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <Mono className="text-[10px] uppercase tracking-[0.35em] text-emerald-950/55">No. 0{i + 1}</Mono>
                  <Serif className="mt-1 block text-xl text-emerald-950">{p.name}</Serif>
                </div>
                <Mono className="text-base text-emerald-950">${p.price}</Mono>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between gap-6 border-t border-emerald-950/10 pt-6">
          <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-950/45">
            <Mono>Swipe / Scroll to explore</Mono>
          </span>
          <div className="relative h-[2px] flex-1 max-w-[200px] bg-emerald-950/10 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-orange-800"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-950/45">
            <Mono>01 / 0{items.length}</Mono>
          </span>
        </div>
      </div>
    </section>
  );
};

/* ---------- Sticky Craft Process ---------- */

const CraftProcess = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useTemplateScroll({ target: ref, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const i = Math.min(CRAFT_STEPS.length - 1, Math.floor(v * CRAFT_STEPS.length));
      setActive(i);
    });
  }, [scrollYProgress]);

  return (
    <section ref={ref} className="relative bg-emerald-950 text-stone-100">
      <div className="relative" style={{ height: `${CRAFT_STEPS.length * 20}vh` }}>
        <div className="sticky top-0 flex h-screen items-center px-6">
          <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <Eyebrow color="terracotta">The craft process</Eyebrow>
              <Serif className="mt-5 block text-5xl font-light leading-[1.02] sm:text-7xl">
                Made the <em className="italic text-orange-300">slow</em> way.
              </Serif>
              <p className="mt-6 max-w-md text-sm leading-8 text-stone-100/70">
                Each Haven shoe passes through 32 individual steps in a single workshop in Porto.
                Five of them, the ones that matter, are shown here.
              </p>

              <ul className="mt-12 space-y-3 border-l border-stone-100/15 pl-6">
                {CRAFT_STEPS.map((s, i) => (
                  <li key={s.n} className="flex items-start gap-4">
                    <Mono
                      className={`pt-1 text-xs tracking-[0.3em] transition-colors ${
                        i === active ? 'text-orange-300' : 'text-stone-100/35'
                      }`}
                    >
                      {s.n}
                    </Mono>
                    <Serif
                      className={`block text-2xl transition-colors ${
                        i === active ? 'text-stone-50' : 'text-stone-100/35'
                      }`}
                    >
                      {s.t}
                    </Serif>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden">
              <AnimatePresence mode="sync">
                <motion.div
                  key={active}
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  animate={{ clipPath: 'inset(0% 0 0 0)' }}
                  exit={{ clipPath: 'inset(0 0 100% 0)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={SHOE_IMAGES[active]}
                    alt={CRAFT_STEPS[active].t}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950 to-transparent p-8">
                <Mono className="text-[10px] uppercase tracking-[0.4em] text-orange-300">
                  Step {CRAFT_STEPS[active].n}
                </Mono>
                <Serif className="mt-2 block text-3xl">{CRAFT_STEPS[active].t}</Serif>
                <p className="mt-2 max-w-sm text-sm leading-7 text-stone-100/75">{CRAFT_STEPS[active].d}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Collections strip ---------- */

const CollectionsStrip = ({ setPage, setCursor }) => (
  <section className="relative px-6 py-28">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <Eyebrow color="terracotta">Curated Drops</Eyebrow>
          <Serif className="block text-5xl font-medium text-emerald-950 sm:text-6xl">
            <SplitReveal text="Collections." />
          </Serif>
        </div>
        <MagneticButton variant="outline" onClick={() => setPage({ id: 'collections' })}>View All</MagneticButton>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {COLLECTIONS.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setPage({ id: 'collection-detail', slug: c.slug })}
            onMouseEnter={() => setCursor('OPEN')}
            onMouseLeave={() => setCursor(null)}
            className="group relative aspect-[3/4] cursor-pointer overflow-hidden"
          >
            <motion.img
              src={c.img}
              alt={c.name}
              className="h-full w-full object-cover"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-stone-50">
              <div>
                <Mono className="text-[10px] uppercase tracking-[0.4em] text-stone-50/70">{c.items} pieces</Mono>
                <Serif className="mt-2 block text-3xl">{c.name}</Serif>
              </div>
              <motion.span
                whileHover={{ rotate: 45 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-50/40 transition group-hover:border-stone-50 group-hover:bg-stone-50 group-hover:text-emerald-950"
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Testimonials ---------- */

const Testimonials = () => (
  <section className="relative bg-stone-100 px-6 py-28">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div className="space-y-4">
          <Eyebrow>Worn by</Eyebrow>
          <Serif className="block text-5xl font-medium text-emerald-950 sm:text-6xl">
            A quiet <em className="italic text-orange-800">following</em>.
          </Serif>
        </div>
        <p className="text-sm leading-7 text-emerald-950/65">
          From editors in Copenhagen to surfers in Lisbon — the kind of people who wear one good pair for years.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.8 }}
            className="border-t border-emerald-950/15 pt-8"
          >
            <div className="mb-5 flex gap-1">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-orange-800 text-orange-800" />)}
            </div>
            <Serif className="block text-2xl leading-snug text-emerald-950">&ldquo;{t.text}&rdquo;</Serif>
            <figcaption className="mt-6 flex items-center gap-3">
              <img src={t.img} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-sm text-emerald-950">{t.name}</p>
                <Mono className="text-[10px] uppercase tracking-[0.35em] text-emerald-950/55">{t.city}</Mono>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Newsletter ---------- */

const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 border-t border-emerald-950/15 pt-20 lg:grid-cols-2">
        <div>
          <Eyebrow color="terracotta">The letter</Eyebrow>
          <Serif className="mt-4 block text-5xl font-medium text-emerald-950 sm:text-6xl">
            Slow updates, <em className="italic text-orange-800">never noise</em>.
          </Serif>
          <p className="mt-5 max-w-md text-sm leading-7 text-emerald-950/65">
            One email a month. New drops, atelier notes, and the occasional essay. Unsubscribe anytime.
          </p>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
          className="flex w-full flex-col gap-3 sm:flex-row"
        >
          <input
            data-testid="newsletter-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 border border-emerald-950/25 bg-transparent px-5 py-4 text-sm text-emerald-950 placeholder:text-emerald-950/40 focus:border-emerald-950 focus:outline-none"
          />
          <button
            data-testid="newsletter-submit"
            className="bg-emerald-950 px-7 py-4 text-[10px] uppercase tracking-[0.4em] text-stone-100 transition hover:bg-orange-800"
          >
            <Mono>{sent ? 'Subscribed' : 'Subscribe'}</Mono>
          </button>
        </form>
      </div>
    </section>
  );
};

/* ---------- PAGES ---------- */

const HomePage = ({ template, setPage, setCursor }) => (
  <>
    <Hero template={template} setPage={setPage} setCursor={setCursor} />
    <DualMarquee items={['Free shipping over $150', 'Lifetime resole', 'Made in Porto', 'Carbon-neutral delivery', '30-day returns']} dir="left" />
    <FeaturedHScroll setPage={setPage} setCursor={setCursor} />
    <DualMarquee items={['Hand-lasted in Portugal', 'Goodyear welt', 'Vegetable-tanned leather', '96% recycled materials']} dir="right" />
    <CraftProcess />
    <CollectionsStrip setPage={setPage} setCursor={setCursor} />
    <Testimonials />
    <NewsletterCTA />
  </>
);

const ProductCard = ({ p, setCursor }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    onMouseEnter={() => setCursor && setCursor('VIEW')}
    onMouseLeave={() => setCursor && setCursor(null)}
    className="group"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
      <img src={p.img} alt={p.name} className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110" />
      <span className="absolute left-4 top-4 bg-stone-50 px-3 py-1 text-[9px] uppercase tracking-[0.4em] text-emerald-950">
        <Mono>{p.tag}</Mono>
      </span>
      <motion.div
        initial={false}
        className="absolute inset-x-0 bottom-0 translate-y-full bg-emerald-950/95 px-5 py-4 text-stone-50 backdrop-blur-md transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
      >
        <div className="flex items-center justify-between">
          <Mono className="text-[10px] uppercase tracking-[0.4em] text-stone-50/65">Quick add</Mono>
          <Plus className="h-4 w-4" />
        </div>
      </motion.div>
    </div>
    <div className="mt-5 flex items-start justify-between gap-4">
      <div>
        <Serif className="block text-xl text-emerald-950">{p.name}</Serif>
        <Mono className="mt-1 text-[10px] uppercase tracking-[0.35em] text-emerald-950/55">{p.color}</Mono>
      </div>
      <Mono className="text-base text-emerald-950">${p.price}</Mono>
    </div>
  </motion.article>
);

const ShopPage = ({ setCursor }) => {
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-emerald-950/15 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <Eyebrow>Shop</Eyebrow>
            <Serif className="block text-6xl font-medium text-emerald-950 sm:text-7xl">
              <SplitReveal text="Every pair," />{' '}
              <em className="italic text-orange-800"><SplitReveal text="in one place." delay={0.3} /></em>
            </Serif>
          </div>
          <p className="max-w-sm text-sm leading-7 text-emerald-950/65">
            {filtered.length} pieces. Free shipping on orders over $150. Lifetime resole on every shoe.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {SHOP_CATEGORIES.map((c) => {
            const active = c.id === cat;
            return (
              <button
                key={c.id}
                data-testid={`shop-cat-${c.id}`}
                onClick={() => setCat(c.id)}
                className={`rounded-full border px-5 py-2 text-[10px] uppercase tracking-[0.35em] transition ${
                  active
                    ? 'border-emerald-950 bg-emerald-950 text-stone-100'
                    : 'border-emerald-950/20 text-emerald-950/70 hover:border-emerald-950 hover:text-emerald-950'
                }`}
              >
                <Mono>{c.label}</Mono>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} setCursor={setCursor} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const CollectionsPage = ({ setPage, setCursor }) => (
  <section className="relative px-6 py-20">
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <Eyebrow color="terracotta">Curated drops</Eyebrow>
        <Serif className="mt-5 block text-6xl font-medium text-emerald-950 sm:text-7xl">
          Three rooms. <em className="italic text-orange-800">One atelier.</em>
        </Serif>
      </div>

      <div className="mt-20 space-y-28">
        {COLLECTIONS.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
          >
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/5] overflow-hidden"
              onMouseEnter={() => setCursor('OPEN')}
              onMouseLeave={() => setCursor(null)}
              onClick={() => setPage({ id: 'collection-detail', slug: c.slug })}
            >
              <img src={c.img} alt={c.name} className="h-full w-full cursor-pointer object-cover transition duration-[1500ms] hover:scale-110" />
            </motion.div>
            <div className="space-y-6">
              <Eyebrow>{`Drop 0${i + 1}`}</Eyebrow>
              <Serif className="block text-5xl font-medium text-emerald-950 sm:text-6xl">{c.name}</Serif>
              <p className="max-w-md text-base leading-8 text-emerald-950/70">{c.blurb}</p>
              <Mono className="text-[10px] uppercase tracking-[0.4em] text-emerald-950/55">{c.items} pieces</Mono>
              <div>
                <MagneticButton onClick={() => setPage({ id: 'collection-detail', slug: c.slug })}>Explore Drop</MagneticButton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Collection Detail Page (pagination) ---------- */

const CollectionDetailPage = ({ slug, setPage, setCursor }) => {
  const collection = COLLECTIONS.find((c) => c.slug === slug) || COLLECTIONS[0];
  const allProducts = useMemo(() => buildCollectionProducts(collection.slug), [collection.slug]);
  const [page, setLocalPage] = useState(1);
  const [sort, setSort] = useState('featured');
  const [filterCat, setFilterCat] = useState('all');
  const perPage = 6;

  const filtered = useMemo(() => {
    let list = filterCat === 'all' ? allProducts : allProducts.filter((p) => p.cat === filterCat);
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [allProducts, sort, filterCat]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  useEffect(() => { setLocalPage(1); }, [filterCat, sort]);

  return (
    <section className="relative">
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <motion.img
          src={collection.img}
          alt={collection.name}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/35 to-emerald-950/10" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12">
          <div className="mx-auto max-w-7xl">
            <button
              onClick={() => setPage({ id: 'collections' })}
              className="mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-stone-50/80 transition hover:text-stone-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> <Mono>Back to Collections</Mono>
            </button>
            <Eyebrow color="terracotta">Drop · {collection.slug.toUpperCase()}</Eyebrow>
            <Serif className="mt-3 block text-6xl font-medium leading-[1] text-stone-50 sm:text-8xl">
              <SplitReveal text={collection.name} />
            </Serif>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-50/75">{collection.blurb}</p>
            <Mono className="mt-6 inline-block text-[10px] uppercase tracking-[0.4em] text-orange-300">
              {collection.items} pieces · AW 26
            </Mono>
          </div>
        </div>
      </div>

      <div className="sticky top-[73px] z-20 border-y border-emerald-950/10 bg-stone-50/90 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="mr-2 h-3.5 w-3.5 text-emerald-950/60" />
            {SHOP_CATEGORIES.map((c) => {
              const active = c.id === filterCat;
              return (
                <button
                  key={c.id}
                  onClick={() => setFilterCat(c.id)}
                  className={`rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] transition ${
                    active
                      ? 'bg-emerald-950 text-stone-50'
                      : 'text-emerald-950/65 hover:text-emerald-950'
                  }`}
                >
                  <Mono>{c.label}</Mono>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <Mono className="text-[10px] uppercase tracking-[0.35em] text-emerald-950/55">Sort</Mono>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-emerald-950/20 bg-transparent px-3 py-1.5 text-[10px] uppercase tracking-[0.35em] text-emerald-950 focus:outline-none"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              <option value="featured">Featured</option>
              <option value="low">Price · Low → High</option>
              <option value="high">Price · High → Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-6 flex items-center justify-between">
          <Mono className="text-[10px] uppercase tracking-[0.4em] text-emerald-950/55">
            Showing {start + 1}–{Math.min(start + perPage, filtered.length)} of {filtered.length}
          </Mono>
          <Mono className="text-[10px] uppercase tracking-[0.4em] text-emerald-950/55">
            Page {page} / {totalPages || 1}
          </Mono>
        </div>

        <motion.div layout className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {current.map((p) => (
              <ProductCard key={p.id} p={p} setCursor={setCursor} />
            ))}
          </AnimatePresence>
        </motion.div>

        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => setLocalPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-950/25 text-emerald-950 transition disabled:opacity-30 hover:bg-emerald-950 hover:text-stone-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              const active = n === page;
              return (
                <button
                  key={n}
                  onClick={() => setLocalPage(n)}
                  className={`inline-flex h-10 min-w-[40px] items-center justify-center rounded-full border px-3 text-[11px] transition ${
                    active
                      ? 'border-emerald-950 bg-emerald-950 text-stone-50'
                      : 'border-emerald-950/15 text-emerald-950/65 hover:border-emerald-950 hover:text-emerald-950'
                  }`}
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {String(n).padStart(2, '0')}
                </button>
              );
            })}
            <button
              onClick={() => setLocalPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-950/25 text-emerald-950 transition disabled:opacity-30 hover:bg-emerald-950 hover:text-stone-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const StoryPage = () => (
  <section className="relative px-6 py-20">
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <Eyebrow color="terracotta">Our Story</Eyebrow>
        <Serif className="mt-5 block text-6xl font-medium leading-[1.05] text-emerald-950 sm:text-7xl">
          A workshop in <em className="italic text-orange-800">Porto</em>, and a small idea.
        </Serif>
      </div>

      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 aspect-[16/10] overflow-hidden"
      >
        <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&w=1800&q=80" alt="atelier" className="h-full w-full object-cover" />
      </motion.div>

      <div className="mt-16 space-y-10 text-lg leading-9 text-emerald-950/80">
        <p>
          Haven began in 2012 in a 60-square-metre workshop above a fish market. We started with one
          last, one leather, and one rule: <Serif className="italic text-orange-800">make shoes someone could wear for ten years</Serif>.
        </p>
        <p>
          Fourteen years later we still last every pair by hand. The market downstairs is now a record
          store. The rule hasn’t changed.
        </p>
        <blockquote className="border-l-2 border-orange-800 pl-6">
          <Serif className="block text-3xl italic text-emerald-950">
            “We don’t do seasons. We do shoes.”
          </Serif>
          <Mono className="mt-3 block text-[10px] uppercase tracking-[0.35em] text-emerald-950/55">— João, co-founder</Mono>
        </blockquote>
        <p>
          Every Haven shoe is made by one person from start to finish. We list every maker on a small
          card tucked inside the box.
        </p>
      </div>

      <div className="mt-20 grid gap-8 border-t border-emerald-950/15 pt-12 sm:grid-cols-4">
        {[
          { k: 14, v: 'Years' },
          { k: 42, v: 'Makers' },
          { k: 8, v: 'Lasts' },
          { k: 1, v: 'Workshop' },
        ].map((s) => (
          <div key={s.v}>
            <Serif className="block text-5xl font-light text-emerald-950"><Counter to={s.k} /></Serif>
            <Mono className="mt-1 block text-[10px] uppercase tracking-[0.35em] text-emerald-950/55">{s.v}</Mono>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const LookbookPage = ({ setCursor }) => (
  <section className="relative px-6 py-20">
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <Eyebrow>Lookbook · AW26</Eyebrow>
        <Serif className="mt-5 block text-6xl font-medium text-emerald-950 sm:text-7xl">
          In the <em className="italic text-orange-800">wild</em>.
        </Serif>
      </div>

      <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {LOOKBOOK.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.07, duration: 0.8 }}
            onMouseEnter={() => setCursor && setCursor('VIEW')}
            onMouseLeave={() => setCursor && setCursor(null)}
            className="group relative mb-4 break-inside-avoid overflow-hidden"
          >
            <img
              src={src}
              alt={`look ${i + 1}`}
              className="w-full transition duration-[1500ms] group-hover:scale-110"
              style={{ height: i % 3 === 0 ? 420 : i % 3 === 1 ? 320 : 500, objectFit: 'cover' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-emerald-950/0 transition group-hover:bg-emerald-950/25" />
            <div className="absolute inset-x-0 bottom-0 translate-y-4 px-5 py-4 text-stone-50 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <Mono className="text-[10px] uppercase tracking-[0.4em]">Look {String(i + 1).padStart(2, '0')}</Mono>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow color="terracotta">Say hello</Eyebrow>
            <Serif className="mt-5 block text-6xl font-medium leading-[1.05] text-emerald-950 sm:text-7xl">
              We <em className="italic text-orange-800">reply</em>. Always.
            </Serif>
            <p className="mt-6 max-w-md text-base leading-8 text-emerald-950/70">
              Sizing, resoles, press, partnerships — write us a note. We read every one, usually within a day.
            </p>

            <dl className="mt-12 space-y-5 text-sm">
              {[
                { Icon: MapPin, k: 'Atelier', v: 'Rua das Flores 22, Porto · Portugal' },
                { Icon: Phone, k: 'Phone / WhatsApp', v: '+351 220 145 022' },
                { Icon: Mail, k: 'Email', v: 'hello@haven.studio' },
                { Icon: Truck, k: 'Resole service', v: 'resole@haven.studio' },
              ].map(({ Icon, k, v }) => (
                <div key={k} className="flex items-start gap-4">
                  <Icon className="mt-1 h-4 w-4 text-orange-800" />
                  <div>
                    <Mono className="block text-[10px] uppercase tracking-[0.35em] text-emerald-950/55">{k}</Mono>
                    <dd className="mt-1 text-emerald-950">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-5 border border-emerald-950/15 bg-stone-50 p-8 sm:p-10"
          >
            {[
              { k: 'name', label: 'Name', type: 'text' },
              { k: 'email', label: 'Email', type: 'email' },
            ].map((f) => (
              <div key={f.k}>
                <Mono className="block text-[10px] uppercase tracking-[0.35em] text-emerald-950/55">{f.label}</Mono>
                <input
                  required
                  type={f.type}
                  value={form[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="mt-2 w-full border-b border-emerald-950/25 bg-transparent py-2.5 text-emerald-950 focus:border-emerald-950 focus:outline-none"
                />
              </div>
            ))}
            <div>
              <Mono className="block text-[10px] uppercase tracking-[0.35em] text-emerald-950/55">Message</Mono>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full resize-none border-b border-emerald-950/25 bg-transparent py-2.5 text-emerald-950 focus:border-emerald-950 focus:outline-none"
              />
            </div>
            <button
              data-testid="contact-submit"
              type="submit"
              className="mt-4 w-full bg-emerald-950 py-4 text-[10px] uppercase tracking-[0.4em] text-stone-100 transition hover:bg-orange-800"
            >
              <Mono>{sent ? 'Note sent — thank you' : 'Send note'}</Mono>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

/* ---------- Footer ---------- */

const Footer = ({ template }) => (
  <footer className="relative bg-emerald-950 px-6 pt-20 pb-10 text-stone-100">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-100/40 text-stone-100">
              <Serif className="text-base font-medium leading-none">h</Serif>
            </span>
            <Serif className="text-2xl font-medium tracking-[0.25em]">{template?.name || 'Haven'}</Serif>
          </div>
          <p className="max-w-xs text-sm leading-7 text-stone-100/65">
            Hand-lasted footwear, made in Porto. Built to be worn, repaired, and worn again.
          </p>
        </div>

        {[
          { title: 'Shop', items: ['All', 'Sneakers', 'Loafers', 'Boots', 'Sale'] },
          { title: 'Studio', items: ['Story', 'Lookbook', 'Press', 'Resole'] },
          { title: 'Care', items: ['Sizing', 'Shipping', 'Returns', 'Contact'] },
        ].map((col) => (
          <div key={col.title}>
            <Mono className="block text-[10px] uppercase tracking-[0.4em] text-orange-300">{col.title}</Mono>
            <ul className="mt-5 space-y-3 text-sm text-stone-100/70">
              {col.items.map((it) => (
                <li key={it}><a href="#" className="transition hover:text-stone-50">{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-stone-100/15 pt-6 text-xs text-stone-100/55 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {template?.name || 'Haven'} Studio. Made slowly in Porto.</p>
        <div className="flex gap-2 text-stone-100/70">
          <a href="#" className="rounded-full border border-stone-100/20 p-2 transition hover:border-stone-100 hover:text-stone-50"><Globe className="h-3.5 w-3.5" /></a>
          <a href="#" className="rounded-full border border-stone-100/20 p-2 transition hover:border-stone-100 hover:text-stone-50"><MessageCircle className="h-3.5 w-3.5" /></a>
          <a href="#" className="rounded-full border border-stone-100/20 p-2 transition hover:border-stone-100 hover:text-stone-50"><Globe className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </div>
  </footer>
);

/* ---------- Scroll progress bar ---------- */

const ScrollProgress = () => {
  const { scrollYProgress } = useTemplateScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-orange-800"
    />
  );
};

/* ---------- ROOT ---------- */

const HavenTemplate = ({ template = {}, onApply = () => {} }) => {
  const [page, setPage] = useState({ id: 'home' });
  const [cursor, setCursor] = useState(null);

  // ---- Global scroll-to-top on every navigation ----
  // The template lives inside a custom scroll container (see ScrollContainerContext +
  // `overflow-hidden` on the root wrapper), so `window.scrollTo` alone is not enough.
  // We reset ALL possible scroll surfaces: the nearest scrollable ancestor of our root,
  // documentElement, body, and window. Doing it here (root) means every setPage(...) —
  // current and future — is covered, including mobile menu and CollectionDetailPage.
  const rootRef = useRef(null);

  const resetScroll = useCallback(() => {
    if (typeof window === 'undefined') return;

    // 1) Walk up from our root to find the real scrolling ancestor and reset it.
    let node = rootRef.current?.parentElement || null;
    while (node && node !== document.body) {
      const style = window.getComputedStyle(node);
      const overflowY = style.overflowY;
      const canScroll =
        (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
        node.scrollHeight > node.clientHeight;
      if (canScroll) node.scrollTop = 0;
      node = node.parentElement;
    }

    // 2) Reset document + window as a fallback for normal layouts.
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  // Synchronous reset before paint — prevents the "flash at old scroll position".
  useLayoutEffect(() => {
    resetScroll();
    // Belt-and-suspenders: also reset on next frame, AFTER Framer Motion has applied
    // any layout transforms from the page transition.
    const raf1 = requestAnimationFrame(resetScroll);
    const raf2 = requestAnimationFrame(() => requestAnimationFrame(resetScroll));
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [page.id, page.slug, resetScroll]);

  const renderPage = () => {
    switch (page.id) {
      case 'home':
        return <HomePage template={template} setPage={setPage} setCursor={setCursor} />;
      case 'shop':
        return <ShopPage setCursor={setCursor} />;
      case 'collections':
        return <CollectionsPage setPage={setPage} setCursor={setCursor} />;
      case 'collection-detail':
        return <CollectionDetailPage slug={page.slug} setPage={setPage} setCursor={setCursor} />;
      case 'story':
        return <StoryPage />;
      case 'lookbook':
        return <LookbookPage setCursor={setCursor} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage template={template} setPage={setPage} setCursor={setCursor} />;
    }
  };

  return (
    <div
      ref={rootRef}
      data-testid="haven-template"
      style={{ fontFamily: '"Inter", "Helvetica Neue", system-ui, sans-serif' }}
      className="relative min-h-screen w-full overflow-hidden bg-stone-50 text-emerald-950 antialiased selection:bg-orange-800 selection:text-stone-50"
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/></svg>")',
        }}
      />

      <ScrollProgress />
      <CustomCursor hint={cursor} />

      <div className="relative z-10">
        <Header template={template} page={page.id} setPage={setPage} onApply={onApply} setCursor={setCursor} />

        <main>
          <AnimatePresence mode="sync" onExitComplete={resetScroll}>
            <motion.div
              key={`${page.id}-${page.slug || ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.7, ease: [0.86, 0, 0.07, 1] }}
                style={{ transformOrigin: 'top' }}
                className="pointer-events-none fixed inset-0 z-[55] bg-emerald-950"
              />
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        <TemplatePreviewMeta template={template} />
        <Footer template={template} />
      </div>
    </div>
  );
};

export default HavenTemplate;