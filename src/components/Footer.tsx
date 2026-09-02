import React from 'react';
import { Shield, Award, Lock, Globe, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { TierMode } from './TierSwitcherBanner';

interface FooterProps {
  lang: 'en' | 'es';
  tier: TierMode;
}

export const Footer: React.FC<FooterProps> = ({ lang, tier }) => {
  const isEn = lang === 'en';

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & OSHA Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950">
                <Shield className="w-5 h-5 fill-slate-950" />
              </div>
              <span className="font-heading font-black text-lg text-white tracking-tight">
                SHINING ON SAFETY
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Empowering construction general contractors, safety directors, and trade crews with OSHA-aligned certifications, on-site audits, and corporate safety leadership programs.'
                : 'Capacitando a constructoras, directores de seguridad y cuadrillas con certificaciones oficiales OSHA, auditorías en obra y programas de gestión corporativa.'}
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-[11px]">
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
              <li><a href="#courses" className="hover:text-amber-400 transition-colors">OSHA Fall Protection & Heights</a></li>
              <li><a href="#courses" className="hover:text-amber-400 transition-colors">Scaffolding Competent Person</a></li>
              <li><a href="#courses" className="hover:text-amber-400 transition-colors">OSHA 10-Hour Construction</a></li>
              <li><a href="#courses" className="hover:text-amber-400 transition-colors">Hazard Communication (GHS)</a></li>
              <li><a href="#courses" className="hover:text-amber-400 transition-colors">Trenching & Excavation Safety</a></li>
            </ul>
          </div>

          {/* Col 3: Corporate Retainers */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              {isEn ? 'Corporate Programs ($27k–$160k)' : 'Programas Corporativos ($27k–$160k)'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#b2b-portal" className="hover:text-amber-400 transition-colors">🥉 Bronze Compliance Program ($27K)</a></li>
              <li><a href="#b2b-portal" className="hover:text-amber-400 transition-colors">🥈 Silver Workforce Safety ($48K)</a></li>
              <li><a href="#b2b-portal" className="hover:text-amber-400 transition-colors">🥇 Gold Safety Management ($84K)</a></li>
              <li><a href="#b2b-portal" className="hover:text-amber-400 transition-colors">💎 Diamond Enterprise Partnership ($160K)</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Accreditation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              {isEn ? 'Safety University Headquarters' : 'Contacto y Soporte'}
            </h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>salvarez@shiningonsafety.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
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
            <span className="text-amber-400 font-semibold font-mono">Powered by Uanify</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
