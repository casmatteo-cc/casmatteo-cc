# ClubCard Website (Redesign-Entwurf)

Statischer Entwurf für clubcard.cc: zwei Seiten, kein Build-Schritt.

- `index.html`: Startseite für Mitglieder, Ziel ist der App-Download
- `partner.html`: Partnerseite (`/partner`), Ziel ist ein Gespräch mit Partnern
- `styles.css`, `main.js`: gemeinsames Design und Interaktionen (Swipe-Demo, Preis-Umschalter, Tabs, Regler, QR-Code)
- `assets/`: Logo und Icon aus dem Brandbook v3

`index.html` ist für die Artifact-Vorschau ohne `<html>`/`<head>`-Gerüst geschrieben. Für den Einbau in `clubcard-website` (TanStack Start + Tailwind) dienen beide Seiten als Vorlage.

Quellen: Brandbook v3, „Website-Texte (Neufassung)“, Wireframe „Startseite · Desktop“, Prototyp der Partnerseite.

Vor dem Livegang prüfen:
- Store-Links zeigen auf die Smartlink-Route `https://clubcard.cc/app`
- Preise kommen aus dem Wireframe; den Studierenden-Preis für 6 und 12 Monate bestätigen
- Partner-Login-URL, Links zu Impressum, AGB und Datenschutz sowie das Instagram-Handle fehlen noch
- Das Partner-Formular schickt noch nichts ab und muss an die API angebunden werden
- Die Venue-Bilder sind Platzhalter-Verläufe; echte Partnerfotos folgen
