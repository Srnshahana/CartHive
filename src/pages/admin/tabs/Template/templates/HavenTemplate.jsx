import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';

const HavenTemplate = ({ template, onApply }) => {
  return (
    <div className="w-full bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.35em] text-rose-500">Premium Bridal Collection</p>
            <div className="text-2xl font-semibold">{template.name}</div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#" className="transition hover:text-slate-950">Bridal</a>
            <a href="#" className="transition hover:text-slate-950">Evening</a>
            <a href="#" className="transition hover:text-slate-950">Accessories</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200">
              <ShoppingBag className="h-4 w-4" />
            </button>
            <button onClick={onApply} className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-rose-600">
              Apply Theme
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-rose-500">New arrivals</p>
              <h1 className="text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl">{template.hero_heading || 'Bridal looks with soft luxurious detail'}</h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                {template.hero_subtext || 'High-end imagery, layered hero banners, and elegant collection cards designed for fashion boutiques and bridal studios.'}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Explore Dresses
                </button>
                <button onClick={onApply} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50">
                  Preview Theme
                </button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&w=900&q=80',
              ].map((src, index) => (
                <div key={index} className="overflow-hidden rounded-[28px] bg-white shadow-lg transition hover:-translate-y-1">
                  <img src={src} alt={`Bridal ${index + 1}`} className="h-80 w-full object-cover transition duration-500 group-hover:scale-105" />
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
              name: 'Silk Gown',
              price: '$1,250',
              image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&w=900&q=80',
              badge: 'Bridal',
            },
            {
              name: 'Pearl Drop',
              price: '$420',
              image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&w=900&q=80',
              badge: 'New',
            },
            {
              name: 'Lace Veil',
              price: '$220',
              image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&w=900&q=80',
              badge: 'Limited',
            },
          ].map((product) => (
            <div key={product.name} className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img src={product.image} alt={product.name} className="h-96 w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">{product.badge}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-950">{product.name}</h3>
                <p className="mt-3 text-sm text-slate-600">Refined textures and romantic craftsmanship.</p>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-slate-950">
                  <span>{product.price}</span>
                  <button className="rounded-full bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-600">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-rose-500">Editorial Lookbook</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">Bridal storyboards that feel cinematic</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">Every section is designed to highlight premium fabrics, romantic silhouettes, and luxury craftsmanship.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&w=900&q=80',
              ].map((src, index) => (
                <div key={index} className="overflow-hidden rounded-[28px] bg-white shadow-lg transition hover:-translate-y-1">
                  <img src={src} alt={`Editorial ${index + 1}`} className="h-72 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TemplatePreviewMeta template={template} />

      <footer className="border-t border-slate-200 bg-white px-6 py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {template.name}</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="transition hover:text-rose-600">About</a>
            <a href="#" className="transition hover:text-rose-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HavenTemplate;
