// import React from 'react';
// import { Mail, Phone, MapPin, FileText } from 'lucide-react';

// const TemplatePreviewMeta = ({ template }) => {
//   const supportItems = [
//     { icon: Mail, label: 'Email', value: template.support_email, hint: 'Email our support team for fast help.' },
//     { icon: Phone, label: 'Phone', value: template.support_phone, hint: 'Call for quick assistance.' },
//     { icon: MapPin, label: 'Address', value: template.physical_address, hint: 'Store or shipping address.' },
//     { icon: FileText, label: 'Instagram', value: template.instagram_link, hint: 'Follow our latest updates.' },
//   ].filter((item) => item.value);

//   const policyItems = [
//     { label: 'Terms & Conditions', value: template.terms_and_conditions },
//     { label: 'Privacy Policy', value: template.privacy_policy },
//     { label: 'Shipping Policy', value: template.shipping_policy },
//     { label: 'Refund Policy', value: template.refund_policy },
//   ].filter((item) => item.value);

//   return (
//     <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
//       <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
//         <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
//           <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Shop support</p>
//           <h2 className="mt-3 text-3xl font-semibold text-slate-950">Questions? We’re here to help.</h2>
//           <p className="mt-4 text-sm leading-7 text-slate-600">{template.footer_about || template.hero_subtext || 'Connect with support, explore store details, and see policy summaries inside the theme.'}</p>

//           <div className="mt-8 grid gap-4 sm:grid-cols-2">
//             {supportItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <div key={item.label} className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
//                     <Icon className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-slate-950">{item.label}</p>
//                     {item.label === 'Instagram' ? (
//                       <a href={item.value} target="_blank" rel="noreferrer" className="mt-1 block text-sm text-cyan-600 hover:text-cyan-500 break-all">
//                         {item.value}
//                       </a>
//                     ) : (
//                       <p className="mt-1 text-sm text-slate-600">{item.value}</p>
//                     )}
//                     <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-400">{item.hint}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
//             <div className="flex items-center gap-3 text-slate-300">
//               <FileText className="h-5 w-5" />
//               <p className="text-xs uppercase tracking-[0.35em]">Policy highlights</p>
//             </div>
//             <div className="mt-6 space-y-4">
//               {policyItems.map((policy) => (
//                 <div key={policy.label} className="rounded-3xl bg-white/5 p-4">
//                   <p className="text-sm font-semibold text-white">{policy.label}</p>
//                   <p className="mt-2 text-sm leading-6 text-slate-300">{policy.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {template.banner_title && (
//             <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
//               <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Featured message</p>
//               <h3 className="mt-3 text-2xl font-semibold text-slate-950">{template.banner_title}</h3>
//               <p className="mt-3 text-sm leading-7 text-slate-600">{template.banner_subtitle}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TemplatePreviewMeta;

import React from 'react';
import { Mail, Phone, MapPin, FileText, ArrowUpRight } from 'lucide-react';

const Instagram = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

const TemplatePreviewMeta = ({ template }) => {
  const supportItems = [
    { icon: Mail,      label: 'Email',     value: template.support_email,    hint: 'Email our support team for fast help.' },
    { icon: Phone,     label: 'Phone',     value: template.support_phone,    hint: 'Call for quick assistance.' },
    { icon: MapPin,    label: 'Address',   value: template.physical_address, hint: 'Store or shipping address.' },
    { icon: Instagram, label: 'Instagram', value: template.instagram_link,   hint: 'Follow our latest updates.' },
  ].filter((item) => item.value);

  const policyItems = [
    { label: 'Terms & Conditions', value: template.terms_and_conditions },
    { label: 'Privacy Policy',     value: template.privacy_policy },
    { label: 'Shipping Policy',    value: template.shipping_policy },
    { label: 'Refund Policy',      value: template.refund_policy },
  ].filter((item) => item.value);

  return (
    <section
      data-testid="template-preview-meta"
      className="bg-[#f5f0e7] text-neutral-900"
      style={{ fontFamily: '"Outfit", "Helvetica Neue", Arial, sans-serif' }}
    >
      {/* Scoped fonts — safe even if multiple templates import them */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Outfit:wght@300;400;500;600&display=swap');
        .tpm-serif { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">

          {/* -------- Support card -------- */}
          <div className="rounded-[28px] border border-neutral-900/10 bg-[#efe7da] p-10">
            <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">Shop support</p>
            <h2 className="tpm-serif mt-3 text-4xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-[2.75rem]">
              Questions? We’re here to help.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600">
              {template.footer_about ||
                template.hero_subtext ||
                'Connect with support, explore store details, and see policy summaries inside the theme.'}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {supportItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex gap-4 rounded-[20px] border border-neutral-900/10 bg-[#f5f0e7] p-5 transition hover:border-neutral-900/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[#f5f0e7]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                        {item.label}
                      </p>
                      {item.label === 'Instagram' ? (
                        <a
                          href={item.value}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-flex items-center gap-1 break-all text-sm font-medium text-[#a4452f] underline-offset-4 hover:underline"
                        >
                          {item.value}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <p className="mt-1 break-all text-sm font-medium text-neutral-900">
                          {item.value}
                        </p>
                      )}
                      <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                        {item.hint}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -------- Side column (policies + featured banner) -------- */}
          <div className="space-y-6">
            {/* Policy highlights — dark card to match the Promise section */}
            <div className="rounded-[28px] border border-neutral-900/10 bg-neutral-900 p-10 text-[#f5f0e7]">
              <div className="flex items-center gap-3 text-[#f5f0e7]/70">
                <FileText className="h-4 w-4" />
                <p className="text-[11px] uppercase tracking-[0.4em]">Policy highlights</p>
              </div>
              <h3 className="tpm-serif mt-4 text-2xl font-medium leading-tight">
                The fine print, kept short.
              </h3>

              <div className="mt-6 space-y-3">
                {policyItems.map((policy) => (
                  <div
                    key={policy.label}
                    className="rounded-[18px] border border-[#f5f0e7]/10 bg-[#f5f0e7]/5 p-5"
                  >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#f5f0e7]/60">
                      {policy.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#f5f0e7]/85">
                      {policy.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured banner */}
            {template.banner_title && (
              <div className="rounded-[28px] border border-neutral-900/10 bg-[#efe7da] p-10">
                <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">
                  Featured message
                </p>
                <h3 className="tpm-serif mt-3 text-2xl font-medium leading-snug text-neutral-900">
                  {template.banner_title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {template.banner_subtitle}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplatePreviewMeta;