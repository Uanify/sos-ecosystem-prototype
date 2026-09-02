import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Users, 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  Building2, 
  Star,
  Play
} from 'lucide-react';
import { TierMode } from './TierSwitcherBanner';

interface HeroProps {
  lang: 'en' | 'es';
  tier: TierMode;
  onOpenRiskCalculator: () => void;
  onOpenVideoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  tier,
  onOpenRiskCalculator,
  onOpenVideoModal,
}) => {
  const isEn = lang === 'en';

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-inner">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                {isEn
                  ? 'Official OSHA Compliance & Safety Training Leader'
                  : 'Líder en Capacitación y Cumplimiento OSHA'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-[1.1]">
              {isEn ? (
                <>
                  Build a Zero-Incident Jobsite. <br />
                  <span className="gradient-text-amber">Certify Your Crews Fast.</span>
                </>
              ) : (
                <>
                  Construya Obras Sin Accidentes. <br />
                  <span className="gradient-text-amber">Certifique a sus Cuadrillas Hoy.</span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {isEn
                ? 'From individual OSHA-aligned certifications ($180–$349) to full-scale corporate safety management retainers ($27k–$160k). Empower your construction workforce with accredited, job-ready safety training.'
                : 'Desde certificaciones individuales con validez OSHA ($180–$349) hasta gestión corporativa integral de seguridad ($27k–$160k). Capacite a sus trabajadores con cursos acreditados e inmediatos.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#courses"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>{isEn ? 'Explore Certified Courses' : 'Explorar Cursos Certificados'}</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={onOpenRiskCalculator}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-semibold text-base border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-center gap-2 shadow-lg group"
              >
                <Flame className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span>{isEn ? 'Free OSHA Risk Scorecard' : 'Test de Riesgo OSHA Gratis'}</span>
              </button>
            </div>

            {/* Trust Proof Points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-heading">15,000+</p>
                <p className="text-xs text-slate-400">{isEn ? 'Workers Certified' : 'Trabajadores Certificados'}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">99.4%</p>
                <p className="text-xs text-slate-400">{isEn ? 'Exam Pass Rate' : 'Tasa de Aprobación'}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">24/7 QR</p>
                <p className="text-xs text-slate-400">{isEn ? 'Tamper-Proof Verify' : 'Validación Anti-Fraude'}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Card Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Feature Card */}
            <div className="relative glass-card rounded-2xl p-6 border border-slate-700/60 shadow-2xl overflow-hidden group">
              
              {/* Top Card Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-400 font-mono ml-2">university.shiningonsafety.us</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  {isEn ? 'Live Verified' : 'Activo Verificado'}
                </span>
              </div>

              {/* Card Hero Image with Play Overlay */}
              <div className="relative rounded-xl overflow-hidden mt-4 aspect-video bg-slate-900 border border-slate-800 group-hover:border-amber-500/40 transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80"
                  alt="OSHA Training Course"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <button
                    onClick={onOpenVideoModal}
                    className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/40 hover:scale-110 transition-transform cursor-pointer"
                    aria-label="Play Lesson Preview"
                  >
                    <Play className="w-6 h-6 fill-slate-950 ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-white">
                  🎬 {isEn ? 'Preview: Fall Protection Lesson 01' : 'Avance: Lección de Protección Contra Caídas'}
                </div>
              </div>

              {/* Floating Badge: B2B Program Highlight */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">{isEn ? 'B2B Workforce Tier' : 'Programa Corporativo B2B'}</p>
                  <p className="text-sm font-bold text-amber-300 font-heading">
                    {isEn ? '🥈 Silver Safety ($48,000 / yr)' : '🥈 Programa Silver ($48,000 / año)'}
                  </p>
                </div>
                <a
                  href="#b2b-portal"
                  className="text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {isEn ? 'View Tiers' : 'Ver Paquetes'}
                </a>
              </div>

              {/* Instructors Verified Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black text-xs">
                    MJ
                  </div>
                  <div>
                    <span className="text-white font-semibold block leading-none">Melanie Jaime</span>
                    <span className="text-[10px] text-slate-400">{isEn ? 'Lead OSHA Trainer' : 'Especialista OSHA'}</span>
                  </div>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">29 CFR 1926</span>
              </div>

            </div>

          </div>

        </div>

        {/* Corporate Client Logos Carousel Banner */}
        <div className="mt-16 pt-8 border-t border-slate-800/80">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            {isEn
              ? 'Trusted by Leading General Contractors & Commercial Builders'
              : 'Con la Confianza de Grandes Constructoras y Contratistas Generales'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 text-slate-300 font-heading font-black text-lg">
              <Building2 className="w-5 h-5 text-amber-400" /> APEX BUILDERS GROUP
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-heading font-black text-lg">
              <Building2 className="w-5 h-5 text-amber-400" /> HORIZON INDUSTRIAL
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-heading font-black text-lg">
              <Building2 className="w-5 h-5 text-amber-400" /> MATRIX CONTRACTORS
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-heading font-black text-lg">
              <Building2 className="w-5 h-5 text-amber-400" /> SUMMIT COMMERCIAL
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
