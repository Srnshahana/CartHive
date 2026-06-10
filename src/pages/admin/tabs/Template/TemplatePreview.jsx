import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MonitorSmartphone, Monitor, Rocket, CheckCircle2 } from 'lucide-react';
import { initialTemplates } from './templateData';
import { FashionTemplate } from './templates/FashionTemplate';
import PulseTemplate from './templates/PulseTemplate';
import HavenTemplate from './templates/HavenTemplate';
import MonoTemplate from './templates/MonoTemplate';
import ArcadiaTemplate from './templates/ArcadiaTemplate';
import NovaTemplate from './templates/NovaTemplate';
import LumenTemplate from './templates/LumenTemplate';
import AetherTemplate from './templates/AetherTemplate';
import AtelierClothingTemplate from './templates/AtelierClothingTemplate';

const STORAGE_KEY = 'carthive_template_library_v1';

const TemplatePreview = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [mode, setMode] = useState('desktop');
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const selected = initialTemplates.find((item) => item.id === templateId);
    setTemplate(selected || null);
  }, [templateId]);

  const handleApplyTemplate = () => {
    if (!template) return;
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    const updated = (saved || initialTemplates).map((item) => {
      if (item.id !== template.id) return { ...item, active: false };
      return { ...item, installed: true, active: true };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setApplied(true);

    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(
        { type: 'CarthiveTemplateApplied', templateId: template.id },
        window.origin,
      );
    }
  };

  const previewTemplate = {
    ...template,
    ...(template?.fields || {}),
    ...(template?.config || {}),
    image: template?.image || template?.config?.hero_image || template?.image,
  };

  if (!template) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-lg">
        <p className="text-lg font-semibold text-slate-900">Template not found.</p>
        <button
          onClick={() => navigate('/admin/templates')}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" /> Back to templates
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      {/* Top Control Bar */}
      {/* <div className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm"> */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur px-6 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/admin/templates')}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="text-xl font-semibold text-slate-900">{template.name}</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode('desktop')}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${mode === 'desktop' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMode('mobile')}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${mode === 'mobile' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              <MonitorSmartphone className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleApplyTemplate}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              <CheckCircle2 className="h-4 w-4" /> {applied ? 'Applied' : 'Apply'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      {/* <div className="flex-1 overflow-auto bg-slate-100"> */}
       <div className="flex-1 overflow-auto bg-slate-100 p-0">
        <div className="w-full">
          {mode === 'desktop' ? (
            // <div className="w-full h-full bg-white overflow-hidden">
            <div className="w-full h-full bg-slate-100 overflow-hidden">
            <div className="overflow-auto max-h-[90vh]">
                {(() => {
                  const registry = {
                    atelier: AtelierClothingTemplate,
                    pulse: PulseTemplate,
                    haven: HavenTemplate,
                    mono: MonoTemplate,
                    arcadia: ArcadiaTemplate,
                    nova: NovaTemplate,
                    lumen: LumenTemplate,
                    aether: AetherTemplate,
                  };
                  const Selected = registry[template.id] || DesktopTemplate;
                  return <Selected template={previewTemplate} onApply={handleApplyTemplate} mode={mode} />;
                })()}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex justify-center">
              <div className="w-96 rounded-[28px] border-8 border-slate-900 bg-slate-900 shadow-2xl overflow-hidden">
                <div className="overflow-auto bg-white max-h-[90vh]">
                  {(() => {
                    const registry = {
                      atelier: FashionTemplate,
                      pulse: PulseTemplate,
                      haven: HavenTemplate,
                      mono: MonoTemplate,
                      arcadia: ArcadiaTemplate,
                      nova: NovaTemplate,
                      lumen: LumenTemplate,
                      aether: AetherTemplate,
                    };
                    const Selected = registry[template.id] || MobileTemplate;
                    return <Selected template={previewTemplate} onApply={handleApplyTemplate} mode={mode} />;
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Get template-specific styles
const getTemplateStyles = (templateId, category) => {
  const styles = {
    atelier: {
      heroGradient: 'from-amber-900 via-slate-900 to-slate-950',
      accentColor: 'bg-amber-600',
      accentText: 'text-amber-600',
      gridCols: 'lg:grid-cols-3',
      productBg: 'bg-amber-50',
    },
    pulse: {
      heroGradient: 'from-cyan-500 via-blue-600 to-slate-900',
      accentColor: 'bg-cyan-500',
      accentText: 'text-cyan-500',
      gridCols: 'lg:grid-cols-4',
      productBg: 'bg-slate-50',
    },
    haven: {
      heroGradient: 'from-amber-100 via-orange-100 to-slate-100',
      accentColor: 'bg-amber-700',
      accentText: 'text-amber-700',
      gridCols: 'lg:grid-cols-2',
      productBg: 'bg-orange-50',
    },
    aether: {
      heroGradient: 'from-pink-300 via-purple-300 to-indigo-400',
      accentColor: 'bg-pink-500',
      accentText: 'text-pink-500',
      gridCols: 'lg:grid-cols-3',
      productBg: 'bg-pink-50',
    },
    mono: {
      heroGradient: 'from-slate-100 via-slate-50 to-white',
      accentColor: 'bg-slate-900',
      accentText: 'text-slate-900',
      gridCols: 'lg:grid-cols-3',
      productBg: 'bg-white',
    },
    lumen: {
      heroGradient: 'from-emerald-500 via-teal-600 to-slate-900',
      accentColor: 'bg-emerald-600',
      accentText: 'text-emerald-600',
      gridCols: 'lg:grid-cols-4',
      productBg: 'bg-emerald-50',
    },
    nova: {
      heroGradient: 'from-slate-900 via-slate-800 to-black',
      accentColor: 'bg-yellow-500',
      accentText: 'text-yellow-500',
      gridCols: 'lg:grid-cols-2',
      productBg: 'bg-slate-900',
    },
    arcadia: {
      heroGradient: 'from-orange-300 via-amber-200 to-yellow-100',
      accentColor: 'bg-orange-600',
      accentText: 'text-orange-600',
      gridCols: 'lg:grid-cols-3',
      productBg: 'bg-yellow-50',
    },
  };

  return styles[templateId] || styles.mono;
};

// Desktop Template View
const DesktopTemplate = ({ template }) => {
  const styles = getTemplateStyles(template.id, template.category);

  return (
    <div className="w-full">
      {/* Hero */}
      <div className={`relative h-96 bg-gradient-to-br ${styles.heroGradient}`}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${template.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/30" />
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6">
          <p className="text-sm uppercase tracking-[0.22em] text-white/80">{template.category} storefront</p>
          <h2 className="mt-4 text-6xl font-bold tracking-tight">{template.hero_heading || template.name}</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{template.hero_subtext || template.description}</p>
          <button className={`mt-8 rounded-lg ${styles.accentColor} px-8 py-3 font-semibold text-white hover:opacity-90`}>
            Shop Now
          </button>
        </div>
      </div>

      {/* Featured Section */}
      <div className="border-t border-slate-200 px-12 py-16 bg-white">
        <div className="space-y-6">
          <div>
            <p className={`text-sm uppercase tracking-[0.22em] ${styles.accentText}`}>{template.banner_title || 'Featured Collection'}</p>
            <h3 className="mt-2 text-3xl font-bold text-slate-900">{template.banner_title || 'Popular products'}</h3>
            <p className="mt-2 text-slate-600">{template.banner_subtitle || template.tags?.join(' • ')}</p>
          </div>
          <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 ${styles.gridCols}`}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition ${styles.productBg}`}>
                <div className="aspect-square bg-gradient-to-br from-slate-300 to-slate-400" />
                <div className="p-4">
                  <h4 className="font-semibold text-slate-900">{template.name} Product {i}</h4>
                  <p className={`text-sm ${styles.accentText} font-semibold`}>$99.00</p>
                  <button className={`mt-3 w-full rounded-lg ${styles.accentColor} px-4 py-2 text-sm font-semibold text-white hover:opacity-90`}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className={`border-t border-slate-200 px-12 py-16 ${styles.productBg}`}>
        <div className="max-w-3xl">
          <p className={`text-sm uppercase tracking-[0.22em] ${styles.accentText}`}>About</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">{template.footer_about ? 'About this brand' : 'Our story'}</h3>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {template.footer_about || `${template.description} This template is thoughtfully crafted for ${template.category.toLowerCase()} retailers who demand both aesthetics and conversion optimization.`}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className={`border-t border-slate-200 ${styles.accentColor} text-white px-12 py-16`}>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
          <div>
            <h4 className="font-semibold">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white">New arrivals</a></li>
              <li><a href="#" className="hover:text-white">Best sellers</a></li>
              <li><a href="#" className="hover:text-white">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white">About us</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/60">
          <p>&copy; 2024 {template.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

// Mobile Template View
const MobileTemplate = ({ template }) => {
  const styles = getTemplateStyles(template.id, template.category);

  return (
    <div className="w-full">
      {/* Hero */}
      <div className={`relative h-72 bg-gradient-to-br ${styles.heroGradient}`}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${template.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/40" />
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h2 className="text-3xl font-bold">{template.hero_heading || template.name}</h2>
          <p className="mt-2 text-sm text-white/90">{template.hero_subtext || template.banner_subtitle || template.category}</p>
          <button className={`mt-4 rounded-lg ${styles.accentColor} px-6 py-2 text-sm font-semibold text-white`}>
            Shop Now
          </button>
        </div>
      </div>

      {/* Featured Section */}
      <div className="px-4 py-8 border-t border-slate-200 bg-white">
        <h3 className="text-2xl font-bold text-slate-900">Popular products</h3>
        <div className="mt-4 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`rounded-lg border border-slate-200 overflow-hidden ${styles.productBg}`}>
              <div className="aspect-square bg-gradient-to-br from-slate-300 to-slate-400" />
              <div className="p-3">
                <h4 className="font-semibold text-slate-900 text-sm">{template.name} Product {i}</h4>
                <p className={`text-xs ${styles.accentText} font-semibold`}>$99.00</p>
                <button className={`mt-2 w-full rounded-lg ${styles.accentColor} px-3 py-2 text-xs font-semibold text-white`}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={`border-t border-slate-200 ${styles.accentColor} text-white px-4 py-8 text-center text-xs`}>
        <p className="text-white/80">&copy; 2024 {template.name}</p>
        <div className="mt-4 space-y-2">
          <a href="#" className="block text-white/80">Contact</a>
          <a href="#" className="block text-white/80">Privacy</a>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
