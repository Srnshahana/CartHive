import React, { useState, useMemo, useEffect, useRef } from 'react';
// import {
//   Heart, ShoppingBag, Search, Menu, X, ArrowRight, ArrowUpRight, ArrowLeft,
//   Star, Truck, ShieldCheck, RotateCcw, Instagram, Facebook, Twitter,
//   Filter, SlidersHorizontal, Clock, User, MapPin, Mail, Phone
// } from 'lucide-react';
import {
  Heart, ShoppingBag, Search, Menu, X, ArrowRight, ArrowUpRight, ArrowLeft,
  Star, Truck, ShieldCheck, RotateCcw,
  Plus, Minus, MapPin, Mail, Phone,
  Filter, SlidersHorizontal, Clock, User
} from 'lucide-react';

import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


import TemplatePreviewMeta from '../TemplatePreviewMeta';

/* ========== DATA ========== */
const CATEGORIES = [
  { slug: 'rings',     name: 'Rings',     tagline: 'Sculpted to the finger',  hero: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&w=1600&q=80' },
  { slug: 'necklaces', name: 'Necklaces', tagline: 'A line at the collarbone', hero: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&w=1600&q=80' },
  { slug: 'earrings',  name: 'Earrings',  tagline: 'A whisper near the ear',   hero: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&w=1600&q=80' },
  { slug: 'bracelets', name: 'Bracelets', tagline: 'A weight at the wrist',    hero: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&w=1600&q=80' },
];

const TAGS = ['Best Seller', 'New', 'Limited', 'Bridal', 'Everyday', 'Editor\u2019s'];
const MATERIALS = ['14k Gold', '18k Gold', 'Recycled Silver', '18k · Diamonds', 'Pearl · 14k', 'Onyx · 14k'];

const IMG = {
  rings:     ['photo-1605100804763-247f67b3557e','photo-1602173574767-37ac01994b2a','photo-1603561591411-07134e71a2a9','photo-1543294001-f7cd5d7fb516','photo-1574740303988-de5dd5b3eb37','photo-1596944946297-fe9efc1c2444','photo-1591209627365-fec6c44f6c1a','photo-1606293459339-aa5d34a7b0e1','photo-1612878010854-1250dfc5000a','photo-1602173574767-37ac01994b2a','photo-1573408301185-9146fe634ad0','photo-1583937443566-6fe1a1c6e400'],
  necklaces: ['photo-1599643478518-a784e5dc4c8f','photo-1611591437281-460bfbe1220a','photo-1573408301185-9146fe634ad0','photo-1631982690223-8aa4be0a2497','photo-1633934542430-0905ccb5f050','photo-1599459183200-59c7687a1c12','photo-1602173574767-37ac01994b2a','photo-1605100804763-247f67b3557e','photo-1606293459339-aa5d34a7b0e1','photo-1515562141207-7a88fb7ce338','photo-1620656798579-1984d9e87df7','photo-1581338834647-b0fb40704e21'],
  earrings:  ['photo-1535632066927-ab7c9ab60908','photo-1515562141207-7a88fb7ce338','photo-1630019852942-f89202989a59','photo-1620656798579-1984d9e87df7','photo-1633934542430-0905ccb5f050','photo-1581338834647-b0fb40704e21','photo-1588444837495-c6cfeb53f32d','photo-1605100804763-247f67b3557e','photo-1606293459339-aa5d34a7b0e1','photo-1599643478518-a784e5dc4c8f','photo-1573408301185-9146fe634ad0','photo-1611591437281-460bfbe1220a'],
  bracelets: ['photo-1611591437281-460bfbe1220a','photo-1583937443566-6fe1a1c6e400','photo-1599459183200-59c7687a1c12','photo-1606293459339-aa5d34a7b0e1','photo-1573408301185-9146fe634ad0','photo-1631982690223-8aa4be0a2497','photo-1620656798579-1984d9e87df7','photo-1535632066927-ab7c9ab60908','photo-1602173574767-37ac01994b2a','photo-1515562141207-7a88fb7ce338','photo-1605100804763-247f67b3557e','photo-1599643478518-a784e5dc4c8f'],
};
const NAMES = {
  rings:     ['Halo Solitaire','Twin Band','Ember Signet','Lune Stack','Pavé Eternity','Onyx Cabochon','Curve Band','Crescent Pearl','Atelier Dome','Mira Marquise','Solène Trinity','Petit Pinky'],
  necklaces: ['Linea Chain','Pearl Drop Pendant','Disc Locket','Box Chain','Herringbone','Tennis Necklace','Bar Pendant','Mini Initial','Sundial Coin','Rope Layer','Solitaire Drop','Lariat Long'],
  earrings:  ['Pearl Drop','Crescent Stud','Hoop Petite','Sculpt Hoop','Diamond Stud','Twist Hoop','Mini Huggie','Threader Long','Ear Climber','Pavé Cuff','Open Chandelier','Comma Drop'],
  bracelets: ['Marble Cuff','Link Chain','Tennis Bracelet','Bead Strand','Cuff Bangle','Pavé Tennis','Curb Chain','Pearl Strand','Bar ID','Charm Layer','Wide Bangle','Mini Anchor'],
};

const ALL_PRODUCTS = Object.entries(IMG).flatMap(([cat, imgs]) =>
  imgs.map((img, i) => ({
    id: `${cat[0]}${i+1}`,
    cat,
    name: NAMES[cat][i],
    price: 145 + ((i * 73) % 850),
    tag: TAGS[i % TAGS.length],
    material: MATERIALS[(i + (cat==='rings'?0:cat==='necklaces'?1:cat==='earrings'?2:3)) % MATERIALS.length],
    img: `https://images.unsplash.com/${img}?auto=format&w=900&q=80`,
  }))
);

const JOURNAL_POSTS = [
  { id: 'j1', title: 'A field guide to layering chains', excerpt: 'Three rules we follow at the studio for combining lengths, weights, and metals without overdoing it.', cat: 'Styling', date: 'Jan 18, 2026', read: '5 min', author: 'Iris Wen', cover: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&w=1600&q=80' },
  { id: 'j2', title: 'Inside the atelier: a day with our goldsmith', excerpt: 'From wax carving to final polish — how a single ring takes shape over fourteen quiet hours.', cat: 'Craft', date: 'Jan 11, 2026', read: '8 min', author: 'Léo Marchetti', cover: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&w=1600&q=80' },
  { id: 'j3', title: 'Why we only work in recycled gold', excerpt: 'A short note on sourcing, traceability, and the math behind responsible materials.', cat: 'Ethics', date: 'Dec 28, 2025', read: '4 min', author: 'Iris Wen', cover: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&w=1600&q=80' },
  { id: 'j4', title: 'The case for the everyday pearl', excerpt: 'Once reserved for occasion, the pearl is quietly becoming the most worn piece in our customers rotations.', cat: 'Editorial', date: 'Dec 14, 2025', read: '6 min', author: 'Naomi K.', cover: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&w=1600&q=80' },
  { id: 'j5', title: 'Caring for fine jewelry at home', excerpt: 'Simple rituals to keep gold and stones at their best.', cat: 'Care', date: 'Nov 30, 2025', read: '3 min', author: 'Atelier Team', cover: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&w=1600&q=80' },
  { id: 'j6', title: 'On heirlooms, and the pieces we pass on', excerpt: 'A meditation on objects that carry weight beyond their material.', cat: 'Editorial', date: 'Nov 19, 2025', read: '7 min', author: 'Iris Wen', cover: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&w=1600&q=80' },
];

const SERIF = { fontFamily: '"Fraunces", "Cormorant Garamond", "Playfair Display", Georgia, serif' };

/* ========== GLOBAL ANIMATIONS (CSS) ========== */
const GlobalStyles = () => (
  <style>{`
    @keyframes letterDrop {
      0%   { transform: translateY(-120vh) rotate(var(--rot, -20deg)) scale(0.6); opacity: 0; filter: blur(8px); }
      60%  { opacity: 1; filter: blur(0); }
      80%  { transform: translateY(12px) rotate(0deg) scale(1.04); }
      100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0) rotate(0deg); }
      50%     { transform: translateY(-8px) rotate(-1deg); }
    }
    @keyframes shine {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes revealImg {
      0%   { clip-path: inset(0 0 100% 0); }
      100% { clip-path: inset(0 0 0 0); }
    }
    @keyframes scrollX { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes pulse2 { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }

    .anim-letter { display: inline-block; animation: letterDrop 1.4s cubic-bezier(.2,.7,.2,1) both; }
    .anim-letter.idle { animation: float 4s ease-in-out infinite; animation-delay: 1.6s; }
    .anim-fadeUp { animation: fadeUp 0.9s cubic-bezier(.2,.7,.2,1) both; }
    .anim-reveal { animation: revealImg 1.2s cubic-bezier(.7,0,.3,1) both; }
    .anim-marquee { animation: scrollX 40s linear infinite; }
    .anim-marquee-fast { animation: scrollX 18s linear infinite; }
    .shine-text {
      background: linear-gradient(90deg, #44403c 0%, #fff 50%, #44403c 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text; background-clip: text;
      color: transparent;
      animation: shine 4s linear infinite;
    }
    .lift { transition: transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s; }
    .lift:hover { transform: translateY(-6px); box-shadow: 0 24px 60px -20px rgba(0,0,0,.25); }
    .tilt { transition: transform .5s cubic-bezier(.2,.7,.2,1); transform-style: preserve-3d; }
    .magnet { transition: transform .25s cubic-bezier(.2,.7,.2,1); }
    .magnet:hover { transform: scale(1.05); }
    .underline-grow { position: relative; }
    .underline-grow::after { content:''; position:absolute; left:0; bottom:-2px; height:1px; width:0; background:currentColor; transition: width .4s cubic-bezier(.2,.7,.2,1); }
    .underline-grow:hover::after { width:100%; }
    .img-zoom { transition: transform 1s cubic-bezier(.2,.7,.2,1); }
    .group:hover .img-zoom { transform: scale(1.08); }
  `}</style>
);

/* ========== HOOKS ========== */
const useReveal = () => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: shown ? 1 : 0, transform: shown ? 'translateY(0)' : 'translateY(40px)', transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}s` }}>
      {children}
    </div>
  );
};

/* ========== MAIN ========== */
const MonoTemplate = ({ template, onApply }) => {
  const [view, setView] = useState({ page: 'home' });
  const brand = template?.name || 'Mono';

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view]);

  useEffect(() => {
    const id = 'mono-serif-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const go = (page, params = {}) => setView({ page, ...params });

  return (
    <div className="w-full bg-[#f4efe7] text-stone-900" style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>
      <GlobalStyles />
      <TopBar />
      <Header brand={brand} go={go} onApply={onApply} />

      {view.page === 'home' && <HomePage template={template} brand={brand} go={go} onApply={onApply} />}
      {view.page === 'category' && <CategoryPage slug={view.slug} go={go} />}
      {view.page === 'journal' && <JournalPage go={go} />}
      {view.page === 'article' && <ArticlePage id={view.id} go={go} />}

      <TemplatePreviewMeta template={template} />
      <Footer brand={brand} go={go} />
    </div>
  );
};

/* ========== TOP BAR ========== */
const TopBar = () => (
  <div data-testid="top-bar" className="overflow-hidden border-b border-stone-300/60 bg-stone-900 py-2 text-[11px] uppercase tracking-[0.4em] text-stone-100">
    <div className="anim-marquee flex gap-12 whitespace-nowrap px-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="flex items-center gap-12">
          <span>Complimentary worldwide shipping</span><span>·</span>
          <span>Lifetime warranty</span><span>·</span>
          <span>Crafted in NYC</span><span>·</span>
        </span>
      ))}
    </div>
  </div>
);

/* ========== HEADER ========== */
const Header = ({ brand, go, onApply }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-stone-300/60 bg-[#f4efe7]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6">
        <button className="md:hidden" onClick={() => setOpen(!open)} data-testid="mobile-menu-toggle">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <button onClick={() => go('home')} className="text-2xl tracking-tight" style={SERIF} data-testid="brand-logo">
          {brand}<span className="text-stone-500">.</span>
        </button>
        <nav className="hidden items-center gap-10 md:flex" data-testid="primary-nav">
          <button onClick={() => go('home')} className="underline-grow text-sm text-stone-700 hover:text-stone-950" data-testid="nav-home">Home</button>
          <div className="group relative">
            <button className="underline-grow text-sm text-stone-700 hover:text-stone-950">Shop</button>
            <div className="invisible absolute left-1/2 mt-4 w-56 -translate-x-1/2 rounded-2xl border border-stone-200 bg-white p-3 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              {CATEGORIES.map(c => (
                <button key={c.slug} onClick={() => go('category', { slug: c.slug })} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-stone-700 hover:bg-stone-100" data-testid={`nav-cat-${c.slug}`}>
                  {c.name}<span className="text-xs text-stone-400">{ALL_PRODUCTS.filter(p=>p.cat===c.slug).length}</span>
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => go('journal')} className="underline-grow text-sm text-stone-700 hover:text-stone-950" data-testid="nav-journal">Journal</button>
          <button onClick={() => go('home')} className="underline-grow text-sm text-stone-700 hover:text-stone-950" data-testid="nav-contact">Contact</button>
        </nav>
        <div className="flex items-center gap-1">
          <button className="magnet rounded-full p-2 hover:bg-stone-200/60" data-testid="search-btn"><Search className="h-4 w-4" /></button>
          <button className="magnet rounded-full p-2 hover:bg-stone-200/60" data-testid="wishlist-btn"><Heart className="h-4 w-4" /></button>
          <button className="magnet relative rounded-full p-2 hover:bg-stone-200/60" data-testid="cart-btn">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[10px] text-white">2</span>
          </button>
          <button onClick={onApply} className="magnet ml-2 hidden rounded-full bg-stone-900 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white hover:bg-stone-700 sm:inline-block" data-testid="apply-template-btn">Apply</button>
        </div>
      </div>
      {open && (
        <div className="border-t border-stone-300/60 px-6 py-4 md:hidden" data-testid="mobile-nav">
          <div className="flex flex-col gap-3 text-sm">
            <button onClick={() => { go('home'); setOpen(false); }}>Home</button>
            {CATEGORIES.map(c => <button key={c.slug} onClick={() => { go('category', { slug: c.slug }); setOpen(false); }}>{c.name}</button>)}
            <button onClick={() => { go('journal'); setOpen(false); }}>Journal</button>
          </div>
        </div>
      )}
    </header>
  );
};

/* ========== FOOTER ========== */
const Footer = ({ brand, go }) => {
  const [legal, setLegal] = useState(null);
  return (
    <footer className="border-t border-stone-300/60 bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <Reveal>
          <h2 className="max-w-3xl text-5xl leading-[1.05] tracking-tight text-white md:text-7xl" style={SERIF}>
            Quietly worn.<br /><em className="text-stone-400">Forever kept.</em>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="text-2xl text-white" style={SERIF}>{brand}.</div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-stone-400">Handcrafted fine jewelry in recycled gold and ethically sourced stones. Small batches, made to last.</p>
            <div className="mt-6 flex gap-2">
              <a href="#" className="magnet rounded-full bg-white/5 p-2.5 hover:bg-white/10" data-testid="social-instagram"><FaInstagram className="h-4 w-4" /></a>
              <a href="#" className="magnet rounded-full bg-white/5 p-2.5 hover:bg-white/10" data-testid="social-facebook"><FaFacebookF className="h-4 w-4" /></a>
              <a href="#" className="magnet rounded-full bg-white/5 p-2.5 hover:bg-white/10" data-testid="social-twitter"><FaXTwitter className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Shop</p>
            <ul className="mt-4 space-y-2 text-sm">
              {CATEGORIES.map(c => <li key={c.slug}><button onClick={() => go('category', { slug: c.slug })} className="underline-grow hover:text-white">{c.name}</button></li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><button onClick={() => go('home')} className="underline-grow hover:text-white">About</button></li>
              <li><button onClick={() => go('journal')} className="underline-grow hover:text-white">Journal</button></li>
              <li><a href="#" className="underline-grow hover:text-white">Stockists</a></li>
              <li><a href="#" className="underline-grow hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Support</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="underline-grow hover:text-white">Shipping & Returns</a></li>
              <li><a href="#" className="underline-grow hover:text-white">Care Guide</a></li>
              <li><button onClick={() => setLegal('privacy')} className="underline-grow hover:text-white" data-testid="footer-privacy">Privacy Policy</button></li>
              <li><button onClick={() => setLegal('terms')} className="underline-grow hover:text-white" data-testid="footer-terms">Terms & Conditions</button></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand}. All rights reserved.</p>
          <p>Crafted with care · Made in NYC</p>
        </div>
      </div>

      {/* Giant brand name marquee at very bottom */}
      <div className="overflow-hidden border-t border-white/10 py-8">
        <div className="anim-marquee-fast flex whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="px-8 text-[14vw] leading-none text-white/5" style={SERIF}>{brand} ✦ </span>
          ))}
        </div>
      </div>

      {legal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-6" onClick={() => setLegal(null)} data-testid="legal-modal">
          <div onClick={(e) => e.stopPropagation()} className="anim-fadeUp max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#f4efe7] p-10 text-stone-800">
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-3xl" style={SERIF}>{legal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}</h3>
              <button onClick={() => setLegal(null)} className="rounded-full p-2 hover:bg-stone-200"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 space-y-4 text-sm leading-7 text-stone-700">
              {legal === 'privacy' ? (
                <>
                  <p>We respect your privacy. This policy explains what data we collect, how we use it, and the choices you have.</p>
                  <p><strong>Data we collect:</strong> name, email, shipping address, payment details (via a PCI-compliant processor), and basic usage analytics.</p>
                  <p><strong>How we use it:</strong> to fulfill your order, send transactional emails, improve our website, and — only with consent — share occasional marketing updates.</p>
                  <p><strong>Your rights:</strong> request access, correction, or deletion of your data anytime by emailing privacy@{brand.toLowerCase().replace(/\s/g,'')}.com.</p>
                  <p>We never sell your data. Last updated: January 2026.</p>
                </>
              ) : (
                <>
                  <p>By placing an order with {brand}, you agree to the following terms.</p>
                  <p><strong>Orders:</strong> subject to availability and price confirmation.</p>
                  <p><strong>Pricing:</strong> in USD; may change without notice.</p>
                  <p><strong>Shipping:</strong> estimated delivery times are not guaranteed.</p>
                  <p><strong>Returns:</strong> unworn pieces within 30 days. Custom items are final sale.</p>
                  <p>Last updated: January 2026.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

/* ========== HERO with FLOATING LETTERS ========== */
const FloatingLetters = ({ text }) => {
  const letters = text.split('');
  // pre-randomized rotations for visual variety
  const rots = ['-22deg','18deg','-12deg','25deg','-30deg','14deg','-8deg','20deg','-18deg','10deg','-25deg','22deg'];
  return (
    <h1
      className="select-none text-[18vw] leading-[0.85] tracking-tight text-stone-900 md:text-[14vw]"
      style={SERIF}
      data-testid="floating-brand-letters"
      aria-label={text}
    >
      {letters.map((ch, i) => (
        <span
          key={i}
          className="anim-letter idle"
          style={{
            '--rot': rots[i % rots.length],
            animationDelay: `${i * 0.12}s, ${1.6 + i * 0.12}s`,
            display: 'inline-block',
            whiteSpace: 'pre',
          }}
        >
          {ch}
        </span>
      ))}
    </h1>
  );
};

/* ========== HOME ========== */
const HomePage = ({ template, brand, go, onApply }) => {
  const featured = ALL_PRODUCTS.slice(0, 6);

  return (
    <>
      {/* HERO — letters fall from top and form the brand name */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-12 text-center">
          <p className="anim-fadeUp text-xs uppercase tracking-[0.5em] text-stone-500" style={{ animationDelay: '1.6s' }}>
            {template?.hero_heading ? '' : 'Fine Jewelry · Volume 07'}
          </p>

          {/* The drop */}
          <div className="mt-8">
            <FloatingLetters text={brand} />
          </div>

          {/* Subtitle */}
          <p className="anim-fadeUp mx-auto mt-8 max-w-xl text-base leading-8 text-stone-600" style={{ animationDelay: `${0.12 * brand.length + 0.4}s` }}>
            {template?.hero_subtext || 'Heirlooms for the everyday — handcrafted in small batches from recycled gold and ethically sourced stones.'}
          </p>

          {/* CTAs */}
          <div className="anim-fadeUp mt-10 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: `${0.12 * brand.length + 0.6}s` }}>
            <button onClick={() => go('category', { slug: 'rings' })} className="magnet group inline-flex items-center gap-3 rounded-full bg-stone-900 px-7 py-4 text-xs uppercase tracking-[0.3em] text-white hover:bg-stone-700" data-testid="hero-shop-btn">
              Shop the collection <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <button onClick={onApply} className="text-xs uppercase tracking-[0.3em] text-stone-700 underline-offset-8 hover:underline">Use this template</button>
          </div>
        </div>

        {/* Floating image cards behind */}
        <div className="relative mx-auto max-w-[1400px] px-6 pb-20">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.1}>
                <button onClick={() => go('category', { slug: c.slug })} className="lift block w-full overflow-hidden rounded-[28px]" style={{ animation: `float ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>
                  <img src={c.hero} alt={c.name} className="img-zoom h-80 w-full object-cover" />
                  <div className="bg-white/90 px-4 py-3 text-left backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.3em] text-stone-500">0{i+1}</p>
                    <p className="mt-1 text-lg" style={SERIF}>{c.name}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE BAND */}
      <section className="overflow-hidden border-y border-stone-300/60 bg-stone-900 py-8 text-stone-100">
        <div className="anim-marquee flex whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10 px-10 text-5xl md:text-7xl" style={SERIF}>
              <span className="shine-text">Recycled Gold</span>
              <span className="text-stone-700">✦</span>
              <span className="shine-text">Ethically Sourced</span>
              <span className="text-stone-700">✦</span>
              <span className="shine-text">Handcrafted</span>
              <span className="text-stone-700">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* COLLECTIONS — Numbered list */}
      <section className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-32">
            <p className="text-xs uppercase tracking-[0.5em] text-stone-500">— 01 / Collections</p>
            <h2 className="mt-4 text-5xl leading-[1.05] tracking-tight md:text-6xl" style={SERIF}>
              Four shapes.<br /><em className="text-stone-500">One language.</em>
            </h2>
          </Reveal>
          <div className="divide-y divide-stone-300/60 border-y border-stone-300/60">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <button onClick={() => go('category', { slug: c.slug })} className="group grid w-full grid-cols-[40px_1fr_auto] items-center gap-6 py-8 text-left transition hover:bg-stone-200/40" data-testid={`collection-${c.slug}`}>
                  <span className="text-xs text-stone-500">0{i + 1}</span>
                  <div>
                    <h3 className="text-4xl tracking-tight transition group-hover:translate-x-2 md:text-5xl" style={SERIF}>{c.name}</h3>
                    <p className="mt-1 text-sm text-stone-500">{c.tagline} · {ALL_PRODUCTS.filter(p=>p.cat===c.slug).length} pieces</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden h-20 w-20 overflow-hidden rounded-2xl sm:block">
                      <img src={c.hero} alt={c.name} className="img-zoom h-full w-full object-cover" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEST LOVED */}
      <section className="bg-stone-100/60 py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-stone-500">— 02 / Selected pieces</p>
                <h2 className="mt-4 text-5xl tracking-tight md:text-6xl" style={SERIF}>Best loved.</h2>
              </div>
              <button onClick={() => go('category', { slug: 'rings' })} className="magnet inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] hover:underline">View all <ArrowRight className="h-4 w-4" /></button>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => <Reveal key={p.id} delay={(i % 3) * 0.1}><ProductCard p={p} index={i + 1} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-[40px]">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&w=1400&q=80" alt="Atelier" className="anim-reveal h-[640px] w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xs uppercase tracking-[0.5em] text-stone-500">— 03 / Our craft</p>
            <h2 className="mt-4 text-5xl leading-tight tracking-tight md:text-6xl" style={SERIF}>
              A studio of <em className="text-stone-500">six hands</em>, working slowly.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-600">
              Each piece is cast, finished, and inspected by hand at our studio in lower Manhattan. We design in small editions, source responsibly, and resist the urge to make more than feels right.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-stone-300/60 pt-8">
              {[{k:'12+',v:'Years of craft'},{k:'100%',v:'Recycled gold'},{k:'40+',v:'Countries shipped'}].map(s => (
                <div key={s.v}>
                  <p className="text-4xl tracking-tight" style={SERIF}>{s.k}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-500">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-stone-900 py-24 text-stone-100">
        <div className="mx-auto max-w-[1400px] px-6">
          <Reveal><p className="text-xs uppercase tracking-[0.5em] text-white/50">— 04 / Kind words</p></Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            {[
              { name: 'Amelia R.', city: 'London', quote: 'Quietly luxurious — the kind of jewelry you never take off.' },
              { name: 'Sofia M.', city: 'Milan', quote: 'Beautiful craftsmanship. Packaging feels like a gift to yourself.' },
              { name: 'Naomi K.', city: 'Tokyo', quote: 'Minimal, elegant, and made to last. My everyday set.' },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <div data-testid={`testimonial-${t.name}`}>
                  <div className="flex gap-1 text-stone-200">{Array.from({length:5}).map((_,j) => <Star key={j} className="h-4 w-4 fill-current" />)}</div>
                  <p className="mt-8 text-2xl leading-snug" style={SERIF}>"{t.quote}"</p>
                  <div className="mt-8 border-t border-white/10 pt-4 text-sm">
                    <p>{t.name}</p>
                    <p className="text-white/50">{t.city}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-stone-300/60 bg-[#f4efe7]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-6 py-10 text-sm md:grid-cols-4">
          {[{icon:Truck,l:'Free worldwide shipping'},{icon:ShieldCheck,l:'Lifetime warranty'},{icon:RotateCcw,l:'30-day returns'},{icon:Star,l:'4.9 / 5 rating'}].map(({icon:Icon,l},i) => (
            <Reveal key={l} delay={i * 0.08}><div className="flex items-center gap-3 text-stone-700"><Icon className="h-5 w-5" />{l}</div></Reveal>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="mx-auto max-w-[1400px] px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-stone-500">— 05 / Follow along</p>
              <h2 className="mt-4 text-5xl tracking-tight md:text-6xl" style={SERIF}>@{brand.toLowerCase().replace(/\s/g,'')}</h2>
            </div>
            <a href="#" className="magnet inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] hover:underline"><FaInstagram className="h-4 w-4" /> See more</a>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6">
          {['photo-1605100804763-247f67b3557e','photo-1599643478518-a784e5dc4c8f','photo-1535632066927-ab7c9ab60908','photo-1611591437281-460bfbe1220a','photo-1515562141207-7a88fb7ce338','photo-1602173574767-37ac01994b2a'].map((p,i) => (
            <Reveal key={i} delay={i * 0.06}>
              <a href="#" className="group relative block aspect-square overflow-hidden rounded-2xl">
                <img src={`https://images.unsplash.com/${p}?auto=format&w=600&q=80`} alt={`Instagram ${i+1}`} className="img-zoom h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-stone-900/0 opacity-0 transition group-hover:bg-stone-900/40 group-hover:opacity-100"><FaInstagram className="h-5 w-5 text-white" /></div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-stone-100/60 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.5em] text-stone-500">— 06 / Stay close</p>
            <h2 className="mt-4 text-5xl tracking-tight md:text-7xl" style={SERIF}>Join the list.</h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-stone-600">Early access to new collections, private events, and 10% off your first order.</p>
            <form onSubmit={(e)=>e.preventDefault()} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row" data-testid="newsletter-form">
              <input type="email" placeholder="Your email" className="flex-1 rounded-full border border-stone-300 bg-white px-5 py-3.5 text-sm focus:border-stone-900 focus:outline-none" data-testid="newsletter-email" />
              <button type="submit" className="magnet rounded-full bg-stone-900 px-7 py-3.5 text-xs uppercase tracking-[0.3em] text-white hover:bg-stone-700" data-testid="newsletter-submit">Subscribe</button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.5em] text-stone-500">— 07 / Get in touch</p>
            <h2 className="mt-4 text-5xl tracking-tight md:text-6xl" style={SERIF}>Visit. Write. Call.</h2>
            <div className="mt-10 space-y-4 text-sm text-stone-700">
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4" /> 24 Mercer Street, Studio 3, NYC</p>
              <p className="flex items-center gap-3"><Mail className="h-4 w-4" /> hello@{brand.toLowerCase().replace(/\s/g,'')}.com</p>
              <p className="flex items-center gap-3"><Phone className="h-4 w-4" /> +1 (212) 555-0119</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <form onSubmit={(e)=>e.preventDefault()} className="space-y-4 rounded-[28px] border border-stone-300/60 bg-white p-8" data-testid="contact-form">
              <div className="grid gap-4 sm:grid-cols-2">
                <input type="text" placeholder="Name" className="rounded-full border border-stone-300 px-5 py-3 text-sm focus:border-stone-900 focus:outline-none" data-testid="contact-name" />
                <input type="email" placeholder="Email" className="rounded-full border border-stone-300 px-5 py-3 text-sm focus:border-stone-900 focus:outline-none" data-testid="contact-email" />
              </div>
              <input type="text" placeholder="Subject" className="w-full rounded-full border border-stone-300 px-5 py-3 text-sm focus:border-stone-900 focus:outline-none" data-testid="contact-subject" />
              <textarea placeholder="Message" rows={5} className="w-full rounded-3xl border border-stone-300 px-5 py-3 text-sm focus:border-stone-900 focus:outline-none" data-testid="contact-message" />
              <button type="submit" className="magnet w-full rounded-full bg-stone-900 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white hover:bg-stone-700" data-testid="contact-submit">Send message</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
};

/* ========== PRODUCT CARD ========== */
const ProductCard = ({ p, index }) => (
  <div className="group" data-testid={`product-card-${p.id}`}>
    <div className="lift relative overflow-hidden rounded-[28px] bg-stone-200">
      <img src={p.img} alt={p.name} className="img-zoom h-[420px] w-full object-cover" />
      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-stone-900">{p.tag}</span>
      <button className="absolute right-4 top-4 rounded-full bg-white/95 p-2.5 transition hover:bg-stone-900 hover:text-white" data-testid={`wishlist-${p.id}`}><Heart className="h-4 w-4" /></button>
      <button className="absolute inset-x-4 bottom-4 translate-y-12 rounded-full bg-stone-900 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100" data-testid={`add-cart-${p.id}`}>Add to bag</button>
    </div>
    <div className="mt-5 flex items-start justify-between gap-4">
      <div>
        {index && <p className="text-[11px] uppercase tracking-[0.3em] text-stone-500">— {String(index).padStart(2,'0')}</p>}
        <h3 className="mt-1 text-2xl tracking-tight" style={SERIF}>{p.name}</h3>
        <p className="mt-1 text-sm text-stone-500">{p.material}</p>
      </div>
      <span className="text-lg tracking-tight" style={SERIF}>${p.price}</span>
    </div>
  </div>
);

/* ========== CATEGORY PAGE ========== */
const CategoryPage = ({ slug, go }) => {
  const cat = CATEGORIES.find(c => c.slug === slug) || CATEGORIES[0];
  const PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('featured');
  const [tag, setTag] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => { setPage(1); }, [slug, sort, tag]);

  const all = useMemo(() => ALL_PRODUCTS.filter(p => p.cat === slug), [slug]);
  const tags = ['All', ...Array.from(new Set(all.map(p => p.tag)))];

  const filtered = useMemo(() => {
    let list = tag === 'All' ? all : all.filter(p => p.tag === tag);
    if (sort === 'low') list = [...list].sort((a,b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a,b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [all, tag, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const heroVariant = CATEGORIES.findIndex(c => c.slug === slug);

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-10">
        <button onClick={() => go('home')} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-500 hover:text-stone-900" data-testid="back-home">
          <ArrowLeft className="h-4 w-4" /> Home / <span className="text-stone-900">{cat.name}</span>
        </button>
      </div>

      {/* Category-specific hero — floating letters style for category name */}
      {heroVariant === 0 && (
        <section className="relative mt-8 overflow-hidden">
          <img src={cat.hero} alt={cat.name} className="anim-reveal h-[70vh] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-6 pb-16 text-white">
            <p className="anim-fadeUp text-xs uppercase tracking-[0.5em] text-white/70">Collection · 01</p>
            <FloatingLetters text={cat.name} />
            <p className="anim-fadeUp mt-4 max-w-md text-sm leading-7 text-white/80" style={{ animationDelay: `${0.12 * cat.name.length + 0.4}s` }}>{cat.tagline}. {all.length} pieces in hand-cast 14k and 18k recycled gold.</p>
          </div>
        </section>
      )}
      {heroVariant === 1 && (
        <section className="mx-auto mt-8 max-w-[1400px] px-6">
          <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr]">
            <Reveal><div className="overflow-hidden rounded-[40px]"><img src={cat.hero} alt={cat.name} className="anim-reveal h-[600px] w-full object-cover" /></div></Reveal>
            <div className="flex flex-col justify-end">
              <p className="anim-fadeUp text-xs uppercase tracking-[0.5em] text-stone-500">Collection · 02</p>
              <FloatingLetters text={cat.name} />
              <p className="anim-fadeUp mt-6 max-w-md text-base leading-8 text-stone-600" style={{ animationDelay: `${0.12 * cat.name.length + 0.4}s` }}>{cat.tagline}. Designed to rest exactly where it should.</p>
            </div>
          </div>
        </section>
      )}
      {heroVariant === 2 && (
        <section className="mx-auto mt-16 max-w-[1400px] px-6 text-center">
          <p className="anim-fadeUp text-xs uppercase tracking-[0.5em] text-stone-500">Collection · 03</p>
          <FloatingLetters text={cat.name} />
          <p className="anim-fadeUp mx-auto mt-6 max-w-xl text-base leading-8 text-stone-600" style={{ animationDelay: `${0.12 * cat.name.length + 0.4}s` }}>{cat.tagline}. From everyday studs to sculptural drops.</p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {all.slice(0,4).map((p,i) => <Reveal key={p.id} delay={i*0.1}><div className="overflow-hidden rounded-[24px]"><img src={p.img} alt={p.name} className="img-zoom h-72 w-full object-cover" /></div></Reveal>)}
          </div>
        </section>
      )}
      {heroVariant === 3 && (
        <section className="mt-8">
          <div className="mx-auto max-w-[1400px] px-6">
            <p className="anim-fadeUp text-xs uppercase tracking-[0.5em] text-stone-500">Collection · 04</p>
            <FloatingLetters text={cat.name} />
            <p className="anim-fadeUp mt-6 max-w-md text-base leading-8 text-stone-600" style={{ animationDelay: `${0.12 * cat.name.length + 0.4}s` }}>{cat.tagline}. Cuffs, chains, and bangles for layering.</p>
          </div>
          <div className="mt-12 flex gap-4 overflow-x-auto px-6 pb-4">
            {all.slice(0,6).map((p,i) => <Reveal key={p.id} delay={i*0.08}><div className="min-w-[280px] overflow-hidden rounded-[24px]"><img src={p.img} alt={p.name} className="img-zoom h-80 w-full object-cover" /></div></Reveal>)}
          </div>
        </section>
      )}

      {/* TOOLBAR */}
      <section className="mx-auto mt-20 max-w-[1400px] px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-stone-300/60 py-5">
          <div className="flex flex-wrap items-center gap-2" data-testid="category-filters">
            <span className="mr-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-500"><Filter className="h-3.5 w-3.5" /> Filter</span>
            {tags.map(t => (
              <button key={t} onClick={() => setTag(t)} className={`magnet rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] ${tag===t ? 'bg-stone-900 text-white' : 'bg-stone-200/60 text-stone-700 hover:bg-stone-300'}`} data-testid={`filter-${t}`}>{t}</button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-500">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Sort
              <select value={sort} onChange={(e)=>setSort(e.target.value)} className="rounded-full bg-transparent text-stone-900 focus:outline-none" data-testid="sort-select">
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
            <div className="hidden gap-1 sm:flex">
              <button onClick={()=>setViewMode('grid')} className={`rounded-full px-3 py-1.5 text-xs ${viewMode==='grid'?'bg-stone-900 text-white':'text-stone-500'}`} data-testid="view-grid">Grid</button>
              <button onClick={()=>setViewMode('list')} className={`rounded-full px-3 py-1.5 text-xs ${viewMode==='list'?'bg-stone-900 text-white':'text-stone-500'}`} data-testid="view-list">List</button>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-stone-500">Showing {pageItems.length} of {filtered.length}</p>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-[1400px] px-6 py-12">
        {viewMode === 'grid' ? (
          <div key={`${slug}-${page}-${tag}-${sort}`} className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3" data-testid="products-grid">
            {pageItems.map((p, i) => <Reveal key={p.id} delay={(i % 3) * 0.08}><ProductCard p={p} index={(page-1)*PER_PAGE + i + 1} /></Reveal>)}
          </div>
        ) : (
          <div className="divide-y divide-stone-300/60 border-y border-stone-300/60" data-testid="products-list">
            {pageItems.map((p, i) => (
              <Reveal key={p.id} delay={i*0.05}>
                <div className="grid grid-cols-[60px_120px_1fr_auto] items-center gap-6 py-6" data-testid={`product-row-${p.id}`}>
                  <span className="text-xs text-stone-500">{String((page-1)*PER_PAGE+i+1).padStart(2,'0')}</span>
                  <div className="h-24 w-24 overflow-hidden rounded-2xl"><img src={p.img} alt={p.name} className="h-full w-full object-cover" /></div>
                  <div>
                    <h3 className="text-2xl tracking-tight" style={SERIF}>{p.name}</h3>
                    <p className="text-sm text-stone-500">{p.material} · {p.tag}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-lg" style={SERIF}>${p.price}</span>
                    <button className="magnet rounded-full bg-stone-900 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white hover:bg-stone-700">Add</button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-24 text-center text-sm text-stone-500" data-testid="empty-state">No pieces match this filter.</div>
        )}
      </section>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <section className="mx-auto max-w-[1400px] px-6 pb-24">
          <div className="flex items-center justify-center gap-2 border-t border-stone-300/60 pt-10" data-testid="pagination">
            <button disabled={page===1} onClick={()=>setPage(page-1)} className="rounded-full border border-stone-300 px-5 py-2 text-xs uppercase tracking-[0.3em] disabled:opacity-30 hover:bg-stone-200/60" data-testid="page-prev">Prev</button>
            {Array.from({length: totalPages}).map((_,i) => (
              <button key={i} onClick={()=>setPage(i+1)} className={`magnet h-10 w-10 rounded-full text-sm ${page===i+1?'bg-stone-900 text-white':'border border-stone-300 hover:bg-stone-200/60'}`} data-testid={`page-${i+1}`}>{i+1}</button>
            ))}
            <button disabled={page===totalPages} onClick={()=>setPage(page+1)} className="rounded-full border border-stone-300 px-5 py-2 text-xs uppercase tracking-[0.3em] disabled:opacity-30 hover:bg-stone-200/60" data-testid="page-next">Next</button>
          </div>
        </section>
      )}

      {/* CROSS-SELL */}
      <section className="bg-stone-100/60 py-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <Reveal><p className="text-xs uppercase tracking-[0.5em] text-stone-500">Also explore</p></Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {CATEGORIES.filter(c => c.slug !== slug).map((c,i) => (
              <Reveal key={c.slug} delay={i*0.1}>
                <button onClick={() => go('category', { slug: c.slug })} className="lift group relative block w-full overflow-hidden rounded-[24px]" data-testid={`crosssell-${c.slug}`}>
                  <img src={c.hero} alt={c.name} className="img-zoom h-72 w-full object-cover" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-stone-900/70 to-transparent p-6 text-left">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">Shop</p>
                      <h3 className="mt-1 text-3xl text-white" style={SERIF}>{c.name}</h3>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ========== JOURNAL ========== */
const JournalPage = ({ go }) => {
  const [featured, ...rest] = JOURNAL_POSTS;
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-16 pb-12">
        <button onClick={() => go('home')} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-500 hover:text-stone-900" data-testid="journal-back-home">
          <ArrowLeft className="h-4 w-4" /> Home / <span className="text-stone-900">Journal</span>
        </button>
        <div className="mt-12 grid items-end gap-8 lg:grid-cols-2">
          <FloatingLetters text="Journal." />
          <Reveal delay={0.3}><p className="text-base leading-8 text-stone-600">Notes from the atelier — on craft, materials, styling, and the slow making of fine jewelry. Updated weekly.</p></Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-20">
        <Reveal>
          <button onClick={() => go('article', { id: featured.id })} className="group block w-full text-left" data-testid={`journal-featured-${featured.id}`}>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="overflow-hidden rounded-[40px]">
                <img src={featured.cover} alt={featured.title} className="img-zoom h-[560px] w-full object-cover" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-stone-500">Featured · {featured.cat}</p>
                <h2 className="mt-4 text-5xl leading-[1.05] tracking-tight md:text-6xl" style={SERIF}>{featured.title}</h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-stone-600">{featured.excerpt}</p>
                <div className="mt-8 flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-stone-500">
                  <span className="inline-flex items-center gap-2"><User className="h-3.5 w-3.5" /> {featured.author}</span>
                  <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {featured.read}</span>
                  <span>{featured.date}</span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] underline-offset-8 group-hover:underline">Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
            </div>
          </button>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-wrap gap-2 border-y border-stone-300/60 py-5" data-testid="journal-tags">
          {['All', 'Craft', 'Styling', 'Ethics', 'Editorial', 'Care'].map((t, i) => (
            <button key={t} className={`magnet rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] ${i===0?'bg-stone-900 text-white':'bg-stone-200/60 text-stone-700 hover:bg-stone-300'}`}>{t}</button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={(i % 3) * 0.1}>
              <button onClick={() => go('article', { id: post.id })} className="group text-left" data-testid={`journal-card-${post.id}`}>
                <div className="overflow-hidden rounded-[28px]"><img src={post.cover} alt={post.title} className="img-zoom h-[360px] w-full object-cover" /></div>
                <div className="mt-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-stone-500">— {String(i+2).padStart(2,'0')} · {post.cat}</p>
                  <h3 className="mt-2 text-3xl leading-tight tracking-tight transition group-hover:translate-x-1" style={SERIF}>{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-stone-500">
                    <span>{post.date}</span><span>·</span><span>{post.read}</span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24">
        <div className="flex items-center justify-center gap-2 border-t border-stone-300/60 pt-10" data-testid="journal-pagination">
          <button className="rounded-full border border-stone-300 px-5 py-2 text-xs uppercase tracking-[0.3em] opacity-30">Prev</button>
          {[1,2,3].map(n => <button key={n} className={`magnet h-10 w-10 rounded-full text-sm ${n===1?'bg-stone-900 text-white':'border border-stone-300 hover:bg-stone-200/60'}`}>{n}</button>)}
          <button className="rounded-full border border-stone-300 px-5 py-2 text-xs uppercase tracking-[0.3em] hover:bg-stone-200/60">Next</button>
        </div>
      </section>

      <section className="bg-stone-100/60 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.5em] text-stone-500">The Letter</p>
            <h2 className="mt-4 text-5xl tracking-tight md:text-7xl" style={SERIF}>Read, monthly.</h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-stone-600">A short note from the studio with new writing, behind-the-scenes, and quiet drops.</p>
            <form onSubmit={(e)=>e.preventDefault()} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
              <input type="email" placeholder="Your email" className="flex-1 rounded-full border border-stone-300 bg-white px-5 py-3.5 text-sm focus:border-stone-900 focus:outline-none" />
              <button type="submit" className="magnet rounded-full bg-stone-900 px-7 py-3.5 text-xs uppercase tracking-[0.3em] text-white hover:bg-stone-700">Subscribe</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
};

/* ========== ARTICLE ========== */
const ArticlePage = ({ id, go }) => {
  const post = JOURNAL_POSTS.find(p => p.id === id) || JOURNAL_POSTS[0];
  const related = JOURNAL_POSTS.filter(p => p.id !== post.id).slice(0,3);
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-16">
        <button onClick={() => go('journal')} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-500 hover:text-stone-900" data-testid="article-back">
          <ArrowLeft className="h-4 w-4" /> Journal
        </button>
        <Reveal delay={0.1}>
          <p className="mt-10 text-xs uppercase tracking-[0.5em] text-stone-500">{post.cat}</p>
          <h1 className="mt-4 text-5xl leading-[1.05] tracking-tight md:text-6xl" style={SERIF}>{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.3em] text-stone-500">
            <span className="inline-flex items-center gap-2"><User className="h-3.5 w-3.5" /> {post.author}</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {post.read}</span>
            <span>{post.date}</span>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-12 max-w-[1200px] px-6">
        <div className="overflow-hidden rounded-[40px]"><img src={post.cover} alt={post.title} className="anim-reveal h-[560px] w-full object-cover" /></div>
      </section>

      <article className="mx-auto max-w-2xl px-6 py-16">
        <Reveal>
          <p className="text-lg leading-9 text-stone-700" style={SERIF}>{post.excerpt}</p>
          <div className="mt-10 space-y-6 text-base leading-8 text-stone-700">
            <p>Every piece we make begins with a question: will this still feel right in ten years? It’s a quiet design constraint, and a useful one — it removes noise.</p>
            <h2 className="pt-8 text-3xl tracking-tight" style={SERIF}>The studio approach</h2>
            <p>We work in small editions, by hand, in our New York studio. Wax models are carved, cast in recycled gold, set with ethically sourced stones, and finished entirely in-house.</p>
            <p>Nothing leaves the bench without three pairs of eyes on it. It’s slower — and we like it that way.</p>
            <h2 className="pt-8 text-3xl tracking-tight" style={SERIF}>What we think about</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Weight, balance, and how a piece sits when you’re not thinking about it.</li>
              <li>Longevity — both of the material and of the design language.</li>
              <li>The packaging and the moment of opening.</li>
            </ul>
            <p>Thank you for reading.</p>
          </div>
        </Reveal>
      </article>

      <section className="bg-stone-100/60 py-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <Reveal><p className="text-xs uppercase tracking-[0.5em] text-stone-500">Keep reading</p></Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((r,i) => (
              <Reveal key={r.id} delay={i * 0.1}>
                <button onClick={() => go('article', { id: r.id })} className="group text-left" data-testid={`related-${r.id}`}>
                  <div className="overflow-hidden rounded-[24px]"><img src={r.cover} alt={r.title} className="img-zoom h-72 w-full object-cover" /></div>
                  <h3 className="mt-4 text-2xl tracking-tight" style={SERIF}>{r.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-stone-500">{r.date} · {r.read}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MonoTemplate;