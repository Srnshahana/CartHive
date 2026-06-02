import React from 'react';
import TemplateCard from './TemplateCard';

const TemplateGrid = ({
  templates,
  onFavoriteToggle,
  onViewDemo,
  onAddTemplate,
  onActivateTemplate,
  onCustomize,
  onDelete
}) => {
  if (!templates.length) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', background: '#f8fafc', border: '2px dashed #e2e8f0', borderRadius: '32px' }}>
        <p style={{ fontSize: '1rem', fontWeight: '600', color: '#334155' }}>No templates match your search.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>Try a new keyword or clear the category filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onFavoriteToggle={onFavoriteToggle}
          onViewDemo={onViewDemo}
          onAddTemplate={onAddTemplate}
          onActivateTemplate={onActivateTemplate}
          onCustomize={onCustomize}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
