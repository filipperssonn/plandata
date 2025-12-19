# Claude Code Prompt: Plandata MVP

Använd denna prompt när du startar ett nytt projekt i Claude Code för att bygga Plandata.

---

## PROMPT (kopiera allt nedan)

```
Jag vill bygga en SaaS-applikation som heter "Plandata" - en AI-driven tjänst som extraherar strukturerad data från bygglovsritningar och arkitektplaner (PDF) och exporterar till Excel.

## Tech Stack
- Frontend: Next.js 14 (App Router), React 18, TypeScript
- Styling: Tailwind CSS med shadcn/ui komponenter
- Backend: Python FastAPI (för AI/ML processing)
- Databas: PostgreSQL via Supabase (auth, storage, database)
- AI: Claude Vision API för ritningsanalys
- OCR: Google Cloud Vision API
- Betalning: Stripe
- Hosting: Vercel (frontend), Railway (backend)

## Varumärke & Design
- Namn: Plandata
- Färgpalett (Tailwind):
  - Primary: teal-700 (#0f766e)
  - Accent: teal-500 (#14b8a6)
  - Light bg: teal-50 (#f0fdfa)
  - Card bg: teal-100 (#ccfbf1)
  - Text: slate-900 (#0f172a)
  - Muted: slate-500 (#64748b)
- Font: Inter (sans), JetBrains Mono (mono för siffror/mått)
- Stil: Professionellt, avskalat, B2B-fokus

## Kärnfunktioner (MVP)
1. **Uppladdning**: Drag-drop PDF/bild, visa förhandsgranskning
2. **AI-analys**: Extrahera rum, väggar, fönster, dörrar, ytor
3. **Interaktiv granskning**: Visa ritning med overlay, redigerbar data
4. **Export**: Excel (.xlsx), CSV, JSON

## Datamodell (extraherad data)
```typescript
interface ExtractedData {
  rooms: Array<{
    name: string;        // "Kök", "Sovrum 1"
    type: string;        // "kitchen", "bedroom", "bathroom"
    area_sqm: number;
    is_wetroom: boolean;
  }>;
  walls: Array<{
    type: "exterior" | "interior";
    length_m: number;
    thickness_mm: number;
  }>;
  windows: Array<{
    width_mm: number;
    height_mm: number;
    room: string;
  }>;
  doors: Array<{
    type: "interior" | "exterior";
    width_mm: number;
    room_from: string;
    room_to: string;
  }>;
  totals: {
    bta_sqm: number;     // Bruttoarea
    boa_sqm: number;     // Boarea
    num_rooms: number;
    num_windows: number;
    num_doors: number;
  };
}
```

## Sidstruktur
- `/` - Landningssida med hero, features, pricing, CTA
- `/login` - Inloggning (Supabase Auth)
- `/register` - Registrering
- `/dashboard` - Projektöversikt
- `/project/[id]` - Analysvy med ritning + data
- `/settings` - Kontoinställningar
- `/pricing` - Prisplaner

## Prioritet
1. Börja med landningssidan (statisk, ingen backend krävs)
2. Sätt upp Supabase för auth och databas
3. Bygg dashboard och uppladdningsfunktion
4. Integrera AI-pipeline (kan mockas initialt)
5. Lägg till Stripe

## Viktiga principer
- Mobile-responsive men desktop-first (målgruppen använder mest desktop)
- Snabb time-to-value: användaren ska se resultat inom 60 sekunder
- Tydlig feedback under processing (progress bar, status)
- Felhantering med användarvänliga meddelanden på svenska

Börja med att sätta upp Next.js-projektet med Tailwind och shadcn/ui. Skapa sedan landningssidan.
```

---

## UPPFÖLJNINGSPROMPTS

### För att fortsätta med backend:
```
Sätt upp Python FastAPI-backend för Plandata med följande endpoints:
- POST /api/upload - Ta emot PDF, spara i Supabase Storage
- POST /api/analyze - Starta AI-analys av uppladdad fil
- GET /api/analysis/{id} - Hämta analysresultat
- GET /api/export/{id} - Generera Excel-fil

Använd Celery eller BackgroundTasks för asynkron processing.
```

### För AI-pipeline:
```
Implementera AI-pipeline för ritningsanalys:
1. Konvertera PDF till bilder (pdf2image)
2. Kör OCR med Google Cloud Vision
3. Skicka bild + OCR-text till Claude Vision API med denna prompt:

"Du är en expert på att analysera svenska bygglovsritningar. Analysera denna planritning och extrahera följande data i JSON-format:
- Alla rum med namn och area i m²
- Vägglängder (ytter och inner)
- Antal och dimensioner på fönster
- Antal och typ av dörrar
- Total BTA och BOA

Returnera endast valid JSON enligt schemat..."
```

### För Stripe-integration:
```
Integrera Stripe för prenumerationer:
- Gratis: 2 ritningar/månad
- Pro (299 kr/mån): 20 ritningar/månad
- Business (799 kr/mån): 100 ritningar/månad

Använd Stripe Checkout och Webhooks för att hantera prenumerationer.
Spara subscription status i Supabase.
```
