'use client';
import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageLightbox } from './ImageLightbox';

interface ImageWithLightboxProps extends ImageProps {
  containerClassName?: string;
  imageClassName?: string;
  revealCropOnHover?: boolean;
  lightboxSrc?: string;
}

export const ImageWithLightbox: React.FC<ImageWithLightboxProps> = ({ 
  containerClassName = '', 
  imageClassName = '', 
  revealCropOnHover = true,
  lightboxSrc,
  src, 
  alt, 
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Preload full resolution image only on user intent (hover or touch before opening lightbox)
  const handlePreload = () => {
    if (hasError) return;
    const targetSrc = lightboxSrc || src;
    if (typeof window !== 'undefined' && typeof targetSrc === 'string' && targetSrc) {
      const img = new window.Image();
      img.src = targetSrc;
    }
  };

  return (
    <>
      <div 
        role="button"
        tabIndex={0}
        aria-label={`Enlarge image: ${alt || 'view full image'}`}
        className={`group overflow-hidden cursor-zoom-in ${
          containerClassName.includes('absolute') || containerClassName.includes('fixed') || containerClassName.includes('relative')
            ? containerClassName 
            : `relative ${containerClassName}`
        }`}
        onClick={() => !hasError && setIsOpen(true)}
        onKeyDown={(e) => {
          if (!hasError && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        onMouseEnter={handlePreload}
        onTouchStart={handlePreload}
      >
        <div className={`relative w-full h-full transition-transform duration-500 ease-out ${revealCropOnHover ? 'scale-[1.05] group-hover:scale-100' : 'group-hover:scale-[1.03]'}`}>
          {hasError ? (
            <div className="flex h-full w-full items-center justify-center bg-neutral-lightClay/20 p-4 text-center">
              <span className="font-serif text-xs text-neutral-clayGray">{alt || 'Culinary drop preview'}</span>
            </div>
          ) : (
            <Image
              src={src}
              alt={alt || "Culinary drop image"}
              className={imageClassName}
              quality={props.quality || 75}
              onError={() => setHasError(true)}
              {...props}
            />
          )}
        </div>
        
        {/* Expand Icon Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
           <div className="bg-black/40 backdrop-blur-sm p-3 rounded-full text-white scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl border border-white/10">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
               <polyline points="15 3 21 3 21 9"></polyline>
               <polyline points="9 21 3 21 3 15"></polyline>
               <line x1="21" y1="3" x2="14" y2="10"></line>
               <line x1="3" y1="21" x2="10" y2="14"></line>
             </svg>
           </div>
        </div>
      </div>

      <ImageLightbox 
        src={(lightboxSrc || src) as string} 
        alt={alt as string} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};
