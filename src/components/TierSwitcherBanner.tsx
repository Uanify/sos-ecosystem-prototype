import React from 'react';
import { Layers, Zap, ShieldCheck, FileText, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export type TierMode = 'option1' | 'option2' | 'option3';

interface TierSwitcherProps {
  currentTier: TierMode;
  onSelectTier: (tier: TierMode) => void;
  lang: 'en' | 'es';
  onOpenProposalDoc: () => void;
}

export const TierSwitcherBanner: React.FC<TierSwitcherProps> = ({
  currentTier,
  onSelectTier,
  lang,
  onOpenProposalDoc,
}) => {
  const isEn = lang === 'en';

  return (
    <aside aria-label="Executive Interactive Showcase Banner" className="bg-slate-950 text-slate-200 border-b border-slate-800 text-xs shadow-md">
      
      {/* 1. Main Executive Switcher Row */}
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Prototype Indicator */}
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-slate-200">
            {isEn ? 'Architecture Prototype Simulator' : 'Simulador de Arquitectura'}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-sky-300 border border-blue-900 font-mono hidden lg:inline">
            {isEn ? 'Final Production Platform Exceeds Prototype' : 'La Entrega Final Superará este Prototipo'}
          </span>
        </div>

        {/* Center: 3 Option Tabs with horizontal scroll on small screens */}
        <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 min-w-max">
            <button
              onClick={() => onSelectTier('option1')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold text-xs transition-all cursor-pointer ${
                currentTier === 'option1'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Option 1 — Full Ecosystem ($18.5k)</span>
              {currentTier !== 'option1' && (
                <span className="text-[9px] bg-sky-900 text-sky-300 px-1.5 py-0.5 rounded font-mono ml-1">Recommended</span>
              )}
            </button>

            <button
              onClick={() => onSelectTier('option2')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                currentTier === 'option2'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Option 2 — LMS Only ($11.8k)</span>
            </button>

            <button
              onClick={() => onSelectTier('option3')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                currentTier === 'option3'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Option 3 — Speed Sprint ($4.8k)</span>
            </button>
          </div>
        </div>

        {/* Right: Proposal Doc button (No versioning) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProposalDoc}
            className="flex items-center gap-2 text-xs text-white font-bold bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 rounded-lg transition-all shadow-sm cursor-pointer hover:scale-105"
          >
            <FileText className="w-4 h-4 text-sky-200" />
            <span>{isEn ? 'Read Strategic Proposal' : 'Leer Propuesta Estratégica'}</span>
          </button>
        </div>

      </div>

      {/* 2. Dynamic Scope Breakdown Strip */}
      <div className="bg-slate-900/80 border-t border-slate-800/80 px-4 sm:px-6 py-1.5 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          
          {currentTier === 'option1' && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All 10 Projects Active:
              </span>
              <span>3-in-1 Platform Unification (Landing + Store + LMS)</span>
              <span>•</span>
              <span>B2B Corporate Portal ($27k–$160k)</span>
              <span>•</span>
              <span>Bilingual Toggle</span>
              <span>•</span>
              <span>QR Verification Engine</span>
              <span>•</span>
              <span>SuperAdmin CMS</span>
            </div>
          )}

          {currentTier === 'option2' && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
              <span className="text-sky-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Projects 1–4 Active:
              </span>
              <span>Speed under 2.2s & SEO</span>
              <span>•</span>
              <span>1-Step Mobile Checkout</span>
              <span>•</span>
              <span>SuperAdmin CMS</span>
              <span className="text-amber-400 font-semibold flex items-center gap-1 border-l border-slate-700 pl-3">
                <XCircle className="w-3.5 h-3.5 text-red-400" /> Excluded: Store remains external Square link; No B2B Company Portal
              </span>
            </div>
          )}

          {currentTier === 'option3' && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
              <span className="text-sky-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sprint Projects 2 & 7 Active:
              </span>
              <span>Asset Weight Reduction</span>
              <span>•</span>
              <span>Security Hardening</span>
              <span className="text-amber-400 font-semibold flex items-center gap-1 border-l border-slate-700 pl-3">
                <XCircle className="w-3.5 h-3.5 text-red-400" /> Excluded: No UI Redesigns, No CMS, No B2B Portal, No 3-in-1
              </span>
            </div>
          )}

          {currentTier !== 'option1' && (
            <button
              onClick={() => onSelectTier('option1')}
              className="text-sky-400 hover:text-sky-200 font-semibold underline flex items-center gap-1 shrink-0 ml-auto cursor-pointer"
            >
              <span>{isEn ? 'Switch to Option 1 for complete scope' : 'Cambiar a Opción 1 para alcance completo'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

        </div>
      </div>

    </aside>
  );
};
