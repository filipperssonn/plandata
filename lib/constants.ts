import { PricingPlan, Feature, FAQItem, NavItem, HowItWorksStep, SocialProofStat } from "@/types"

export const SITE_CONFIG = {
  name: "Plandata",
  description: "Från ritning till kalkyl på minuter",
  url: "https://plandata.se",
  ogImage: "/og-image.png",
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Funktioner", href: "/#features" },
  { label: "Priser", href: "/#pricing" },
]

export const HERO = {
  headline: "Från ritning till kalkyl på minuter",
  subheadline: "Ladda upp en bygglovsritning och få automatiskt ut alla mått, ytor och element i Excel, CSV eller PDF. Sluta räkna manuellt – låt AI göra jobbet.",
  primaryCTA: "Testa gratis",
  secondaryCTA: "Se hur det fungerar",
  trustBadges: [
    "2 ritningar gratis varje månad",
    "Inget kreditkort krävs",
    "Exportera till Excel direkt",
  ],
}

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    step: 1,
    title: "Ladda upp din ritning",
    description: "Dra och släpp din PDF eller bild. Vi stöder bygglovsritningar, planritningar och arkitektskisser.",
    icon: "Upload",
  },
  {
    step: 2,
    title: "AI analyserar automatiskt",
    description: "Vår AI identifierar rum, väggar, fönster och dörrar. Du ser resultatet på under en minut.",
    icon: "Brain",
  },
  {
    step: 3,
    title: "Exportera till Excel",
    description: "Ladda ner strukturerad data redo för din kalkyl. Alla mått, ytor och element snyggt organiserade.",
    icon: "Download",
  },
]

export const FEATURES: Feature[] = [
  {
    icon: "Home",
    title: "Smart rumsigenkänning",
    description: "Plandata identifierar automatiskt kök, sovrum, badrum och andra rum – med namn och exakta ytor i kvadratmeter.",
  },
  {
    icon: "DoorOpen",
    title: "Fönster & dörrar",
    description: "Räkna aldrig fönster manuellt igen. Vi hittar varje fönster och dörr, med dimensioner och placering.",
  },
  {
    icon: "Ruler",
    title: "Vägglängder",
    description: "Få totala löpmeter för ytterväggar och innerväggar – perfekt för material- och arbetskalkyler.",
  },
  {
    icon: "Calculator",
    title: "BTA & BOA",
    description: "Automatisk beräkning av bruttoarea och boarea enligt svensk standard.",
  },
  {
    icon: "FileDown",
    title: "Flexibel export",
    description: "Exportera data i det format du behöver – Excel för kalkyler, CSV för databaser eller PDF för presentation och dokumentation.",
  },
  {
    icon: "FolderOpen",
    title: "Historik & projekt",
    description: "Spara alla dina analyser. Gå tillbaka och jämför eller exportera igen när du behöver.",
  },
]

export const SOCIAL_PROOF = {
  headline: "Byggbranschen sparar tid med Plandata",
  stats: [
    { value: "4+ timmar", label: "sparade per projekt" },
    { value: "90%", label: "träffsäkerhet på rumsidentifiering" },
    { value: "500+", label: "ritningar analyserade" },
  ] as SocialProofStat[],
  testimonial: {
    quote: "Vi brukade spendera en halv dag på att mäta upp en villa. Nu tar det 10 minuter med Plandata.",
    author: "Erik Andersson",
    role: "Kalkylchef på Byggbolaget AB",
  },
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Gratis",
    price: 0,
    period: "månad",
    features: [
      "2 ritningar per månad",
      "Grundläggande extraktion",
      "Excel-export",
    ],
    cta: "Kom igång gratis",
  },
  {
    id: "pro",
    name: "Pro",
    price: 299,
    period: "månad",
    features: [
      "20 ritningar per månad",
      "Alla exportformat",
      "Projekthistorik",
      "E-postsupport",
    ],
    cta: "Välj Pro",
  },
  {
    id: "business",
    name: "Business",
    price: 799,
    period: "månad",
    features: [
      "100 ritningar per månad",
      "Team-funktioner (3 användare)",
      "Prioriterad support",
      "API-access (beta)",
    ],
    cta: "Välj Business",
  },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Vilka filformat stöds?",
    answer: "Vi stöder PDF (rekommenderat), PNG och JPEG. För bäst resultat, använd PDF-filer direkt från CAD-program eller skannade ritningar med hög upplösning.",
  },
  {
    question: "Hur exakt är AI:n?",
    answer: "Vår AI har över 90% träffsäkerhet på rumsidentifiering och ytberäkning. Du kan alltid granska och justera resultaten innan export.",
  },
  {
    question: "Kan jag använda Plandata för alla typer av ritningar?",
    answer: "Plandata är optimerat för svenska bygglovsritningar och planritningar. Det fungerar bäst för bostäder, kontor och mindre kommersiella byggnader.",
  },
  {
    question: "Är min data säker?",
    answer: "Ja. Vi lagrar data på servrar inom EU och följer GDPR. Du kan när som helst radera dina ritningar och data.",
  },
  {
    question: "Kan jag avbryta min prenumeration?",
    answer: "Absolut. Du kan uppgradera, nedgradera eller avsluta när som helst. Inga bindningstider.",
  },
]

export const CTA_SECTION = {
  headline: "Redo att sluta mäta manuellt?",
  subheadline: "Skapa ett gratis konto och analysera din första ritning på under 5 minuter.",
  cta: "Kom igång gratis →",
  microCopy: "Inget kreditkort krävs • 2 ritningar gratis varje månad",
}

export const FOOTER = {
  tagline: "Från ritning till kalkyl på minuter.",
  columns: {
    product: {
      title: "Produkt",
      links: [
        { label: "Funktioner", href: "/#features" },
        { label: "Priser", href: "/#pricing" },
      ],
    },
    company: {
      title: "Företag",
      links: [
        { label: "Kontakt", href: "/contact" },
      ],
    },
    legal: {
      title: "Juridiskt",
      links: [
        { label: "Användarvillkor", href: "/terms" },
        { label: "Integritetspolicy", href: "/privacy" },
        { label: "GDPR", href: "/gdpr" },
      ],
    },
  },
  copyright: "© 2025 Plandata. Alla rättigheter förbehållna.",
}
