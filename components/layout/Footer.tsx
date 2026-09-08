import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';

const socialLinks = [
  ['instagram', SITE_CONFIG.links.instagram, 'Instagram'],
  ['facebook', SITE_CONFIG.links.facebook, 'Facebook'],
  ['tiktok', SITE_CONFIG.links.tiktok, 'TikTok'],
  ['x', SITE_CONFIG.links.x, 'X (Twitter)'],
  ['linkedin', SITE_CONFIG.links.linkedin, 'LinkedIn'],
] as const;

export const Footer: React.FC = () => (
  <footer className="bg-[#1E1B18] px-0 pb-12 pt-14 font-sans text-white">
    <div className="mx-auto max-w-[1120px] px-5 md:px-0">
      <div className="flex flex-col justify-between gap-8 pb-12 md:flex-row md:items-start">
        <div className="space-y-4">
          <div className="relative h-8 w-32 sm:h-9 sm:w-36">
            <Image src="/brand/logo-white.svg" alt="Reelnosh" fill className="object-contain object-left" />
          </div>
          <p className="text-sm text-white/90">{SITE_CONFIG.tagline}</p>
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-white/70">
            <span>{SITE_CONFIG.location}</span>
            <a href={`tel:${SITE_CONFIG.phone}`} className="transition-colors hover:text-white" aria-label={`Call Reelnosh at ${SITE_CONFIG.phone}`}>{SITE_CONFIG.phone}</a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="transition-colors hover:text-white" aria-label={`Email Reelnosh at ${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-6 text-sm text-white/90">
          <a href={SITE_CONFIG.links.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Join the Reelnosh community</a>
          <Link href="/terms" className="transition-colors hover:text-white" aria-label="Terms of Service">Terms</Link>
          <Link href="/privacy" className="transition-colors hover:text-white" aria-label="Privacy Policy">Privacy</Link>
          <Link href="/cookies" className="transition-colors hover:text-white" aria-label="Cookie Policy">Cookies</Link>
        </nav>
      </div>
      <div className="w-full border-t border-white/10" />
      <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
        <p className="text-xs text-white/60">&copy; 2026 Reelnosh. We&apos;re still learning, and that&apos;s okay.</p>
        <div className="flex items-center gap-6">
          {socialLinks.map(([icon, href, label]) => (
            <a key={icon} href={href} target="_blank" rel="noopener noreferrer" className="text-white/80 transition-opacity hover:opacity-70" aria-label={label}>
              <img src={`/icons/${icon}.svg`} alt="" width={20} height={20} className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
