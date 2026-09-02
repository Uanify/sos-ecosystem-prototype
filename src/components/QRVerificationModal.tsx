import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Download, Search } from 'lucide-react';

interface QRVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
}

export const QRVerificationModal: React.FC<QRVerificationModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [certId, setCertId] = useState('SOS-2026-89412');
  const [isSearched, setIsSearched] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 my-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-black font-heading text-slate-950">
              {isEn ? 'Official Tamper-Proof Certificate Verification' : 'Verificación Oficial Anti-Fraude de Certificados'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {isEn ? 'Instant 24/7 QR Verification for Safety Inspectors & General Contractors' : 'Validación instantánea 24/7 para inspectores de obra'}
            </p>
          </div>
        </div>

        {/* Certificate Search Bar */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={certId}
              onChange={e => setCertId(e.target.value)}
              placeholder="e.g. SOS-2026-89412"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-950 font-mono uppercase focus:outline-none focus:border-blue-600 font-semibold"
            />
          </div>
          <button
            onClick={() => setIsSearched(true)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
          >
            {isEn ? 'Verify' : 'Validar'}
          </button>
        </div>

        {/* Certificate Display Card */}
        {isSearched && (
          <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/60 to-white border-2 border-blue-300 shadow-lg space-y-6 relative overflow-hidden">
            
            {/* Top Status */}
            <div className="flex items-center justify-between pb-4 border-b border-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                  {isEn ? 'Official & Valid Certificate' : 'Certificado Oficial y Válido'}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-blue-900 bg-white px-2.5 py-1 rounded border border-blue-200 shadow-xs">
                {certId}
              </span>
            </div>

            {/* Main Certificate Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              
              {/* Left Details */}
              <div className="sm:col-span-2 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    {isEn ? 'Certified Worker / Student' : 'Trabajador Certificado'}
                  </span>
                  <p className="text-base font-black text-slate-950 font-heading">Carlos Mendez</p>
                  <p className="text-slate-600 text-xs font-semibold">Apex Construction Group LLC</p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    {isEn ? 'Completed Program & OSHA Standard' : 'Curso Aprobado y Norma OSHA'}
                  </span>
                  <p className="font-bold text-blue-900 text-sm">OSHA Fall Protection & Working at Heights</p>
                  <p className="text-slate-600 font-mono text-[11px] font-semibold">29 CFR 1926 Subpart M • Score: 98%</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Issued:</span>
                    <span className="text-slate-900 font-semibold">Aug 24, 2026</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px]">Valid Until:</span>
                    <span className="text-emerald-700 font-bold">Aug 24, 2027</span>
                  </div>
                </div>
              </div>

              {/* Right: Mock QR Graphic */}
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white text-slate-950 text-center shadow-md border border-slate-200">
                <div className="w-24 h-24 bg-blue-950 rounded-lg flex items-center justify-center text-white p-2">
                  {/* Stylized QR representation */}
                  <div className="grid grid-cols-4 gap-1 w-full h-full p-1 bg-white">
                    <div className="bg-slate-950 rounded-xs"></div>
                    <div className="bg-slate-950 rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-slate-950 rounded-xs"></div>
                    <div className="bg-slate-950 rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-slate-950 rounded-xs"></div>
                    <div className="bg-slate-950 rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-slate-950 rounded-xs"></div>
                    <div className="bg-slate-950 rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-slate-950 rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-slate-950 rounded-xs"></div>
                    <div className="bg-slate-950 rounded-xs"></div>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider text-blue-900 mt-1.5 font-mono">
                  Scan to Verify
                </span>
              </div>

            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-blue-200 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">
                Instructor: <strong className="text-slate-950">Sarah Jenkins, CSP</strong>
              </span>
              <button
                onClick={() => alert('Simulating PDF Certificate download...')}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Card</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
