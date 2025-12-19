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

// Database Types
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: 'free' | 'pro' | 'business'
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_start: string | null
  current_period_end: string | null
  monthly_uploads_used: number
  monthly_uploads_limit: number
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  updated_at: string
  analysis_results?: AnalysisResult[]
  project_files?: ProjectFile[]
}

export interface ProjectFile {
  id: string
  project_id: string
  file_name: string
  file_type: string
  file_size: number
  storage_path: string
  created_at: string
}

export interface AnalysisResult {
  id: string
  project_id: string
  rooms: Room[]
  windows: number
  doors: number
  total_area_sqm: number | null
  bta_sqm: number | null
  boa_sqm: number | null
  wall_length_m: number | null
  raw_data: Record<string, unknown>
  created_at: string
}

export interface Room {
  name: string
  area_sqm: number
  type: 'bedroom' | 'kitchen' | 'bathroom' | 'living' | 'hallway' | 'storage' | 'other'
}
