# Magistra Vitae — Management und Geopolitik

Ein „Lektionen der Geschichte“-Quellenapparat in deutscher Sprache: dreizehn
gemeinfreie Texte — zwölf deutschsprachige Originale (Hörnigk, Schiller, Kant,
Clausewitz, List, Moltke, Burckhardt, Ratzel, Bismarck, Luxemburg, Rathenau,
Weber) und Thukydides in der Übersetzung Adolf Wahrmunds (1864) — kuratiert
für aktuelle Führungs- und Geopolitik-Fragen der Unternehmenspraxis.

Jedes Werk hat eine wissenschaftliche Kopfnote, wörtliche (großteils an den
Seitenbildern der Drucke verifizierte) Exzerpte mit absatzgenauen Zitierankern
und eine „Führungsperspektive“. Dazu: ein Einführungsessay (historia magistra
vitae nach Koselleck; die deutschsprachigen Traditionslinien samt der
Belastungsgeschichte der „Geopolitik“; ein Analogien-Protokoll nach
Neustadt/May und Khong), eine Executive-Konkordanz (acht Führungsfragen),
ein Begriffs-Atlas (Kookkurrenz-Netz, reproduzierbar über
`tools/build-network.js`) und eine Anwendungsseite mit kritischer Einordnung
dreier Begleit-Tools:

- [Ukraine War Monitor](https://ukraine-war-monitor.netlify.app/) (englisch)
- [Geopolitical Analogist](https://geopolitical-analogist.netlify.app/) (englisch)
- [Deutschland-Monitor · Personenschutz-Radar](https://deutschland-monitor.netlify.app/) (deutsch)

## Architektur

Statische Seite ohne Build-Schritt: `index.html` + `style.css` + `app.js`
(Hash-Router-SPA) + `data/*.json` (eine Datei je Werk plus `works.json`).
Direkt über Netlify deploybar (Drop oder Repo-Anbindung). Keine Cookies,
keine Analyse-Dienste, keine Drittanfragen.

Englischsprachiges Schwesterprojekt im selben Format:
[leadership-geopolitics](https://github.com/pantaleonfassbender-coder/leadership-geopolitics);
Formatvorbild:
[Calculemus — Philosophical Predecessors of AI](https://philosophical-predecessors-of-ai.netlify.app/).

## Rechte

Alle Primärtexte sind gemeinfrei (jüngster Text: Weber 1919). Editoriale
Beiträge CC BY 4.0 · Code MIT · abgeleitete Exzerpt-Daten CC0 — siehe
[LICENSES](LICENSES). Quellen- und Editionsnachweis, Verifikationsprotokoll
(Fraktur-Transkriptionen, Bismarck-Apokryphen-Prüfung) und die kritische
Einordnung Ratzels: auf der Methodenseite der Website.
