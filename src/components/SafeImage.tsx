import React, { useState } from 'react';
import { ShieldCheck, Play, HardHat, Package, Award } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  type?: 'course' | 'product' | 'video' | 'general';
  title?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  type = 'general',
  title = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 flex flex-col items-center justify-center text-center p-4 text-white relative overflow-hidden ${className}`}
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {type === 'video' ? (
          <>
            <div className="w-12 h-12 rounded-full bg-blue-600/80 border border-blue-400/40 flex items-center justify-center text-white mb-2 shadow-lg shadow-blue-600/40">
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </div>
            <span className="text-xs font-bold font-heading text-sky-200 block truncate max-w-full">
              {title || alt || 'OSHA Video Training'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5">
              Frame.io / AWS S3 Video Stream
            </span>
          </>
        ) : type === 'product' ? (
          <>
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-sky-300 mb-1.5">
              <HardHat className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white block truncate max-w-full">
              {title || alt || 'Certified Safety Equipment'}
            </span>
            <span className="text-[10px] text-sky-300 font-mono">
              Square E-Commerce Product
            </span>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-xl bg-blue-600/40 border border-blue-400/30 flex items-center justify-center text-sky-300 mb-1.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white block truncate max-w-full">
              {title || alt || 'OSHA Accredited Course'}
            </span>
            <span className="text-[10px] text-sky-300 font-mono">
              SOS Safety University Module
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};
