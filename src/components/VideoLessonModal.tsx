import React, { useState } from 'react';
import { X, Play, CheckCircle2, BookOpen, Clock, Volume2, Maximize, RotateCcw } from 'lucide-react';

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
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Mockup */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80"
            alt="Video lesson"
            className="w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40">
            {/* Top info */}
            <div className="flex items-center justify-between text-xs text-white">
              <span className="px-2.5 py-1 bg-amber-500/90 text-slate-950 font-bold rounded font-mono">
                29 CFR 1926.501
              </span>
              <span className="text-slate-300 font-mono">HD 1080p • 60 FPS</span>
            </div>

            {/* Center Play Button */}
            <div className="self-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center hover:scale-110 transition-transform shadow-2xl shadow-amber-500/50"
              >
                <Play className="w-8 h-8 fill-slate-950 ml-1" />
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="space-y-2">
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-500 h-full w-2/5" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-amber-400">04:15 / 12:40</span>
                  <Volume2 className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] px-1.5 py-0.5 bg-slate-800 rounded">1.0x Speed</span>
                  <Maximize className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Course Progress & Next Up */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Next: <strong>Module 02 — PFAS Anchorage Systems & Lanyards</strong></span>
          </div>
          <button
            onClick={() => alert('Advancing to next training lesson...')}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
          >
            Next Lesson & Quiz →
          </button>
        </div>

      </div>
    </div>
  );
};
