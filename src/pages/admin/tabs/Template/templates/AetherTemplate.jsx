import {
  ArrowRight,
  ChevronDown,
  Menu,
  ShoppingBag,
  Sparkles,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';
import TemplatePreviewMeta from '../TemplatePreviewMeta';

import heroMain from '../../../../../assets/templates/aether/hero/hero-main.jpg';
import heroSecondary from '../../../../../assets/templates/aether/hero/hero-secondary.jpg';

import collection1 from '../../../../../assets/templates/aether/collections/collection-1.jpg';
import collection2 from '../../../../../assets/templates/aether/collections/collection-2.jpg';
import collection3 from '../../../../../assets/templates/aether/collections/collection-3.jpg';

import gallery1 from '../../../../../assets/templates/aether/gallery/gallery-1.jpg';
import gallery2 from '../../../../../assets/templates/aether/gallery/gallery-2.jpg';
import gallery3 from '../../../../../assets/templates/aether/gallery/gallery-3.jpg';
import gallery4 from '../../../../../assets/templates/aether/gallery/gallery-4.jpg';

import insta1 from '../../../../../assets/templates/aether/instagram/insta-1.jpg';
import insta2 from '../../../../../assets/templates/aether/instagram/insta-2.jpg';
import insta3 from '../../../../../assets/templates/aether/instagram/insta-3.jpg';
import insta4 from '../../../../../assets/templates/aether/instagram/insta-4.jpg';
import insta5 from '../../../../../assets/templates/aether/instagram/insta-5.jpg';
import insta6 from '../../../../../assets/templates/aether/instagram/insta-6.jpg';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.96, y: 28 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Reveal = ({ children, className = '', delay = 0, amount = 0.18 }) => (
  <motion.div
    className={className}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    transition={{ duration: 0.8, delay, ease }}
  >
    {children}
  </motion.div>
);

const ImageCard = ({ src, alt, className = '', imageClassName = '' }) => (
  <motion.div
    className={`group overflow-hidden rounded-[2rem] bg-white/40 shadow-[0_24px_90px_rgba(72,52,38,0.12)] ring-1 ring-black/5 ${className}`}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    <img
      src={src}
      alt={alt}
      className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 ${imageClassName}`}
    />
  </motion.div>
);

const Button = ({ children, variant = 'dark', className = '', ...props }) => {
  const styles =
    variant === 'dark'
      ? 'bg-[#15120f] text-white shadow-[0_18px_50px_rgba(21,18,15,0.22)] hover:bg-[#2a241f]'
      : 'border border-[#15120f]/15 bg-white/70 text-[#15120f] backdrop-blur-xl hover:border-[#15120f]/30 hover:bg-white';

  return (
    <motion.button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${styles} ${className}`}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const SectionHeading = ({ eyebrow, title, text, align = 'center', className = '' }) => (
  <Reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-4xl ${className}`}>
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9f5e50]">{eyebrow}</p>
    <h2 className="mt-5 text-4xl font-light leading-[0.94] tracking-[-0.04em] text-[#15120f] sm:text-6xl lg:text-7xl">
      {title}
    </h2>
    {text ? <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6f6259] sm:text-lg">{text}</p> : null}
  </Reveal>
);

const AetherTemplate = ({ template, config = {}, onApply }) => {
  const data = { ...config, ...template };
  const storeName = data.store_name || data.name || 'Aether Beauty';

  const collections = data.collections || [
    {
      title: 'Hydrating Essentials',
      description: 'Deep nourishment and hydration for everyday glow.',
    },
    {
      title: 'Night Recovery',
      description: 'Restore and renew while you sleep.',
    },
    {
      title: 'Radiance Collection',
      description: 'Brightening skincare inspired by wellness rituals.',
    },
  ];

  const reviews = data.reviews || [
    {
      rating: '5.0',
      quote: 'The products feel luxurious and the experience is beautiful.',
      author: 'Sophia',
    },
    {
      rating: '5.0',
      quote: 'My skin has never looked healthier.',
      author: 'Emma',
    },
  ];

  const collectionCards = [
    {
      image: collection1,
      eyebrow: '01 - Cleanse',
      title: collections[0]?.title || 'Glow Ritual Collection',
      description: collections[0]?.description || 'Nourishing essentials for radiant and healthy skin.',
    },
    {
      image: collection2,
      eyebrow: '02 - Restore',
      title: collections[1]?.title || 'Night Recovery Series',
      description: collections[1]?.description || 'Products designed to restore and nourish while you rest.',
    },
    {
      image: collection3,
      eyebrow: '03 - Renew',
      title: collections[2]?.title || 'Wellness Essentials',
      description: collections[2]?.description || 'Beauty and wellness products for everyday self-care.',
    },
  ];

  const routineSteps = [
    {
      step: 'Step 01',
      title: 'Cleanse',
      image: gallery1,
      text: 'Gently remove impurities and daily buildup without stripping your skin barrier.',
    },
    {
      step: 'Step 02',
      title: 'Treat',
      image: gallery4,
      text: 'Apply concentrated actives that settle into the skin with a soft, weightless finish.',
    },
    {
      step: 'Step 03',
      title: 'Seal',
      image: collection2,
      text: 'Lock in hydration and leave the complexion calm, balanced, and visibly luminous.',
    },
  ];

  const productDetails = [
    ['Shipping', data.shipping_policy || 'Orders ship within 3 business days with standard delivery in 5-8 business days.'],
    ['Return Policy', data.refund_policy || 'Returns accepted within 30 days when products are returned in original condition.'],
  ];

  const journalPosts = [
    ['The science of a stronger skin barrier', gallery3],
    ['How to build a calm morning ritual', heroSecondary],
    ['Ingredients we keep out of every formula', insta4],
  ];

  const footerGroups = [
    {
      title: 'Useful links',
      links: [
        ['Home', '#home'],
        ['About', '#about'],
        ['Products', '#products'],
        ['Routine', '#routine'],
        ['Journal', '#journal'],
        ['Contact', `tel:${data.support_phone || '+18005550482'}`],
      ],
    },
    {
      title: 'Social media',
      links: [
        ['Instagram', data.instagram_link || '#'],
        ['Facebook', data.facebook_link || '#'],
        ['X', data.twitter_link || '#'],
      ],
    },
  ];

  const footerHighlights = [
    {
      title: 'Shop support',
      text: 'Shipping, returns, order care, and customer help are grouped into a premium support hub.',
      links: [
        ['Shipping', '#product'],
        ['Returns', '#product'],
        ['Track Order', '#contact'],
        ['FAQ', '#contact'],
      ],
    },
    {
      title: 'Policy highlights',
      text: 'Clear store policies are presented as brand-safe trust points instead of plain footer links.',
      links: [
        ['Terms', '#contact'],
        ['Privacy', '#contact'],
        ['Refund Policy', '#product'],
        ['Cookie Policy', '#contact'],
      ],
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-[#f7efe4] text-[#15120f]">
      <motion.div
        className="bg-[#15120f] px-4 py-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/85"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        {data.ticker_text || 'Free shipping on orders above $75 - complimentary samples with every ritual'}
      </motion.div>

      <header className="absolute left-0 right-0 top-9 z-50 px-4 py-5 sm:px-6 lg:px-10">
        <motion.div
          className="mx-auto flex max-w-[1540px] items-center justify-between rounded-full border border-white/55 bg-white/60 px-4 py-3 shadow-[0_18px_70px_rgba(65,38,22,0.14)] backdrop-blur-2xl sm:px-6"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <nav className="hidden items-center gap-7 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#5d5148] lg:flex">
            <a href="#about" className="transition hover:text-[#9f5e50]">About</a>
            <a href="#products" className="group inline-flex items-center gap-1 transition hover:text-[#9f5e50]">
              Products
              <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
            </a>
            <a href="#journal" className="transition hover:text-[#9f5e50]">Journal</a>
          </nav>

          <a href="#home" className="text-xl font-semibold tracking-[-0.04em] text-[#15120f] sm:text-2xl">
            {storeName}
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden items-center gap-7 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#5d5148] lg:flex">
              <a href="#routine" className="transition hover:text-[#9f5e50]">Routine</a>
              <a href={`tel:${data.support_phone || '+18005550482'}`} className="transition hover:text-[#9f5e50]">Contact</a>
              <a href="#products" className="inline-flex items-center gap-2 transition hover:text-[#9f5e50]">
                Cart <span className="rounded-full bg-[#15120f] px-2 py-0.5 text-white">0</span>
              </a>
            </nav>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#15120f]/10 bg-white/70 text-[#15120f] lg:hidden">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </header>

      <section id="home" className="relative min-h-[calc(100vh-40px)] overflow-hidden px-4 pb-16 sm:px-6 sm:pt-3 lg:px-10 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(204,133,113,0.26),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(216,186,135,0.2),transparent_28%),linear-gradient(135deg,#fff8ef_0%,#ead9ca_52%,#f6eee2_100%)]" />
        <motion.div
          className="absolute right-8 top-2 hidden rounded-full border border-[#15120f]/15 px-6 py-16 text-xs font-semibold uppercase tracking-[0.24em] text-[#15120f]/55 lg:block"
          animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          Skin first
        </motion.div>

        <div className="relative mx-auto grid max-w-[1540px] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <motion.div className="max-w-3xl pt-0 text-center lg:pt-0 lg:text-left" variants={stagger} initial="hidden" animate="visible">
            <motion.div
              variants={fadeUp}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#9f5e50] shadow-sm backdrop-blur-xl lg:mx-0"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {data.hero_tag || data.category || 'Science-led skincare'}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-5xl font-light leading-[0.9] tracking-[-0.05em] text-[#15120f] sm:text-7xl lg:text-[7.25rem]"
            >
              {data.hero_heading || 'Naturally better skin starts here.'}
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6f6259] sm:text-lg lg:mx-0">
              {data.hero_subtext || 'A spa-inspired online storefront built for wellness and self-care brands.'}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button>
                {data.primary_cta || 'Shop Now'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              {/* <Button variant="light" onClick={onApply}>Preview Theme</Button> */}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 grid grid-cols-3 gap-3 rounded-[1.75rem] border border-white/70 bg-white/45 p-3 text-left shadow-[0_24px_80px_rgba(65,38,22,0.1)] backdrop-blur-xl">
              {[
                ['20K+', 'happy routines'],
                ['100%', 'skin-first'],
                ['50+', 'tests'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[1.25rem] bg-white/55 p-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-[#15120f]">{value}</p>
                  <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#7b6d61]">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="relative min-h-[680px] sm:min-h-[780px] lg:min-h-[940px]" variants={fadeScale} initial="hidden" animate="visible">
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
              <ImageCard src={heroMain} alt="Aether skincare ritual" className="absolute right-0 top-4 z-10 h-[440px] w-[78%] rounded-[2.5rem] sm:h-[560px] lg:h-[700px] lg:w-[66%]" />
            </motion.div>
            <motion.div animate={{ y: [0, 18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
              <ImageCard src={heroSecondary} alt="Aether product detail" className="absolute left-0 top-[430px] z-20 h-[260px] w-[52%] rounded-[2rem] ring-8 ring-[#f7efe4] sm:top-[520px] sm:h-[330px] lg:top-[610px] lg:h-[360px] lg:w-[34%]" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 right-2 max-w-[19rem] rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_22px_70px_rgba(65,38,22,0.16)] backdrop-blur-2xl sm:right-16"
              whileHover={{ y: -5 }}
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#9f5e50]">Aether - beauty</p>
              <h3 className="mt-3 text-2xl font-light tracking-[-0.04em]">Works with your skin's natural intelligence</h3>
              <p className="mt-3 text-sm leading-6 text-[#6f6259]">A refined storefront experience for rituals, products, stories, and trust-building content.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <Reveal className="mx-auto max-w-[1540px]">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-[#15120f]/10 bg-[#fff8ef]/65 px-5 py-8 shadow-[0_24px_90px_rgba(72,52,38,0.08)] backdrop-blur-xl sm:px-8">
            <motion.div
              className="flex min-w-max items-center gap-6"
              animate={{ x: ['0%', '-28%'] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              {[heroSecondary, gallery1, collection1, gallery3, insta2, collection3, gallery4, insta5].map((src, index) => (
                <div key={`${src}-intro-${index}`} className="flex items-center gap-6">
                  <div className="h-40 w-32 overflow-hidden rounded-[1.75rem] sm:h-52 sm:w-44">
                    <img src={src} alt={`Aether editorial ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                  <p className="text-4xl font-light uppercase leading-none tracking-[-0.05em] text-[#15120f] sm:text-6xl">
                    skin first
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </section>

      <section id="about" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <ImageCard src={gallery1} alt="Lifestyle skincare scene" className="h-[460px] rounded-[2.5rem] sm:h-[620px] lg:h-[720px]" />
          </Reveal>

          <Reveal className="rounded-[2.5rem] border border-white/70 bg-white/50 p-6 shadow-[0_24px_100px_rgba(65,38,22,0.1)] backdrop-blur-xl sm:p-10 lg:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9f5e50]">Elevated skincare</p>
            <h2 className="mt-5 text-4xl font-light leading-[0.96] tracking-[-0.04em] text-[#15120f] sm:text-6xl">
              Designed to restore and reveal your natural glow.
            </h2>
            <div className="mt-9 grid gap-5">
              {[
                ['01 -', 'Science-led, skin-first formulation', 'Research-backed ingredients support the skin barrier with efficacy and comfort.'],
                ['02 -', 'Clean, thoughtfully selected ingredients', 'Free from unnecessary additives, harsh alcohols, parabens, and sulfates.'],
                ['03 -', 'Tested for real-life use', 'Each formula is evaluated for daily performance, feel, and compatibility.'],
              ].map(([number, title, text]) => (
                <motion.div key={title} className="grid gap-3 border-t border-[#15120f]/10 pt-5 sm:grid-cols-[5rem_1fr]" whileHover={{ x: 6 }}>
                  <p className="text-sm font-semibold text-[#9f5e50]">{number}</p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6f6259]">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="story" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1540px] gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <Reveal className="lg:pb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9f5e50]">Brand story</p>
            <h2 className="mt-5 text-5xl font-light leading-[0.9] tracking-[-0.05em] text-[#15120f] sm:text-7xl">
              Honest formulas, refined rituals, visible calm.
            </h2>
            <p className="mt-7 text-base leading-8 text-[#6f6259]">
              {data.footer_about || 'Aether Beauty creates an immersive wellness storefront with soft imagery and thoughtful product arrangement.'}
            </p>
          </Reveal>

          <Reveal className="grid gap-5 sm:grid-cols-3">
            {[gallery2, heroSecondary, gallery3].map((src, index) => (
              <ImageCard key={src} src={src} alt={`Brand story ${index + 1}`} className={`h-80 ${index === 1 ? 'sm:mt-16' : ''} ${index === 2 ? 'sm:mb-16' : ''}`} />
            ))}
          </Reveal>
        </div>
      </section>

      <section id="products" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Featured products"
          title="A complete routine, beautifully merchandised."
          text="Aurae-style product cards, editorial pacing, and motion-rich hover states for an e-commerce-ready beauty storefront."
        />

        <motion.div className="mx-auto mt-12 grid max-w-[1400px] gap-6 md:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          {collectionCards.map((item, index) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="group overflow-hidden rounded-[2rem] border border-[#15120f]/5 bg-[#fffaf3] shadow-[0_24px_80px_rgba(65,38,22,0.08)]"
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden">
                <img src={item.image} alt={item.title} className="h-80 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-96" />
                <span className="absolute left-4 top-4 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9f5e50] backdrop-blur-xl">{item.eyebrow}</span>
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#15120f]">{item.title}</h3>
                  <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#15120f] text-white transition group-hover:scale-105">
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#6f6259]">{item.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-[#15120f]/10 pt-5">
                  <span className="text-sm font-semibold">$ {index === 0 ? '49.00' : index === 1 ? '72.00' : '99.00'} USD</span>
                  <a href="#product" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f5e50]">
                    View product <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <Reveal>
          <div className="mx-auto max-w-[1540px] overflow-hidden rounded-[2.75rem]">
            <div className="relative min-h-[620px]">
              <img src={gallery2} alt="New Aether collection" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#15120f]/70 via-[#15120f]/20 to-[#9f5e50]/25" />
              <div className="relative flex min-h-[620px] items-center justify-center px-6 py-20 text-center text-white">
                <div className="max-w-4xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">Ready to elevate your skincare routine?</p>
                  <h2 className="mt-6 text-5xl font-light leading-[0.88] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                    Gentle on skin. Powerful results.
                  </h2>
                  <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
                    Experience clean, science-led skincare designed to support healthy skin day after day.
                  </p>
                  <Button variant="light" className="mt-10 bg-white text-[#15120f]">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="routine" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9f5e50]">Routine guide</p>
            <h2 className="mt-5 text-4xl font-light leading-[0.96] tracking-[-0.04em] text-[#15120f] sm:text-6xl">
              Designed to work with your skin.
            </h2>
            <p className="mt-6 text-base leading-8 text-[#6f6259]">
              The serum settles into your routine. Texture smooths. Skin feels lighter and more receptive to what comes next.
            </p>
          </Reveal>

          <motion.div className="grid gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.14 }}>
            {routineSteps.map((item) => (
              <motion.article key={item.step} variants={fadeUp} className="grid overflow-hidden rounded-[2rem] border border-[#15120f]/10 bg-[#fff8ef] shadow-[0_20px_70px_rgba(72,52,38,0.08)] sm:grid-cols-[0.9fr_1.1fr]">
                <img src={item.image} alt={item.title} className="h-72 w-full object-cover sm:h-full" />
                <div className="p-7 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9f5e50]">{item.step}</p>
                  <h3 className="mt-8 text-4xl font-light tracking-[-0.04em]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#6f6259]">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="product" className="bg-[#e8dccd] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal className="rounded-[2.5rem] bg-[#fff8ef] p-6 shadow-[0_24px_90px_rgba(72,52,38,0.1)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9f5e50]">Product page</p>
            <h2 className="mt-5 text-4xl font-light leading-[0.96] tracking-[-0.04em] sm:text-6xl">Aether Radiance Serum</h2>
            <div className="mt-5 flex items-end gap-3">
              <span className="text-3xl font-semibold">$99.00 USD</span>
              <span className="pb-1 text-lg text-[#8a7d72] line-through">$199.00 USD</span>
            </div>
            <p className="mt-6 text-base leading-8 text-[#6f6259]">
              A lightweight serum formulated to improve skin tone, texture, and hydration. Absorbs quickly and works beneath the surface to reveal a healthy-looking glow.
            </p>
            <Button className="mt-8">
              Add to Cart
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <div className="mt-9 grid gap-4 border-t border-[#15120f]/10 pt-7">
              {productDetails.map(([title, text]) => (
                <div key={title}>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#6f6259]">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-4">
            <ImageCard src={collection3} alt="Aether serum" className="col-span-2 h-[420px]" />
            <ImageCard src={insta2} alt="Product texture one" className="h-56" />
            <ImageCard src={insta5} alt="Product texture two" className="h-56" />
          </Reveal>
        </div>
      </section>

      <section id="journal" className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Growing together" title="One routine at a time." text="A social and editorial section built for community, reviews, and creator-led skincare proof." />

        <motion.div className="mt-12 flex gap-5" animate={{ x: ['0%', '-35%'] }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
          {[insta1, insta2, insta3, insta4, insta5, insta6, gallery4, heroSecondary].map((src, index) => (
            <div key={`${src}-${index}`} className="h-80 w-64 shrink-0 overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_60px_rgba(72,52,38,0.12)] sm:h-96 sm:w-80">
              <img src={src} alt={`Social proof ${index + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </motion.div>
      </section>

      <section className="bg-[#15120f] px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal className="lg:pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d9a899]">What they are saying</p>
            <h2 className="mt-5 text-5xl font-light leading-[0.9] tracking-[-0.05em] sm:text-7xl">Real change, softly told.</h2>
          </Reveal>

          <motion.div className="grid gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.14 }}>
            {reviews.map((review, index) => (
              <motion.article key={`${review.author}-${index}`} variants={fadeUp} className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 backdrop-blur-xl sm:grid-cols-[13rem_1fr]">
                <img src={index % 2 === 0 ? insta3 : gallery3} alt={review.author} className="h-64 w-full object-cover sm:h-full" />
                <div className="p-7 sm:p-9">
                  <div className="flex items-center gap-2 text-[#d9a899]">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">{review.rating || '5.0'}</span>
                  </div>
                  <p className="mt-6 text-2xl font-light leading-9 tracking-[-0.03em]">"{review.quote}"</p>
                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.24em] text-white/50">{review.author}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Journal and CMS" title="Stories that make the store feel alive." text="Blog-ready editorial cards for ingredients, routines, education, and product launches." />

        <motion.div className="mx-auto mt-12 grid max-w-[1400px] gap-6 md:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }}>
          {journalPosts.map(([title, image], index) => (
            <motion.article key={title} variants={fadeUp} className="group overflow-hidden rounded-[2rem] bg-[#fff8ef] shadow-[0_20px_70px_rgba(72,52,38,0.08)]" whileHover={{ y: -8 }}>
              <img src={image} alt={title} className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9f5e50]">Article 0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-light leading-tight tracking-[-0.03em]">{title}</h3>
                <a href="#journal" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#9f5e50]">
                  Read journal <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section id="contact" className="px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
        <Reveal className="mx-auto max-w-[1400px] overflow-hidden rounded-[2.75rem] bg-[#15120f] text-white shadow-[0_30px_100px_rgba(15,23,42,0.24)]">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d9a899]">Contact and newsletter</p>
              <h2 className="mt-5 text-4xl font-light leading-[0.94] tracking-[-0.04em] sm:text-6xl">Care for your skin, every day.</h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/68">Receive skincare tips, exclusive launches, and wellness inspiration.</p>
              <div className="mt-9 flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 p-2 backdrop-blur-xl sm:flex-row">
                <input type="email" placeholder="Enter your email" className="min-h-12 flex-1 rounded-full bg-white px-5 text-sm text-[#15120f] outline-none placeholder:text-[#8a7d72]" />
                <Button variant="light" className="bg-[#e7c5b8] text-[#15120f]">Subscribe</Button>
              </div>
            </div>

            <div className="grid border-t border-white/10 bg-white/[0.03] lg:border-l lg:border-t-0">
              {[
                ['Email', data.support_email || 'support@aetherbeauty.com'],
                ['Phone', data.support_phone || '+1 800 555 0482'],
                ['Address', data.physical_address || '421 Bloom Ave, Los Angeles, CA'],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-white/10 p-8 last:border-b-0 sm:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/42">{label}</p>
                  <p className="mt-3 text-lg text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <TemplatePreviewMeta template={data} />

      <footer className="relative overflow-hidden bg-[#15120f] px-4 pb-10 pt-16 text-white sm:px-6 lg:px-10 lg:pt-20">
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="mx-auto max-w-[1540px]">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div>
              <h2 className="text-6xl font-light leading-[0.88] tracking-[-0.06em] sm:text-8xl lg:text-[8.5rem]">
                {storeName}
              </h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/62">
                {data.footer_about || 'A single, concentrated beauty experience that works with your skin and your story.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#15120f] transition hover:-translate-y-0.5">
                  Shop Now
                </a>
                <a href={`tel:${data.support_phone || '+18005550482'}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                  Contact
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[insta1, gallery2, insta3, heroSecondary, insta5, gallery4].map((src, index) => (
                <motion.div key={`${src}-footer-${index}`} className="aspect-square overflow-hidden rounded-[1.5rem] bg-white/10" whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}>
                  <img src={src} alt={`Footer visual ${index + 1}`} className="h-full w-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-5 border-y border-white/10 py-10 lg:grid-cols-[1.1fr_1.1fr_0.8fr_0.8fr]">
            {footerHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl"
                whileHover={{ y: -8 }}
              >
                <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-[#d9a899]/20 blur-2xl transition group-hover:bg-[#d9a899]/30" />
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#d9a899]">0{index + 1}</p>
                <h3 className="mt-5 text-3xl font-light tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{item.text}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.links.map(([label, href]) => (
                    <a key={label} href={href} className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/65 transition hover:border-white/30 hover:text-white">
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}

            {footerGroups.map(({ title, links }) => (
              <div key={title} className="rounded-[2rem] border border-white/10 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.26em] text-[#d9a899]">{title}</h3>
                <div className="mt-5 grid gap-3">
                  {links.map(([label, href]) => (
                    <a key={label} href={href} className="group inline-flex items-center justify-between gap-4 rounded-full border border-white/10 px-4 py-3 text-sm text-white/68 transition hover:border-white/25 hover:text-white">
                      {label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>(c) {new Date().getFullYear()} {storeName}. All rights reserved.</p>
            <div className="flex flex-wrap gap-5">
              <a href="#about" className="transition hover:text-white">Made for beauty brands</a>
              <a href="#products" className="transition hover:text-white">E-commerce ready</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AetherTemplate;
