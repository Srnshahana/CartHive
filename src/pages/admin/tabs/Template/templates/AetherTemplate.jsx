import React from 'react';
import { Star } from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';

const AetherTemplate = ({ config = {}, onApply }) => {
  return (
    <div className="w-full bg-white text-slate-950">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-500">
              {config.category || 'Beauty & Lifestyle'}
            </p>
            <div className="text-2xl font-semibold">
              {config.store_name || config.name || 'Store Name'}
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr] lg:items-center">

            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-rose-500">
                {config.hero_tag || 'Seasonal Edit'}
              </p>

              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">
                {config.hero_heading || 'Beauty rituals for every moment'}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {config.hero_subtext}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white">
                  {config.primary_cta || 'Shop Now'}
                </button>

                <button
                  onClick={onApply}
                  className="rounded-full border border-rose-200 bg-white px-6 py-3 text-sm font-semibold text-rose-700"
                >
                  Preview Theme
                </button>
              </div>
            </div>

            {/* FEATURE GRID (NO STATIC DATA) */}
            <div className="grid gap-4 sm:grid-cols-2">
              {(config.featured_categories || ['Glow', 'Skin', 'Wellness', 'Care']).map((item, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-[28px] bg-white shadow-lg"
                >
                  <img
                    src={item.image || config.hero_image}
                    alt={item.name || item}
                    className="h-80 w-full object-cover"
                  />

                  <div className="p-5">
                    <span className="text-xs uppercase tracking-[0.35em] text-rose-500">
                      {item.name || item}
                    </span>

                    <h3 className="mt-3 text-xl font-semibold text-slate-950">
                      {item.title || `${item} Rituals`}
                    </h3>

                    <p className="mt-2 text-sm text-slate-600">
                      {item.description || 'Premium curated experience'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">

          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-3xl font-semibold text-slate-950">
              {config.section_title || 'Trending Collections'}
            </h2>

            <p className="mt-4 text-slate-600">
              {config.section_subtitle}
            </p>

            <div className="mt-8 grid gap-4">
              {(config.collections || []).map((c, i) => (
                <div key={i} className="rounded-3xl bg-white p-5">
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {(config.gallery || []).map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[28px] border border-slate-200 bg-white"
              >
                <img
                  src={img}
                  alt={`gallery-${i}`}
                  className="h-72 w-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-rose-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-[28px] bg-white p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-rose-500">
                Reviews
              </p>
              <h3 className="mt-4 text-xl font-semibold">
                {config.review_title || 'Loved by customers'}
              </h3>
            </div>

            {(config.reviews || []).map((r, i) => (
              <div key={i} className="rounded-[28px] bg-white p-6">
                <div className="flex items-center gap-2 text-rose-500">
                  <Star className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.35em]">
                    {r.rating || '5.0'}
                  </span>
                </div>

                <p className="mt-4 text-slate-900">"{r.quote}"</p>
                <p className="mt-3 text-xs uppercase text-slate-500">
                  {r.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATE META (YOUR SYSTEM HOOK) */}
      <TemplatePreviewMeta template={config} />

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} {config.store_name || 'Store'}.
          </p>

          <div className="flex gap-4">
            <a href={config.faq_link || '#'}>FAQ</a>
            <a href={config.shipping_link || '#'}>Shipping</a>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default AetherTemplate;