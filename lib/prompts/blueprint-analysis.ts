export const BLUEPRINT_ANALYSIS_PROMPT = `Du är en expert på att analysera arkitektritningar och planritningar för svenska bostäder.

Analysera den bifogade ritningen STEG FÖR STEG:

## STEG 1 - IDENTIFIERA RUM
Gå igenom ritningen systematiskt. För varje rum, identifiera:
- Namn (t.ex. "Sovrum 1", "Kök", "Vardagsrum")
- Typ - VÄLJ EXAKT EN av följande:
  * bedroom - Sovrum, gästrum, master bedroom
  * kitchen - Kök, pentry (om fullt utrustat)
  * bathroom - Badrum, WC, toalett, duschrum
  * living - Vardagsrum, allrum, TV-rum
  * hallway - Hall, entré, korridor
  * storage - Förråd, klädvård, garderob (separat rum)
  * other - Balkong, uteplats, tvättstuga, annat
- Uppskattad area i m²

VIKTIGT: Var konsekvent med typerna. Ett "WC" är ALLTID "bathroom", aldrig "other". En balkong är ALLTID "other".

## STEG 1.5 - BERÄKNA RUMSRÄKNING
Räkna antal rum enligt svensk bostadsstandard:
- RUM = Endast sovrum (bedroom) och vardagsrum (living)
- Kök (kitchen) räknas SEPARAT
- RÄKNAS INTE SOM RUM: Balkong, förråd, hall, WC, badrum

Skapa en sammanfattning i formatet "X rum + kök" (t.ex. "3 rum + kök").
Om det finns 2 sovrum + 1 vardagsrum + kök = "3 rum + kök"
Om det inte finns kök, skriv bara "X rum" (t.ex. "2 rum")

## STEG 2 - RÄKNA FÖNSTER
Gå igenom ritningen från VÄNSTER till HÖGER, rum för rum.
Fönster syns ofta som:
- Tunna linjer längs ytterväggar
- Rektanglar med kryss eller parallella linjer
- Markerade med "F" eller fönsterbredd (t.ex. "12M")

Räkna varje fönster individuellt - ett dubbelfönster är fortfarande ETT fönster.
Lista var varje fönster finns (t.ex. "Sovrum: 2, Vardagsrum: 3").

## STEG 3 - RÄKNA DÖRRAR (per typ)
VIKTIGT: Dörrar visas på ritningar som en båge/arc som visar dörrens öppningsriktning. Leta efter:
- En linje med en kvartscirkel/båge som visar hur dörren svänger
- Öppningar i väggar med dörrmarkering
- Text som "D" eller dörrbredder (t.ex. "9M", "10M")

Gå igenom VARJE rum och räkna dörrar som leder IN eller UT från rummet.

**Innerdörrar** (doors_inner) - Dörrar MELLAN rum inuti bostaden
- Dörr från Hall till Sovrum = 1 innerdörr
- Dörr från Hall till Badrum = 1 innerdörr
- Dörr från Hall till Kök = 1 innerdörr (om det finns dörr, inte öppen planlösning)
- Dörr till klädkammare/förråd = 1 innerdörr
- RÄKNA VARJE DÖRR SOM LEDER MELLAN TVÅ RUM

**Balkongdörr** (doors_balcony) - Dörr till balkong eller uteplats
- Leder från ett rum (oftast vardagsrum) till balkong
- Ofta bredare än vanliga dörrar, kan vara pardörr
- Om balkongen är åtkomlig = minst 1 balkongdörr

**Ytterdörr** (doors_exterior) - Huvudentré/lägenhetsdörr
- Dörr som leder UT från bostaden till trapphus/utomhus
- Oftast placerad vid hallen/entrén
- Vanligtvis EXAKT 1 per lägenhet

EXEMPEL: En 3-rumslägenhet har typiskt:
- 1 ytterdörr (till trapphus)
- 1 balkongdörr (till balkong)
- 5-7 innerdörrar (till sovrum, badrum, kök, förråd, etc.)

## STEG 4 - AREOR
- **total_area_sqm**: Summan av alla rums golvyta
- **boa_sqm**: Boarea - om denna siffra finns angiven i ritningen, använd den. BOA är den faktiska boytan enligt svensk standard.
- **bta_sqm**: Bruttoarea - om angiven i ritningen

## STEG 5 - VERIFIERA
Innan du svarar, dubbelkolla:
- Har du räknat ALLA fönster? Gå igenom en gång till.
- DÖRRAR: Kontrollera att doors_inner + doors_balcony + doors_exterior = doors (totalt)
- DÖRRAR: Om du har balkong i rumslistan MÅSTE doors_balcony vara minst 1
- DÖRRAR: doors_exterior bör vara minst 1 (varje bostad har en ytterdörr)
- DÖRRAR: Varje rum (utom öppna ytor) har normalt minst en dörr
- Stämmer summan av rummens area ungefär med total_area?

---

Returnera ENDAST JSON i detta format (inga förklaringar före eller efter):
{
  "rooms": [
    { "name": "Rumsnamn", "type": "bedroom|kitchen|bathroom|living|hallway|storage|other", "area_sqm": 12.5 }
  ],
  "room_count_summary": "3 rum + kök",
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
