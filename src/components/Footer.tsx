import React from 'react';
import { Shield, Lock, Globe, Mail, CheckCircle2 } from 'lucide-react';
import type { TierMode } from './TierSwitcherBanner';

interface FooterProps {
  lang: 'en' | 'es';
  tier: TierMode;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isEn = lang === 'en';

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & OSHA Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black font-heading text-sm shadow-md">
                SOS
              </div>
              <div>
                <span className="font-heading font-black text-lg text-white tracking-tight block leading-none">
                  SHINING ON SAFETY
                </span>
                <span className="text-[8px] text-sky-400 font-bold tracking-widest uppercase">
                  CONSTRUCTION SAFETY SOLUTIONS
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'OSHA-aligned certifications, on-site compliance audits, and corporate safety leadership programs built for construction GCs and specialty trade contractors.'
                : 'Certificaciones alineadas a OSHA, auditorías de cumplimiento en obra y programas corporativos de seguridad para constructoras y contratistas especializados.'}
            </p>
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-[11px]">
              <Lock className="w-3.5 h-3.5" />
              <span>Square 256-Bit Encrypted Payments</span>
            </div>
          </div>

          {/* Col 2: Training Courses */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              {isEn ? 'Certified Courses ($180–$349)' : 'Cursos Certificados ($180–$349)'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">OSHA Fall Protection & Heights</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Scaffolding Competent Person</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">OSHA 10-Hour Construction</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Hazard Communication (GHS)</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Trenching & Excavation Safety</a></li>
            </ul>
          </div>

          {/* Col 3: Corporate Retainers */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              {isEn ? 'Corporate Programs ($27k–$160k)' : 'Programas Corporativos ($27k–$160k)'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#b2b-portal" className="hover:text-blue-400 transition-colors">Bronze Compliance Program ($27K/yr)</a></li>
              <li><a href="#b2b-portal" className="hover:text-blue-400 transition-colors">Silver Workforce Safety ($48K/yr)</a></li>
              <li><a href="#b2b-portal" className="hover:text-blue-400 transition-colors">Gold Safety Management ($84K/yr)</a></li>
              <li><a href="#b2b-portal" className="hover:text-blue-400 transition-colors">Diamond Enterprise Partnership ($160K/yr)</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Accreditation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              {isEn ? 'Safety University Headquarters' : 'Contacto y Soporte'}
            </h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>contact@shiningonsafety.us</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <span>shiningonsafety.us</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isEn ? 'Authorized OSHA Outreach Trainers' : 'Instructores Autorizados OSHA'}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Developer Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>
            © {new Date().getFullYear()} Shining On Safety LLC. All Rights Reserved. OSHA Standard Compliance 29 CFR 1926.
          </p>
          <div className="flex items-center gap-3">
            <span>Terms of Service</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Refund Guidelines</span>
            <span>•</span>
            <span className="text-blue-400 font-semibold font-mono">Powered by Uanify</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
