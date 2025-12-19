"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, FileText, Loader2 } from "lucide-react"

interface ExportButtonsProps {
  projectId: string
  projectName: string
}

export function ExportButtons({ projectId, projectName }: ExportButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleExport = async (format: "excel" | "csv") => {
    setLoading(format)
    try {
      const response = await fetch(`/api/export/${format}?projectId=${projectId}`)

      if (!response.ok) {
        throw new Error("Export failed")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${projectName.replace(/\s+/g, "_")}_analys.${format === "excel" ? "xlsx" : "csv"}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Export error:", error)
      alert("Kunde inte exportera. Försök igen.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => handleExport("excel")}
        disabled={loading !== null}
      >
        {loading === "excel" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileSpreadsheet className="mr-2 h-4 w-4" />
        )}
        Excel
      </Button>
      <Button
        variant="outline"
        onClick={() => handleExport("csv")}
        disabled={loading !== null}
      >
        {loading === "csv" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileText className="mr-2 h-4 w-4" />
        )}
        CSV
      </Button>
    </div>
  )
}
