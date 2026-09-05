# Reelnosh — Creator-Led Food Commerce Marketing Website

Where food content becomes meals. Reelnosh turns viral culinary discoveries into limited batch drops in Lagos, Nigeria.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components + Client Interactivity, ISR revalidate = 300)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Fully customized via `design/tokens.json` & `design/DESIGN_SYSTEM.md`)
- **Backend & Database**: Supabase (`@supabase/supabase-js`)
- **Forms & Validation**: `react-hook-form` + `zod`
- **Markdown Rendering**: `react-markdown`

---

## Design System & Brand Compliance

The visual design is strictly governed by `design/tokens.json` and `design/DESIGN_SYSTEM.md`:
- **Deep Clay** (`#8B3A2A`): Primary brand accent, primary CTAs, active states
- **Spiced Cocoa** (`#5A2418`): Depth, section dividers, footer background
- **Neutrals**: Warm White (`#FFFEFA`), Soft Cream (`#F7F3ED`), Light Clay (`#E7DED5`), Clay Gray (`#6B665F`), Charcoal (`#1E1B18`)
- **Accent & Feedback**: Spice Pop (`#F4A11A`), Fresh Basil (`#5F8B4C`), Burnt Pepper (`#B84D1B`), Muted Terracotta (`#B44C42`)
- **Typography**: `Figtree` (UI, system, microcopy) + `Lora` (Editorial display, headlines, quotes)
- **Grid Layout**: 1280px desktop container, 1120px max content width; 402px mobile container, 363px max content width.

---

## Architecture

```
reelnosh-website/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, HeaderWrapper, Footer
│   ├── page.tsx                    # Home (Server Component, ISR revalidate = 300)
│   ├── globals.css                 # CSS variables & Tailwind directives
│   ├── icon.png / apple-icon.png   # Auto-detected favicons
│   ├── founders-note/
│   │   ├── page.tsx                # Founder's Note index (infinite scroll feed)
│   │   └── [slug]/page.tsx         # Single note reader with Markdown & origin-aware back
│   ├── privacy/page.tsx            # Privacy Policy
│   ├── terms/page.tsx              # Terms of Service
│   ├── cookies/page.tsx            # Cookie Policy
│   ├── api/
│   │   ├── foodie-signup/route.ts  # Foodie waitlist POST
│   │   ├── creator-signup/route.ts # Creator waitlist POST
│   │   ├── interest-tap/route.ts   # Anonymous instant interest tap POST
│   │   ├── interest-detail/route.ts# Optional pricing/contact follow-up POST
│   │   └── notes/route.ts          # Paginated founder notes GET
│   ├── sitemap.ts                  # Dynamic sitemap generator
│   └── robots.ts                   # Search crawler directives
├── components/
│   ├── layout/                     # Header.tsx, HeaderWrapper.tsx, Footer.tsx
│   ├── ui/                         # Button.tsx, Modal.tsx, Input.tsx
│   ├── sections/                   # Hero.tsx, TheGap.tsx, TheDrop.tsx, Exploring.tsx,
│   │                               # FoodiesClub.tsx, ForCreators.tsx, FounderNoteTeaser.tsx
│   ├── home/                       # HomePageClient.tsx
│   ├── forms/                      # FoodieSignupForm.tsx, CreatorSignupForm.tsx, InterestDetailForm.tsx
│   └── notes/                      # FoundersNoteFeed.tsx, OriginAwareBackButton.tsx
├── lib/
│   ├── supabase/                   # client.ts (anon), server.ts (service role)
│   ├── validation/                 # foodie.ts, creator.ts, interest.ts (Zod schemas)
│   ├── constants.ts                # Canonical copy constants & seed data
│   └── queries.ts                  # getFeaturedContent() query with graceful fallbacks
├── design/
│   ├── tokens.json                 # Machine-readable design tokens
│   └── DESIGN_SYSTEM.md            # Human-readable design system rules
├── CONTENT.md                      # Verbatim source of truth copy document
├── .env.example                    # Clean environment variable template
└── .github/workflows/ci.yml        # CI build validation workflow
```

---

## Supabase Schema & Row-Level Security (RLS)

Run this SQL script in your Supabase SQL Editor:

```sql
-- Foodie waitlist ("Join Early Access")
create table foodie_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text,
  location text,
  created_at timestamptz not null default now()
);

-- Creator waitlist ("I'm a Food Creator" / "Join the Creator Waitlist")
create table creator_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  instagram_handle text not null,
  phone_or_email text not null,
  what_they_cook text,
  created_at timestamptz not null default now()
);

-- "I'd order this" — anonymous instant tap, never gated on a completed form
create table interest_taps (
  id uuid primary key default gen_random_uuid(),
  meal_id text not null,
  session_id text,
  created_at timestamptz not null default now()
);

-- Optional follow-up: amount willing to pay + contact, loosely linked by session_id
create table interest_details (
  id uuid primary key default gen_random_uuid(),
  meal_id text not null,
  session_id text,
  amount_willing_to_pay numeric,
  contact text,
  created_at timestamptz not null default now()
);

-- Founder's Note — direct entries via Supabase Studio
create table founder_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  body_markdown text not null,
  cover_image_url text,
  published_at timestamptz not null default now()
);

-- Row-Level Security: public can INSERT, never SELECT/UPDATE/DELETE (service_role can read)
-- except founder_notes, which is public-readable
alter table foodie_signups enable row level security;
alter table creator_signups enable row level security;
alter table interest_taps enable row level security;
alter table interest_details enable row level security;
alter table founder_notes enable row level security;

create policy "public can insert foodie signups" on foodie_signups for insert with check (true);
create policy "public can insert creator signups" on creator_signups for insert with check (true);
create policy "public can insert interest taps" on interest_taps for insert with check (true);
create policy "public can insert interest details" on interest_details for insert with check (true);
create policy "public can read published notes" on founder_notes for select using (published_at <= now());
```

---

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Copy `.env.example` to `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```
