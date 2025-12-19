import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description: "Integritetspolicy för Plandata",
}

export default function PrivacyPage() {
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
            Integritetspolicy
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                1. Inledning
              </h2>
              <p className="text-slate-700 mb-4">
                Plandata värnar om din integritet. Denna policy beskriver hur vi
                samlar in, använder och skyddar dina personuppgifter.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                2. Vilka uppgifter samlar vi in?
              </h2>
              <p className="text-slate-700 mb-4">
                Vi samlar in följande typer av uppgifter:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Kontaktuppgifter (namn, e-postadress, telefonnummer)</li>
                <li>Företagsinformation</li>
                <li>Uppladdade ritningar och dokument</li>
                <li>Användningsdata och analysresultat</li>
                <li>Betalningsinformation (hanteras av Stripe)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                3. Hur använder vi dina uppgifter?
              </h2>
              <p className="text-slate-700 mb-4">
                Vi använder dina personuppgifter för att:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Tillhandahålla och förbättra våra tjänster</li>
                <li>Processera och analysera dina ritningar</li>
                <li>Kommunicera med dig om din prenumeration</li>
                <li>Skicka viktiga uppdateringar och information</li>
                <li>Förbättra vår AI-teknologi (anonymiserad data)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                4. Datalagring och säkerhet
              </h2>
              <p className="text-slate-700 mb-4">
                Alla dina data lagras säkert på servrar inom EU. Vi använder
                branschstandard kryptering och säkerhetsåtgärder för att skydda dina
                uppgifter. Du kan när som helst radera dina ritningar och data från
                vår plattform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                5. Delning av uppgifter
              </h2>
              <p className="text-slate-700 mb-4">
                Vi delar aldrig dina personuppgifter eller ritningar med tredje part,
                förutom:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>
                  Betalningsleverantörer (Stripe) för att hantera prenumerationer
                </li>
                <li>
                  Cloud-leverantörer (Supabase) för säker datalagring
                </li>
                <li>När det krävs enligt lag</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                6. Dina rättigheter
              </h2>
              <p className="text-slate-700 mb-4">
                Enligt GDPR har du rätt att:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Få tillgång till dina personuppgifter</li>
                <li>Rätta felaktiga uppgifter</li>
                <li>Radera dina uppgifter</li>
                <li>Invända mot behandling av dina uppgifter</li>
                <li>Flytta dina uppgifter till en annan tjänst</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                7. Cookies
              </h2>
              <p className="text-slate-700 mb-4">
                Vi använder nödvändiga cookies för att säkerställa att webbplatsen
                fungerar korrekt. Vi använder inte spårningscookies eller
                tredjepartscookies för marknadsföring.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                8. Kontakt
              </h2>
              <p className="text-slate-700 mb-4">
                Vid frågor om vår integritetspolicy eller för att utöva dina
                rättigheter, kontakta oss via vårt{" "}
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
