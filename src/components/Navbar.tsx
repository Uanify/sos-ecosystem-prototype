import React, { useState } from 'react';
import { 
  Shield, 
  ShoppingBag, 
  Globe, 
  User, 
  Layers, 
  CheckCircle2, 
  Menu, 
  X, 
  Phone, 
  Settings, 
  QrCode,
  Flame,
  Award
} from 'lucide-react';
import { TierMode } from './TierSwitcherBanner';

interface NavbarProps {
  lang: 'en' | 'es';
  onToggleLang: () => void;
  tier: TierMode;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  onOpenQRVerify: () => void;
  onOpenRiskCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  tier,
  cartCount,
  onOpenCart,
  onOpenAdmin,
  onOpenQRVerify,
  onOpenRiskCalculator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isEn = lang === 'en';

  return (
    <header className="sticky top-[73px] sm:top-[69px] z-40 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  SHINING ON SAFETY
                </span>
                {tier === 'option1' && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    3-in-1 Unified
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 tracking-wider uppercase font-medium">
                {isEn ? 'Safety University & Workforce Compliance' : 'Universidad de Seguridad y Cumplimiento Laboral'}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#courses" className="hover:text-amber-400 transition-colors py-1 flex items-center gap-1">
              <span>{isEn ? 'Course Catalog' : 'Cursos'}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                $180–$349
              </span>
            </a>

            <a href="#gear-store" className="hover:text-amber-400 transition-colors py-1 flex items-center gap-1">
              <span>{isEn ? 'Safety Gear Store' : 'Tienda de Equipo'}</span>
              {tier === 'option1' && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-semibold">
                  {isEn ? 'Integrated' : 'Integrada'}
                </span>
              )}
            </a>

            <a href="#b2b-portal" className="hover:text-amber-400 transition-colors py-1 flex items-center gap-1.5">
              <span>{isEn ? 'Corporate Programs' : 'Programas B2B'}</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                $27k–$160k
              </span>
            </a>

            <button
              onClick={onOpenRiskCalculator}
              className="text-amber-400 hover:text-amber-300 transition-colors py-1 flex items-center gap-1 font-semibold"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>{isEn ? 'Free OSHA Audit' : 'Auditoría OSHA'}</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Language Toggle (Option 1 feature) */}
            <button
              onClick={onToggleLang}
              disabled={tier !== 'option1'}
              title={tier !== 'option1' ? 'Bilingual Toggle available in Option 1' : 'Switch Language'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                tier === 'option1'
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-amber-500 hover:text-amber-400'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60 cursor-not-allowed'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase">{lang}</span>
            </button>

            {/* QR Verification trigger */}
            <button
              onClick={onOpenQRVerify}
              title={isEn ? 'Verify Certificate Authenticity' : 'Verificar Autenticidad de Certificado'}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-white transition-all"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">{isEn ? 'Verify QR' : 'Validar QR'}</span>
            </button>

            {/* SuperAdmin CMS Demo trigger */}
            <button
              onClick={onOpenAdmin}
              disabled={tier === 'option3'}
              title={tier === 'option3' ? 'SuperAdmin CMS requires Option 1 or 2' : 'Open SuperAdmin CMS Demo'}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                tier !== 'option3'
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300 hover:border-amber-400'
                  : 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEn ? 'SuperAdmin CMS' : 'Panel CMS'}</span>
            </button>

            {/* Shopping Cart Drawer */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/60 text-slate-200 transition-all hover:scale-105"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-amber-400"
          >
            {isEn ? '📚 Course Catalog ($180–$349)' : '📚 Catálogo de Cursos ($180–$349)'}
          </a>
          <a
            href="#gear-store"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-amber-400"
          >
            {isEn ? '🦺 Safety Gear Store' : '🦺 Tienda de Equipo de Seguridad'}
          </a>
          <a
            href="#b2b-portal"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-amber-400"
          >
            {isEn ? '🏢 Corporate Packages ($27k–$160k)' : '🏢 Paquetes Corporativos ($27k–$160k)'}
          </a>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenRiskCalculator(); }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-amber-400 hover:bg-slate-900 flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-orange-400" />
            {isEn ? 'Free OSHA Risk Audit' : 'Auditoría OSHA Gratuita'}
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-900 flex items-center gap-2"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            {isEn ? 'Preview SuperAdmin CMS' : 'Ver Panel CMS SuperAdmin'}
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenQRVerify(); }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-900 flex items-center gap-2"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            {isEn ? 'Verify QR Certificate' : 'Verificar Certificado QR'}
          </button>
        </div>
      )}
    </header>
  );
};
