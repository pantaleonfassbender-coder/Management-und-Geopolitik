/* Magistra Vitae — Management und Geopolitik: Router, Daten, Ansichten */
const D = { works: [], texts: {} };
const view = document.getElementById("view");

const esc = s => String(s ?? "").replace(/[&<>"']/g, m =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const el = h => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstElementChild; };
const LINIE = { state: "Die Linie der Staatskunst", trade: "Die Linie des Handels", strat: "Die Linie der Strategie" };
const LCOLOR = { state: "var(--state)", trade: "var(--trade)", strat: "var(--strat)" };
const workById = id => D.works.find(w => w.id === id);
const citeOf = (w, sec, u) => `${sec.cite} [${u.k}]`;

/* --------------------------------------------------------------- Start */
async function boot() {
  D.works = await fetch("data/works.json").then(r => r.json());
  const res = await Promise.all(D.works.map(w => fetch(`data/${w.id}.json`).then(r => r.json())));
  D.works.forEach((w, i) => D.texts[w.id] = res[i]);
  window.addEventListener("hashchange", route);
  route();
}
const ROUTES = {};
function route() {
  const h = (location.hash || "#/overview").slice(2).split("/");
  const name = h[0] || "overview";
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("active", a.dataset.v === name));
  if (atlasStop) { atlasStop(); atlasStop = null; }
  view.innerHTML = ""; window.scrollTo(0, 0);
  (ROUTES[name] || viewOverview)(h.slice(1));
}

/* ============================================================ ÜBERBLICK */
function viewOverview() {
  view.append(el(`<div>
    <div class="viewhead">
      <span class="tag">Quellenapparat · Executive-Curriculum</span>
      <h1>Die Fragen auf der Vorstandsagenda sind älter als die Aktiengesellschaft</h1>
      <p class="lede">Wie Rivalen eskalieren; wann man sich vergleicht und wann man kämpft; wie Handel
      zur Waffe und zur Abhängigkeit wird; warum die Umsetzung vom Plan abweicht; was Führung den
      Geführten schuldet. Bevor es Business Schools gab, wurden diese Fragen — oft um den Preis von
      Städten — von Historikern, Kameralisten, Philosophen und Soldaten durchgearbeitet, deren Bücher
      heute gemeinfrei und weitgehend ungelesen sind. Diese Seite ist ein kuratierter Apparat von
      dreizehn solchen Texten, überwiegend deutschsprachige Originale von Hörnigk bis Max Weber, dazu
      Thukydides in gemeinfreier deutscher Übersetzung: jeder mit wissenschaftlicher Kopfnote,
      wörtlichen Exzerpten mit absatzgenauen Zitierankern und einer Führungsperspektive — samt
      Brücken zu Werkzeugen, die diese Lesart auf die Gegenwart anwenden.</p>
    </div>

    <div class="grid g3">
      <div class="card linie-state">
        <h3>Die Linie der Staatskunst</h3>
        <p class="fine">Macht, Rivalität, Institutionen, Führung</p>
        <p>Thukydides · Schiller · Burckhardt · Bismarck · Weber — die Analyse des Wettbewerbs
        organisierter Mächte: Eskalationsdynamik, Koalitionsgeometrie, Krisenverläufe, Besitzstands-
        denken, Verantwortungsethik.</p>
      </div>
      <div class="card linie-trade">
        <h3>Die Linie des Handels</h3>
        <p class="fine">Wirtschaft als Macht — die deutsche Debatte</p>
        <p>Hörnigk · Kant · List · Luxemburg · Rathenau — vom Kameralismus über Handelsgeist und
        Erziehungszoll bis zur Theorie des Expansionszwangs und zur Rohstoffbewirtschaftung von
        1914: der vollständige Argumentationsraum zwischen Verflechtung und Versorgungssicherheit.</p>
      </div>
      <div class="card linie-strat">
        <h3>Die Linie der Strategie</h3>
        <p class="fine">Handeln unter Ungewissheit</p>
        <p>Clausewitz · Moltke · Ratzel — Friktion, Nebel und der Primat der Politik; kein Plan
        überlebt den ersten Kontakt, Führen mit Auftrag; Lage, Raum und Meer — samt der kritisch
        dokumentierten Belastungsgeschichte der deutschen Geopolitik.</p>
      </div>
    </div>

    <h2>Der Korpus</h2>
    <div class="grid g2" id="ov-works"></div>

    <h2>Von den Quellen zur Gegenwart</h2>
    <div class="grid g2">
      <div class="card">
        <h3>Executive-Konkordanz</h3>
        <p>Acht aktuelle Führungsfragen — Eskalation, Koalitionen, Frühwarnung, Wandel, Resilienz,
        Regeln, Umsetzung, Verantwortung — jeweils verknüpft mit den Passagen des Korpus, die ihre
        Struktur behandeln. <a href="#/concordance">Zur Konkordanz →</a></p>
      </div>
      <div class="card">
        <h3>Atlas</h3>
        <p>Die Begriffslandkarte des Korpus: seine Leitwörter — Krieg, Macht, Staat, Volk, Handel —
        verknüpft, wo sie in derselben Passage stehen, eingefärbt nach Linien. Ein Klick zeigt, wie
        dreizehn Werke über 2300 Jahre ein Vokabular teilen. <a href="#/atlas">Zum Atlas →</a></p>
      </div>
      <div class="card">
        <h3>Anwendungen</h3>
        <p>Drei Begleitseiten wenden die Lesart an: ein täglicher, quellenbasierter Monitor zum
        Krieg gegen die Ukraine, ein interaktiver Analogien-Generator — und ein deutschsprachiges
        Lagebild zur Gefährdung von Amtsträgern. Mit kritischer Einordnung, was wozu passt.
        <a href="#/applications">Zu den Anwendungen →</a></p>
      </div>
      <div class="card">
        <h3>Einführung</h3>
        <p>Warum diese dreizehn Texte; was „Lektionen der Geschichte“ leisten können und was nicht
        (Koselleck!); wie man Analogien nutzt, ohne von ihnen benutzt zu werden — und wie diese
        Seite mit dem belasteten Erbe des Wortes „Geopolitik“ umgeht.
        <a href="#/introduction">Zur Einführung →</a></p>
      </div>
    </div>

    <p class="fine" style="margin-top:2rem">Quellen, Editionen und Rechte: siehe
    <a href="#/method">Methode &amp; Rechte</a>. Englischsprachiges Schwesterprojekt im selben
    Format: <a href="https://github.com/pantaleonfassbender-coder/leadership-geopolitics" rel="noopener">leadership-geopolitics</a>.</p>
  </div>`));
  const grid = view.querySelector("#ov-works");
  D.works.forEach(w => {
    const c = el(`<div class="card workcard linie-${w.line}">
      <p class="fine" style="margin:0">${esc(w.author)} · ${esc(w.date)}</p>
      <h3 style="margin:.2rem 0 .4rem">${esc(w.title)}</h3>
      <p style="margin:0;font-size:.95rem;color:var(--fg2)">${esc(w.blurb)}</p>
    </div>`);
    c.onclick = () => location.hash = `#/work/${w.id}`;
    grid.append(c);
  });
}

/* =========================================================== EINFÜHRUNG */
function viewIntroduction() {
  view.append(el(`<div class="essay">
    <div class="viewhead">
      <span class="tag">Einführung</span>
      <h1>Lektionen der Geschichte, ernst genommen</h1>
      <p class="lede">Warum eine Führungsseite auf Texten zwischen 400 v. Chr. und 1919 ruht — und
      wie man aus ihnen lernt, ohne sich zu belügen.</p>
    </div>

    <h2>1. Historia magistra vitae — eine These auf Bewährung</h2>
    <p class="readable">Cicero nannte die Geschichte „Zeugin der Zeiten, Licht der Wahrheit, Leben
    der Erinnerung, Lehrmeisterin des Lebens“ — <em>historia magistra vitae</em> (De oratore II,36).
    Zwei Jahrtausende rechtfertigte dieser Topos die Lektüre alter Bücher zur Orientierung in der
    Gegenwart. Ausgerechnet die deutsche Geschichtswissenschaft hat ihn am gründlichsten demontiert:
    Reinhart Koselleck zeigte, dass die Formel um 1800 still verfiel, als die Neuzeit begann, ihre
    Zukunft als strukturell anders zu erfahren denn alle Vergangenheit — Beschleunigung entwertet
    Präzedenz. Jeder Vorstand, dem versichert wird, „diesmal sei alles anders“ — bei einer
    Technologie, einem Markt, einem Krieg —, steht mitten in diesem Argument.</p>
    <p class="readable">Diese Seite bezieht die mittlere Position, die zugleich die älteste ist.
    Thukydides begründete den Nutzen seines Werks nicht mit der Wiederkehr der Ereignisse, sondern
    der Wiederkehr der Lagen, „weil es eben die menschliche Natur so mit sich bringt“
    (<a href="#/work/thukydides/i22/1">Thuk. I,22 [1]</a>); Burckhardt machte daraus ein Programm:
    Nicht Entwicklungsgesetze, sondern „das sich Wiederholende, Konstante, Typische“ ist der Ertrag
    (<a href="#/work/burckhardt/aufgabe/1">WB Einl. [1]</a>). Was Geschichte lehrt, sind nicht
    Antworten, sondern Strukturen: Eskalationsspiralen, Koalitionsgeometrien, das Verhältnis von
    Plan und Friktion, die politische Ökonomie des Schutzes, die Psychologie des Besitzstands.
    Diese Strukturen kehren wieder, weil ihre Erzeuger wiederkehren: Knappheit, Rivalität,
    Ungewissheit — und wir selbst.</p>

    <h2>2. Warum eigene Quellen: die deutschsprachigen Traditionslinien</h2>
    <p class="readable">Das englischsprachige Schwesterprojekt dieser Seite erschließt den
    Weltkanon von Sun Tzu bis Mackinder. Diese Seite geht bewusst einen anderen Weg: Sie baut —
    als generelle Linie, nicht als Dogma — auf deutschsprachigen Quellen. Nicht aus Provinzialität,
    sondern weil der deutschsprachige Raum zu den Kernfragen dieser Seite eigene, weltweit
    gewordene Traditionen besitzt, die man im Original lesen sollte. Die Ökonomie der Verwundbarkeit:
    Vom Kameralismus Hörnigks über Lists produktive Kräfte bis zu Rathenaus Kriegsrohstoff-
    organisation zieht sich ein Denken, das Wirtschaft von der Versorgung und der Fähigkeit her
    begreift, nicht vom Tausch — die intellektuelle Heimat jeder heutigen Debatte über
    Lieferketten, De-Risking und Industriepolitik. Die Führungslehre der Ungewissheit: Clausewitz'
    Friktion und Moltkes Auftragstaktik sind der deutsche Beitrag zur Weltführungslehre — Mission
    Command steht heute in angelsächsischen Lehrbüchern, aber seine Grammatik wurde hier
    geschrieben. Die Ethik der Verantwortung: Webers Unterscheidung von Gesinnungs- und
    Verantwortungsethik ist das Standardwerkzeug für schwere Entscheidungen geblieben. Und die
    Lage der Mitte: Bismarcks „cauchemar des coalitions“ ist die Urformel der strategischen
    Situation einer exportabhängigen Macht zwischen den Blöcken — die Lage der deutschen
    Wirtschaft bis heute.</p>
    <p class="readable">Zu den eigenen Quellen gehört auch die eigene Hypothek. Die deutsche
    „Geopolitik“ — von Ratzels politischer Geographie über Kjellén zu Haushofers Zeitschrift —
    lieferte der NS-Expansion ihr pseudowissenschaftliches Vokabular; nach 1945 war das Wort im
    Deutschen jahrzehntelang unaussprechlich, und seine Rückkehr in den Sprachgebrauch der
    Gegenwart ist selbst ein zeitgeschichtliches Ereignis. Eine deutschsprachige Seite über
    Geopolitik hat hier eine Bringschuld, die eine englischsprachige nicht in gleicher Weise hat:
    Sie muss die Quelle zeigen <em>und</em> die Wirkungsgeschichte. Deshalb steht Ratzel im Korpus
    — dokumentiert, mit ausdrücklicher Einordnung in Kopfnote, Führungsperspektive und
    Methodenseite — und deshalb fehlt Haushofer: nicht aus urheberrechtlichen, sondern aus
    editorischen Gründen; die Grenze zwischen belastetem Klassiker und Propagandisten wird auf der
    <a href="#/method">Methodenseite</a> begründet.</p>

    <h2>3. Die drei Linien</h2>
    <p class="readable"><strong style="color:var(--state)">Staatskunst.</strong> Thukydides liefert
    die Dynamik der Rivalität und mit dem Melierdialog die Anatomie asymmetrischer Verhandlung —
    in der deutschen Fassung von 1864, deren Wortlaut („der Mächtige aber setzt durch, was
    durchzusetzen möglich ist, und der Schwache fügt sich“) hier erstmals wieder zitierfähig
    vorliegt. Schiller seziert im „Brodgelehrten“ das Besitzstandsdenken, Burckhardt Macht und
    Krisen, Bismarck das Koalitionsmanagement, Weber die Verantwortung. <strong
    style="color:var(--trade)">Handel.</strong> Hörnigk formuliert 1684 die Neun Regeln der
    Wertschöpfungskontrolle; Kant setzt 1795 den Handelsgeist und das Weltbürgerrecht dagegen;
    List 1841 die produktiven Kräfte und die weggeworfene Leiter; Luxemburg fragt 1913, warum
    das System als Ganzes expandieren muss und was Anleihen mit jungen Staaten machen; Rathenau organisiert 1915 die
    Versorgungssicherheit als Führungsaufgabe. Zusammen bilden sie den vollständigen
    Argumentationsraum, in dem sich jede deutsche Debatte über Wirtschaft und Sicherheit bis heute
    bewegt — meist ohne ihre Ahnen zu kennen. <strong style="color:var(--strat)">Strategie.</strong>
    Clausewitz gibt die Erkenntnistheorie der Umsetzung, Moltke ihre Organisationsform, Ratzel die
    räumliche Analytik — samt Warnschild.</p>

    <h2>4. Analogien nutzen, ohne von ihnen benutzt zu werden</h2>
    <p class="readable">Die Forschung über historische Analogien im Entscheiden ist großenteils
    ein Katalog teurer Fehlgriffe: „München 1938“ trug die USA nach Vietnam, „kein zweites
    Vietnam“ lähmte sie andernorts; die deutsche Debatte hat ihre eigenen Kurzschlüsse — von
    „Weimar“ über „1914“ bis zur inflationären Zeitenwende-Rhetorik. Yuen Foong Khong hat gezeigt,
    dass Entscheider Analogien für echte kognitive Arbeit verwenden — Lage definieren, Einsätze
    bewerten, Optionen prüfen, Folgen schätzen —, sie aber nach Oberflächenähnlichkeit und
    Generationsgedächtnis auswählen statt nach Strukturpassung. Aus Neustadt und May stammen die
    Arbeitsregeln, denen diese Seite folgt:</p>
    <p class="readable">— Eine Analogie ist ein <em>Hypothesengenerator</em>, nie ein Beweis. Sie
    sagt, was zu prüfen ist, nicht, was wahr ist.<br>
    — Vor Gebrauch: Gemeinsamkeiten <em>und Unterschiede</em> in zwei ausdrücklichen Spalten
    notieren; die Unterschiedsspalte trägt die Analyse.<br>
    — Erst die Gegenwart sortieren — Bekanntes, Unklares, Unterstelltes —, dann zur Geschichte
    greifen.<br>
    — Mehrere Analogien beschaffen, darunter mindestens eine, die in die Gegenrichtung zeigt; die
    erstbeste ist die verfügbarste, selten die passendste.<br>
    — Strukturähnlichkeit (Anreize, Fähigkeiten, Bindungsprobleme, Geographie) schlägt
    Dramenähnlichkeit (Personen, Stimmungen, moralische Besetzung).</p>

    <h2>5. Was dieser Korpus nicht ist</h2>
    <p class="readable">Kein Kanon der Zustimmung. Diese Texte enthalten neben ihrer Einsicht die
    Kälte des Melierdialogs, den Autarkie-Affekt des Kameralismus, Bismarcks Machtpragmatik und
    Ratzels Organizismus samt seiner toxischen Wirkungsgeschichte. Sie gut zu lesen heißt, die
    Struktur zu gewinnen und die Ideologie zurückzulassen; die Führungsperspektiven zu jedem Werk
    ziehen diese Grenze ausdrücklich. Der Korpus ist auch nicht vollständig: Er ist auf gemeinfreie
    Texte beschränkt, was das 20. Jahrhundert weitgehend ausschließt; und er enthielt in seiner
    Erstfassung keine Autorin — ein Befund über die Schreibverhältnisse vor 1919, auf den die
    Aufnahme Rosa Luxemburgs als Analytikerin der Handelslinie die erste Antwort ist; Bertha von
    Suttner bleibt Kandidatin für eine künftige Gegenstimmen-Linie (Methodenseite).
    Und nichts hier ist Anlage-, Rechts- oder Politikberatung: Dies ist ein Lektüreapparat — die
    Quellen selbst, so angeordnet, dass eine arbeitende Führungskraft sie so befragen kann, wie
    die Tradition es empfiehlt: langsam, vergleichend, mit offener Unterschiedsspalte.</p>

    <h2>Literatur</h2>
    <div class="refs">
      <p>Chang, Ha-Joon: <em>Kicking Away the Ladder. Development Strategy in Historical Perspective.</em> London: Anthem Press, 2002.</p>
      <p>Cicero: <em>De oratore</em> II,36 („historia vero testis temporum, lux veritatis, vita memoriae, magistra vitae, nuntia vetustatis“).</p>
      <p>Clark, Christopher: <em>Die Schlafwandler. Wie Europa in den Ersten Weltkrieg zog.</em> München: DVA, 2013 (engl. 2012).</p>
      <p>Jervis, Robert: <em>Perception and Misperception in International Politics.</em> Princeton: Princeton University Press, 1976.</p>
      <p>Khong, Yuen Foong: <em>Analogies at War. Korea, Munich, Dien Bien Phu, and the Vietnam Decisions of 1965.</em> Princeton: Princeton University Press, 1992.</p>
      <p>Koselleck, Reinhart: „Historia Magistra Vitae. Über die Auflösung des Topos im Horizont neuzeitlich bewegter Geschichte.“ In: ders., <em>Vergangene Zukunft. Zur Semantik geschichtlicher Zeiten.</em> Frankfurt am Main: Suhrkamp, 1979.</p>
      <p>Münkler, Herfried: <em>Macht in der Mitte. Die neuen Aufgaben Deutschlands in Europa.</em> Hamburg: Edition Körber-Stiftung, 2015.</p>
      <p>Neustadt, Richard E. / May, Ernest R.: <em>Thinking in Time. The Uses of History for Decision-Makers.</em> New York: Free Press, 1986.</p>
      <p>Oermann, Nils Ole / Wolff, Hans-Jürgen: <em>Wirtschaftskriege. Geschichte und Gegenwart.</em> Freiburg: Herder, 2019.</p>
      <p>Osterhammel, Jürgen: <em>Die Verwandlung der Welt. Eine Geschichte des 19. Jahrhunderts.</em> München: C. H. Beck, 2009.</p>
      <p>Schultz, Hans-Dietrich: „Raumkonstrukte der klassischen deutschsprachigen Geographie.“ <em>Geschichte und Gesellschaft</em> 28 (2002), S. 343–377.</p>
      <p>Ó Tuathail, Gearóid: <em>Critical Geopolitics.</em> Minneapolis: University of Minnesota Press, 1996.</p>
    </div>
  </div>`));
}

/* ================================================================ WERKE */
function viewWorks() {
  const wrap = el(`<div>
    <div class="viewhead">
      <span class="tag">Der Korpus</span>
      <h1>Dreizehn Werke, drei Linien</h1>
      <p class="lede">Jedes Werk öffnet einen Lesesaal: wissenschaftliche Kopfnote, wörtliche
      Exzerpte mit absatzgenauen Zitierankern, Führungsperspektive. Alle Texte sind gemeinfrei,
      in den auf der <a href="#/method">Methodenseite</a> nachgewiesenen Ausgaben.</p>
    </div>
  </div>`);
  ["state", "trade", "strat"].forEach(line => {
    wrap.append(el(`<h2 style="color:${LCOLOR[line]}">${LINIE[line]}</h2>`));
    const grid = el(`<div class="grid g2"></div>`);
    D.works.filter(w => w.line === line).forEach(w => {
      const c = el(`<div class="card workcard linie-${w.line}">
        <p class="fine" style="margin:0">${esc(w.author)} · ${esc(w.date)}</p>
        <h3 style="margin:.2rem 0 .4rem">${esc(w.title)}</h3>
        <p style="margin:0 0 .5rem;font-size:.95rem;color:var(--fg2)">${esc(w.blurb)}</p>
        <p class="fine" style="margin:0">${esc(w.edition)} · zitiert als <span class="cite">${esc(w.abbr)}</span></p>
      </div>`);
      c.onclick = () => location.hash = `#/work/${w.id}`;
      grid.append(c);
    });
    wrap.append(grid);
  });
  view.append(wrap);
}

/* ============================================================= LESESAAL */
function viewWork(args) {
  const w = workById(args[0]);
  if (!w) { viewWorks(); return; }
  const t = D.texts[w.id];
  const idx = D.works.indexOf(w);
  const prev = D.works[idx - 1], next = D.works[idx + 1];

  const wrap = el(`<div>
    <div class="viewhead">
      <span class="tag" style="color:${LCOLOR[w.line]}">${LINIE[w.line]}</span>
      <h1>${esc(w.title)}</h1>
      <p class="lede">${esc(w.author)} · ${esc(w.date)} · ${esc(w.edition)}</p>
    </div>
    <div class="panel headnote"></div>
    <div class="toolbar">
      <input type="search" class="grow" placeholder="Im Werk suchen …" aria-label="Im Werk suchen">
      <span class="fine"><span class="cite">${esc(w.abbr)}</span> — jeder Zitier-Chip ist ein fester Link auf die Passage</span>
    </div>
    <div class="sections"></div>
    <div class="panel execlens">
      <h2>Die Führungsperspektive</h2>
    </div>
    <div class="worknav">
      <span>${prev ? `<a href="#/work/${prev.id}">← ${esc(prev.author)}</a>` : ""}</span>
      <a href="#/works">Alle Werke</a>
      <span>${next ? `<a href="#/work/${next.id}">${esc(next.author)} →</a>` : ""}</span>
    </div>
  </div>`);

  const head = wrap.querySelector(".headnote");
  t.headnote.forEach(p => head.append(el(`<p class="readable">${esc(p)}</p>`)));

  const secWrap = wrap.querySelector(".sections");
  t.sections.forEach(sec => {
    secWrap.append(el(`<h2 id="s-${esc(sec.id)}">${esc(sec.label)}</h2>`));
    sec.units.forEach(u => {
      secWrap.append(el(`<div class="unit" id="u-${esc(sec.id)}-${esc(u.k)}" data-text="${esc(u.text.toLowerCase())}">
        <p class="ulabel"><a class="cite" href="#/work/${w.id}/${esc(sec.id)}/${esc(u.k)}">${esc(citeOf(w, sec, u))}</a></p>
        <p class="readable utext"></p>
      </div>`));
      secWrap.lastElementChild.querySelector(".utext").textContent = u.text;
    });
  });

  const lens = wrap.querySelector(".execlens");
  t.exec.forEach(p => lens.append(el(`<p class="readable">${esc(p)}</p>`)));

  const search = wrap.querySelector("input[type=search]");
  search.oninput = () => {
    const q = search.value.trim().toLowerCase();
    wrap.querySelectorAll(".unit").forEach(u => {
      const hit = q && u.dataset.text.includes(q);
      u.classList.toggle("hit", !!hit);
      u.style.display = (!q || hit) ? "" : "none";
    });
    wrap.querySelectorAll("h2[id^=s-]").forEach(h => h.style.display = q ? "none" : "");
  };

  view.append(wrap);

  if (args[1] && args[2]) {
    const target = wrap.querySelector(`#u-${CSS.escape(args[1])}-${CSS.escape(args[2])}`);
    if (target) {
      target.classList.add("flash");
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
      setTimeout(() => target.classList.remove("flash"), 3500);
    }
  }
}

/* =========================================================== KONKORDANZ */
const THEMES = [
  {
    id: "rivalitaet",
    title: "Rivalität und Eskalation",
    gloss: "Warum Eskalationsspiralen strukturell beginnen — Wachstum plus Furcht des Etablierten, Bereitschaft als Drohung — und warum der genannte Anlass selten die Ursache ist.",
    ps: [
      { w: "thukydides", s: "i23", k: "1", g: "Machtentwickelung und Furcht: die eigentliche Ursache" },
      { w: "kant", s: "prae3", k: "1", g: "Die Rüstungsspirale: Bereitschaft selbst wirkt als Drohung" },
      { w: "bismarck", s: "praeventiv", k: "1", g: "Gegen den Präventivkrieg: die Dritten bleiben nicht neutral" },
      { w: "ratzel", s: "meer", k: "2", g: "Das Meer steigert Raummaßstäbe und Raumansprüche" },
      { w: "luxemburg", s: "schluss", k: "3", g: "Der Expansionszwang: die erste Wirtschaftsform, die ein Außen braucht" }
    ]
  },
  {
    id: "koalitionen",
    title: "Koalitionen und Bündnisse",
    gloss: "Der Albtraum der Koalitionen, das Staatsschiff in ihren Strömungen, verweigerte Neutralität — Beziehungsmanagement als Überlebensfrage der Macht in der Mitte.",
    ps: [
      { w: "bismarck", s: "cauchemar", k: "1", g: "»vous avez le cauchemar des coalitions« — »nécessairement«" },
      { w: "bismarck", s: "staatsschiff", k: "1", g: "Wohlwollen lässt sich nicht mit Trinkgeldern kaufen" },
      { w: "thukydides", s: "melier", k: "94-95", g: "Warum die Großmacht Neutralität nicht dulden will" },
      { w: "hoernigk", s: "k6", k: "1", g: "Wenn man sich »auf niemand als Gott und sich selbst« verlassen kann" }
    ]
  },
  {
    id: "fruehwarnung",
    title: "Frühwarnung und Urteilskraft",
    gloss: "Drei Viertel der Tatsachen liegen im Nebel; Lageerkenntnis sitzt bei der Sachkenntnis, nicht bei der Zuständigkeit; Krisen beschleunigen sich, ehe die Routine es merkt.",
    ps: [
      { w: "clausewitz", s: "c3", k: "1", g: "Der Nebel: drei Vierteile aller Handlungsgrundlagen" },
      { w: "moltke", s: "plan", k: "3", g: "Das Gegebene würdigen, das Unbekannte errathen, entschließen" },
      { w: "rathenau", s: "lage", k: "2", g: "Der Industrielle sieht die Erdrosselung vor dem Apparat" },
      { w: "burckhardt", s: "krisen", k: "2", g: "Der Weltprozeß gerät plötzlich in furchtbare Schnelligkeit" }
    ]
  },
  {
    id: "wandel",
    title: "Wandel führen",
    gloss: "Warum Besitzstände jede Neuerung als Existenzbedrohung erleben, warum Hoffnungsphantasien die kalte Überlegung verdrängen — und der Unterschied zwischen Steuern und Treibenlassen.",
    ps: [
      { w: "schiller", s: "brot", k: "2", g: "Der Brodgelehrte ficht für sein ganzes Dasein" },
      { w: "schiller", s: "kopf", k: "2", g: "Der philosophische Kopf liebt die Wahrheit mehr als sein System" },
      { w: "burckhardt", s: "krisen", k: "3", g: "Das brillante Narrenspiel der Hoffnung" },
      { w: "bismarck", s: "goltz", k: "1", g: "Sich vom Strome treiben lassen in der Meinung, ihn zu lenken" }
    ]
  },
  {
    id: "verflechtung",
    title: "Handel, Abhängigkeit und Resilienz",
    gloss: "Der vollständige deutsche Argumentationsraum: Wertschöpfung im Land halten, Frieden durch Verflechtung, Fähigkeiten vor Beständen, Versorgungssicherheit als Daueraufgabe — und die Chokepoints dazwischen.",
    ps: [
      { w: "hoernigk", s: "k9", k: "2", g: "Das Veredelungsgebot: der Lohn der Fabricatur" },
      { w: "kant", s: "handel", k: "1", g: "Der Handelsgeist, der mit dem Kriege nicht bestehen kann" },
      { w: "list", s: "kraefte", k: "1", g: "Die Kraft, Reichtümer zu schaffen, schlägt den Reichtum" },
      { w: "luxemburg", s: "anleihen", k: "2", g: "Anleihen: emanzipieren und bevormunden zugleich" },
      { w: "rathenau", s: "zukunft", k: "1", g: "Unabhängig vom Wohlwollen des Verkäufers und des Gläubigers" },
      { w: "ratzel", s: "lage", k: "2", g: "Perim oder Singapur: die Lage korrigiert die Überschätzung des Raumes" }
    ]
  },
  {
    id: "regeln",
    title: "Regeln, Recht und Vertrauen",
    gloss: "Offener Austausch als Recht, nicht als Gnade; was geschieht, wenn der Starke den gemeinsamen Nutzen der Regeln aufkündigt; und die Sprache als erstes Opfer.",
    ps: [
      { w: "kant", s: "welt", k: "1", g: "Besuchsrecht statt Eroberung: die Erde als Kugelfläche" },
      { w: "thukydides", s: "melier", k: "90", g: "Der Schwache verteidigt, »was für Alle gemeinsamer Nutzen ist«" },
      { w: "thukydides", s: "iii82", k: "2", g: "Die Bedeutung der Worte änderte man nach Belieben" },
      { w: "weber", s: "staat", k: "1", g: "Das Monopol legitimer physischer Gewaltsamkeit" }
    ]
  },
  {
    id: "umsetzung",
    title: "Umsetzung unter Ungewissheit",
    gloss: "Alles ist sehr einfach, aber das Einfachste ist schwierig: Friktion, der erste Feindkontakt — und die Organisationsantwort: kurz befehlen, Zweck mitgeben, Abweichung erlauben.",
    ps: [
      { w: "clausewitz", s: "c7", k: "1", g: "Friktion: man bleibt weit hinter dem Ziel" },
      { w: "clausewitz", s: "c7", k: "2", g: "Jedes Individuum behält seine eigene Friktion" },
      { w: "moltke", s: "plan", k: "2", g: "Kein Operationsplan überlebt den ersten Kontakt" },
      { w: "moltke", s: "auftrag", k: "2", g: "Nicht mehr befehlen, als durchaus nöthig ist" },
      { w: "moltke", s: "auftrag", k: "3", g: "Den Zweck kennen, um notfalls anders zu handeln als befohlen" }
    ]
  },
  {
    id: "fuehrung",
    title: "Führung und Verantwortung",
    gloss: "Führen statt geführt werden; Leidenschaft, Verantwortungsgefühl, Augenmaß; die Haftung für voraussehbare Folgen — und wehe dem, der die Kriegstrompete vom Kaminfeuer aus bläst.",
    ps: [
      { w: "thukydides", s: "ii65", k: "1", g: "Perikles nahm sich das Recht, auch mit Leidenschaft zu widersprechen" },
      { w: "weber", s: "qualitaeten", k: "1", g: "Leidenschaft – Verantwortungsgefühl – Augenmaß" },
      { w: "weber", s: "ethik", k: "2", g: "Diese Folgen werden meinem Tun zugerechnet" },
      { w: "bismarck", s: "olmuetz", k: "1", g: "Ein Kriegsgrund, der auch nach dem Kriege noch stichhaltig ist" },
      { w: "burckhardt", s: "macht", k: "2", g: "Die Macht ist an sich böse — eine Gier, eo ipso unerfüllbar" },
      { w: "weber", s: "bohren", k: "1", g: "Das starke langsame Bohren von harten Brettern" }
    ]
  }
];

function viewConcordance() {
  const wrap = el(`<div>
    <div class="viewhead">
      <span class="tag">Executive-Konkordanz</span>
      <h1>Acht Führungsfragen, auf die Quellen abgebildet</h1>
      <p class="lede">Aktuelle Probleme der Unternehmensführung, jeweils verknüpft mit den Passagen
      des Korpus, die ihre Struktur behandeln. Jeder Chip öffnet den Lesesaal an der Stelle. Die
      Zuordnung ist editorial — eine Leseeinladung, kein Beweis durch Zitat; das Protokoll für den
      verantwortlichen Umgang mit Analogien steht in der <a href="#/introduction">Einführung</a>, § 4.</p>
    </div>
  </div>`);
  THEMES.forEach(th => {
    const card = el(`<div class="panel theme">
      <h2 style="margin-top:0">${esc(th.title)}</h2>
      <p class="lede" style="font-size:.95rem">${esc(th.gloss)}</p>
    </div>`);
    th.ps.forEach(p => {
      const w = workById(p.w); const t = D.texts[p.w];
      const sec = t.sections.find(s => s.id === p.s);
      const u = sec.units.find(x => String(x.k) === String(p.k));
      card.append(el(`<div class="passage">
        <a class="cite" href="#/work/${p.w}/${esc(p.s)}/${esc(p.k)}">${esc(citeOf(w, sec, u))}</a>
        <span class="gloss">${esc(w.author)} — ${esc(p.g)}</span>
      </div>`));
    });
    wrap.append(card);
  });
  view.append(wrap);
}

/* ================================================================ ATLAS */
/* Kookkurrenz-Netz der Leitbegriffe; vorberechnet durch tools/build-network.js */
let NET = null, atlasStop = null;

async function viewAtlas() {
  if (!NET) NET = await fetch("data/network.json").then(r => r.json());
  view.append(el(`<div>
    <div class="viewhead"><span class="tag">Begriffsnetz</span>
      <h1>Atlas</h1>
      <p class="lede">Die ${NET.nodes.length} Leitbegriffe des Korpus, verknüpft, wo sie in derselben
      Exzerpt-Einheit stehen. Die Farbe zeigt die Linie, deren Texte den Begriff am häufigsten
      verwenden (<span style="color:var(--state)">Staatskunst</span> ·
      <span style="color:var(--trade)">Handel</span> ·
      <span style="color:var(--strat)">Strategie</span>); die Größe die Häufigkeit. Ein Klick zeigt
      Nachbarn und Belegstellen — eine Begriffslandkarte, auf der dreizehn Werke aus 2300 Jahren
      ein Vokabular teilen.</p></div>
    <div class="toolbar">
      <label class="fine" for="dens">Dichte</label>
      <select id="dens">
        <option value="160">licht</option>
        <option value="320" selected>mittel</option>
        <option value="600">dicht</option>
      </select>
      <span class="fine" id="atlasinfo"></span>
    </div>
    <div class="card" style="padding:0;overflow:hidden"><canvas id="cv" style="width:100%;display:block;cursor:pointer"></canvas></div>
    <div id="sel"></div>
    <div class="card" style="margin-top:1.2rem"><span class="tag">Brückenbegriffe</span>
      <p style="margin:.5rem 0 0" class="readable">Begriffe, die vier oder mehr Werke tragen — das
      gemeinsame Vokabular, in dem die Linien miteinander streiten:
      ${NET.bridges.map(b => `<button class="chip" data-b="${esc(b)}">${esc(b)}</button>`).join(" ")}</p></div>
  </div>`));
  const cv = view.querySelector("#cv");
  const selBox = view.querySelector("#sel");
  const densSel = view.querySelector("#dens");
  const W = Math.min(view.clientWidth || 900, 980), H = Math.max(460, Math.round(W * 0.62));
  const dpr = window.devicePixelRatio || 1;
  cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px";
  const cx = cv.getContext("2d"); cx.scale(dpr, dpr);

  const nodes = NET.nodes.map(n => ({ ...n,
    x: W / 2 + (Math.random() - 0.5) * W * 0.8, y: H / 2 + (Math.random() - 0.5) * H * 0.8,
    vx: 0, vy: 0, r: 3 + Math.sqrt(n.f) * 1.4 }));
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  const LBL = [...nodes.map(n => n.f)].sort((a, b) => b - a)[24] || 3;
  let edges = [], selected = null, tick = 0;

  function setDensity() {
    edges = NET.edges.slice(0, +densSel.value).map(e => ({ ...e, a: byId[e.s], b: byId[e.t] }))
      .filter(e => e.a && e.b);
    view.querySelector("#atlasinfo").textContent =
      `${nodes.length} Begriffe · ${edges.length} Verknüpfungen · aus ${NET.n_units} Exzerpt-Einheiten`;
    tick = 0;
  }
  setDensity();
  densSel.onchange = setDensity;

  function step() {
    for (const n of nodes) { n.fx = 0; n.fy = 0; }
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      let dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + 40;
      const f = 1400 / d2;
      const d = Math.sqrt(d2);
      dx /= d; dy /= d;
      a.fx += dx * f; a.fy += dy * f; b.fx -= dx * f; b.fy -= dy * f;
    }
    for (const e of edges) {
      let dx = e.b.x - e.a.x, dy = e.b.y - e.a.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const want = 60 + 700 / (e.w + 4);
      const f = (d - want) * 0.004 * Math.min(e.w, 6);
      dx /= d; dy /= d;
      e.a.fx += dx * f * d * 0.02; e.a.fy += dy * f * d * 0.02;
      e.b.fx -= dx * f * d * 0.02; e.b.fy -= dy * f * d * 0.02;
    }
    for (const n of nodes) {
      n.fx += (W / 2 - n.x) * 0.004; n.fy += (H / 2 - n.y) * 0.004;
      n.vx = (n.vx + n.fx) * 0.82; n.vy = (n.vy + n.fy) * 0.82;
      n.x += n.vx; n.y += n.vy;
      n.x = Math.max(14, Math.min(W - 14, n.x)); n.y = Math.max(14, Math.min(H - 14, n.y));
    }
  }

  const COLOR = { state: "#8fb4d9", trade: "#c9a15a", strat: "#c98070" };
  function draw() {
    cx.clearRect(0, 0, W, H);
    const neigh = new Set();
    if (selected) for (const e of edges) {
      if (e.a === selected) neigh.add(e.b);
      if (e.b === selected) neigh.add(e.a);
    }
    for (const e of edges) {
      const on = selected && (e.a === selected || e.b === selected);
      cx.strokeStyle = on ? "rgba(201,161,90,.55)" : "rgba(160,160,180,.13)";
      cx.lineWidth = on ? 1.4 : Math.min(1, 0.3 + e.w * 0.05);
      cx.beginPath(); cx.moveTo(e.a.x, e.a.y); cx.lineTo(e.b.x, e.b.y); cx.stroke();
    }
    for (const n of nodes) {
      const dimmed = selected && n !== selected && !neigh.has(n);
      cx.globalAlpha = dimmed ? 0.25 : 1;
      cx.fillStyle = COLOR[n.linie];
      cx.beginPath(); cx.arc(n.x, n.y, n.r, 0, 7); cx.fill();
      if (n === selected) { cx.strokeStyle = "#fff"; cx.lineWidth = 1.5; cx.stroke(); }
      if (!dimmed && (n.f >= LBL || n === selected || neigh.has(n))) {
        cx.fillStyle = "rgba(233,230,224,.92)";
        cx.font = (n === selected ? "600 " : "") + "11px system-ui, sans-serif";
        cx.textAlign = "center";
        cx.fillText(n.id, n.x, n.y - n.r - 4);
      }
      cx.globalAlpha = 1;
    }
  }

  let raf;
  function loop() {
    if (tick < 260) { step(); tick++; }
    draw();
    raf = requestAnimationFrame(loop);
  }
  loop();
  atlasStop = () => cancelAnimationFrame(raf);

  function select(n) {
    selected = n;
    selBox.innerHTML = "";
    if (!n) return;
    const co = edges.filter(e => e.a === n || e.b === n)
      .map(e => ({ o: e.a === n ? e.b : e.a, c: e.c })).sort((a, b) => b.c - a.c).slice(0, 14);
    const wk = Object.entries(n.works).sort((a, b) => b[1] - a[1]);
    selBox.append(el(`<div class="card" style="margin-top:1.2rem">
      <div style="display:flex;gap:.8rem;align-items:baseline;flex-wrap:wrap">
        <h3 style="margin:0;color:${COLOR[n.linie]}">${esc(n.id)}</h3>
        <span class="fine">${n.f} Exzerpt-Einheiten · in ${n.spread} von ${D.works.length} Werken</span></div>
      <p class="fine" style="margin:.4rem 0">${wk.map(([id, c]) => {
        const w = workById(id);
        return `${esc(w ? w.abbr : id)}: ${c}`; }).join(" · ")}</p>
      <p style="margin:.4rem 0 0">${co.map(x =>
        `<button class="chip" data-b="${esc(x.o.id)}">${esc(x.o.id)} <span class="fine">${x.c}</span></button>`).join(" ")}</p>
      <p style="margin:.6rem 0 0">${n.cites.map(([wid, sid, k]) => {
        const w = workById(wid);
        const t = D.texts[wid];
        const s = t && t.sections.find(x => x.id === sid);
        const u = s && s.units.find(x => String(x.k) === String(k));
        return u ? `<a class="cite" href="#/work/${wid}/${esc(sid)}/${esc(k)}">${esc(citeOf(w, s, u))}</a>` : "";
      }).join(" ")}</p>
    </div>`));
    selBox.querySelectorAll("[data-b]").forEach(b => b.onclick = () => select(byId[b.dataset.b]));
  }

  cv.onclick = ev => {
    const r = cv.getBoundingClientRect();
    const x = (ev.clientX - r.left) * (W / r.width), y = (ev.clientY - r.top) * (H / r.height);
    let best = null, bd = 400;
    for (const n of nodes) {
      const d = (n.x - x) ** 2 + (n.y - y) ** 2;
      if (d < bd && d < (n.r + 10) ** 2) { best = n; bd = d; }
    }
    select(best);
  };
  view.querySelectorAll("[data-b]").forEach(b => b.onclick = () => select(byId[b.dataset.b]));
}

/* ========================================================== ANWENDUNGEN */
function viewApplications() {
  view.append(el(`<div>
    <div class="viewhead">
      <span class="tag">Anwendungen</span>
      <h1>Der Korpus, auf die Gegenwart angewendet</h1>
      <p class="lede">Drei Begleitseiten desselben Autors wenden diese Lesart auf laufende
      Ereignisse an. Sie sind frei zugänglich, trackerfrei und institutionell unabhängig — und sie
      passen unterschiedlich gut zu dieser Seite; die Einordnung dazu steht unten und verschweigt
      die Grenzen nicht.</p>
    </div>

    <div class="grid g2">
      <div class="card appcard linie-strat">
        <h2><a href="https://ukraine-war-monitor.netlify.app/" rel="noopener">Ukraine War Monitor</a></h2>
        <p class="url">ukraine-war-monitor.netlify.app · englischsprachig</p>
        <p>Ein historisch fundierter, quellenbasierter Überblick über Russlands Krieg gegen die
        Ukraine (seit 2022) mit täglicher OSINT-Analyse und evidenzbasiertem Monitoring-Dashboard.
        Für Leser dieses Korpus ein laufendes Laboratorium: Abnutzung und Kulminationspunkt
        (<a href="#/work/clausewitz">Clausewitz</a>), Koalitionszusammenhalt und die Ströme der
        Bündnisse (<a href="#/work/bismarck">Bismarck</a>), Sanktionen und die Bewirtschaftung der
        Abhängigkeit (<a href="#/work/rathenau">Rathenau</a> · <a href="#/work/hoernigk">Hörnigk</a>),
        die Grenzen des Handelsgeist-Arguments (<a href="#/work/kant">Kant</a>) — täglich, mit
        Quellen, beobachtbar.</p>
      </div>
      <div class="card appcard linie-state">
        <h2><a href="https://geopolitical-analogist.netlify.app/" rel="noopener">Geopolitical Analogist</a></h2>
        <p class="url">geopolitical-analogist.netlify.app · englischsprachig</p>
        <p>Ein interaktives Werkzeug für genau die Methode, die die <a href="#/introduction">Einführung</a>
        (§ 4) entwickelt: Man beschreibt einen aktuellen Konflikt oder eine politische Lage, und das
        Werkzeug schlägt strukturierte historische Analogien vor — mit Gemeinsamkeiten,
        Unterschieden und Quellen zum Nachprüfen. Es ersetzt die Unterschiedsspalte nicht, es
        erzwingt sie: Analogien als Hypothesen, nie als Beweise.</p>
      </div>
      <div class="card appcard linie-trade">
        <h2><a href="https://deutschland-monitor.netlify.app/" rel="noopener">Deutschland-Monitor · Personenschutz-Radar</a></h2>
        <p class="url">deutschland-monitor.netlify.app · deutschsprachig</p>
        <p>Ein Lagebild zur Gefährdung von Amts- und Mandatsträgern in Deutschland. Kein
        Geopolitik-Werkzeug im engeren Sinn — aber die deutschsprachige Anwendung eines
        Kernbefunds dieses Korpus: Politische Gewalt gegen Verantwortungsträger ist der Ernstfall
        von Webers Gewaltmonopol (<a href="#/work/weber">Weber</a> — dessen Vortrag zwischen den
        Morden an Eisner und, drei Jahre später, an <a href="#/work/rathenau">Rathenau</a> steht),
        der Frühindikator der Begriffsverrohung, die Thukydides in Kerkyra beschreibt
        (<a href="#/work/thukydides/iii82/2">Thuk. III,82 [2]</a>), und ein Krisenzeichen im Sinne
        Burckhardts (<a href="#/work/burckhardt">Burckhardt</a>).</p>
      </div>
    </div>

    <div class="panel">
      <h2>Kritische Einordnung — was passt hier wozu?</h2>
      <p class="readable">Die drei Werkzeuge wurden für diese Seite ausdrücklich geprüft, nicht nur
      verlinkt. <strong>Ukraine War Monitor</strong> und <strong>Geopolitical Analogist</strong>
      passen inhaltlich am engsten — der eine als tägliche Empirie zu den Strukturen des Korpus,
      der andere als Umsetzung seiner Methode —, sind aber englischsprachig; wer die Quellen dieser
      Seite auf Deutsch liest, wechselt dort die Sprache. Das ist eine echte Hürde und wird hier
      benannt statt beschönigt. Der <strong>Deutschland-Monitor</strong> ist deutschsprachig, liegt
      aber thematisch am Rand: Er beobachtet innere Gefährdungslagen, nicht Geopolitik. Er steht
      trotzdem hier, weil der Korpus selbst den Zusammenhang herstellt — die Verrohung der Begriffe
      und die Gewalt gegen Verantwortungsträger sind bei Thukydides, Weber und in Rathenaus
      Biographie keine Innen-, sondern Ordnungsfragen. Wer nur eines der drei Werkzeuge nutzt,
      wähle das zur eigenen Frage passende — nicht das sprachlich bequemste.</p>
    </div>

    <div class="panel">
      <h2>Ein kurzes Protokoll historischen Gegenwartslesens</h2>
      <p class="readable">1. Erst die Gegenwart sortieren — Bekanntes, Unklares, Unterstelltes —,
      dann zur Geschichte greifen. 2. Mindestens zwei Analogien beschaffen, die in verschiedene
      Richtungen zeigen. 3. Für jede: Gemeinsamkeiten und Unterschiede in ausdrücklichen Spalten;
      die Unterschiede wiegen schwerer. 4. Strukturähnlichkeit (Anreize, Fähigkeiten, Durchsetzung,
      Geographie) vor Dramenähnlichkeit (Personen, Stimmungen, moralische Besetzung).
      5. Die überlebende Analogie in prüfbare Erwartungen übersetzen — was müssten wir als
      Nächstes sehen, wenn sie trägt? — und terminiert wiedervorlegen. Herkunft des Protokolls
      (Neustadt &amp; May, Khong, Jervis): <a href="#/introduction">Einführung</a>.</p>
    </div>

    <p class="fine">Diese Werkzeuge sind Analysehilfen. Nichts auf dieser Seite oder ihren
    Begleitseiten ist Anlage-, Rechts- oder Politikberatung.</p>
  </div>`));
}

/* ============================================================== METHODE */
function viewMethod() {
  view.append(el(`<div>
    <div class="viewhead">
      <span class="tag">Methode &amp; Rechte</span>
      <h1>Methode, Quellen und Grenzen</h1>
      <p class="lede">Was ausgewählt wurde, aus welchen Ausgaben, nach welchen Regeln — und was
      draußen blieb.</p>
    </div>

    <div class="panel">
      <h2>Auswahlregeln</h2>
      <p class="readable">Drei Regeln bestimmen den Korpus. <strong>Gemeinfreiheit:</strong> Jedes
      Wort Primärtext auf dieser Seite ist gemeinfrei — deutschsprachige Originale nach Ablauf der
      Schutzfristen, Thukydides in einer gemeinfreien Übersetzung; kein Exzerpt stützt sich auf
      Zitatrecht. <strong>Dreizehn Werke</strong> (die Zwölfer-Grenze der Erstfassung wurde für Luxemburg um eins erweitert), ausgewählt nach Strukturertrag für Führung
      und Geopolitik, nicht nach Berühmtheit, geordnet in drei Linien (Staatskunst, Handel,
      Strategie). <strong>Deutschsprachige Quellen als generelle Linie:</strong> zwölf der dreizehn Werke
      sind deutschsprachige Originale; Thukydides steht als Weltklassiker-Anker in deutscher
      Übersetzung — die Begründung gibt die <a href="#/introduction">Einführung</a>, § 2.
      <strong>Exzerpte, keine Denkmäler:</strong> Jedes Werk ist mit seinen analytisch tragenden
      Passagen in exaktem Wortlaut vertreten; Auslassungen sind mit […] markiert. Wer die ganzen
      Werke will, findet unten die Quellen.</p>
    </div>

    <div class="panel">
      <h2>Zitierweise und Anker</h2>
      <p class="readable">Jede Exzerpt-Einheit trägt einen Chip wie
      <span class="cite">Thuk. I,23 [1]</span>: die fachübliche Stellenangabe plus die
      Einheitsnummer dieser Seite in Klammern. Chips sind stabile Tiefenlinks (z. B.
      <span class="mono">#/work/thukydides/i23/1</span>) und können direkt zitiert oder geteilt
      werden. Die Einheitsgrenzen sind editorial; die Nummern in Klammern gehören dieser Seite,
      die Stellenangaben davor der Fachtradition.</p>
    </div>

    <div class="panel">
      <h2>Ausgaben und Quellen</h2>
      <div class="tablewrap"><table>
        <tr><th>Werk</th><th>Verwendete Ausgabe</th><th>Quelle</th></tr>
        <tr><td>Thukydides, <em>Geschichte des Peloponnesischen Kriegs</em></td><td>übers. Adolf Wahrmund, Stuttgart 1864</td><td><a href="https://archive.org/details/geschichtedespel00thucuoft" rel="noopener">archive.org (Toronto-Scan)</a></td></tr>
        <tr><td>Hörnigk, <em>Oesterreich über alles</em></td><td>Druck 1684; Transkription GHDI (GHI Washington)</td><td><a href="https://ghdi.ghi-dc.org/" rel="noopener">germanhistorydocs (GHDI)</a></td></tr>
        <tr><td>Schiller, <em>Universalgeschichte</em></td><td>Erstdruck, Der Teutsche Merkur 1789</td><td><a href="https://de.wikisource.org/wiki/Was_hei%C3%9Ft_und_zu_welchem_Ende_studiert_man_Universalgeschichte%3F" rel="noopener">Wikisource</a></td></tr>
        <tr><td>Kant, <em>Zum ewigen Frieden</em></td><td>Text nach dem Erstdruck 1795/96</td><td><a href="https://www.gutenberg.org/ebooks/46873" rel="noopener">Project Gutenberg #46873</a></td></tr>
        <tr><td>Clausewitz, <em>Vom Kriege</em></td><td>Erstausgabe 1832 ff.; digitale Ausgabe der Clausewitz-Gesellschaft (modernisierte Orthographie)</td><td><a href="https://www.clausewitz-gesellschaft.de/" rel="noopener">clausewitz-gesellschaft.de (PDF)</a></td></tr>
        <tr><td>List, <em>Das nationale System</em></td><td>1841; Ausgabe H. Waentig, Jena 1904 (mitlaufende Erstausgaben-Paginierung)</td><td><a href="https://archive.org/details/dasnationalesys00list" rel="noopener">archive.org</a></td></tr>
        <tr><td>Moltke, <em>Über Strategie · Verordnungen 1869</em></td><td>Militärische Werke II.2, Mittler 1900, S. 171 ff., 289 ff.</td><td><a href="https://archive.org/details/bub_gb_aHM-AAAAYAAJ" rel="noopener">archive.org (Google-Scan)</a></td></tr>
        <tr><td>Burckhardt, <em>Weltgeschichtliche Betrachtungen</em></td><td>hg. Oeri 1905; Digitalisierung Projekt Gutenberg-DE (Ausgabe Stadelmann 1949)</td><td><a href="https://www.projekt-gutenberg.org/burckhar/weltgesc/" rel="noopener">Projekt Gutenberg-DE</a></td></tr>
        <tr><td>Ratzel, <em>Politische Geographie</em> · <em>Das Meer</em></td><td>Erstausgaben Oldenbourg 1897 / 1900</td><td><a href="https://archive.org/details/politischegeogra00ratzuoft" rel="noopener">archive.org (1897)</a> · <a href="https://archive.org/details/ratzel-1900-das-meer-als-quelle-der-volkergrosse.-eine-politisch-geographische-studie" rel="noopener">archive.org (1900)</a></td></tr>
        <tr><td>Bismarck, <em>Gedanken und Erinnerungen</em></td><td>zeno.org (Ausgabe 1959); Kernstellen kollationiert mit Cotta 1898</td><td><a href="http://www.zeno.org/Geschichte/M/Bismarck,+Otto+von/Gedanken+und+Erinnerungen" rel="noopener">zeno.org</a> · <a href="https://www.deutschestextarchiv.de/book/show/bismarck_erinnerungen02_1898" rel="noopener">DTA (Erstausgabe)</a></td></tr>
        <tr><td>Luxemburg, <em>Die Akkumulation des Kapitals</em></td><td>Erstausgabe Buchhandlung Vorwärts Paul Singer, Berlin 1913</td><td><a href="https://archive.org/details/rosa-luxemburg-die-akkumulation-des-kapitals_202503" rel="noopener">archive.org (Erstdruck-Scan)</a> · <a href="https://www.marxists.org/deutsch/archiv/luxemburg/1913/akkkap/" rel="noopener">MIA-Transkription</a></td></tr>
        <tr><td>Rathenau, <em>Deutschlands Rohstoffversorgung</em></td><td>Gesammelte Schriften Bd. 5, S. Fischer 1918, S. 23–58</td><td><a href="https://archive.org/details/gesammelteschrif05rathuoft" rel="noopener">archive.org (Toronto-Scan)</a></td></tr>
        <tr><td>Weber, <em>Politik als Beruf</em></td><td>Erstdruck Duncker &amp; Humblot 1919</td><td><a href="https://de.wikisource.org/wiki/Politik_als_Beruf" rel="noopener">Wikisource</a></td></tr>
      </table></div>
    </div>

    <div class="panel">
      <h2>Textbehandlung und Verifikation</h2>
      <p class="readable">Exzerpte geben ihre Vorlagen wörtlich wieder, einschließlich historischer
      Orthographie (Hörnigks Barockdeutsch, „Aushülfen“, „Thaten“, „nöthigten“). Eingriffe
      beschränken sich auf das Auflösen von Zeilentrennungen, das Markieren von Auslassungen mit
      […] und dokumentierte Einzelfälle. Besonderheiten: <strong>Thukydides</strong> — die
      Wahrmund-Übersetzung liegt nur als Fraktur-Scan vor; alle Kernstellen (I,22; I,23; II,65;
      III,82; V,89–97) wurden für diese Seite an den Seitenbildern des Drucks Wort für Wort
      verifiziert. <strong>Moltke</strong> und <strong>Ratzel</strong> — vollständig von den
      Fraktur-Seitenbildern transkribiert (Maschinen-OCR unbrauchbar); im Druck von 1900 steht in
      Moltkes Schlussdefinition „Kunst des Handels“, gemeint und in anderen Drucken überliefert
      ist „des Handelns“ — im Exzerpt entsprechend gekennzeichnet. <strong>Rathenau</strong> —
      jede Passage am Seitenbild der Gesammelten Schriften geprüft (u. a. „Scheüch“ mit Trema).
      <strong>Bismarck</strong> — Kernstellen gegen die Erstausgabe (Deutsches Textarchiv)
      kollationiert; eine dokumentierte Editionsvariante (1898: „die wir … zu bestehn“, 1959:
      „welche wir … bestehen“). <strong>Weber</strong> — ein Übertragungsfehler der
      Wikisource-Vorlage („veranwortungsethisch“) ist zu „verantwortungsethisch“ korrigiert.
      <strong>Clausewitz</strong> — die Ausgabe der Clausewitz-Gesellschaft modernisiert die
      Orthographie der Erstausgabe behutsam (z. B. „daß“ bleibt, „Modifikation“ statt
      „Modification“). <strong>Luxemburg</strong> — Kernstellen (Kap. 26, 30, 32 samt Schluss)
      wurden am Fraktur-OCR des Erstdrucks 1913 Wort für Wort geprüft; langes ſ ist als s
      wiedergegeben. Dokumentierte Editionsvariante: Der Erstdruck titelt Kapitel 32 „Der
      Militarismus <em>als</em> Gebiet der Kapitalakkumulation“, die Werkausgabe „auf dem
      Gebiet“; der Erstdruck liest „Kapitalherrschaft“ und „Entwickelung“, wo die Werkausgabe
      „Kapitalsherrschaft“ und „Entwicklung“ hat — diese Seite folgt dem Erstdruck.</p>
    </div>

    <div class="panel">
      <h2>Bismarck-Apokryphen — geprüft und nicht gefunden</h2>
      <p class="readable">Zwei der berühmtesten „Bismarck-Zitate“ stehen nachweislich nicht in den
      „Gedanken und Erinnerungen“: <em>„Politik ist die Kunst des Möglichen“</em> stammt aus einem
      Zeitungsgespräch mit Friedrich Meyer von Waldeck (1867); der Satz, man könne den Strom der
      Zeit nicht lenken, sondern nur „auf ihm fahren und steuern“, kursiert in Zitatsammlungen ohne
      belastbare Werkstelle — die Volltextsuche über alle drei Bücher (zeno.org und Deutsches
      Textarchiv) blieb ergebnislos. Das Werk enthält zwei andere Strom-Bilder (1848 und 1863;
      das zweite ist im Lesesaal), und auch das oft Bismarck zugeschriebene Dreier-Bündnis-Diktum
      steht nicht in G&amp;E, sondern im Bad Kissinger Diktat von 1877. Wer eines dieser Zitate
      verwenden will, zitiere die tatsächliche Quelle — oder gar nicht.</p>
    </div>

    <div class="panel">
      <h2>Der Fall Ratzel — Quelle und Wirkungsgeschichte</h2>
      <p class="readable">Ratzels politische Geographie steht im Korpus, seine Wirkungsgeschichte
      steht daneben — beides gehört zusammen. Sein Organizismus und der von ihm geprägte Begriff
      „Lebensraum“ (1901) wurden über Rudolf Kjellén und Karl Haushofers „Zeitschrift für
      Geopolitik“ zum Vokabular der NS-Expansionsideologie; nach 1945 war „Geopolitik“ im
      Deutschen ein tabuiertes Wort. Diese Seite hält es mit der quellenkritischen Forschung
      (Schultz; Ó Tuathail): Die analytischen Kategorien — Lage, Raum, Chokepoint — sind prüfbar
      und teils tragfähig; ihre Naturalisierung zum „Recht“ wachsender Staaten ist Ideologie und
      wird als solche benannt. <strong>Haushofer selbst fehlt bewusst:</strong> nicht aus
      Rechtsgründen, sondern weil seine Schriften keine Analyse mit belasteter Rezeption sind,
      sondern Rezeption als Programm — Propaganda im Gewand der Wissenschaft. Die Grenze dieser
      Unterscheidung ist diskutabel; sie wird hier gezogen und offengelegt statt umgangen.</p>
    </div>

    <div class="panel">
      <h2>Erwogen und zurückgestellt</h2>
      <p class="readable">Friedrich der Große (<em>Antimachiavell</em>, 1740) schied aus, weil das
      Original französisch ist und die zeitgenössischen deutschen Übersetzungen editorisch heikel
      sind. Kautilya und Sun Tzu stehen im englischen Schwesterkorpus; die gemeinfreien deutschen
      Fassungen (J. J. Meyer 1926; Bruno Navarra 1910) sind Kandidaten für eine Erweiterung.
      <strong>Rosa Luxemburg</strong> wurde aus dieser Kandidatinnenliste inzwischen als Werk 13
      in die Handelslinie aufgenommen. <strong>Bertha von Suttner</strong> (gemeinfrei; statt des
      Romans <em>Die Waffen nieder!</em> eignen sich ihre essayistischen Texte, etwa die
      Friedensnobelpreis-Rede von 1906) bleibt Kandidatin — allerdings für etwas anderes: den
      Grundstein einer eigenen <em>Gegenstimmen-Linie</em> nach dem Vorbild der „counter-voices“
      des Calculemus-Formats, falls der Korpus je um eine vierte Linie wachsen sollte. Die
      strategischen Klassiker des weiteren 20. Jahrhunderts (Schelling,
      Aron, Kissinger) bleiben urheberrechtlich außer Reichweite dieser Regeln.</p>
    </div>

    <div class="panel">
      <h2>Der Atlas</h2>
      <p class="readable">Der <a href="#/atlas">Atlas</a> ist ein Kookkurrenz-Netz aus den
      Exzerpt-Einheiten selbst: Knoten sind die Leitbegriffe des Korpus (nach Entfernung von
      Funktionswörtern und Zusammenführung historischer Schreibungen — <span class="mono">Theil</span>/Teil,
      <span class="mono">Thaten</span>/Taten, <span class="mono">nöthig</span>/nötig), verknüpft,
      wo zwei Begriffe in derselben Einheit stehen, gefärbt nach der Linie mit den meisten
      Verwendungen. Er wird durch <span class="mono">tools/build-network.js</span> erzeugt — das
      Skript liegt im Repositorium, die Karte ist reproduzierbar — und als
      <span class="mono">data/network.json</span> vorberechnet; nichts rechnet auf einem Server.
      Da er aus kuratierten Exzerpten entsteht, kartiert er diesen Apparat, nicht die Gesamtwerke:
      eine Lesehilfe, keine Korpuslinguistik.</p>
    </div>

    <div class="panel">
      <h2>Rechte</h2>
      <p class="readable">Alle Primärtexte dieser Seite sind gemeinfrei (jüngster Text: Weber 1919;
      Übersetzer Wahrmund † 1913). Die eigenen editorialen Beiträge — Einführung, Kopfnoten,
      Führungsperspektiven, Konkordanz-Glossen — stehen unter CC BY 4.0, der Code der Seite unter
      MIT-Lizenz, die abgeleiteten Exzerpt-Datendateien unter CC0; Details in der Datei LICENSES
      des Repositoriums. Die Seite ist ein persönliches Forschungsprojekt; sie ist keine Anlage-,
      Rechts- oder Politikberatung und spricht für keine Institution.</p>
    </div>
  </div>`));
}

/* =========================================================== DATENSCHUTZ */
function viewPrivacy() {
  view.append(el(`<div>
    <div class="viewhead"><span class="tag">Datenschutz</span>
      <h1>Datenschutzerklärung</h1>
      <p class="lede">Auf dem Detailniveau, auf dem sie tatsächlich wahr ist.</p></div>
    <div class="panel"><h2>Verantwortlicher</h2>
      <p class="readable">Diese Seite wird von einer Privatperson aus den Vereinigten Staaten
      betrieben; die Angaben stehen im <a href="#/imprint">Impressum</a>. Sie ist ein persönliches
      Forschungsprojekt, wird für keine Institution betrieben, und es werden keine Daten an Dritte
      weitergegeben.</p>
      <p class="readable">Da die Seite aus dem Europäischen Wirtschaftsraum abrufbar ist und sich
      mit ihren deutschsprachigen Inhalten erkennbar auch an Leserinnen und Leser dort richtet, ist
      diese Erklärung so gefasst, dass sie der Datenschutz-Grundverordnung genügt (räumlicher
      Anwendungsbereich: Art. 3 Abs. 2 DSGVO). Soweit die DSGVO anwendbar ist, ist der Betreiber
      Verantwortlicher im Sinne von Art. 4 Nr. 7 DSGVO.</p></div>
    <div class="panel"><h2>Was diese Seite technisch ist</h2>
      <p class="readable">Eine Sammlung statischer Dateien und sonst nichts: keine Serverfunktionen,
      keine Konten, keine Formulare, kein Newsletter. Die Seite setzt <strong>keinerlei Cookies</strong>
      und verwendet weder Analyse- noch Werbe- noch sonstige Drittdienste; alle Schriften und
      Skripte werden von dieser Seite selbst ausgeliefert. Beim Öffnen einer Seite wird daher genau
      ein Host kontaktiert: der in der Adresszeile. Die Suche läuft vollständig im Browser; nichts,
      was Sie eingeben, wird irgendwohin übertragen. Ausgehende Links (zu archive.org, Wikisource,
      zeno.org, den Begleitseiten) sind gewöhnliche Links: Daten fließen erst, wenn Sie sie
      anklicken.</p></div>
    <div class="panel"><h2>Server-Logs</h2>
      <p class="readable">Gehostet wird die Seite bei Netlify. Wie jeder Webhost protokolliert
      Netlifys Infrastruktur die ausgelieferten Anfragen — typischerweise IP-Adresse, Zeitstempel,
      angefragte URL, HTTP-Status, übertragene Bytes, User-Agent und Referrer. Das ist für den
      Betrieb einer Website technisch unvermeidlich und die einzige serverseitige Erhebung; der
      Betreiber wertet sie nicht aus. Soweit die DSGVO anwendbar ist, ist die Rechtsgrundlage
      Art. 6 Abs. 1 lit. f DSGVO — das berechtigte Interesse am Betrieb einer funktionsfähigen,
      sicheren Website. Die Speicherdauer richtet sich nach Netlifys Fristen. Betrieb und Hosting
      erfolgen in den Vereinigten Staaten; für Leserinnen und Leser im EWR bedeutet das eine
      Verarbeitung der Anfragedaten außerhalb des EWR.</p></div>
    <div class="panel"><h2>Ihre Rechte</h2>
      <p class="readable">Soweit die DSGVO anwendbar ist, bestehen die Rechte auf Auskunft,
      Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit (Art. 15–21
      DSGVO) sowie das Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO). Da diese Seite
      selbst keine personenbezogenen Daten speichert, betreffen solche Anliegen in der Regel
      Netlifys Logs; der Betreiber unterstützt dabei. Kontakt: die Anschrift im
      <a href="#/imprint">Impressum</a>.</p></div>
  </div>`));
}

/* ============================================================ IMPRESSUM */
function viewImprint() {
  view.append(el(`<div>
    <div class="viewhead"><span class="tag">Impressum</span>
      <h1>Impressum</h1>
      <p class="lede">Wer diese Seite betreibt und wie er zu erreichen ist.</p></div>
    <div class="panel"><h2>Betreiber</h2>
      <p class="readable">
        Dr. Pantaleon Fassbender<br>
        16751 NE 5th Street<br>
        Williston, FL 32696<br>
        Vereinigte Staaten von Amerika</p>
      <p class="readable">E-Mail: <a href="mailto:pantaleonfassbender@gmail.com">pantaleonfassbender@gmail.com</a></p>
      <p class="readable">Diese Seite ist ein persönliches Forschungsprojekt, betrieben und
      gehostet in den Vereinigten Staaten von einer Privatperson — nicht im Auftrag einer
      Institution, eines Arbeitgebers oder Verlags. Es steht kein Unternehmen dahinter; die Seite
      trägt weder Werbung noch Sponsoring.</p>
      <p class="readable">Verantwortlich für den Inhalt: Dr. Pantaleon Fassbender, Anschrift wie
      oben. Zum Umgang mit Daten siehe die <a href="#/privacy">Datenschutzerklärung</a>.</p></div>
    <div class="panel"><h2>Rechte an den Texten</h2>
      <p class="readable">Alle auf dieser Seite ausgelieferten Primärtexte sind gemeinfrei; der
      vollständige Nachweis, Ausgabe für Ausgabe, steht auf der
      <a href="#/method">Methodenseite</a>. Die eigenen editorialen Beiträge der Seite stehen
      unter CC BY 4.0, ihr Code unter MIT-Lizenz, die abgeleiteten Exzerpt-Daten unter CC0 —
      siehe die Datei LICENSES im Repositorium.</p></div>
  </div>`));
}

Object.assign(ROUTES, {
  overview: viewOverview, introduction: viewIntroduction, works: viewWorks,
  work: viewWork, concordance: viewConcordance, atlas: viewAtlas,
  applications: viewApplications, method: viewMethod, privacy: viewPrivacy, imprint: viewImprint,
});

boot();
