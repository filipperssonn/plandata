import type { Metadata } from "next"
import { Pricing } from "@/components/landing/pricing"

export const metadata: Metadata = {
  title: "Priser",
  description: "Enkel prissättning. Börja gratis med 2 ritningar/månad.",
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <Pricing />
        </div>
      </div>
    </div>
  )
}
