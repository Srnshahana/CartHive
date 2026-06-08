import React from 'react';
import { Star } from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';

const NovaTemplate = ({ template, onApply }) => {
  return (
    <div className="w-full bg-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-[0.2em] uppercase text-white">{template.name}</div>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#" className="hover:text-white">Fine Jewelry</a>
            <a href="#" className="hover:text-white">Editorial</a>
            <a href="#" className="hover:text-white">Lookbook</a>
          </div>
          
        </div>
      </header>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_40%)]">
        <div className="grid min-h-[85vh] grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-16 lg:px-16">
            <span className="text-xs uppercase tracking-[0.4em] text-slate-300">Luxury Jewelry</span>
            <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              {template.hero_heading || 'Rare pieces for the modern collector'}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
              {template.hero_subtext || 'Curated jewelry sets with an editorial edge, polished for premium e-commerce and luxury retail.'}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90">
                Shop Collection
              </button>
              <button onClick={onApply} className="rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Preview Theme
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&w=1200&q=80"
              alt="Jewelry showcase"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Featured Drop</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">The Midnight Capsule</h2>
              </div>
              <span className="rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950">
                New
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Ring', 'Necklace', 'Bracelet', 'Earrings'].map((item) => (
                <div key={item} className="group overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-white/20">
                  <div className="aspect-square overflow-hidden rounded-3xl bg-slate-800">
                    <img src={`https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=900&q=80`} alt={item} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-white">{item} Set</h3>
                      <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-rose-300">Best Seller</span>
                    </div>
                    <p className="text-sm leading-6 text-slate-400">Highly polished metal paired with bold gemstone accents.</p>
                    <div className="flex items-center justify-between text-sm font-semibold text-white">
                      <span>$420</span>
                      <button className="rounded-full bg-white/10 px-3 py-2 text-slate-100 transition hover:bg-white/20">Wishlist</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10">
            <div className="space-y-6">
              <div className="rounded-3xl bg-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Handpicked Edit</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">Fine Jewelry Stories</h3>
                <p className="mt-3 text-slate-300">Timeless silhouettes, innovative materials, and editorial mood boards for elevated storefronts.</p>
              </div>
              <div className="grid gap-4">
                {['Classic', 'Bridal', 'Statement'].map((tag) => (
                  <div key={tag} className="rounded-3xl bg-slate-900/90 p-5">
                    <span className="text-xs uppercase tracking-[0.35em] text-slate-400">{tag}</span>
                    <p className="mt-3 text-xl font-semibold text-white">{tag} Style</p>
                    <p className="mt-2 text-sm text-slate-400">Perfect for editorial campaigns and premium shopping experiences.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {['New Arrivals', 'Best Sellers', 'Gift Picks'].map((label) => (
              <div key={label} className="rounded-[28px] border border-white/10 bg-white/5 p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-200">{label}</p>
                <h3 className="mt-4 text-2xl font-semibold">{label}</h3>
                <p className="mt-3 text-sm text-slate-300">A premium curated capsule for your brand story.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-10 text-white shadow-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Customer Love</p>
            <h2 className="mt-4 text-3xl font-semibold">Reviews from high-end buyers</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">A premium layout for brands that value craftsmanship, storytelling, and detail-driven design.</p>
          </div>
          {[
            {
              quote: 'The page has a rich luxury feel with a refined product showcase.',
              author: 'Nina F.',
            },
            {
              quote: 'Elegant and editorial, exactly what we needed for our jewelry boutique.',
              author: 'Elias M.',
            },
          ].map((review) => (
            <div key={review.author} className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
              <div className="flex items-center gap-3 text-amber-500">
                <Star className="h-5 w-5" />
                <span className="text-sm uppercase tracking-[0.35em]">5.0</span>
              </div>
              <p className="mt-5 text-lg leading-8 text-slate-900">{"\"" + review.quote + "\""}</p>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-500">{review.author}</p>
            </div>
          ))}
        </div>
      </section>

      <TemplatePreviewMeta template={template} />

      <footer className="border-t border-white/10 bg-slate-950 px-6 py-10 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>{"\"" + template.name + "\""} by {new Date().getFullYear()}</p>
          <div className="flex flex-wrap gap-4 text-slate-500">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NovaTemplate;
