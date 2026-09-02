import React, { useState } from 'react';
import { Course, COURSES_DATA } from '../data/content';
import { 
  Star, 
  Clock, 
  Award, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  ShoppingCart, 
  CheckCircle, 
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { TierMode } from './TierSwitcherBanner';

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
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const categories = isEn
    ? [
        { id: 'all', label: 'All Courses (6)' },
        { id: 'High Risk Compliance', label: 'High Risk & Fall Safety' },
        { id: 'Site Supervision', label: 'Supervision & Competent Person' },
        { id: 'Foundation Certification', label: 'OSHA 10 Fundamentals' },
      ]
    : [
        { id: 'all', label: 'Todos los Cursos (6)' },
        { id: 'High Risk Compliance', label: 'Alto Riesgo y Caídas' },
        { id: 'Site Supervision', label: 'Supervisión y Persona Competente' },
        { id: 'Foundation Certification', label: 'Fundamentos OSHA 10' },
      ];

  const filteredCourses = selectedCategory === 'all'
    ? COURSES_DATA
    : COURSES_DATA.filter(c => c.category === selectedCategory);

  const toggleSyllabus = (id: string) => {
    setExpandedSyllabusId(expandedSyllabusId === id ? null : id);
  };

  return (
    <section id="courses" className="py-20 bg-slate-950/60 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>{isEn ? 'Individual Certification Catalog ($180–$349)' : 'Catálogo de Cursos Certificados ($180–$349)'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white">
              {isEn ? 'Accredited OSHA Training Programs' : 'Programas de Capacitación Oficiales'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              {isEn
                ? 'Instant online access, verified instructor syllabi, tamper-proof QR certification, and immediate jobsite compliance.'
                : 'Acceso inmediato online, temarios validados, certificados con código QR anti-fraude y validez para inspectores de obra.'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCourses.map(course => {
            const isSyllabusOpen = expandedSyllabusId === course.id;

            return (
              <div
                key={course.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-xl"
              >
                {/* Course Image Header */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={course.image}
                      alt={isEn ? course.title : course.titleEs}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Badge */}
                    {course.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-md">
                        {isEn ? course.badge : course.badgeEs}
                      </span>
                    )}

                    {/* Preview Video Button */}
                    <button
                      onClick={() => onOpenVideoModal(isEn ? course.title : course.titleEs)}
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/80 hover:bg-amber-500 text-slate-200 hover:text-slate-950 backdrop-blur-md text-xs font-semibold border border-white/10 transition-all shadow-lg"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isEn ? 'Preview' : 'Ver Avance'}</span>
                    </button>

                    {/* OSHA Standard Tag */}
                    <div className="absolute bottom-3 left-3 text-[11px] font-mono text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                      {course.oshaStandard}
                    </div>
                  </div>

                  {/* Course Content Body */}
                  <div className="p-6">
                    
                    {/* Rating & Stats */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="font-bold text-white">{course.rating}</span>
                        <span className="text-slate-500">({course.reviewsCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold font-heading text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {isEn ? course.title : course.titleEs}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {isEn ? course.shortDescription : course.shortDescriptionEs}
                    </p>

                    {/* Instructor Bio Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px] block">{isEn ? 'Lead Instructor:' : 'Instructor:'}</span>
                        <span className="text-slate-200 font-semibold">{course.instructor}</span>
                      </div>
                      <span className="text-[10px] text-amber-400/90 font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {isEn ? 'Verified Trainer' : 'Autorizado OSHA'}
                      </span>
                    </div>

                    {/* Expandable Syllabus Drawer (Option 1 & 2 CRO feature) */}
                    <div className="mt-4">
                      <button
                        onClick={() => toggleSyllabus(course.id)}
                        className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900/90 hover:bg-slate-850 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors"
                      >
                        <span className="flex items-center gap-1.5 text-amber-400">
                          <BookOpen className="w-3.5 h-3.5" />
                          {isEn ? `Syllabus Outline (${course.modules.length} Modules)` : `Temario Completo (${course.modules.length} Módulos)`}
                        </span>
                        {isSyllabusOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>

                      {isSyllabusOpen && (
                        <div className="mt-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800/90 space-y-2 text-xs">
                          {course.modules.map((m, idx) => (
                            <div key={idx} className="flex items-start justify-between gap-2 pb-1.5 border-b border-slate-900 last:border-0 last:pb-0">
                              <div className="flex items-start gap-1.5">
                                <span className="font-mono text-amber-400 font-bold">{idx + 1}.</span>
                                <span className="text-slate-200 font-medium">{isEn ? m.title : m.titleEs}</span>
                              </div>
                              <span className="text-slate-500 font-mono text-[10px] shrink-0">{m.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* Course Card Footer: Price & Enroll CTA */}
                <div className="p-6 pt-0 border-t border-slate-800/60 mt-4">
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        {isEn ? 'Tuition Fee' : 'Inversión'}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-white font-heading">${course.price}</span>
                        <span className="text-xs text-slate-400 font-medium">USD</span>
                        {course.originalPrice && (
                          <span className="text-xs text-slate-500 line-through ml-1">${course.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart({
                        id: course.id,
                        name: isEn ? course.title : course.titleEs,
                        price: course.price,
                        type: 'course',
                        image: course.image
                      })}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.03] transition-all flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Enroll Now' : 'Inscribirme'}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
