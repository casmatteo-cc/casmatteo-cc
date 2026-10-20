# ClubCard Website (Relaunch nach Figma)

Statische Umsetzung von Figma „Website-Redesign (Okt 2026)“, Datei `CqweV56v5nnzkn10hbzztx`:

- `index.html`: Startseite v3 (17.10.2026). Ein Ziel: App laden. Keine Preise außer „Erster Monat gratis“.
- `partner.html`: Partnerseite v2. Ziel: Gesprächsanfrage an Louis.
- `styles.css`, `main.js`: gemeinsames Design und Interaktionen. Die Mitgliedskarte kippt beim Scrollen und folgt dem Zeiger. Dazu kommen die Sticky-Leiste auf dem Handy, der Partner-Laufband und die Formulare.
- `assets/`: Logos aus dem Brandbook. Die App-Screens, die Partnerkarte, der Kartenfächer und die Partnerbilder sind Renderings aus Figma (1x).

`index.html` ist für die Artifact-Vorschau ohne `<html>`/`<head>`-Gerüst geschrieben. Für den Einbau in `clubcard-website` (TanStack Start + Tailwind) dienen beide Seiten als Vorlage.

## Bewusst anders als Figma

- Die Mitgliedskarte ist in CSS gebaut statt als Bild. So bleibt sie scharf und kann kippen.
- Die Partnerkarte ist ein statisches Bild. Laut Notiz kommen die Pins live aus `GET /venues` (z. B. MapLibre).
- Die Sektion „Was die Läden sagen“ fehlt, weil die Zitate in Figma noch Platzhalter sind.
- Die Partnerseite hat zusätzlich „Euer Team schaut nur drauf.“ (Kartenfächer) und direkte Kontaktdaten.

## Vor dem Livegang

- Die Figma-Renderings in 2x neu exportieren, sobald die Assets direkt heruntergeladen werden können.
- Die FAQ-Antworten außer „Was ist ClubCard?“ bzw. „Was kostet das?“ habe ich geschrieben. Sie stehen nicht in Figma und müssen gegengelesen werden.
- Offen sind noch: die Android-Warteliste und das Partner-Formular (beide ohne Backend), die Partner-Login-URL, die Veedel-Seiten und die Rechtstexte.
