import React, { useState } from 'react';
import { CORPORATE_TIERS, MOCK_COMPANY_EMPLOYEES } from '../data/content';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Download, 
  ChevronRight, 
  Sparkles, 
  AlertTriangle,
  Send,
  Lock,
  Layers
} from 'lucide-react';
import { TierMode } from './TierSwitcherBanner';
import confetti from 'canvas-confetti';

interface B2BCorporatePortalProps {
  lang: 'en' | 'es';
  tier: TierMode;
}

export const B2BCorporatePortal: React.FC<B2BCorporatePortalProps> = ({ lang, tier }) => {
  const isEn = lang === 'en';
  const [employeeCount, setEmployeeCount] = useState<number>(12);
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-gold');
  const [activeTab, setActiveTab] = useState<'tiers' | 'dashboardDemo'>('tiers');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

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
    setQuoteSuccess(true);
    confetti({ particleCount: 70, spread: 60 });
    setTimeout(() => {
      setShowQuoteModal(false);
      setQuoteSuccess(false);
    }, 2500);
  };

  return (
    <section id="b2b-portal" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/30 mb-3">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>{isEn ? 'Official B2B Corporate Retainer Programs' : 'Programas Corporativos de Gestión B2B'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            {isEn ? 'Enterprise Safety Partnerships' : 'Alianzas Corporativas de Seguridad'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            {isEn
              ? 'Complete workforce safety programs designed to protect contractors from OSHA penalties, reduce insurance premiums, and streamline multi-site compliance.'
              : 'Programas integrales para proteger a constructoras de multas OSHA, reducir pólizas de seguro y certificar cuadrillas enteras.'}
          </p>

          {/* Toggle between Pricing Packages and Live Dashboard Demo */}
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl mt-8 shadow-lg">
            <button
              onClick={() => setActiveTab('tiers')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'tiers'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isEn ? '1. Packages & Tier Calculator' : '1. Calculadora de Paquetes ($27k–$160k)'}
            </button>
            <button
              onClick={() => setActiveTab('dashboardDemo')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'dashboardDemo'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEn ? '2. Live Company Portal Preview' : '2. Demo del Portal Corporativo'}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE CALCULATOR & PACKAGES */}
        {activeTab === 'tiers' && (
          <div className="space-y-12">
            
            {/* Interactive Crew Slider Tool */}
            <div className="max-w-2xl mx-auto p-6 rounded-2xl glass-card border border-amber-500/30 text-center shadow-2xl">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {isEn ? 'Interactive Workforce Size Estimator:' : 'Estimador Interactivo de Tamaño de Cuadrilla:'}
              </span>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="text-4xl font-black text-amber-400 font-heading">{employeeCount}</span>
                <span className="text-base text-slate-300 font-medium">
                  {isEn ? 'Active Employees / Workers' : 'Empleados / Trabajadores en Obra'}
                </span>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="1"
                max="50"
                value={employeeCount}
                onChange={e => handleSliderChange(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 mt-5"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>1 Worker</span>
                <span>10 (Silver)</span>
                <span>25 (Gold)</span>
                <span>50+ (Diamond Enterprise)</span>
              </div>
            </div>

            {/* 4 Corporate Tier Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CORPORATE_TIERS.map(tierItem => {
                const isSelected = selectedTierId === tierItem.id;

                return (
                  <div
                    key={tierItem.id}
                    onClick={() => setSelectedTierId(tierItem.id)}
                    className={`rounded-2xl p-6 bg-gradient-to-b ${tierItem.color} border ${
                      isSelected ? 'border-amber-400 ring-2 ring-amber-500/30 scale-[1.02]' : 'border-slate-800'
                    } transition-all cursor-pointer flex flex-col justify-between shadow-xl relative group`}
                  >
                    {tierItem.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-lg">
                        {isEn ? 'Most Popular for GCs' : 'Más Elegido por Contratistas'}
                      </span>
                    )}

                    <div>
                      {/* Header */}
                      <span className="text-xs font-black tracking-wider text-amber-400 font-mono">
                        {tierItem.tierTag}
                      </span>
                      <h3 className="text-xl font-black font-heading text-white mt-1">
                        {isEn ? tierItem.name : tierItem.nameEs}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-medium">
                        {isEn ? tierItem.employeeRange : tierItem.employeeRangeEs}
                      </p>

                      {/* Pricing */}
                      <div className="my-6 pt-4 border-t border-slate-800/80">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-white font-heading">
                            ${(tierItem.annualPrice / 1000).toFixed(0)}K
                          </span>
                          <span className="text-xs text-slate-400">/ {isEn ? 'year' : 'año'}</span>
                        </div>
                        <p className="text-xs text-amber-300/80 mt-0.5">
                          (${tierItem.monthlyPrice.toLocaleString()} / {isEn ? 'month' : 'mes'})
                        </p>
                      </div>

                      {/* Features List */}
                      <ul className="space-y-2.5 text-xs text-slate-300">
                        {(isEn ? tierItem.features : tierItem.featuresEs).map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-8 pt-4 border-t border-slate-800/60">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setShowQuoteModal(true);
                        }}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                            : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Request Official PDF Quote' : 'Solicitar Cotización PDF'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 2: LIVE COMPANY ADMIN DASHBOARD MOCKUP */}
        {activeTab === 'dashboardDemo' && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-8">
            
            {/* Dashboard Mockup Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-amber-400 font-heading">
                    APEX
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Apex Construction Group LLC
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="text-amber-400 font-semibold">🥈 Silver Workforce Safety Member</span>
                    <span>•</span>
                    <span>ID: #SOS-CORP-4809</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(isEn ? 'Generating OSHA 300 / Compliance Roster PDF Report...' : 'Generando Reporte Oficial para OSHA...')}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEn ? 'Export OSHA Audit Sheet' : 'Exportar Reporte OSHA'}</span>
                </button>

                <button
                  onClick={() => alert(isEn ? 'Opening Bulk CSV Employee Enrollment Drawer...' : 'Abriendo carga masiva de empleados por CSV...')}
                  className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{isEn ? '+ Add Employees' : '+ Cargar Empleados'}</span>
                </button>
              </div>
            </div>

            {/* 3 Metric Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">{isEn ? 'Active Workforce Compliance' : 'Cumplimiento de Cuadrilla'}</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-emerald-400 font-heading">94.2%</span>
                  <span className="text-xs text-emerald-500 font-semibold">{isEn ? 'OSHA Shield Active' : 'Blindaje Activo'}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">{isEn ? 'Corporate Seats Utilized' : 'Asientos de Capacitación'}</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-white font-heading">24 / 25</span>
                  <span className="text-xs text-slate-400 font-medium">1 Available</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">{isEn ? 'Certificates Expiring <30 Days' : 'Certificados por Vencer'}</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-amber-400 font-heading">1 Worker</span>
                  <span className="text-xs text-amber-500 font-semibold">{isEn ? 'Auto-Alert Sent' : 'Alerta Enviada'}</span>
                </div>
              </div>
            </div>

            {/* Live Employee Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white font-heading">
                  {isEn ? 'Active Field Roster & Safety Certifications' : 'Padrón de Trabajadores y Certificaciones'}
                </h4>
                <span className="text-xs text-slate-400 font-mono">5 of 24 displayed</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Worker / Name</th>
                      <th className="p-3">Trade / Role</th>
                      <th className="p-3">Certified Course</th>
                      <th className="p-3">Exam Score</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">QR Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                    {MOCK_COMPANY_EMPLOYEES.map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3 font-semibold text-white">{emp.name}</td>
                        <td className="p-3 text-slate-400">{emp.role}</td>
                        <td className="p-3 font-medium text-slate-200">{emp.course}</td>
                        <td className="p-3 font-mono font-bold text-amber-400">{emp.score}</td>
                        <td className="p-3">
                          {emp.status === 'Certified' && (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3" /> Certified
                            </span>
                          )}
                          {emp.status === 'Expiring Soon' && (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                              <AlertTriangle className="w-3 h-3" /> Expiring Soon
                            </span>
                          )}
                          {emp.status.startsWith('In Progress') && (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                              {emp.status}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => alert(`Viewing QR Certificate for ${emp.name} (${emp.course}). ID: SOS-2026-${Math.floor(Math.random()*90000)}`)}
                            className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline"
                          >
                            View QR Card
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Quote Request Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold font-heading text-white">
              {isEn ? 'Request Official B2B Corporate Quote' : 'Solicitar Cotización Corporativa'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              {isEn
                ? 'We will issue an official Net-30 invoice & custom training proposal for your review.'
                : 'Emitiremos una cotización oficial con términos de pago y propuesta personalizada.'}
            </p>

            <form onSubmit={handleQuoteSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">{isEn ? 'Company Name' : 'Empresa'}</label>
                <input
                  required
                  type="text"
                  placeholder="Apex Construction Group"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">{isEn ? 'Contact Email' : 'Correo de Contacto'}</label>
                <input
                  required
                  type="email"
                  placeholder="safety@apexbuilders.com"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">{isEn ? 'Estimated Workforce Size' : 'Cantidad de Trabajadores'}</label>
                <input
                  type="number"
                  defaultValue={employeeCount}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="w-1/2 py-2.5 rounded-lg bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-colors"
                >
                  {isEn ? 'Cancel' : 'Cancelar'}
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                >
                  {isEn ? 'Send Request' : 'Enviar Solicitud'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
