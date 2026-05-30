import React from 'react';
import { Smile } from 'lucide-react';

const TemplateEmptyState = ({ title, description }) => (
  <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-sm">
    <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
      <Smile className="h-8 w-8" />
    </div>
    <div className="mt-6 space-y-3">
      <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto max-w-sm text-sm leading-6 text-slate-500">{description}</p>
    </div>
  </div>
);

export default TemplateEmptyState;
