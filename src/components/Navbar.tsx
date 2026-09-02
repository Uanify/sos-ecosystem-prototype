import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Globe, 
  Menu, 
  X, 
  Settings, 
  QrCode,
  Flame,
  GraduationCap
} from 'lucide-react';
import type { TierMode } from './TierSwitcherBanner';

interface NavbarProps {
  lang: 'en' | 'es';
  onToggleLang: () => void;
  tier: TierMode;
  cartCount: number;
  activeSection: 'main' | 'university';
  onSelectSection: (section: 'main' | 'university') => void;
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
  activeSection,
  onSelectSection,
  onOpenCart,
  onOpenAdmin,
  onOpenQRVerify,
  onOpenRiskCalculator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isEn = lang === 'en';

  return (
    <nav className="bg-white border-b border-slate-200 text-slate-900 shadow-xs w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* 1. Official Authentic Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onSelectSection('main'); }}
            className="flex items-center gap-3 shrink-0 py-2"
          >
            <img
              src="/logo.png"
              alt="Shining On Safety"
              className="h-11 sm:h-12 w-auto object-contain drop-shadow-xs hover:opacity-95 transition-opacity"
            />
          </a>

          {/* 2. Elegant, Harmonious Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-slate-700">
            
            {/* Safety University Portal Tab */}
            <button
              onClick={() => onSelectSection('university')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeSection === 'university' 
                  ? 'bg-blue-600 text-white shadow-xs font-bold' 
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold border border-blue-200'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${activeSection === 'university' ? 'text-sky-200' : 'text-blue-600'}`} />
              <span>{isEn ? 'Safety University' : 'Universidad de Seguridad'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                activeSection === 'university' ? 'bg-blue-800 text-sky-200' : 'bg-blue-200 text-blue-900'
              }`}>
                LMS
              </span>
            </button>

            <a 
              href="#courses"
              onClick={() => onSelectSection('main')}
              className="hover:text-blue-600 transition-colors py-1 font-medium"
            >
              {isEn ? 'Course Catalog' : 'Catálogo'}
            </a>

            <a 
              href="#gear-store"
              onClick={() => onSelectSection('main')}
              className="hover:text-blue-600 transition-colors py-1 font-medium"
            >
              {isEn ? 'Safety Gear' : 'Tienda EPP'}
            </a>

            <a 
              href="#b2b-portal"
              onClick={() => onSelectSection('main')}
              className="hover:text-blue-600 transition-colors py-1 font-medium"
            >
              {isEn ? 'Corporate Retainers' : 'Convenios'}
            </a>

            <button
              onClick={onOpenRiskCalculator}
              className="text-slate-700 hover:text-amber-600 transition-colors py-1 flex items-center gap-1.5 font-bold cursor-pointer text-xs uppercase font-mono"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>{isEn ? 'OSHA Scorecard' : 'Scorecard'}</span>
            </button>
          </div>

          {/* 3. Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              disabled={tier !== 'option1'}
              title={tier !== 'option1' ? 'Bilingual Toggle available in Option 1' : 'Switch Language'}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                tier === 'option1'
                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600'
                  : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span className="uppercase font-mono">{lang}</span>
            </button>

            {/* QR Verification trigger */}
            <button
              onClick={onOpenQRVerify}
              title={isEn ? 'Verify Certificate Authenticity' : 'Verificar Autenticidad de Certificado'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 transition-all cursor-pointer shadow-2xs"
            >
              <QrCode className="w-3.5 h-3.5 text-blue-600" />
              <span>{isEn ? 'Verify QR' : 'Validar QR'}</span>
            </button>

            {/* SuperAdmin CMS Demo trigger */}
            <button
              onClick={onOpenAdmin}
              disabled={tier === 'option3'}
              title={tier === 'option3' ? 'SuperAdmin CMS requires Option 1 or 2' : 'Open SuperAdmin CMS Demo'}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                tier !== 'option3'
                  ? 'bg-blue-50/80 border-blue-200 text-blue-700 hover:bg-blue-100'
                  : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-50'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-blue-600" />
              <span>{isEn ? 'SuperAdmin' : 'Panel CMS'}</span>
            </button>

            {/* Shopping Cart Button with Safety Amber Counter */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all hover:scale-105 cursor-pointer ml-1"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <button
            onClick={() => { onSelectSection('university'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-blue-700 bg-blue-50 flex items-center justify-between"
          >
            <span>🎓 Safety University LMS</span>
            <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-mono font-bold">6 Courses</span>
          </button>
          <a
            href="#gear-store"
            onClick={() => { onSelectSection('main'); setMobileMenuOpen(false); }}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Safety Gear Store
          </a>
          <a
            href="#b2b-portal"
            onClick={() => { onSelectSection('main'); setMobileMenuOpen(false); }}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Corporate Retainers ($27k–$160k)
          </a>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenRiskCalculator(); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-amber-600 hover:bg-amber-50 flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>OSHA Risk Scorecard</span>
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
          >
            <Settings className="w-4 h-4 text-blue-600" />
            <span>SuperAdmin CMS Panel</span>
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenQRVerify(); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
          >
            <QrCode className="w-4 h-4 text-blue-600" />
            <span>Verify QR Certificate</span>
          </button>
        </div>
      )}
    </nav>
  );
};
