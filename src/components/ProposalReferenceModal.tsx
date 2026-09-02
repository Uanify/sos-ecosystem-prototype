import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Zap, Sparkles, Building, Layers } from 'lucide-react';
import { CORPORATE_TIERS } from '../data/content';

interface ProposalReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
}

export const ProposalReferenceModal: React.FC<ProposalReferenceModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const isEn = lang === 'en';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="sticky top-0 float-right p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
              Document Version 5.0 (Client Release)
            </span>
            <h3 className="text-xl font-bold font-heading text-white">
              Shining On Safety — Digital Modernization & Growth Roadmap
            </h3>
            <p className="text-xs text-slate-400">
              Prepared by Uanify Development Team for Melanie Jaime & Executive Board
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-6 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-sm font-bold text-white font-heading mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Core Strategic Mission: The 3-in-1 Unification</span>
            </h4>
            <p className="leading-relaxed text-slate-300">
              Consolidating Shining On Safety's 3 currently fragmented platforms (Marketing Landing, Square Store, and Safety University LMS) into <strong>ONE single, high-converting digital powerhouse under shiningonsafety.us</strong>. Eliminates customer domain-hopping, unlocks Google SEO authority, and gives general contractors enterprise tools to close $27,000–$160,000 annual retainers.
            </p>
          </div>

          {/* 3 Options Overview */}
          <div>
            <h4 className="text-sm font-bold text-white font-heading mb-3">
              The 3 Investment Packages at a Glance:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Option 1 */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 space-y-2">
                <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider">🚀 Option 1 ($18,500 USD)</span>
                <p className="font-bold text-white text-sm">Complete Unified Ecosystem</p>
                <p className="text-[11px] text-slate-300">
                  Full 3-in-1 platform build, B2B corporate portal ($27k–$160k), bilingual toggle, QR certificate engine, and SuperAdmin CMS.
                </p>
                <span className="inline-block text-[10px] text-amber-300 font-semibold bg-amber-950/60 px-2 py-0.5 rounded">
                  8 to 10 Weeks • 60-day Warranty
                </span>
              </div>

              {/* Option 2 */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] font-black text-slate-300 uppercase tracking-wider">⚡ Option 2 ($11,800 USD)</span>
                <p className="font-bold text-white text-sm">High-Impact Core</p>
                <p className="text-[11px] text-slate-400">
                  Speed (under 2.2s), Technical SEO, 1-step checkout, and course management CMS on existing platform.
                </p>
                <span className="inline-block text-[10px] text-slate-400 font-semibold bg-slate-900 px-2 py-0.5 rounded">
                  5 to 6 Weeks • 30-day Warranty
                </span>
              </div>

              {/* Option 3 */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">🛠️ Option 3 ($4,800 USD)</span>
                <p className="font-bold text-white text-sm">Rapid Performance Sprint</p>
                <p className="text-[11px] text-slate-400">
                  Immediate 90% asset weight reduction, basic Google sitemaps, and HTTPS security headers.
                </p>
                <span className="inline-block text-[10px] text-slate-400 font-semibold bg-slate-900 px-2 py-0.5 rounded">
                  2 to 3 Weeks • 14-day Warranty
                </span>
              </div>

            </div>
          </div>

          {/* Infrastructure Costs */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-white">Estimated Monthly Cloud Infrastructure:</span>
              <p className="text-[11px] text-slate-400">DigitalOcean VPS, MongoDB Atlas Cluster, AWS S3/CloudFront (100% under Melanie's ownership)</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-black text-amber-400 font-heading">~$65 – $145 USD</span>
              <span className="text-[10px] text-slate-500 block">/ month recurring</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
