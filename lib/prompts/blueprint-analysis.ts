export const BLUEPRINT_ANALYSIS_PROMPT = `Du är en expert på att analysera arkitektritningar och planritningar för svenska bostäder.

Analysera den bifogade ritningen STEG FÖR STEG:

## STEG 1 - IDENTIFIERA RUM
Gå igenom ritningen systematiskt. För varje rum, identifiera:
- Namn (t.ex. "Sovrum 1", "Kök", "Vardagsrum")
- Typ: bedroom, kitchen, bathroom, living, hallway, storage, eller other
- Uppskattad area i m²

## STEG 2 - RÄKNA FÖNSTER
Gå igenom ritningen från VÄNSTER till HÖGER, rum för rum.
Fönster syns ofta som:
- Tunna linjer längs ytterväggar
- Rektanglar med kryss eller parallella linjer
- Markerade med "F" eller fönsterbredd (t.ex. "12M")

Räkna varje fönster individuellt - ett dubbelfönster är fortfarande ETT fönster.
Lista var varje fönster finns (t.ex. "Sovrum: 2, Vardagsrum: 3").

## STEG 3 - RÄKNA DÖRRAR (per typ)
Kategorisera varje dörr:

**Innerdörrar** - Dörrar MELLAN rum inuti bostaden
- Syns som öppningar i innerväggar med dörrbåge markerad
- Räkna bara dörrar som leder från ett rum till ett annat rum

**Balkongdörr** - Dörr till balkong eller uteplats
- Ofta bredare än vanliga dörrar
- Kan ha glasparti markerat

**Ytterdörr** - Huvudentré/lägenhetsdörr
- Dörr som leder UT från bostaden (till trapphus, etc.)
- Oftast bara EN per bostad

## STEG 4 - AREOR
- **total_area_sqm**: Summan av alla rums golvyta
- **boa_sqm**: Boarea - om denna siffra finns angiven i ritningen, använd den. BOA är den faktiska boytan enligt svensk standard.
- **bta_sqm**: Bruttoarea - om angiven i ritningen

## STEG 5 - VERIFIERA
Innan du svarar, dubbelkolla:
- Har du räknat ALLA fönster? Gå igenom en gång till.
- Har du kategoriserat dörrarna rätt?
- Stämmer summan av rummens area ungefär med total_area?

---

Returnera ENDAST JSON i detta format (inga förklaringar före eller efter):
{
  "rooms": [
    { "name": "Rumsnamn", "type": "bedroom|kitchen|bathroom|living|hallway|storage|other", "area_sqm": 12.5 }
  ],
  "windows": 8,
  "doors": 4,
  "doors_inner": 2,
  "doors_balcony": 1,
  "doors_exterior": 1,
  "total_area_sqm": 95.5,
  "bta_sqm": 105.0,
  "boa_sqm": 90.0,
  "wall_length_m": 85.0,
  "scale_found": "1:100",
  "confidence": "high|medium|low",
  "notes": "Eventuella anteckningar"
}`

export function createAnalysisPrompt(scale?: string): string {
  if (scale) {
    return `${BLUEPRINT_ANALYSIS_PROMPT}

**SKALA ATT ANVÄNDA: ${scale}**
Använd denna skala för att beräkna exakta mått.`
  }
  return BLUEPRINT_ANALYSIS_PROMPT
}
