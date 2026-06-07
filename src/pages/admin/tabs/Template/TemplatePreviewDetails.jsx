import React from 'react';

const TemplatePreviewDetails = ({ template }) => {
  const policyCards = [
    { label: 'Terms & Conditions', value: template.terms_and_conditions },
    { label: 'Privacy Policy', value: template.privacy_policy },
    { label: 'Shipping Policy', value: template.shipping_policy },
    { label: 'Refund Policy', value: template.refund_policy },
  ].filter((item) => item.value);

  const supportItems = [
    { label: 'Email', value: template.support_email },
    { label: 'Phone', value: template.support_phone },
    { label: 'Address', value: template.physical_address },
    { label: 'Instagram', value: template.instagram_link },
  ].filter((item) => item.value);

  return (
    <section className="bg-slate-950 py-16 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.7fr_1.3fr]">
          <div className="rounded-[32px] bg-slate-900 p-10 shadow-2xl ring-1 ring-white/5">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">About this template</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">{template.hero_heading || template.name}</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">{template.hero_subtext || template.footer_about || template.description}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {template.banner_title && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Featured message</p>
                  <p className="mt-4 text-xl font-semibold text-white">{template.banner_title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{template.banner_subtitle}</p>
                </div>
              )}
              {template.footer_about && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Brand story</p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{template.footer_about}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] bg-slate-900 p-8 shadow-2xl ring-1 ring-white/5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Contact & support</p>
              <div className="mt-6 grid gap-4">
                {supportItems.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    {item.label === 'Instagram' ? (
                      <a href={item.value} target="_blank" rel="noreferrer" className="mt-2 block text-sm text-cyan-300 hover:text-cyan-200 break-all">
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm text-slate-300">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {policyCards.length > 0 && (
              <div className="rounded-[32px] bg-slate-900 p-8 shadow-2xl ring-1 ring-white/5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Store policies</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {policyCards.map((policy) => (
                    <div key={policy.label} className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm font-semibold text-white">{policy.label}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{policy.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplatePreviewDetails;
