import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Plus, 
  Edit3, 
  BookOpen, 
  Video, 
  DollarSign, 
  Users, 
  FileCheck, 
  QrCode, 
  Check, 
  Save, 
  Database, 
  Tag, 
  Truck, 
  CheckCircle2, 
  UserPlus, 
  Award,
  ShieldCheck,
  Percent,
  Trash2,
  Camera,
  Briefcase
} from 'lucide-react';
import type { Course } from '../data/content';

interface SuperAdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
  courses: Course[];
  onUpdateCoursePrice: (courseId: string, newPrice: number) => void;
  onAddNewCourse: (newCourse: Course) => void;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
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
  const [activeTab, setActiveTab] = useState<'team' | 'courses' | 'fulfillment' | 'coupons' | 'credentials' | 'finance'>('team');
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(249);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Team Member Modal State
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [teamForm, setTeamForm] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: '',
    bio: '',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  });

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newStandard, setNewStandard] = useState('29 CFR 1926');
  const [newPrice, setNewPrice] = useState(249);
  const [newCategory, setNewCategory] = useState('High Risk Compliance');

  // SOS Team State (Real Shining On Safety Organizational Structure from Website)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'tm-1',
      name: 'Victor Galván',
      role: 'CEO',
      bio: 'Executive leadership directing strategic growth, OSHA partnerships, and safety compliance programs across Texas and national markets.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-2',
      name: 'Alexander',
      role: 'Marketing coordinator',
      bio: 'Coordinates contractor outreach, digital campaigns, and community engagement for safety university programs.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-3',
      name: 'Sophia Galvan',
      role: 'Content creator',
      bio: 'Produces educational multimedia, compliance video modules, and bilingual social media safety advisories.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-4',
      name: 'Valerie Diaz',
      role: 'Marketing Director',
      bio: 'Leads brand strategy, enterprise contractor partnerships, and commercial outreach for OSHA accredited curriculums.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-5',
      name: 'Ernesto',
      role: 'Data & Safety Coordinator',
      bio: 'Oversees safety audit data, compliance tracking, QR certificate validations, and jobsite hazard analysis.',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'tm-6',
      name: 'Stephanie Alvarez',
      role: 'Operations and execution director',
      bio: 'Directs day-to-day operations, field logistics, contractor corporate retainers, and quality assurance workflows.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  // Coupons / Promo Codes State
  const [coupons, setCoupons] = useState([
    { code: 'APEX15', discount: '15% Off', type: 'Contractor Partner', uses: '42 used', active: true },
    { code: 'OSHA2026', discount: '$50 Off', type: 'Summer Promo', uses: '118 used', active: true },
    { code: 'BULKCREW', discount: '20% Off', type: '10+ Seats', uses: '19 used', active: true },
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('10% Off');

  // Physical DOL Wallet Card Fulfillment Queue
  const [shipments, setShipments] = useState([
    { id: 'ORD-8941', student: 'Carlos Mendez', employer: 'Apex Builders Group', item: 'Laminated Wallet Card + Hardhat Decal', status: 'Shipped (USPS 9400111899223)', date: 'Today' },
    { id: 'ORD-8942', student: 'David Ramirez', employer: 'Horizon Commercial', item: 'Laminated Wallet Card + Hardhat Decal', status: 'Pending Print & Packing', date: 'Yesterday' },
    { id: 'ORD-8943', student: 'Jorge Gutierrez', employer: 'Matrix Industrial', item: 'Laminated Wallet Card + Hardhat Decal', status: 'Pending Print & Packing', date: '08/30/2026' },
  ]);

  // Mock Certified Students
  const [students] = useState([
    { id: 'SOS-2026-89412', name: 'Carlos Mendez', course: 'OSHA Fall Protection 29 CFR 1926', date: '08/24/2026', grade: '98%', status: 'Active Verified', employer: 'Apex Builders Group' },
    { id: 'SOS-2026-89413', name: 'David Ramirez', course: 'Scaffolding Competent Person', date: '08/19/2026', grade: '92%', status: 'Active Verified', employer: 'Horizon Commercial' },
    { id: 'SOS-2026-89414', name: 'Jorge Gutierrez', course: 'OSHA 10 Construction', date: '08/12/2026', grade: '88%', status: 'Active Verified', employer: 'Matrix Industrial' },
    { id: 'SOS-2026-89415', name: 'Manuel Ortiz', course: 'Trenching & Excavation', date: '07/28/2026', grade: '96%', status: 'Active Verified', employer: 'Summit Contractors' },
  ]);

  if (!isOpen) return null;

  const handleSavePrice = (courseId: string) => {
    onUpdateCoursePrice(courseId, editPriceVal);
    setEditingCourseId(null);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const courseObj: Course = {
      id: `c-custom-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      titleEs: newTitle,
      category: newCategory,
      categoryEs: newCategory,
      price: Number(newPrice),
      duration: '4.0 Hours • Self-Paced',
      oshaStandard: newStandard,
      instructor: 'Victor Galván',
      instructorRole: 'CEO & Safety Director',
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 1,
      badge: 'New Program',
      badgeEs: 'Nuevo Programa',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80',
      shortDescription: 'Newly created accredited course managed directly through the SuperAdmin CMS without developer intervention.',
      shortDescriptionEs: 'Curso creado directamente desde el panel SuperAdmin CMS sin necesidad de código ni programador.',
      modules: [
        { title: 'Module 1: Safety Overview & OSHA Standards', titleEs: 'Módulo 1: Visión General y Normas OSHA', duration: '45 min', lessonsCount: 3 },
        { title: 'Module 2: Practical Application, PPE & 80% Final Exam', titleEs: 'Módulo 2: Aplicación Práctica, EPP y Examen Final', duration: '60 min', lessonsCount: 4 }
      ]
    };

    onAddNewCourse(courseObj);
    setShowAddModal(false);
    setNewTitle('');
  };

  const handleOpenAddTeam = () => {
    setEditingMember(null);
    setTeamForm({
      name: '',
      role: '',
      bio: '',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    });
    setShowTeamModal(true);
  };

  const handleOpenEditTeam = (member: TeamMember) => {
    setEditingMember(member);
    setTeamForm({
      name: member.name,
      role: member.role,
      bio: member.bio,
      photo: member.photo,
    });
    setShowTeamModal(true);
  };

  const handleSaveTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name) return;

    if (editingMember) {
      setTeamMembers(teamMembers.map(m => m.id === editingMember.id ? { ...m, ...teamForm } : m));
    } else {
      setTeamMembers([
        ...teamMembers,
        {
          id: `tm-${Date.now()}`,
          ...teamForm,
        }
      ]);
    }
    setShowTeamModal(false);
  };

  const handleDeleteTeamMember = (id: string) => {
    if (window.confirm(isEn ? 'Are you sure you want to remove this team member?' : '¿Está seguro de eliminar este miembro del equipo?')) {
      setTeamMembers(teamMembers.filter(m => m.id !== id));
    }
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    setCoupons([
      ...coupons,
      { code: newCouponCode.toUpperCase(), discount: newCouponDiscount, type: 'Custom Partner', uses: '0 used', active: true }
    ]);
    setNewCouponCode('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-900 my-6 max-h-[92vh] overflow-y-auto flex flex-col justify-between">
        
        {/* Top Header */}
        <div>
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30 shrink-0">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono uppercase">
                    SuperAdmin Control Center
                  </span>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full Self-Management Active
                  </span>
                </div>
                <h3 className="text-xl font-black font-heading text-slate-950 mt-0.5">
                  {isEn ? 'SOS Central Business & Staff Management Panel' : 'Panel Central de Gestión de Equipo y Negocio SuperAdmin'}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SuperAdmin Navigation Tabs */}
          <div className="flex items-center gap-2 py-3 border-b border-slate-200 text-xs overflow-x-auto pb-2 scrollbar-none max-w-full">
            {[
              { id: 'team', label: isEn ? '👥 Team & Staff Directory' : '👥 Gestión del Equipo y Roles' },
              { id: 'courses', label: isEn ? '📚 Course & Pricing Manager' : '📚 Gestor de Cursos y Precios' },
              { id: 'fulfillment', label: isEn ? '📦 DOL Card & Shipping Queue' : '📦 Envíos de Carnets y Stickers' },
              { id: 'coupons', label: isEn ? '🏷️ Coupons & Contractor Discounts' : '🏷️ Cupones y Descuentos' },
              { id: 'credentials', label: isEn ? '🛡️ QR Student Credential Logs' : '🛡️ Registro de Alumnos y QR' },
              { id: 'finance', label: isEn ? '💳 Square Payment Settlements' : '💳 Pasarela Square y Finanzas' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: TEAM & STAFF DIRECTORY (GENERAL COMPANY TEAM MANAGEMENT) */}
          {activeTab === 'team' && (
            <div className="py-6 space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-blue-50/70 rounded-2xl border border-blue-200">
                <div>
                  <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{isEn ? 'Shining On Safety — Official Team & Staff Directory (100% Self-Service)' : 'Directorio del Equipo Oficial Shining On Safety (100% Autogestionable)'}</span>
                  </h4>
                  <p className="text-xs text-blue-800 mt-0.5">
                    {isEn
                      ? 'Easily update team member photos, roles, names, and biographies published on the website without hiring or requesting changes from a developer.'
                      : 'Actualice fotos, nombres, roles y biografías del equipo SOS publicados en el sitio web sin depender de un programador.'}
                  </p>
                </div>
                <button
                  onClick={handleOpenAddTeam}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isEn ? '+ Add Team Member' : '+ Agregar Miembro al Equipo'}</span>
                </button>
              </div>

              {/* Team Members Grid Styled Exactly Like the Real SOS Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map(member => (
                  <div key={member.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center justify-between group">
                    <div className="w-full flex flex-col items-center">
                      
                      {/* Circular Portrait Photo */}
                      <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-inner">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>

                      {/* Name */}
                      <h5 className="font-bold text-base text-slate-900 leading-tight">
                        {member.name}
                      </h5>

                      {/* Role in Blue Bold Subtitle */}
                      <span className="text-xs text-blue-600 font-bold mt-1 block">
                        {member.role}
                      </span>

                      {/* Bio */}
                      <p className="text-xs text-slate-500 mt-3 leading-relaxed text-center px-1">
                        {member.bio}
                      </p>
                    </div>

                    {/* Action Buttons: Edit & Delete */}
                    <div className="w-full pt-4 mt-4 border-t border-slate-100 flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEditTeam(member)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Edit Info & Photo' : 'Editar Datos y Foto'}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTeamMember(member.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title={isEn ? 'Delete Member' : 'Eliminar Miembro'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: COURSES & PRICING MANAGER */}
          {activeTab === 'courses' && (
            <div className="py-6 space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-blue-50/70 rounded-2xl border border-blue-200">
                <div>
                  <h4 className="font-bold text-sm text-blue-950">
                    {isEn ? 'Self-Serve Course Catalog & Live Price Tuning' : 'Autogestión de Catálogo y Precios en Vivo'}
                  </h4>
                  <p className="text-xs text-blue-800 mt-0.5">
                    {isEn
                      ? 'Modify course tuition or publish new programs instantly across the store and LMS without touching code.'
                      : 'Modifique precios o publique nuevos programas al instante sin tocar código.'}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isEn ? '+ Create New OSHA Course' : '+ Crear Nuevo Curso OSHA'}</span>
                </button>
              </div>

              {/* Course Management Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Course Title & Category</th>
                      <th className="p-3">OSHA Standard</th>
                      <th className="p-3">Current Price</th>
                      <th className="p-3">Modules & Quizzes</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {courses.map(course => (
                      <tr key={course.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">{isEn ? course.title : course.titleEs}</span>
                          <span className="text-[10px] text-slate-500">{course.category}</span>
                        </td>
                        <td className="p-3 font-mono text-blue-700 font-bold">{course.oshaStandard}</td>
                        <td className="p-3">
                          {editingCourseId === course.id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500 font-bold">$</span>
                              <input
                                type="number"
                                value={editPriceVal}
                                onChange={e => setEditPriceVal(Number(e.target.value))}
                                className="w-20 px-2 py-1 bg-white border-2 border-blue-600 rounded text-slate-900 font-black font-heading text-sm"
                              />
                            </div>
                          ) : (
                            <span className="text-sm font-black text-blue-600 font-heading">${course.price} USD</span>
                          )}
                        </td>
                        <td className="p-3 font-mono">{course.modules.length} Modules</td>
                        <td className="p-3 text-right">
                          {editingCourseId === course.id ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleSavePrice(course.id)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Save className="w-3.5 h-3.5" /> Save
                              </button>
                              <button
                                onClick={() => setEditingCourseId(null)}
                                className="px-2.5 py-1 bg-slate-200 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingCourseId(course.id);
                                setEditPriceVal(course.price);
                              }}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
                            >
                              Edit Price
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PHYSICAL DOL CARDS & STICKERS FULFILLMENT QUEUE */}
          {activeTab === 'fulfillment' && (
            <div className="py-6 space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-blue-50/70 rounded-2xl border border-blue-200">
                <div>
                  <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>{isEn ? 'DOL Wallet Card & Hardhat Decal Shipping Queue' : 'Cola de Envíos de Carnets y Stickers de Casco'}</span>
                  </h4>
                  <p className="text-xs text-blue-800 mt-0.5">
                    {isEn
                      ? 'Automated shipping queue when students complete courses requesting physical plastic cards.'
                      : 'Gestión de envíos físicos para alumnos que aprueban cursos y solicitan carnet de plástico o stickers.'}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold font-mono rounded-full text-xs">
                  {shipments.filter(s => s.status.includes('Pending')).length} Pending Shipments
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Order ID & Date</th>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Employer / GC</th>
                      <th className="p-3">Package Items</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {shipments.map(ship => (
                      <tr key={ship.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-900">{ship.id} <span className="text-[10px] text-slate-400 block font-normal">{ship.date}</span></td>
                        <td className="p-3 font-bold text-slate-800">{ship.student}</td>
                        <td className="p-3 text-slate-600">{ship.employer}</td>
                        <td className="p-3">{ship.item}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            ship.status.includes('Shipped') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ship.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              setShipments(shipments.map(s => s.id === ship.id ? { ...s, status: 'Shipped (USPS ' + Math.floor(1000000000000000000000 + Math.random() * 9000000000000000000000) + ')' } : s));
                            }}
                            className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded-lg border border-blue-200 text-[11px] cursor-pointer"
                          >
                            Mark Shipped
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COUPONS & CONTRACTOR DISCOUNTS */}
          {activeTab === 'coupons' && (
            <div className="py-6 space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-blue-50/70 rounded-2xl border border-blue-200">
                <div>
                  <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-600" />
                    <span>{isEn ? 'Promo Codes & B2B Contractor Discount Engine' : 'Motor de Cupones y Descuentos para Contratistas'}</span>
                  </h4>
                  <p className="text-xs text-blue-800 mt-0.5">
                    {isEn
                      ? 'Create instant discount codes for partner contractors, seasonal promotions, or bulk team enrollments.'
                      : 'Cree códigos promocionales para contratistas aliados o descuentos por volumen sin programador.'}
                  </p>
                </div>
              </div>

              {/* Create coupon form */}
              <form onSubmit={handleCreateCoupon} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  placeholder="CODE (e.g. SUMMER2026)"
                  value={newCouponCode}
                  onChange={e => setNewCouponCode(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono uppercase font-bold text-slate-900 w-full sm:w-48"
                />
                <input
                  type="text"
                  placeholder="Discount (e.g. 20% Off or $30 Off)"
                  value={newCouponDiscount}
                  onChange={e => setNewCouponDiscount(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 w-full sm:w-48"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Coupon</span>
                </button>
              </form>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Coupon Code</th>
                      <th className="p-3">Discount Value</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Redemption Uses</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {coupons.map(cp => (
                      <tr key={cp.code} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-black text-blue-700 text-sm">{cp.code}</td>
                        <td className="p-3 font-bold text-emerald-700">{cp.discount}</td>
                        <td className="p-3 text-slate-600">{cp.type}</td>
                        <td className="p-3 font-mono text-slate-700">{cp.uses}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: STUDENT CREDENTIALS & QR AUDIT LOGS */}
          {activeTab === 'credentials' && (
            <div className="py-6 space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-blue-50/70 rounded-2xl border border-blue-200">
                <div>
                  <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>{isEn ? 'Student Certification Registry & 24/7 QR Verification Logs' : 'Registro de Alumnos Certificados y Validación QR'}</span>
                  </h4>
                  <p className="text-xs text-blue-800 mt-0.5">
                    {isEn
                      ? 'Live database of all completed student certificates, grades, and employers with public QR tokens.'
                      : 'Registro de estudiantes aprobados con calificación y código QR verificable en obra.'}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Certificate ID</th>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Employer</th>
                      <th className="p-3">Course Completed</th>
                      <th className="p-3">Grade</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {students.map(std => (
                      <tr key={std.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-blue-700">{std.id} <span className="text-[10px] text-slate-400 block font-normal">{std.date}</span></td>
                        <td className="p-3 font-bold text-slate-800">{std.name}</td>
                        <td className="p-3 text-slate-600">{std.employer}</td>
                        <td className="p-3 font-medium text-slate-800">{std.course}</td>
                        <td className="p-3 font-mono font-bold text-emerald-700">{std.grade}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {std.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => alert(`Re-sending PDF certificate and wallet card tracking for ${std.name}`)}
                            className="text-blue-600 hover:text-blue-800 font-bold underline text-[11px] cursor-pointer"
                          >
                            Resend Card
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SQUARE PAYMENTS & FINANCIAL SETTLEMENTS */}
          {activeTab === 'finance' && (
            <div className="py-6 space-y-6 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">LMS Course Tuitions (Month)</span>
                  <p className="text-2xl font-black text-slate-950 font-heading">$18,450 USD</p>
                  <span className="text-[10px] text-emerald-600 font-bold">74 Course Enrollments</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">B2B Corporate Retainers</span>
                  <p className="text-2xl font-black text-blue-600 font-heading">$120,000 USD</p>
                  <span className="text-[10px] text-blue-700 font-bold">Active Annual Contracts</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Square API Settlement Status</span>
                  <p className="text-2xl font-black text-emerald-600 font-heading">Auto-Daily</p>
                  <span className="text-[10px] text-slate-500 font-mono">Location: L680NKX2KGZT5</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal: Add or Edit Team Member */}
        {showTeamModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 max-w-lg w-full text-slate-900">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-slate-950 font-heading">
                  {editingMember 
                    ? (isEn ? 'Edit Team Member Profile' : 'Editar Perfil de Miembro del Equipo')
                    : (isEn ? 'Add New Team Member' : 'Agregar Nuevo Miembro al Equipo')
                  }
                </h4>
                <button
                  onClick={() => setShowTeamModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTeamMember} className="space-y-4 text-xs">
                
                {/* Photo Preview & URL */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 border-2 border-slate-300 shrink-0">
                    <img
                      src={teamForm.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                      alt="Preview"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-bold text-slate-700 mb-1">
                      {isEn ? 'Portrait Photo URL (Circular Headshot)' : 'URL de Foto de Retrato (Avatar Circular)'}
                    </label>
                    <input
                      type="text"
                      value={teamForm.photo}
                      onChange={e => setTeamForm({ ...teamForm, photo: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isEn ? 'Full Name' : 'Nombre Completo'}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Victor Galván"
                      value={teamForm.name}
                      onChange={e => setTeamForm({ ...teamForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {isEn ? 'Role / Position' : 'Rol / Cargo'}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Marketing Director"
                      value={teamForm.role}
                      onChange={e => setTeamForm({ ...teamForm, role: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-blue-700 font-bold"
                    />
                  </div>
                </div>



                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isEn ? 'Short Biography / Profile Description' : 'Biografía Breve o Descripción'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief background and responsibilities..."
                    value={teamForm.bio}
                    onChange={e => setTeamForm({ ...teamForm, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTeamModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                  >
                    {isEn ? 'Cancel' : 'Cancelar'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs cursor-pointer"
                  >
                    {editingMember 
                      ? (isEn ? 'Save Changes' : 'Guardar Cambios')
                      : (isEn ? 'Add Member' : 'Agregar Miembro')
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add New Course */}
        {showAddModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 max-w-lg w-full text-slate-900">
              <h4 className="text-base font-bold text-slate-950 mb-4 font-heading">
                {isEn ? 'Create New Accredited OSHA Course' : 'Crear Nuevo Curso Acreditado OSHA'}
              </h4>

              <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Title</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Confined Space Entry & Rescue 29 CFR 1910.146"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">OSHA Standard Code</label>
                    <input
                      type="text"
                      placeholder="e.g. 29 CFR 1926.501"
                      value={newStandard}
                      onChange={e => setNewStandard(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tuition Price ($ USD)</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={e => setNewPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900"
                  >
                    <option value="High Risk Compliance">High Risk Compliance</option>
                    <option value="Jobsite Safety">Jobsite Safety</option>
                    <option value="Supervision & Competent Person">Supervision & Competent Person</option>
                    <option value="General Safety">General Safety</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs cursor-pointer"
                  >
                    Publish Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
