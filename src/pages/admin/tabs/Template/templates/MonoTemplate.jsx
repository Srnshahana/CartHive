import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';

const MonoTemplate = ({ template, onApply }) => {
  return (
    <div className="w-full bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-xl font-semibold">{template.name}</div>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#" className="hover:text-slate-950">Collections</a>
            <a href="#" className="hover:text-slate-950">Jewelry</a>
            <a href="#" className="hover:text-slate-950">Minimal</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200">
              <Heart className="h-4 w-4" />
            </button>
            <button onClick={onApply} className="rounded-full border border-slate-300 bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Apply
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Minimal Jewelry Store</span>
              <h1 className="text-5xl font-semibold leading-tight text-slate-950">Clean, refined jewelry with modern polish</h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                A minimal storefront built around premium product imagery, quiet luxury details, and elegant whitespace.
              </p>
              <button onClick={onApply} className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Preview Collection
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&w=900&q=80',
              ].map((src, index) => (
                <div key={index} className="overflow-hidden rounded-[28px] bg-white shadow-sm transition hover:-translate-y-1">
                  <img src={src} alt={`Minimal jewelry ${index + 1}`} className="h-72 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {[1, 2, 3].map((product) => (
            <div key={product} className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=900&q=80`} alt={`Product ${product}`} className="h-96 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute right-4 top-4 rounded-full bg-white/90 p-3 text-slate-950 shadow-sm">
                  <ShoppingBag className="h-4 w-4" />
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Best Seller</p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">Minimal Ring {product}</h3>
                <p className="mt-3 text-sm text-slate-600">A subtle shape with luxurious finishing and everyday polish.</p>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-slate-950">
                  <span>$180</span>
                  <button className="rounded-full bg-slate-950 px-4 py-2 text-white transition hover:bg-slate-800">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Our Craft</p>
              <h2 className="mt-4 text-3xl font-semibold">Quiet luxury for modern wardrobes</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">Designed to feel minimal and luxurious across editorial collections, lookbooks, and shoppable campaigns.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Classic', 'Modern', 'Bridal', 'Everyday'].map((label) => (
                <div key={label} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{label}</p>
                  <h3 className="mt-4 text-xl font-semibold">{label} Edit</h3>
                  <p className="mt-3 text-sm text-slate-300">Subtle styling for premium product focus.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {template.name}</p>
          <a href="#" className="text-slate-500 transition hover:text-slate-950">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default MonoTemplate;
