'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface LikeButtonProps {
  slug: string;
  initialLikes?: number;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ slug, initialLikes = 0, className = '' }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check local storage on mount
    const likedNotes = JSON.parse(localStorage.getItem('likedNotes') || '{}');
    if (likedNotes[slug]) {
      setIsLiked(true);
    }
  }, [slug]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const likedNotes = JSON.parse(localStorage.getItem('likedNotes') || '{}');
    const currentlyLiked = !!likedNotes[slug];

    // Optimistic update
    if (currentlyLiked) {
      setLikes(prev => Math.max(0, prev - 1));
      setIsLiked(false);
      delete likedNotes[slug];
      setIsAnimating(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      likedNotes[slug] = true;
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300); // trigger scale pop animation
    }
    localStorage.setItem('likedNotes', JSON.stringify(likedNotes));

    try {
      await fetch('/api/like-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, action: currentlyLiked ? 'unlike' : 'like' }),
      });
    } catch (err) {
      console.error('Failed to sync like status', err);
    }
  };

  return (
    <button
      onClick={handleLike}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex items-center gap-1.5 focus:outline-none transition-opacity ${className}`}
      aria-label={isLiked ? "Unlike note" : "Like note"}
    >
      <div className={`relative w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${isAnimating ? 'scale-125' : (isHovered && !isLiked ? 'scale-110' : 'scale-100')}`}>
        {isLiked || isHovered ? (
          <Image src="/icons/heart-filled.svg" alt="" fill className="object-contain" />
        ) : (
          <Image src="/icons/heart-outline.svg" alt="" fill className="object-contain" />
        )}
      </div>
      <span className={`text-[13px] sm:text-[14px] font-medium transition-colors ${isLiked ? 'text-[#8B3A2A] dark:text-[#F4A11A]' : 'text-neutral-clayGray hover:text-neutral-charcoal dark:text-rn-text-secondary dark:hover:text-rn-text-primary'}`}>
        {likes > 0 ? likes : ''}
      </span>
    </button>
  );
};
