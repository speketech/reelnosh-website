export const SITE_CONFIG = {
  name: 'Reelnosh',
  tagline: 'Where food content becomes meals.',
  description:
    'We turn food content into meals you can actually order. Help shape the first creator-led food drops in Lagos.',
  location: 'Lagos, Nigeria',
  phone: '+2348080821273',
  email: 'hello@reelnosh.com',
  links: {
    whatsapp: 'https://wa.me/2348080821273',
    tiktok: 'https://tiktok.com/@reelnosh',
    x: 'https://x.com/reelnosh',
    instagram: 'https://instagram.com/reelnosh',
    facebook: 'https://facebook.com/reelnosh',
    linkedin: 'https://linkedin.com/company/reelnosh',
  },
};

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== 'http://localhost:3000') {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://reelnosh.com';
}

export interface FeaturedContentItem {
  id: string;
  placement: 'hero' | 'exploring';
  title: string;
  description: string;
  badge?: string;
  creator_name?: string;
  creator_handle?: string;
  creator_username?: string;
  creator_profile_url?: string;
  source_post_url?: string;
  media_url: string;
  media_type?: 'image' | 'video';
  public_url?: string;
  permission_confirmed?: boolean;
  // Dynamic ordering fields (DESIGN_OVERRIDES product fix §3 & §4)
  tap_count?: number;      // live count from featured_content table; undefined until columns added
  is_featured?: boolean;   // set by cron job based on tap_count leadership
  display_order?: number;  // cold-start fallback ordering
}

export interface FounderNoteItem {
  id: string;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  category?: string;
  image?: string;
  image_credit?: string;
  body_markdown?: string;
  published_at: string;
  quote?: string;
  likes_count?: number;
}

export interface FeaturedFounderNoteItem extends FounderNoteItem {
  quote: string;
  category: string;
}

