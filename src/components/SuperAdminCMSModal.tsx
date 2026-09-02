import React, { useState } from 'react';
import { X, Settings, Plus, DollarSign, Edit3, Trash2, CheckCircle2, TrendingUp, BookOpen, Package, Users } from 'lucide-react';
import { Course, COURSES_DATA } from '../data/content';
import confetti from 'canvas-confetti';

interface SuperAdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
  courses: Course[];
  onUpdateCoursePrice: (courseId: string, newPrice: number) => void;
  onAddNewCourse: (newCourse: Course) => void;
}

export const SuperAdminCMSModal: React.FC<SuperAdminCMSModalProps> = ({
  isOpen,
  onClose,
  lang,
  courses,
  onUpdateCoursePrice,
  onAddNewCourse,
}) => {
  const isEn = lang === 'en';
  const [activeTab, setActiveTab] = useState<'courses' | 'sales'>('courses');
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(249);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState(199);
  const [newStandard, setNewStandard] = useState('29 CFR 1926');

  if (!isOpen) return null;

  const handleSavePrice = (courseId: string) => {
    onUpdateCoursePrice(courseId, editPriceVal);
    setEditingCourseId(null);
    confetti({ particleCount: 40, spread: 50 });
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const courseObj: Course = {
      id: `c-custom-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      titleEs: newTitle,
      category: 'Specialized Safety',
      categoryEs: 'Seguridad Especializada',
      price: Number(newPrice),
      duration: '3.5 Hours • Self-Paced',
      oshaStandard: newStandard,
      instructor: 'Melanie Jaime',
      instructorRole: 'Lead OSHA Safety Specialist',
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 1,
      badge: 'New Course',
      badgeEs: 'Nuevo Curso',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      shortDescription: 'Custom course added directly via the SuperAdmin self-management CMS dashboard.',
      shortDescriptionEs: 'Curso creado directamente desde el panel de administración SuperAdmin sin programador.',
      modules: [
        { title: 'Module 1: Safety Overview', titleEs: 'Módulo 1: Visión General', duration: '45 min', lessonsCount: 3 },
        { title: 'Module 2: Practical Application & Exam', titleEs: 'Módulo 2: Aplicación Práctica y Examen', duration: '60 min', lessonsCount: 4 }
      ]
    };

    onAddNewCourse(courseObj);
    setShowAddModal(false);
    setNewTitle('');
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-heading text-white">
                {isEn ? 'SuperAdmin CMS & Self-Management Dashboard' : 'Panel CMS SuperAdmin de Autogestión'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Live Simulator
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isEn
                ? 'Empowering Melanie & team to update prices, add courses & manage store with zero code.'
                : 'Permite a Melanie y su equipo modificar precios, añadir cursos y gestionar la tienda sin programador.'}
            </p>
          </div>
        </div>

        {/* Top Metric Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">{isEn ? 'Total Platform Sales' : 'Ventas del Mes'}</span>
            <span className="text-xl font-black text-amber-400 font-heading">$38,450 USD</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">{isEn ? 'Active Students' : 'Alumnos Activos'}</span>
            <span className="text-xl font-black text-white font-heading">13,690</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">{isEn ? 'Corporate Accounts' : 'Empresas B2B'}</span>
            <span className="text-xl font-black text-emerald-400 font-heading">18 Firms</span>
          </div>
        </div>

        {/* Course Manager Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'Course & Tuition Price Manager' : 'Gestor de Cursos y Precios'}</span>
            </h4>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isEn ? '+ Create New Course' : '+ Crear Nuevo Curso'}</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Course Title</th>
                  <th className="p-3">OSHA Standard</th>
                  <th className="p-3">Tuition Price (USD)</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                {courses.map(c => (
                  <tr key={c.id} className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">{isEn ? c.title : c.titleEs}</td>
                    <td className="p-3 font-mono text-amber-400/90">{c.oshaStandard}</td>
                    <td className="p-3">
                      {editingCourseId === c.id ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400">$</span>
                          <input
                            type="number"
                            value={editPriceVal}
                            onChange={e => setEditPriceVal(Number(e.target.value))}
                            className="w-20 px-2 py-1 bg-slate-800 border border-amber-500 rounded text-xs text-white font-bold"
                          />
                          <button
                            onClick={() => handleSavePrice(c.id)}
                            className="px-2 py-1 bg-emerald-500 text-slate-950 font-bold rounded text-[11px]"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <span className="font-bold text-white">${c.price} USD</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      {editingCourseId !== c.id && (
                        <button
                          onClick={() => {
                            setEditingCourseId(c.id);
                            setEditPriceVal(c.price);
                          }}
                          className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline flex items-center gap-1 ml-auto"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Price</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Course Modal Sub-Drawer */}
        {showAddModal && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {isEn ? 'Create New Course (Instant Launch):' : 'Crear Nuevo Curso (Lanzamiento Inmediato):'}
            </h5>
            <form onSubmit={handleCreateCourse} className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="sm:col-span-2">
                <input
                  required
                  type="text"
                  placeholder="e.g. Rigging & Signal Person Certification"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={newPrice}
                  onChange={e => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div className="sm:col-span-3 flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold rounded text-xs"
                >
                  Publish to Live Catalog
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
