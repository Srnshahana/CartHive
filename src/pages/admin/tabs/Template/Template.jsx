import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  Star,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { supabase } from '../../../../lib/supabase';
import TemplateGrid from './TemplateGrid';
import TemplateEmptyState from './TemplateEmptyState';
import { initialTemplates, TEMPLATE_CATEGORIES } from './templateData';
import { TEMPLATE_CATEGORIES as templateCategoryDefaults } from './templateData';

const STORAGE_KEY = 'carthive_template_library_v1';
const RECENT_KEY = 'carthive_templates_recently_viewed';

const Template = ({ homeConfig, applyTemplate }) => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(() => {
    if (typeof window === 'undefined') return templateDesigns;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTemplates;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [templateCategories, setTemplateCategories] = useState(templateCategoryDefaults);
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

  useEffect(() => {
    const fetchTemplateCategories = async () => {
      try {
        const { data, error } = await supabase.from('template_categories').select('*');
        if (!error && data?.length) {
          setTemplateCategories(data);
        }
      } catch (err) {
        console.warn('Unable to load template categories from Supabase, using defaults.', err);
      }
    };

    fetchTemplateCategories();
  }, []);

  const categoryOptions = useMemo(() => {
    const names = templateCategories.length
      ? templateCategories.map((category) => category.name)
      : templateCategoryDefaults.map((category) => category.name);
    return ['All', ...Array.from(new Set(names))];
  }, [templateCategories]);

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
    <div style={{ width: '100%', minHeight: '100vh' }}>
      {/* Page Header */}
      {/* <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Template Library</h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>Discover new designs or manage your installed storefront templates.</p>
      </div> */}

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
      <div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginBottom: '2rem',
  background: 'white',
  padding: '1rem',
  borderRadius: '20px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
}}>
        <div
  style={{
    width: '100%',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  }}
>
  <div style={{ width: '100%', position: 'relative' }}>
    <Search
      style={{
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#94a3b8',
      }}
      size={18}
    />

    <input
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
      placeholder="Search templates"
      className="w-full border-none bg-transparent px-12 py-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
    />
  </div>
</div>

        <div style={{ width: '100%' }} className="rounded-3xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">Category</h2>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {TEMPLATE_CATEGORIES.slice(0, 6).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryFilter(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${categoryFilter === category ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="grid gap-8 xl:grid-cols-1">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex h-14 rounded-full border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setActiveView('discover')}
                className={`rounded-full px-5 text-sm font-semibold transition ${activeView === 'discover' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Discover
              </button>
              <button
                type="button"
                onClick={() => setActiveView('installed')}
                className={`rounded-full px-5 text-sm font-semibold transition ${activeView === 'installed' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                My Templates
              </button>
            </div>
          </div>

          {activeView === 'discover' ? (
            <div>
              

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
                <div className="space-y-4">
                  {installedTemplates.map((template) => (
                    <div key={template.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Star className="h-4 w-4 text-amber-400" />
                            <span>{template.category}</span>
                          </div>
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                            <div>
                              <h4 className="text-xl font-semibold text-slate-950">{template.name}</h4>
                              <p className="text-sm text-slate-600">By {template.author}</p>
                            </div>
                            {template.active && (
                              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">
                                <CheckCircle2 className="h-4 w-4" /> Active template
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <button
                            type="button"
                            onClick={() => openDemo(template.id)}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            Preview
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate('/admin/home_screen')}
                            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                          >
                            Customize
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTemplate(template.id)}
                            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </section>

      {toast && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50, borderRadius: '1.5rem', background: '#020617', padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'white', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
          {toast}
        </div>
      )}
    </div>
  );
};

export default Template;
