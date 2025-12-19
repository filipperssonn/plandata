"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signUp } from "@/app/actions/auth"
import { Loader2, Check } from "lucide-react"
import { PRICING_PLANS } from "@/lib/constants"

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan")

  const selectedPlan = PRICING_PLANS.find(p => p.id === planId) || PRICING_PLANS[0]

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setSuccess(null)

    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Lösenordet måste vara minst 6 tecken")
      setLoading(false)
      return
    }

    const result = await signUp(formData)

    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      setSuccess(result.success)
    }

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Kom igång gratis</CardTitle>
        <CardDescription>
          Skapa ditt Plandata-konto på några sekunder
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="success">
              <Check className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {!success && (
            <>
              {planId && (
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <p className="text-sm font-medium">Vald plan: {selectedPlan.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedPlan.price === 0
                      ? "Gratis"
                      : `${selectedPlan.price} kr/${selectedPlan.period}`}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">Namn</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Ditt namn"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-post</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="namn@exempel.se"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Lösenord</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minst 6 tecken"
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Bekräfta lösenord</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Upprepa lösenordet"
                  required
                  autoComplete="new-password"
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {!success && (
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Skapar konto...
                </>
              ) : (
                "Skapa konto"
              )}
            </Button>
          )}
          <p className="text-sm text-center text-muted-foreground">
            Har du redan ett konto?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Logga in
            </Link>
          </p>
          <p className="text-xs text-center text-muted-foreground">
            Genom att registrera dig godkänner du våra{" "}
            <Link href="/terms" className="underline hover:text-primary">
              användarvillkor
            </Link>{" "}
            och{" "}
            <Link href="/privacy" className="underline hover:text-primary">
              integritetspolicy
            </Link>
            .
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
