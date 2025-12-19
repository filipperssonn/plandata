import Link from "next/link"
import { Logo } from "@/components/shared/logo"
import { Separator } from "@/components/ui/separator"
import { FOOTER } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Produkt & Kontakt */}
          <div className="space-y-8">
            {/* Produkt */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                {FOOTER.columns.product.title}
              </h3>
              <ul className="space-y-3">
                {FOOTER.columns.product.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                {FOOTER.columns.company.title}
              </h3>
              <ul className="space-y-3">
                {FOOTER.columns.company.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center Column: Logo & Tagline */}
          <div className="flex flex-col items-center text-center space-y-4 lg:py-8">
            <div className="filter brightness-0 invert">
              <Logo variant="full" />
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              {FOOTER.tagline}
            </p>
          </div>

          {/* Right Column: Juridiskt */}
          <div className="lg:text-right space-y-4">
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              {FOOTER.columns.legal.title}
            </h3>
            <ul className="space-y-3">
              {FOOTER.columns.legal.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Copyright */}
        <div className="text-center text-sm text-slate-400">
          {FOOTER.copyright}
        </div>
      </div>
    </footer>
  )
}
