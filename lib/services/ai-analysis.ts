import { createAnalysisPrompt } from "@/lib/prompts/blueprint-analysis"
import { parseAndValidateAnalysis, type AIAnalysisResponse } from "@/lib/validations/analysis"

const MAX_RETRIES = 2
const RETRY_DELAY_MS = 1000

interface AnalyzeOptions {
  scale?: string
  fileBuffer: Buffer
  mimeType: string
}

interface AnalysisResult {
  rooms: AIAnalysisResponse["rooms"]
  windows: number
  doors: number
  total_area_sqm: number | null
  bta_sqm: number | null
  boa_sqm: number | null
  wall_length_m: number | null
  raw_data: AIAnalysisResponse
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function analyzeBlueprint(options: AnalyzeOptions): Promise<AnalysisResult> {
  const { scale, fileBuffer, mimeType } = options

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY är inte konfigurerad")
  }

  const prompt = createAnalysisPrompt(scale)
  const base64Data = fileBuffer.toString("base64")
  const dataUrl = `data:${mimeType};base64,${base64Data}`

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`Försök ${attempt + 1} av ${MAX_RETRIES + 1}...`)
        await sleep(RETRY_DELAY_MS * attempt)
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "",
          "X-Title": "Plandata"
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: dataUrl
                  }
                },
                {
                  type: "text",
                  text: prompt
                }
              ]
            }
          ],
          temperature: 0.1,
          max_tokens: 4096
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`OpenRouter API error: ${response.status} - ${JSON.stringify(errorData)}`)
      }

      const data = await response.json()
      const text = data.choices?.[0]?.message?.content

      if (!text) {
        throw new Error("Tom respons från AI")
      }

      // Parse and validate the response
      const analysis = parseAndValidateAnalysis(text)

      // Calculate total_area if not provided
      const calculatedTotalArea = analysis.rooms.reduce(
        (sum, room) => sum + room.area_sqm,
        0
      )

      return {
        rooms: analysis.rooms,
        windows: analysis.windows,
        doors: analysis.doors,
        total_area_sqm: analysis.total_area_sqm ?? Math.round(calculatedTotalArea * 10) / 10,
        bta_sqm: analysis.bta_sqm,
        boa_sqm: analysis.boa_sqm,
        wall_length_m: analysis.wall_length_m,
        raw_data: analysis
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      console.error(`Analysfel (försök ${attempt + 1}):`, lastError.message)

      // Don't retry on validation errors
      if (lastError.message.includes("Ogiltigt analysformat") ||
          lastError.message.includes("Kunde inte")) {
        break
      }
    }
  }

  throw lastError || new Error("Okänt fel vid analys")
}
