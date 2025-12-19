import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Inställningar",
  description: "Hantera ditt konto och prenumeration",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Inställningar</h1>
          <p className="text-muted-foreground">
            Hantera ditt konto, prenumeration och preferenser
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Kontoinställningar</CardTitle>
            <CardDescription>
              Uppdatera din profil och preferenser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-lg mb-2">Inställningar under utveckling</p>
              <p className="text-sm">
                Inställningssida kommer snart. Detta är en placeholder-sida.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
