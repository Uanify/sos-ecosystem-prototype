import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight, Flame, Phone, Mail, Building, User } from 'lucide-react';
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
      setStep(6);
    }
  };

  const calculateRiskScore = () => {
    let risk = 35;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black font-heading text-slate-950">
              {isEn ? 'OSHA Jobsite Risk & Compliance Scorecard' : 'Evaluador de Riesgo y Cumplimiento OSHA'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {isEn ? 'Interactive Self-Assessment Tool for General Contractors' : 'Herramienta Interactiva de Autodiagnóstico para Constructoras'}
            </p>
          </div>
        </div>

        {/* Step Indicator & Reset */}
        {!isSubmitted && step <= 5 && (
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs text-slate-500 font-bold mb-2">
              <div className="flex items-center gap-2">
                <span>{isEn ? `Question ${step} of 5` : `Pregunta ${step} de 5`}</span>
                {step > 1 && (
                  <button
                    onClick={() => {
                      setStep(1);
                      setAnswers({
                        crewSize: '',
                        certifications: '',
                        inspections: '',
                        manual: '',
                        mockAudit: '',
                      });
                      setIsSubmitted(false);
                    }}
                    className="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer"
                  >
                    ({isEn ? 'Restart' : 'Reiniciar'})
                  </button>
                )}
              </div>
              <span className="text-blue-600 font-mono">
                {Math.round(((step - 1) / 5) * 100)}% {isEn ? 'Completed' : 'Completado'}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((step - 1) / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* QUESTIONS STEP 1 to 5 */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-slate-950">
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
                  className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-500 text-left transition-all group shadow-xs"
                >
                  <span className="font-bold text-slate-900 block group-hover:text-blue-600">{opt.label}</span>
                  <span className="text-xs text-slate-500 font-medium">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-slate-950">
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
                  className="w-full p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-500 text-left transition-all font-semibold text-slate-800 hover:text-blue-700 shadow-xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-slate-950">
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
                  className="w-full p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-500 text-left transition-all font-semibold text-slate-800 hover:text-blue-700 shadow-xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-slate-950">
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
                  className="w-full p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-500 text-left transition-all font-semibold text-slate-800 hover:text-blue-700 shadow-xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-slate-950">
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
                  className="w-full p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-500 text-left transition-all font-semibold text-slate-800 hover:text-blue-700 shadow-xs"
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
            <div className="p-5 rounded-xl bg-amber-50 border-2 border-amber-300">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-800 uppercase tracking-wider font-bold">
                    {isEn ? 'Estimated Jobsite OSHA Risk Score:' : 'Nivel de Riesgo OSHA Estimado:'}
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-3xl font-black text-amber-600 font-heading">
                      {riskScore}% RISK
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 font-bold">
                      {riskScore > 60 ? (isEn ? 'High Penalty Exposure' : 'Alto Riesgo de Multas') : (isEn ? 'Moderate Vulnerability' : 'Vulnerabilidad Moderada')}
                    </span>
                  </div>
                </div>
                <AlertTriangle className="w-10 h-10 text-amber-600 shrink-0" />
              </div>

              <p className="text-xs text-slate-700 mt-3 border-t border-amber-200 pt-2.5 font-medium">
                {isEn
                  ? 'OSHA maximum penalties for serious violations exceed $16,131 per infraction. Recommended Action: On-site safety audit & digital compliance tracking.'
                  : 'Las multas OSHA por violaciones graves superan los $16,131 por infracción. Acción recomendada: Auditoría preventiva en obra y seguimiento digital.'}
              </p>
            </div>

            {/* Lead Capture Form */}
            <form onSubmit={handleSubmitLead} className="space-y-4">
              <p className="text-sm font-bold text-slate-900">
                {isEn
                  ? 'Get your Full Custom PDF Audit Report & Schedule a Free 15-Min Consultation:'
                  : 'Reciba su Reporte Completo en PDF y Agende una Consulta Gratuita de 15 Minutos:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isEn ? 'Your Name' : 'Su Nombre'}</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder={isEn ? "John Miller" : "Juan Pérez"}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isEn ? 'Company Name' : 'Empresa / Constructora'}</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder={isEn ? "Apex Construction Group" : "Constructora Apex"}
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isEn ? 'Work Email' : 'Correo Electrónico'}</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="safety@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{isEn ? 'Phone / WhatsApp' : 'Teléfono / WhatsApp'}</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-4"
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
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black font-heading text-slate-950">
              {isEn ? 'Audit Request Received!' : '¡Solicitud de Auditoría Recibida!'}
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
              {isEn
                ? `Thank you ${formData.name}. Your OSHA Risk Report has been emailed to ${formData.email}. Our authorized safety specialists will contact you shortly.`
                : `Gracias ${formData.name}. Su reporte de riesgo OSHA fue enviado a ${formData.email}. Nuestros especialistas de seguridad se comunicarán a la brevedad.`}
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setStep(1);
                  setIsSubmitted(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                {isEn ? 'Retake Scorecard Test' : 'Repetir Evaluación'}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                {isEn ? 'Close & Return to Home' : 'Cerrar y Volver al Inicio'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
