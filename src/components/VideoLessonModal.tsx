import React, { useState } from 'react';
import { X, Play, Pause, BookOpen, Volume2, Maximize, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface VideoLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  lang: 'en' | 'es';
}

export const VideoLessonModal: React.FC<VideoLessonModalProps> = ({
  isOpen,
  onClose,
  courseTitle,
  lang,
}) => {
  if (!isOpen) return null;
  const isEn = lang === 'en';
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(38);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white truncate max-w-md">
              {courseTitle || 'OSHA Fall Protection Lesson 01: Hazard Recognition'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Mockup */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <SafeImage
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80"
            alt="Video lesson"
            type="video"
            title={courseTitle || 'OSHA University Classroom Stream'}
            className="w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40">
            {/* Top info */}
            <div className="flex items-center justify-between text-xs text-white">
              <span className="px-2.5 py-1 bg-blue-600 text-white font-bold rounded font-mono shadow-xs">
                OSHA Standard 29 CFR 1926
              </span>
              <span className="text-slate-300 font-mono text-[11px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                HD 1080p • 60 FPS • Frame.io S3 Stream
              </span>
            </div>

            {/* Center Play/Pause Button */}
            <div className="self-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl shadow-blue-600/50 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-white" />
                ) : (
                  <Play className="w-8 h-8 fill-white ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="space-y-2">
              <div 
                className="w-full bg-slate-800 hover:bg-slate-700 rounded-full h-2 overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPos = (e.clientX - rect.left) / rect.width;
                  setProgress(Math.round(clickPos * 100));
                }}
              >
                <div className="bg-blue-500 h-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sky-400 font-bold">04:15 / 12:40</span>
                  <Volume2 className="w-4 h-4 cursor-pointer hover:text-white" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] px-2 py-0.5 bg-slate-800 rounded font-mono font-bold">1.0x Speed</span>
                  <Maximize className="w-4 h-4 cursor-pointer hover:text-white" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Course Progress & Next Up */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>Next: <strong>Module 02 — PFAS Anchorage Systems & Lanyards</strong></span>
          </div>
          <button
            onClick={() => alert('Advancing to Module 02 Quiz & Knowledge Assessment...')}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
          >
            {isEn ? 'Next Lesson & Module Quiz →' : 'Siguiente Lección y Cuestionario →'}
          </button>
        </div>

      </div>
    </div>
  );
};
