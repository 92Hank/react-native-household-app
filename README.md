# react-native-household-app

Installation:
" npm install -g firebase-tools "
{installeras globalt}

" npm i "
{i functions folder, där är node_modules för express}
" npm run build --watch " {i functions folder}
" firebase login " {med ditt google konto}
" firebase serve " {verkar som man måste klicka på api adress för den ska fortsätta installera}

# Kravlista

\*: Dessa krav måste göras (21st).

Antal krav: 40.
G: 24 (60%).
VG: 34 (85%).

### Krav (4)

En logga, splashscreen och appikon ska designas och användas. _ logga kvar att användas?
Applikationen ska byggas med RN, Expo & TS. _ JA
Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras
med produktägare, godkännas och dokumenteras. \*
All information ska kommuniceras till och från en server. (VG) JA


### Hushåll (7)

Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet,
namnet ska gå att ändra. \*
Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.
En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.

En ägare ska kunna acceptera eller neka förfrågningar. // byta isAccepted till accepted | pending | rejected .. ändra api
En ägare ska kunna göra andra till ägare.
En ägare ska kunna pausa en användare och under pausade perioder ska användare inte
tas med i statistiken. // göra api
Om en använder har pausats under en del av en period i statistiken ska graferna
normaliseras.

### Konto (5)

En användare ska kunna logga in sig. _ JA
En användare ska kunna skapa ett nytt hushåll. _ JA
En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. \*
När en användare har valt att gå med i ett hushåll behöver en ägare av hushållet först
godkänna användaren.
En användare ska kunna lämna ett hushåll. //göra api för

### Profil (6)

En användare ska kunna ange sitt namn. _ ska man kunna ändra sitt member name? = göra api
En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. _ göra Api
Valda avatarer ska inte kunna väljas av andra användare i hushållet. _
Avataren ska användas i appen för att visa vad användaren har gjort. _
En användare ska kunna ställa in appens utseende (mörkt, ljust, auto). JA
Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de
olika hushållen. Strax

### Sysslor (6)

En ägare ska kunna lägga till sysslor att göra i hemmet. _ Strax
En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en
vikt som beskriver hur energikrävande den är. _ JA
En användare ska kunna lägga till en ljudinspelning och en bild för att beskriva sysslan
ytterligare. Senare...
En ägare ska kunna redigera en syssla. _ Api
En ägare ska kunna ta bort en syssla. _ Api
När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan
också kommer att tas bort och få valet att arkivera sysslan istället. Senare..

### Dagsvyn (3)

Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. _
Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar
sedan sysslan gjordes senast samt om den är försenad. _
När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även
med ett enkelt tryck gå att markera sysslan som gjord. \*

### Statistik (6)

En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt
hushåll. _
Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt
fördelning av varje enskild syssla. _
Det ska finnas en statistikvy över ”nuvarande vecka”. \*
Det ska finnas en statistikvy över ”förra vecka”.
Det ska finnas en statistikvy över ”förra månaden”.
Om det inte finns statistik för en av vyerna ska den vyn inte visas.

### Schemaläggning (3)

En ägare ska kunna tilldela och ta bort sysslor från användare i hushållet.
Användare ska kunna se de tilldelade sysslorna i sitt gränssnitt.
En ägare ska kunna skapa grupper av sysslor som automatiskt tilldelas användarna i
hushållet och roteras baserat på ett intervall i dagar.

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
3. Applikationen kommunicerar datan till och från en backend tjänst (ni väljer) med hjälp
   av Redux & redux-thunk.
