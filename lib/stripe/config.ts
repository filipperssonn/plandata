export const STRIPE_PLANS = {
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    name: "Pro",
    price: 299,
    monthlyUploads: 20,
  },
  business: {
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID!,
    name: "Business",
    price: 799,
    monthlyUploads: 100,
  },
} as const

export type StripePlanId = keyof typeof STRIPE_PLANS
