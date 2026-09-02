import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  HardHat, 
  QrCode, 
  GraduationCap, 
  FileCheck, 
  Users, 
  Clock, 
  Building2,
  ArrowRight,
  Flame,
  FileSpreadsheet
} from 'lucide-react';

interface CompetitiveAdvantageProps {
  lang: 'en' | 'es';
  onOpenRiskCalculator: () => void;
  onOpenQRVerify: () => void;
}

export const CompetitiveAdvantageSection: React.FC<CompetitiveAdvantageProps> = ({
  lang,
  onOpenRiskCalculator,
  onOpenQRVerify,
}) => {
  const isEn = lang === 'en';

  const comparisonRows = [
    {
      feature: isEn ? 'Subcontractor Crew Tracking' : 'Seguimiento de Cuadrillas',
      sos: isEn ? 'Live Cloud Portal + Instant Excel/OSHA 300A Export' : 'Portal en la Nube en Vivo + Exportación OSHA 300A',
      competitor: isEn ? 'Manual Paperwork, Spreadsheets & Email Chains' : 'Papeles Manuales, Hojas Sueltas y Correos',
      sosAdvantage: true,
    },
    {
      feature: isEn ? 'Jobsite Credential Verification' : 'Validación de Credenciales en Obra',
      sos: isEn ? '24/7 Tamper-Proof Hardhat QR Code Scan (2 Seconds)' : 'Escaneo de Código QR en Casco Anti-Alteración (2 Segundos)',
      competitor: isEn ? 'Physical Paper Cards (Prone to Fraud & Delay)' : 'Tarjetas de Cartón Falsificables o Extraviables',
      sosAdvantage: true,
    },
    {
      feature: isEn ? 'Course Delivery & Availability' : 'Disponibilidad de Cursos',
      sos: isEn ? '100% Self-Paced HD Video LMS + Mobile Exam Engine' : 'Campus 100% Virtual con Video HD y Exámenes Móviles',
      competitor: isEn ? 'Scheduled In-Person Classes with Rigid Timetables' : 'Clases Presenciales Rígidas con Pérdida de Horas de Trabajo',
      sosAdvantage: true,
    },
    {
      feature: isEn ? 'Workforce Language Parity' : 'Inclusión y Paridad de Idioma',
      sos: isEn ? 'Native English & Spanish Dual-Platform Parity' : 'Plataforma Bilingüe Nativa (Inglés y Español)',
      competitor: isEn ? 'English-Centric with Fragmented Spanish Support' : 'Centrado en Inglés con Soporte Fragmentado',
      sosAdvantage: true,
    },
    {
      feature: isEn ? 'Corporate Retainer Flexibility' : 'Transparencia en Convenios Anuales',
      sos: isEn ? 'Transparent Workforce Tiers ($27k–$160k) + Self-Serve Quotes' : 'Planes Claros por Cuadrilla ($27k–$160k) y Cotizador en 1 Clic',
      competitor: isEn ? 'Opaque Pricing Hidden Behind Lengthy Sales Cycles' : 'Precios Ocultos con Llamadas Comerciales Tardadas',
      sosAdvantage: true,
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 bg-sky-950/80 px-3.5 py-1.5 rounded-full border border-sky-800/80">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>{isEn ? 'Industry Leadership & Digital Superiority' : 'Liderazgo y Ventaja Competitiva'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            {isEn ? (
              <>Why General Contractors Choose <br /><span className="text-sky-400">Shining On Safety</span></>
            ) : (
              <>Por Qué las Grandes Constructoras Eligen <br /><span className="text-sky-400">Shining On Safety</span></>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {isEn
              ? 'Combining high-touch on-site safety consulting with next-generation digital cloud credentialing. Compare how SOS outperforms traditional safety staffing firms.'
              : 'Combinamos asesoría y auditorías directas en obra con la plataforma digital más avanzada de credencialización en la nube.'}
          </p>
        </div>

        {/* 3 Pillars of On-Site Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <HardHat className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              {isEn ? '1. Jobsite Safety Specialists & Audits' : '1. Especialistas en Obra y Auditorías'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isEn
                ? 'Certified CSP & CHST field safety managers performing mock OSHA inspections, site-specific safety plans (SSSP), and hazard assessments.'
                : 'Supervisores certificados en obra realizando simulacros de inspección OSHA, planes de seguridad específicos (SSSP) y control de riesgos.'}
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-600/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              {isEn ? '2. Instant Hardhat QR Verification' : '2. Validación Instantánea por QR'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isEn
                ? 'Every trainee receives a weatherproof hardhat sticker and laminated card with dynamic QR code, allowing superintendents to verify OSHA compliance in 2 seconds.'
                : 'Cada trabajador recibe un sticker para casco y tarjeta con código QR dinámico para comprobar el cumplimiento OSHA en 2 segundos.'}
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              {isEn ? '3. Corporate Retainer Peace of Mind' : '3. Convenios Anuales de Cumplimiento'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isEn
                ? 'Comprehensive annual partnerships ($27k–$160k) protecting general contractors with proactive supervisor workshops and OSHA compliance logs.'
                : 'Alianzas corporativas ($27k–$160k) que blindan legalmente a la constructora con talleres de liderazgo y bitácoras de cumplimiento.'}
            </p>
          </div>
        </div>

        {/* Head-to-Head Comparison Table */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-6 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
                {isEn ? 'Market Comparison' : 'Comparativa de Mercado'}
              </span>
              <h3 className="text-xl font-black font-heading text-white mt-0.5">
                {isEn ? 'Shining On Safety vs. Traditional Safety Providers' : 'Shining On Safety vs. Proveedores Tradicionales'}
              </h3>
            </div>
            <span className="text-xs bg-blue-600/30 text-blue-300 border border-blue-500/40 px-3 py-1 rounded-full font-bold">
              {isEn ? 'Next-Gen Digital Platform' : 'Plataforma Digital de Nueva Generación'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="p-4 w-1/3">Capability / Deliverable</th>
                  <th className="p-4 w-1/3 text-sky-300 bg-blue-950/60 font-black border-x border-blue-900">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-sky-400" />
                      <span>Shining On Safety (Modern Ecosystem)</span>
                    </div>
                  </th>
                  <th className="p-4 w-1/3 text-slate-400">
                    <span>Traditional Providers (e.g. Onsite Safety)</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950 text-slate-200">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4 font-bold text-white">
                      {row.feature}
                    </td>
                    <td className="p-4 bg-blue-950/40 border-x border-blue-900 font-semibold text-sky-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{row.sos}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400 font-medium">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{row.competitor}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-6 bg-slate-900/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              {isEn
                ? 'Ready to modernize your jobsite compliance and certify your crews?'
                : '¿Listo para modernizar la seguridad de sus obras y certificar a sus cuadrillas?'}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenQRVerify}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
              >
                {isEn ? 'Test Live QR Validator' : 'Probar Validador QR'}
              </button>
              <button
                onClick={onOpenRiskCalculator}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              >
                {isEn ? 'Free OSHA Risk Audit →' : 'Auditoría OSHA Gratis →'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
