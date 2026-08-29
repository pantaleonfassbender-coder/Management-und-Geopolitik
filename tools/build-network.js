#!/usr/bin/env node
/* Erzeugt data/network.json — das Begriffsnetz hinter der Atlas-Ansicht.
   Aufruf aus dem Repositorium-Wurzelverzeichnis:  node tools/build-network.js
   Knoten: Leitbegriffe (Häufigkeit = Zahl der Exzerpt-Einheiten, Farbe = Linie
   mit den meisten Verwendungen). Kanten: Kookkurrenz in derselben Einheit.
   Brückenbegriffe: Begriffe, die 4+ Werke tragen. */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const works = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "works.json"), "utf8"));

/* Funktionswörter, Hilfsverben — samt historischen Schreibungen. */
const STOP = new Set(`
aber alle allem allen aller alles als also am an andere anderen anderer anderes andern anders auch auf aus außer
bald bei beide beiden beim bereits besonders bestimmten bin bis bloß blos da dabei dadurch dafür dagegen daher
damit dann daran darauf daraus darf darin das dass daß davon dazu dem den denen denn dennoch der deren derselben
des deshalb dessen desto die dies diese dieselbe diesem diesen dieser dieses doch dort du durch eben ein eine
einem einen einer eines einige einigen einmal endlich er erst es etwa etwas euch euer eure für gab ganz gar gegen
gehabt gemacht getan gewesen gibt giebt gleich haben habt hat hatte hatten heraus hier hin hinter ich ihm ihn
ihnen ihr ihre ihrem ihren ihrer ihres im immer in indem innerhalb ist ja je jede jedem jeden jeder jedes jedoch
jene jenem jenen jener jenes jetzt kann kein keine keinem keinen keiner kommen kommt können könnte lassen läßt
man mag mehr mein meine mich mir mit muss muß müssen nach nachdem nämlich neben nein nicht nichts nie niemand
noch nun nur ob oder ohne schon sehr sei seien sein seine seinem seinen seiner seines seit selbst sich sie sind
so solche solchem solchen solcher solches soll sollen sollte sondern sonst statt über um und uns unser unsere
unter viel viele vielleicht vom von vor wann war waren was weder weil weit weiter welche welchem welchen welcher
welches wenn wer werde werden wieder wie wir wird wo wohl wollen wollte während würde würden zu zum zur zwar
zwischen zwei drei vier
sey seyn seiet bey beym letztern letzteren ersteren freylich hätten hätte müßte dürfe könne
gethan thun thut läßt vermag pflegt pflegen heißt hieße giebt
denen deren derer worauf wodurch wohin woher wovon wozu
lassen ließ ließe ließen machen machte gemacht
kommet gehet stehet sehet finden findet
ward wurde wurden worden geworden
diesem diesen unsern unsrer unsre eignen eigner
mögen möchte möchten mochte darum daselbst hierbei hiermit hiebei hiemit
sowohl soweit sofern sogar allein
desselben derselben derselbe dasselbe art teil teile teilen erste ersten erster sehen sieht sah
handeln handelt handelte ganze ganzen ganzes einander habe großen große großes groß einzelnen
einzelne einzelner halten hält hielt hielten dinge ding weniger wenigsten geben gegeben gab
bringen bringt gebracht liegt liegen lag stehen steht stand fällt fallen wollten wollt
wäre neue neuen neuer zugleich sollten gehören gehört erscheinen erscheint allgemeinen allgemeine
weise sagen sagt politischen politische politisch richtig hinaus zuerst dienen dient menschliche
menschlichen hand heute damals
`.trim().split(/\s+/));

/* Historische Schreibungen und Flexionsformen, von Hand zusammengeführt. */
const NORM = {
  theil: "teil", theile: "teil", theilen: "teil", theils: "teil",
  urtheil: "urteil", urtheile: "urteil", urtheilen: "urteil",
  that: "tat", thaten: "tat",
  "nöthig": "nötig", "nöthigten": "nötigen", "nöthigt": "nötigen",
  kriege: "krieg", krieges: "krieg", kriegs: "krieg", kriegen: "krieg",
  staaten: "staat", staates: "staat", staats: "staat", staate: "staat",
  "mächte": "macht", "mächten": "macht",
  "völker": "volk", "völkern": "volk", volkes: "volk", volks: "volk", volke: "volk",
  "länder": "land", "ländern": "land", landes: "land", lande: "land",
  handels: "handel",
  menschen: "mensch",
  "kräfte": "kraft", "kräften": "kraft",
  friedens: "frieden", friede: "frieden",
  herrschaft: "herrschaft",
  "güter": "gut", "güter": "gut", "gütern": "gut",
  worte: "wort", worten: "wort",
  ursachen: "ursache",
  folgen: "folge",
  waren: "ware",
  regeln: "regel", reguln: "regel",
  jahre: "jahr", jahren: "jahr", jahrhunderts: "jahrhundert", jahrhunderte: "jahrhundert",
  "feinde": "feind", "feinden": "feind", feindes: "feind",
  freunde: "freund", freunden: "freund",
  fürsten: "fürst",
  könige: "könig", "königs": "könig",
  reichthum: "reichtum", "reichthümer": "reichtum", "reichtümer": "reichtum",
  wirthschaft: "wirtschaft",
  "rohstoffe": "rohstoff", "rohstoffen": "rohstoff",
  meere: "meer", meeres: "meer",
  "räume": "raum", "räumen": "raum", raumes: "raum",
  lagen: "lage",
  zeiten: "zeit",
  grenzen: "grenze",
  ziele: "ziel", zieles: "ziel",
  mittel: "mittel", mitteln: "mittel",
  "pläne": "plan", "plänen": "plan", planes: "plan",
  befehle: "befehl", befehlen: "befehl",
  gesellschaften: "gesellschaft",
  nationen: "nation",
  parteien: "partei",
  "bündniß": "bündnis", "bündnisse": "bündnis", "bündniss": "bündnis",
  coalitionen: "koalition", koalitionen: "koalition",
  athener: "athener", athenern: "athener",
  "lakedämonier": "lakedämonier", "lakedämoniern": "lakedämonier"
};

const canon = w => NORM[w] || w;

const tokenize = text => {
  const seen = new Set();
  for (let raw of text.toLowerCase()
      .replace(/[^a-zäöüß\s-]/g, " ").split(/[\s-]+/)) {
    if (raw.length < 3) continue;
    if (STOP.has(raw)) continue;
    const w = canon(raw);
    if (w.length < 3 || STOP.has(w)) continue;
    seen.add(w);
  }
  return seen;
};

/* -------- alle Einheiten durchlaufen */
const units = [];
for (const w of works) {
  const t = JSON.parse(fs.readFileSync(path.join(ROOT, "data", `${w.id}.json`), "utf8"));
  for (const sec of t.sections) for (const u of sec.units)
    units.push({ wid: w.id, line: w.line, sid: sec.id, k: String(u.k), terms: tokenize(u.text) });
}

const stat = new Map();
for (const u of units) for (const term of u.terms) {
  let s = stat.get(term);
  if (!s) stat.set(term, s = { f: 0, works: {}, lines: {}, cites: [] });
  s.f++;
  s.works[u.wid] = (s.works[u.wid] || 0) + 1;
  s.lines[u.line] = (s.lines[u.line] || 0) + 1;
  if (s.cites.length < 6) s.cites.push([u.wid, u.sid, u.k]);
}

const nodes = [...stat.entries()]
  .map(([id, s]) => ({ id, f: s.f, spread: Object.keys(s.works).length, works: s.works,
    linie: Object.entries(s.lines).sort((a, b) => b[1] - a[1])[0][0], cites: s.cites }))
  .filter(n => n.f >= 3)
  .sort((a, b) => (b.spread - a.spread) || (b.f - a.f))
  .slice(0, 120)
  .sort((a, b) => b.f - a.f);

const keep = new Set(nodes.map(n => n.id));

const co = new Map();
for (const u of units) {
  const ts = [...u.terms].filter(t => keep.has(t)).sort();
  for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) {
    const key = ts[i] + " " + ts[j];
    co.set(key, (co.get(key) || 0) + 1);
  }
}
const edges = [...co.entries()]
  .map(([key, c]) => { const [s, t] = key.split(" "); return { s, t, w: c, c }; })
  .sort((a, b) => b.c - a.c)
  .slice(0, 600);

const bridges = nodes.filter(n => n.spread >= 4).slice(0, 14).map(n => n.id);

const out = { n_units: units.length, nodes, edges, bridges };
fs.writeFileSync(path.join(ROOT, "data", "network.json"), JSON.stringify(out));
console.log(`network.json: ${nodes.length} Begriffe, ${edges.length} Kanten, ` +
  `${bridges.length} Brücken, aus ${units.length} Einheiten`);
