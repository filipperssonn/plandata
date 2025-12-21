"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, FileText, FileDown, Loader2 } from "lucide-react"

interface ExportButtonsProps {
  projectId: string
  projectName: string
}

export function ExportButtons({ projectId, projectName }: ExportButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleExport = async (format: "excel" | "csv" | "pdf") => {
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

      const extensions: Record<string, string> = {
        excel: "xlsx",
        csv: "csv",
        pdf: "pdf"
      }
      a.download = `${projectName.replace(/\s+/g, "_")}_analys.${extensions[format]}`
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
        onClick={() => handleExport("pdf")}
        disabled={loading !== null}
        aria-label="Exportera till PDF"
      >
        {loading === "pdf" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <FileDown className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        PDF
      </Button>
      <Button
        variant="outline"
        onClick={() => handleExport("excel")}
        disabled={loading !== null}
        aria-label="Exportera till Excel"
      >
        {loading === "excel" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <FileSpreadsheet className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        Excel
      </Button>
      <Button
        variant="outline"
        onClick={() => handleExport("csv")}
        disabled={loading !== null}
        aria-label="Exportera till CSV"
      >
        {loading === "csv" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        CSV
      </Button>
    </div>
  )
}
