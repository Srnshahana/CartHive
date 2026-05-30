import React from 'react';

const LumenTemplate = ({ template, onApply }) => {
  return (
    <div className="w-full bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Modern Fashion</p>
            <div className="text-2xl font-semibold">{template.name}</div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <a href="#" className="transition hover:text-slate-900">Collections</a>
            <a href="#" className="transition hover:text-slate-900">Shop</a>
            <a href="#" className="hidden transition hover:text-slate-900 md:inline">Journal</a>
          </div>
          <button onClick={onApply} className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Try Theme
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-100 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-700">Bold New Arrivals</p>
              <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
                Modern dressing for the everyday woman
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Elegant editorial storytelling with smooth product flows, vibrant hero campaigns, and refined spacing.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
                  Shop New In
                </button>
                <button onClick={onApply} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50">
                  Preview Theme
                </button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&w=900&q=80',
                'https://images.unsplash.com/photo-1495121605193-b116b5b9c5c6?auto=format&w=900&q=80',
              ].map((src, index) => (
                <div key={index} className="group overflow-hidden rounded-[28px] bg-white shadow-xl transition hover:-translate-y-1">
                  <img
                    src={src}
                    alt={`Look ${index + 1}`}
                    className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr] lg:items-center">
          <div className="rounded-[32px] bg-slate-950 p-10 text-white shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Trend Report</p>
            <h2 className="mt-6 text-3xl font-semibold">Summer silhouettes with bold jewel tones</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Showcase new collections through editorial blocks, editorial imagery, and crisp product cards.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {['Suits', 'Dresses', 'Outerwear', 'Accessories'].map((category) => (
              <div key={category} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{category}</span>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">{category}</h3>
                <p className="mt-3 text-sm text-slate-600">Handpicked pieces for everyday elegance.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {['New Arrivals', 'Best Sellers', 'Gift Picks'].map((label) => (
              <div key={label} className="rounded-[28px] border border-white/10 bg-white/5 p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">{label}</p>
                <h3 className="mt-4 text-2xl font-semibold">{label}</h3>
                <p className="mt-3 text-sm text-slate-300">A premium curated capsule for your brand story.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Customer favorites</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Loved by modern shoppers</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">A polished experience that supports fast browsing, editorial stories, and elevated brand trust.</p>
          </div>
          <div className="grid gap-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
                <img
                  src={`https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=900&q=80`}
                  alt={`Trend ${index}`}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-700">Trend</p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-950">Trend story {index}</h3>
                  <p className="mt-2 text-sm text-slate-600">Eye-catching editorial styling for modern wardrobes.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/10 bg-white px-6 py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {template.name}.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="transition hover:text-slate-900">About</a>
            <a href="#" className="transition hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LumenTemplate;
