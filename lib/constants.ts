import { getFounderNoteBody } from './notesContent';

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

export const SEED_FEATURED_NOTE: FeaturedFounderNoteItem = {
  id: 'fn-featured',
  slug: 'why-we-are-starting-with-creator-led-food-drops',
  date: 'Aug 2026',
  category: 'PRODUCT THINKING',
  image: '/images/notes/note-detail-hero.png',
  quote: '"The future of food discovery starts in the comments."',
  title: "Why we're starting with creator-led food drops",
  excerpt: 'The "Send location" comment is a signal, not a failure. Here\'s why we think the future of food discovery starts there , and why we\'re betting on the creator relationship first.',
  published_at: '2026-08-28T12:00:00Z',
  body_markdown: getFounderNoteBody('why-we-are-starting-with-creator-led-food-drops'),
};

export const SEED_FOUNDER_NOTES: FounderNoteItem[] = [
  {
    id: 'fn-1',
    slug: 'what-the-community-is-teaching-us',
    date: 'Aug 2026',
    category: 'COMMUNITY',
    image: '/images/notes/note-1.png',
    title: 'What the community is teaching us',
    excerpt: "Cravings, votes, and honest conversations , this is what we've learned in our first weeks. The feedback has been sharper than we expected.",
    published_at: '2026-08-14T12:00:00Z',
    body_markdown: getFounderNoteBody('what-the-community-is-teaching-us'),
  },
  {
    id: 'fn-2',
    slug: 'why-we-are-not-building-delivery-yet',
    date: 'Jul 2026',
    category: 'STRATEGY',
    image: '/images/notes/note-2.png',
    title: "Why we're not building delivery yet",
    excerpt: "Building slowly on purpose. Here's the thinking behind our decision to validate before we ship infrastructure , and why that patience is paying off.",
    published_at: '2026-07-22T12:00:00Z',
    body_markdown: getFounderNoteBody('why-we-are-not-building-delivery-yet'),
  },
  {
    id: 'fn-3',
    slug: 'what-food-creators-actually-want-from-a-platform',
    date: 'Jul 2026',
    category: 'CREATORS',
    image: '/images/notes/note-3.png',
    title: 'What food creators actually want from a platform',
    excerpt: "We've been in close conversations with over twenty food creators in Lagos. The patterns we're seeing are different from what we expected.",
    published_at: '2026-07-10T12:00:00Z',
    body_markdown: getFounderNoteBody('what-food-creators-actually-want-from-a-platform'),
  },
  {
    id: 'fn-4',
    slug: 'the-drop-format-why-scarcity-is-a-feature-not-a-limitation',
    date: 'Jun 2026',
    category: 'PRODUCT THINKING',
    image: '/images/notes/note-4.png',
    title: 'The Drop format: why scarcity is a feature, not a limitation',
    excerpt: "Every Drop is time-limited and quantity-capped. That was a deliberate design choice, not a constraint. Here's what we believe about demand.",
    published_at: '2026-06-25T12:00:00Z',
    body_markdown: getFounderNoteBody('the-drop-format-why-scarcity-is-a-feature-not-a-limitation'),
  },
  {
    id: 'fn-5',
    slug: 'understanding-how-food-moves-in-lagos',
    date: 'Jun 2026',
    category: 'LAGOS',
    image: '/images/notes/note-5.png',
    title: 'Understanding how food moves in Lagos',
    excerpt: 'Lagos has one of the most vibrant informal food economies in the world. Before we could build Reelnosh, we had to understand how trust works.',
    published_at: '2026-06-12T12:00:00Z',
    body_markdown: getFounderNoteBody('understanding-how-food-moves-in-lagos'),
  },
  {
    id: 'fn-6',
    slug: 'the-foodies-club-what-we-got-right-and-what-we-would-change',
    date: 'May 2026',
    category: 'COMMUNITY',
    image: '/images/notes/note-6.png',
    title: "The Foodies Club: what we got right and what we'd change",
    excerpt: "We launched the Foodies Club on WhatsApp before the product existed. It taught us more than any survey could. Here's a candid look at our early members.",
    published_at: '2026-05-28T12:00:00Z',
    body_markdown: getFounderNoteBody('the-foodies-club-what-we-got-right-and-what-we-would-change'),
  },
  {
    id: 'fn-7',
    slug: 'why-we-chose-lagos-first-and-what-that-means',
    date: 'May 2026',
    category: 'STRATEGY',
    image: '/images/notes/note-7.png',
    title: 'Why we chose Lagos first , and what that means for everything else',
    excerpt: "Every startup chooses a first market. Ours wasn't a coin flip. Lagos is one of the most demanding food environments in the world, and if it works here, it works anywhere.",
    published_at: '2026-05-14T12:00:00Z',
    body_markdown: getFounderNoteBody('why-we-chose-lagos-first-and-what-that-means'),
  },
  {
    id: 'fn-8',
    slug: 'from-reel-to-real-the-gap-we-are-closing',
    date: 'Apr 2026',
    category: 'PRODUCT THINKING',
    image: '/images/notes/note-8.png',
    title: "From reel to real: the gap we're closing",
    excerpt: 'A creator posts a jollof rice video. Thousands of people say they want it. Nothing happens. We spent months asking why nothing happens , and what it would take to change that.',
    published_at: '2026-04-24T12:00:00Z',
    body_markdown: getFounderNoteBody('from-reel-to-real-the-gap-we-are-closing'),
  },
  {
    id: 'fn-9',
    slug: 'how-we-think-about-the-creator-relationship',
    date: 'Apr 2026',
    category: 'CREATORS',
    image: '/images/notes/note-9.png',
    title: 'How we think about the creator relationship',
    excerpt: "Reelnosh only works if creators trust us. That trust takes time to earn. Here's how we're approaching the relationship , and what we're refusing to do to make growth faster.",
    published_at: '2026-04-08T12:00:00Z',
    body_markdown: getFounderNoteBody('how-we-think-about-the-creator-relationship'),
  },
  {
    id: 'fn-10',
    slug: 'what-building-in-public-actually-feels-like',
    date: 'Mar 2026',
    category: 'BUILDING IN PUBLIC',
    image: '/images/notes/note-10.png',
    title: 'What building in public actually feels like',
    excerpt: "We share our thinking before it's finished. That's uncomfortable. But the feedback we get from doing it has shaped Reelnosh more than any internal brainstorm.",
    published_at: '2026-03-20T12:00:00Z',
    body_markdown: getFounderNoteBody('what-building-in-public-actually-feels-like'),
  },
  {
    id: 'fn-11',
    slug: 'the-version-of-reelnosh-we-decided-not-to-build',
    date: 'Mar 2026',
    category: 'STRATEGY',
    image: '/images/notes/note-11.png',
    title: 'The version of Reelnosh we decided not to build',
    excerpt: "Before we settled on Drops, we explored five other models. Each one solved a real problem but created a bigger one. Here's the path we walked away from.",
    published_at: '2026-03-05T12:00:00Z',
    body_markdown: getFounderNoteBody('the-version-of-reelnosh-we-decided-not-to-build'),
  },
];

