import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Registrera dig",
  description: "Skapa ett gratis Plandata-konto",
}

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Kom igång gratis</CardTitle>
        <CardDescription>
          Skapa ditt Plandata-konto på några sekunder
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Registreringsfunktionalitet kommer snart. Detta är en placeholder-sida.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" disabled>
          Skapa konto
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Har du redan ett konto?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Logga in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
