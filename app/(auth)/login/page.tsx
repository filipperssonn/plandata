"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signIn } from "@/app/actions/auth"
import { Loader2 } from "lucide-react"

function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")
  const urlError = searchParams.get("error")

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    if (redirect) {
      formData.append("redirect", redirect)
    }

    const result = await signIn(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Logga in</CardTitle>
        <CardDescription>
          Välkommen tillbaka till Plandata
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          {(error || urlError) && (
            <Alert variant="destructive">
              <AlertDescription>{error || urlError}</AlertDescription>
            </Alert>
          )}

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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Lösenord</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Glömt lösenord?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loggar in...
              </>
            ) : (
              "Logga in"
            )}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Har du inget konto?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Registrera dig
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg" />}>
      <LoginForm />
    </Suspense>
  )
}
