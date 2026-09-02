import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, QrCode, Download, Search, Award, Building, Calendar } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-heading text-white">
              {isEn ? 'Official Tamper-Proof Certificate Verification' : 'Verificación Oficial Anti-Fraude de Certificados'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Instant 24/7 QR Verification for Safety Inspectors & General Contractors' : 'Validación instantánea 24/7 para inspectores de obra'}
            </p>
          </div>
        </div>

        {/* Certificate Search Bar */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={certId}
              onChange={e => setCertId(e.target.value)}
              placeholder="e.g. SOS-2026-89412"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white font-mono uppercase focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            onClick={() => setIsSearched(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
          >
            {isEn ? 'Verify' : 'Validar'}
          </button>
        </div>

        {/* Certificate Display Card */}
        {isSearched && (
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-emerald-500/40 shadow-xl space-y-6 relative overflow-hidden">
            
            {/* Top Status */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {isEn ? 'Official & Valid Certificate' : 'Certificado Oficial y Válido'}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {certId}
              </span>
            </div>

            {/* Main Certificate Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              
              {/* Left Details */}
              <div className="sm:col-span-2 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                    {isEn ? 'Certified Worker / Student' : 'Trabajador Certificado'}
                  </span>
                  <p className="text-base font-bold text-white font-heading">Carlos Mendez</p>
                  <p className="text-slate-400 text-[11px]">Apex Construction Group LLC</p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                    {isEn ? 'Completed Program & OSHA Standard' : 'Curso Aprobado y Norma OSHA'}
                  </span>
                  <p className="font-semibold text-amber-300">OSHA Fall Protection & Working at Heights</p>
                  <p className="text-slate-400 font-mono text-[10px]">29 CFR 1926 Subpart M • Score: 98%</p>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                  <div>
                    <span className="text-slate-500 block">Issued:</span>
                    <span className="text-slate-200 font-medium">Aug 24, 2026</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Valid Until:</span>
                    <span className="text-emerald-400 font-medium">Aug 24, 2027</span>
                  </div>
                </div>
              </div>

              {/* Right: Mock QR Graphic */}
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white text-slate-950 text-center shadow-md">
                <div className="w-24 h-24 bg-slate-950 rounded-lg flex items-center justify-center text-white p-2">
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
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700 mt-1.5 font-mono">
                  Scan to Verify
                </span>
              </div>

            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Instructor: <strong className="text-slate-200">Melanie Jaime</strong>
              </span>
              <button
                onClick={() => alert('Simulating PDF Certificate download...')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download PDF Card</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
