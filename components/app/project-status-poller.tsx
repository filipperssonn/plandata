"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface ProjectStatusPollerProps {
  projectId: string
  status: string
}

export function ProjectStatusPoller({ projectId, status }: ProjectStatusPollerProps) {
  const router = useRouter()

  useEffect(() => {
    // Only poll if status is pending or processing
    if (status !== "pending" && status !== "processing") {
      return
    }

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/project-status?projectId=${projectId}`)
        const data = await response.json()

        if (data.status !== status) {
          // Status changed, refresh the page
          router.refresh()
        }
      } catch (error) {
        console.error("Polling error:", error)
      }
    }, 2000) // Poll every 2 seconds

    return () => clearInterval(pollInterval)
  }, [projectId, status, router])

  return null
}
