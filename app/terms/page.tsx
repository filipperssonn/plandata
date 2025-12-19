import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Användarvillkor",
  description: "Användarvillkor för Plandata",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tillbaka till startsidan
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-slate-900 mb-8">
            Användarvillkor
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                1. Allmänt
              </h2>
              <p className="text-slate-700 mb-4">
                Välkommen till Plandata. Genom att använda våra tjänster godkänner
                du dessa användarvillkor. Läs dem noggrant innan du börjar använda
                Plandata.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                2. Tjänstebeskrivning
              </h2>
              <p className="text-slate-700 mb-4">
                Plandata är en AI-driven tjänst som extraherar strukturerad data från
                bygglovsritningar och arkitektplaner. Tjänsten tillhandahålls "som
                den är" och vi förbehåller oss rätten att uppdatera och förbättra
                tjänsten löpande.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                3. Användarkonto
              </h2>
              <p className="text-slate-700 mb-4">
                För att använda Plandata måste du skapa ett användarkonto. Du är
                ansvarig för att hålla dina inloggningsuppgifter säkra och för all
                aktivitet som sker via ditt konto.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                4. Prenumerationer och betalning
              </h2>
              <p className="text-slate-700 mb-4">
                Plandata erbjuder olika prenumerationsnivåer. Betalning sker månadsvis
                via Stripe. Du kan när som helst avsluta din prenumeration utan
                bindningstid.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                5. Immateriella rättigheter
              </h2>
              <p className="text-slate-700 mb-4">
                Du behåller alla rättigheter till de ritningar och data du laddar upp.
                Plandata äger rättigheterna till själva plattformen och AI-teknologin.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                6. Ansvarsbegränsning
              </h2>
              <p className="text-slate-700 mb-4">
                Plandata ansvarar inte för eventuella fel eller brister i extraherad
                data. Du är själv ansvarig för att verifiera och granska all data innan
                användning i produktionsmiljö.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                7. Uppsägning
              </h2>
              <p className="text-slate-700 mb-4">
                Vi förbehåller oss rätten att avsluta eller suspendera ditt konto om du
                bryter mot dessa användarvillkor.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                8. Kontakt
              </h2>
              <p className="text-slate-700 mb-4">
                Vid frågor om användarvillkoren, vänligen kontakta oss via vårt{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  kontaktformulär
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
