# Prenumerationer

En webbapplikation för att hålla koll på sina prenumerationer 
(t.ex. Netflix, Spotify) — vilka som är aktiva och vilka som avslutats.

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

## Tekniska val
- **Vite** valdes som byggverktyg för React eftersom det ger snabbare 
  utvecklingsserver och enklare konfiguration jämfört med Create React App.
- **768px och 480px** valdes som brytpunkter för responsiv design, en 
  vanlig standard för att skilja mobil, surfplatta och desktop-vy.
- **fetch** används för API-anrop eftersom det är inbyggt i webbläsaren och räcker
  för enkla anrop, utan extra beroenden som axios.
- **API-anropen ligger i `src/services/`** så att komponenterna bara hanterar
  gränssnittet och API-adressen finns på ett enda ställe.
- **Porten är låst till 5173** (`strictPort` i `vite.config.js`) eftersom API:ets
  CORS-inställning bara tillåter den adressen.
- **Domänbegrepp som `Prenumeration` är på svenska** eftersom appen riktar sig till
  svenska användare, medan övrig kod är på engelska.
