![RNT image](household-app/assets/auB9iGd.png "RNT Image")

# HappyTasks
Marcus, Fredrik, Tina, Joacim, Robin, Henrik
SUVNET20 - Applikationsutveckling
##### Beskrivning:
En React native expo-applikation med firebase, express-api och redux för hantering av sysslor i hushåll.
##### Installation:

###### Backend:
_npm install -g firebase-tools_

_npm install_ 
i firebase-api\functions, där är node_modules för express

_tsc -w_
i firebase-api\functions för att bygga

_firebase login_
Logga in med kontot du skickat till oss

_npm run fire_ 
i firebase-api\functions för att starta servern

###### Frontend:

_npm install_ 
i projektet react-native-household-app\household-app

Skapa en/redigera Config.ts-fil i: household-app\Redux-mappen med följande info:
```
export const LocalIp = "XXX.XXX.X.XXX:5001"; <-- Byt ut X:en mot din lokala IP.
export const webUrl = `http://${LocalIp}/react-native-household-app/us-central1/webApi/`;
```
_npm start_
i react-native-household-app\household-app. Startar expo.

Logga in i applikationen med foo@foo.com med lösenord foobar för att se existerande data och statistik som ägare. Hushållet "Robins kungliga barn" har mest statistik, så här kan du se alla vyer för detta. Hushållet har flertalet medlemmar med olika roller. Som ägare kan du skapa, ändra, radera eller arkivera sysslor. Du kan godkänna eller avslå ansökningar till hushållet och du kan pausa användare och återaktivera pausade användare. En ägare kan också göra andra användare till ägare. Du kan byta namn på hushållet.

I hushållet "Husvagn" finns ingen statistik och därför visas inte heller vyerna för det. Om du skapar en syssla i det hushållet och markerar den som gjord kommer statistikvyn för veckan att vara tillgänglig.

Logga in med pelle@foo.com med lösenord foobar för att se hur det ser ut för en vanlig användare. Notera att denna användare har en aktiv ansökan till ett hushåll samt en nekad ansökning till ett annat. En vanlig användare har färre rättigheter. 

Logga in med zlatan@foo.com med lösenord foobar, den användaren är pausad och kan inte klarmarkera sysslor.

# Kravlista

*: Dessa krav måste göras (20st).<br/>
Antal krav: 40.<br/>
G: 20 (50%).<br/>
VG: 32 (80%).<br/>

Avklarade krav: 35/40<br/>
Extra features: 8
### Krav (4/4)

- [x] En logga, splashscreen och appikon ska designas och användas. *
- [x] Applikationen ska byggas med RN, Expo & TS. *
- [x] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras med produktägare, godkännas och dokumenteras. *
- [x] Information ska kommuniceras till och från en server. (VG)


### Hushåll (6/7)

- [x] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet, namnet ska gå att ändra. *
- [x] Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.
- [x] En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.
- [x] En ägare ska kunna acceptera eller neka förfrågningar.
- [x] En ägare ska kunna göra andra till ägare.
- [x] En ägare ska kunna pausa en användare och under pausade perioder ska användare inte tas med i statistiken.
- [ ] Om en använder har pausats under en del av en period i statistiken ska graferna normaliseras.


### Konto (5/5)

- [x] En användare ska kunna logga in sig. *
- [x] En användare ska kunna skapa ett nytt hushåll. *
- [x] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. *
- [x] När en användare har valt att gå med i ett hushåll behöver en ägare av hushållet först godkänna användaren.
- [x] En användare ska kunna lämna ett hushåll.


### Profil (6/6)

- [x] En användare ska kunna ange sitt namn. *
- [x] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. *
- [x] Valda avatarer ska inte kunna väljas av andra användare i hushållet. *
- [x] Avataren ska användas i appen för att visa vad användaren har gjort. *
- [x] En användare ska kunna ställa in appens utseende (mörkt, ljust, auto).
- [x] Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de olika hushållen.

### Sysslor (5/6)

- [x] En ägare ska kunna lägga till sysslor att göra i hemmet. *
- [x] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en vikt som beskriver hur energikrävande den är. *
- [ ] En användare ska kunna lägga till en ljudinspelning och en bild för att beskriva sysslan ytterligare.
- [x] En ägare ska kunna redigera en syssla. *
- [x] En ägare ska kunna ta bort en syssla.
- [x] När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan också kommer att tas bort och få valet att arkivera sysslan istället.


### Dagsvyn (3/3)

- [x] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. *
- [x] Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar sedan sysslan gjordes senast samt om den är försenad. *
- [x] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även med ett enkelt tryck gå att markera sysslan som gjord. *


### Statistik (6/6)

- [x] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt hushåll. *
- [x] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt fördelning av varje enskild syssla. *
- [x] Det ska finnas en statistikvy över ”nuvarande vecka”. *
- [x] Det ska finnas en statistikvy över ”förra vecka”.
- [x] Det ska finnas en statistikvy över ”förra månaden”.
- [x] Om det inte finns statistik för en av vyerna ska den vyn inte visas.

### Schemaläggning (0/3)

- [ ] En ägare ska kunna tilldela och ta bort sysslor från användare i hushållet.
- [ ] Användare ska kunna se de tilldelade sysslorna i sitt gränssnitt.
- [ ] En ägare ska kunna skapa grupper av sysslor som automatiskt tilldelas användarna i hushållet och roteras baserat på ett intervall i dagar.

### Extra features
- [x] Om sysslan aldrig har utförts visas antal dagar sedan den skapades istället för när den senast gjordes
- [x] En arkiverad syssla går att återaktivera igen.
- [x] Skaparen kan inte lämna ett hushåll, detta för att se till att det alltid finns en admin.
- [x] En användare går att aktivera igen om den är pausad.
- [x] En användare kan skapa ett konto.
- [x] En användare kan logga ut.
- [x] Man kan inte gå med i samma hushåll om man redan är medlem eller har en aktiv ansökan.
- [x] En ägare kan inte inaktivera en annan ägare.

### Inlämning

För att bli godkänd på den här uppgiften MÅSTE ni använda GIT och GitHub.
Inlämningen sker som vanligt via läroplattformen. I din projektmapp ska det finnas
(utöver all kod) en README.md fil. Den ska innehålla en titel, beskrivning av projektet,
info om hur projektet byggs och körs samt vilka krav som är uppfyllda. Samt en .git mapp
så jag kan hitta till erat publika repo.

Krav för godkänt:

1. De nödvändiga kraven ifrån kravlistan ovan är uppfyllda
2. Git & GitHub har använts.
3. Projektmappen innehåller en README.md fil - (läs ovan för mer info)
4. Uppgiften lämnas in i tid!
5. Muntlig presentation är genomförd

Krav för väl godkänt:

1. Alla punkter för godkänt är uppfyllda
2. Ni har använt CI/CD under projektet.
3. Applikationen kommunicerar datan till och från en backend tjänst (ni väljer) med hjälp av Redux & redux-thunk.
