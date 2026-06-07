import React from 'react';
import { Star } from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';

const AetherTemplate = ({ template, onApply }) => {
  return (
    <div className="w-full bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-500">Beauty & Lifestyle</p>
            <div className="text-2xl font-semibold">{template.name}</div>
          </div>
          <button onClick={onApply} className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-rose-600">
            Apply Theme
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-rose-500">Seasonal Edit</p>
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">
                {template.hero_heading || 'Beauty rituals for every moment'}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {template.hero_subtext || 'An elegant lifestyle layout with hero banners, editorial product planes, and soft modern spacing.'}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600">
                  Explore New Arrivals
                </button>
                <button onClick={onApply} className="rounded-full border border-rose-200 bg-white px-6 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50">
                  Preview Theme
                </button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Glow', 'Skin', 'Wellness', 'Care'].map((item) => (
                <div key={item} className="overflow-hidden rounded-[28px] bg-white shadow-lg transition hover:-translate-y-1">
                  <img
                    src={`https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&w=900&q=80`}
                    alt={item}
                    className="h-80 w-full object-cover"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-[0.35em] text-rose-500">{item}</span>
                    <h3 className="mt-3 text-xl font-semibold text-slate-950">{item} Rituals</h3>
                    <p className="mt-2 text-sm text-slate-600">Soft, premium packaging for mindful beauty brands.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-950">Trending Collections</h2>
            <p className="mt-4 text-slate-600">Showcase editorial drops, lifestyle bundles, and seasonal hero kits on the storefront.</p>
            <div className="mt-8 grid gap-4">
              {['Day Glow', 'Bridal Beauty', 'Clean Essentials'].map((section) => (
                <div key={section} className="rounded-3xl bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-950">{section}</h3>
                  <p className="mt-2 text-sm text-slate-600">Designed for rich product storytelling and effortless shopping.</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
                <img
                  src={`https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&w=900&q=80`}
                  alt={`Gallery ${index}`}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-950">Lifestyle Gallery {index}</h3>
                  <p className="mt-2 text-sm text-slate-600">Visual stories that feel editorial and premium.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-rose-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-4">
            {['New Arrivals', 'Best Sellers', 'Sale Edit', 'Gift Ideas'].map((label) => (
              <div key={label} className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.35em] text-rose-500">{label}</p>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">{label}</h3>
                <p className="mt-3 text-sm text-slate-600">A premium collection for beauty-first storefronts.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-rose-500">Customer Reviews</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Loved for the premium experience</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">A polished retail layout tailored for beauty and lifestyle brands seeking editorial presence.</p>
          </div>
          {[
            {
              quote: 'The soft palette and layout feel beautifully luxe and inviting.',
              author: 'Chloe P.',
            },
            {
              quote: 'This beautifully balances product storytelling with lifestyle galleries.',
              author: 'Mia S.',
            },
          ].map((review) => (
            <div key={review.author} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-rose-500">
                <Star className="h-5 w-5" />
                <span className="text-sm uppercase tracking-[0.35em]">5.0</span>
              </div>
              <p className="mt-5 text-lg leading-8 text-slate-950">{"\"" + review.quote + "\""}</p>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-500">{review.author}</p>
            </div>
          ))}
        </div>
      </section>

      <TemplatePreviewMeta template={template} />

      <footer className="border-t border-slate-200 bg-white px-6 py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {template.name}.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="transition hover:text-rose-600">FAQ</a>
            <a href="#" className="transition hover:text-rose-600">Shipping</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AetherTemplate;
