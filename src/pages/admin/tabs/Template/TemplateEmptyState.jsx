import React from 'react';
import { Smile } from 'lucide-react';

const TemplateEmptyState = ({ title, description }) => (
  <div style={{ background: 'white', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '4rem 2rem', textAlign: 'center' }}>
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: '#f8fafc', color: '#94a3b8', marginBottom: '1.25rem' }}>
      <Smile size={28} strokeWidth={1.5} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', color: '#334155' }}>{title}</h3>
      <p style={{ maxWidth: '420px', margin: '0 auto', fontSize: '0.9rem', color: '#64748b', lineHeight: '1.7' }}>{description}</p>
    </div>
  </div>
);

export default TemplateEmptyState;
