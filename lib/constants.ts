export const SITE_CONFIG = {
  name: 'Reelnosh',
  tagline: 'Where food content becomes meals.',
  location: 'Lagos, Nigeria',
  phone: '+2348080821273',
  email: 'enquiries@reelnosh.com',
  links: {
    whatsapp: 'https://wa.me/2348080821273',
    tiktok: 'https://tiktok.com/@reelnosh',
    x: 'https://x.com/reelnosh',
    instagram: 'https://instagram.com/reelnosh',
    facebook: 'https://facebook.com/reelnosh',
    linkedin: 'https://linkedin.com/company/reelnosh',
  },
};

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

export const SEED_HERO_CONTENT: FeaturedContentItem = {
  id: 'hero-1',
  placement: 'hero',
  title: 'Smokey Jollof Rice with Grilled Chicken',
  description: 'Slow cooked smokey jollof rice with plantain, grilled turkey and house sauce',
  creator_name: 'Kudirat Ijeoma',
  creator_handle: '@kudiratijeoma',
  creator_username: 'kudiratijeoma',
  creator_profile_url: 'https://instagram.com/kudiratijeoma',
  source_post_url: 'https://instagram.com/kudiratijeoma',
  media_url: '/images/hero/hero-image.png',
  public_url: '/images/hero/hero-image.png',
  media_type: 'image',
  permission_confirmed: true,
};

export const SEED_EXPLORING_ITEMS: FeaturedContentItem[] = [
  {
    id: 'exp-1',
    placement: 'exploring',
    title: 'Smokey Jollof',
    description: 'Slow cooked smokey jollof rice with plantain, grilled turkey and house sauce',
    badge: 'Vote for this Drop',
    creator_name: 'Kudirat Ijeoma',
    creator_handle: '@kudiratijeoma',
    creator_username: 'kudiratijeoma',
    creator_profile_url: 'https://instagram.com/kudiratijeoma',
    source_post_url: 'https://instagram.com/kudiratijeoma',
    media_url: '/images/drops/smokey-jollof.jpg',
    public_url: '/images/drops/smokey-jollof.jpg',
    media_type: 'image',
    display_order: 0,
    is_featured: true,
    permission_confirmed: true,
  },
  {
    id: 'exp-2',
    placement: 'exploring',
    title: 'Abula with Ewedu',
    description: 'Smooth amala with delicious ewedu and assorted beef',
    badge: 'Vote for this Drop',
    creator_name: 'Kudirat Ijeoma',
    creator_handle: '@kudiratijeoma',
    creator_username: 'kudiratijeoma',
    creator_profile_url: 'https://instagram.com/kudiratijeoma',
    source_post_url: 'https://instagram.com/kudiratijeoma',
    media_url: '/images/drops/abula-ewedu.jpg',
    public_url: '/images/drops/abula-ewedu.jpg',
    media_type: 'image',
    display_order: 1,
    is_featured: false,
    permission_confirmed: true,
  },
  {
    id: 'exp-3',
    placement: 'exploring',
    title: 'White Rice & Stew',
    description: 'White rice and seafood stew and plantain',
    badge: 'Vote for this Drop',
    creator_name: 'Kudirat Ijeoma',
    creator_handle: '@kudiratijeoma',
    creator_username: 'kudiratijeoma',
    creator_profile_url: 'https://instagram.com/kudiratijeoma',
    source_post_url: 'https://instagram.com/kudiratijeoma',
    media_url: '/images/drops/white-rice-stew.jpg',
    public_url: '/images/drops/white-rice-stew.jpg',
    media_type: 'image',
    display_order: 2,
    is_featured: false,
    permission_confirmed: true,
  },
];

export interface FounderNoteItem {
  id: string;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  category?: string;
  image?: string;
  body_markdown?: string;
  published_at: string;
}

export interface FeaturedFounderNoteItem extends FounderNoteItem {
  quote: string;
  category: string;
}

export const SEED_FEATURED_NOTE: FeaturedFounderNoteItem | null = null;

export const SEED_FOUNDER_NOTES: FounderNoteItem[] = [];

