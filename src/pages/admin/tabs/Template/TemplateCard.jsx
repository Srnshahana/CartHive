import React from 'react';
import { Heart, Eye, Plus, CheckCircle, Settings, Trash2 } from 'lucide-react';

const TemplateCard = ({
  template,
  onFavoriteToggle,
  onViewDemo,
  onAddTemplate,
  onActivateTemplate,
  onCustomize,
  onDelete
}) => {
  const installed = template.installed;
  const active = template.active;

  return (
    <article className="category-card-screenshot" style={{ boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 0 3px rgba(0,0,0,0.02)' }}>
      <div className="category-image-container" style={{ position: 'relative', marginBottom: '1rem', aspectRatio: 'auto', width: '100%' }}>
        <img src={template.image} alt={template.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
        <button
          type="button"
          onClick={() => onFavoriteToggle(template.id)}
          style={{
            position: 'absolute', right: '12px', top: '12px', 
            background: 'white', border: 'none', borderRadius: '50%', 
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        >
          <Heart size={18} color={template.favorite ? '#ef4444' : '#94a3b8'} fill={template.favorite ? '#ef4444' : 'none'} />
        </button>
      </div>
      
      <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b' }}>
            {template.category}
          </span>
          <span style={{ 
            fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em',
            padding: '4px 8px', borderRadius: '20px',
            background: active ? '#dcfce7' : '#f1f5f9',
            color: active ? '#166534' : '#64748b'
          }}>
            {active ? 'Active' : installed ? 'Installed' : 'Available'}
          </span>
        </div>

<div className="space-y-3">
  <div>
    <h3 className="text-xl font-semibold tracking-tight text-slate-900">
      {template.name}
    </h3>
    {template.store_name && (
      <p className="mt-1 text-sm font-medium text-slate-700">
        {template.store_name}
      </p>
    )}
    <p className="mt-2 text-sm text-slate-500">
      by {template.author}
    </p>
  </div>
</div>

<div style={{ display: 'flex', gap: '8px', marginTop: 'auto', flexWrap: 'wrap' }}>
  {!active && (
    <button
      type="button"
      onClick={() => onViewDemo(template.id)}
      style={{
        flex: 1,
        minWidth: '80px',
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '8px',
        fontSize: '0.8rem',
        fontWeight: '600',
        color: '#334155',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }}
    >
      <Eye size={14} /> Preview
    </button>
  )}

  {active && onCustomize && (
    <button
      type="button"
      onClick={() => onCustomize()}
      className="btn-shop-dark"
      style={{
        flex: 1,
        minWidth: '80px',
        borderRadius: '12px',
        padding: '8px',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }}
    >
      <Settings size={14} /> Customize
    </button>
  )}


          {!installed && (
            <button
              type="button"
              onClick={() => onAddTemplate(template.id)}
              className="btn-shop-dark"
              style={{ flex: 1, minWidth: '80px', borderRadius: '12px', padding: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Plus size={14} /> Install
            </button>
          )}

          {installed && !active && (
            <button
              type="button"
              onClick={() => onActivateTemplate(template.id)}
              className="btn-shop-dark"
              style={{ flex: 1, minWidth: '80px', borderRadius: '12px', padding: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <CheckCircle size={14} /> Activate
            </button>
          )}

          {installed && !active && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(template.id)}
              style={{ flex: 1, minWidth: '80px', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '8px', fontSize: '0.8rem', fontWeight: '600', color: '#be123c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default TemplateCard;
