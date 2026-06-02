import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  Star,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import TemplateGrid from './TemplateGrid';
import TemplateEmptyState from './TemplateEmptyState';
import { initialTemplates, TEMPLATE_CATEGORIES } from './templateData';
import './Template.css';

const STORAGE_KEY = 'carthive_template_library_v1';
const RECENT_KEY = 'carthive_templates_recently_viewed';

const Template = ({ homeConfig, applyTemplate }) => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(() => {
    if (typeof window === 'undefined') return initialTemplates;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialTemplates;
    try {
      const parsed = JSON.parse(stored);
      return parsed.map(t => ({
        ...t,
        image: initialTemplates.find(it => it.id === t.id)?.image || t.image,
        category: initialTemplates.find(it => it.id === t.id)?.category || t.category
      }));
    } catch {
      return initialTemplates;
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [activeView, setActiveView] = useState('discover');
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(window.localStorage.getItem(RECENT_KEY) || '[]');
  });
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.origin) return;
      if (event.data?.type !== 'CarthiveTemplateApplied') return;
      const templateId = event.data.templateId;
      activateTemplate(templateId, true);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [templates]);

  const saveTemplates = (next) => {
    setTemplates(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const updateRecentItems = (id) => {
    const updated = [id, ...recentlyViewed.filter((item) => item !== id)].slice(0, 6);
    setRecentlyViewed(updated);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        template.name.toLowerCase().includes(query) ||
        template.author.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesCategory = categoryFilter === 'All' || template.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [templates, searchQuery, categoryFilter]);

  const installedTemplates = useMemo(() => filteredTemplates.filter((template) => template.installed), [filteredTemplates]);
  const favoriteTemplates = useMemo(() => templates.filter((template) => template.favorite), [templates]);
  const recentTemplates = useMemo(
    () => recentlyViewed.map((id) => templates.find((template) => template.id === id)).filter(Boolean),
    [recentlyViewed, templates],
  );

  const setActiveTemplate = (id, silent = false) => {
    const next = templates.map((template) => ({
      ...template,
      active: template.id === id,
      installed: template.id === id ? true : template.installed,
    }));
    saveTemplates(next);
    const selected = next.find((item) => item.id === id);
    if (selected && !silent) {
      applyTemplate(selected);
      setToast(`Activated ${selected.name}.`);
      window.setTimeout(() => setToast(''), 2500);
    }
  };

  const addTemplate = (id) => {
    const next = templates.map((template) =>
      template.id === id ? { ...template, installed: true } : template,
    );
    saveTemplates(next);
    const selected = next.find((template) => template.id === id);
    applyTemplate(selected);
    setToast(`${selected.name} was added to My Templates.`);
    window.setTimeout(() => setToast(''), 2500);
  };

  const activateTemplate = (id, silent = false) => {
    setActiveTemplate(id, silent);
    if (!silent) {
      setToast('Template is now active.');
      window.setTimeout(() => setToast(''), 2500);
    }
  };

  const toggleFavorite = (id) => {
    const next = templates.map((template) =>
      template.id === id ? { ...template, favorite: !template.favorite } : template,
    );
    saveTemplates(next);
  };

  const deleteTemplate = (id) => {
    const next = templates.map((template) =>
      template.id === id ? { ...template, installed: false, active: false } : template,
    );
    saveTemplates(next);
    setToast('Template removed from installed templates.');
    window.setTimeout(() => setToast(''), 2500);
  };

  const openDemo = (id) => {
    updateRecentItems(id);
    const url = `${window.location.origin}/admin/templates/preview/${id}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div style={{ margin: '-3rem -4%', padding: '3rem 4%', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Template Library</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>Discover new designs or manage your installed storefront templates.</p>
      </div>

      {/* Tabs Header */}
      <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid #e2e8f0', marginBottom: '2rem' }}>
        <button
          type="button"
          onClick={() => setActiveView('discover')}
          style={{
            background: 'none', border: 'none', 
            fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
            color: activeView === 'discover' ? '#0f172a' : '#94a3b8',
            borderBottom: activeView === 'discover' ? '2px solid #0f172a' : '2px solid transparent',
            paddingBottom: '0.75rem', marginBottom: '-2px', transition: 'all 0.2s ease'
          }}
        >
          Discover
        </button>
        <button
          type="button"
          onClick={() => setActiveView('installed')}
          style={{
            background: 'none', border: 'none', 
            fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
            color: activeView === 'installed' ? '#0f172a' : '#94a3b8',
            borderBottom: activeView === 'installed' ? '2px solid #0f172a' : '2px solid transparent',
            paddingBottom: '0.75rem', marginBottom: '-2px', transition: 'all 0.2s ease'
          }}
        >
          My Templates
        </button>
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
        <div style={{ flex: '1 1 300px', position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', flexWrap: 'wrap' }}>
          {TEMPLATE_CATEGORIES.slice(0, 6).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setCategoryFilter(category)}
              style={{
                padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s ease',
                background: categoryFilter === category ? '#0f172a' : 'transparent',
                color: categoryFilter === category ? 'white' : '#64748b',
                border: categoryFilter === category ? '1px solid #0f172a' : '1px solid transparent'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Area */}
      <div>
        {activeView === 'discover' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>
                {filteredTemplates.length} templates
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} style={{ height: '24rem', borderRadius: '28px', backgroundColor: '#f1f5f9', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                ))}
              </div>
            ) : (
              <TemplateGrid
                templates={filteredTemplates}
                onFavoriteToggle={toggleFavorite}
                onViewDemo={openDemo}
                onAddTemplate={addTemplate}
                onActivateTemplate={activateTemplate}
              />
            )}

            {!loading && filteredTemplates.length === 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <TemplateEmptyState title="No templates found" description="Try updating your search terms, clearing the filter, or selecting another category." />
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#64748b' }}>Installed templates</p>
                <h3 style={{ marginTop: '0.5rem', fontSize: '1.25rem', fontWeight: '600', color: '#020617' }}>Your active store designs</h3>
              </div>
              <span style={{ borderRadius: '9999px', backgroundColor: '#f1f5f9', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>{installedTemplates.length} installed</span>
            </div>

            {installedTemplates.length === 0 ? (
              <TemplateEmptyState
                title="No installed templates yet"
                description="Install templates from the marketplace to access active theme tools, preview options, and customization actions."
              />
            ) : (
              <TemplateGrid
                templates={installedTemplates}
                onFavoriteToggle={toggleFavorite}
                onViewDemo={openDemo}
                onAddTemplate={addTemplate}
                onActivateTemplate={activateTemplate}
                onCustomize={() => navigate('/admin/home_screen')}
                onDelete={deleteTemplate}
              />
            )}
          </div>
        )}
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50, borderRadius: '1.5rem', background: '#020617', padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'white', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
          {toast}
        </div>
      )}
    </div>
  );
};

export default Template;
