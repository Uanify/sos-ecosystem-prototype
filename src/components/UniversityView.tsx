import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Star, 
  Play, 
  FileCheck, 
  UserCheck, 
  Building2, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  CreditCard,
  Check,
  AlertTriangle,
  HelpCircle,
  FileSpreadsheet,
  Download,
  Award,
  Video,
  FileText,
  Clock,
  Shield,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ListOrdered,
  Layers
} from 'lucide-react';
import { Course, COURSES_DATA, MOCK_COMPANY_EMPLOYEES } from '../data/content';
import { SafeImage } from './SafeImage';
import confetti from 'canvas-confetti';

interface UniversityViewProps {
  lang: 'en' | 'es';
  onAddToCart: (item: { id: string; name: string; price: number; type: 'course' | 'gear'; image: string }) => void;
  onOpenVideoModal: (courseTitle: string) => void;
  onOpenQRVerify: () => void;
  onOpenAdmin: () => void;
}

export const UniversityView: React.FC<UniversityViewProps> = ({
  lang,
  onAddToCart,
  onOpenVideoModal,
  onOpenQRVerify,
  onOpenAdmin,
}) => {
  const isEn = lang === 'en';
  
  // University internal tabs
  const [activeTab, setActiveTab] = useState<'catalog' | 'classroom' | 'company' | 'verify'>('catalog');
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>('c1');
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);

  // Rich LMS Classroom Simulation State
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0]);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [userQuizAnswers, setUserQuizAnswers] = useState<(number | null)[]>([null, null, null, null]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [passedExam, setPassedExam] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Student registration form state
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

  // Rich Course Lessons for LMS Classroom
  const classroomCourse = COURSES_DATA[0]; // Fall Protection
  const lessons = [
    {
      id: 'l1',
      title: isEn ? 'Lesson 1.1: OSHA 1926 Subpart M Scope & Duty to Have Fall Protection' : 'Lección 1.1: Alcance de OSHA 1926 Subparte M y Deber de Protección',
      duration: '14:20 min',
      videoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80',
      description: isEn ? 'Comprehensive breakdown of unprotected sides and edges, leading edges, holes, and the mandatory 6-foot rule under OSHA 29 CFR 1926.501.' : 'Desglose detallado de bordes desprotegidos, huecos y la regla obligatoria de 6 pies bajo OSHA 29 CFR 1926.501.',
      resources: ['OSHA_1926_Subpart_M_Regulation.pdf', 'Daily_PreShift_Checklist.pdf']
    },
    {
      id: 'l2',
      title: isEn ? 'Lesson 1.2: Personal Fall Arrest Systems (PFAS), Harnesses & Lanyards' : 'Lección 1.2: Sistemas Personales de Detención de Caídas (PFAS), Arneses y Líneas',
      duration: '18:45 min',
      videoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      description: isEn ? 'Inspection criteria for D-rings, webbing, decelerators, snap hooks, and proper fitting techniques for high-altitude workers.' : 'Criterios de inspección de anillos en D, cintas, amortiguadores y técnicas de ajuste para trabajadores en altura.',
      resources: ['Harness_Inspection_Log.pdf', 'Lanyard_Free_Fall_Calculation.xlsx']
    },
    {
      id: 'l3',
      title: isEn ? 'Lesson 1.3: Anchorage Points, 5,000 lb Load Ratings & Structural Beam Clamps' : 'Lección 1.3: Puntos de Anclaje, Carga de 5,000 lbs y Abrazaderas de Vigas',
      duration: '16:10 min',
      videoUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      description: isEn ? 'Understanding certified anchorages capable of supporting 5,000 lbs per worker or engineered with a safety factor of 2:1.' : 'Comprensión de anclajes certificados con capacidad de 5,000 lbs por trabajador o calculados con factor de seguridad 2:1.',
      resources: ['Anchor_Selection_Guide.pdf']
    },
    {
      id: 'l4',
      title: isEn ? 'Lesson 1.4: Jobsite Emergency Rescue Plans & Suspension Trauma Prevention' : 'Lección 1.4: Planes de Rescate en Obra y Prevención del Trauma por Suspensión',
      duration: '12:30 min',
      videoUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      description: isEn ? 'Prompt rescue protocols within 15 minutes, trauma relief straps deployment, and emergency medical response coordinates.' : 'Protocolos de rescate antes de 15 minutos, despliegue de correas de alivio de trauma y coordinación médica de emergencia.',
      resources: ['Emergency_Rescue_Action_Plan_Template.docx']
    },
  ];

  const quizQuestions = [
    {
      question: isEn
        ? 'Under OSHA 1926 Subpart M, at what height is fall protection mandatory on walking/working surfaces in construction?'
        : '¿A partir de qué altura es obligatoria la protección contra caídas en construcción bajo OSHA 1926 Subparte M?',
      options: [
        '4 Feet above a lower level',
        '6 Feet (1.8 meters) above a lower level (OSHA Standard)',
        '10 Feet above a lower level',
        '15 Feet on scaffolding only'
      ],
      correct: 1,
      explanation: isEn
        ? 'OSHA 1926.501(b)(1) states that each employee on a walking/working surface with an unprotected side or edge which is 6 feet (1.8 m) or more above a lower level shall be protected from falling.'
        : 'La norma OSHA 1926.501(b)(1) establece que cada empleado en superficies de trabajo a 6 pies (1.8 m) o más debe contar con protección contra caídas.'
    },
    {
      question: isEn
        ? 'What is the minimum breaking strength requirement for an anchorage point used for a Personal Fall Arrest System (PFAS)?'
        : '¿Cuál es la resistencia mínima que debe soportar un punto de anclaje para un sistema de detención de caídas (PFAS)?',
      options: [
        '1,500 lbs per attached worker',
        '3,000 lbs per attached worker',
        '5,000 lbs (22.2 kN) per worker attached, or designed by a qualified person with a safety factor of 2',
        '10,000 lbs total capacity regardless of crew size'
      ],
      correct: 2,
      explanation: isEn
        ? 'OSHA 1926.502(d)(15) requires anchorages used for personal fall arrest equipment to be capable of supporting at least 5,000 pounds per employee attached.'
        : 'OSHA 1926.502(d)(15) exige que los puntos de anclaje soporten al menos 5,000 libras por empleado conectado.'
    },
    {
      question: isEn
        ? 'What is the maximum allowable free-fall distance permitted when using a personal fall arrest lanyard?'
        : '¿Cuál es la distancia máxima de caída libre permitida al usar una línea de detención de caídas personal?',
      options: [
        '3 Feet',
        '6 Feet, and must not allow contact with a lower level',
        '10 Feet',
        '12 Feet with deceleration'
      ],
      correct: 1,
      explanation: isEn
        ? 'OSHA regulations stipulate that personal fall arrest systems must be rigged such that an employee can neither free fall more than 6 feet nor contact any lower level.'
        : 'La normativa OSHA establece que la caída libre no debe exceder 6 pies ni permitir contacto con un nivel inferior.'
    },
    {
      question: isEn
        ? 'How often must personal fall arrest harnesses and lanyards be inspected by the worker before shift use?'
        : '¿Con qué frecuencia debe el trabajador inspeccionar arneses y líneas de vida antes de su turno?',
      options: [
        'Once a month during safety meeting',
        'Prior to each use on every shift for wear, damage, or mildew',
        'Annually by a certified third-party vendor',
        'Only after a fall incident occurs'
      ],
      correct: 1,
      explanation: isEn
        ? 'OSHA 1926.502(d)(21) mandates that personal fall arrest systems shall be inspected prior to each use for wear, damage and other deterioration.'
        : 'OSHA 1926.502(d)(21) exige inspeccionar el equipo antes de cada uso en cada turno de trabajo.'
    }
  ];

  const handleSelectQuizAnswer = (optIndex: number) => {
    const updated = [...userQuizAnswers];
    updated[currentQuizQuestion] = optIndex;
    setUserQuizAnswers(updated);
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      // Calculate Grade
      const correctCount = userQuizAnswers.filter((ans, idx) => ans === quizQuestions[idx].correct).length;
      const score = (correctCount / quizQuestions.length) * 100;
      setQuizFinished(true);
      if (score >= 80) {
        setPassedExam(true);
        confetti({ particleCount: 100, spread: 80 });
      } else {
        setPassedExam(false);
      }
    }
  };

  const handleResetQuiz = () => {
    setUserQuizAnswers([null, null, null, null]);
    setCurrentQuizQuestion(0);
    setQuizFinished(false);
    setPassedExam(false);
  };

  const handleCompleteCurrentLesson = () => {
    if (!completedLessons.includes(selectedLessonIndex)) {
      setCompletedLessons([...completedLessons, selectedLessonIndex]);
    }
    if (selectedLessonIndex < lessons.length - 1) {
      setSelectedLessonIndex(selectedLessonIndex + 1);
    }
  };

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
    confetti({ particleCount: 70, spread: 60 });
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
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      
      {/* 1. SOS Safety University Distinguished Academic Hero Header */}
      <section className="bg-gradient-to-r from-[#07132B] via-[#0A225C] to-[#04112F] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b-2 border-blue-600 shadow-2xl">
        <div className="absolute inset-0 bg-grid-industrial opacity-25 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-blue-950/90 border border-sky-400/40 text-sky-300 text-xs font-black font-mono uppercase tracking-widest shadow-inner">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>SOS SAFETY UNIVERSITY • ACCREDITED LMS CAMPUS</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-tight uppercase text-white">
              {isEn ? (
                <>Accredited Safety Training <br /><span className="text-sky-300">University & Official OSHA Campus</span></>
              ) : (
                <>Campus Virtual de Seguridad <br /><span className="text-sky-300">Certificaciones Oficiales OSHA</span></>
              )}
            </h1>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
              {isEn
                ? 'Full integration of the Safety University learning management system: self-paced video modules, interactive quizzes, instant QR credentials, and company crew tracking.'
                : 'Integración completa del campus Safety University: lecciones en video, cuestionarios interactivos, certificados QR instantáneos y panel de control para cuadrillas.'}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-mono font-bold text-sky-200">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Cloud-Based
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 Hardhat QR Scan
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> DOL 29 CFR 1926
              </span>
            </div>
          </div>

          {/* Quick University Stats Card */}
          <div className="bg-slate-900/90 backdrop-blur-md border-2 border-sky-500/40 rounded-3xl p-6 text-white text-center sm:text-left w-full lg:w-96 shadow-2xl space-y-4 shrink-0">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <span className="text-xs font-black uppercase font-mono tracking-wider text-sky-300">
                {isEn ? 'Campus Capabilities' : 'Capacidades del Campus'}
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded font-bold">
                100% ONLINE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#061026] rounded-xl border border-blue-500/30">
                <span className="text-xl font-black font-heading text-sky-300 block">6 Courses</span>
                <span className="text-[10px] text-slate-400 font-mono">29 CFR 1926 Aligned</span>
              </div>
              <div className="p-3 bg-[#061026] rounded-xl border border-blue-500/30">
                <span className="text-xl font-black font-heading text-emerald-300 block">80% Pass</span>
                <span className="text-[10px] text-slate-400 font-mono">Automated Grading</span>
              </div>
            </div>

            <button
              onClick={onOpenQRVerify}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-black text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer hover:scale-[1.02]"
            >
              <FileCheck className="w-4 h-4 text-sky-200" />
              <span>{isEn ? 'Validate Certificate Authenticity' : 'Verificar Certificado Oficial'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 2. Interactive LMS Navigation Tabs Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Tab buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'catalog', label: isEn ? 'Course Syllabus' : 'Catálogo de Cursos', count: '6 Courses' },
                { id: 'classroom', label: isEn ? 'Virtual Classroom' : 'Aula Virtual', count: 'Live Demo' },
                { id: 'company', label: isEn ? 'Crew Roster' : 'Cuadrillas', count: 'B2B Portal' },
                { id: 'verify', label: isEn ? 'QR Authenticator' : 'Validador QR', count: '24/7' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    activeTab === tab.id ? 'bg-blue-800 text-sky-200 font-bold' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick SuperAdmin access */}
            <button
              onClick={onOpenAdmin}
              className="text-xs font-bold text-slate-700 hover:text-blue-700 flex items-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer bg-white whitespace-nowrap shrink-0 shadow-xs"
            >
              <span>{isEn ? 'SuperAdmin CMS' : 'SuperAdmin CMS'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </button>

          </div>
        </div>
      </nav>

      {/* 3. TAB 1: ACADEMIC CATALOG */}
      {activeTab === 'catalog' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
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
              {filteredCourses.length} {isEn ? 'Accredited Programs' : 'Programas Acreditados'}
            </span>
          </div>

          {/* Detailed Course Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCourses.map(course => {
              const isExpanded = expandedCourseId === course.id;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-blue-500 transition-all shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Header info */}
                    <div className="p-6 pb-4 flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/50">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase font-mono">
                            {course.oshaStandard}
                          </span>
                          {course.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
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
                          onClick={() => {
                            setActiveTab('classroom');
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isEn ? 'Open Virtual Classroom' : 'Entrar al Aula Virtual'}</span>
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
        </section>
      )}

      {/* 4. TAB 2: FULL-FEATURED LMS CLASSROOM & QUIZ SIMULATOR */}
      {activeTab === 'classroom' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          {/* Top Classroom Student Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold font-heading text-lg shadow-md shrink-0">
                OSHA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-950 text-sky-300 border border-blue-800 font-mono uppercase">
                    Active Student Session: Carlos Mendez
                  </span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled (DOL 29 CFR 1926)
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black font-heading text-white mt-0.5">
                  {isEn ? classroomCourse.title : classroomCourse.titleEs}
                </h2>
              </div>
            </div>

            {/* Course Progress Bar */}
            <div className="w-full md:w-64 bg-slate-800 p-3 rounded-2xl border border-slate-700 space-y-1.5 shrink-0">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Course Progress</span>
                <span className="text-sky-300 font-mono">{Math.round((completedLessons.length / (lessons.length + 1)) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500"
                  style={{ width: `${(completedLessons.length / (lessons.length + 1)) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block text-right font-medium">
                {completedLessons.length} of {lessons.length + 1} Modules Completed
              </span>
            </div>
          </div>

          {/* Main 2-Column LMS Learning Suite */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Interactive Video Player & Lesson Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Video Player Box */}
              <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <img
                    src={lessons[selectedLessonIndex].videoUrl}
                    alt={lessons[selectedLessonIndex].title}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  
                  {/* Play Center Overlay */}
                  <button
                    onClick={() => onOpenVideoModal(lessons[selectedLessonIndex].title)}
                    className="absolute w-20 h-20 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer group"
                  >
                    <Play className="w-10 h-10 fill-white ml-1 group-hover:scale-105 transition-transform" />
                  </button>

                  {/* Player Bottom Control Bar Simulation */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onOpenVideoModal(lessons[selectedLessonIndex].title)}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                      </button>
                      <span className="font-mono text-[11px] text-slate-300">04:15 / {lessons[selectedLessonIndex].duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600/80 text-white font-mono font-bold">HD 1080p</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">1.0x</span>
                    </div>
                  </div>
                </div>

                {/* Lesson Header & Next Action */}
                <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-sky-400 font-bold uppercase font-mono">
                      Module 0{selectedLessonIndex + 1}
                    </span>
                    <h3 className="text-lg font-black font-heading text-white mt-0.5">
                      {lessons[selectedLessonIndex].title}
                    </h3>
                  </div>

                  <button
                    onClick={handleCompleteCurrentLesson}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isEn ? 'Mark Complete & Next' : 'Completar y Siguiente'}</span>
                  </button>
                </div>
              </div>

              {/* Lesson Syllabus Details & Downloads */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
                <h4 className="font-bold text-base text-slate-950 font-heading">
                  {isEn ? 'Lesson Summary & Compliance Objectives:' : 'Resumen de la Lección y Objetivos de Cumplimiento:'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lessons[selectedLessonIndex].description}
                </p>

                {/* Downloadable Handouts */}
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    {isEn ? 'Downloadable PDF Resources & Field Checklists:' : 'Material Descargable y Listas de Cotejo en PDF:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {lessons[selectedLessonIndex].resources.map((res, idx) => (
                      <button
                        key={idx}
                        onClick={() => alert(`Downloading official document: ${res}`)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs flex items-center gap-2 border border-slate-200 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-600" />
                        <span>{res}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Col: Course Outline & Knowledge Check Exam */}
            <div className="space-y-6">
              
              {/* Module Outline Sidebar */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-sm text-slate-950 font-heading">
                    {isEn ? 'Course Syllabus Modules' : 'Módulos del Curso'}
                  </h4>
                  <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                    4 Modules + Exam
                  </span>
                </div>

                <div className="space-y-2">
                  {lessons.map((les, idx) => {
                    const isCompleted = completedLessons.includes(idx);
                    const isCurrent = selectedLessonIndex === idx;

                    return (
                      <button
                        key={les.id}
                        onClick={() => setSelectedLessonIndex(idx)}
                        className={`w-full p-3 rounded-2xl text-left transition-all flex items-start justify-between gap-3 cursor-pointer border ${
                          isCurrent
                            ? 'bg-blue-50 border-blue-600 text-blue-950 shadow-xs'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="mt-0.5">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-500">
                                {idx + 1}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-xs block leading-snug">{les.title.split(':')[0]}</span>
                            <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{les.title.split(':')[1]}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">{les.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Exam / Quiz Box */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl space-y-4 border border-blue-800">
                <div className="flex items-center justify-between pb-3 border-b border-blue-800/80">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-xs uppercase tracking-wider text-sky-200">
                      80% Final Passing Exam
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-950 text-sky-300 border border-blue-700 px-2 py-0.5 rounded font-bold">
                    Official DOL Test
                  </span>
                </div>

                {!quizFinished ? (
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs text-sky-200">
                      <span>Question {currentQuizQuestion + 1} of {quizQuestions.length}</span>
                      <span className="font-mono">80% Req.</span>
                    </div>

                    <p className="text-xs font-bold leading-relaxed text-white">
                      {quizQuestions[currentQuizQuestion].question}
                    </p>

                    <div className="space-y-2">
                      {quizQuestions[currentQuizQuestion].options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizAnswer(oIdx)}
                          className={`w-full p-3 rounded-xl text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between border ${
                            userQuizAnswers[currentQuizQuestion] === oIdx
                              ? 'bg-blue-600 border-sky-300 text-white shadow-xs'
                              : 'bg-blue-950/60 border-blue-800/70 text-blue-100 hover:bg-blue-800/50'
                          }`}
                        >
                          <span className="leading-snug">{opt}</span>
                          {userQuizAnswers[currentQuizQuestion] === oIdx && (
                            <Check className="w-4 h-4 text-white shrink-0 ml-2" />
                          )}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleNextQuizQuestion}
                      disabled={userQuizAnswers[currentQuizQuestion] === null}
                      className="w-full py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-all disabled:opacity-50 cursor-pointer shadow-md mt-2 flex items-center justify-center gap-1.5"
                    >
                      <span>{currentQuizQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Submit & Grade Exam'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-3">
                    <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center ${
                      passedExam ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {passedExam ? <Award className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
                    </div>

                    <div>
                      <h4 className="font-black text-lg text-white">
                        {passedExam ? 'Exam Passed! (100% Score)' : 'Score: 50% — Review Lessons'}
                      </h4>
                      <p className="text-xs text-blue-200 mt-1">
                        {passedExam 
                          ? 'Congratulations! You met the 80% passing requirement. Your official tamper-proof QR certificate has been issued.' 
                          : 'You need at least 80% to pass and generate the certificate. Please re-take the exam.'}
                      </p>
                    </div>

                    {passedExam ? (
                      <div className="space-y-2 pt-2">
                        <button
                          onClick={onOpenQRVerify}
                          className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <FileCheck className="w-4 h-4" />
                          <span>View Official QR Certificate</span>
                        </button>
                        <button
                          onClick={handleResetQuiz}
                          className="w-full py-2 bg-blue-950 hover:bg-blue-900 text-sky-300 text-xs font-bold rounded-xl border border-blue-800 transition-colors cursor-pointer"
                        >
                          Retake Quiz Simulator
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleResetQuiz}
                        className="w-full py-2.5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>

          </div>

        </section>
      )}

      {/* 5. TAB 3: COMPANY ROSTER & B2B COMPLIANCE TRACKER */}
      {activeTab === 'company' && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase">
                    Company Admin Portal
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-bold">L7 Constructs LLC</span>
                </div>
                <h3 className="text-2xl font-black font-heading text-slate-950 mt-1">
                  Active Crew Certification & Compliance Tracker
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert('Exporting OSHA 300A Compliance Spreadsheet...')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Export Excel / OSHA Sheet</span>
                </button>
              </div>
            </div>

            {/* Crew Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Worker Name</th>
                    <th className="p-3">Jobsite Role</th>
                    <th className="p-3">Certified Course</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Score</th>
                    <th className="p-3 text-right">QR Credential</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {MOCK_COMPANY_EMPLOYEES.map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-950">{emp.name}</td>
                      <td className="p-3 text-slate-600">{emp.role}</td>
                      <td className="p-3 font-medium text-blue-900">{emp.course}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          emp.status === 'Certified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : emp.status.includes('Expiring')
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold">{emp.score}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={onOpenQRVerify}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-bold underline flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>View Card</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>
      )}

      {/* 6. TAB 4: CERTIFICATE AUTHENTICATOR */}
      {activeTab === 'verify' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
              <FileCheck className="w-10 h-10" />
            </div>
            
            <div>
              <h3 className="text-2xl font-black font-heading text-slate-950">
                Official 24/7 Certificate & QR Authenticity Validator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2">
                Jobsite inspectors, safety directors, and general contractors can verify any SOS certificate instantly by entering the ID or scanning the card QR.
              </p>
            </div>

            <button
              onClick={onOpenQRVerify}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/30 hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Launch Live QR Verification Scanner</span>
            </button>
          </div>
        </section>
      )}

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

                <form onSubmit={handleEnrollSubmit} className="space-y-4 text-xs">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {isEn ? '1. Trainee Identification & Certificate Data (Required by OSHA):' : '1. Datos del Alumno para Emisión Oficial de Certificado:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Student Legal Full Name' : 'Nombre Completo del Alumno'}</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Carlos Mendez"
                        value={studentForm.fullName}
                        onChange={e => setStudentForm({ ...studentForm, fullName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Date of Birth (MM/DD/YYYY)' : 'Fecha de Nacimiento'}</label>
                      <input
                        required
                        type="text"
                        placeholder="04/18/1988"
                        value={studentForm.dob}
                        onChange={e => setStudentForm({ ...studentForm, dob: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Student Email (For LMS Access)' : 'Correo Electrónico (Acceso a Clases)'}</label>
                      <input
                        required
                        type="email"
                        placeholder="carlos@contractor.com"
                        value={studentForm.email}
                        onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Phone / Mobile' : 'Teléfono / Celular'}</label>
                      <input
                        required
                        type="tel"
                        placeholder="(555) 234-5678"
                        value={studentForm.phone}
                        onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>
                  </div>

                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider pt-2 border-t border-slate-100">
                    {isEn ? '2. Employer & Jobsite Identification:' : '2. Empresa y Lugar de Trabajo:'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">{isEn ? 'Employer / General Contractor' : 'Empresa / Contratista'}</label>
                      <input
                        required
                        type="text"
                        placeholder="Apex Construction LLC"
                        value={studentForm.companyName}
                        onChange={e => setStudentForm({ ...studentForm, companyName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
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
                      id="walletCardModal"
                      checked={studentForm.walletCardDelivery}
                      onChange={e => setStudentForm({ ...studentForm, walletCardDelivery: e.target.checked })}
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="walletCardModal" className="text-xs text-blue-950 font-medium cursor-pointer">
                      <strong>Include Physical Hardhat Sticker & Laminated Wallet Card (Free Shipping)</strong>
                      <span className="block text-[11px] text-blue-700 mt-0.5">
                        Shipped directly to your jobsite upon passing the 80% final exam.
                      </span>
                    </label>
                  </div>

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
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black font-heading text-slate-950">
                  {isEn ? 'Student Enrolled in Safety University!' : '¡Alumno Inscrito en Safety University!'}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
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

    </div>
  );
};
