import React, { useState } from 'react';
import { CORPORATE_TIERS, MOCK_COMPANY_EMPLOYEES } from '../data/content';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  FileText, 
  Download, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import type { TierMode } from './TierSwitcherBanner';

interface B2BCorporatePortalProps {
  lang: 'en' | 'es';
  tier: TierMode;
}

export const B2BCorporatePortal: React.FC<B2BCorporatePortalProps> = ({ lang, tier }) => {
  const isEn = lang === 'en';
  const isLocked = tier !== 'option1';
  const [employeeCount, setEmployeeCount] = useState<number>(12);
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-gold');
  const [activeTab, setActiveTab] = useState<'tiers' | 'dashboardDemo'>('tiers');
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Auto recommend tier based on employee slider
  const getRecommendedTier = (count: number) => {
    if (count <= 5) return 'tier-bronze';
    if (count <= 10) return 'tier-silver';
    if (count <= 25) return 'tier-gold';
    return 'tier-diamond';
  };

  const handleSliderChange = (val: number) => {
    setEmployeeCount(val);
    setSelectedTierId(getRecommendedTier(val));
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setShowQuoteModal(false);
    }, 1500);
  };

  return (
    <section id="b2b-portal" className="py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tier Lock Warning if on Option 2 or Option 3 */}
        {isLocked && (
          <div className="mb-10 p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-amber-950">
                  {isEn ? 'Feature Excluded in Selected Tier:' : 'Función Excluida en la Opción Seleccionada:'}
                </h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  {isEn
                    ? `The B2B Corporate Retainers Portal ($27,000–$160,000/yr) is EXCLUSIVE to Option 1 ($18.5k). In ${tier === 'option2' ? 'Option 2' : 'Option 3'}, corporate accounts are managed manually outside the platform.`
                    : `El Portal B2B de Retención ($27,000–$160,000/año) es EXCLUSIVO de la Opción 1 ($18.5k). En la ${tier === 'option2' ? 'Opción 2' : 'Opción 3'}, los contratos corporativos se manejan de forma manual.`}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-md bg-amber-200 text-amber-950 font-bold text-xs shrink-0 font-mono">
              Requires Option 1
            </span>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-100/70 px-3.5 py-1.5 rounded-full border border-blue-200 mb-3">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>{isEn ? 'Annual Corporate Retainer Programs' : 'Programas Corporativos de Retención Anual'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-950 tracking-tight">
            {isEn ? 'Built for General Contractors who need safety handled — not just checked.' : 'Para contratistas generales que necesitan seguridad resuelta, no solo revisada.'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            {isEn
              ? 'Annual compliance retainers covering on-site audits, supervisor workshops, crew certification tracking, and OSHA documentation — without the overhead of an in-house safety department.'
              : 'Convenios anuales que cubren auditorías en obra, talleres de supervisores, seguimiento de certificaciones y documentación OSHA — sin el costo de un departamento propio.'}
          </p>
        </div>

        {/* Interactive Crew Size Calculator */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                {isEn ? 'Workforce Calculator' : 'Calculadora de Cuadrilla'}
              </span>
              <h3 className="text-lg font-bold text-slate-950 mt-1">
                {isEn ? 'Select your average active workforce in the field:' : 'Seleccione el número de trabajadores activos en obra:'}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-blue-600 font-heading">{employeeCount}</span>
              <span className="text-xs text-slate-500 font-bold ml-2">{isEn ? 'Workers' : 'Trabajadores'}</span>
            </div>
          </div>

          <div className="py-6">
            <input
              type="range"
              min="1"
              max="50"
              value={employeeCount}
              onChange={e => handleSliderChange(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
              <span>1 Worker (Bronze)</span>
              <span>10 Workers (Silver)</span>
              <span>25 Workers (Gold)</span>
              <span>50+ Workers (Diamond Enterprise)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-900 block">
                {isEn ? 'Recommended Annual Program:' : 'Programa Anual Recomendado:'}
              </span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {CORPORATE_TIERS.find(t => t.id === selectedTierId)?.name}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-blue-600 font-heading">
                ${CORPORATE_TIERS.find(t => t.id === selectedTierId)?.annualPrice.toLocaleString()} USD
              </span>
              <span className="text-xs text-slate-500 block font-medium">/ year</span>
            </div>
          </div>
        </div>

        {/* 4 Corporate Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CORPORATE_TIERS.map(tierItem => {
            const isSelected = selectedTierId === tierItem.id;

            return (
              <div
                key={tierItem.id}
                className={`bg-white rounded-2xl border-2 transition-all p-6 flex flex-col justify-between shadow-xs hover:shadow-lg ${
                  isSelected
                    ? 'border-blue-600 shadow-md ring-2 ring-blue-600/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-mono">
                      {tierItem.name.split(' ')[0]} Program
                    </span>
                    {tierItem.popular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-slate-950 font-heading leading-tight mb-2">
                    {isEn ? tierItem.name : tierItem.nameEs}
                  </h3>

                  <div className="py-3 border-y border-slate-100 my-4">
                    <span className="text-2xl font-black text-blue-600 font-heading">
                      ${tierItem.annualPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 font-medium block">USD / year</span>
                  </div>

                  <p className="text-xs text-slate-500 font-semibold mb-4">
                    {isEn ? `Designed for: ${tierItem.employeeRange}` : `Para: ${tierItem.employeeRangeEs}`}
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {(isEn ? tierItem.features : tierItem.featuresEs).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setShowQuoteModal(true)}
                  className={`w-full mt-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  }`}
                >
                  {isEn ? 'Request Agreement Outline' : 'Solicitar Propuesta Formal'}
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Quote Request Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-lg w-full text-slate-900">
            <h3 className="text-lg font-bold text-slate-950 mb-2 font-heading">
              {isEn ? 'Request Corporate Partnership Proposal' : 'Solicitar Propuesta de Retención Corporativa'}
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              {isEn
                ? 'Our senior safety specialists will review your trade requirements, crew count, and jobsite locations to prepare a formal agreement.'
                : 'Nuestros especialistas evaluarán sus cuadrillas y obras activas para estructurar el convenio anual formal.'}
            </p>

            <form onSubmit={handleQuoteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Legal Name</label>
                <input required type="text" placeholder="e.g. Apex Construction LLC" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Safety Contact Name</label>
                  <input required type="text" placeholder="John Miller" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Corporate Email</label>
                  <input required type="email" placeholder="safety@company.com" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900" />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
