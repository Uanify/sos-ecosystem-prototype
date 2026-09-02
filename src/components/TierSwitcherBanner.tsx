import React from 'react';
import { Sparkles, Zap, ShieldCheck, CheckCircle2, XCircle, Info, ChevronRight, FileText } from 'lucide-react';

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
    <div className="bg-slate-900/95 border-b border-amber-500/30 sticky top-0 z-50 backdrop-blur-md px-3 sm:px-6 py-2.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Left: Mode Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline text-amber-400 font-bold uppercase tracking-wider">
              {isEn ? 'Executive Interactive Showcase:' : 'Demostración Ejecutiva Interactiva:'}
            </span>
            <span className="text-slate-300">
              {isEn ? 'Previewing Investment Tiers' : 'Visualizando Opciones de Inversión'}
            </span>
          </div>
        </div>

        {/* Center: 3 Option Tabs */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-lg border border-slate-800 shadow-inner">
          <button
            onClick={() => onSelectTier('option1')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTier === 'option1'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Option 1 ($18.5k)</span>
            <span className="hidden lg:inline text-[10px] uppercase px-1 py-0.2 bg-amber-950/40 text-amber-300 rounded font-semibold ml-1">
              {isEn ? 'Recommended' : 'Recomendada'}
            </span>
          </button>

          <button
            onClick={() => onSelectTier('option2')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTier === 'option2'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Option 2 ($11.8k)</span>
          </button>

          <button
            onClick={() => onSelectTier('option3')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentTier === 'option3'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Option 3 ($4.8k)</span>
          </button>
        </div>

        {/* Right: Proposal Summary Modal trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProposalDoc}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1.5 rounded border border-amber-500/30 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isEn ? 'Proposal Doc (v5.0)' : 'Ver Propuesta (v5.0)'}</span>
          </button>
        </div>
      </div>

      {/* Sub-banner: Tier dynamic highlight explanation */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          {currentTier === 'option1' && (
            <span>
              <strong className="text-amber-400 font-semibold">Option 1 Active:</strong>{' '}
              {isEn
                ? 'Full 3-in-1 Platform Unification (Landing + Store + LMS), B2B Corporate Portal ($27k–$160k), Bilingual Toggle, QR Certificates & SuperAdmin CMS.'
                : 'Consolidación 3-en-1 Total (Landing + Tienda + LMS), Portal B2B para Empresas ($27k–$160k), Toggle Bilingüe, Certificados QR y CMS SuperAdmin.'}
            </span>
          )}
          {currentTier === 'option2' && (
            <span>
              <strong className="text-amber-400 font-semibold">Option 2 Active:</strong>{' '}
              {isEn
                ? 'Core LMS Speed (<2.2s) & SEO + 1-Step Mobile Checkout. (Notice: 3-in-1 consolidation and B2B corporate company portal remain disabled).'
                : 'Velocidad LMS (<2.2s), SEO y Checkout Móvil en 1 paso. (Nota: La consolidación 3-en-1 y el portal B2B para empresas no están incluidos).'}
            </span>
          )}
          {currentTier === 'option3' && (
            <span>
              <strong className="text-amber-400 font-semibold">Option 3 Active:</strong>{' '}
              {isEn
                ? 'Rapid Performance Sprint & Security Hardening on existing platform. (No page redesigns, no SuperAdmin CMS, no B2B portal).'
                : 'Sprint Rápido de Velocidad y Seguridad sobre la plataforma actual. (Sin rediseño de páginas, sin CMS SuperAdmin, sin portal B2B).'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            {currentTier === 'option1'
              ? (isEn ? 'All 10 Projects Unlocked' : 'Los 10 Proyectos Desbloqueados')
              : currentTier === 'option2'
              ? (isEn ? 'Core Projects 1-4 Active' : 'Proyectos Core 1-4 Activos')
              : (isEn ? 'Sprint Projects 2 & 7 Active' : 'Proyectos 2 y 7 Activos')}
          </span>
          {currentTier !== 'option1' && (
            <span className="flex items-center gap-1 text-slate-500">
              <XCircle className="w-3 h-3 text-red-400/80" />
              {currentTier === 'option2'
                ? (isEn ? 'B2B Portal & 3-in-1 Locked' : 'Portal B2B y 3-en-1 Bloqueados')
                : (isEn ? 'Redesign & CMS Locked' : 'Rediseño y CMS Bloqueados')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
