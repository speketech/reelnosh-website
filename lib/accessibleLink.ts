import React from 'react';

/**
 * Common generic link text phrases flagged by Google Lighthouse / WCAG / SEO audits.
 * When links have only these generic labels, search engines cannot determine their destination.
 */
const GENERIC_LINK_PATTERNS: RegExp[] = [
  /^read more$/i,
  /^read full note$/i,
  /^read note$/i,
  /^read$/i,
  /^click here$/i,
  /^click this$/i,
  /^click$/i,
  /^learn more$/i,
  /^learn$/i,
  /^more details$/i,
  /^more info$/i,
  /^more information$/i,
  /^more$/i,
  /^details$/i,
  /^info$/i,
  /^here$/i,
  /^this$/i,
  /^start$/i,
  /^right here$/i,
  /^see more$/i,
  /^view more$/i,
  /^view$/i,
  /^link$/i,
  /^this link$/i,
  /^the link$/i,
  /^page$/i,
  /^this page$/i,
  /^website$/i,
  /^site$/i,
  /^url$/i,
  /^source$/i,
  /^check it out$/i,
  /^check this out$/i,
  /^visit$/i,
  /^continue reading$/i,
  /^find out more$/i,
];

/**
 * Extracts raw textual content from React children tree.
 */
export function extractTextContent(children: React.ReactNode): string {
  if (!children) return '';
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractTextContent).join('');
  if (React.isValidElement(children) && children.props && (children.props as any).children) {
    return extractTextContent((children.props as any).children);
  }
  return '';
}

/**
 * Checks whether a given link text is considered non-descriptive or generic.
 */
export function isGenericLinkText(text: string): boolean {
  const raw = text.trim().toLowerCase();
  if (!raw) return true;

  // Check if text is just a raw URL, web address, or path
  if (
    /^https?:\/\//i.test(raw) ||
    /^www\./i.test(raw) ||
    /^[a-z0-9-]+\.[a-z]{2,}(\/.*)?$/i.test(raw) ||
    /^\/[a-z0-9-_/]+$/i.test(raw)
  ) {
    return true;
  }

  const cleaned = raw
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()><→»\s]+/g, ' ')
    .trim();

  if (!cleaned) return true;

  return GENERIC_LINK_PATTERNS.some((pattern) => pattern.test(cleaned));
}

/**
 * Transforms a hyphenated slug into a human-friendly title.
 * e.g. "why-we-are-not-building-delivery-yet" -> "Why We Are Not Building Delivery Yet"
 */
export function formatSlugToTitle(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Automatically infers a descriptive label for a destination href.
 * This guarantees that even if a founder types [read more](url) in future notes,
 * an accessible descriptive label and screen-reader context are automatically generated.
 */
export function resolveDescriptiveContext(href: string, explicitTitle?: string): string {
  if (explicitTitle && explicitTitle.trim()) {
    return explicitTitle.trim();
  }

  const cleanHref = href.trim();
  if (!cleanHref || cleanHref === '#') {
    return 'this section';
  }

  // Handle founder note links: /founders-note/[slug] or founders-note/[slug]
  const noteMatch = cleanHref.match(/(?:\/founders-note\/|^founders-note\/)([a-zA-Z0-9_-]+)/);
  if (noteMatch) {
    const slug = noteMatch[1];
    return formatSlugToTitle(slug);
  }

  // Handle standard routes
  if (cleanHref === '/' || cleanHref === '') return 'Reelnosh home page';
  if (cleanHref === '/founders-note') return "Founder's Notes feed";
  if (cleanHref === '/terms') return 'Terms of Service';
  if (cleanHref === '/privacy') return 'Privacy Policy';
  if (cleanHref === '/cookies') return 'Cookie Policy';

  // Internal anchor sections
  if (cleanHref.startsWith('/#') || cleanHref.startsWith('#')) {
    const anchor = cleanHref.replace(/^\/?#/, '');
    if (anchor === 'how-it-works') return 'How it works';
    if (anchor === 'for-creators') return 'For creators';
    if (anchor === 'founders-note') return "Founder's Note";
    if (anchor === 'the-gap') return 'The Gap';
    if (anchor === 'the-drop') return 'The Drop';
    if (anchor === 'exploring') return 'Exploring Meal Ideas';
    if (anchor === 'foodies-club') return 'Foodies Club';
    if (anchor === 'faq') return 'Frequently Asked Questions';
    return `${formatSlugToTitle(anchor)} section`;
  }

  // mailto / tel
  if (cleanHref.startsWith('mailto:')) {
    return `email ${cleanHref.replace('mailto:', '')}`;
  }
  if (cleanHref.startsWith('tel:')) {
    return `call ${cleanHref.replace('tel:', '')}`;
  }

  // External URLs
  try {
    const url = new URL(cleanHref.startsWith('http') ? cleanHref : `https://${cleanHref}`);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
    if (hostname.includes('whatsapp.com')) return 'Reelnosh WhatsApp community';
    if (hostname.includes('instagram.com')) {
      const path = url.pathname.replace(/^\/+/, '').split('/')[0];
      return path ? `@${path} on Instagram` : 'Reelnosh on Instagram';
    }
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) return 'Reelnosh on X';
    if (hostname.includes('tiktok.com')) return 'Reelnosh on TikTok';
    if (hostname.includes('facebook.com')) return 'Reelnosh on Facebook';
    if (hostname.includes('linkedin.com')) return 'Reelnosh on LinkedIn';

    const pathSnippet = url.pathname && url.pathname !== '/' ? ` (${url.pathname.replace(/\/$/, '')})` : '';
    return `${hostname}${pathSnippet}`;
  } catch {
    return cleanHref;
  }
}
