# Prenumerationskollen

En webbapplikation för att hålla koll på sina prenumerationer 
(t.ex. Netflix, Spotify) — vilka som är aktiva och vilka som avslutats.

## Funktioner
- Lista, lägga till, redigera och ta bort prenumerationer
- Markera en prenumeration som aktiv eller avslutad
- Söka bland prenumerationer
- Ladda upp en logga och en fil (till exempel ett kvitto eller avtal) till varje prenumeration.
  Exempelfiler att testa med finns i mappen `exempelfiler/`
- Felmeddelanden visas om ett anrop till API:et misslyckas
- Responsiv layout för mobil, surfplatta och desktop

## Kom igång

> **Viktigt:** Starta alltid backend (API:et) först och sedan frontend.
> Webbappen hämtar data från API:et direkt när sidan öppnas.

Projektet består av två separata repon som körs samtidigt:

| Repo | Innehåll | Adress |
|---|---|---|
| [PrenumerationerApi](https://github.com/AigennA/PrenumerationerApi) | Backend (ASP.NET Web API) | http://localhost:5175 |
| [prenumerationer-app](https://github.com/AigennA/prenumerationer-app) | Frontend (React + Vite) | http://localhost:5173 |

### Förutsättningar
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 20.19 eller senare
- Git

### 1. Klona båda repona i samma mapp
```
git clone https://github.com/AigennA/PrenumerationerApi.git
git clone https://github.com/AigennA/prenumerationer-app.git
```

### 2. Starta backend först (terminal 1)
```
cd PrenumerationerApi
dotnet run
```
Vänta tills terminalen visar adressen API:et körs på: `Now listening on: http://localhost:5175`.
API:et kan testas i Swagger på http://localhost:5175/swagger.

### 3. Starta frontend (terminal 2)
Öppna en ny terminal i samma mapp som i steg 1.
```
cd prenumerationer-app
npm install
npm run dev
```
Öppna adressen som visas i terminalen (`Local: http://localhost:5173/`) i webbläsaren.

Om ett felmeddelande visas: kontrollera att API:et är igång och ladda om sidan.

### Valfritt: öppna båda projekten i samma VS Code-fönster
Öppna mappen `PrenumerationerApi` i VS Code och lägg sedan till webbappen med
**File → Add Folder to Workspace...** och välj mappen `prenumerationer-app`.
Båda projekten visas då i samma fönster.

Öppna en terminal per projekt med **Terminal → New Terminal** och välj mapp,
så kan `dotnet run` och `npm run dev` köras samtidigt.

## Tekniska val
- **Vite** valdes som byggverktyg för React eftersom det ger snabbare 
  utvecklingsserver och enklare konfiguration jämfört med Create React App.
- **Tre layouter beroende på skärmstorlek:** mobil (upp till 767px) visar en kolumn,
  surfplatta (från 768px) två kolumner och desktop (från 1024px) tre kolumner.
  Under 480px blir formuläret och korten mer kompakta.
- **Knapparna ligger i ett rutnät med lika breda knappar** så att alla kort ser likadana ut,
  oavsett hur långa knapptexterna är.
- **fetch** används för API-anrop eftersom det är inbyggt i webbläsaren och räcker
  för enkla anrop, utan extra beroenden som axios.
- **API-anropen ligger i `src/services/`** så att komponenterna bara hanterar
  gränssnittet och API-adressen finns på ett enda ställe.
- **Varje prenumeration har en logga och en fil i separata fält** så att listan ser enhetlig ut:
  loggan visas alltid på samma plats, och saknas den visas tjänstens första bokstav.
- **Filstorleken kontrolleras även i webbappen** så att användaren får ett felmeddelande direkt,
  utan att först behöva vänta på att en stor fil laddas upp.
- **Porten är låst till 5173** (`strictPort` i `vite.config.js`) eftersom API:ets
  CORS-inställning bara tillåter den adressen.
- **Domänbegrepp som `Prenumeration` är på svenska** eftersom appen riktar sig till
  svenska användare, medan övrig kod är på engelska.
