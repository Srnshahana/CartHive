import React from 'react';
import TemplateCard from './TemplateCard';

const TemplateGrid = ({
  templates,
  onFavoriteToggle,
  onViewDemo,
  onAddTemplate,
  onActivateTemplate,
}) => {
  if (!templates.length) {
    return (
      <div className="rounded-[32px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
        <p className="text-base font-semibold text-slate-700">No templates match your search.</p>
        <p className="mt-2 text-sm text-slate-500">Try a new keyword or clear the category filter.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onFavoriteToggle={onFavoriteToggle}
          onViewDemo={onViewDemo}
          onAddTemplate={onAddTemplate}
          onActivateTemplate={onActivateTemplate}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
