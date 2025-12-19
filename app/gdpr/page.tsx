import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "GDPR Information",
  description: "GDPR och dataskydd för Plandata",
}

export default function GDPRPage() {
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
            GDPR & Dataskydd
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                GDPR-efterlevnad
              </h2>
              <p className="text-slate-700 mb-4">
                Plandata följer EU:s dataskyddsförordning (GDPR) och är dedikerade
                till att skydda dina personuppgifter och din integritet.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Personuppgiftsansvarig
              </h2>
              <p className="text-slate-700 mb-4">
                Plandata är personuppgiftsansvarig för behandlingen av dina
                personuppgifter. Det innebär att vi ansvarar för att dina uppgifter
                behandlas enligt gällande lagstiftning.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Laglig grund för behandling
              </h2>
              <p className="text-slate-700 mb-4">
                Vi behandlar dina personuppgifter baserat på följande lagliga grunder:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>
                  <strong>Avtal:</strong> För att tillhandahålla våra tjänster enligt
                  avtalet med dig
                </li>
                <li>
                  <strong>Berättigat intresse:</strong> För att förbättra och utveckla
                  våra tjänster
                </li>
                <li>
                  <strong>Samtycke:</strong> För marknadsföring och nyhetsbrev (om du
                  har givit samtycke)
                </li>
                <li>
                  <strong>Rättslig förpliktelse:</strong> För att uppfylla lagkrav
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Dina rättigheter enligt GDPR
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Rätt till tillgång
                  </h3>
                  <p className="text-slate-700">
                    Du har rätt att få en kopia av alla personuppgifter vi har om dig.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Rätt till rättelse
                  </h3>
                  <p className="text-slate-700">
                    Du kan begära att vi rättar felaktiga eller ofullständiga uppgifter.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Rätt till radering
                  </h3>
                  <p className="text-slate-700">
                    Du kan begära att vi raderar dina personuppgifter under vissa
                    omständigheter.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Rätt till begränsning
                  </h3>
                  <p className="text-slate-700">
                    Du kan begära att vi begränsar behandlingen av dina uppgifter.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Rätt till dataportabilitet
                  </h3>
                  <p className="text-slate-700">
                    Du har rätt att få ut dina uppgifter i ett strukturerat format och
                    överföra dem till en annan tjänst.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Rätt att invända
                  </h3>
                  <p className="text-slate-700">
                    Du kan invända mot behandling av dina personuppgifter som baseras på
                    berättigat intresse.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Hur länge sparar vi dina uppgifter?
              </h2>
              <p className="text-slate-700 mb-4">
                Vi sparar dina personuppgifter endast så länge som nödvändigt:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>
                  Kontoinformation: Så länge ditt konto är aktivt plus 12 månader
                </li>
                <li>Uppladdade ritningar: Så länge ditt konto är aktivt</li>
                <li>Bokföringsuppgifter: 7 år enligt bokföringslagen</li>
                <li>Marknadsföringsdata: Tills du återkallar ditt samtycke</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Dataöverföringar utanför EU
              </h2>
              <p className="text-slate-700 mb-4">
                All data lagras på servrar inom EU. Vi överför inte personuppgifter
                utanför EU/EES-området.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Säkerhetsåtgärder
              </h2>
              <p className="text-slate-700 mb-4">
                Vi har implementerat tekniska och organisatoriska säkerhetsåtgärder för
                att skydda dina personuppgifter:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>End-to-end kryptering av data</li>
                <li>Regelbundna säkerhetsuppdateringar</li>
                <li>Åtkomstkontroll och behörighetssystem</li>
                <li>Regelbundna säkerhetskopior</li>
                <li>Säkerhetsgranskningar och penetrationstester</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Utöva dina rättigheter
              </h2>
              <p className="text-slate-700 mb-4">
                För att utöva någon av dina GDPR-rättigheter, vänligen kontakta oss
                via vårt{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  kontaktformulär
                </Link>
                . Vi kommer att svara på din förfrågan inom 30 dagar.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Klagomål
              </h2>
              <p className="text-slate-700 mb-4">
                Om du anser att vi behandlar dina personuppgifter i strid med GDPR har
                du rätt att lämna in ett klagomål till Integritetsskyddsmyndigheten
                (IMY).
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
