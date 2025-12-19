# Plandata Landing Page Implementation Plan

## Overview
Build a complete Next.js 14 landing page for Plandata, a SaaS application that extracts structured data from building permit drawings using AI. This is a greenfield project starting from scratch.

**Current State:** Empty repository with planning docs and SVG assets only
**Goal:** Production-ready landing page with routing structure and placeholder pages
**Language:** Swedish throughout

---

## Implementation Phases

### Phase 1: Project Foundation (30 min)

#### 1.1 Initialize Next.js Project
```bash
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

**Configuration:**
- App Router (modern, better SEO)
- TypeScript (strict mode)
- Tailwind CSS
- No `/src` directory
- Import alias: `@/*`

#### 1.2 Clean Up Defaults
- Delete default content from `app/page.tsx`
- Clean `app/globals.css` (keep Tailwind directives)
- Remove default favicons from `/public`

#### 1.3 Create Folder Structure
```
plandata-landing/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (app)/
│   │   ├── dashboard/page.tsx
│   │   ├── project/[id]/page.tsx
│   │   └── settings/page.tsx
│   ├── pricing/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── landing/             # Landing sections
│   │   ├── hero.tsx
│   │   ├── how-it-works.tsx
│   │   ├── features.tsx
│   │   ├── social-proof.tsx
│   │   ├── pricing.tsx
│   │   ├── faq.tsx
│   │   └── cta-section.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── shared/
│       └── logo.tsx
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── types/
│   └── index.ts
└── public/
    ├── plandata-logo.svg
    └── plandata-icon.svg
```

**Route Groups:**
- `(auth)` - Login/register pages with minimal layout
- `(app)` - Authenticated pages (dashboard, project, settings)
- `pricing` - Standalone pricing page

---

### Phase 2: Design System Configuration (45 min)

#### 2.1 Configure Tailwind with Brand Colors
Update `tailwind.config.ts`:

**Brand Colors:**
- Primary: `teal-700` (#0f766e)
- Accent: `teal-500` (#14b8a6)
- Light bg: `teal-50` (#f0fdfa)
- Card bg: `teal-100` (#ccfbf1)
- Text: `slate-900` (#0f172a)
- Muted: `slate-500` (#64748b)

**Custom Utilities:**
```css
.section-padding {
  @apply py-16 md:py-24 lg:py-32;
}
.container-padding {
  @apply px-4 sm:px-6 lg:px-8;
}
```

#### 2.2 Setup Fonts
Update `app/layout.tsx` with Google Fonts:
- **Inter** (sans-serif) - Primary font
- **JetBrains Mono** (monospace) - Numbers and measurements

```typescript
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
```

#### 2.3 Global CSS Setup
Update `app/globals.css` with:
- CSS variables for theme colors (HSL format for shadcn/ui)
- Typography defaults
- Base styles

---

### Phase 3: shadcn/ui Setup (30 min)

#### 3.1 Initialize shadcn/ui
```bash
npx shadcn-ui@latest init
```

**Settings:**
- Style: Default
- Base color: Slate
- CSS variables: Yes
- React Server Components: Yes
- Icons: lucide-react

#### 3.2 Install All Components
```bash
npx shadcn-ui@latest add button card badge accordion navigation-menu separator input label form sheet dialog skeleton
```

**Component Usage Map:**
- `button` - CTAs, navigation
- `card` - Feature cards, pricing cards
- `badge` - "Populärast" label
- `accordion` - FAQ section
- `navigation-menu` - Desktop nav
- `sheet` - Mobile drawer
- `form`, `input`, `label` - Auth pages
- `dialog` - Future modals
- `skeleton` - Loading states

---

### Phase 4: Assets & Branding (15 min)

#### 4.1 Move SVG Assets
```bash
mv plandata-logo.svg public/
mv plandata-icon.svg public/
```

#### 4.2 Create Logo Component
Create `components/shared/logo.tsx`:
- Two variants: `full` (logo + text) and `icon` (icon only)
- Use Next.js Image component for optimization
- Priority loading (above fold)

#### 4.3 Generate Favicons
Convert `plandata-icon.svg` to:
- `favicon.ico` (16x16, 32x32, 48x48)
- `apple-touch-icon.png` (180x180)
- Place in `/app` directory for Next.js auto-detection

---

### Phase 5: Type Definitions & Constants (20 min)

#### 5.1 Create Type Definitions
Create `types/index.ts`:
```typescript
export interface PricingPlan {
  id: 'free' | 'pro' | 'business'
  name: string
  price: number
  period: string
  features: string[]
  cta: string
  highlighted?: boolean
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
}
```

#### 5.2 Create Constants File
Create `lib/constants.ts`:
- Extract ALL content from `plandata-website-copy.md`
- Define `PRICING_PLANS`, `FEATURES`, `FAQ_ITEMS`, `NAV_ITEMS`
- Site configuration
- Single source of truth for content

**Critical:** This file makes content updates easy and prevents duplication across components.

---

### Phase 6: Layout Components (60 min)

#### 6.1 Header/Navigation Component
Create `components/layout/header.tsx`:

**Desktop:**
- Logo (left)
- Nav links (center/right): Funktioner, Priser, Om oss
- "Logga in" link + "Kom igång gratis" button (right)
- Sticky header with blur on scroll

**Mobile:**
- Hamburger menu (Sheet component)
- Full-screen drawer navigation
- Same CTA buttons

**Technical:**
- Use `navigation-menu` for desktop
- Use `sheet` for mobile drawer
- Client component for scroll behavior
- Smooth scroll to anchor links (#features, etc.)

#### 6.2 Footer Component
Create `components/layout/footer.tsx`:

**4-Column Layout:**
1. Plandata: Logo + tagline
2. Produkt: Funktioner, Priser, Uppdateringar, Roadmap
3. Företag: Om oss, Kontakt, Karriär
4. Juridiskt: Användarvillkor, Integritetspolicy, GDPR

**Styling:**
- Dark background (slate-900)
- Accent color hover effects
- Responsive (stack on mobile)
- Copyright row at bottom

#### 6.3 Update Root Layout
Update `app/layout.tsx`:
- Add fonts configuration
- Add metadata (SEO)
- Wrap with `<Header />` and `<Footer />`
- Set HTML lang="sv"

---

### Phase 7: Landing Page Sections (2-3 hours)

#### 7.1 Hero Section
Create `components/landing/hero.tsx`:

**Content:**
- Headline: "Från ritning till kalkyl på minuter"
- Subheadline (full description)
- Primary CTA: "Testa gratis" → `/register`
- Secondary CTA: "Se hur det fungerar" → Smooth scroll to #how-it-works
- Trust badges: ✓ 2 ritningar gratis, ✓ Inget kreditkort, ✓ Excel export

**Design:**
- Large typography (text-5xl lg:text-6xl)
- Gradient background (teal-50 to white)
- Fade-in animation
- Responsive button group

#### 7.2 How It Works Section
Create `components/landing/how-it-works.tsx`:

**Content:** 3-step process
1. Ladda upp din ritning (Upload icon)
2. AI analyserar automatiskt (Brain/Sparkles icon)
3. Exportera till Excel (Download icon)

**Design:**
- Horizontal cards on desktop, stack on mobile
- Number badges in accent color
- Arrow connectors (desktop only)
- Use Card component from shadcn/ui

**Icons:** lucide-react (Upload, Brain, Download)

#### 7.3 Features Section
Create `components/landing/features.tsx`:

**Content:** 6 feature cards
1. Smart rumsigenkänning (Home icon)
2. Fönster & dörrar (DoorOpen icon)
3. Vägglängder (Ruler icon)
4. BTA & BOA (Calculator icon)
5. Excel-export (FileSpreadsheet icon)
6. Historik & projekt (FolderOpen icon)

**Layout:**
- Grid: 1 col mobile, 2 col tablet, 3 col desktop
- Card with icon, title, description
- Hover effects (lift + shadow)

#### 7.4 Social Proof Section
Create `components/landing/social-proof.tsx`:

**Content:**
- Headline: "Byggbranschen sparar tid med Plandata"
- 3 stats: "4+ timmar sparade", "90% träffsäkerhet", "500+ ritningar"
- Testimonial with quote and author

**Design:**
- Light teal background (teal-50)
- Large numbers in accent color
- Testimonial card with quotation marks

#### 7.5 Pricing Section
Create `components/landing/pricing.tsx`:

**Content:** 3 pricing tiers
- **Gratis:** 0 kr/mån, 2 ritningar
- **Pro:** 299 kr/mån, 20 ritningar (Badge: "Populärast")
- **Business:** 799 kr/mån, 100 ritningar

**Design:**
- 3 columns desktop, stacked mobile
- Pro plan highlighted (border/shadow)
- Checkmark icons for features
- CTA buttons link to `/register?plan=pro`

**Technical:**
- Reusable component (also used on `/pricing` page)
- Data from `PRICING_PLANS` constant

#### 7.6 FAQ Section
Create `components/landing/faq.tsx`:

**Content:** 5 FAQ items from copy
- Vilka filformat stöds?
- Hur exakt är AI:n?
- Kan jag använda för alla ritningar?
- Är min data säker?
- Kan jag avbryta prenumeration?

**Implementation:**
- Use Accordion component from shadcn/ui
- Single item open at a time
- Expand/collapse icons
- Data from `FAQ_ITEMS` constant

#### 7.7 Bottom CTA Section
Create `components/landing/cta-section.tsx`:

**Content:**
- Headline: "Redo att sluta mäta manuellt?"
- Subheadline
- CTA button: "Kom igång gratis →"
- Micro-copy: "Inget kreditkort • 2 ritningar gratis"

**Design:**
- Full-width gradient background
- Centered content
- Large prominent button
- Final conversion point before footer

---

### Phase 8: Assemble Landing Page (15 min)

#### 8.1 Main Landing Page
Update `app/page.tsx`:

```typescript
import Hero from '@/components/landing/hero'
import HowItWorks from '@/components/landing/how-it-works'
import Features from '@/components/landing/features'
import SocialProof from '@/components/landing/social-proof'
import Pricing from '@/components/landing/pricing'
import FAQ from '@/components/landing/faq'
import CTASection from '@/components/landing/cta-section'

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <SocialProof />
      <Pricing />
      <FAQ />
      <CTASection />
    </>
  )
}
```

**Sections:**
- Each section uses `section-padding` utility
- Alternating backgrounds for visual rhythm
- Semantic HTML with section IDs for anchor links

---

### Phase 9: Placeholder Pages (45 min)

#### 9.1 Authentication Pages

**`app/(auth)/login/page.tsx`:**
- Centered card layout
- Form with email/password inputs
- "Logga in" button
- Link to register page

**`app/(auth)/register/page.tsx`:**
- Similar to login
- Additional fields: name, company
- Plan selection from URL query param
- Link to login page

**`app/(auth)/layout.tsx`:**
- Minimal header (logo only)
- No footer
- Centered content container

#### 9.2 App Pages (Dashboard, Project, Settings)

**`app/(app)/dashboard/page.tsx`:**
- Placeholder heading: "Dashboard"
- Empty state message
- Mock project cards layout

**`app/(app)/project/[id]/page.tsx`:**
- Display project ID from params
- Placeholder for analysis view
- Mock layout structure

**`app/(app)/settings/page.tsx`:**
- Settings placeholder
- Tabs for different sections (mock)

**`app/(app)/layout.tsx`:**
- Different header (logged in state)
- Full footer
- Optional sidebar navigation

#### 9.3 Pricing Page

**`app/pricing/page.tsx`:**
- Reuse `<Pricing />` component
- Optional: More detailed comparison table
- Same CTAs as landing page

---

### Phase 10: SEO & Metadata (30 min)

#### 10.1 Root Metadata
Update `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Plandata – Extrahera data från byggritningar med AI',
    template: '%s | Plandata'
  },
  description: 'Ladda upp bygglovsritningar och få automatiskt ut rumsytor, fönster, dörrar och vägglängder i Excel. Spara timmar på varje kalkyl. Testa gratis.',
  keywords: ['byggritning', 'planritning', 'kalkyl', 'mängdberäkning', 'bygglov', 'AI', 'OCR', 'Excel', 'BTA', 'BOA'],
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://plandata.se',
    title: 'Plandata – Extrahera data från byggritningar med AI',
    description: 'Ladda upp bygglovsritningar och få automatiskt ut rumsytor, fönster, dörrar och vägglängder i Excel.',
    siteName: 'Plandata',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

#### 10.2 Page-Specific Metadata
Each page exports metadata:
```typescript
// app/pricing/page.tsx
export const metadata: Metadata = {
  title: 'Priser',
  description: 'Enkel prissättning. Börja gratis med 2 ritningar/månad.',
}
```

#### 10.3 Structured Data
Add JSON-LD to `app/page.tsx` for rich snippets:
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Plandata',
  applicationCategory: 'BusinessApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'SEK',
  },
}
```

#### 10.4 Sitemap & Robots
Create `app/sitemap.ts` and `app/robots.ts`:
- Sitemap with all public pages
- Robots.txt disallowing dashboard/project/settings
- Allow crawling of landing and pricing

---

## Critical Files Summary

**Must implement first:**
1. `app/layout.tsx` - Root layout with fonts, metadata, Header/Footer
2. `components/layout/header.tsx` - Navigation component
3. `lib/constants.ts` - Single source of truth for all content
4. `tailwind.config.ts` - Design system with brand colors
5. `components/landing/pricing.tsx` - Reusable pricing component

**Landing page sections (in order):**
1. `components/landing/hero.tsx`
2. `components/landing/how-it-works.tsx`
3. `components/landing/features.tsx`
4. `components/landing/social-proof.tsx`
5. `components/landing/pricing.tsx`
6. `components/landing/faq.tsx`
7. `components/landing/cta-section.tsx`

**Assembly:**
- `app/page.tsx` - Compose all sections
- `components/layout/footer.tsx` - Footer component

---

## Technical Decisions

### App Router
- Modern Next.js 14 standard
- Better SEO with React Server Components
- Future-proof for Next.js 15+

### Route Groups
- `(auth)` and `(app)` for logical separation
- Different layouts without URL nesting
- Easier middleware application

### shadcn/ui
- Full control over component code
- Tailwind-native (matches design system)
- No bundle size overhead
- Easy brand customization

### Font Strategy
- Google Fonts via next/font
- Automatic optimization and self-hosting
- `font-display: swap` prevents layout shift
- GDPR compliant

### Component Architecture
- Separate landing sections (not monolithic)
- Reusable components (Pricing)
- Better code organization
- Easier testing and git history

---

## Content Mapping

All content from `plandata-website-copy.md`:

| Content Section | Component | Notes |
|----------------|-----------|-------|
| Navigation | `components/layout/header.tsx` | Desktop + mobile |
| Hero | `components/landing/hero.tsx` | With CTAs |
| Hur det fungerar | `components/landing/how-it-works.tsx` | 3 steps |
| Features | `components/landing/features.tsx` | 6 cards |
| Social Proof | `components/landing/social-proof.tsx` | Stats + testimonial |
| Pricing | `components/landing/pricing.tsx` | 3 plans |
| FAQ | `components/landing/faq.tsx` | Accordion |
| Bottom CTA | `components/landing/cta-section.tsx` | Final conversion |
| Footer | `components/layout/footer.tsx` | 4 columns |
| Meta/SEO | `app/layout.tsx` | Metadata API |

---

## Implementation Order

**Sequential (must follow order):**
1. Phase 1: Project Foundation
2. Phase 2: Design System Configuration
3. Phase 3: shadcn/ui Setup
4. Phase 4: Assets & Branding
5. Phase 5: Type Definitions & Constants
6. Phase 6: Layout Components
7. Phase 7: Landing Page Sections
8. Phase 8: Assemble Landing Page

**Parallel (can do anytime after Phase 3):**
- Phase 9: Placeholder Pages
- Phase 10: SEO & Metadata

---

## Quality Checklist

Before launch:
- [ ] All navigation links work
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] All CTAs redirect correctly
- [ ] Keyboard navigation works
- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Lighthouse score 90+ (all categories)
- [ ] SEO metadata present (og:image, title, description)
- [ ] Favicon displays correctly
- [ ] Accordion FAQ works
- [ ] Mobile navigation drawer functions
- [ ] Swedish language verified
- [ ] No console errors
- [ ] Smooth scrolling anchor links work
- [ ] Logo displays correctly

**Performance Targets:**
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Bundle size: <200KB (initial)

---

## Future Phases (Post-Landing)

**Phase 11:** Backend Integration
- Set up Supabase (auth, database, storage)
- Connect auth pages
- Add protected routes

**Phase 12:** Dashboard Implementation
- Upload functionality
- Project detail page
- Data visualization

**Phase 13:** Payment Integration
- Stripe Checkout
- Webhook handlers
- Subscription management

---

## Estimated Timeline

- **Phase 1-3:** ~2 hours (Foundation + Design + Components)
- **Phase 4-5:** ~45 min (Assets + Constants)
- **Phase 6:** ~1 hour (Layout components)
- **Phase 7:** ~2-3 hours (Landing sections)
- **Phase 8:** ~15 min (Assembly)
- **Phase 9:** ~45 min (Placeholder pages)
- **Phase 10:** ~30 min (SEO)

**Total:** ~7-8 hours for complete landing page with placeholder pages

---

## Success Criteria

✅ **Complete landing page** with all 7 sections from copy
✅ **Responsive design** that works on mobile, tablet, desktop
✅ **Routing structure** with placeholder pages ready for future development
✅ **SEO optimized** with proper metadata and structured data
✅ **Brand consistency** with Plandata colors and fonts throughout
✅ **Performance** meeting Lighthouse 90+ score
✅ **Accessibility** with keyboard navigation and semantic HTML
✅ **Swedish language** content throughout

The landing page will be production-ready and serve as the foundation for the full Plandata SaaS application.
