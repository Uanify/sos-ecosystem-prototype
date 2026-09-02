import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  Building2, 
  Play
} from 'lucide-react';
import { SafeImage } from './SafeImage';
import type { TierMode } from './TierSwitcherBanner';

interface HeroProps {
  lang: 'en' | 'es';
  tier: TierMode;
  onOpenRiskCalculator: () => void;
  onOpenVideoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenRiskCalculator,
  onOpenVideoModal,
}) => {
  const isEn = lang === 'en';

  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 bg-[#07132B] text-slate-100 border-b-2 border-slate-800 relative overflow-hidden">
      {/* Blue technical grid background */}
      <div className="absolute inset-0 bg-grid-industrial opacity-30 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Technical Safety Badge with Amber Signal Accent */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-950/90 border border-blue-600 text-sky-200 text-xs font-bold font-mono tracking-wider shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>
                {isEn
                  ? 'OSHA 29 CFR 1926 • CONSTRUCTION COMPLIANCE ENGINE'
                  : 'NORMATIVA OSHA 29 CFR 1926 • SEGURIDAD EN CONSTRUCCIÓN'}
              </span>
            </div>

            {/* Main Heading — Heavy Industrial Bold Typography with SOS Brand Signature */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-[1.05]">
              {isEn ? (
                <>
                  YOUR CREW GETS CERTIFIED. <br />
                  <span className="text-sky-400 font-black">YOU STAY 100% OSHA-COMPLIANT.</span>
                </>
              ) : (
                <>
                  TU CUADRILLA SE CERTIFICA. <br />
                  <span className="text-sky-400 font-black">TÚ CUMPLES AL 100% EN OBRA.</span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {isEn
                ? 'Online OSHA courses ($180–$349) with instant QR-verified certificates, plus annual safety management programs ($27k–$160k/yr) built around the way construction crews actually work.'
                : 'Cursos OSHA en línea ($180–$349) con certificados verificables por QR, más programas de seguridad anual ($27k–$160k/año) diseñados para la realidad del trabajo en obra.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#courses"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider font-mono shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer border border-blue-400/30"
              >
                <span>{isEn ? 'Explore Certified Courses' : 'Explorar Cursos Certificados'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenRiskCalculator}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wider font-mono border border-slate-700 hover:border-sky-400 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-sky-400" />
                <span>{isEn ? 'OSHA Compliance Scorecard' : 'Diagnóstico de Riesgo OSHA'}</span>
              </button>
            </div>

            {/* Proof Points — High contrast industrial stats in pure blue / white palette */}
            <div className="flex flex-wrap items-start gap-6 pt-6 border-t border-slate-800 text-left">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-lg font-black text-sky-400 font-heading">29 CFR 1926</p>
                <p className="text-[11px] text-slate-400 font-medium">{isEn ? 'OSHA Construction Standard' : 'Norma OSHA Construcción'}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-lg font-black text-sky-300 font-heading">100% Online</p>
                <p className="text-[11px] text-slate-400 font-medium">{isEn ? 'Self-Paced Video LMS' : 'Campus Virtual 24/7'}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-lg font-black text-emerald-400 font-heading">QR on Hardhat</p>
                <p className="text-[11px] text-slate-400 font-medium">{isEn ? 'Jobsite verification in 2s' : 'Verificación en obra en 2s'}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Platform Showcase Card — Clean Blue/Navy Terminal Look */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#0B1A3A] rounded-2xl p-6 border-2 border-blue-600/50 shadow-2xl overflow-hidden group">
              
              {/* Card Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500/40" />
                  <span className="text-xs text-sky-200 font-mono font-bold ml-2">university.shiningonsafety.us</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-700 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {isEn ? 'ACTIVE LMS' : 'LMS ACTIVO'}
                </span>
              </div>

              {/* Lesson Video Showcase */}
              <div className="relative rounded-xl overflow-hidden mt-4 aspect-video bg-black border border-blue-900 group-hover:border-sky-400 transition-colors shadow-inner">
                <SafeImage
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80"
                  alt="OSHA Training Course Lesson"
                  type="video"
                  title="Fall Protection Lesson 01"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                  <button
                    onClick={onOpenVideoModal}
                    className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer border border-sky-300/40"
                    aria-label="Play Lesson Preview"
                  >
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </button>
                </div>
                <div className="absolute bottom-2.5 left-2.5 bg-slate-950/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-mono font-bold text-sky-300 border border-slate-800">
                  {isEn ? 'MOD 01: Fall Hazard Recognition' : 'MÓD 01: Reconocimiento de Caídas'}
                </div>
              </div>

              {/* Corporate Program Highlight Bar */}
              <div className="mt-4 p-3.5 rounded-xl bg-blue-950/70 border border-blue-800/60 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-sky-300 font-bold uppercase tracking-wider font-mono">{isEn ? 'Corporate Retainer Match' : 'Convenio de Obra'}</p>
                  <p className="text-xs font-bold text-white">
                    {isEn ? 'Silver Workforce Safety ($48,000 / yr)' : 'Programa Silver ($48,000 / año)'}
                  </p>
                </div>
                <a
                  href="#b2b-portal"
                  className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors font-mono uppercase"
                >
                  {isEn ? 'View Tiers' : 'Ver Planes'}
                </a>
              </div>

              {/* Instructor Verification Bar */}
              <div className="mt-4 pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-900/80 text-sky-300 font-bold text-xs flex items-center justify-center font-mono border border-blue-700">
                    SJ
                  </div>
                  <div>
                    <span className="text-white font-bold block leading-none">Sarah Jenkins, CSP</span>
                    <span className="text-[10px] text-slate-400 font-medium">{isEn ? 'Authorized Outreach Trainer' : 'Instructora Autorizada OSHA'}</span>
                  </div>
                </div>
                <span className="text-sky-300 font-mono text-[11px] font-black bg-blue-950 px-2 py-0.5 rounded border border-blue-500/40">29 CFR 1926</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
