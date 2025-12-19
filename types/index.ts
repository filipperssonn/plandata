export interface PricingPlan {
  id: "free" | "pro" | "business"
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

export interface HowItWorksStep {
  step: number
  title: string
  description: string
  icon: string
}

export interface SocialProofStat {
  value: string
  label: string
}
