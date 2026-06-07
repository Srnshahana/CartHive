import React from 'react';
import { Mail, Phone, MapPin, FileText } from 'lucide-react';

const TemplatePreviewMeta = ({ template }) => {
  const supportItems = [
    { icon: Mail, label: 'Email', value: template.support_email, hint: 'Email our support team for fast help.' },
    { icon: Phone, label: 'Phone', value: template.support_phone, hint: 'Call for quick assistance.' },
    { icon: MapPin, label: 'Address', value: template.physical_address, hint: 'Store or shipping address.' },
    { icon: FileText, label: 'Instagram', value: template.instagram_link, hint: 'Follow our latest updates.' },
  ].filter((item) => item.value);

  const policyItems = [
    { label: 'Terms & Conditions', value: template.terms_and_conditions },
    { label: 'Privacy Policy', value: template.privacy_policy },
    { label: 'Shipping Policy', value: template.shipping_policy },
    { label: 'Refund Policy', value: template.refund_policy },
  ].filter((item) => item.value);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Shop support</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Questions? We’re here to help.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">{template.footer_about || template.hero_subtext || 'Connect with support, explore store details, and see policy summaries inside the theme.'}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {supportItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    {item.label === 'Instagram' ? (
                      <a href={item.value} target="_blank" rel="noreferrer" className="mt-1 block text-sm text-cyan-600 hover:text-cyan-500 break-all">
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-slate-600">{item.value}</p>
                    )}
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-400">{item.hint}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
            <div className="flex items-center gap-3 text-slate-300">
              <FileText className="h-5 w-5" />
              <p className="text-xs uppercase tracking-[0.35em]">Policy highlights</p>
            </div>
            <div className="mt-6 space-y-4">
              {policyItems.map((policy) => (
                <div key={policy.label} className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{policy.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{policy.value}</p>
                </div>
              ))}
            </div>
          </div>

          {template.banner_title && (
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Featured message</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">{template.banner_title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{template.banner_subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TemplatePreviewMeta;
