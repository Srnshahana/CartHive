import React from 'react';

const TemplatePreviewFooter = ({ template }) => {
  return (
    <footer className="mx-auto mt-12 max-w-7xl rounded-[28px] border border-slate-200 bg-slate-950 px-6 py-10 text-sm text-slate-200 shadow-xl sm:px-10">
      <div className="grid gap-10 lg:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-white">About this store</h3>
          <p className="mt-4 text-slate-300">{template.footer_about || 'A quick brand summary appears here to describe the store experience.'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-2 text-slate-300">
            {template.support_phone && <li>{template.support_phone}</li>}
            {template.support_email && <li>{template.support_email}</li>}
            {template.physical_address && <li>{template.physical_address}</li>}
            {template.instagram_link && (
              <li>
                <a href={template.instagram_link} target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-200">
                  Instagram profile
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Policies</h3>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>
              <button className="text-left text-slate-300 hover:text-white">{template.terms_conditions || 'Terms & Conditions'}</button>
            </li>
            <li>
              <button className="text-left text-slate-300 hover:text-white">{template.privacy_policy || 'Privacy Policy'}</button>
            </li>
            <li>
              <button className="text-left text-slate-300 hover:text-white">{template.shipping_policy || 'Shipping Policy'}</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-800 pt-6 text-slate-500">
        © {new Date().getFullYear()} {template.name || 'Template'}.
      </div>
    </footer>
  );
};

export default TemplatePreviewFooter;
