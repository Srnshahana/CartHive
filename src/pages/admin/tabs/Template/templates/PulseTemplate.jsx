import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const PulseTemplate = ({ template, onApply }) => {
  return (
    <div className="w-full bg-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold tracking-[0.18em] uppercase">{template.name}</div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#" className="transition hover:text-white">Shop</a>
            <a href="#" className="transition hover:text-white">Streetwear</a>
            <a href="#" className="transition hover:text-white">Sale</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-white/10 p-3 text-slate-200 transition hover:bg-white/20">
              <Heart className="h-4 w-4" />
            </button>
            <button onClick={onApply} className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Launch
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-6 text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.35em] text-cyan-300">Gen-Z Fashion</span>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">The Next Chapter in Street Style</h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 lg:mx-0">
                Bold campaign imagery, runway-ready drops, and modern shopping experiences for an influencer-approved storefront.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <button className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                  Shop New Drop
                </button>
                <button onClick={onApply} className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                  Preview Theme
                </button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1495121605193-b116b5b9c5c6?auto=format&w=900&q=80',
              ].map((src, index) => (
                <div key={src} className="group overflow-hidden rounded-[28px] bg-slate-900 transition hover:-translate-y-1">
                  <img src={src} alt={`Street style ${index + 1}`} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Hot drop</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Bestsellers for the season</h2>
          </div>
          <button className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            View Collection
          </button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              name: 'Wave Jacket',
              price: '$198',
              image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&w=900&q=80',
              badge: 'New',
            },
            {
              name: 'Neon Knit',
              price: '$128',
              image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5c6?auto=format&w=900&q=80',
              badge: 'Trending',
            },
            {
              name: 'Cargo Trousers',
              price: '$112',
              image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=900&q=80',
              badge: 'Sale',
            },
          ].map((product) => (
            <div key={product.name} className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img src={product.image} alt={product.name} className="h-96 w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">{product.badge}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">{product.name}</h3>
                    <p className="mt-2 text-sm text-slate-500">Effortless style with bold attitude.</p>
                  </div>
                  <button className="rounded-full bg-slate-950 p-3 text-white transition hover:bg-slate-800">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-slate-950">
                  <span>{product.price}</span>
                  <button className="rounded-full bg-cyan-500 px-4 py-2 text-white transition hover:bg-cyan-400">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {['Street Style Gallery', 'Weekly Exclusives', 'Customer Favorites'].map((item) => (
              <div key={item} className="rounded-[28px] border border-white/10 bg-slate-950/70 p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{item}</p>
                <h3 className="mt-4 text-2xl font-semibold">{item}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">Curated editorial content for an energetic fashion brand presence.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-sm text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {template.name}</p>
          <div className="flex flex-wrap gap-4 text-slate-500">
            <a href="#" className="transition hover:text-white">About</a>
            <a href="#" className="transition hover:text-white">Contact</a>
            <a href="#" className="transition hover:text-white">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PulseTemplate;
