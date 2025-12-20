"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Check } from "lucide-react"
import type { Profile } from "@/types"
import { createClient } from "@/lib/supabase/client"

interface ProfileFormProps {
  profile: Profile
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [fullName, setFullName] = useState(profile.full_name || "")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ full_name: fullName.trim() })
        .eq("id", profile.id)

      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      console.error("Profile update error:", err)
      setError(err.message || "Kunde inte uppdatera profilen")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="p-8 pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-primary-50 dark:bg-primary-700/20 rounded-xl">
            <User className="h-6 w-6 text-primary dark:text-primary-100" />
          </div>
          Profil
        </CardTitle>
        <CardDescription className="text-base">
          Uppdatera din profilinformation
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="success">
              <Check className="h-5 w-5" />
              <AlertDescription className="text-base">Profilen har uppdaterats!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Label htmlFor="email" className="text-base">E-post</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              disabled
              className="h-12 text-base bg-slate-50 dark:bg-slate-800"
            />
            <p className="text-sm text-muted-foreground">
              E-postadressen kan inte ändras
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="fullName" className="text-base">Namn</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ditt namn"
              className="h-12 text-base"
            />
          </div>

          <Button type="submit" size="lg" className="text-base" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sparar...
              </>
            ) : (
              "Spara ändringar"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
