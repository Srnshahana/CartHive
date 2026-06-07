import React from 'react';
import { Heart, Eye, Plus, CheckCircle, Sparkles } from 'lucide-react';

const TemplateCard = ({
  template,
  onFavoriteToggle,
  onViewDemo,
  onAddTemplate,
  onActivateTemplate,
}) => {
  const installed = template.installed;
  const active = template.active;

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-56 bg-slate-100">
        <img src={template.image} alt={template.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <button
          type="button"
          aria-label="Favorite template"
          onClick={() => onFavoriteToggle(template.id)}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <Heart className={`h-5 w-5 ${template.favorite ? 'text-rose-500' : 'text-slate-400'}`} />
        </button>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
            {template.category}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
            {active ? 'Active' : installed ? 'Installed' : 'Available'}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">{template.name}</h3>
            {template.store_name && (
              <p className="mt-1 text-sm font-medium text-slate-700">{template.store_name}</p>
            )}
            <p className="mt-2 text-sm text-slate-500">by {template.author}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onViewDemo(template.id)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Eye className="h-4 w-4" /> View Demo
          </button>
          <button
            type="button"
            onClick={() => (installed ? onActivateTemplate(template.id) : onAddTemplate(template.id))}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${installed ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
          >
            {installed ? (
              <>
                <CheckCircle className="h-4 w-4" /> Activate
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Add Template
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default TemplateCard;
