'use client';

import React, { useEffect, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subTitle?: string;
  hideCloseButton?: boolean;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subTitle,
  hideCloseButton = false,
  children,
  maxWidth = 'max-w-lg',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-neutral-charcoal/60 backdrop-blur-sm transition-opacity"
      />

      {/* Dialog */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={`relative w-full ${maxWidth} bg-neutral-warmWhite rounded-card border border-neutral-lightClay shadow-elevation2 p-6 sm:p-8 z-10`}
      >
        <div className="flex items-start justify-between pb-4 mb-4 border-b border-surface-divider">
          <div className="min-w-0 pr-3">
            {title && (
              <h3 id="modal-title" className="font-serif text-2xl font-bold text-neutral-charcoal">
                {title}
              </h3>
            )}
            {subTitle && (
              <p className="font-sans text-sm text-neutral-clayGray mt-1">
                {subTitle}
              </p>
            )}
          </div>
          {!hideCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 shrink-0 rounded-full bg-neutral-softCream hover:bg-clay/10 text-neutral-charcoal hover:text-clay flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focusRing"
            >
              ✕
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
