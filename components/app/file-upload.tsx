"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  isUploading?: boolean
  accept?: Record<string, string[]>
  maxSize?: number
}

export function FileUpload({
  onFileSelect,
  isUploading = false,
  accept = {
    "application/pdf": [".pdf"],
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
  },
  maxSize = 50 * 1024 * 1024, // 50MB
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null)

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0]
        if (rejection.errors[0]?.code === "file-too-large") {
          setError("Filen är för stor. Max 50MB.")
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Ogiltigt filformat. Använd PDF, PNG eller JPEG.")
        } else {
          setError("Kunde inte ladda upp filen.")
        }
        return
      }

      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0])
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    disabled: isUploading,
  })

  const removeFile = () => {
    setSelectedFile(null)
    setError(null)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-slate-300 dark:border-slate-700 hover:border-primary/50",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
            <Upload className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
          {isDragActive ? (
            <p className="text-sm text-primary font-medium">Släpp filen här...</p>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Dra och släpp din ritning här
              </p>
              <p className="text-xs text-muted-foreground">
                eller klicka för att välja fil
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                PDF, PNG eller JPEG (max 50MB)
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}

      {selectedFile && !error && (
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="flex items-center gap-3">
            <File className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          {!isUploading && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {isUploading && (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          )}
        </div>
      )}
    </div>
  )
}
