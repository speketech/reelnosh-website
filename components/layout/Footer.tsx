import React from 'react';
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

export const Footer: React.FC = () => (
  <footer className="bg-[#1E1B18] px-0 pb-12 pt-16 sm:pt-24 font-sans text-[#FFFEFA]">
    <div className="mx-auto max-w-[1120px] px-5 md:px-12 min-[1120px]:px-0">
      
      {/* Top Section: Quote and CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-12 pb-16 sm:pb-24 border-b border-[#6B665F]/30">
        
        {/* Left Side: Quote */}
        <div className="w-full md:w-1/2 md:pr-12">
          <blockquote className="font-serif text-[28px] sm:text-[36px] md:text-[40px] font-semibold leading-[1.25] text-[#FFFEFA]">
            &ldquo;Good food is worth the wait.<br className="hidden sm:block" /> Thanks for being early.&rdquo;
          </blockquote>
          <p className="mt-6 font-sans text-lg italic text-[#F7F3ED]/80">
            — Kudirat Ijeoma Ibeabuchi
          </p>
        </div>

        {/* Right Side: CTA */}
        <div className="w-full md:w-1/2 md:pl-12 md:border-l md:border-[#6B665F]/30 flex flex-col items-start md:items-end md:text-right">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#F4A11A] mb-4">
            A Seat at Our Table
          </h2>
          <p className="font-sans text-[17px] leading-[1.6] text-[#F7F3ED] max-w-[380px] mb-8">
            Join a growing community of creators, food lovers, and curious eaters shaping the future of food content. Be the first to taste what&apos;s next.
          </p>
          <a
            href={SITE_CONFIG.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] items-center justify-center rounded-brand bg-[#8B3A2A] px-8 font-sans text-[15px] font-semibold text-[#FFFEFA] transition-colors hover:bg-[#743022] active:bg-[#5A2418]"
          >
            Join the Reelnosh Community
          </a>
        </div>
      </div>

      {/* Middle Section: Links, Contact, Social */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-8 pt-16 sm:pt-20 pb-16 sm:pb-24">
        
        {/* The Ingredients */}
        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#F4A11A] mb-6">
            The Ingredients
          </h3>
          <nav className="flex flex-col gap-5">
            <Link href="/terms" className="text-[15px] text-[#F7F3ED] hover:text-[#FFFEFA] transition-colors font-medium">Terms of Service</Link>
            <Link href="/privacy" className="text-[15px] text-[#F7F3ED] hover:text-[#FFFEFA] transition-colors font-medium">Privacy Policy</Link>
            <Link href="/cookies" className="text-[15px] text-[#F7F3ED] hover:text-[#FFFEFA] transition-colors font-medium">Cookie Policy</Link>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#F4A11A] mb-6">
            Contact
          </h3>
          <address className="not-italic flex flex-col gap-5 text-[15px] text-[#F7F3ED]">
            <span className="flex items-center gap-3 font-medium">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFEFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg>
              {SITE_CONFIG.location}
            </span>
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 font-medium hover:text-[#FFFEFA] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFEFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 shrink-0">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              {SITE_CONFIG.phone}
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 font-medium hover:text-[#FFFEFA] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFEFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              {SITE_CONFIG.email}
            </a>
          </address>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[1.5px] text-[#F4A11A] mb-6">
            Follow Us
          </h3>
          <div className="flex flex-col gap-5">
            {socialLinks.map(({ icon, href, label }) => (
              <a key={icon} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-5 h-5 relative flex items-center justify-center shrink-0">
                  <Image src={`/icons/${icon}.svg`} alt="" fill className="object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[15px] font-medium text-[#F7F3ED] group-hover:text-[#FFFEFA] transition-colors">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Section: Logo, Tagline, Copyright */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10 pt-10 border-t border-[#6B665F]/30">
        <div>
          <Link href="/" className="block relative h-10 w-40 sm:h-12 sm:w-48 mb-4" aria-label="Reelnosh Home">
            <Image src="/brand/logo-white.svg" alt="Reelnosh" fill className="object-contain object-left" priority />
          </Link>
          <p className="font-serif text-[22px] sm:text-[24px] text-[#FFFEFA] font-medium tracking-tight">
            {SITE_CONFIG.tagline}
          </p>
        </div>
        <div className="w-full sm:w-auto flex flex-col items-start sm:items-end gap-2">
          <p className="text-[13px] text-[#6B665F] font-medium">
            &copy; {new Date().getFullYear()} Reelnosh.
          </p>
          <p className="text-[13px] text-[#6B665F]">
            We&apos;re still finding our recipe — and that&apos;s okay.
          </p>
        </div>
      </div>
      
    </div>
  </footer>
);

