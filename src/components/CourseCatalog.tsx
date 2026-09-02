import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Star, 
  Play, 
  UserCheck, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  FileCheck,
  CreditCard,
  X,
  Building,
  User,
  Phone,
  Mail,
  Calendar,
  Lock
} from 'lucide-react';
import { Course, COURSES_DATA } from '../data/content';
import type { TierMode } from './TierSwitcherBanner';
import confetti from 'canvas-confetti';

interface CourseCatalogProps {
  lang: 'en' | 'es';
  tier: TierMode;
  onAddToCart: (item: { id: string; name: string; price: number; type: 'course' | 'gear'; image: string }) => void;
  onOpenVideoModal: (courseTitle: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  lang,
  tier,
  onAddToCart,
  onOpenVideoModal,
}) => {
  const isEn = lang === 'en';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>('c1');
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);

  // Student registration form state for course
  const [studentForm, setStudentForm] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    walletCardDelivery: true,
  });

  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const categories = isEn
    ? [
        { id: 'all', label: 'All University Courses (6)' },
        { id: 'High Risk Compliance', label: 'High Risk & Fall Safety' },
        { id: 'Site Supervision', label: 'Supervision & Competent Person' },
        { id: 'Foundation Certification', label: 'OSHA 10 Fundamentals' },
        { id: 'Specialized Safety', label: 'Specialized Construction' },
      ]
    : [
        { id: 'all', label: 'Todos los Cursos (6)' },
        { id: 'High Risk Compliance', label: 'Alto Riesgo y Caídas' },
        { id: 'Site Supervision', label: 'Supervisión y Persona Competente' },
        { id: 'Foundation Certification', label: 'Fundamentos OSHA 10' },
        { id: 'Specialized Safety', label: 'Especialidades de Obra' },
      ];

  const filteredCourses = selectedCategory === 'all'
    ? COURSES_DATA
    : COURSES_DATA.filter(c => c.category === selectedCategory);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollSuccess(true);
    confetti({ particleCount: 75, spread: 70 });
    if (enrollingCourse) {
      onAddToCart({
        id: enrollingCourse.id,
        name: isEn ? enrollingCourse.title : enrollingCourse.titleEs,
        price: enrollingCourse.price,
        type: 'course',
        image: enrollingCourse.image
      });
    }
  };

  return (
    <section id="courses" className="py-20 bg-[#0A0F1D] text-slate-100 border-b-2 border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* University Section Header with Official Heavy Industrial Branding */}
        <div className="bg-[#0B1A3A] border-2 border-blue-600/50 rounded-3xl p-8 sm:p-12 text-white shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-safety-stripe-blue opacity-30 pointer-events-none" />
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-blue-950/90 border border-sky-400/40 text-sky-300 text-xs font-bold font-mono uppercase tracking-wider shadow-inner">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>SOS Safety University • E-Learning Campus</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-tight uppercase">
              {isEn ? (
                <>Accredited Safety Courses & <br /><span className="text-sky-300">OSHA Workforce Certifications</span></>
              ) : (
                <>Cursos Acreditados de Seguridad y <br /><span className="text-sky-300">Certificaciones Laborales OSHA</span></>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {isEn
                ? 'Accredited self-paced online curriculum for construction contractors and field personnel. Interactive HD video streaming, module comprehension quizzes, and instant tamper-proof QR certificates.'
                : 'Plan de estudios virtual acreditado para contratistas y cuadrillas de construcción. Video clases en HD, exámenes modulares y certificados digitales con código QR.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono font-bold text-slate-300">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 rounded-md border border-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Online & Self-Paced</span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 rounded-md border border-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Official DOL Card Shipping</span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 rounded-md border border-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Employer Compliance Sync</span>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none max-w-full">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-slate-500 font-mono shrink-0">
            {filteredCourses.length} {isEn ? 'Programs Available' : 'Cursos Disponibles'}
          </span>
        </div>

        {/* 2-Column Detailed Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCourses.map(course => {
            const isExpanded = expandedCourseId === course.id;

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-500 transition-all shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with OSHA standard and price */}
                  <div className="p-6 pb-4 flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/50">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase font-mono">
                          {course.oshaStandard}
                        </span>
                        {course.badge && (
                          <span className="text-[10px] font-black px-2.5 py-0.5 rounded bg-blue-600 text-white uppercase">
                            {isEn ? course.badge : course.badgeEs}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-black font-heading text-slate-950 leading-snug">
                        {isEn ? course.title : course.titleEs}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-2xl font-black text-blue-600 font-heading">${course.price}</span>
                      <span className="text-[11px] text-slate-500 font-bold block">USD Tuition</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {isEn ? course.shortDescription : course.shortDescriptionEs}
                    </p>

                    {/* Quick Meta Stats */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Duration</span>
                        <span className="font-bold text-slate-900">{course.duration}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Rating</span>
                        <span className="font-bold text-amber-600 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating} ({course.reviewsCount})
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Passing Grade</span>
                        <span className="font-bold text-emerald-700">80% on Final Exam</span>
                      </div>
                    </div>

                    {/* Instructor & Video Preview Action */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center text-xs">
                          SJ
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block leading-none">{course.instructor}</span>
                          <span className="text-[10px] text-slate-500">{course.instructorRole}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenVideoModal(isEn ? course.title : course.titleEs)}
                        className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isEn ? 'Preview Lesson' : 'Ver Video Muestra'}</span>
                      </button>
                    </div>

                    {/* Expandable Syllabus Drawer */}
                    <div className="pt-2">
                      <button
                        onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                        className="w-full flex items-center justify-between py-2 px-3.5 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 text-xs font-bold text-blue-900 border border-blue-200 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span>{isEn ? `Academic Syllabus (${course.modules.length} Modules & Quizzes)` : `Temario Académico (${course.modules.length} Módulos)`}</span>
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                          {course.modules.map((m, idx) => (
                            <div key={idx} className="flex items-start justify-between gap-2 pb-2 border-b border-slate-200 last:border-0 last:pb-0">
                              <div className="flex items-start gap-2">
                                <span className="font-mono text-blue-600 font-bold">{idx + 1}.</span>
                                <div>
                                  <span className="text-slate-900 font-bold block">{isEn ? m.title : m.titleEs}</span>
                                  <span className="text-[10px] text-slate-500 font-medium">
                                    {m.lessonsCount} video lessons + Knowledge Check Quiz
                                  </span>
                                </div>
                              </div>
                              <span className="text-slate-600 font-mono text-[11px] font-bold shrink-0">{m.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* Footer with Enrollment Action */}
                <div className="p-6 pt-0 border-t border-slate-100 bg-white">
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-xs text-slate-500 font-medium">
                      <span>Includes: <strong>Digital QR + PDF Certificate</strong></span>
                    </div>

                    <button
                      onClick={() => {
                        setEnrollingCourse(course);
                        setEnrollSuccess(false);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>{isEn ? 'Enroll / Student Form' : 'Inscribir / Datos de Alumno'}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Official Student Registration Modal */}
      {enrollingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 my-8 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setEnrollingCourse(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!enrollSuccess ? (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs shrink-0">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider font-mono">
                      SOS Safety University • Official Registration
                    </span>
                    <h3 className="text-lg font-black font-heading text-slate-950 leading-tight">
                      {isEn ? enrollingCourse.title : enrollingCourse.titleEs}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Tuition: <strong className="text-blue-600">${enrollingCourse.price} USD</strong> • Standard: {enrollingCourse.oshaStandard}
                    </p>
                  </div>
                </div>

                {/* Form Inputs for Student Certificate Issuance */}
                <form onSubmit={handleEnrollSubmit} className="space-y-4 text-xs">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {isEn ? '1. Trainee Identification & Certificate Data (Required by OSHA):' : '1. Datos del Alumno para Emisión Oficial de Certificado:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Student Legal Full Name' : 'Nombre Completo del Alumno'}</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          required
                          type="text"
                          placeholder="e.g. Carlos Mendez"
                          value={studentForm.fullName}
                          onChange={e => setStudentForm({ ...studentForm, fullName: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Date of Birth (MM/DD/YYYY)' : 'Fecha de Nacimiento'}</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          required
                          type="text"
                          placeholder="04/18/1988"
                          value={studentForm.dob}
                          onChange={e => setStudentForm({ ...studentForm, dob: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Student Email (For LMS Access)' : 'Correo Electrónico (Acceso a Clases)'}</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          required
                          type="email"
                          placeholder="carlos@contractor.com"
                          value={studentForm.email}
                          onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Phone / Mobile' : 'Teléfono / Celular'}</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          required
                          type="tel"
                          placeholder="(555) 234-5678"
                          value={studentForm.phone}
                          onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider pt-2 border-t border-slate-100">
                    {isEn ? '2. Employer & Jobsite Identification:' : '2. Empresa y Lugar de Trabajo:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Employer / General Contractor' : 'Empresa / Contratista'}</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          required
                          type="text"
                          placeholder="Apex Construction LLC"
                          value={studentForm.companyName}
                          onChange={e => setStudentForm({ ...studentForm, companyName: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Trade / Job Role' : 'Puesto / Oficio en Obra'}</label>
                      <input
                        required
                        type="text"
                        placeholder="Foreman / Carpenter"
                        value={studentForm.jobTitle}
                        onChange={e => setStudentForm({ ...studentForm, jobTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>
                  </div>

                  {/* Wallet Card Delivery Option */}
                  <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="walletCard"
                      checked={studentForm.walletCardDelivery}
                      onChange={e => setStudentForm({ ...studentForm, walletCardDelivery: e.target.checked })}
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <label htmlFor="walletCard" className="text-xs text-blue-950 font-medium cursor-pointer">
                      <strong>Include Physical Hardhat Sticker & Laminated Wallet Card (Free Shipping)</strong>
                      <span className="block text-[11px] text-blue-700 mt-0.5">
                        Shipped directly to your jobsite upon passing the 80% final exam.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Tuition</span>
                      <span className="text-2xl font-black text-blue-600 font-heading">${enrollingCourse.price} USD</span>
                    </div>

                    <button
                      type="submit"
                      className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{isEn ? 'Proceed to 1-Step Checkout' : 'Continuar al Pago en 1 Paso'}</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success confirmation */
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black font-heading text-slate-950">
                  {isEn ? 'Student Enrolled in Safety University!' : '¡Alumno Inscrito en Safety University!'}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {isEn
                    ? `Registration data for ${studentForm.fullName || 'the student'} has been registered. The course has been added to your 1-Step Checkout cart.`
                    : `Los datos del alumno fueron registrados exitosamente y el curso se agregó a su carrito de pago en 1 paso.`}
                </p>
                <button
                  onClick={() => setEnrollingCourse(null)}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  {isEn ? 'Close & View Cart' : 'Cerrar y Ver Carrito'}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
