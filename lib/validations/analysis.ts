import { z } from "zod"

export const RoomTypeSchema = z.enum([
  "bedroom",
  "kitchen",
  "bathroom",
  "living",
  "hallway",
  "storage",
  "other"
])

export const RoomSchema = z.object({
  name: z.string().min(1),
  type: RoomTypeSchema,
  area_sqm: z.number().min(0).max(500)
})

export const AIAnalysisResponseSchema = z.object({
  rooms: z.array(RoomSchema).min(1),
  windows: z.number().int().min(0).max(100),
  doors: z.number().int().min(0).max(100),
  doors_inner: z.number().int().min(0).max(50).optional(),
  doors_balcony: z.number().int().min(0).max(10).optional(),
  doors_exterior: z.number().int().min(0).max(10).optional(),
  total_area_sqm: z.number().min(0).max(10000).nullable(),
  bta_sqm: z.number().min(0).max(10000).nullable(),
  boa_sqm: z.number().min(0).max(10000).nullable(),
  wall_length_m: z.number().min(0).max(10000).nullable(),
  scale_found: z.string().optional(),
  confidence: z.enum(["high", "medium", "low"]).optional(),
  notes: z.string().optional()
})

export type AIAnalysisResponse = z.infer<typeof AIAnalysisResponseSchema>
export type Room = z.infer<typeof RoomSchema>
export type RoomType = z.infer<typeof RoomTypeSchema>

export function parseAndValidateAnalysis(jsonString: string): AIAnalysisResponse {
  // Try to extract JSON from the response (in case there's extra text)
  const jsonMatch = jsonString.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error("Kunde inte hitta JSON i AI-svaret")
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(jsonMatch[0])
  } catch {
    throw new Error("Kunde inte tolka JSON från AI-svaret")
  }

  const result = AIAnalysisResponseSchema.safeParse(parsed)
  if (!result.success) {
    const issues = result.error.issues
    console.error("Validation errors:", issues)
    throw new Error(`Ogiltigt analysformat: ${issues[0]?.message || "Okänt fel"}`)
  }

  return result.data
}
