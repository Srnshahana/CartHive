import React from 'react';
import { Heart } from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';

const ArcadiaTemplate = ({ template, onApply }) => {
  return (
    <div className="w-full bg-amber-50 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-amber-200 bg-amber-50/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-semibold">{template.name}</div>
          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <a href="#" className="transition hover:text-slate-950">Made in Italy</a>
            <a href="#" className="transition hover:text-slate-950">Artisan</a>
            <a href="#" className="transition hover:text-slate-950">Lookbook</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-white p-3 text-amber-700 transition hover:bg-slate-100">
              <Heart className="h-4 w-4" />
            </button>
            
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-amber-100 via-amber-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr] lg:items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.35em] text-amber-700">Handcrafted Fashion</span>
              <h1 className="text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl">{template.hero_heading || 'Warm artisan styling for the modern boutique'}</h1>
              <p className="max-w-2xl text-base leading-8 text-slate-700">{template.hero_subtext || 'Elegant editorial blocks, textured imagery, and premium accessory showcases designed to feel handcrafted.'}</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">Shop Handbags</button>
                <button onClick={onApply} className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">Preview Theme</button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1495121605193-b116b5b9c5c6?auto=format&w=900&q=80',
              ].map((src, index) => (
                <div key={index} className="overflow-hidden rounded-[28px] bg-white shadow-lg transition hover:-translate-y-1">
                  <img src={src} alt={`Artisan ${index + 1}`} className="h-80 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              title: 'Handbag Edit',
              subtitle: 'Textured leathers, sculptural handles',
              image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&w=900&q=80',
            },
            {
              title: 'Silk Scarves',
              subtitle: 'Soft draping, vibrant patterns',
              image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&w=900&q=80',
            },
            {
              title: 'Statement Jewelry',
              subtitle: 'Warm metals, elegant stones',
              image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=900&q=80',
            },
          ].map((card) => (
            <div key={card.title} className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
              <img src={card.image} alt={card.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-700">{card.subtitle}</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Refined pieces</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">A curated artisan gallery</h2>
            </div>
            <button className="rounded-full border border-amber-700 bg-amber-50 px-6 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-100">View Lookbook</button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&w=900&q=80','https://images.unsplash.com/photo-1495121605193-b116b5b9c5c6?auto=format&w=900&q=80','https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&w=900&q=80','https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=900&q=80'].map((src, index) => (
              <div key={index} className="overflow-hidden rounded-[28px] bg-slate-100 shadow-sm">
                <img src={src} alt={`Gallery ${index + 1}`} className="h-64 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-10 text-white shadow-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Customer Love</p>
            <h2 className="mt-4 text-3xl font-semibold">Warm reviews from boutique buyers</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">A premium layout for brands that value craftsmanship, storytelling, and detail-driven design.</p>
          </div>
          {[
            {
              quote: 'The page has a warm, handcrafted feel that makes luxury accessories feel personal.',
              author: 'Nora W.',
            },
            {
              quote: 'Elegant spacing, beautiful imagery, and a premium editorial aesthetic.',
              author: 'Simone L.',
            },
          ].map((item) => (
            <div key={item.author} className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
              <p className="text-lg leading-8 text-slate-900">{"\"" + item.quote + "\""}</p>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-500">{item.author}</p>
            </div>
          ))}
        </div>
      </section>

      <TemplatePreviewMeta template={template} />

      <footer className="border-t border-amber-200 bg-amber-50 px-6 py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {template.name}</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="transition hover:text-slate-950">About</a>
            <a href="#" className="transition hover:text-slate-950">Contact</a>
            <a href="#" className="transition hover:text-slate-950">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArcadiaTemplate;
