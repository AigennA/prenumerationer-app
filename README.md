# Prenumerationer

En webbapplikation för att hålla koll på sina prenumerationer 
(t.ex. Netflix, Spotify) — vilka som är aktiva och vilka som avslutats.

## Hur man kör appen
1. Klona repot: `git clone https://github.com/AigennA/prenumerationer-app.git`
2. Gå in i mappen: `cd prenumerationer-app`
3. Installera beroenden: `npm install`
4. Starta utvecklingsservern: `npm run dev`
5. Öppna webbläsaren på adressen som visas i terminalen (t.ex. `http://localhost:5173`)


## Tekniska val
- **Vite** valdes som byggverktyg för React eftersom det ger snabbare 
  utvecklingsserver och enklare konfiguration jämfört med Create React App.
- **768px och 480px** valdes som brytpunkter för responsiv design, en 
  vanlig standard för att skilja mobil, surfplatta och desktop-vy.