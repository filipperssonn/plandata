"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUpload } from "@/components/app/file-upload"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function NewProjectPage() {
  const [projectName, setProjectName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!projectName.trim()) {
      setError("Ange ett projektnamn")
      return
    }

    if (!selectedFile) {
      setError("Välj en fil att ladda upp")
      return
    }

    setIsUploading(true)

    try {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("Du måste vara inloggad")
        setIsUploading(false)
        return
      }

      // Create project
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
          name: projectName.trim(),
          status: "pending",
        })
        .select()
        .single()

      if (projectError) {
        throw projectError
      }

      // Upload file to storage
      const fileExt = selectedFile.name.split(".").pop()
      const filePath = `${user.id}/${project.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("blueprints")
        .upload(filePath, selectedFile)

      if (uploadError) {
        // Delete project if upload fails
        await supabase.from("projects").delete().eq("id", project.id)
        throw uploadError
      }

      // Create project file record
      const { error: fileRecordError } = await supabase
        .from("project_files")
        .insert({
          project_id: project.id,
          file_name: selectedFile.name,
          file_type: selectedFile.type,
          file_size: selectedFile.size,
          storage_path: filePath,
        })

      if (fileRecordError) {
        throw fileRecordError
      }

      // Trigger mock analysis
      await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      })

      // Redirect to project page
      router.push(`/project/${project.id}`)
    } catch (err: any) {
      console.error("Upload error:", err)
      setError(err.message || "Något gick fel vid uppladdningen")
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Tillbaka till dashboard
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Nytt projekt</CardTitle>
          <CardDescription>
            Ladda upp en ritning för att analysera den med AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="projectName">Projektnamn</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="T.ex. Villa Andersson"
                disabled={isUploading}
              />
            </div>

            <div className="space-y-2">
              <Label>Ritning</Label>
              <FileUpload
                onFileSelect={setSelectedFile}
                isUploading={isUploading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isUploading || !projectName.trim() || !selectedFile}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Laddar upp och analyserar...
                </>
              ) : (
                "Ladda upp och analysera"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
