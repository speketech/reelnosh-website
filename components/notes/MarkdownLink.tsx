import React from 'react';
import Link from 'next/link';
import { SEED_FOUNDER_NOTES, SEED_FEATURED_NOTE } from '@/lib/constants';

interface MarkdownLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  title?: string;
  children?: React.ReactNode;
}

const GENERIC_LINK_TEXTS = new Set([
  'click here',
  'click this',
  'click',
  'here',
  'this',
  'start',
  'go',
  'right here',
  'more',
  'more info',
  'more information',
  'learn more',
  'read more',
  'see more',
  'view more',
  'page',
  'link',
  'this link',
  'this page',
  'this post',
  'this article',
  'article',
  'post',
  'website',
  'site',
  'url',
  'details',
  'more details',
  'read this',
  'continue',
  'continue reading',
  'check this out',
  'find out more',
  'view details',
  'read note',
  'read full note',
]);

const INTERNAL_ROUTE_LABELS: Record<string, string> = {
  '/': 'Reelnosh Homepage',
  '/#the-drop': 'How Reelnosh Works',
  '/#how-it-works': 'How Reelnosh Works',
  '/#for-creators': 'Reelnosh for Creators',
  '/#exploring': 'Food Drops We Are Exploring',
  '/waitlist': 'Reelnosh Early Access Waitlist',
  '/terms': 'Terms of Service',
  '/privacy': 'Privacy Policy',
  '/cookies': 'Cookie Policy',
  '/founders-note': "Founder's Notes",
};

function extractText(node: React.ReactNode): string {
  if (!node) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node) && node.props && 'children' in (node.props as { children?: React.ReactNode })) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

function slugToTitle(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getDescriptiveContext(href: string, title?: string): string {
  if (title && title.trim()) {
    return title.trim();
  }

  if (!href) return 'page';

  // Mailto
  if (href.startsWith('mailto:')) {
    const email = href.replace(/^mailto:/, '').split('?')[0];
    return `email ${email}`;
  }

  // Tel
  if (href.startsWith('tel:')) {
    const phone = href.replace(/^tel:/, '').split('?')[0];
    return `call ${phone}`;
  }

  // Check static internal route map
  const cleanInternalHref = href.split('?')[0];
  if (INTERNAL_ROUTE_LABELS[cleanInternalHref]) {
    return INTERNAL_ROUTE_LABELS[cleanInternalHref];
  }

  // Check founder notes route: /founders-note/[slug]
  const noteMatch = href.match(/\/founders-note\/([^/?#]+)/);
  if (noteMatch) {
    const slug = noteMatch[1];
    const matchedSeed =
      SEED_FOUNDER_NOTES.find((n) => n.slug === slug) ||
      (SEED_FEATURED_NOTE.slug === slug ? SEED_FEATURED_NOTE : null);

    if (matchedSeed) {
      return matchedSeed.title;
    }
    return slugToTitle(slug);
  }

  // External URL
  if (href.startsWith('http://') || href.startsWith('https://')) {
    try {
      const url = new URL(href);
      const host = url.hostname.replace(/^www\./, '');

      if (host.includes('instagram.com')) return 'Reelnosh on Instagram';
      if (host.includes('twitter.com') || host === 'x.com') return 'Reelnosh on X (Twitter)';
      if (host.includes('tiktok.com')) return 'Reelnosh on TikTok';
      if (host.includes('facebook.com')) return 'Reelnosh on Facebook';
      if (host.includes('linkedin.com')) return 'Reelnosh on LinkedIn';
      if (host.includes('youtube.com')) return 'Reelnosh on YouTube';
      if (host.includes('wa.me') || host.includes('whatsapp.com')) return 'Reelnosh on WhatsApp';

      // Path slug if present
      const pathSegments = url.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        const lastSegment = pathSegments[pathSegments.length - 1];
        const formattedSegment = slugToTitle(lastSegment);
        return `${formattedSegment} on ${host}`;
      }

      return `visit ${host}`;
    } catch {
      return 'external link';
    }
  }

  // Relative path fallback
  const segments = href.split('/').filter(Boolean);
  if (segments.length > 0) {
    return slugToTitle(segments[segments.length - 1]);
  }

  return 'destination';
}

const isExternalLink = (href: string) => {
  if (!href.startsWith('http')) return false;
  try {
    const hostname = new URL(href).hostname;
    return hostname !== 'reelnosh.com' && !hostname.endsWith('.reelnosh.com');
  } catch {
    return false;
  }
};

export const MarkdownLink: React.FC<MarkdownLinkProps> = ({
  href = '',
  title,
  children,
  className,
  ...props
}) => {
  const plainText = extractText(children).trim();
  const normalizedText = plainText.toLowerCase().replace(/[.,!?:;…]+$/, '').trim();
  const isGeneric = !normalizedText || GENERIC_LINK_TEXTS.has(normalizedText);

  const descriptiveContext = getDescriptiveContext(href, title);

  // Determine prefix based on the phrasing
  let prefix = 'for';
  if (normalizedText.includes('read') || normalizedText.includes('learn') || normalizedText.includes('article') || normalizedText.includes('note') || normalizedText.includes('post')) {
    prefix = 'about';
  } else if (normalizedText.includes('view') || normalizedText.includes('see') || normalizedText.includes('go')) {
    prefix = 'to';
  }

  const computedAriaLabel = isGeneric
    ? plainText
      ? `${plainText} ${prefix} ${descriptiveContext}`
      : descriptiveContext
    : undefined;

  const linkTitle = title || (isGeneric ? descriptiveContext : undefined);
  const linkClass = className || 'text-clay underline underline-offset-4';

  const content = isGeneric ? (
    <>
      {plainText ? children : descriptiveContext}
      {plainText && (
        <span className="sr-only"> {prefix} {descriptiveContext}</span>
      )}
    </>
  ) : (
    children
  );

  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={computedAriaLabel}
        title={linkTitle}
        className={linkClass}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href || '#'}
      aria-label={computedAriaLabel}
      title={linkTitle}
      className={linkClass}
      {...props}
    >
      {content}
    </Link>
  );
};
