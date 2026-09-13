"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';

const socialLinks = [
  { icon: 'instagram', href: SITE_CONFIG.links.instagram, label: 'Instagram' },
  { icon: 'tiktok', href: SITE_CONFIG.links.tiktok, label: 'TikTok' },
  { icon: 'x', href: SITE_CONFIG.links.x, label: 'X (Twitter)' },
  { icon: 'linkedin', href: SITE_CONFIG.links.linkedin, label: 'LinkedIn' },
  { icon: 'facebook', href: SITE_CONFIG.links.facebook, label: 'Facebook' },
] as const;

export const Footer: React.FC = () => {
  const [lagosTime, setLagosTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Lagos',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });
        setLagosTime(formatter.format(new Date()));
      } catch (e) {
        setLagosTime('');
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#1E1B18] px-0 pb-0 pt-20 sm:pt-32 font-sans text-[#FFFEFA] overflow-hidden border-t border-white/5">
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, 
          opacity: 0.04 
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-12 min-[1200px]:px-0">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 lg:gap-12 pb-20">
          
          {/* Left Side: Quote, Description, CTA */}
          <div className="w-full lg:w-[50%] flex flex-col items-start pt-8">
            
            <blockquote className="font-serif text-[40px] sm:text-[52px] lg:text-[60px] font-normal leading-[1.05] text-[#FFFEFA] tracking-tight mb-8">
              Good food is<br />
              <span className="text-[#D79A8A] italic font-medium">worth the wait.</span>
            </blockquote>
            
            <p className="font-sans text-[14px] leading-relaxed text-[#F7F3ED]/50 mb-14 max-w-sm">
              Thanks for being early.<br />
              We&apos;re still finding our recipe, and that&apos;s okay.
            </p>
            
            <a
              href={SITE_CONFIG.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-[14px] font-bold text-[#FFFEFA] transition-all duration-300 hover:text-[#8B3A2A]"
            >
              Join the Reelnosh community
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/30 group-hover:border-[#8B3A2A] transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </a>
          </div>

          {/* Right Side: Menus & Contact */}
          <div className="w-full lg:w-[45%] flex flex-col sm:flex-row gap-16 sm:gap-24 pt-4 lg:pl-10">
            
            {/* Column 1: The Ingredients */}
            <div className="flex flex-col">
              <h3 className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-[#F7F3ED] mb-8">
                The Ingredients
              </h3>
              <nav className="flex flex-col gap-5">
                <Link href="/terms" className="relative w-fit text-[14px] text-[#F7F3ED]/70 hover:text-[#F6D3A0] transition-colors duration-300 group">
                  Terms of Service
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F6D3A0] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/privacy" className="relative w-fit text-[14px] text-[#F7F3ED]/70 hover:text-[#F6D3A0] transition-colors duration-300 group">
                  Privacy Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F6D3A0] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/cookies" className="relative w-fit text-[14px] text-[#F7F3ED]/70 hover:text-[#F6D3A0] transition-colors duration-300 group">
                  Cookie Policy
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F6D3A0] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </nav>
            </div>

            {/* Column 2: Contact (Say Hello) */}
            <div className="flex flex-col">
              <h3 className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-[#F7F3ED] mb-8">
                Say hello
              </h3>
              
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-serif text-[20px] sm:text-[24px] text-[#FFFEFA] border-b border-white/20 pb-2 mb-6 inline-block hover:border-white transition-colors whitespace-nowrap">
                {SITE_CONFIG.email}
              </a>
              
              <address className="not-italic text-[13px] text-[#F7F3ED]/50 leading-[1.8] mb-10 flex flex-col gap-1">
                <span>{SITE_CONFIG.location}</span>
                {lagosTime && (
                  <span className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D79A8A] animate-pulse"></span>
                    {lagosTime}
                  </span>
                )}
              </address>

              {/* Socials */}
              <div className="flex items-center gap-4">
                {socialLinks.map(({ icon, href, label }) => (
                  <a key={icon} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 shrink-0">
                    <div className="w-[14px] h-[14px] relative flex items-center justify-center">
                      <Image src={`/icons/${icon}.svg`} alt="" fill className="object-contain brightness-0 invert opacity-70" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
      
      {/* Bottom Section (Giant Logo Spreading Full Screen) */}
      <div className="relative z-10 w-full pt-12 pb-4 flex flex-col items-center mt-auto">
        {/* Giant Logo */}
        <div 
          className="relative w-full h-[150px] sm:h-[250px] lg:h-[350px] opacity-[0.15] pointer-events-none select-none"
          style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)' }}
        >
          <Image src="/brand/logo-white.svg" alt="Reelnosh" fill className="object-cover object-top" priority />
        </div>

        {/* Copyright */}
        <div className="absolute bottom-4 sm:bottom-6 w-full text-center text-[11px] text-[#F7F3ED]/30 uppercase tracking-[2px] font-medium pointer-events-none">
           &copy; {new Date().getFullYear()} Reelnosh. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
