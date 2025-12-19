import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Logga in",
  description: "Logga in på ditt Plandata-konto",
}

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Logga in</CardTitle>
        <CardDescription>
          Välkommen tillbaka till Plandata
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Inloggningsfunktionalitet kommer snart. Detta är en placeholder-sida.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" disabled>
          Logga in
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Har du inget konto?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Registrera dig
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
