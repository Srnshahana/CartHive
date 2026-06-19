import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowUpRight, Star, Plus, Minus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';
import HeroSecondary from "../../../../../assets/templates/Arcadia/hero/hero-secondary.png";
import StoryOrigin from "../../../../../assets/templates/Arcadia/story/origin.jpg";
import StoryBrew from "../../../../../assets/templates/Arcadia/story/brew.jpg";
import StoryRoast from "../../../../../assets/templates/Arcadia/story/roast.jpg";
import CerroMain from "../../../../../assets/templates/arcadia/beans/cerro-main.jpg";
import CerroBag from "../../../../../assets/templates/arcadia/beans/cerro-bag.jpg";

import YirgMain from "../../../../../assets/templates/arcadia/beans/yirg-main.jpg";
import YirgBag from "../../../../../assets/templates/arcadia/beans/yirg-bag.jpg";

import GeishaMain from "../../../../../assets/templates/arcadia/beans/geisha-main.jpg";
import GeishaBag from "../../../../../assets/templates/arcadia/beans/geisha-bag.jpg";

import EspressoImg from "../../../../../assets/templates/arcadia/menu/espresso.jpg";
import FlatWhiteImg from "../../../../../assets/templates/arcadia/menu/flat-white.jpg";
import ColdBrewImg from "../../../../../assets/templates/arcadia/menu/cold-brew.jpg";
import CortadoImg from "../../../../../assets/templates/arcadia/menu/cortado.jpg";
import PourOverImg from "../../../../../assets/templates/arcadia/menu/pour-over.jpg";
import MatchaLatteImg from "../../../../../assets/templates/arcadia/menu/matcha-latte.jpg";
import CappuccinoImg from "../../../../../assets/templates/arcadia/menu/cappuccino.jpg";
import AmericanoImg from "../../../../../assets/templates/arcadia/menu/americano.jpg";
import MochaImg from "../../../../../assets/templates/arcadia/menu/mocha.jpg";
import MacchiatoImg from "../../../../../assets/templates/arcadia/menu/macchiato.jpg";
import IcedLatteImg from "../../../../../assets/templates/arcadia/menu/iced-latte.jpg";
import AffogatoImg from "../../../../../assets/templates/arcadia/menu/affogato.jpg";
import ViennaImg from "../../../../../assets/templates/arcadia/menu/vienna.jpg";
import TurkishCoffeeImg from "../../../../../assets/templates/arcadia/menu/turkish-coffee.jpg";
import ChaiLatteImg from "../../../../../assets/templates/arcadia/menu/chai-latte.jpg";
import HotChocolateImg from "../../../../../assets/templates/arcadia/menu/hot-chocolate.jpg";
import VanillaLatteImg from "../../../../../assets/templates/arcadia/menu/vanilla-latte.jpg";
import CaramelMacchiatoImg from "../../../../../assets/templates/arcadia/menu/caramel-macchiato.jpg";
import IrishCoffeeImg from "../../../../../assets/templates/arcadia/menu/irish-coffee.jpg";
import DripCoffeeImg from "../../../../../assets/templates/arcadia/menu/drip-coffee.jpg";
import DecafEspressoImg from "../../../../../assets/templates/arcadia/menu/decaf-espresso.jpg";
import HoneyLatteImg from "../../../../../assets/templates/arcadia/menu/honey-latte.jpg";
import LavenderLatteImg from "../../../../../assets/templates/arcadia/menu/lavender-latte.jpg";
import NitroColdBrewImg from "../../../../../assets/templates/arcadia/menu/nitro-cold-brew.jpg";
import IcedAmericanoImg from "../../../../../assets/templates/arcadia/menu/iced-americano.jpg";
import EspressoTonicImg from "../../../../../assets/templates/arcadia/menu/espresso-tonic.jpg";


import PourOverGuideImg from "../../../../../assets/templates/arcadia/journal/pour-over-guide.jpg";
import YirgacheffeTripImg from "../../../../../assets/templates/arcadia/journal/yirgacheffe-trip.jpg";
import RoastLevelsImg from "../../../../../assets/templates/arcadia/journal/roast-levels.jpg";

const NAV = [
  { id: 'story', label: 'Our Story' },
  { id: 'menu', label: 'Menu' },
  { id: 'beans', label: 'Beans' },
  { id: 'journal', label: 'Journal' },
  { id: 'visit', label: 'Visit' },
];

const MENU = [
  { name: 'Espresso',          desc: 'Single origin, dark roast, chocolate finish',          price: '$4.50', img: EspressoImg },
  { name: 'Flat White',        desc: 'Velvet milk, double ristretto, hazelnut top',          price: '$5.20', img: FlatWhiteImg },
  { name: 'Cold Brew',         desc: '18-hour steep, citrus & cane',                          price: '$5.80', img: ColdBrewImg },
  { name: 'Cortado',           desc: 'Equal parts espresso & steam, soft body',               price: '$4.80', img: CortadoImg },
  { name: 'Pour Over',         desc: 'Hand-poured V60, ever-changing single origins',         price: '$6.40', img: PourOverImg },
  { name: 'Matcha Latte',      desc: 'Ceremonial-grade matcha, oat milk, honey rim',          price: '$6.00', img: MatchaLatteImg },
  { name: 'Cappuccino',        desc: 'Equal thirds, dry foam crown, cocoa dust',              price: '$5.00', img: CappuccinoImg },
  { name: 'Americano',         desc: 'Double shot, hot water, long finish',                   price: '$4.20', img: AmericanoImg },
  { name: 'Mocha',             desc: 'Espresso, dark chocolate ganache, steamed milk',        price: '$5.80', img: MochaImg },
  { name: 'Macchiato',         desc: 'Ristretto marked with a dollop of foam',                price: '$4.40', img: MacchiatoImg },
  { name: 'Iced Latte',        desc: 'Cold milk, double shot, slow pour over ice',            price: '$5.50', img: IcedLatteImg },
  { name: 'Affogato',          desc: 'Vanilla bean gelato, fresh espresso poured over',       price: '$7.20', img: AffogatoImg },
  { name: 'Vienna',            desc: 'Espresso topped with whipped cream',                     price: '$5.40', img: ViennaImg },
  { name: 'Turkish Coffee',    desc: 'Cezve-brewed, unfiltered, cardamom whisper',            price: '$5.20', img: TurkishCoffeeImg },
  { name: 'Chai Latte',        desc: 'House-brewed masala chai, cardamom, ginger',            price: '$5.40', img: ChaiLatteImg },
  { name: 'Hot Chocolate',     desc: '70% dark Belgian chocolate, steamed milk',              price: '$5.60', img: HotChocolateImg },
  { name: 'Vanilla Latte',     desc: 'Madagascar vanilla, double shot, silky milk',           price: '$5.80', img: VanillaLatteImg },
  { name: 'Caramel Macchiato', desc: 'Vanilla milk, espresso, caramel drizzle',               price: '$6.20', img: CaramelMacchiatoImg },
  { name: 'Irish Coffee',      desc: 'Hot coffee, brown sugar, cream float',                  price: '$8.40', img: IrishCoffeeImg },
  { name: 'Drip Coffee',       desc: 'Today’s house roast, batch-brewed by the cup',          price: '$3.80', img: DripCoffeeImg },
  { name: 'Decaf Espresso',    desc: 'Swiss-water decaf, same depth, no buzz',                price: '$4.50', img: DecafEspressoImg },
  { name: 'Honey Latte',       desc: 'Wildflower honey, espresso, steamed milk',              price: '$5.90', img: HoneyLatteImg },
  { name: 'Lavender Latte',    desc: 'House lavender syrup, oat milk, double shot',           price: '$6.20', img: LavenderLatteImg },
  { name: 'Nitro Cold Brew',   desc: 'Cold brew on nitro tap, cascading cream head',          price: '$6.40', img: NitroColdBrewImg },
  { name: 'Iced Americano',    desc: 'Double shot, ice water, crisp finish',                  price: '$4.60', img: IcedAmericanoImg },
  { name: 'Espresso Tonic',    desc: 'Tonic water, espresso, orange twist',                   price: '$5.60', img: EspressoTonicImg },
];



const BEANS = [
  {
    name: 'Cerro Azul',
    region: 'Honduras',
    altitude: '1,650 m',
    process: 'Washed',
    notes: 'Caramel · Almond · Plum',
    img: CerroMain,
    bagImg: CerroBag,
    description:
      'A balanced Honduran coffee with notes of stewed plum, toasted almond, and rich caramel sweetness. Smooth and approachable, it shines both as a filter brew and a comforting daily espresso.'
  },

  {
    name: 'Yirgacheffe',
    region: 'Ethiopia',
    altitude: '2,100 m',
    process: 'Natural',
    notes: 'Jasmine · Bergamot · Peach',
    img: YirgMain,
    bagImg: YirgBag,
    description:
      'Bright, floral, and expressive. This Ethiopian coffee opens with jasmine aromas, followed by juicy peach sweetness and delicate bergamot tea notes that linger long after each sip.'
  },

  {
    name: 'Geisha Reserve',
    region: 'Panama',
    altitude: '1,800 m',
    process: 'Honey',
    notes: 'Honey · Rose · Citrus',
    img: GeishaMain,
    bagImg: GeishaBag,
    description:
      'An elegant and aromatic coffee with layers of rose petals, honey sweetness, and vibrant citrus. Best enjoyed as a slow pour-over to fully appreciate its delicate character.'
  },
];

const JOURNAL = [
  { tag: 'Brewing', title: 'A slow guide to the perfect pour over', img: PourOverGuideImg,
    excerpt: 'Water at 94°C, a 30-second bloom, and a steady spiral pour. The difference between rushed and ritual is two minutes — and a cup that tastes like the farm it came from.', time: '5 min' },
  { tag: 'Origin', title: 'Walking the highlands of Yirgacheffe', img: YirgacheffeTripImg,
    excerpt: 'At 2,100 metres the air thins and cherries ripen slowly. We spent a week with the Konga cooperative, drying beans on raised beds and tasting the season in every lot.', time: '7 min' },
  { tag: 'Craft', title: 'What roast level really means', img: RoastLevelsImg,
    excerpt: 'Light, medium, dark — the words are easy, the choice is not. A roast curve decides whether you taste blueberry, caramel, or smoke. We pull every batch at first crack plus a heartbeat.', time: '4 min' },
];

const FAQ = [
  { q: 'Where do you source your beans?', a: 'Direct from family-run farms across Ethiopia, Honduras, Panama and Colombia — we visit each origin annually.' },
  { q: 'Do you offer subscriptions?', a: 'Yes. Choose weekly, fortnightly or monthly. Pause or skip anytime — no penalties.' },
  { q: 'Is your packaging compostable?', a: 'All bags are home-compostable, printed with vegetable inks, and shipped carbon-neutral.' },
];

const POLICIES = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: January 2026',
    sections: [
      { h: '1. What we collect', p: 'When you place an order or sign up for our newsletter we collect your name, email, shipping address and payment details. We also collect anonymous browsing data via cookies to improve our site.' },
      { h: '2. How we use it', p: 'To process your orders, send brewing tips and origin updates, and to occasionally let you know about new lots. We never sell your data to third parties.' },
      { h: '3. Cookies & analytics', p: 'We use lightweight analytics (Plausible) to understand which pages our visitors love. No personal identifiers, no cross-site tracking, no ad networks.' },
      { h: '4. Your rights', p: 'You can request a copy of your data, correct it, or have it deleted at any time. Just write to privacy@arcadia.coffee and we will respond within 14 days.' },
      { h: '5. Contact', p: 'Arcadia Coffee Roasters, 14 Olive Lane, Brera, Milan, IT 20121 · privacy@arcadia.coffee' },
    ],
  },
  shipping: {
    title: 'Shipping Policy',
    updated: 'Last updated: January 2026',
    sections: [
      { h: '1. Roast & dispatch', p: 'We roast every Tuesday and ship Wednesday morning so your beans arrive at peak freshness — usually 5 to 10 days off the roast.' },
      { h: '2. Delivery times', p: 'Italy: 1–2 business days. EU: 3–5 business days. UK, US & rest of world: 5–10 business days. Tracking is provided for every order.' },
      { h: '3. Shipping costs', p: 'Free standard shipping in Italy on orders over €40. EU flat rate €6. International from €12 depending on destination.' },
      { h: '4. Packaging', p: 'Beans ship in home-compostable bags inside recycled cardboard. We never use plastic fillers — straw or shredded paper only.' },
      { h: '5. Lost or damaged', p: 'If your order arrives damaged or never arrives, write to hello@arcadia.coffee within 14 days and we will replace it free of charge.' },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: 'Last updated: January 2026',
    sections: [
      { h: '1. Ordering', p: 'By placing an order you confirm you are 18 or older and that the details you provided are accurate. We may cancel any order at our discretion and refund in full.' },
      { h: '2. Prices', p: 'All prices are in Euros (€) and include VAT where applicable. Prices may change without notice but will not affect orders already placed.' },
      { h: '3. Subscriptions', p: 'Subscriptions auto-renew at the cadence you choose. You can pause, skip or cancel from your account dashboard at any time, no penalties.' },
      { h: '4. Returns', p: 'Because coffee is a perishable food product, we do not accept returns. If something is wrong with your order, write to us and we will make it right.' },
      { h: '5. Liability', p: 'To the extent allowed by law, Arcadia is not liable for any indirect or consequential loss arising from the use of our products or website.' },
      { h: '6. Governing law', p: 'These terms are governed by Italian law. Any disputes will be handled by the courts of Milan.' },
    ],
  },
};

const FALLING_BEANS = Array.from({ length: 14 }).map((_, i) => ({
  left: `${(i * 7.3 + (i % 3) * 4) % 96 + 2}%`,
  size: 16 + ((i * 7) % 22),
  duration: 6 + ((i * 1.7) % 7),
  delay: -(i * 0.85) % 9,
  rotate: (i * 47) % 360,
  drift: ((i % 2 === 0) ? 1 : -1) * (10 + (i * 3) % 28),
}));

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const RevealWords = ({ text, className = '' }) => (
  <span className={className}>
    {text.split(' ').map((w, i) => (
      <motion.span key={i} className="inline-block"
        initial={{ y: '110%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginRight: '0.25em' }}
      >
        {w}
      </motion.span>
    ))}
  </span>
);

const PAGE_SIZE = 6;

const ArcadiaTemplate = ({ template, onApply }) => {
  const [openFaq, setOpenFaq] = useState(0);
  const [openJournal, setOpenJournal] = useState(null);
  const [menuPage, setMenuPage] = useState(0);
  const [openPolicy, setOpenPolicy] = useState(null); // 'privacy' | 'shipping' | 'terms' | null
  const brandName = template?.name || 'Arcadia';

  const totalPages = Math.ceil(MENU.length / PAGE_SIZE);
  const pagedMenu = useMemo(
    () => MENU.slice(menuPage * PAGE_SIZE, menuPage * PAGE_SIZE + PAGE_SIZE),
    [menuPage]
  );

  const goPage = (p) => {
    setMenuPage(Math.max(0, Math.min(totalPages - 1, p)));
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-[#f3ead9] text-[#2b1e15]"
      style={{ fontFamily: '"DM Serif Display", "Cormorant Garamond", Georgia, serif' }}
      data-testid="arcadia-template"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .arc-sans  { font-family: "DM Sans", system-ui, sans-serif; }
        .arc-serif { font-family: "DM Serif Display", Georgia, serif; }
        .coffee-bean { position: absolute; top: -60px; border-radius: 50% / 60%;
          background: linear-gradient(135deg, #4a2c1a 0%, #2b1e15 55%, #1a120c 100%);
          box-shadow: inset -2px -3px 4px rgba(0,0,0,0.45), inset 2px 2px 3px rgba(255,255,255,0.08), 0 4px 8px rgba(43,30,21,0.25); will-change: transform; }
        .coffee-bean::before { content: ''; position: absolute; top: 10%; left: 50%; width: 8%; height: 80%;
          background: #1a120c; border-radius: 50%; transform: translateX(-50%); }
        @keyframes beanFall {
          0% { transform: translate3d(0,-10vh,0) rotate(0deg); opacity: 0; }
          8% { opacity: 0.9; } 92% { opacity: 0.9; }
          100% { transform: translate3d(var(--drift,20px), 110vh, 0) rotate(var(--spin,540deg)); opacity: 0; } }
        .bean-falling { animation: beanFall linear infinite; }
        @keyframes productFloat { 0%,100% { transform: rotate(-14deg) translateY(0); } 50% { transform: rotate(-16deg) translateY(-14px); } }
        .product-float { animation: productFloat 5s ease-in-out infinite; transform-origin: center; }
        @keyframes splashPop { 0% { transform: translate(0,0) scale(0.4); opacity: 0; } 25% { opacity: 1; } 100% { transform: translate(var(--sx,0),var(--sy,-60px)) scale(1); opacity: 0; } }
        .splash-pop { animation: splashPop 2.6s cubic-bezier(.2,.7,.4,1) infinite; }
        @keyframes ringPulse { 0% { transform: scale(0.6); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }
        .ring-pulse { animation: ringPulse 3s ease-out infinite; }
        @keyframes drawLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .draw-line { transform-origin: left; animation: drawLine 1.2s ease-out 0.4s forwards; transform: scaleX(0); }
      `}</style>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-[#2b1e15]/10 bg-[#f3ead9]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button onClick={() => scrollToId('top')} className="arc-serif text-2xl font-normal tracking-tight" data-testid="brand-logo">
            {brandName}<span className="text-[#5b6b3a]">.</span>
          </button>
          <nav className="hidden items-center gap-8 md:flex arc-sans">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollToId(n.id)} className="group relative text-sm text-[#2b1e15]/80 transition hover:text-[#5b6b3a]" data-testid={`nav-${n.id}-btn`}>
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#5b6b3a] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button aria-label="favourites" className="rounded-full border border-[#2b1e15]/15 bg-white/60 p-3 text-[#5b6b3a] transition hover:rotate-12 hover:bg-white" data-testid="fav-btn">
              <Heart className="h-4 w-4" />
            </button>
            <button onClick={onApply} className="hidden sm:inline-flex arc-sans items-center gap-2 rounded-full bg-[#2b1e15] px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#f3ead9] transition hover:bg-[#5b6b3a]" data-testid="order-now-btn">
              Order Now <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden pt-20 pb-32 lg:pt-28 lg:pb-44">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {FALLING_BEANS.map((b, i) => (
            <span key={i} className="coffee-bean bean-falling"
              style={{ left: b.left, width: `${b.size}px`, height: `${b.size * 1.45}px`,
                animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s`,
                '--drift': `${b.drift}px`, '--spin': `${b.rotate + 720}deg`, transform: `rotate(${b.rotate}deg)` }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mx-auto flex items-center justify-center gap-3 arc-sans">
            <span className="h-px w-8 bg-[#5b6b3a]/50" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-[#5b6b3a]">Artisan · Small-batch · Slow roasted · Since 2014</span>
            <span className="h-px w-8 bg-[#5b6b3a]/50" />
          </motion.div>

          <h1 className="arc-serif mt-8 text-[clamp(2.75rem,9vw,9rem)] font-normal leading-[0.92] tracking-tight">
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="block">A quiet cup,</motion.span>
            <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }} className="block italic text-[#5b6b3a]">slowly poured.</motion.span>
            <span className="mx-auto mt-3 block h-[3px] w-32 bg-[#5b6b3a]/70 draw-line" />
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
            className="arc-sans mx-auto mt-10 max-w-xl text-base leading-7 text-[#2b1e15]/75">
            {template?.hero_subtext || 'Single-origin beans, hand-poured rituals, and a warm corner of the city built for unhurried mornings.'}
          </motion.p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => scrollToId('menu')} className="arc-sans inline-flex items-center justify-center gap-2 rounded-full bg-[#2b1e15] px-7 py-4 text-xs uppercase tracking-[0.25em] text-[#f3ead9] transition hover:scale-105 hover:bg-[#5b6b3a]" data-testid="hero-see-menu-btn">
              See the Menu <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => scrollToId('beans')} className="arc-sans inline-flex items-center justify-center gap-2 rounded-full border border-[#2b1e15]/25 bg-white/40 px-7 py-4 text-xs uppercase tracking-[0.25em] text-[#2b1e15] transition hover:scale-105 hover:bg-white" data-testid="hero-shop-beans-btn">
              Shop Beans
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT STICKER */}
      {/* PRODUCT STICKER */}
<section className="relative overflow-hidden py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    
    <div className="flex justify-center">
      <img
        src={HeroSecondary}
        alt="Cold Brew Can"
        className="w-full max-w-[700px] object-contain"
        draggable="false"
      />
    </div>

  </div>
</section>

      {/* STORY */}
      <section id="story" className="mx-auto max-w-7xl px-6 py-24 lg:px-8 scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="arc-sans text-xs uppercase tracking-[0.35em] text-[#5b6b3a]">(01) Our Story</p>
            <h2 className="arc-serif mt-5 text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.05]">
              <RevealWords text="Coffee that" /> <span className="italic text-[#5b6b3a]"><RevealWords text="remembers" /></span> <RevealWords text="where it came from." />
            </h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className="arc-sans lg:col-span-5 text-base leading-8 text-[#2b1e15]/75">
            Every bag carries a name, a farm, an altitude and a hand. We work direct with growers — fewer steps, fairer prices, and a cup that tastes like its origin.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
  { img: StoryOrigin, tag: 'Origin' },
  { img: StoryBrew, tag: 'Brew' },
  { img: StoryRoast, tag: 'Roast' },
].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[28px]">
              <img src={c.img} alt={c.tag} className="aspect-[4/5] w-full object-cover transition duration-[1200ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b1e15]/40 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="absolute left-4 top-4 arc-sans rounded-full bg-[#2b1e15]/85 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f3ead9]">{c.tag}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MENU with pagination */}
      <section id="menu" className="bg-[#ebe0c8] py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="arc-sans text-xs uppercase tracking-[0.35em] text-[#5b6b3a]">(02) The Menu</p>
              <h2 className="arc-serif mt-5 text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.05]">
                Today&apos;s <span className="italic text-[#5b6b3a]">brew</span> board
              </h2>
            </div>
            <p className="arc-sans max-w-sm text-sm leading-7 text-[#2b1e15]/70">
              {MENU.length} drinks across {totalPages} pages, all crafted from the beans we roast each morning.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={menuPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              data-testid={`menu-page-${menuPage}`}
            >
              {pagedMenu.map((m, i) => (
                <motion.div key={m.name}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-[24px] bg-white shadow-sm transition"
                  data-testid={`menu-card-${menuPage}-${i}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={m.img} alt={m.name} className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="arc-serif text-2xl sm:text-3xl">{m.name}</h3>
                      <span className="arc-serif text-xl text-[#5b6b3a]">{m.price}</span>
                    </div>
                    <p className="arc-sans mt-3 text-sm leading-6 text-[#2b1e15]/70">{m.desc}</p>
                    <button className="mt-5 arc-sans inline-flex items-center gap-2 rounded-full bg-[#2b1e15] px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-[#f3ead9] transition hover:bg-[#5b6b3a]">
                      Add to order <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className="mt-14 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="arc-sans text-xs uppercase tracking-[0.3em] text-[#2b1e15]/60">
              Page {menuPage + 1} of {totalPages} · {pagedMenu.length} of {MENU.length} drinks
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goPage(menuPage - 1)}
                disabled={menuPage === 0}
                className="arc-sans inline-flex items-center gap-1.5 rounded-full border border-[#2b1e15]/20 bg-white/60 px-4 py-2.5 text-[11px] uppercase tracking-[0.25em] text-[#2b1e15] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                data-testid="menu-prev-btn"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Prev
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, p) => {
                  const active = p === menuPage;
                  return (
                    <button
                      key={p}
                      onClick={() => goPage(p)}
                      className={`arc-sans h-9 w-9 rounded-full text-xs transition ${active ? 'bg-[#2b1e15] text-[#f3ead9]' : 'bg-white/60 text-[#2b1e15] hover:bg-white'}`}
                      data-testid={`menu-page-btn-${p}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {p + 1}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => goPage(menuPage + 1)}
                disabled={menuPage === totalPages - 1}
                className="arc-sans inline-flex items-center gap-1.5 rounded-full border border-[#2b1e15]/20 bg-white/60 px-4 py-2.5 text-[11px] uppercase tracking-[0.25em] text-[#2b1e15] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                data-testid="menu-next-btn"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BEANS */}
      <section id="beans" className="mx-auto max-w-7xl px-6 py-24 lg:px-8 scroll-mt-24">
        <p className="arc-sans text-xs uppercase tracking-[0.35em] text-[#5b6b3a]">(03) The Beans</p>
        <h2 className="arc-serif mt-5 text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.05]">
          Three single origins, <span className="italic text-[#5b6b3a]">rotated monthly.</span>
        </h2>

        <div className="mt-16 space-y-20">
          {BEANS.map((b, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div key={b.name}
                initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`grid items-center gap-10 lg:grid-cols-12 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div className="relative lg:col-span-7">
                  <motion.div whileHover={{ rotate: -2, scale: 1.02 }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[32px]">
                    <img src={b.img} alt={b.name} className="aspect-[5/4] w-full object-cover transition duration-[1500ms] hover:scale-110" />
                  </motion.div>
                  <motion.img src={b.bagImg} alt={`${b.name} bag`}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                    className={`absolute hidden md:block aspect-square w-44 rounded-[24px] object-cover shadow-xl ring-4 ring-[#f3ead9] ${reverse ? '-left-6 -bottom-10' : '-right-6 -bottom-10'}`}
                  />
                </div>
                <div className="lg:col-span-5">
                  <p className="arc-sans text-xs uppercase tracking-[0.3em] text-[#5b6b3a]">{b.region} · {b.altitude}</p>
                  <h3 className="arc-serif mt-3 text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05]">{b.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-2 arc-sans text-[10px] uppercase tracking-[0.2em] text-[#2b1e15]/70">
                    {b.notes.split(' · ').map((n) => (<span key={n} className="rounded-full border border-[#2b1e15]/20 bg-white/60 px-3 py-1">{n}</span>))}
                    <span className="rounded-full border border-[#5b6b3a]/40 bg-[#5b6b3a]/10 px-3 py-1 text-[#5b6b3a]">{b.process}</span>
                  </div>
                  <p className="arc-sans mt-6 text-base leading-7 text-[#2b1e15]/75">{b.description}</p>
                  <div className="mt-8 flex items-center gap-4">
                    <button className="arc-sans inline-flex items-center gap-2 rounded-full bg-[#2b1e15] px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#f3ead9] transition hover:scale-105 hover:bg-[#5b6b3a]">
                      Shop · $22 <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                    <span className="arc-sans text-xs uppercase tracking-[0.25em] text-[#2b1e15]/50">250g · whole bean</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* JOURNAL */}
      <section id="journal" className="bg-[#2b1e15] py-24 text-[#f3ead9] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="arc-sans text-xs uppercase tracking-[0.35em] text-[#c9a96e]">(04) Journal</p>
              <h2 className="arc-serif mt-5 text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.05]">
                Notes from the <span className="italic text-[#c9a96e]">cupping table.</span>
              </h2>
            </div>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {JOURNAL.map((j, i) => {
              const isOpen = openJournal === i;
              return (
                <motion.article key={j.title}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative" data-testid={`journal-card-${i}`}>
                  <div className="relative overflow-hidden rounded-[24px]">
                    <img src={j.img} alt={j.title} className="aspect-[4/3] w-full object-cover transition duration-[1200ms] group-hover:scale-110" />
                    <span className="absolute left-4 top-4 arc-sans rounded-full bg-[#f3ead9] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#2b1e15]">{j.tag}</span>
                  </div>
                  <h3 className="arc-serif mt-5 text-2xl leading-snug">{j.title}</h3>
                  <button onClick={() => setOpenJournal(isOpen ? null : i)}
                    className="arc-sans mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] transition hover:text-[#f3ead9]"
                    data-testid={`journal-read-btn-${i}`} aria-expanded={isOpen}>
                    {isOpen ? <>Close <X className="h-3.5 w-3.5" /></> : <>Read · {j.time} <ArrowUpRight className="h-3.5 w-3.5" /></>}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="content"
                        initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: 16 }} exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden" data-testid={`journal-content-${i}`}>
                        <div className="rounded-[20px] border border-[#c9a96e]/25 bg-[#3a2618] p-5">
                          <p className="arc-sans text-sm leading-7 text-[#f3ead9]/85">{j.excerpt}</p>
                          <button className="arc-sans mt-5 inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#2b1e15] transition hover:bg-[#f3ead9]">
                            Read full article <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="rounded-[32px] bg-[#5b6b3a] p-10 text-[#f3ead9]">
            <div className="flex gap-1 text-[#c9a96e]">{[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
            <p className="arc-sans mt-4 text-xs uppercase tracking-[0.3em] text-[#f3ead9]/80">Customer Love</p>
            <h2 className="arc-serif mt-4 text-4xl leading-tight">Warm reviews from <span className="italic">slow drinkers.</span></h2>
            <p className="arc-sans mt-5 text-sm leading-7 text-[#f3ead9]/80">A neighbourhood roaster built for unhurried mornings, kind baristas and beans you can taste the farm in.</p>
          </motion.div>
          {[
            { quote: 'The Yirgacheffe smells like flowers and tastes like a bright Sunday — I will not be drinking anything else.', author: 'Nora W.' },
            { quote: 'Quiet, gorgeous, and the staff actually know the farmers. A rare and lovely thing.', author: 'Simone L.' },
          ].map((t, i) => (
            <motion.div key={t.author} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }} whileHover={{ y: -6 }}
              className="rounded-[32px] border border-[#2b1e15]/10 bg-white p-10 transition">
              <div className="flex gap-1 text-[#5b6b3a]">{[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
              <p className="arc-serif mt-4 text-2xl leading-snug">&ldquo;{t.quote}&rdquo;</p>
              <p className="arc-sans mt-6 text-xs uppercase tracking-[0.25em] text-[#5b6b3a]">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ + VISIT */}
      <section id="visit" className="bg-[#ebe0c8] py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-14 lg:grid-cols-2">
          <div>
            <p className="arc-sans text-xs uppercase tracking-[0.35em] text-[#5b6b3a]">(05) Questions</p>
            <h2 className="arc-serif mt-5 text-[clamp(2rem,4.5vw,3.75rem)] font-normal leading-[1.05]">
              Things people <span className="italic text-[#5b6b3a]">often ask.</span>
            </h2>
            <div className="mt-8 divide-y divide-[#2b1e15]/15 border-y border-[#2b1e15]/15">
              {FAQ.map((f, i) => (
                <button key={i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full py-6 text-left" data-testid={`faq-btn-${i}`}>
                  <div className="flex items-center justify-between gap-6">
                    <span className="arc-serif text-xl sm:text-2xl">{f.q}</span>
                    {openFaq === i ? <Minus className="h-5 w-5 text-[#5b6b3a]" /> : <Plus className="h-5 w-5 text-[#5b6b3a]" />}
                  </div>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.p initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: 16 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} transition={{ duration: 0.35 }}
                        className="arc-sans overflow-hidden text-sm leading-7 text-[#2b1e15]/75">
                        {f.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="rounded-[32px] bg-[#2b1e15] p-10 text-[#f3ead9]">
            <p className="arc-sans text-xs uppercase tracking-[0.35em] text-[#c9a96e]">Visit</p>
            <h3 className="arc-serif mt-4 text-4xl leading-tight">Come sit with us.</h3>
            <div className="arc-sans mt-8 space-y-5 text-sm leading-7 text-[#f3ead9]/85">
              <div><p className="text-xs uppercase tracking-[0.3em] text-[#c9a96e]">Address</p><p className="mt-1">14 Olive Lane, Brera<br />Milan, IT 20121</p></div>
              <div><p className="text-xs uppercase tracking-[0.3em] text-[#c9a96e]">Hours</p><p className="mt-1">Mon–Fri · 7am – 6pm<br />Sat–Sun · 8am – 4pm</p></div>
              <div><p className="text-xs uppercase tracking-[0.3em] text-[#c9a96e]">Contact</p><p className="mt-1">hello@arcadia.coffee<br />+39 02 1234 5678</p></div>
            </div>
            <button onClick={onApply} className="arc-sans mt-10 inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#2b1e15] transition hover:scale-105 hover:bg-[#f3ead9]" data-testid="get-directions-btn">
              Get Directions <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      <TemplatePreviewMeta template={template} />

      {/* FOOTER */}
      <footer className="border-t border-[#2b1e15]/10 bg-[#f3ead9] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h3 className="arc-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">
            {brandName}<span className="italic text-[#5b6b3a]">.</span>
          </h3>
          <div className="mt-10 grid gap-8 sm:grid-cols-4 arc-sans text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5b6b3a]">Explore</p>
              <ul className="mt-4 space-y-2">
                {NAV.map((n) => (<li key={n.id}><button onClick={() => scrollToId(n.id)} className="hover:text-[#5b6b3a]">{n.label}</button></li>))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5b6b3a]">Follow</p>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-[#5b6b3a]">Instagram</a></li>
                <li><a href="#" className="hover:text-[#5b6b3a]">Are.na</a></li>
                <li><a href="#" className="hover:text-[#5b6b3a]">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5b6b3a]">Legal</p>
              <ul className="mt-4 space-y-2">
                <li><button onClick={() => setOpenPolicy('privacy')} className="hover:text-[#5b6b3a]" data-testid="footer-privacy-btn">Privacy Policy</button></li>
                <li><button onClick={() => setOpenPolicy('shipping')} className="hover:text-[#5b6b3a]" data-testid="footer-shipping-btn">Shipping Policy</button></li>
                <li><button onClick={() => setOpenPolicy('terms')} className="hover:text-[#5b6b3a]" data-testid="footer-terms-btn">Terms &amp; Conditions</button></li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#5b6b3a]">Newsletter</p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
                <input type="email" placeholder="your@email.com" className="arc-sans flex-1 rounded-full border border-[#2b1e15]/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[#5b6b3a]" />
                <button type="submit" className="rounded-full bg-[#2b1e15] p-2.5 text-[#f3ead9] hover:bg-[#5b6b3a]">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#2b1e15]/10 pt-6 arc-sans text-xs text-[#2b1e15]/60 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {brandName} Coffee Roasters · Milan</p>
            <p>Roasted slowly · Shipped carbon-neutral</p>
          </div>
        </div>
      </footer>

      {/* POLICY MODAL */}
      <AnimatePresence>
        {openPolicy && (
          <motion.div
            key="policy-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2b1e15]/60 backdrop-blur-sm p-4"
            onClick={() => setOpenPolicy(null)}
            data-testid="policy-overlay"
          >
            <motion.div
              key="policy-panel"
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-[28px] bg-[#f3ead9] shadow-2xl"
              data-testid={`policy-${openPolicy}-panel`}
            >
              <div className="flex items-center justify-between border-b border-[#2b1e15]/10 px-8 py-6">
                <div>
                  <p className="arc-sans text-[10px] uppercase tracking-[0.35em] text-[#5b6b3a]">{POLICIES[openPolicy].updated}</p>
                  <h2 className="arc-serif mt-1 text-3xl">{POLICIES[openPolicy].title}</h2>
                </div>
                <button onClick={() => setOpenPolicy(null)} aria-label="Close" data-testid="policy-close-btn"
                  className="rounded-full border border-[#2b1e15]/20 bg-white/60 p-2.5 text-[#2b1e15] transition hover:rotate-90 hover:bg-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto px-8 py-6 arc-sans text-sm leading-7 text-[#2b1e15]/80">
                {POLICIES[openPolicy].sections.map((s, i) => (
                  <div key={i} className="mb-6 last:mb-0">
                    <h3 className="arc-serif text-xl text-[#2b1e15]">{s.h}</h3>
                    <p className="mt-2">{s.p}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArcadiaTemplate;