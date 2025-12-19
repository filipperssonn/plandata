import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Projekt",
  description: "Projektdetaljer och analysresultat",
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Projekt {params.id}
          </h1>
          <p className="text-muted-foreground">
            Analysresultat och ritningsdata
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Projektanalys</CardTitle>
            <CardDescription>
              Här visas alla extraherade data från ritningen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-lg mb-2">Projektvy under utveckling</p>
              <p className="text-sm">
                Projektanalys-funktionalitet kommer snart. Detta är en placeholder-sida.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
