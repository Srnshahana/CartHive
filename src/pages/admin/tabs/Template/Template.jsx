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

const STORAGE_KEY = 'carthive_template_library_v1';
const RECENT_KEY = 'carthive_templates_recently_viewed';

const Template = ({ homeConfig, applyTemplate }) => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(() => {
    if (typeof window === 'undefined') return initialTemplates;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTemplates;
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

  const installedTemplates = useMemo(() => templates.filter((template) => template.installed), [templates]);
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
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="relative block overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search templates"
            className="w-full border-none bg-transparent px-12 py-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </label>

        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Filter</p>
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

      <section className="grid gap-8 xl:grid-cols-[1.95fr_0.95fr]">
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
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{filteredTemplates.length} templates</div>
              </div>

              {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-96 animate-pulse rounded-[28px] bg-slate-100" />
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
                <div className="mt-6">
                  <TemplateEmptyState title="No templates found" description="Try updating your search terms, clearing the filter, or selecting another category." />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Installed templates</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">Your active store designs</h3>
                </div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{installedTemplates.length} installed</span>
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

        <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl">
          <div className="rounded-[28px] bg-slate-950 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Boost your workflow</p>
            <h2 className="mt-4 text-2xl font-semibold">My templates dashboard</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Quick access to favorites, installed themes, and recently viewed designs from your template marketplace.</p>
          </div>

          <div className="space-y-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Favorites</p>
              <span className="text-sm font-semibold text-slate-700">{favoriteTemplates.length}</span>
            </div>
            <div className="space-y-3">
              {favoriteTemplates.length ? (
                favoriteTemplates.slice(0, 3).map((template) => (
                  <div key={template.id} className="rounded-3xl bg-white p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{template.name}</p>
                        <p className="text-xs text-slate-500">{template.author}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openDemo(template.id)}
                        className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-500">No favorites yet. Tap the heart icon on any template card to save your top picks.</p>
              )}
            </div>
          </div>

          <div className="space-y-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Recently viewed</p>
              <span className="text-sm font-semibold text-slate-700">{recentTemplates.length}</span>
            </div>
            <div className="space-y-3">
              {recentTemplates.length ? (
                recentTemplates.map((template) => (
                  <div key={template.id} className="rounded-3xl bg-white p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{template.name}</p>
                        <p className="text-xs text-slate-500">{template.category}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openDemo(template.id)}
                        className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-500">Your preview history will appear here once you explore templates.</p>
              )}
            </div>
          </div>
        </aside>
      </section>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-3xl bg-slate-950 px-5 py-4 text-sm text-white shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Template;
