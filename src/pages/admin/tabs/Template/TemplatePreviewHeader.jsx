import React from 'react';

const TemplatePreviewHeader = ({ template }) => {
  return (
    <div className="mx-auto mb-6 max-w-7xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl">
      <div className="relative h-80 sm:h-[34rem]">
        <img
          src={template.hero_image || template.image}
          alt={template.hero_heading || template.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/50" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 text-white sm:px-12">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-200">Store hero</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
            {template.hero_heading || template.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
            {template.hero_subtext || 'A full homepage hero section that introduces the brand and highlights the store story.'}
          </p>
        </div>
      </div>

      <div className="grid gap-4 border-t border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Banner</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">{template.banner_title || 'Banner title'}</h2>
          <p className="mt-1 text-sm text-slate-600">{template.banner_subtitle || 'Banner subtitle goes here.'}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Ticker</p>
          <p className="mt-2 text-sm text-slate-700">{template.ticker_text || 'Example announcement text to keep customers informed.'}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Support</p>
          <p className="mt-2 text-sm text-slate-700">{template.support_email || 'support@example.com'}</p>
          <p className="text-sm text-slate-700">{template.support_phone || '+1 123 456 7890'}</p>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewHeader;
