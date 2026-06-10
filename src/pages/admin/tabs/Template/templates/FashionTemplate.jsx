import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import TemplatePreviewMeta from '../TemplatePreviewMeta';

export const FashionTemplate = ({ template, onApply }) => {
  return (
    <div className="w-full bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-semibold tracking-[0.22em] uppercase">{template.name}</div>
          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.2em] text-slate-600 md:flex">
            <a href="#" className="transition hover:text-slate-900">New In</a>
            <a href="#" className="transition hover:text-slate-900">Dresses</a>
            <a href="#" className="transition hover:text-slate-900">Accessories</a>
            <a href="#" className="transition hover:text-slate-900">Sale</a>
          </nav>
          <div className="flex items-center gap-3 text-slate-700">
            <button className="rounded-full bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200">
              <ShoppingBag className="h-4 w-4" />
            </button>
            <button onClick={onApply} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Try Theme
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="grid min-h-[85vh] grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative flex flex-col justify-center gap-6 px-6 py-16 lg:px-16 lg:py-24">
            <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Luxury Fashion Boutique</span>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">{template.hero_heading || 'Modern runway silhouettes for a couture wardrobe'}</h1>
            <p className="max-w-xl text-base leading-8 text-slate-300">
              {template.hero_subtext || 'Model-led hero imagery, premium product cards, and elevated editorial sections built for a fashion-first storefront.'}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
                Shop New Arrivals
              </button>
              <button onClick={onApply} className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                Preview Theme
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <img
              src={template.hero_image || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=1200&q=80'}
              alt={template.hero_heading || 'Fashion model'}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/90" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-600">Trend edit</p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-950">Luxury sqsd pieces with editorial polish</h2>
          </div>
          <button onClick={onApply} className="self-start rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
            Apply Collection
          </button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Statement Dresses',
              subtitle: 'Soft tailoring, bold silhouettes',
              image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5c6?auto=format&w=900&q=80',
            },
            {
              title: 'Fine Leather Bags',
              subtitle: 'Handcrafted, structured shapes',
              image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&w=900&q=80',
            },
            {
              title: 'Evening Jewelry',
              subtitle: 'Refined finishes and shine',
              image: 'https://images.unsplash.com/photo-1530814560892-5f1baa4eb665?auto=format&w=900&q=80',
            },
          ].map((item) => (
            <a key={item.title} href="#" className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-600">{item.subtitle}</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">{item.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
                <img
                  src={`https://images.unsplash.com/photo-1519741495033-1fdfd184f54b?auto=format&w=900&q=80`}
                  alt={`Accessory ${index}`}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Accessory</span>
                    <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-600">New</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">Handbag {index}</h3>
                  <p className="mt-3 text-sm text-slate-600">Premium leather, refined finishes, and editorial details.</p>
                  <div className="mt-6 flex items-center justify-between text-sm font-semibold text-slate-950">
                    <span>$320</span>
                    <button className="rounded-full bg-slate-950 px-4 py-2 text-white transition hover:bg-slate-800">Add to bag</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Reviews</p>
            <h2 className="mt-4 text-3xl font-semibold">Loved by style insiders</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Editorial-worthy design and a premium shopping experience for luxury fashion brands.</p>
          </div>
          {[
            {
              quote: 'The imagery feels editorial and elevated — exactly the luxury boutique look we needed.',
              name: 'Ava R.',
            },
            {
              quote: 'A beautiful layout with space for hero storytelling and product curation.',
              name: 'Maya L.',
            },
          ].map((review) => (
            <div key={review.name} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-amber-600">
                <Star className="h-5 w-5" />
                <span className="text-sm uppercase tracking-[0.35em]">5.0</span>
              </div>
              <p className="mt-5 text-lg leading-8 text-slate-900">{"\"" + review.quote + "\""}</p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{review.name}</p>
            </div>
          ))}
        </div>
      </section>

      <TemplatePreviewMeta template={template} />

      <footer className="border-t border-slate-200 bg-slate-950 px-6 py-10 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {template.name}. All rights reserved.</p>
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

export default FashionTemplate;
