'use client';
import React, { useState, useEffect } from 'react';

interface LikeButtonProps {
  slug: string;
  initialLikes?: number;
  className?: string;
  variant?: 'default' | 'floating';
}

export const LikeButton: React.FC<LikeButtonProps> = ({ 
  slug, 
  initialLikes = 0, 
  className = '',
  variant = 'default' 
}) => {
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

  const isFloating = variant === 'floating';
  
  // Icon colors based on variant
  const iconColor = isFloating
    ? (isLiked ? '#F4A11A' : '#FFFEFA') // Floating: Amber if liked, white if not
    : (isLiked ? '#8B3A2A' : 'currentColor'); // Default: Red if liked, current text color otherwise

  // Container styling based on variant
  const containerClass = isFloating
    ? `inline-flex items-center gap-1.5 focus:outline-none transition-opacity ${className}`
    : `inline-flex items-center gap-1.5 focus:outline-none transition-opacity ${className}`;

  // Text styling based on variant
  const textClass = isFloating
    ? `text-[13px] font-medium transition-colors ${isLiked ? 'text-[#F4A11A]' : 'text-[#FFFEFA]'}`
    : `text-[13px] sm:text-[14px] font-medium transition-colors ${isLiked ? 'text-[#8B3A2A] dark:text-[#F4A11A]' : 'text-neutral-clayGray hover:text-neutral-charcoal dark:text-rn-text-secondary dark:hover:text-rn-text-primary'}`;

  return (
    <button
      onClick={handleLike}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={containerClass}
      aria-label={isLiked ? "Unlike note" : "Like note"}
    >
      <div className={`relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${isAnimating ? 'scale-125' : (isHovered && !isLiked ? 'scale-110' : 'scale-100')}`}>
        <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {isLiked ? (
            // Filled Heart
            <path d="M30 12.75C30 21.5 17.0262 28.5825 16.4737 28.875C16.3281 28.9533 16.1654 28.9943 16 28.9943C15.8346 28.9943 15.6719 28.9533 15.5262 28.875C14.9737 28.5825 2 21.5 2 12.75C2.00232 10.6953 2.81958 8.72539 4.27248 7.27248C5.72539 5.81958 7.69528 5.00232 9.75 5C12.3312 5 14.5912 6.11 16 7.98625C17.4088 6.11 19.6688 5 22.25 5C24.3047 5.00232 26.2746 5.81958 27.7275 7.27248C29.1804 8.72539 29.9977 10.6953 30 12.75Z" fill={iconColor}/>
          ) : (
            // Outline Heart
            <path d="M22.25 5C19.6688 5 17.4088 6.11 16 7.98625C14.5912 6.11 12.3312 5 9.75 5C7.69528 5.00232 5.72539 5.81958 4.27248 7.27248C2.81958 8.72539 2.00232 10.6953 2 12.75C2 21.5 14.9737 28.5825 15.5262 28.875C15.6719 28.9533 15.8346 28.9943 16 28.9943C16.1654 28.9943 16.3281 28.9533 16.4737 28.875C17.0262 28.5825 30 21.5 30 12.75C29.9977 10.6953 29.1804 8.72539 27.7275 7.27248C26.2746 5.81958 24.3047 5.00232 22.25 5ZM16 26.85C13.7175 25.52 4 19.4612 4 12.75C4.00198 11.2256 4.60842 9.76423 5.68633 8.68633C6.76423 7.60842 8.22561 7.00198 9.75 7C12.1813 7 14.2225 8.295 15.075 10.375C15.1503 10.5584 15.2785 10.7153 15.4432 10.8257C15.6079 10.9361 15.8017 10.995 16 10.995C16.1983 10.995 16.3921 10.9361 16.5568 10.8257C16.7215 10.7153 16.8497 10.5584 16.925 10.375C17.7775 8.29125 19.8187 7 22.25 7C23.7744 7.00198 25.2358 7.60842 26.3137 8.68633C27.3916 9.76423 27.998 11.2256 28 12.75C28 19.4513 18.28 25.5188 16 26.85Z" fill={iconColor}/>
          )}
        </svg>
      </div>
      <span className={textClass}>
        {likes > 0 ? likes : ''}
      </span>
    </button>
  );
};
