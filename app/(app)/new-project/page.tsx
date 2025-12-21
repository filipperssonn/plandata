"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUpload } from "@/components/app/file-upload"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function NewProjectPage() {
  const [projectName, setProjectName] = useState("")
  const [scale, setScale] = useState("")
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

      // Trigger AI analysis
      const analyzeRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          scale: scale.trim() || undefined
        }),
      })

      if (!analyzeRes.ok) {
        const errorData = await analyzeRes.json()
        
        // Clean up: delete project file and project since analysis failed
        await supabase.storage.from("blueprints").remove([filePath])
        await supabase.from("projects").delete().eq("id", project.id)
        
        throw new Error(errorData.error || "Misslyckades att påbörja analysen")
      }

      // Redirect to project page
      router.push(`/project/${project.id}`)
    } catch (err: any) {
      console.error("Upload error:", err)
      setError(err.message || "Något gick fel vid uppladdningen")
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Nytt projekt
        </h1>
        <p className="text-lg text-muted-foreground">
          Ladda upp en ritning för att analysera den med AI
        </p>
      </div>

      <Card>
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-xl">Projektinformation</CardTitle>
          <CardDescription className="text-base">
            Fyll i projektnamn och ladda upp din ritning
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertDescription className="text-base">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label htmlFor="projectName" className="text-base">Projektnamn</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="T.ex. Villa Andersson"
                disabled={isUploading}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="scale" className="text-base">
                Skala <span className="text-muted-foreground font-normal">(valfritt)</span>
              </Label>
              <Input
                id="scale"
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                placeholder="T.ex. 1:100"
                disabled={isUploading}
                className="h-12 text-base"
              />
              <p className="text-sm text-muted-foreground">
                Om du anger skalan kan AI:n beräkna exakta ytor. Lämna tomt för automatisk detektering.
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-base">Ritning</Label>
              <FileUpload
                onFileSelect={setSelectedFile}
                isUploading={isUploading}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-base h-12"
              disabled={isUploading || !projectName.trim() || !selectedFile}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
