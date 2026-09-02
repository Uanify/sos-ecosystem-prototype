import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight, Flame, ShieldAlert, Sparkles, Phone, Mail, Building, User } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RiskAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
}

export const RiskAssessmentModal: React.FC<RiskAssessmentModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    crewSize: '',
    certifications: '',
    inspections: '',
    manual: '',
    mockAudit: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleOptionSelect = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    if (step < 5) {
      setStep(step + 1);
    } else {
      setStep(6); // Results & Lead form
    }
  };

  const calculateRiskScore = () => {
    let risk = 35; // base
    if (answers.certifications === 'some' || answers.certifications === 'expired') risk += 25;
    if (answers.inspections === 'occasional' || answers.inspections === 'never') risk += 20;
    if (answers.manual === 'no' || answers.manual === 'outdated') risk += 15;
    if (answers.mockAudit === 'no') risk += 10;
    return Math.min(risk, 95);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const riskScore = calculateRiskScore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
              {isEn ? 'OSHA Jobsite Risk & Compliance Scorecard' : 'Evaluador de Riesgo y Cumplimiento OSHA'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Interactive Self-Assessment Tool for General Contractors' : 'Herramienta Interactiva de Autodiagnóstico para Constructoras'}
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        {!isSubmitted && step <= 5 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>{isEn ? `Question ${step} of 5` : `Pregunta ${step} de 5`}</span>
              <span className="text-amber-400">{Math.round((step / 5) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* QUESTIONS STEP 1 to 5 */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-slate-100">
              {isEn
                ? '1. How many active workers/tradesmen do you manage on active jobsites?'
                : '1. ¿Cuántos trabajadores o cuadrillas activas gestiona en obra?'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: isEn ? '1 to 5 Employees' : '1 a 5 Empleados', val: '1-5', sub: 'Bronze Tier Fit' },
                { label: isEn ? '5 to 10 Employees' : '5 a 10 Empleados', val: '5-10', sub: 'Silver Tier Fit' },
                { label: isEn ? '10 to 25 Employees' : '10 a 25 Empleados', val: '10-25', sub: 'Gold Tier Fit' },
                { label: isEn ? '25+ Employees (Enterprise)' : 'Más de 25 Empleados (Empresarial)', val: '25+', sub: 'Diamond Tier Fit' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleOptionSelect('crewSize', opt.val)}
                  className="p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500 text-left transition-all group"
                >
                  <span className="font-bold text-slate-100 block group-hover:text-amber-400">{opt.label}</span>
                  <span className="text-xs text-slate-400">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-slate-100">
              {isEn
                ? '2. Are all your field workers currently certified in Fall Protection & OSHA basics?'
                : '2. ¿Todos sus trabajadores tienen certificados vigentes de Protección Contra Caídas y OSHA?'}
            </h4>
            <div className="space-y-3 pt-2">
              {[
                { label: isEn ? 'Yes, 100% certified with digital records' : 'Sí, 100% certificados con respaldo digital', val: 'all' },
                { label: isEn ? 'Some are certified, but records are scattered/untracked' : 'Algunos están certificados pero no están centralizados', val: 'some' },
                { label: isEn ? 'Unsure or certificates have likely expired (>12 months)' : 'No estoy seguro o probablemente ya expiraron', val: 'expired' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleOptionSelect('certifications', opt.val)}
                  className="w-full p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500 text-left transition-all font-medium text-slate-200 hover:text-amber-300"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-slate-100">
              {isEn
                ? '3. How frequently are daily pre-shift safety checklists (scaffolds, trenches) documented?'
                : '3. ¿Con qué frecuencia se documentan listas de verificación diarias (andamios, zanjas)?'}
            </h4>
            <div className="space-y-3 pt-2">
              {[
                { label: isEn ? 'Daily in writing with supervisor signatures' : 'Diariamente por escrito y firmado por supervisor', val: 'daily' },
                { label: isEn ? 'Occasionally / only on high-risk task days' : 'Ocasionalmente / solo en tareas de alto riesgo', val: 'occasional' },
                { label: isEn ? 'Rarely or verbally without written documentation' : 'Rara vez o verbalmente sin registro escrito', val: 'never' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleOptionSelect('inspections', opt.val)}
                  className="w-full p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500 text-left transition-all font-medium text-slate-200 hover:text-amber-300"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-slate-100">
              {isEn
                ? '4. Do you have an official, customized Company Safety Manual for your active trade?'
                : '4. ¿Cuenta su empresa con un Manual de Seguridad personalizado para su especialidad?'}
            </h4>
            <div className="space-y-3 pt-2">
              {[
                { label: isEn ? 'Yes, up to date and reviewed annually' : 'Sí, actualizado y revisado anualmente', val: 'yes' },
                { label: isEn ? 'We have a generic / outdated template' : 'Tenemos una plantilla genérica o desactualizada', val: 'outdated' },
                { label: isEn ? 'No formal written safety program in place' : 'No tenemos programa formal por escrito', val: 'no' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleOptionSelect('manual', opt.val)}
                  className="w-full p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500 text-left transition-all font-medium text-slate-200 hover:text-amber-300"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-slate-100">
              {isEn
                ? '5. Has an independent safety auditor conducted an on-site mock inspection in the last 12 months?'
                : '5. ¿Un auditor de seguridad ha realizado un simulacro de inspección en su obra en los últimos 12 meses?'}
            </h4>
            <div className="space-y-3 pt-2">
              {[
                { label: isEn ? 'Yes, audited recently with corrective action log' : 'Sí, auditado recientemente con plan de acción', val: 'yes' },
                { label: isEn ? 'No, we have never had a professional pre-OSHA audit' : 'No, nunca hemos tenido una auditoría preventiva', val: 'no' },
              ].map(opt => (
                <button
                  key={opt.val}
                  onClick={() => handleOptionSelect('mockAudit', opt.val)}
                  className="w-full p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500 text-left transition-all font-medium text-slate-200 hover:text-amber-300"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: DYNAMIC SCORECARD & LEAD FORM */}
        {step === 6 && !isSubmitted && (
          <div className="space-y-6">
            
            {/* Score Display Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    {isEn ? 'Estimated Jobsite OSHA Risk Score:' : 'Nivel de Riesgo OSHA Estimado:'}
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-3xl font-black text-orange-400 font-heading">
                      {riskScore}% RISK
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 font-bold border border-orange-500/40">
                      {riskScore > 60 ? (isEn ? 'High Penalty Exposure' : 'Alto Riesgo de Multas') : (isEn ? 'Moderate Vulnerability' : 'Vulnerabilidad Moderada')}
                    </span>
                  </div>
                </div>
                <AlertTriangle className="w-10 h-10 text-orange-400 shrink-0" />
              </div>

              <p className="text-xs text-slate-400 mt-3 border-t border-slate-800/80 pt-2.5">
                {isEn
                  ? 'OSHA maximum penalties for serious violations exceed $16,131 per infraction. Recommended Action: On-site safety audit & digital compliance tracking.'
                  : 'Las multas OSHA por violaciones graves superan los $16,131 por infracción. Acción recomendada: Auditoría preventiva en obra y seguimiento digital.'}
              </p>
            </div>

            {/* Lead Capture Form */}
            <form onSubmit={handleSubmitLead} className="space-y-4">
              <p className="text-sm font-semibold text-slate-200">
                {isEn
                  ? 'Get your Full Custom PDF Audit Report & Schedule a Free 15-Min Consultation:'
                  : 'Reciba su Reporte Completo en PDF y Agende una Consulta Gratuita de 15 Minutos:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{isEn ? 'Your Name' : 'Su Nombre'}</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder={isEn ? "John Miller" : "Juan Pérez"}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{isEn ? 'Company Name' : 'Empresa / Constructora'}</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder={isEn ? "Apex Construction Group" : "Constructora Apex"}
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{isEn ? 'Work Email' : 'Correo Electrónico'}</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="safety@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{isEn ? 'Phone / WhatsApp' : 'Teléfono / WhatsApp'}</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>{isEn ? 'Send My Scorecard & Book Safety Review' : 'Enviar Mi Scorecard y Agendar Revisión'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        {/* SUBMISSION CONFIRMATION */}
        {isSubmitted && (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold font-heading text-white">
              {isEn ? 'Audit Request Received!' : '¡Solicitud de Auditoría Recibida!'}
            </h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              {isEn
                ? `Thank you ${formData.name}. Your OSHA Risk Report has been emailed to ${formData.email}. Melanie Jaime or our senior safety team will contact you shortly.`
                : `Gracias ${formData.name}. Su reporte de riesgo OSHA fue enviado a ${formData.email}. Melanie Jaime o nuestro equipo de seguridad se comunicará a la brevedad.`}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors mt-2"
            >
              {isEn ? 'Back to Platform' : 'Volver a la Plataforma'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
