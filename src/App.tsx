import React, { useState } from 'react';
import { TierSwitcherBanner, TierMode } from './components/TierSwitcherBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourseCatalog } from './components/CourseCatalog';
import { GearStore } from './components/GearStore';
import { B2BCorporatePortal } from './components/B2BCorporatePortal';
import { RiskAssessmentModal } from './components/RiskAssessmentModal';
import { QRVerificationModal } from './components/QRVerificationModal';
import { SuperAdminCMSModal } from './components/SuperAdminCMSModal';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { ProposalReferenceModal } from './components/ProposalReferenceModal';
import { VideoLessonModal } from './components/VideoLessonModal';
import { Footer } from './components/Footer';
import { Course, COURSES_DATA } from './data/content';

export function App() {
  // Global State
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [tier, setTier] = useState<TierMode>('option1');
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);

  // Cart State
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; type: 'course' | 'gear'; image: string }[]>([
    {
      id: 'c1',
      name: 'OSHA Fall Protection & Working at Heights',
      price: 249,
      type: 'course',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=600&q=80'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals State
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isProposalDocOpen, setIsProposalDocOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoTitle, setActiveVideoTitle] = useState('');

  const handleToggleLang = () => {
    setLang(prev => (prev === 'en' ? 'es' : 'en'));
  };

  const handleAddToCart = (item: { id: string; name: string; price: number; type: 'course' | 'gear'; image: string }) => {
    setCartItems(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleUpdateCoursePrice = (courseId: string, newPrice: number) => {
    setCourses(prev => prev.map(c => (c.id === courseId ? { ...c, price: newPrice } : c)));
  };

  const handleAddNewCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const handleOpenVideo = (title?: string) => {
    setActiveVideoTitle(title || 'OSHA Fall Protection Lesson 01');
    setIsVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Executive 3-Tier Switcher Top Bar */}
      <TierSwitcherBanner
        currentTier={tier}
        onSelectTier={setTier}
        lang={lang}
        onOpenProposalDoc={() => setIsProposalDocOpen(true)}
      />

      {/* 2. Unified Brand Header */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        tier={tier}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenQRVerify={() => setIsQRModalOpen(true)}
        onOpenRiskCalculator={() => setIsRiskModalOpen(true)}
      />

      {/* 3. Hero Section with Value Proposition */}
      <main className="flex-1">
        <Hero
          lang={lang}
          tier={tier}
          onOpenRiskCalculator={() => setIsRiskModalOpen(true)}
          onOpenVideoModal={() => handleOpenVideo()}
        />

        {/* 4. Certified Course Catalog ($180–$349) */}
        <CourseCatalog
          lang={lang}
          tier={tier}
          onAddToCart={handleAddToCart}
          onOpenVideoModal={handleOpenVideo}
        />

        {/* 5. Physical Safety Equipment E-Commerce Store */}
        <GearStore
          lang={lang}
          tier={tier}
          onAddToCart={handleAddToCart}
        />

        {/* 6. Corporate B2B Retainers ($27k–$160k) & Company Portal Preview */}
        <B2BCorporatePortal
          lang={lang}
          tier={tier}
        />
      </main>

      {/* 7. Comprehensive Footer */}
      <Footer lang={lang} tier={tier} />

      {/* MODALS & DRAWERS */}
      
      {/* Lead Generation Risk Assessment Modal */}
      <RiskAssessmentModal
        isOpen={isRiskModalOpen}
        onClose={() => setIsRiskModalOpen(false)}
        lang={lang}
      />

      {/* QR Certificate Verification Modal */}
      <QRVerificationModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        lang={lang}
      />

      {/* SuperAdmin CMS Self-Management Modal */}
      <SuperAdminCMSModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        lang={lang}
        courses={courses}
        onUpdateCoursePrice={handleUpdateCoursePrice}
        onAddNewCourse={handleAddNewCourse}
      />

      {/* 1-Step Optimized Checkout Drawer */}
      <CheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        lang={lang}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* In-App Proposal Document Summary Modal */}
      <ProposalReferenceModal
        isOpen={isProposalDocOpen}
        onClose={() => setIsProposalDocOpen(false)}
        lang={lang}
      />

      {/* LMS Video Lesson Player Modal */}
      <VideoLessonModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        courseTitle={activeVideoTitle}
        lang={lang}
      />

    </div>
  );
}

export default App;
