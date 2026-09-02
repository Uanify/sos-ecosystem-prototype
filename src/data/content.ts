export interface Course {
  id: string;
  slug: string;
  title: string;
  titleEs: string;
  category: string;
  categoryEs: string;
  price: number;
  originalPrice?: number;
  duration: string;
  oshaStandard: string;
  instructor: string;
  instructorRole: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  badge?: string;
  badgeEs?: string;
  image: string;
  shortDescription: string;
  shortDescriptionEs: string;
  modules: {
    title: string;
    titleEs: string;
    duration: string;
    lessonsCount: number;
  }[];
}

export interface Product {
  id: string;
  name: string;
  nameEs: string;
  category: string;
  categoryEs: string;
  price: number;
  sku: string;
  image: string;
  rating: number;
  inStock: boolean;
  highlight?: string;
  highlightEs?: string;
}

export interface CorporateTier {
  id: string;
  name: string;
  nameEs: string;
  tierTag: string;
  annualPrice: number;
  monthlyPrice: number;
  employeeRange: string;
  employeeRangeEs: string;
  color: string;
  accentBorder: string;
  features: string[];
  featuresEs: string[];
  popular?: boolean;
}

export const COURSES_DATA: Course[] = [
  {
    id: "c1",
    slug: "fall-protection-awareness",
    title: "OSHA Fall Protection & Working at Heights",
    titleEs: "Protección Contra Caídas OSHA y Trabajo en Alturas",
    category: "High Risk Compliance",
    categoryEs: "Cumplimiento de Alto Riesgo",
    price: 249,
    originalPrice: 299,
    duration: "4.5 Hours • Self-Paced",
    oshaStandard: "29 CFR 1926 Subpart M",
    instructor: "Sarah Jenkins, CSP",
    instructorRole: "Lead OSHA Safety Specialist & Authorized Trainer",
    rating: 4.95,
    reviewsCount: 342,
    studentsCount: 2840,
    badge: "Top Seller",
    badgeEs: "Más Vendido",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Comprehensive training on fall hazard recognition, anchor points, personal fall arrest systems (PFAS), and OSHA jobsite rescue protocols.",
    shortDescriptionEs: "Capacitación integral en reconocimiento de peligros de caída, puntos de anclaje, sistemas de detención (PFAS) y protocolos de rescate.",
    modules: [
      { title: "Introduction to OSHA Subpart M Standards", titleEs: "Introducción a Normas OSHA Subparte M", duration: "45 min", lessonsCount: 4 },
      { title: "Personal Fall Arrest Systems (Harnesses & Lanyards)", titleEs: "Sistemas de Detención de Caídas (Arneses y Líneas)", duration: "60 min", lessonsCount: 5 },
      { title: "Guardrails, Safety Nets & Floor Openings", titleEs: "Barandillas, Redes de Seguridad y Aberturas", duration: "50 min", lessonsCount: 4 },
      { title: "Rescue Planning, Inspection & Practical Exam", titleEs: "Planificación de Rescate, Inspección y Examen Final", duration: "75 min", lessonsCount: 6 }
    ]
  },
  {
    id: "c2",
    slug: "scaffolding-safety-competent-person",
    title: "Scaffolding Safety & Competent Person Inspector",
    titleEs: "Seguridad en Andamios y Persona Competente",
    category: "Site Supervision",
    categoryEs: "Supervisión en Sitio",
    price: 289,
    duration: "5.0 Hours • Self-Paced",
    oshaStandard: "29 CFR 1926 Subpart L",
    instructor: "Marcus Vance, CHST",
    instructorRole: "Operations & Safety Field Director",
    rating: 4.91,
    reviewsCount: 218,
    studentsCount: 1650,
    badge: "B2B Essential",
    badgeEs: "Esencial B2B",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Master scaffold erection, daily inspection protocols, capacity calculations, and hazard elimination for construction managers.",
    shortDescriptionEs: "Domine montaje de andamios, protocolos de inspección diaria, cálculo de cargas y eliminación de riesgos para supervisores.",
    modules: [
      { title: "Scaffold Types, Components & Base Plates", titleEs: "Tipos de Andamios, Componentes y Placas Base", duration: "60 min", lessonsCount: 5 },
      { title: "Load Capacities & Tie-In Guidelines", titleEs: "Capacidades de Carga y Pautas de Amarre", duration: "55 min", lessonsCount: 4 },
      { title: "Daily Pre-Shift Inspection Checklist", titleEs: "Lista de Verificación de Inspección Previa", duration: "65 min", lessonsCount: 6 },
      { title: "Competent Person Certification Exam", titleEs: "Examen de Certificación de Persona Competente", duration: "60 min", lessonsCount: 4 }
    ]
  },
  {
    id: "c3",
    slug: "osha-10-hour-construction",
    title: "OSHA 10-Hour General Construction Outreach",
    titleEs: "OSHA 10 Horas Construcción General",
    category: "Foundation Certification",
    categoryEs: "Certificación Base",
    price: 189,
    originalPrice: 220,
    duration: "10.0 Hours • Official Curriculum",
    oshaStandard: "OSHA 29 CFR 1926",
    instructor: "Sarah Jenkins, CSP",
    instructorRole: "Lead OSHA Safety Specialist",
    rating: 4.98,
    reviewsCount: 890,
    studentsCount: 5400,
    badge: "Official DOL Card",
    badgeEs: "Tarjeta Oficial DOL",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    shortDescription: "The mandatory baseline safety course for entry-level and experienced construction workers. Includes official completion documentation.",
    shortDescriptionEs: "Curso obligatorio fundamental de seguridad para trabajadores de construcción. Incluye documentación oficial.",
    modules: [
      { title: "OSHA Focus Four: Falls, Struck-By, Caught-In, Electrocution", titleEs: "Los Cuatro Focos OSHA: Caídas, Golpes, Atrapamientos, Electrocución", duration: "180 min", lessonsCount: 12 },
      { title: "Personal Protective Equipment (PPE)", titleEs: "Equipo de Protección Personal (EPP)", duration: "60 min", lessonsCount: 5 },
      { title: "Health Hazards & Hazard Communication (GHS)", titleEs: "Peligros a la Salud y Comunicación de Riesgos (GHS)", duration: "120 min", lessonsCount: 8 },
      { title: "Excavations, Ladders & Final Assessment", titleEs: "Excavaciones, Escaleras y Evaluación Final", duration: "120 min", lessonsCount: 10 }
    ]
  },
  {
    id: "c4",
    slug: "hazard-communication-ghs",
    title: "Hazard Communication & GHS Chemical Safety",
    titleEs: "Comunicación de Peligros y Seguridad Química GHS",
    category: "Workplace Health",
    categoryEs: "Salud Ocupacional",
    price: 149,
    duration: "2.5 Hours • Self-Paced",
    oshaStandard: "29 CFR 1910.1200",
    instructor: "Marcus Vance, CHST",
    instructorRole: "Operations & Safety Field Director",
    rating: 4.88,
    reviewsCount: 164,
    studentsCount: 1200,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Understanding Safety Data Sheets (SDS), container pictograms, mandatory chemical labeling, and employee right-to-know regulations.",
    shortDescriptionEs: "Comprensión de Hojas de Datos (SDS), pictogramas, etiquetado obligatorio y derecho a saber de los trabajadores.",
    modules: [
      { title: "GHS System Overview & Pictograms", titleEs: "Resumen del Sistema GHS y Pictogramas", duration: "45 min", lessonsCount: 4 },
      { title: "16-Section Safety Data Sheets (SDS) Decoding", titleEs: "Decodificación de SDS en 16 Secciones", duration: "50 min", lessonsCount: 4 },
      { title: "Chemical Storage, Spill Control & Exam", titleEs: "Almacenamiento, Control de Derrames y Examen", duration: "55 min", lessonsCount: 5 }
    ]
  },
  {
    id: "c5",
    slug: "trenching-excavation-safety",
    title: "Trenching & Excavation Competent Person",
    titleEs: "Excavaciones y Zanjas: Persona Competente",
    category: "High Risk Compliance",
    categoryEs: "Cumplimiento de Alto Riesgo",
    price: 279,
    duration: "4.0 Hours • Self-Paced",
    oshaStandard: "29 CFR 1926 Subpart P",
    instructor: "Sarah Jenkins, CSP",
    instructorRole: "Lead OSHA Safety Specialist",
    rating: 4.96,
    reviewsCount: 198,
    studentsCount: 1420,
    image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Soil classification, protective shielding/shoring systems, atmospheric testing, and daily hazard evaluations for trenching operations.",
    shortDescriptionEs: "Clasificación de suelos, sistemas de blindaje/apuntalamiento, pruebas atmosféricas y evaluación de riesgos en zanjas.",
    modules: [
      { title: "Soil Mechanics & Type A, B, C Classification", titleEs: "Mecánica de Suelos y Clasificación Tipos A, B, C", duration: "60 min", lessonsCount: 5 },
      { title: "Sloping, Shoring & Shielding Engineering", titleEs: "Ingeniería de Taludes, Apuntalamiento y Cajas", duration: "65 min", lessonsCount: 5 },
      { title: "Hazardous Atmospheres & Emergency Egress", titleEs: "Atmósferas Peligrosas y Vías de Evacuación", duration: "50 min", lessonsCount: 4 },
      { title: "Daily Jobsite Excavation Assessment", titleEs: "Evaluación Diaria de Excavación en Obra", duration: "65 min", lessonsCount: 5 }
    ]
  },
  {
    id: "c6",
    slug: "confined-space-entry-construction",
    title: "Confined Space Entry & Permit-Required Protocols",
    titleEs: "Espacios Confinados y Protocolos con Permiso Requerido",
    category: "Specialized Safety",
    categoryEs: "Seguridad Especializada",
    price: 319,
    duration: "5.5 Hours • Self-Paced",
    oshaStandard: "29 CFR 1926 Subpart AA",
    instructor: "Marcus Vance, CHST",
    instructorRole: "Operations & Safety Field Director",
    rating: 4.94,
    reviewsCount: 175,
    studentsCount: 1180,
    badge: "Premium Course",
    badgeEs: "Curso Premium",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Identification of permit-required confined spaces, atmospheric testing meters, entrant/attendant roles, and non-entry rescue systems.",
    shortDescriptionEs: "Identificación de espacios con permiso, detectores de gases, roles de entrante/vigía y rescate sin entrada.",
    modules: [
      { title: "Permit vs Non-Permit Confined Spaces", titleEs: "Espacios con Permiso vs Sin Permiso", duration: "60 min", lessonsCount: 5 },
      { title: "Gas Detection Meters & Calibration", titleEs: "Detectores de Gas y Calibración", duration: "70 min", lessonsCount: 6 },
      { title: "Duties of Entrant, Attendant & Entry Supervisor", titleEs: "Deberes del Entrante, Vigía y Supervisor", duration: "60 min", lessonsCount: 5 },
      { title: "Emergency Retrieval Systems & Certification Exam", titleEs: "Sistemas de Rescate y Examen Final", duration: "80 min", lessonsCount: 6 }
    ]
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "p1",
    name: "OSHA Full-Body 5-Point Safety Harness",
    nameEs: "Arnés de Seguridad de 5 Puntos Certificado OSHA",
    category: "Fall Protection",
    categoryEs: "Protección Contra Caídas",
    price: 145,
    sku: "SOS-HARN-01",
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    inStock: true,
    highlight: "Pairs with Fall Protection Course (-15% bundle)",
    highlightEs: "Combina con Curso de Caídas (-15% descuento)"
  },
  {
    id: "p2",
    name: "ANSI Type II High-Impact Vented Safety Helmet",
    nameEs: "Casco de Seguridad de Alto Impacto ANSI Tipo II",
    category: "Head Protection",
    categoryEs: "Protección de Cabeza",
    price: 65,
    sku: "SOS-HELM-02",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
    rating: 4.85,
    inStock: true,
    highlight: "OSHA Compliant Chin Strap",
    highlightEs: "Con Barbiquejo Norma OSHA"
  },
  {
    id: "p3",
    name: "6-Foot Shock-Absorbing Double Lanyard",
    nameEs: "Línea de Vida Doble con Absorbedor de Impacto 6ft",
    category: "Fall Protection",
    categoryEs: "Protección Contra Caídas",
    price: 58,
    sku: "SOS-LANY-03",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=600&q=80",
    rating: 4.92,
    inStock: true
  },
  {
    id: "p4",
    name: "ANSI Class 3 High-Visibility Reflective Vest",
    nameEs: "Chaleco Reflectante de Alta Visibilidad ANSI Clase 3",
    category: "Apparel & PPE",
    categoryEs: "Ropa y EPP",
    price: 35,
    sku: "SOS-VEST-04",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    rating: 4.79,
    inStock: true
  }
];

export const CORPORATE_TIERS: CorporateTier[] = [
  {
    id: "tier-bronze",
    name: "BRONZE Compliance Program",
    nameEs: "Programa BRONZE de Cumplimiento",
    tierTag: "🥉 BRONZE",
    annualPrice: 27000,
    monthlyPrice: 2250,
    employeeRange: "1–5 Employees",
    employeeRangeEs: "1–5 Empleados",
    color: "from-blue-900/10 to-slate-50",
    accentBorder: "border-blue-300 hover:border-blue-500",
    features: [
      "1–5 Employee Certifications & 3 Online Safety Courses",
      "1 On-Site Jobsite Safety Audit per Year",
      "1 Safety Leadership & Supervisor Workshop",
      "Custom Safety Manual Creation for your trade",
      "1 Heavy Equipment Operator Certification"
    ],
    featuresEs: [
      "1–5 Certificaciones y 3 Cursos de Seguridad Online",
      "1 Auditoría de Seguridad en Obra por Año",
      "1 Taller de Liderazgo y Supervisores",
      "Creación de Manual de Seguridad Personalizado",
      "1 Certificación de Operador de Equipo Pesado"
    ]
  },
  {
    id: "tier-silver",
    name: "SILVER Workforce Safety",
    nameEs: "Programa SILVER de Seguridad Laboral",
    tierTag: "🥈 SILVER",
    annualPrice: 48000,
    monthlyPrice: 4000,
    employeeRange: "5–10 Employees",
    employeeRangeEs: "5–10 Empleados",
    color: "from-blue-900/15 to-blue-50/50",
    accentBorder: "border-blue-400 hover:border-blue-600",
    popular: true,
    features: [
      "5–10 Employee Certifications & ALL Online Awareness Courses",
      "2 On-Site Jobsite Safety Audits per Year",
      "2 Safety Leadership Workshops for Foremen",
      "2 Heavy Equipment Operator Certifications",
      "Dedicated Safety Compliance Phone Support"
    ],
    featuresEs: [
      "5–10 Certificaciones y TODOS los Cursos Online",
      "2 Auditorías de Seguridad en Obra al Año",
      "2 Talleres de Liderazgo para Mayordomos",
      "2 Certificaciones de Operador de Equipo",
      "Soporte Telefónico Dedicado en Cumplimiento"
    ]
  },
  {
    id: "tier-gold",
    name: "GOLD Safety Management",
    nameEs: "Programa GOLD de Gestión de Seguridad",
    tierTag: "🥇 GOLD",
    annualPrice: 84000,
    monthlyPrice: 7000,
    employeeRange: "10–25 Employees",
    employeeRangeEs: "10–25 Empleados",
    color: "from-blue-900/20 to-blue-50",
    accentBorder: "border-blue-500 hover:border-blue-700",
    features: [
      "10–25 Employee Certifications & ALL Awareness Courses",
      "3 Comprehensive Jobsite Safety Audits per Year",
      "3 Safety Leadership & Risk Mitigation Workshops",
      "4 Heavy Equipment Operator Certifications",
      "2 Mock OSHA Inspection Preps & Penalty Shield Audits"
    ],
    featuresEs: [
      "10–25 Certificaciones y TODOS los Cursos Online",
      "3 Auditorías Integrales en Obra al Año",
      "3 Talleres de Liderazgo y Mitigación de Riesgos",
      "4 Certificaciones de Operador de Equipo",
      "2 Simulacros de Inspección OSHA y Blindaje contra Multas"
    ]
  },
  {
    id: "tier-diamond",
    name: "DIAMOND Enterprise Partnership",
    nameEs: "Alianza DIAMOND Empresarial",
    tierTag: "💎 DIAMOND",
    annualPrice: 160000,
    monthlyPrice: 12500,
    employeeRange: "Unlimited Employees (Enterprise)",
    employeeRangeEs: "Empleados Ilimitados (Empresarial)",
    color: "from-blue-950/25 to-sky-50",
    accentBorder: "border-blue-600 hover:border-sky-500",
    features: [
      "UNLIMITED Employee Certifications & Online Awareness Training",
      "UNLIMITED On-Site Jobsite Safety Audits on Demand",
      "UNLIMITED Safety Leadership Workshops & Toolbox Talks",
      "UNLIMITED Equipment Certifications across all regional sites",
      "Dedicated Full-Time SOS Safety Director assigned to your firm",
      "Custom B2B Dashboard with Real-Time Subcontractor Verification"
    ],
    featuresEs: [
      "Certificaciones ILIMITADAS y Capacitación Online",
      "Auditorías en Obra ILIMITADAS Bajo Demanda",
      "Talleres y Charlas de Seguridad ILIMITADAS",
      "Certificaciones de Maquinaria ILIMITADAS en Todas sus Obras",
      "Director de Seguridad Dedicado de SOS Asignado a su Empresa",
      "Portal B2B con Verificación en Tiempo Real de Subcontratistas"
    ]
  }
];

export const MOCK_COMPANY_EMPLOYEES = [
  { id: "e1", name: "Carlos Mendez", role: "Site Foreman", course: "Fall Protection & Heights", status: "Certified", date: "Aug 24, 2026", daysLeft: 340, score: "98%" },
  { id: "e2", name: "David Johnson", role: "Rigger / Scaffolder", course: "Scaffolding Competent Person", status: "Certified", date: "Jul 12, 2026", daysLeft: 295, score: "94%" },
  { id: "e3", name: "Miguel Angel Reyes", role: "Excavator Operator", course: "Trenching & Excavation", status: "Expiring Soon", date: "Sep 15, 2025", daysLeft: 14, score: "92%" },
  { id: "e4", name: "Robert Taylor", role: "Apprentice Carpenter", course: "OSHA 10-Hour Construction", status: "In Progress (70%)", date: "Enrolled Aug 28", daysLeft: 0, score: "--" },
  { id: "e5", name: "Alejandro Ruiz", role: "Safety Assistant", course: "Hazard Communication (GHS)", status: "Certified", date: "Jun 04, 2026", daysLeft: 250, score: "100%" }
];
