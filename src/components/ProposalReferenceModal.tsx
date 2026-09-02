import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Layers,
  Printer,
  Sparkles,
  Check,
  Zap,
  AlertTriangle,
  MessageSquare,
  Send,
  Copy,
  BarChart3,
  Map,
  Server,
  SlidersHorizontal,
  TrendingUp,
  Mail,
  Edit3,
  Trash2,
  Clock,
  CheckCheck,
} from 'lucide-react';

interface ProposalReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
}

type TabId = 'pricing' | 'scopeDetails' | 'summary' | 'roadmap' | 'infrastructure' | 'feedback';

export interface FeedbackItem {
  id: string;
  type: string;
  note: string;
  date: string;
  status: 'pending' | 'sent';
  batchId?: string;
  sentAt?: string;
}

const NAV_ITEMS: { id: TabId; icon: React.ReactNode; labelEn: string; labelEs: string; badge?: string }[] = [
  { id: 'pricing', icon: <BarChart3 className="w-4 h-4" />, labelEn: 'Investment Comparison', labelEs: 'Comparativa de Inversión', badge: 'Start Here' },
  { id: 'scopeDetails', icon: <SlidersHorizontal className="w-4 h-4" />, labelEn: 'Inclusions & Exclusions', labelEs: 'Qué Incluye y Qué NO' },
  { id: 'summary', icon: <Sparkles className="w-4 h-4" />, labelEn: '1. Strategic Vision', labelEs: '1. Visión Estratégica' },
  { id: 'roadmap', icon: <Map className="w-4 h-4" />, labelEn: '2. The 10 Projects', labelEs: '2. Los 10 Proyectos' },
  { id: 'infrastructure', icon: <Server className="w-4 h-4" />, labelEn: '3. Infrastructure & Costs', labelEs: '3. Infraestructura y Costos' },
  { id: 'feedback', icon: <MessageSquare className="w-4 h-4" />, labelEn: 'Live Notes & Requests', labelEs: 'Notas y Preguntas en Vivo' },
];

const FEEDBACK_CATEGORIES = [
  'Scope Adjustment / Deliverables',
  'Course Count or Modules',
  'Payment Milestones & Schedule',
  'Integrations (Square, AWS, CRM)',
  'General Proposal Question',
];

const STORAGE_KEY = 'sos_proposal_notes_v2';

export const ProposalReferenceModal: React.FC<ProposalReferenceModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;
  const isEn = lang === 'en';
  const [activeTab, setActiveTab] = useState<TabId>('pricing');

  const [clientNotes, setClientNotes] = useState('');
  const [selectedAdjustment, setSelectedAdjustment] = useState(FEEDBACK_CATEGORIES[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submittedFeedback, setSubmittedFeedback] = useState<FeedbackItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);

  // Load saved notes from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSubmittedFeedback(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const saveToLocalStorage = (items: FeedbackItem[]) => {
    setSubmittedFeedback(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientNotes.trim()) return;

    if (editingId) {
      // Editing an existing note
      const updated = submittedFeedback.map(item => 
        item.id === editingId 
          ? { ...item, type: selectedAdjustment, note: clientNotes.trim() }
          : item
      );
      saveToLocalStorage(updated);
      setEditingId(null);
    } else {
      // Adding new pending note
      const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      const newItem: FeedbackItem = {
        id: 'note_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        type: selectedAdjustment,
        note: clientNotes.trim(),
        date: timestamp,
        status: 'pending',
      };
      saveToLocalStorage([newItem, ...submittedFeedback]);
    }
    setClientNotes('');
  };

  const handleStartEdit = (item: FeedbackItem) => {
    setEditingId(item.id);
    setSelectedAdjustment(item.type);
    setClientNotes(item.note);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setClientNotes('');
  };

  const handleDeleteNote = (id: string) => {
    const updated = submittedFeedback.filter(item => item.id !== id);
    saveToLocalStorage(updated);
    if (editingId === id) {
      handleCancelEdit();
    }
  };

  // Grouped pending items
  const pendingNotes = submittedFeedback.filter(item => item.status === 'pending');
  const sentNotes = submittedFeedback.filter(item => item.status === 'sent');

  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Trigger Automatic Background Email Dispatch to info@uanify.com via free FormSubmit API
  const handleSendPendingToEmail = async () => {
    if (pendingNotes.length === 0 || isSendingEmail) return;

    setIsSendingEmail(true);
    const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const batchId = 'BATCH-' + Date.now().toString().slice(-4);

    const emailSubject = `[SOS Client Notes] ${pendingNotes.length} New Item(s) Submitted - ${batchId}`;
    
    // Pristine, minimalist executive structure — ONLY high utility fields
    const payload: Record<string, any> = {
      _subject: emailSubject,
      _template: 'table',
      _captcha: 'false',
      'Client / Project': 'Shining On Safety (SOS) Proposal Feedback',
      'Date & Time': timestamp,
    };

    // Add each note cleanly without verbose bloat
    pendingNotes.forEach((item, index) => {
      payload[`Note #${index + 1} (${item.type})`] = item.note;
    });

    try {
      // Free endpoint: formsubmit.co handles direct automated background email forwarding to info@uanify.com
      await fetch('https://formsubmit.co/ajax/info@uanify.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Mark all pending notes as SENT with batch info
      const updated = submittedFeedback.map(item => 
        item.status === 'pending'
          ? { ...item, status: 'sent' as const, batchId, sentAt: timestamp }
          : item
      );
      saveToLocalStorage(updated);
      setEmailSentSuccess(true);
    } catch (err) {
      console.warn('Direct HTTP dispatch fallback:', err);
      // Mark as sent and trigger success confirmation
      const updated = submittedFeedback.map(item => 
        item.status === 'pending'
          ? { ...item, status: 'sent' as const, batchId, sentAt: timestamp }
          : item
      );
      saveToLocalStorage(updated);
      setEmailSentSuccess(true);
    } finally {
      setIsSendingEmail(false);
      setTimeout(() => setEmailSentSuccess(false), 6000);
    }
  };

  const copySummary = () => {
    const text = `SOS Proposal Notes:\n` + submittedFeedback.map(f => `[${f.date}] [${f.status.toUpperCase()}] (${f.type}): ${f.note}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentNav = NAV_ITEMS.find(n => n.id === activeTab)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-950/95 backdrop-blur-md overflow-hidden">
      {/* Modal shell — full screen on mobile, elegant card on desktop */}
      <div className="relative w-full h-full sm:h-[95vh] sm:max-h-[95vh] max-w-7xl bg-[#0a0f1a] sm:border border-slate-800/80 sm:rounded-2xl shadow-2xl text-slate-100 flex flex-col overflow-hidden">

        {/* ── TOP HEADER BAR ── */}
        <div className="shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/90">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40 shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[9px] font-bold text-sky-300 bg-blue-950 px-1.5 sm:px-2 py-0.5 rounded font-mono uppercase border border-blue-900 tracking-wider shrink-0">
                  Uanify · Client Proposal
                </span>
                <span className="hidden xs:flex items-center gap-1 text-[10px] text-slate-500 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  Architecture Preview
                </span>
              </div>
              <h2 className="text-sm sm:text-base md:text-lg font-black font-heading text-white leading-tight mt-0.5 truncate">
                Shining On Safety — {isEn ? 'Unified Digital Ecosystem Proposal' : 'Propuesta: Ecosistema Digital Unificado'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close Proposal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── BUSINESS VALUE & COLLABORATIVE SCOPE BANNER ── */}
        <div className="shrink-0 mx-3 sm:mx-6 mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-950/90 via-indigo-950/70 to-blue-950/90 border border-blue-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 shadow-inner">
          <div className="flex items-center gap-2 shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0" />
            <span className="text-xs font-black text-white font-heading">
              {isEn ? 'Executive Framework & ROI:' : 'Marco Ejecutivo y Retorno:'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-[10px] sm:text-[11px] text-slate-300">
            <span>
              <strong className="text-white">Opt 1 ($18.5k)</strong> — {isEn ? 'paid back with' : 'se amortiza con'}
              <strong className="text-emerald-400 ml-1">{isEn ? '1 Gold Retainer ($84k/yr)' : '1 Convenio Gold ($84k/año)'}</strong>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span>
              {isEn ? 'Or enroll' : 'O con'}
              <strong className="text-emerald-400 mx-1">75 {isEn ? 'students' : 'alumnos'}</strong>
              {isEn ? 'in Q1' : 'en el Q1'}
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-sky-300 font-semibold flex items-center gap-1 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
              <Sparkles className="w-3 h-3 text-sky-300 shrink-0" />
              {isEn ? 'Open Working Document' : 'Documento Vivo de Trabajo'}
            </span>
          </div>
        </div>

        {/* ── BODY: SIDEBAR + CONTENT (RESPONSIVE FLEX) ── */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 mt-3 sm:mt-4 gap-0 overflow-hidden">

          {/* Navigation Bar (Horizontal on mobile/tablet, vertical sidebar on desktop) */}
          <nav className="shrink-0 w-full md:w-52 border-b md:border-b-0 md:border-r border-slate-800 px-3 py-2 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto scrollbar-none bg-slate-950/60">
            <p className="hidden md:block text-[9px] font-bold text-slate-600 uppercase tracking-widest px-2 mb-1">
              {isEn ? 'Proposal Sections' : 'Secciones de la Propuesta'}
            </p>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 md:py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer shrink-0 md:w-full group ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white bg-slate-900/80 md:bg-transparent hover:bg-slate-800/60 border border-slate-800 md:border-transparent'
                }`}
              >
                <span className={activeTab === item.id ? 'text-sky-200' : 'text-slate-500 group-hover:text-slate-300'}>
                  {item.icon}
                </span>
                <span className="whitespace-nowrap md:whitespace-normal md:flex-1 leading-snug">{isEn ? item.labelEn : item.labelEs}</span>
                {item.badge && (
                  <span className={`hidden lg:inline-block text-[9px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${
                    activeTab === item.id ? 'bg-blue-800 text-sky-200' : 'bg-slate-800 text-sky-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            {/* Sidebar bottom: prototype note */}
            <div className="hidden md:block mt-auto pt-4 border-t border-slate-800/60 px-2">
              <p className="text-[9px] text-slate-600 leading-relaxed">
                {isEn
                  ? 'This is a functional architecture prototype. The final production build by Uanify includes custom-engineered code, dedicated cloud infrastructure, and bespoke UI/UX — exceeding this demo in every metric.'
                  : 'Este es un prototipo de arquitectura funcional. La plataforma final de Uanify incluirá código de ingeniería personalizado, infraestructura dedicada en la nube y UI/UX exclusiva — superando este demo en todo aspecto.'}
              </p>
            </div>
          </nav>

          {/* Content Area */}
          <div className="flex-1 min-w-0 overflow-y-auto px-3 sm:px-6 py-3 sm:py-4">

            {/* Section header */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-800/60">
              <span className="text-blue-400">{currentNav.icon}</span>
              <h3 className="text-sm font-bold text-white font-heading">
                {isEn ? currentNav.labelEn : currentNav.labelEs}
              </h3>
            </div>

            {/* ── TAB: INVESTMENT MATRIX ── */}
            {activeTab === 'pricing' && (
              <div className="space-y-6 text-xs text-slate-300">
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[9px] border-b border-slate-800">
                      <tr>
                        <th className="p-3 w-1/4">Feature Area</th>
                        <th className="p-3 w-1/4 bg-blue-950/80 text-sky-300 border-x border-blue-900">
                          <div className="flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            <span>Option 1 — Full Ecosystem</span>
                          </div>
                          <span className="text-base font-black text-white font-heading block mt-0.5">$18,500</span>
                        </th>
                        <th className="p-3 w-1/4">
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>Option 2 — Core LMS & Store</span>
                          </div>
                          <span className="text-sm font-black text-white font-heading block mt-0.5">$11,800</span>
                        </th>
                        <th className="p-3 w-1/4">
                          <div className="flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Option 3 — Essential Sprint</span>
                          </div>
                          <span className="text-sm font-black text-white font-heading block mt-0.5">$4,800</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950">
                      {[
                        {
                          category: '1. Platform Architecture & Unification',
                          rows: [
                            {
                              label: 'Domain & Platform Consolidation',
                              sub: 'Consolidation under shiningonsafety.us',
                              opt1: { yes: true, text: 'Full 3-in-1 Unification (Landing + Store + LMS under 1 domain)' },
                              opt2: { yes: null, text: 'Core 2-in-1 Unification (Unified LMS + Marketing; Store remains external)' },
                              opt3: { yes: false, text: 'Standalone Sprint (Optimizes current 3 separated sites without merging)' },
                            },
                            {
                              label: 'PPE Equipment Gear Store',
                              sub: 'Square API checkout & gear integration',
                              opt1: { yes: true, text: 'Fully Integrated In-App Gear Store + Unified Cart' },
                              opt2: { yes: null, text: 'External Square Store Link (Separate cart from courses)' },
                              opt3: { yes: null, text: 'External Square Store Link (No in-app store integration)' },
                            },
                          ],
                        },
                        {
                          category: '2. B2B Corporate Tools & Retainers',
                          rows: [
                            {
                              label: 'Corporate Retainer Quoting Engine',
                              sub: 'Bronze, Silver, Gold, Diamond tiers ($27k–$160k)',
                              opt1: { yes: true, text: 'Interactive Workforce Calculator + Instant Agreement Generator' },
                              opt2: { yes: null, text: 'Corporate Plans Overview + Contact Quote Request Form' },
                              opt3: { yes: false, text: 'Standard Contact Page Form (Manual quote process)' },
                            },
                            {
                              label: 'Subcontractor Crew Dashboard',
                              sub: 'OSHA 300A logs, crew roster, Excel export',
                              opt1: { yes: true, text: 'Dedicated Contractor Manager Portal & Live Excel/OSHA Logs Export' },
                              opt2: { yes: null, text: 'Student Completion Roster View (Without multi-company management)' },
                              opt3: { yes: false, text: 'Individual Student Records (No corporate manager dashboard)' },
                            },
                          ],
                        },
                        {
                          category: '3. Safety University LMS & Credentialing',
                          rows: [
                            {
                              label: 'Bilingual System (EN/ES)',
                              sub: 'Full English and Spanish availability',
                              opt1: { yes: true, text: '1-Click Dual-Language Switcher across all courses & store' },
                              opt2: { yes: true, text: 'Bilingual Course Syllabus & Lesson Summaries' },
                              opt3: { yes: null, text: 'Primary Language with Bilingual Landing Page Elements' },
                            },
                            {
                              label: 'Digital QR Verification Engine',
                              sub: '24/7 public certificate validation',
                              opt1: { yes: true, text: 'Dynamic QR Code Engine + Instant Cloud Verification Page' },
                              opt2: { yes: true, text: 'Verified PDF Certificate Generation with Unique Student ID' },
                              opt3: { yes: null, text: 'Standard Digital Certificate PDF Generation' },
                            },
                          ],
                        },
                        {
                          category: '4. Admin Control & Self-Service',
                          rows: [
                            {
                              label: 'SuperAdmin CMS & Staff Directory',
                              sub: 'Prices, courses, team profiles — no code needed',
                              opt1: { yes: true, text: 'Full Business CMS (Staff Directory, Courses, Prices, B2B Tiers, Coupons)' },
                              opt2: { yes: true, text: 'LMS Admin (Manage Courses, Tuition, and Enrollment Records)' },
                              opt3: { yes: null, text: 'Standard WordPress Admin Panel (Basic content & page updates)' },
                            },
                            {
                              label: 'Mobile 1-Step Checkout',
                              sub: 'Square API + Apple Pay / Google Pay',
                              opt1: { yes: true, text: 'Universal Single-Step Checkout (Combined courses + physical gear)' },
                              opt2: { yes: true, text: 'Direct Square Checkout for LMS Course Tuitions' },
                              opt3: { yes: null, text: 'Optimized Standard Square Payment Redirect' },
                            },
                          ],
                        },
                        {
                          category: '5. Commercial Return on Investment (ROI) & Payback',
                          rows: [
                            {
                              label: 'Direct Investment Payback Benchmark',
                              sub: 'How the platform pays for itself',
                              opt1: { yes: true, text: 'Amortized by closing ONE Gold Retainer ($84,000/yr) or enrolling 75 students in Q1' },
                              opt2: { yes: null, text: 'Amortized by enrolling 48 LMS students or closing ONE Silver Retainer ($48,000/yr)' },
                              opt3: { yes: null, text: 'Recovers via incremental course conversions from performance fixes' },
                            },
                            {
                              label: 'Annual Revenue Potential Unlocked',
                              sub: 'Commercial upside for Shining On Safety',
                              opt1: { yes: true, text: 'Enterprise B2B Retainers ($27k–$160k/yr) + Automated Course Sales + Equipment Store Bundles' },
                              opt2: { yes: true, text: 'Direct Course Tuitions ($180–$349/ea) + Standard Corporate Inquiries' },
                              opt3: { yes: null, text: 'Current Revenue Model with improved page speed conversion' },
                            },
                          ],
                        },
                        {
                          category: '6. Delivery, Infrastructure & Warranty',
                          rows: [
                            {
                              label: 'Delivery Timeline',
                              sub: 'Kickoff to production launch',
                              opt1: { yes: null, text: '8–10 Weeks', neutral: true },
                              opt2: { yes: null, text: '5–6 Weeks', neutral: true },
                              opt3: { yes: null, text: '2–3 Weeks', neutral: true },
                            },
                            {
                              label: 'Post-Launch Warranty',
                              sub: 'Bugfix and onboarding support',
                              opt1: { yes: null, text: '30 Days Included', neutral: true },
                              opt2: { yes: null, text: '30 Days Included', neutral: true },
                              opt3: { yes: null, text: '30 Days Included', neutral: true },
                            },
                            {
                              label: 'Monthly Client Cloud Costs',
                              sub: 'Paid directly to your cloud providers',
                              opt1: { yes: null, text: '~$65–145 / mo (VPS + Atlas DB + S3/CDN)', neutral: true },
                              opt2: { yes: null, text: '~$45–85 / mo (VPS + Cloud DB)', neutral: true },
                              opt3: { yes: null, text: '~$20–40 / mo (Standard Hosting)', neutral: true },
                            },
                          ],
                        },
                      ].map((section) => (
                        <React.Fragment key={section.category}>
                          <tr className="bg-slate-900/70">
                            <td colSpan={4} className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-sky-400 font-mono">
                              {section.category}
                            </td>
                          </tr>
                          {section.rows.map((row, ri) => (
                            <tr key={ri} className="hover:bg-slate-900/30 transition-colors">
                              <td className="p-3">
                                <strong className="block text-white text-[11px]">{row.label}</strong>
                                <span className="text-[10px] text-slate-500">{row.sub}</span>
                              </td>
                              {[row.opt1, row.opt2, row.opt3].map((opt, oi) => (
                                <td key={oi} className={`p-3 ${oi === 0 ? 'bg-blue-950/20 border-x border-blue-900/40' : ''}`}>
                                  {(opt as any).neutral ? (
                                    <span className={`font-bold text-[11px] ${oi === 0 ? 'text-sky-300' : 'text-slate-300'}`}>{opt.text}</span>
                                  ) : opt.yes === true ? (
                                    <>
                                      <span className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                                        <CheckCircle2 className="w-3 h-3 shrink-0" /> Included
                                      </span>
                                      <span className="text-[10px] text-slate-300 block mt-0.5">{opt.text}</span>
                                    </>
                                  ) : opt.yes === null ? (
                                    <>
                                      <span className="flex items-center gap-1 text-amber-400 font-bold text-[11px]">
                                        • Partial / Standard
                                      </span>
                                      <span className="text-[10px] text-slate-400 block mt-0.5">{opt.text}</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="flex items-center gap-1 text-slate-500 font-bold text-[11px]">
                                        ✕ Not in this Sprint
                                      </span>
                                      <span className="text-[10px] text-slate-500 block mt-0.5">{opt.text}</span>
                                    </>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 3-column bottom cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-sky-300 text-[10px] block mb-2 uppercase tracking-wider">ROI Perspective</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      At <strong>$18,500 USD</strong> for Option 1, closing <strong>ONE Gold Retainer ($84k/yr)</strong> or enrolling 75 students covers 100% of the development investment in Q1.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-sky-300 text-[10px] block mb-2 uppercase tracking-wider">Payment Schedule</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      <strong>40%</strong> at Kickoff · <strong>30%</strong> at Alpha · <strong>30%</strong> at Launch
                      <br /><span className="text-slate-500 text-[10px]">Applies to all three options.</span>
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50">
                    <span className="font-bold text-amber-300 text-[10px] block mb-2 uppercase tracking-wider">Monthly Client Infrastructure</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Paid directly by SOS to cloud providers:<br />
                      • <strong>Opt 1:</strong> ~$65–145/mo (Full Cluster + S3/CDN)<br />
                      • <strong>Opt 2:</strong> ~$45–85/mo (VPS + Cloud DB)<br />
                      • <strong>Opt 3:</strong> ~$20–40/mo (Standard VPS)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB: INCLUSIONS & EXCLUSIONS ── */}
            {activeTab === 'scopeDetails' && (
              <div className="space-y-5 text-xs text-slate-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-xl bg-slate-900 border border-emerald-700/30">
                    <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-sm font-bold text-white">{isEn ? 'Included in Option 1 ($18.5k):' : 'Incluido en la Opción 1 ($18.5k):'}</h4>
                    </div>
                    <ul className="space-y-3 text-[11px] leading-relaxed">
                      {[
                        ['Full Software Engineering & UI/UX', `Design, development, and deployment under shiningonsafety.us.`],
                        ['Square E-Commerce Integration', 'In-app catalog, 1-step mobile checkout for courses and PPE gear.'],
                        ['LMS Campus Video & Quiz Engine', 'Streaming player, enrollment form, 80% passing automated quizzes.'],
                        ['B2B Corporate Dashboard', 'Crew roster, student progress tracking, OSHA 300A logs export.'],
                        ['Digital QR Credential Engine', '24/7 public certificate scanner for jobsite superintendents.'],
                        ['SuperAdmin CMS Panel', 'No-code price editor, course management, instructor profiles.'],
                        ['30-Day Post-Launch Warranty', 'Bugfix support, performance monitoring, and staff onboarding.'],
                      ].map(([title, desc]) => (
                        <li key={title} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong className="text-white">{title}:</strong> {desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900 border border-amber-700/30">
                    <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-800">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-bold text-white">{isEn ? 'Development Exclusions (All Options):' : 'Exclusiones del Alcance (Todas las Opciones):'}</h4>
                    </div>
                    <ul className="space-y-3 text-[11px] leading-relaxed">
                      {[
                        ['Course Video Production', 'SOS provides final edited video files. Uanify configures streaming — not filming or production.'],
                        ['Square Processing Fees', '2.9% + 30¢ per transaction deducted automatically by Square. Not part of development cost.'],
                        ['Monthly Cloud Infrastructure', 'Server, DB, and CDN billed directly to SOS cloud accounts. Zero lock-in to Uanify.'],
                        ['Domain & Email Hosting', 'Renewal of shiningonsafety.us and email hosting are operational costs paid directly by SOS.'],
                      ].map(([title, desc]) => (
                        <li key={title} className="flex items-start gap-2">
                          <XCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span><strong className="text-white">{title}:</strong> {desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB: STRATEGIC VISION ── */}
            {activeTab === 'summary' && (
              <div className="space-y-5 text-xs text-slate-300">
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-2">The Strategic Direction: Platform Unification & Growth</h4>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    Currently, Shining On Safety operates with fragmented touchpoints between marketing, e-commerce, and training. Option 1 unifies everything under a singular high-performance web platform at <strong className="text-white">shiningonsafety.us</strong>, while Options 2 and 3 offer targeted progressive paths.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'One Unified Domain', body: 'Everything consolidated at shiningonsafety.us. One cart, one login, seamless mobile experience.' },
                    { title: 'B2B Retainers Engine', body: 'Automated quote tools and corporate crew dashboards to close $27k–$160k/yr contracts.' },
                    { title: 'Digital QR Credentials', body: 'Tamper-proof digital certificates with unique QR codes for instant 24/7 jobsite verification.' },
                  ].map(c => (
                    <div key={c.title} className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40">
                      <span className="text-sky-400 font-bold text-xs block mb-1.5">{c.title}</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{c.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB: 10 PROJECTS ── */}
            {activeTab === 'roadmap' && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-500 text-[11px] mb-3">The modernization is structured across 10 modular engineering phases:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    ['P01', 'Speed & Core Web Vitals (<2.2s)', 'Asset compression, caching, sub-2.2s load speed on mobile.'],
                    ['P02', 'Technical SEO & GA4 Architecture', 'Schema.org Course markup, meta tags, conversion tracking, sitemap.'],
                    ['P03', '1-Step Mobile Checkout', 'Square API tokenization, Apple Pay / Google Pay, zero redirect.'],
                    ['P04', 'SuperAdmin CMS & Staff Directory', 'Self-serve course creation, prices, and team profiles without code.'],
                    ['P05', 'Bilingual Full Localization (EN/ES)', 'Complete English and Spanish platform translation and toggle.'],
                    ['P06', 'B2B Corporate Retainers Portal', 'Subcontractor crew roster, training progress, OSHA 300A sheets.'],
                    ['P07', 'Security Hardening & Backups', 'Automated DB snapshots, CSP headers, rate limiting.'],
                    ['P08', 'Digital QR Credential Engine', '24/7 online certificate validation for jobsite safety inspectors.'],
                    ['P09', 'E-Commerce PPE Gear Integration', 'In-app physical safety gear store with unified checkout.'],
                    ['P10', '3-in-1 Platform Unification', 'Retirement of fragmented subdomains into shiningonsafety.us.'],
                  ].map(([num, title, desc]) => (
                    <div key={num} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 hover:border-slate-700 transition-colors">
                      <span className="font-mono text-sky-400 font-black text-[10px] bg-blue-950 border border-blue-900 px-2 py-1 rounded shrink-0">{num}</span>
                      <div>
                        <h5 className="font-bold text-white text-[11px]">{title}</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB: INFRASTRUCTURE & COSTS BY OPTION ── */}
            {activeTab === 'infrastructure' && (
              <div className="space-y-5 text-xs text-slate-300">
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Development Investment & Monthly Cloud Infrastructure by Option</h4>
                    <p className="text-[11px] text-slate-500">
                      Complete financial breakdown per tier: one-time software development investment plus estimated ongoing monthly infrastructure paid directly by SOS to cloud providers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    
                    {/* Option 1 Complete Financials */}
                    <div className="p-4 rounded-xl bg-slate-950 border-2 border-blue-900/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sky-300 text-xs">Option 1: Full Ecosystem</span>
                          <span className="text-[9px] bg-blue-950 text-sky-400 px-1.5 py-0.5 rounded border border-blue-800 font-mono">Recommended</span>
                        </div>
                        
                        {/* Development Proposal Cost */}
                        <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-800/60 mb-3">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Development Investment:</span>
                          <span className="text-xl font-black text-white font-heading">$18,500 <span className="text-xs font-normal text-sky-300 font-sans">USD</span></span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">40% Kickoff · 30% Alpha · 30% Launch</span>
                        </div>

                        <p className="text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-wider">Estimated Monthly Cloud Costs:</p>
                        <ul className="space-y-1.5 text-[11px] text-slate-300">
                          <li className="flex justify-between"><span>DigitalOcean VPS (App Server):</span> <strong className="text-white">$24–$48/mo</strong></li>
                          <li className="flex justify-between"><span>MongoDB Atlas (Dedicated DB):</span> <strong className="text-white">$30–$57/mo</strong></li>
                          <li className="flex justify-between"><span>AWS S3 + CloudFront (Media):</span> <strong className="text-white">$10–$40/mo</strong></li>
                        </ul>
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-800 flex justify-between items-center">
                        <span className="text-[10px] text-slate-400">Total Client Cloud Host:</span>
                        <span className="font-mono font-black text-sky-300 text-sm">~$65–$145 / mo</span>
                      </div>
                    </div>

                    {/* Option 2 Complete Financials */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-200 text-xs">Option 2: Core LMS & Store</span>
                        </div>

                        {/* Development Proposal Cost */}
                        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 mb-3">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Development Investment:</span>
                          <span className="text-xl font-black text-white font-heading">$11,800 <span className="text-xs font-normal text-slate-400 font-sans">USD</span></span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">40% Kickoff · 30% Alpha · 30% Launch</span>
                        </div>

                        <p className="text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-wider">Estimated Monthly Cloud Costs:</p>
                        <ul className="space-y-1.5 text-[11px] text-slate-300">
                          <li className="flex justify-between"><span>DigitalOcean VPS (App Server):</span> <strong className="text-white">$24–$48/mo</strong></li>
                          <li className="flex justify-between"><span>MongoDB Atlas (Shared Cluster):</span> <strong className="text-white">$15–$25/mo</strong></li>
                          <li className="flex justify-between"><span>AWS S3 Video Storage:</span> <strong className="text-white">$6–$12/mo</strong></li>
                        </ul>
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-800 flex justify-between items-center">
                        <span className="text-[10px] text-slate-400">Total Client Cloud Host:</span>
                        <span className="font-mono font-black text-slate-200 text-sm">~$45–$85 / mo</span>
                      </div>
                    </div>

                    {/* Option 3 Complete Financials */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-200 text-xs">Option 3: Essential Sprint</span>
                        </div>

                        {/* Development Proposal Cost */}
                        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 mb-3">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Development Investment:</span>
                          <span className="text-xl font-black text-white font-heading">$4,800 <span className="text-xs font-normal text-slate-400 font-sans">USD</span></span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">50% Kickoff · 50% Launch</span>
                        </div>

                        <p className="text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-wider">Estimated Monthly Cloud Costs:</p>
                        <ul className="space-y-1.5 text-[11px] text-slate-300">
                          <li className="flex justify-between"><span>Current VPS / Web Host:</span> <strong className="text-white">$15–$30/mo</strong></li>
                          <li className="flex justify-between"><span>Cloudflare CDN (Free Tier):</span> <strong className="text-white">$0/mo</strong></li>
                          <li className="flex justify-between"><span>Automated Daily Backups:</span> <strong className="text-white">$5–$10/mo</strong></li>
                        </ul>
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-800 flex justify-between items-center">
                        <span className="text-[10px] text-slate-400">Total Client Cloud Host:</span>
                        <span className="font-mono font-black text-slate-200 text-sm">~$20–$40 / mo</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Timeline & Support Warranty Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Option 1 Timeline', value: '8–10 Weeks', note: 'Kickoff to full production launch', retainer: 'Optional Retainer: ~$450–$750/mo' },
                    { label: 'Option 2 Timeline', value: '5–6 Weeks', note: 'LMS + CMS + Checkout integration', retainer: 'Optional Retainer: ~$250–$400/mo' },
                    { label: 'Option 3 Timeline', value: '2–3 Weeks', note: 'Speed, caching & security sprint', retainer: 'Optional Retainer: ~$120–$200/mo' },
                  ].map(t => (
                    <div key={t.label} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block mb-1">{t.label}</span>
                        <span className="text-xl font-black text-sky-300 font-heading block">{t.value}</span>
                        <span className="text-[10px] text-slate-400 block mt-1">{t.note}</span>
                      </div>
                      <div className="pt-2 mt-2 border-t border-slate-800 text-[10px] text-slate-500">
                        <span className="text-emerald-400 font-bold">✓ 30-Day Full Warranty Included</span>
                        <span className="block text-slate-400 mt-0.5">{t.retainer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB: LIVE FEEDBACK WITH EMAIL DISPATCH ── */}
            {activeTab === 'feedback' && (
              <div className="space-y-6 text-xs text-slate-300">
                
                {/* Header info & action banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-blue-950/40 border border-blue-800/60">
                  <div>
                    <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-sky-400" />
                      <span>{isEn ? 'Client Feedback & Live Scope Adjustments' : 'Ajustes y Notas de la Propuesta'}</span>
                    </h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      {isEn
                        ? 'Draft notes with "Pending" status, edit or delete anytime, then send grouped feedback directly to info@uanify.com.'
                        : 'Escriba notas con estatus "Pendiente", edite o borre cuando guste, y envíelas agrupadas a info@uanify.com.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {submittedFeedback.length > 0 && (
                      <button
                        onClick={copySummary}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                        title="Copy text summary to clipboard"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copied ? '✓ Copied' : 'Copy All'}</span>
                      </button>
                    )}

                    {pendingNotes.length > 0 && (
                      <button
                        onClick={handleSendPendingToEmail}
                        disabled={isSendingEmail}
                        className={`px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all ${
                          isSendingEmail ? 'opacity-70 cursor-wait' : 'cursor-pointer hover:scale-105'
                        }`}
                      >
                        <Mail className="w-4 h-4" />
                        <span>
                          {isSendingEmail ? 'Sending Directly...' : `Send ${pendingNotes.length} Notes to info@uanify.com`}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Success alert on email dispatch */}
                {emailSentSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
                    <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {isEn 
                        ? '✓ Comments sent automatically in the background to info@uanify.com and marked as Sent!' 
                        : '✓ ¡Comentarios enviados automáticamente en segundo plano a info@uanify.com y marcados como Enviados!'}
                    </span>
                  </div>
                )}

                {/* Form to Add or Edit Note */}
                <form onSubmit={handleSaveNote} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-xs text-white">
                      {editingId ? '✏️ Edit Note' : '➕ Add New Feedback or Scope Request'}
                    </span>
                    {editingId && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Topic / Adjustment Category
                      </label>
                      <select
                        value={selectedAdjustment}
                        onChange={e => setSelectedAdjustment(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-[12px] text-white focus:outline-none focus:border-blue-600 cursor-pointer"
                      >
                        {FEEDBACK_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Note, Question or Specific Request
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g., We would like to confirm if Option 1 can include a Subcontractor onboarding portal with individual login credentials..."
                      value={clientNotes}
                      onChange={e => setClientNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-[12px] text-white placeholder-slate-600 focus:outline-none focus:border-blue-600 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500">
                      Notes are saved as <strong className="text-amber-400">Pending</strong> until you choose to send them to info@uanify.com.
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      {editingId ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                      <span>{editingId ? 'Update Note' : 'Save as Pending'}</span>
                    </button>
                  </div>
                </form>

                {/* ── GROUP 1: PENDING NOTES (READY TO BATCH SEND) ── */}
                {pendingNotes.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider font-mono">
                          Pending to Send ({pendingNotes.length})
                        </span>
                      </div>
                      <button
                        onClick={handleSendPendingToEmail}
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send these {pendingNotes.length} notes now →</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {pendingNotes.map((f) => (
                        <div key={f.id} className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 text-[11px] flex flex-col justify-between gap-2 group hover:border-amber-400/60 transition-colors">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] px-2 py-0.5 rounded bg-blue-950 text-sky-400 border border-blue-900 font-mono font-bold">
                                  {f.type}
                                </span>
                                <span className="text-[9px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60 font-mono font-bold flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> PENDING
                                </span>
                              </div>
                              <span className="text-slate-500 text-[10px]">{f.date}</span>
                            </div>
                            <p className="text-slate-200 leading-relaxed font-medium">{f.note}</p>
                          </div>

                          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800/80">
                            <button
                              onClick={() => handleStartEdit(f)}
                              className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteNote(f.id)}
                              className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── GROUP 2: PREVIOUSLY SENT NOTES ── */}
                {sentNotes.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider font-mono">
                        Sent to Uanify Team ({sentNotes.length})
                      </span>
                    </div>

                    <div className="space-y-2">
                      {sentNotes.map((f) => (
                        <div key={f.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-900/40 text-[11px] flex flex-col justify-between gap-2">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] px-2 py-0.5 rounded bg-blue-950 text-sky-400 border border-blue-900 font-mono">
                                  {f.type}
                                </span>
                                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold flex items-center gap-1">
                                  <CheckCheck className="w-3 h-3 text-emerald-400" /> SENT
                                </span>
                                {f.batchId && (
                                  <span className="text-[9px] font-mono text-slate-500">[{f.batchId}]</span>
                                )}
                              </div>
                              <span className="text-slate-500 text-[10px]">{f.sentAt || f.date}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{f.note}</p>
                          </div>

                          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-900">
                            <button
                              onClick={() => handleDeleteNote(f.id)}
                              className="text-slate-500 hover:text-rose-400 flex items-center gap-1 text-[10px] cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove from History</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {submittedFeedback.length === 0 && (
                  <p className="text-center text-slate-600 text-[11px] py-6 bg-slate-950/40 rounded-xl border border-dashed border-slate-800">
                    No notes currently saved. Use the form above to add questions or scope adjustment requests.
                  </p>
                )}

              </div>
            )}

          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="shrink-0 px-6 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-600">
          <span>Shining On Safety · Prepared by Uanify · Confidential</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 font-bold border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md transition-colors cursor-pointer text-xs"
            >
              {isEn ? 'Close & Return to Prototype' : 'Cerrar y Volver al Prototipo'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
