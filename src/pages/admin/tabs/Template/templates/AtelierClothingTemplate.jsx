import React, { useState, useMemo } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  SlidersHorizontal,
  Mail,
  Phone,
  MapPin,
  // Facebook,
  // Twitter,
  // Linkedin,
} from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';


/* ----------------------------------------------------------------------------
   AtelierClothingTemplate
   Schema-driven editorial storefront. Renders ONLY fields from the
   `template` prop. Accepts `mode` ("desktop" | "mobile") so it renders
   correctly inside the narrow mobile preview frame in TemplatePreview.jsx
   (Tailwind sm:/lg: breakpoints are viewport-based, so we strip them when
    mode === "mobile").
---------------------------------------------------------------------------- */

// ─── helpers ──────────────────────────────────────────────────────────────
const cn = (...parts) => parts.filter(Boolean).join(' ');

// `mc(mobile, desktop)` => when isMobile, only the mobile classes are used.
const makeMc = (isMobile) => (mobile, desktop = '') => isMobile ? mobile : `${mobile} ${desktop}`;

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
    src={src || FALLBACK_IMG}
    alt={alt}
    loading="lazy"
    decoding="async"
    onError={(e) => {
      if (e.currentTarget.src !== FALLBACK_IMG) e.currentTarget.src = FALLBACK_IMG;
    }}
    className={className}
  />
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 8v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
  </svg>
);
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

const WhatsappIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

/* ---------- Fallback imagery (only used when template fields are empty) ---------- */
const FALLBACK = {
  hero: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80',
  banner: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=1400&q=80',
  cat1: 'https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&w=900&q=80',
  cat2: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
  cat3: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80',
  story1: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=900&q=80',
  story2: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=900&q=80',
  story3: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80',
  ig: [
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1485231183945-fffde7cc051e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=600&q=80',
  ],
};

const CATALOG = [
  { id: 'p1', name: 'Linen Overshirt',    tag: 'New Season', price: '$148', priceNumber: 148, category: 'Womenswear', type: 'Tops',     img: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=900&q=80',  colors: ['#efe7da', '#1f1d1a', '#a47148'], sizes: ['XS','S','M','L'] },
  { id: 'p2', name: 'Wide-Leg Trouser',   tag: 'Best Seller',price: '$182', priceNumber: 182, category: 'Womenswear', type: 'Trousers', img: 'https://images.unsplash.com/photo-1485231183945-fffde7cc051e?auto=format&fit=crop&w=900&q=80',  colors: ['#1f1d1a', '#7a6a4f', '#efe7da'], sizes: ['XS','S','M','L','XL'] },
  { id: 'p3', name: 'Selvedge Denim',     tag: 'Limited',    price: '$224', priceNumber: 224, category: 'Menswear',   type: 'Denim',    img: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=900&q=80',  colors: ['#2b3a55', '#1f1d1a'], sizes: ['28','30','32','34','36'] },
  { id: 'p4', name: 'Cashmere Knit',      tag: 'Restocked',  price: '$268', priceNumber: 268, category: 'Womenswear', type: 'Knitwear', img: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?auto=format&fit=crop&w=900&q=80',  colors: ['#cdbfa6', '#a47148', '#1f1d1a'], sizes: ['S','M','L'] },
  { id: 'p5', name: 'Cotton Poplin Shirt',tag: 'New',        price: '$118', priceNumber: 118, category: 'Menswear',   type: 'Tops',     img: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=900&q=80',  colors: ['#f5f0e7', '#2b3a55'], sizes: ['S','M','L','XL'] },
  { id: 'p6', name: 'Wool Crewneck',      tag: 'Atelier',    price: '$198', priceNumber: 198, category: 'Menswear',   type: 'Knitwear', img: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=900&q=80',  colors: ['#1f1d1a', '#cdbfa6'], sizes: ['S','M','L','XL'] },
  { id: 'p7', name: 'Pleated Skirt',      tag: 'New Season', price: '$162', priceNumber: 162, category: 'Womenswear', type: 'Trousers', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',  colors: ['#7a6a4f', '#1f1d1a'], sizes: ['XS','S','M','L'] },
  { id: 'p8', name: 'Tailored Blazer',    tag: 'Limited',    price: '$348', priceNumber: 348, category: 'Womenswear', type: 'Tops',     img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=900&q=80',  colors: ['#2b3a55', '#1f1d1a'], sizes: ['XS','S','M','L'] },
  { id: 'p9', name: 'Heritage Chino',     tag: 'Best Seller',price: '$148', priceNumber: 148, category: 'Menswear',   type: 'Trousers', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',  colors: ['#a47148', '#7a6a4f', '#1f1d1a'], sizes: ['28','30','32','34','36'] },
  { id: 'p10',name: 'Sun-Faded Tee',      tag: 'New',        price: '$78',  priceNumber: 78,  category: 'Menswear',   type: 'Tops',     img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80', colors: ['#efe7da', '#cdbfa6'], sizes: ['S','M','L','XL'] },
  { id: 'p11',name: 'Silk Slip Dress',    tag: 'Atelier',    price: '$298', priceNumber: 298, category: 'Womenswear', type: 'Tops',     img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80', colors: ['#cdbfa6', '#a47148'], sizes: ['XS','S','M','L'] },
  { id: 'p12',name: 'Raw Denim Jacket',   tag: 'New',        price: '$248', priceNumber: 248, category: 'Menswear',   type: 'Denim',    img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80', colors: ['#2b3a55', '#1f1d1a'], sizes: ['S','M','L','XL'] },
  { id: 'p13',name: 'Leather Tote',       tag: 'Best Seller',price: '$328', priceNumber: 328, category: 'Accessories',type: 'Bags',     img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80', colors: ['#a47148', '#1f1d1a'], sizes: ['One Size'] },
  { id: 'p14',name: 'Suede Loafer',       tag: 'Restocked',  price: '$268', priceNumber: 268, category: 'Accessories',type: 'Shoes',    img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80', colors: ['#7a6a4f', '#1f1d1a'], sizes: ['38','39','40','41','42','43','44'] },
  { id: 'p15',name: 'Wool Felt Hat',      tag: 'New',        price: '$148', priceNumber: 148, category: 'Accessories',type: 'Hats',     img: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80', colors: ['#1f1d1a', '#cdbfa6'], sizes: ['S','M','L'] },
  { id: 'p16',name: 'Silk Scarf',         tag: 'Atelier',    price: '$98',  priceNumber: 98,  category: 'Accessories',type: 'Scarves',  img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80', colors: ['#a4452f', '#cdbfa6', '#1f1d1a'], sizes: ['One Size'] },
  { id: 'p17',name: 'Linen Jumpsuit',     tag: 'New Season', price: '$232', priceNumber: 232, category: 'Womenswear', type: 'Tops',     img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80', colors: ['#efe7da', '#7a6a4f'], sizes: ['XS','S','M','L'] },
  { id: 'p18',name: 'Cropped Cardigan',   tag: 'Limited',    price: '$188', priceNumber: 188, category: 'Womenswear', type: 'Knitwear', img: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=900&q=80', colors: ['#cdbfa6', '#a47148', '#1f1d1a'], sizes: ['XS','S','M','L'] },
];

const CATEGORIES = ['Womenswear', 'Menswear', 'Accessories'];
const FILTER_TYPES = ['All', 'Tops', 'Trousers', 'Denim', 'Knitwear'];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const AtelierClothingTemplate = ({ template = {}, onApply, mode = 'desktop' }) => {
  const isMobile = mode === 'mobile';
  const mc = makeMc(isMobile);

  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [cart, setCart] = useState([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [arrivalsFilter, setArrivalsFilter] = useState('All');

  const t = {
    logo_url: template.logo_url || '',
    brand: template.name || 'MAISON ÉCHO',
    hero_image: template.hero_image || FALLBACK.hero,
    hero_heading: template.hero_heading || 'Quiet clothes for loud lives.',
    hero_subtext:
      template.hero_subtext ||
      'Considered tailoring, natural fibres, and a palette borrowed from the Iberian coast.',
    banner_image: template.banner_image || FALLBACK.banner,
    banner_title: template.banner_title || 'The Winter Capsule',
    banner_subtitle: template.banner_subtitle || 'Twelve pieces. One palette. Coming soon.',
    ticker_text:
      template.ticker_text ||
      'Complimentary shipping over $150 ✦ Atelier-made in Lisbon ✦ Free returns within 30 days',
    our_story:
      template.our_story ||
      'A small atelier making quiet, considered clothing in Lisbon since 2018. Each piece is cut in batches of fewer than eighty, finished by hand, and made to outlast the season.',
    instagram_images:
      Array.isArray(template.instagram_images) && template.instagram_images.length > 0
        ? template.instagram_images
        : FALLBACK.ig,
    instagram_link: template.instagram_link || '',
    support_email: template.support_email || '',
    support_phone: template.support_phone || '',
    physical_address: template.physical_address || '',
    facebook_link: template.facebook_link || '',
    twitter_link: template.twitter_link || '',
    linkedin_link: template.linkedin_link || '',
    whatsapp_link: template.whatsapp_link || '',
    terms_and_conditions: template.terms_and_conditions || '',
    privacy_policy: template.privacy_policy || '',
    shipping_policy: template.shipping_policy || '',
    refund_policy: template.refund_policy || '',
  };

  const go = (next) => {
    setView(next);
    setMobileNavOpen(false);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goShop = (category = 'All', type = 'All') => {
    setSelectedCategory(category);
    setSelectedType(type);
    go('shop');
  };
  const goProduct = (product) => { setSelectedProduct(product); go('product'); };
  const goPolicy = (title, body) => { setSelectedPolicy({ title, body }); go('policy'); };

  const addToCart = (product, size = product.sizes?.[0] || 'One Size', qty = 1) => {
    setCart((prev) => {
      const key = `${product.id}-${size}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, product, size, qty }];
    });
  };
  const updateQty = (key, delta) =>
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  const removeItem = (key) => setCart((prev) => prev.filter((i) => i.key !== key));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.priceNumber * i.qty, 0);

  const arrivals = useMemo(() => {
    const base = CATALOG.slice(0, 8);
    if (arrivalsFilter === 'All') return base.slice(0, 4);
    return base.filter((p) => p.type === arrivalsFilter).slice(0, 4);
  }, [arrivalsFilter]);

  const shopProducts = useMemo(
    () => CATALOG.filter((p) => {
      const catOk = selectedCategory === 'All' || p.category === selectedCategory;
      const typeOk = selectedType === 'All' || p.type === selectedType;
      return catOk && typeOk;
    }),
    [selectedCategory, selectedType]
  );

  return (
    <div
      data-testid="clothing-template-root"
      data-mode={mode}
      className="w-full bg-[#f5f0e7] text-neutral-900"
      style={{ fontFamily: '"Outfit", "Helvetica Neue", Arial, sans-serif' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Outfit:wght@300;400;500;600&display=swap');
        .font-serif-display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .marquee-track { animation: atelier-marquee 32s linear infinite; }
        @keyframes atelier-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes atelier-float-a { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-14px) rotate(-2deg); } }
        @keyframes atelier-float-b { 0%,100% { transform: translateY(-6px) rotate(1.5deg); } 50% { transform: translateY(10px) rotate(1.5deg); } }
        @keyframes atelier-float-c { 0%,100% { transform: translateY(4px) rotate(-1deg); } 50% { transform: translateY(-10px) rotate(-1deg); } }
        @keyframes atelier-fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes atelier-pulse { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
        .atelier-float-a { animation: atelier-float-a 7s ease-in-out infinite; }
        .atelier-float-b { animation: atelier-float-b 9s ease-in-out infinite; }
        .atelier-float-c { animation: atelier-float-c 8s ease-in-out infinite; }
        .atelier-fade-up { animation: atelier-fade-up 0.9s ease-out both; }
        .atelier-pulse-dot { animation: atelier-pulse 2.6s ease-in-out infinite; }
      `}</style>

      {/* Ticker */}
      <div className={cn(
        'overflow-hidden border-b border-neutral-900/10 bg-neutral-900 uppercase text-[#f5f0e7]',
        isMobile ? 'text-[9px] tracking-[0.25em]' : 'text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em]'
      )}>
        <div className="marquee-track flex whitespace-nowrap py-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className={cn('shrink-0', isMobile ? 'px-4' : 'px-6')}>{t.ticker_text}</span>
          ))}
        </div>
      </div>

      <Header
        t={t} isMobile={isMobile} mc={mc}
        cartCount={cartCount}
        currentView={view}
        onLogo={() => go('home')}
        onShop={(cat) => goShop(cat)}
        onCart={() => go('cart')}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      {view === 'home' && (
        <HomeView
          t={t} isMobile={isMobile} mc={mc}
          arrivals={arrivals}
          arrivalsFilter={arrivalsFilter}
          setArrivalsFilter={setArrivalsFilter}
          goShop={goShop}
          goProduct={goProduct}
          addToCart={addToCart}
        />
      )}

      {view === 'shop' && (
        <ShopView
          isMobile={isMobile} mc={mc}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          products={shopProducts}
          goProduct={goProduct}
          addToCart={addToCart}
          goHome={() => go('home')}
        />
      )}

      {view === 'product' && selectedProduct && (
        <ProductView
          isMobile={isMobile} mc={mc}
          product={selectedProduct}
          addToCart={addToCart}
          goShop={() => goShop(selectedProduct.category)}
          goCart={() => go('cart')}
        />
      )}

      {view === 'cart' && (
        <CartView
          isMobile={isMobile} mc={mc}
          cart={cart} updateQty={updateQty} removeItem={removeItem} total={cartTotal}
          goShop={() => goShop('All')}
        />
      )}

      {view === 'policy' && selectedPolicy && (
        <PolicyView isMobile={isMobile} mc={mc} policy={selectedPolicy} goHome={() => go('home')} />
      )}

      <TemplatePreviewMeta
        template={{ ...template, name: t.brand, tags: template.tags || ['clothing', 'editorial', 'storefront'] }}
      />

      <Footer t={t} isMobile={isMobile} mc={mc} onShop={(c) => goShop(c)} onPolicy={goPolicy} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Header                                                              */
/* ------------------------------------------------------------------ */

const Header = ({ t, isMobile, mc, cartCount, currentView, onLogo, onShop, onCart, mobileNavOpen, setMobileNavOpen }) => {
  const hideDesktopNav = currentView === 'shop';
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900/10 bg-[#f5f0e7]/85 backdrop-blur-md">
      <div className={cn(
        'mx-auto grid max-w-7xl grid-cols-3 items-center',
        mc('px-3 py-3', 'sm:px-6 sm:py-5 lg:px-10')
      )}>
        {/* Desktop nav (hidden on mobile preview) */}
        {!hideDesktopNav && !isMobile ? (
          <nav className="hidden items-center gap-5 xl:gap-7 text-[11px] xl:text-[12px] uppercase tracking-[0.24em] xl:tracking-[0.28em] text-neutral-700 lg:flex">
            <button onClick={() => onShop('Womenswear')} className="transition hover:text-neutral-900" data-testid="nav-women">Women</button>
            <button onClick={() => onShop('Menswear')} className="transition hover:text-neutral-900" data-testid="nav-men">Men</button>
            <button onClick={() => onShop('Accessories')} className="transition hover:text-neutral-900" data-testid="nav-accessories">Accessories</button>
          </nav>
        ) : !hideDesktopNav ? (
          <span />
        ) : !isMobile ? (
          <button
            onClick={onLogo}
            className="hidden lg:inline-flex items-center gap-2 text-[11px] xl:text-[12px] uppercase tracking-[0.24em] xl:tracking-[0.28em] text-neutral-700 hover:text-neutral-900"
            data-testid="nav-back-home"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </button>
        ) : (
          <span />
        )}

        {/* Mobile menu trigger — always visible in mobile preview */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className={cn(
            'rounded-full p-2 text-neutral-700 transition hover:bg-neutral-900/5 justify-self-start',
            mc('', 'lg:hidden')
          )}
          data-testid="mobile-menu-btn"
          aria-label="Open menu"
        >
          <Menu className={cn(isMobile ? 'h-4 w-4' : 'h-5 w-5')} />
        </button>

        {/* Logo */}
        <button onClick={onLogo} className="flex items-center justify-center min-w-0" data-testid="brand-logo">
          {t.logo_url ? (
            <SafeImage
              src={t.logo_url}
              alt={t.brand}
              className={cn('w-auto object-contain', mc('h-6', 'sm:h-10 lg:h-12'))}
            />
          ) : (
            <span className={cn(
              'font-serif-display font-medium tracking-tight text-neutral-900 truncate',
              mc('text-sm', 'sm:text-2xl lg:text-3xl')
            )}>
              {t.brand}
            </span>
          )}
        </button>

        {/* Right icons */}
        <div className={cn('flex items-center justify-end text-neutral-700', isMobile ? 'gap-0' : 'gap-0.5 sm:gap-1')}>
          {!isMobile && (
            <>
              <button className="rounded-full p-2 sm:p-2.5 transition hover:bg-neutral-900/5" aria-label="Search" data-testid="search-btn">
                <Search className="h-4 w-4" />
              </button>
              <button className="hidden rounded-full p-2 sm:p-2.5 transition hover:bg-neutral-900/5 sm:inline-flex" aria-label="Account" data-testid="account-btn">
                <User className="h-4 w-4" />
              </button>
              <button className="hidden rounded-full p-2 sm:p-2.5 transition hover:bg-neutral-900/5 sm:inline-flex" aria-label="Wishlist" data-testid="wishlist-btn">
                <Heart className="h-4 w-4" />
              </button>
            </>
          )}
          {isMobile && (
            <button className="rounded-full p-2 transition hover:bg-neutral-900/5" aria-label="Search" data-testid="search-btn">
              <Search className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onCart}
            className={cn('relative rounded-full transition hover:bg-neutral-900/5', isMobile ? 'p-2' : 'p-2 sm:p-2.5')}
            aria-label="Bag"
            data-testid="cart-btn"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#a4452f] px-1 text-[9px] font-medium text-[#f5f0e7]"
                data-testid="cart-count"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-over nav */}
      {mobileNavOpen && (
        <div className={cn('fixed inset-0 z-50', mc('', 'lg:hidden'))} data-testid="mobile-nav">
          <div className="absolute inset-0 bg-neutral-900/40" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-sm bg-[#f5f0e7] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              {t.logo_url ? (
                <SafeImage src={t.logo_url} alt={t.brand} className="h-8 w-auto object-contain" />
              ) : (
                <p className="font-serif-display text-xl">{t.brand}</p>
              )}
              <button onClick={() => setMobileNavOpen(false)} className="rounded-full p-2 hover:bg-neutral-900/5" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-1">
              <button onClick={onLogo} className="font-serif-display flex items-center justify-between border-b border-neutral-900/10 py-4 text-xl">
                Home <ArrowUpRight className="h-5 w-5" />
              </button>
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => onShop(c)} className="font-serif-display flex items-center justify-between border-b border-neutral-900/10 py-4 text-xl">
                  {c} <ArrowUpRight className="h-5 w-5" />
                </button>
              ))}
              <button onClick={onCart} className="font-serif-display flex items-center justify-between border-b border-neutral-900/10 py-4 text-xl">
                Bag {cartCount > 0 && <span className="text-base">({cartCount})</span>}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

/* ------------------------------------------------------------------ */
/*  Home view                                                           */
/* ------------------------------------------------------------------ */

const HomeView = ({ t, isMobile, mc, arrivals, arrivalsFilter, setArrivalsFilter, goShop, goProduct, addToCart }) => (
  <>
    {/* HERO */}
    <section className="relative overflow-hidden">
      <div className={cn(
        'mx-auto grid max-w-7xl gap-8',
        mc('px-4 py-10', 'sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-24')
      )}>
        <div className={cn('flex flex-col justify-center', mc('', 'lg:col-span-6'))}>
          <h1 className={cn(
            'font-serif-display font-medium leading-[1.04] tracking-tight text-neutral-900',
            isMobile ? 'text-3xl' : 'text-[clamp(2.25rem,7vw,5.75rem)]'
          )}>
            {t.hero_heading}
          </h1>
          <p className={cn(
            'max-w-xl text-neutral-600 whitespace-pre-line',
            mc('mt-5 text-sm leading-7', 'sm:mt-7 sm:text-base sm:leading-8')
          )}>
            {t.hero_subtext}
          </p>
          <div className={cn(mc('mt-6', 'sm:mt-9'))}>
            <button
              onClick={() => goShop('All')}
              className={cn(
                'group inline-flex items-center gap-2 rounded-full bg-neutral-900 font-medium uppercase text-[#f5f0e7] transition hover:bg-neutral-800',
                mc('px-4 py-3 text-[10px] tracking-[0.2em]', 'sm:px-7 sm:py-4 sm:text-[12px] sm:tracking-[0.3em]')
              )}
              data-testid="hero-shop-btn"
            >
              Shop the collection
              <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </button>
          </div>
        </div>

        <div className={cn(mc('', 'lg:col-span-6'))}>
          <div className={cn(
            'aspect-[4/5] overflow-hidden bg-neutral-200',
            mc('rounded-[18px]', 'sm:rounded-[28px]')
          )}>
            <SafeImage src={t.hero_image} alt="Hero" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* CATEGORIES */}
    <section className={cn('mx-auto max-w-7xl', mc('px-4 py-12', 'sm:px-6 sm:py-20 lg:px-10 lg:py-28'))}>
      <div className={cn('flex justify-between gap-4', mc('flex-col', 'sm:flex-row sm:items-end sm:gap-6'))}>
        <h2 className={cn(
          'font-serif-display font-medium leading-tight tracking-tight text-neutral-900',
          mc('text-2xl', 'sm:text-4xl lg:text-5xl')
        )}>
          Shop by category
        </h2>
        <button
          onClick={() => goShop('All')}
          className={cn(
            'inline-flex items-center gap-2 self-start uppercase text-neutral-700 hover:text-neutral-900',
            mc('text-[10px] tracking-[0.22em]', 'sm:self-auto sm:text-[12px] sm:tracking-[0.3em]')
          )}
          data-testid="categories-view-all-btn"
        >
          View all <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className={cn('grid gap-4', mc('mt-6 grid-cols-1', 'sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3'))}>
        {[
          { label: 'Womenswear', img: FALLBACK.cat1 },
          { label: 'Menswear', img: FALLBACK.cat2 },
          { label: 'Accessories', img: FALLBACK.cat3 },
        ].map((c, i) => (
          <button
            key={c.label}
            onClick={() => goShop(c.label)}
            className={cn(
              'group relative block aspect-[3/4] overflow-hidden bg-neutral-200 text-left',
              mc('rounded-[16px]', 'sm:rounded-[24px]')
            )}
            data-testid={`category-card-${c.label.toLowerCase()}`}
          >
            <SafeImage src={c.img} alt={c.label} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/55 via-neutral-900/0 to-neutral-900/0" />
            <div className={cn('absolute inset-x-0 bottom-0 flex items-end justify-between text-[#f5f0e7]', mc('p-3', 'sm:p-5'))}>
              <div>
                <p className={cn('uppercase text-[#f5f0e7]/80', mc('text-[9px] tracking-[0.25em]', 'sm:text-[10px] sm:tracking-[0.35em]'))}>0{i + 1}</p>
                <p className={cn('font-serif-display mt-1.5', mc('text-xl', 'sm:text-3xl'))}>{c.label}</p>
              </div>
              <span className={cn(
                'rounded-full bg-[#f5f0e7] text-neutral-900 transition group-hover:bg-[#a4452f] group-hover:text-[#f5f0e7]',
                mc('p-2', 'sm:p-3')
              )}>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>

    {/* NEW ARRIVALS */}
    <section className={cn('bg-[#efe7da]', mc('py-12', 'sm:py-20 lg:py-28'))}>
      <div className={cn('mx-auto max-w-7xl', mc('px-4', 'sm:px-6 lg:px-10'))}>
        <div className={cn('flex gap-4', mc('flex-col', 'sm:gap-6 lg:flex-row lg:items-end lg:justify-between'))}>
          <h2 className={cn(
            'font-serif-display font-medium leading-tight tracking-tight text-neutral-900',
            mc('text-2xl', 'sm:text-4xl lg:text-5xl')
          )}>
            New arrivals
          </h2>
          <div className={cn(
            'flex gap-2 overflow-x-auto no-scrollbar uppercase',
            mc('-mx-4 px-4 text-[10px] tracking-[0.2em]', 'sm:mx-0 sm:px-0 sm:text-[11px] sm:tracking-[0.25em]')
          )}>
            {FILTER_TYPES.map((f) => (
              <button
                key={f}
                onClick={() => setArrivalsFilter(f)}
                className={cn(
                  'shrink-0 rounded-full border px-3 py-2 transition',
                  arrivalsFilter === f
                    ? 'border-neutral-900 bg-neutral-900 text-[#f5f0e7]'
                    : 'border-neutral-300 bg-transparent text-neutral-700 hover:border-neutral-900 hover:text-neutral-900'
                )}
                data-testid={`arrivals-filter-${f.toLowerCase()}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className={cn(
          'grid grid-cols-2',
          mc('mt-8 gap-x-3 gap-y-8', 'sm:mt-12 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4')
        )}>
          {arrivals.length === 0 && (
            <p className="col-span-full text-sm text-neutral-500">No pieces match this filter yet.</p>
          )}
          {arrivals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} isMobile={isMobile} mc={mc} onOpen={() => goProduct(p)} onQuickAdd={() => addToCart(p)} />
          ))}
        </div>

        <div className={cn('text-center', mc('mt-10', 'sm:mt-14'))}>
          <button
            onClick={() => goShop('All')}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-neutral-900 font-medium uppercase text-neutral-900 transition hover:bg-neutral-900 hover:text-[#f5f0e7]',
              mc('px-5 py-3 text-[10px] tracking-[0.2em]', 'sm:px-7 sm:py-4 sm:text-[12px] sm:tracking-[0.3em]')
            )}
            data-testid="view-all-pieces-btn"
          >
            View all pieces <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>

    {/* BANNER */}
    <section className="relative overflow-hidden">
      <div className={cn('relative w-full', mc('h-[55vh] min-h-[320px]', 'sm:h-[60vh] sm:min-h-[420px]'))}>
        <SafeImage src={t.banner_image} alt={t.banner_title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-neutral-900/40" />
        <div className={cn('absolute inset-0 flex items-center justify-center text-center', mc('px-4', 'sm:px-6'))}>
          <div className="max-w-3xl text-[#f5f0e7]">
            <h2 className={cn(
              'font-serif-display font-medium leading-[1.05] tracking-tight',
              mc('text-3xl', 'sm:text-5xl lg:text-6xl')
            )}>
              {t.banner_title}
            </h2>
            {t.banner_subtitle && (
              <p className={cn(
                'mx-auto text-[#f5f0e7]/85 whitespace-pre-line',
                mc('mt-3 max-w-xs text-xs leading-6', 'sm:mt-5 sm:max-w-xl sm:text-base sm:leading-7')
              )}>
                {t.banner_subtitle}
              </p>
            )}
            <button
              onClick={() => goShop('All')}
              className={cn(
                'inline-flex items-center gap-2 rounded-full bg-[#f5f0e7] uppercase text-neutral-900 transition hover:bg-[#a4452f] hover:text-[#f5f0e7]',
                mc('mt-5 px-4 py-3 text-[10px] tracking-[0.2em]', 'sm:mt-8 sm:px-7 sm:py-4 sm:text-[12px] sm:tracking-[0.3em]')
              )}
              data-testid="banner-cta-btn"
            >
              Explore <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* OUR STORY */}
    <section className={cn('relative overflow-hidden bg-neutral-900 text-[#f5f0e7]', mc('py-12', 'sm:py-20 lg:py-24'))}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="atelier-pulse-dot absolute left-[6%] top-[18%] h-2 w-2 rounded-full bg-[#a4452f]" />
        <span className="atelier-pulse-dot absolute right-[8%] top-[34%] h-1.5 w-1.5 rounded-full bg-[#f5f0e7]/40" style={{ animationDelay: '0.8s' }} />
        <span className="atelier-pulse-dot absolute left-[18%] bottom-[12%] h-1.5 w-1.5 rounded-full bg-[#f5f0e7]/30" style={{ animationDelay: '1.6s' }} />
        <span className="atelier-pulse-dot absolute right-[14%] bottom-[24%] h-2 w-2 rounded-full bg-[#a4452f]/70" style={{ animationDelay: '0.4s' }} />
      </div>

      <div className={cn('relative mx-auto max-w-7xl', mc('px-4', 'sm:px-6 lg:px-10'))}>
        <div className={cn('grid gap-10', mc('', 'lg:gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center'))}>
          <div className="atelier-fade-up">
            <p className={cn('uppercase text-[#f5f0e7]/60', mc('text-[10px] tracking-[0.3em]', 'sm:text-[11px] sm:tracking-[0.4em]'))}>Our story</p>
            <p className={cn(
              'font-serif-display font-medium leading-[1.25] tracking-tight whitespace-pre-line',
              mc('mt-4 text-xl', 'sm:mt-5 sm:text-3xl lg:text-[2.5rem]')
            )}>
              {t.our_story}
            </p>
          </div>

          {/* Animated triptych — simpler stack on mobile */}
          {isMobile ? (
            <div className="relative grid grid-cols-3 gap-2">
              {[t.instagram_images[0] || FALLBACK.story1, t.instagram_images[1] || FALLBACK.story2, t.instagram_images[2] || FALLBACK.story3].map((src, i) => (
                <div key={i} className={cn('overflow-hidden rounded-[12px] border-2 border-[#f5f0e7]/10 shadow-xl', i === 0 ? 'atelier-float-a' : i === 1 ? 'atelier-float-b' : 'atelier-float-c')}>
                  <div className="aspect-[3/4]">
                    <SafeImage src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative h-[420px] sm:h-[500px] lg:h-[540px]">
              <div className="atelier-float-a absolute left-0 top-6 w-[52%] sm:w-[48%]">
                <div className="overflow-hidden rounded-[20px] sm:rounded-[28px] border-4 border-[#f5f0e7]/10 shadow-2xl">
                  <div className="aspect-[3/4]">
                    <SafeImage src={t.instagram_images[0] || FALLBACK.story1} alt="" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="atelier-float-b absolute left-[28%] top-0 z-10 w-[48%] sm:w-[44%]">
                <div className="overflow-hidden rounded-[20px] sm:rounded-[28px] border-4 border-[#f5f0e7]/10 shadow-2xl">
                  <div className="aspect-[3/4]">
                    <SafeImage src={t.instagram_images[1] || FALLBACK.story2} alt="" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="atelier-float-c absolute right-0 top-12 w-[50%] sm:w-[46%]">
                <div className="overflow-hidden rounded-[20px] sm:rounded-[28px] border-4 border-[#f5f0e7]/10 shadow-2xl">
                  <div className="aspect-[3/4]">
                    <SafeImage src={t.instagram_images[2] || FALLBACK.story3} alt="" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>

    {/* INSTAGRAM */}
    <section className={cn('mx-auto max-w-7xl', mc('px-4 py-12', 'sm:px-6 sm:py-20 lg:px-10 lg:py-24'))}>
      <div className={cn('flex gap-3', mc('flex-col', 'sm:flex-row sm:items-end sm:justify-between sm:gap-4'))}>
        <h2 className={cn(
          'font-serif-display font-medium leading-tight tracking-tight text-neutral-900',
          mc('text-2xl', 'sm:text-4xl lg:text-5xl')
        )}>
          Follow along
        </h2>
        {t.instagram_link && (
          <a
            href={t.instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 self-start uppercase text-neutral-700 hover:text-neutral-900',
              mc('text-[10px] tracking-[0.22em]', 'sm:text-[12px] sm:tracking-[0.3em]')
            )}
            data-testid="instagram-link"
          >
            <InstagramIcon className="h-4 w-4" /> Open Instagram <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className={cn('grid gap-2', mc('mt-6 grid-cols-3', 'sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-6'))}>
        {t.instagram_images.slice(0, 6).map((src, i) => (
          <a
            key={i}
            href={t.instagram_link || '#'}
            target={t.instagram_link ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={cn(
              'group relative block aspect-square overflow-hidden bg-neutral-200',
              mc('rounded-[10px]', 'sm:rounded-[18px]')
            )}
            data-testid={`instagram-image-${i}`}
          >
            <SafeImage src={src} alt={`Instagram ${i + 1}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]" />
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/0 opacity-0 transition group-hover:bg-neutral-900/30 group-hover:opacity-100">
              <InstagramIcon className={cn(isMobile ? 'h-4 w-4' : 'h-6 w-6', 'text-[#f5f0e7]')} />
            </div>
          </a>
        ))}
      </div>
    </section>
  </>
);

/* ------------------------------------------------------------------ */
/*  Product card                                                        */
/* ------------------------------------------------------------------ */

const ProductCard = ({ product, index, isMobile, mc, onOpen, onQuickAdd }) => (
  <article data-testid={`product-card-${index}`} className="group relative">
    <button
      onClick={onOpen}
      className={cn(
        'relative block w-full aspect-[4/5] overflow-hidden bg-neutral-200 text-left',
        mc('rounded-[12px]', 'sm:rounded-[20px]')
      )}
      aria-label={`Open ${product.name}`}
    >
      <SafeImage src={product.img} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
      <span className={cn(
        'absolute rounded-full bg-[#f5f0e7]/95 uppercase text-neutral-900',
        mc('left-2 top-2 px-2 py-0.5 text-[8px] tracking-[0.18em]', 'sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[10px] sm:tracking-[0.25em]')
      )}>
        {product.tag}
      </span>
      <span className={cn('absolute rounded-full bg-[#f5f0e7]/95 text-neutral-900', mc('right-2 top-2 p-1', 'sm:right-3 sm:top-3 sm:p-2'))}>
        <Heart className={cn(isMobile ? 'h-3 w-3' : 'h-4 w-4')} />
      </span>
    </button>

    <button
      onClick={(e) => { e.stopPropagation(); onQuickAdd(); }}
      className={cn(
        'absolute flex items-center justify-center gap-2 rounded-full bg-neutral-900 uppercase text-[#f5f0e7] transition',
        mc(
          'bottom-[68px] left-2 right-2 px-2 py-2 text-[9px] tracking-[0.2em] opacity-100',
          'sm:bottom-[96px] sm:left-3 sm:right-3 sm:px-4 sm:py-3 sm:text-[11px] sm:tracking-[0.3em] sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100'
        )
      )}
      data-testid={`quick-add-${product.id}`}
    >
      Quick add <ShoppingBag className="h-3.5 w-3.5" />
    </button>

    <div className={cn('flex items-start justify-between gap-2', mc('mt-2', 'sm:mt-4 sm:gap-3'))}>
      <button onClick={onOpen} className="text-left min-w-0">
        <h3 className={cn(
          'font-serif-display leading-tight text-neutral-900 truncate',
          mc('text-sm', 'sm:text-lg')
        )}>
          {product.name}
        </h3>
        <div className={cn('flex items-center', mc('mt-1 gap-1', 'sm:mt-2 sm:gap-1.5'))}>
          {product.colors.map((c, ci) => (
            <span key={ci} className={cn('rounded-full border border-neutral-300', isMobile ? 'h-2 w-2' : 'h-3 w-3')} style={{ backgroundColor: c }} />
          ))}
        </div>
      </button>
      <p className={cn('font-medium text-neutral-900', mc('text-xs', 'sm:text-sm'))}>{product.price}</p>
    </div>
  </article>
);

/* ------------------------------------------------------------------ */
/*  Shop view                                                           */
/* ------------------------------------------------------------------ */

const ShopView = ({ isMobile, mc, selectedCategory, setSelectedCategory, selectedType, setSelectedType, products, goProduct, addToCart, goHome }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const Sidebar = (
    <aside className="space-y-8">
      <div>
        <p className={cn('uppercase text-neutral-500', mc('text-[10px] tracking-[0.25em]', 'sm:text-[11px] sm:tracking-[0.35em]'))}>Categories</p>
        <ul className="mt-4 space-y-2">
          {['All', ...CATEGORIES].map((c) => (
            <li key={c}>
              <button
                onClick={() => { setSelectedCategory(c); setFiltersOpen(false); }}
                className={cn(
                  'w-full text-left font-serif-display transition',
                  mc('text-lg', 'sm:text-2xl'),
                  selectedCategory === c ? 'text-[#a4452f]' : 'text-neutral-900 hover:text-[#a4452f]'
                )}
                data-testid={`sidebar-cat-${c.toLowerCase()}`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className={cn('uppercase text-neutral-500', mc('text-[10px] tracking-[0.25em]', 'sm:text-[11px] sm:tracking-[0.35em]'))}>Type</p>
        <ul className="mt-4 space-y-2">
          {['All', 'Tops', 'Trousers', 'Denim', 'Knitwear', 'Bags', 'Shoes', 'Hats', 'Scarves'].map((tt) => (
            <li key={tt}>
              <button
                onClick={() => { setSelectedType(tt); setFiltersOpen(false); }}
                className={cn(
                  'uppercase tracking-[0.2em] transition',
                  mc('text-xs', 'sm:text-sm'),
                  selectedType === tt ? 'text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-900'
                )}
                data-testid={`sidebar-type-${tt.toLowerCase()}`}
              >
                {tt}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );

  return (
    <section className={cn('mx-auto max-w-7xl', mc('px-4 py-8', 'sm:px-6 sm:py-14 lg:px-10 lg:py-20'))}>
      <div className={cn('flex items-center gap-2 uppercase text-neutral-500', mc('text-[10px] tracking-[0.2em]', 'sm:text-[11px] sm:tracking-[0.3em]'))}>
        <button onClick={goHome} className="hover:text-neutral-900">Home</button>
        <span>/</span>
        <span className="text-neutral-900">Shop</span>
        {selectedCategory !== 'All' && (<><span>/</span><span className="text-neutral-900">{selectedCategory}</span></>)}
      </div>

      <div className={cn('mt-4 flex gap-3', mc('flex-col', 'sm:flex-row sm:items-end sm:justify-between sm:mt-6'))}>
        <div>
          <h1 className={cn(
            'font-serif-display font-medium leading-[1.04] tracking-tight text-neutral-900',
            mc('text-3xl', 'sm:text-5xl lg:text-6xl')
          )}>
            {selectedCategory === 'All' ? 'The Collection' : selectedCategory}
          </h1>
          <p className={cn('text-neutral-600', mc('mt-1 text-xs', 'sm:mt-2 sm:text-sm'))}>
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
        <button
          onClick={() => setFiltersOpen(true)}
          className={cn(
            'inline-flex items-center gap-2 self-start rounded-full border border-neutral-900 uppercase text-neutral-900',
            mc('px-3 py-2 text-[10px] tracking-[0.2em]', 'px-4 py-2.5 text-[11px] tracking-[0.25em] lg:hidden')
          )}
          data-testid="open-filters-btn"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className={cn('grid gap-6', mc('mt-6', 'sm:mt-12 sm:gap-8 lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]'))}>
        {!isMobile && <div className="hidden lg:block">{Sidebar}</div>}
        <div>
          {products.length === 0 ? (
            <div className={cn('rounded-[16px] border border-neutral-900/10 bg-[#efe7da] text-center', mc('p-6', 'sm:p-10'))}>
              <p className={cn('font-serif-display text-neutral-900', mc('text-lg', 'sm:text-2xl'))}>No pieces match this filter.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedType('All'); }}
                className="mt-5 inline-flex rounded-full bg-neutral-900 px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] text-[#f5f0e7]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className={cn('grid grid-cols-2', mc('gap-x-3 gap-y-8', 'sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 xl:grid-cols-3'))}>
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} isMobile={isMobile} mc={mc} onOpen={() => goProduct(p)} onQuickAdd={() => addToCart(p)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50" data-testid="filters-drawer">
          <div className="absolute inset-0 bg-neutral-900/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#f5f0e7] p-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <p className="font-serif-display text-xl">Filters</p>
              <button onClick={() => setFiltersOpen(false)} className="rounded-full p-2 hover:bg-neutral-900/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8">{Sidebar}</div>
          </div>
        </div>
      )}
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Product detail view                                                 */
/* ------------------------------------------------------------------ */

const ProductView = ({ isMobile, mc, product, addToCart, goShop, goCart }) => {
  const [size, setSize] = useState(product.sizes?.[0] || 'One Size');
  return (
    <section className={cn('mx-auto max-w-7xl', mc('px-4 py-8', 'sm:px-6 sm:py-14 lg:px-10 lg:py-20'))}>
      <button
        onClick={goShop}
        className={cn('inline-flex items-center gap-2 uppercase text-neutral-600 hover:text-neutral-900', mc('text-[10px] tracking-[0.2em]', 'sm:text-[11px] sm:tracking-[0.3em]'))}
        data-testid="back-to-shop-btn"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {product.category}
      </button>

      <div className={cn('grid gap-8', mc('mt-6', 'sm:mt-8 lg:grid-cols-2 lg:gap-16'))}>
        <div className={cn('overflow-hidden bg-neutral-200', mc('rounded-[16px]', 'sm:rounded-[28px]'))}>
          <SafeImage src={product.img} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <p className={cn('uppercase text-neutral-500', mc('text-[10px] tracking-[0.25em]', 'sm:text-[11px] sm:tracking-[0.35em]'))}>
            {product.category} · {product.type}
          </p>
          <h1 className={cn(
            'font-serif-display mt-2 font-medium leading-[1.05] tracking-tight text-neutral-900',
            mc('text-3xl', 'sm:text-5xl')
          )}>
            {product.name}
          </h1>
          <p className={cn('font-medium text-neutral-900', mc('mt-3 text-xl', 'sm:mt-4 sm:text-2xl'))}>{product.price}</p>

          <div className={cn(mc('mt-6', 'sm:mt-8'))}>
            <p className={cn('uppercase text-neutral-500', mc('text-[10px] tracking-[0.25em]', 'sm:text-[11px] sm:tracking-[0.3em]'))}>Colour</p>
            <div className="mt-3 flex gap-2">
              {product.colors.map((c, i) => (
                <span key={i} className="h-6 w-6 rounded-full border border-neutral-300" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          <div className={cn(mc('mt-6', 'sm:mt-8'))}>
            <p className={cn('uppercase text-neutral-500', mc('text-[10px] tracking-[0.25em]', 'sm:text-[11px] sm:tracking-[0.3em]'))}>Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(product.sizes || ['One Size']).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    'min-w-[40px] rounded-full border px-3 py-1.5 text-xs transition',
                    size === s ? 'border-neutral-900 bg-neutral-900 text-[#f5f0e7]' : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                  )}
                  data-testid={`size-${s}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className={cn('flex gap-2', mc('mt-8 flex-col', 'sm:mt-10 sm:flex-row'))}>
            <button
              onClick={() => { addToCart(product, size, 1); goCart(); }}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 font-medium uppercase text-[#f5f0e7] transition hover:bg-neutral-800',
                mc('px-5 py-3 text-[10px] tracking-[0.22em]', 'sm:px-7 sm:py-4 sm:text-[12px] sm:tracking-[0.3em]')
              )}
              data-testid="add-to-bag-btn"
            >
              Add to bag <ShoppingBag className="h-4 w-4" />
            </button>
            <button
              onClick={() => addToCart(product, size, 1)}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded-full border border-neutral-900 font-medium uppercase text-neutral-900 transition hover:bg-neutral-900 hover:text-[#f5f0e7]',
                mc('px-5 py-3 text-[10px] tracking-[0.22em]', 'sm:px-7 sm:py-4 sm:text-[12px] sm:tracking-[0.3em]')
              )}
              data-testid="add-keep-shopping-btn"
            >
              Add & keep shopping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Cart view                                                           */
/* ------------------------------------------------------------------ */

const CartView = ({ isMobile, mc, cart, updateQty, removeItem, total, goShop }) => (
  <section className={cn('mx-auto max-w-7xl', mc('px-4 py-8', 'sm:px-6 sm:py-14 lg:px-10 lg:py-20'))} data-testid="cart-view">
    <p className={cn('uppercase text-neutral-500', mc('text-[10px] tracking-[0.25em]', 'sm:text-[11px] sm:tracking-[0.35em]'))}>Your bag</p>
    <h1 className={cn(
      'font-serif-display mt-2 font-medium tracking-tight text-neutral-900',
      mc('text-3xl', 'sm:text-5xl lg:text-6xl')
    )}>
      {cart.length === 0 ? 'A quiet bag.' : `${cart.length} ${cart.length === 1 ? 'piece' : 'pieces'} held.`}
    </h1>

    {cart.length === 0 ? (
      <div className={cn('mt-8 rounded-[20px] border border-neutral-900/10 bg-[#efe7da] text-center', mc('p-8', 'sm:p-14'))}>
        <p className={cn('font-serif-display text-neutral-900', mc('text-lg', 'sm:text-2xl'))}>Nothing in your bag yet.</p>
        <button
          onClick={goShop}
          className={cn(
            'mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 uppercase text-[#f5f0e7] hover:bg-neutral-800',
            mc('px-5 py-3 text-[10px] tracking-[0.22em]', 'sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[0.3em]')
          )}
          data-testid="continue-shopping-btn"
        >
          Continue shopping <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    ) : (
      <div className={cn('grid gap-8', mc('mt-8', 'sm:mt-10 lg:grid-cols-[1fr_360px] lg:gap-16'))}>
        <ul className="divide-y divide-neutral-900/10 border-y border-neutral-900/10">
          {cart.map((item) => (
            <li key={item.key} className={cn('flex gap-3 py-4', mc('flex-col', 'sm:flex-row sm:items-center sm:gap-6 sm:py-6'))}>
              <div className={cn('shrink-0 overflow-hidden rounded-[12px] bg-neutral-200', mc('h-24 w-20', 'sm:h-32 sm:w-28'))}>
                <SafeImage src={item.product.img} alt={item.product.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 truncate">
                  {item.product.category} · {item.product.type}
                </p>
                <h3 className={cn('font-serif-display mt-1 text-neutral-900 truncate', mc('text-base', 'sm:text-xl'))}>{item.product.name}</h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-neutral-500">Size {item.size}</p>
              </div>
              <div className={cn('flex items-center justify-between', mc('gap-3', 'sm:gap-6'))}>
                <div className="flex items-center rounded-full border border-neutral-900/20">
                  <button onClick={() => updateQty(item.key, -1)} className="p-1.5 hover:text-[#a4452f]" aria-label="decrease" data-testid={`qty-minus-${item.product.id}`}>
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="min-w-[20px] text-center text-xs">{item.qty}</span>
                  <button onClick={() => updateQty(item.key, 1)} className="p-1.5 hover:text-[#a4452f]" aria-label="increase" data-testid={`qty-plus-${item.product.id}`}>
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <p className={cn('text-right font-medium text-neutral-900', mc('w-14 text-xs', 'sm:w-20 sm:text-sm'))}>${item.product.priceNumber * item.qty}</p>
                <button onClick={() => removeItem(item.key)} className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-900/5 hover:text-[#a4452f]" aria-label="remove" data-testid={`remove-${item.product.id}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className={cn('h-fit rounded-[20px] border border-neutral-900/10 bg-[#efe7da]', mc('p-5', 'sm:p-8'))}>
          <p className={cn('uppercase text-neutral-500', mc('text-[10px] tracking-[0.25em]', 'sm:text-[11px] sm:tracking-[0.3em]'))}>Order summary</p>
          <div className="mt-4 space-y-2.5 text-sm text-neutral-700">
            <div className="flex justify-between"><span>Subtotal</span><span>${total}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{total >= 150 ? 'Complimentary' : '$12'}</span></div>
            <div className="flex justify-between border-t border-neutral-900/10 pt-3 text-base font-medium text-neutral-900">
              <span>Total</span><span>${total + (total >= 150 ? 0 : 12)}</span>
            </div>
          </div>
          <button className={cn(
            'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 uppercase text-[#f5f0e7] hover:bg-neutral-800',
            mc('px-5 py-3 text-[10px] tracking-[0.22em]', 'sm:px-7 sm:py-4 sm:text-[11px] sm:tracking-[0.3em]')
          )} data-testid="checkout-btn">
            Checkout <ArrowUpRight className="h-4 w-4" />
          </button>
          <button onClick={goShop} className="mt-3 w-full text-center text-[10px] uppercase tracking-[0.25em] text-neutral-600 hover:text-neutral-900">
            Continue shopping
          </button>
        </aside>
      </div>
    )}
  </section>
);

/* ------------------------------------------------------------------ */
/*  Policy view                                                         */
/* ------------------------------------------------------------------ */

const PolicyView = ({ isMobile, mc, policy, goHome }) => (
  <section className={cn('mx-auto max-w-3xl', mc('px-4 py-8', 'sm:px-6 sm:py-14 lg:py-20'))} data-testid="policy-view">
    <button
      onClick={goHome}
      className={cn('inline-flex items-center gap-2 uppercase text-neutral-600 hover:text-neutral-900', mc('text-[10px] tracking-[0.2em]', 'sm:text-[11px] sm:tracking-[0.3em]'))}
      data-testid="policy-back-home-btn"
    >
      <ArrowLeft className="h-4 w-4" /> Back to home
    </button>
    <h1 className={cn(
      'font-serif-display mt-6 font-medium leading-[1.05] tracking-tight text-neutral-900',
      mc('text-3xl', 'sm:text-5xl')
    )}>
      {policy.title}
    </h1>
    {policy.body ? (
      <div className={cn(
        'mt-6 whitespace-pre-line text-neutral-700',
        mc('text-sm leading-7', 'sm:text-base sm:leading-8')
      )}>
        {policy.body}
      </div>
    ) : (
      <p className="mt-6 text-sm text-neutral-500">This policy has not been provided yet.</p>
    )}
  </section>
);

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

const Footer = ({ t, isMobile, mc, onShop, onPolicy }) => {
  const socials = [
    { link: t.instagram_link, Icon: InstagramIcon, label: 'Instagram', testid: 'social-instagram' },
    { link: t.facebook_link, Icon: FacebookIcon, label: 'Facebook', testid: 'social-facebook' },
    { link: t.twitter_link, Icon: TwitterIcon, label: 'Twitter', testid: 'social-twitter' },
    { link: t.linkedin_link, Icon: LinkedinIcon, label: 'LinkedIn', testid: 'social-linkedin' },
    { link: t.whatsapp_link, Icon: WhatsappIcon, label: 'WhatsApp', testid: 'social-whatsapp' },
  ].filter((s) => s.link);

  const policies = [
    { key: 'terms', label: 'Terms & Conditions', body: t.terms_and_conditions },
    { key: 'privacy', label: 'Privacy Policy', body: t.privacy_policy },
    { key: 'shipping', label: 'Shipping Policy', body: t.shipping_policy },
    { key: 'refund', label: 'Refund Policy', body: t.refund_policy },
  ].filter((p) => p.body);

  return (
    <footer className="bg-neutral-900 text-[#f5f0e7]">
      <div className={cn('mx-auto max-w-7xl', mc('px-4 py-10', 'sm:px-6 sm:py-16 lg:px-10'))}>
        <div className={cn('grid gap-8', mc('grid-cols-1', 'sm:gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]'))}>
          {/* Brand + socials */}
          <div>
            {t.logo_url ? (
              <SafeImage src={t.logo_url} alt={t.brand} className={cn('w-auto object-contain', mc('h-8', 'sm:h-10'))} />
            ) : (
              <p className={cn('font-serif-display tracking-tight', mc('text-xl', 'sm:text-3xl'))}>{t.brand}</p>
            )}

            {socials.length > 0 && (
              <div className={cn('flex flex-wrap items-center', mc('mt-4 gap-2', 'sm:mt-6 sm:gap-3'))}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-testid={s.testid}
                    className={cn('rounded-full border border-[#f5f0e7]/20 transition hover:bg-[#f5f0e7] hover:text-neutral-900', mc('p-2', 'sm:p-2.5'))}
                  >
                    <s.Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Shop */}
          <div>
            <p className={cn('uppercase text-[#f5f0e7]/60', mc('text-[10px] tracking-[0.25em]', 'sm:text-[11px] sm:tracking-[0.35em]'))}>Shop</p>
            <ul className={cn('space-y-2.5', mc('mt-3 text-xs', 'sm:mt-5 sm:space-y-3 sm:text-sm'), 'text-[#f5f0e7]/85')}>
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <button onClick={() => onShop(c)} className="transition hover:text-[#f5f0e7]" data-testid={`footer-shop-${c.toLowerCase()}`}>
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className={cn('uppercase text-[#f5f0e7]/60', mc('text-[10px] tracking-[0.25em]', 'sm:text-[11px] sm:tracking-[0.35em]'))}>Get in touch</p>
            <ul className={cn('space-y-2.5', mc('mt-3 text-xs', 'sm:mt-5 sm:space-y-3 sm:text-sm'), 'text-[#f5f0e7]/85')}>
              {t.support_email && (
                <li>
                  <a href={`mailto:${t.support_email}`} className="inline-flex items-center gap-2 transition hover:text-[#f5f0e7] break-all" data-testid="contact-email">
                    <Mail className="h-4 w-4 shrink-0" /> <span className="truncate">{t.support_email}</span>
                  </a>
                </li>
              )}
              {t.support_phone && (
                <li>
                  <a href={`tel:${t.support_phone}`} className="inline-flex items-center gap-2 transition hover:text-[#f5f0e7]" data-testid="contact-phone">
                    <Phone className="h-4 w-4 shrink-0" /> {t.support_phone}
                  </a>
                </li>
              )}
              {t.physical_address && (
                <li className="flex items-start gap-2" data-testid="contact-address">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line">{t.physical_address}</span>
                </li>
              )}
              {!t.support_email && !t.support_phone && !t.physical_address && (
                <li className="text-[#f5f0e7]/50">Contact details coming soon.</li>
              )}
            </ul>
          </div>
        </div>

        <div className={cn(
          'flex flex-col items-start justify-between gap-3 border-t border-[#f5f0e7]/10 uppercase text-[#f5f0e7]/55',
          mc('mt-8 pt-5 text-[9px] tracking-[0.18em]', 'sm:mt-14 sm:pt-6 sm:text-[11px] sm:tracking-[0.25em] sm:flex-row sm:items-center')
        )}>
          <p>© {new Date().getFullYear()} {t.brand}.</p>
          {policies.length > 0 && (
            <div className={cn('flex flex-wrap', mc('gap-x-3 gap-y-1.5', 'sm:gap-x-5 sm:gap-y-2'))}>
              {policies.map((p) => (
                <button
                  key={p.key}
                  onClick={() => onPolicy(p.label, p.body)}
                  className="transition hover:text-[#f5f0e7]"
                  data-testid={`policy-${p.key}-btn`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default AtelierClothingTemplate;