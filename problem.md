- ✅ När man är i /login eller /register så fungerar inte navbar länkarna.

- ✅ "Om oss" finns inte och navbarslänken fungerar därmed inte.

- ✅ Lägg till funktion att man kan klicka på loggan i navbaren för att komma till startsidan. Ta bort den extra navbaren som tillkommer när man är på /login eller /register.

- ✅ Ta bort "populärast" på Pro-planen.

- ✅ I "funktioner" byt "excel-export" till något som pratar om export till flera olika datatyper. Detta ska vara Excel, CSV och PDF sammanfattning.

- ✅ De juridiska länkarna fungerar ej. Skapa Användarvillkor, integritetspolicy, och GDPR.

- ✅ Uppdatera sedan footer med länkar som faktiskt fungerar oavsett var på hemsidan man är. exempelvis så fungerar inte om oss (då den inte finns).

- ✅ Skapa ett kontaktformulär. och länka "kontakt" länken i footern dit.

- ✅ Ta bort karriär, roadmap, uppdateringar i footer.

- ✅ Pilarna i "så fungerar det" är överlappande med korten. åtgärda detta så att dom ligger mellan korten istället.

- ✅ Ta för tillfället bort "social-proof". Men möjligheten att lägga till det igen ska finnas.

- ✅ Snygga till footern. Sätt loggan och slogan i mitten, produkt och kontaktlänkar till vänster, och juridiska länkar till höger om logotypen.

- ✅ Designen ser lite väl ai-generisk ut. Den fokuserar in sig på professionelt arbetande. Försök att ge hemsidan en mer professionell look som gör det enkelt för dom att se vart man ska trycka för att använda tjänsten.

- ✅ Ändra strukturen så korten är lika stora i varje enskild sektion. Exempelvis så är "2 - ai analyserar automatiskt" större än de andra korten i den sektionen.

- ✅ Gör hemsidan mer användarvänlig. Starkare kontraster mellan bakgrund och innehåll, skapa en dark mode toggle.

- ✅ I dark mode är texten i Navbar väldigt svårsedd. Gör textfärgen och tillhörande knappar tydligare.

- ✅ I light mode är den sekundära CTA knappen väldigt svår att se när man håller musen över. Ändra så den får en inåtvändig skugga när man håller över och behåll texten mörk.

Att undersöka 21/12:

- ✅ ta bort BTA informationen då den inte hjälper för något. (BTA nedprioriterad - BOA och Total yta visas först)

- ✅ Hitta något sett att förbättra ai-modellen, via prompt exempelvis. (Prompten förbättrad med tydligare instruktioner)

- ✅ Balkong/förvaring/hall/WC/kök räknas just nu som rum. Detta ska inte räknas som det utan formatet ska vara antal rum (vardagsrum/sovrum) + kök (room_count_summary implementerat)

- ✅ Total yta inte lika viktigt, boyta är viktigare. (BOA visas nu först i UI och export)

- ✅ Se till att all data som visas i projektet även kommer med i CSV/EXCEL/PDF. (Dörrtyper och rumsräkning tillagt)

- ✅ Fixa CTA-knapparna så att dom har primärfärgen på priskomponenten. Behåll stöd för darkmode.

<!-- - Fixa så att stripe integrationen fungerar. -->

- ✅ Kontrollera all funktionalitet så att dom inte pekar på localhost (localhost-fallback borttagen)

- ✅ Säkerställ att all text har både light och dark mode styling. (social-proof.tsx uppdaterad)

I plandata.se:

- ✅ Kunde inte exportera analys varken som PDF/Excel/CSV fil. (CSV returnerar nu fullständig analys istället för bara rum-data, dörrcheck fixad)

- ✅ Den visar fortfarande inte rätt mängd dörrar i analysen. (Dörrfält ändrade från optional till default(0) i validering, export-villkor fixade)

- ✅ Säkerställ att det finns funktionalitet för att restriktera användare från att ladda upp till AI-analysen om dom överskrider sitt maxantal uploads denna månad. (Gränskontroll tillagd i analyze API + Edge Function för månadlig reset)

- Undersök "Admin" funktionalitet med möjlighet för toggle av/på openrouter key samt val av modell. (Skippas för nu)
