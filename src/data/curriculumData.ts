import { ModuleData } from '../types';

export const MODULES_DATA: ModuleData[] = [
  // ==========================================
  // DS 1: Unsere Entscheidung? (Präsenz / Offline)
  // ==========================================
  {
    id: 1,
    title: 'Unsere Entscheidung?',
    subtitle: 'Präsenzunterricht • Zettel-Streichen & Ethisches Fundament',
    locationName: '1. Unsere Entscheidung?',
    icon: 'Compass',
    timeEstimate: '90 Minuten',
    mapCoordinates: { x: 14, y: 72 },
    badgeId: 'badge_ethik_pionier',
    teacherGuide: {
      doppelstunde: 1,
      topic: 'Ethisches Fundament der Entscheidungsfindung – Selbsterfahrung Fremdbestimmung',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden spüren am eigenen Leib die emotionale Wucht eines fremdbestimmten Kontroll- und Autonomieverlusts.',
        'Sie leiten aus der Selbsterfahrung ethische Kriterien für gelingende Entscheidungen in vulnerablen Pflegesituationen ab.',
        'Sie vollziehen den Perspektivwechsel zu schwerstbetroffenen Menschen wie Stefan nach Schädel-Hirn-Trauma.',
      ],
      schedule: [
        {
          phase: 'Einstieg & Sensibilisierung',
          timeMinutes: 15,
          activity: 'Begrüßung, Vorstellung des Falls Stefan & Heike. Erläuterung der Bedeutung existenzieller Entscheidungen.',
          socialForm: 'Plenum',
          media: 'App-Startbildschirm & Zitat Heike',
          didacticNotes: 'Fokus auf emotionale Resonanz legen; keine Vorwegnahme theoretischer Modelle.',
        },
        {
          phase: 'Erster Teil: Zettel-Streichen',
          timeMinutes: 20,
          activity: 'Lernende notieren 10 Dinge/Personen/Werte auf Zetteln, ohne die ihr Leben nicht vorstellbar wäre. Danach müssen sie selbst 5 davon streichen.',
          socialForm: 'Einzelarbeit',
          media: '10 Moderationskarten / Notizblatt',
          didacticNotes: 'Stille im Raum halten. Die Schwere des freiwilligen Verzichts spürbar machen.',
        },
        {
          phase: 'Zweiter Teil: Fremdbestimmung',
          timeMinutes: 15,
          activity: 'Der Zettel wird an den/die Sitznachbar/in übergeben. Diese/r streicht ohne Rücksprache 2 weitere existentielle Dinge.',
          socialForm: 'Partnerarbeit',
          media: 'Zettel',
          didacticNotes: 'Beobachten der nonverbalen Reaktionen (Wut, Schock, Hilflosigkeit, Abwehr).',
        },
        {
          phase: 'Reflexion & Kriterien-Cluster',
          timeMinutes: 25,
          activity: 'Wie hat sich der Fremdeingriff angefühlt? Welche Kriterien braucht es, wenn jemand nicht mehr selbst entscheiden kann? Sammlung auf Padlet / Pinnwand.',
          socialForm: 'Plenum / Padlet',
          media: 'Digitales Padlet / Metaplanwand',
          didacticNotes: 'Kategorien herausarbeiten: Information, Wertschätzung, Einbezug von Stellvertretern, Zeit.',
        },
        {
          phase: 'Sicherung & Ausblick',
          timeMinutes: 15,
          activity: 'Überleitung zu DS 2 (Theorie der 3 Modelle) und Ausgabe der Logins für die Lern-App.',
          socialForm: 'Plenum',
          media: 'App-Roadmap Übersicht',
          didacticNotes: 'Aufgabe für DS 2: CNE Fachartikel vorbereitend sichten.',
        },
      ],
      blackboardSummary: `ETHISCHE GRUNDPFEILER DER ENTSCHEIDUNGSFINDUNG:
1. Autonomieprinzip (Selbstbestimmung): Der Patient bleibt Subjekt, kein Objekt.
2. Fürsorgeprinzip vs. Nichtschadensprinzip (Dilemma zwischen Schutz und Entmündigung).
3. Vulnerabilität: Bei Kommunikationsverlust droht totaler Kontrollverlust.
4. Kriterien guter Entscheidungen: Transparenz, Einbezug der Lebensgeschichte, multiprofessioneller Dialog, Zeit.`,
      padletQuestions: [
        'Wie hat es sich angefühlt, als die Nachbarperson über Ihre Zettel entschieden hat?',
        'Welche Rechte verliert ein Mensch, wenn er nicht mehr sprechen kann?',
        'Wann darf die Pflege oder der Arzt paternalistisch eingreifen – und wann ist es Grenzverletzung?',
      ],
      reflectionPrompts: [
        'Welche Gefühle traten beim Streichen der letzten 2 Zettel durch eine fremde Person auf?',
        'Wie unterscheidet sich der Blickwinkel einer Pflegekraft von dem der Lebenspartnerin Heike?',
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Stefan (vor dem Unfall gesunder Motorsportler), Heike (Lebenspartnerin), Pflegeteam.',
        whatHappened: 'Schweres Schädel-Hirn-Trauma durch Unfall. Totaler Bruch der bisherigen Lebensbiografie.',
        decisionsMade: 'Notfallmedizinische Maximaltherapie, Übernahme aller Lebensbereiche durch medizinisches Personal.',
        ethicalDilemmas: 'Wer entscheidet, was lebenswert ist? Wie ermittelt man den mutmaßlichen Willen?',
      },
      abedl: {
        13: {
          info: 'Extremer existenzieller Schock, vollständige Abhängigkeit von Fremdentscheidungen, Verlust der bisherigen Identität.',
          pesr: 'P: Gefahr des Verlusts existenzieller Selbstbestimmung. E: Kommunikationsunfähigkeit nach Trauma. S: Hilflosigkeit, Schock der Angehörigen. R: Enge Bindung zu Heike.',
        },
      },
      decisionAnalysis: 'In DS 1 steht das emotionale Begreifen von Paternalismus und Hilflosigkeit im Präsenzunterricht im Vordergrund.',
      passwordHint: 'DS 1 ist der Präsenz-Startpunkt. Das Passwort für DS 2 lautet: THEORIE',
    },
    requiredPassword: 'START',
  },

  // ==========================================
  // DS 2: Modelle der Entscheidung (Theorie & Onboarding)
  // ==========================================
  {
    id: 2,
    title: 'Modelle der Entscheidung',
    subtitle: 'Theoriebaustein, CNE Fachartikel & Interaktives Wissensquiz',
    locationName: '2. Modelle der Entscheidung',
    icon: 'GraduationCap',
    timeEstimate: '90 Minuten',
    mapCoordinates: { x: 26, y: 50 },
    badgeId: 'badge_quiz_master',
    teacherGuide: {
      doppelstunde: 2,
      topic: 'Die 3 Interaktionsmodelle: Paternalismus, Partizipative Entscheidungsfindung (PEF) & Informed Decision Making',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden können die 3 Modelle (Paternalismus, PEF, Informed Decision Making) anhand ihrer Schlüsselkriterien trennscharf unterscheiden.',
        'Sie kennen die Rollenverteilung, Informationsflüsse und Machtverhältnisse in jedem Modell.',
        'Sie wenden die Kriterien in einem interaktiven Quiz an und analysieren Vor- und Nachteile im Pflegealltag.',
      ],
      schedule: [
        {
          phase: 'Wiederholung & Hinführung',
          timeMinutes: 10,
          activity: 'Rückbezug auf die Zettel-Übung aus DS 1. Wo lag die Macht? Wo lag das Wissen?',
          socialForm: 'Plenum',
          media: 'Tafelbild',
          didacticNotes: 'Verbindung von Gefühl zu Theorie herstellen.',
        },
        {
          phase: 'Erarbeitung CNE Fachartikel',
          timeMinutes: 30,
          activity: 'Erarbeitung der Merkmale der 3 Modelle in Kleingruppen anhand des CNE-Fachartikels „Informationen teilen, gemeinsam entscheiden“ (Gunnar Geuter / Thieme).',
          socialForm: 'Gruppenarbeit / Textarbeit',
          media: 'CNE Fachtext / App-Theoriebibliothek',
          didacticNotes: 'Jede Gruppe übernimmt 1 Modell und stellt die Informations- und Machtverteilung dar.',
        },
        {
          phase: 'Interaktive Wissensüberprüfung (App-Quiz)',
          timeMinutes: 25,
          activity: 'Lernende absolvieren das integrierte 6-Fragen Quiz in der App einzeln oder zu zweit.',
          socialForm: 'Einzelarbeit / App',
          media: 'App-Quiz Tab',
          didacticNotes: 'Formatives Feedback: Falschantworten direkt didaktisch erläutern.',
        },
        {
          phase: 'Nachbesprechung & Falltransfer',
          timeMinutes: 25,
          activity: 'Auswertung der Quiz-Ergebnisse im Plenum. Wann ist PEF im Fall Stefan & Heike besonders herausfordernd?',
          socialForm: 'Plenum',
          media: 'Vergleichsmatrix (Beamer)',
          didacticNotes: 'Betonen: PEF ist keine einmalige Handlung, sondern ein kontinuierlicher Prozess!',
        },
      ],
      blackboardSummary: `VERGLEICH DER DREI ENTSCHEIDUNGSMODELLE (nach Thieme / CNE):

1. PATERNALISTIC MODEL (Paternalistisches Modell):
   - Wer entscheidet? Pflege bevormundet Patienten.
   - Wer kontrolliert Infos? Pflege hat alleinige Kontrolle.
   - Patientenwünsche? Werden nicht in die Entscheidung einbezogen.

2. PARTIZIPATIVE ENTSCHEIDUNGSFINDUNG (PEF / Shared Decision Making):
   - Wer entscheidet? Pflege und Patient treffen als Partner gemeinsam Entscheidungen.
   - Wer kontrolliert Infos? Pflege und Patient haben gemeinsam die Kontrolle.
   - Patientenwünsche? Werden in vollem Umfang in die Entscheidung einbezogen.

3. INFORMED DECISION MAKING MODEL (Informed Consent / Konsumenten-Modell):
   - Wer entscheidet? Pflege ist Informationsgeber; Patient handelt/entscheidet allein.
   - Wer kontrolliert Infos? Beide haben Kontrolle über Infos; Entscheidung obliegt allein dem Patienten.
   - Patientenwünsche? Werden in vollem Umfang einbezogen.`,
      reflectionPrompts: [
        'Warum ist das reine "Informed Decision Making" bei schwerstkranken Patienten oft eine Überforderung für Angehörige?',
        'Welche Barrieren verhindern im hektischen Pflegealltag eine echte PEF?',
      ],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Welches Kernmerkmal kennzeichnet die „Partizipative Entscheidungsfindung (PEF)“ laut CNE-Fachartikel am treffendsten?',
        type: 'multiple_choice',
        options: [
          {
            id: 'q1_a',
            text: 'Die Pflegekraft entscheidet alleine zum Wohle des Patienten, da sie die größte Fachexpertise besitzt.',
            isCorrect: false,
            explanation: 'Falsch: Das beschreibt das paternalistische Modell (Pflege bevormundet den Patienten).',
          },
          {
            id: 'q1_b',
            text: 'Pflege und Patient treffen als Partner gemeinsam Entscheidungen, teilen Informationen und beziehen Patientenwerte vollumfänglich ein.',
            isCorrect: true,
            explanation: 'Richtig! PEF bedeutet gemeinsame Verantwortung, Informationsaustausch auf Augenhöhe und Einbeziehung aller Werte.',
          },
          {
            id: 'q1_c',
            text: 'Die Pflegekraft ist reiner Informationsgeber und überlässt die Entscheidung allein dem Patienten/Angehörigen.',
            isCorrect: false,
            explanation: 'Falsch: Das entspricht dem reinen Informed Decision Making Model.',
          },
        ],
      },
      {
        id: 'q2',
        question: 'Wer kontrolliert die Informationen im paternalistischen Modell?',
        type: 'multiple_choice',
        options: [
          {
            id: 'q2_a',
            text: 'Die Pflegekraft bzw. das Behandlungsteam hat die alleinige Kontrolle über die Informationen.',
            isCorrect: true,
            explanation: 'Richtig: Im paternalistischen Modell behält die Pflege/Medizin das Wissens- und Kontrollmonopol.',
          },
          {
            id: 'q2_b',
            text: 'Beide Parteien haben gleichermaßen Zugriff auf alle diagnostischen Befunde.',
            isCorrect: false,
            explanation: 'Falsch: Geteilte Information ist das Kennzeichen von PEF und Informed Decision Making.',
          },
          {
            id: 'q2_c',
            text: 'Allein der Patient entscheidet, welche Informationen weitergegeben werden.',
            isCorrect: false,
            explanation: 'Falsch: Das entspricht nicht dem Paternalismus.',
          },
        ],
      },
      {
        id: 'q3',
        question: 'Was ist die typische Rolle der Pflegekraft im „Informed Decision Making Model“?',
        type: 'multiple_choice',
        options: [
          {
            id: 'q3_a',
            text: 'Die Pflegekraft übernimmt stellvertretend die rechtliche Betreuung.',
            isCorrect: false,
            explanation: 'Falsch: Betreuungen sind juristische Funktionen, keine pflegerische Modellrolle.',
          },
          {
            id: 'q3_b',
            text: 'Die Pflegekraft ist reiner Informationsgeber und setzt nachher die vom Patienten gewünschte Intervention um.',
            isCorrect: true,
            explanation: 'Richtig: Die Pflegekraft liefert Fakten/Optionen, die Entscheidung trifft der Patient allein.',
          },
          {
            id: 'q3_c',
            text: 'Die Pflegekraft verhandelt so lange, bis ein partnerschaftlicher Kompromiss entsteht.',
            isCorrect: false,
            explanation: 'Falsch: Das Aushandeln auf Augenhöhe ist Kern der PEF.',
          },
        ],
      },
      {
        id: 'q4',
        question: 'Wie werden Patientenwünsche und Werte im paternalistischen Modell berücksichtigt?',
        type: 'multiple_choice',
        options: [
          {
            id: 'q4_a',
            text: 'Sie werden nicht in die Entscheidung einbezogen.',
            isCorrect: true,
            explanation: 'Richtig: Die Expertenhaltung übergeht individuelle Präferenzen zugunsten rein fachlicher Vorgaben.',
          },
          {
            id: 'q4_b',
            text: 'Sie haben stets Vorrang vor allen medizinischen Leitlinien.',
            isCorrect: false,
            explanation: 'Falsch: Das wäre eine radikale Autonomie.',
          },
          {
            id: 'q4_c',
            text: 'Sie werden im multiprofessionellen Team abgestimmt.',
            isCorrect: false,
            explanation: 'Falsch: Dies geschieht bei der PEF.',
          },
        ],
      },
      {
        id: 'q5',
        question: 'In welcher Pflegesituation ist ein paternalistisches Handeln temporär ethisch begründbar?',
        type: 'multiple_choice',
        options: [
          {
            id: 'q5_a',
            text: 'In akuten Notfällen bei Bewusstlosigkeit/akuter Lebensgefahr, wenn kein mutmaßlicher Wille bekannt ist.',
            isCorrect: true,
            explanation: 'Richtig: Bei akuter Lebensgefahr gilt der mutmaßliche Wille zur Lebenserhaltung, bis Partizipation möglich ist.',
          },
          {
            id: 'q5_b',
            text: 'Wenn der Patient andere religiöse oder persönliche Werte als das Pflegeteam vertritt.',
            isCorrect: false,
            explanation: 'Falsch: Das verletzt die Glaubens- und Gewissensfreiheit sowie die Patientenautonomie.',
          },
          {
            id: 'q5_c',
            text: 'Wenn die Schichtübergabe kurz bevorsteht und wenig Zeit bleibt.',
            isCorrect: false,
            explanation: 'Falsch: Zeitmangel rechtfertigt keine Entmündigung.',
          },
        ],
      },
      {
        id: 'q6',
        question: 'Warum birgt das reine Informed Decision Making bei schwerster Erkrankung (wie im Fall Stefan) oft Überlastung für Angehörige?',
        type: 'multiple_choice',
        options: [
          {
            id: 'q6_a',
            text: 'Weil Angehörige mit existenziellen, komplexen medizinischen Weichenstellungen ohne beratende Partnerrolle allein gelassen werden.',
            isCorrect: true,
            explanation: 'Richtig: Das bloße Nennen von Risiken ohne begleitende Beratung überfordert Angehörige emotional.',
          },
          {
            id: 'q6_b',
            text: 'Weil Angehörige keine medizinischen Fachbegriffe in Broschüren lesen dürfen.',
            isCorrect: false,
            explanation: 'Falsch: Broschüren sind frei zugänglich.',
          },
          {
            id: 'q6_c',
            text: 'Weil die Pflegekraft alle Entscheidungen heimlich rückgängig macht.',
            isCorrect: false,
            explanation: 'Falsch: Dies entspricht keinem Modell.',
          },
        ],
      },
    ],
    sampleSolution: {
      zusatzdoc: {
        who: 'Pflegefachpersonen, Patient/in, Angehörige (Heike), Ärzteteam.',
        whatHappened: 'Theoretische Durchdringung der drei Entscheidungsmodelle nach Gunnar Geuter (Thieme CNE).',
        decisionsMade: 'Verständnis der Rollen-, Informations- und Machtverteilung in Paternalismus, PEF und Informed Decision Making.',
        ethicalDilemmas: 'Spannungsfeld zwischen Fürsorgepflicht (Beneficence) und Autonomieprinzip (Autonomy).',
      },
      abedl: {
        1: {
          info: 'Kommunikation ist die Grundvoraussetzung für jedes partizipative Modell. Bei nonverbalen Patienten sind basale und gestützte Kommunikationswege elementar.',
          pesr: 'P: Eingeschränkte verbale Kommunikationsfähigkeit. E: Neurologische Schädigung. S: Fehlende Lautsprache. R: Nonverbale Signale, Mimik, Partnerin als Ressource.',
        },
      },
      decisionAnalysis: 'PEF ist das humanistische Leitbild moderner generalistischer Pflege: geteilte Verantwortung auf Augenhöhe.',
      passwordHint: 'Das Passwort für DS 3 lautet: PARTIZIPATION',
    },
    requiredPassword: 'THEORIE',
  },

  // ==========================================
  // DS 3: Ein Unfall mit schlimmen Folgen (Loop 1)
  // ==========================================
  {
    id: 3,
    title: 'Ein Unfall mit schlimmen Folgen',
    subtitle: 'Videosequenz 1 • Akutklinik, Schock & Erste Kontaktaufnahme',
    locationName: '3. Ein Unfall mit schlimmen Folgen',
    icon: 'Activity',
    timeEstimate: '90 Minuten',
    videoUrl: 'https://app.slidepresenter.com/presentations/0888b573-24ee-4ae4-bdd8-44a95bf1c4e0?time=0',
    videoTitle: 'Videosequenz 1: Die Akutphase nach dem Unfall',
    videoDuration: 'ca. 8-10 Min.',
    videoDescription: 'Stefan liegt nach dem schweren Unfall in der Akutklinik. Heike erlebt den ersten Schock und muss die veränderte Situation begreifen.',
    narrativeSummary: `Ein kurzer Moment auf der Rennstrecke, der ein ganzes Leben in Vorher und Nachher teilt. Im Juli 2013 liegt Stefan bei einem Amateur-Motorradrennen am Nürburgring aussichtsreich auf dem vierten Platz, als ihn die Maschine eines Konkurrenten streift. Mit 48 Jahren steht der durchtrainierte Mann mitten im Leben, hängt auf der Piste regelmäßig Jüngere ab. Stunden später kämpfen Chirurgen im Klinikum Neuwied in einer achtstündigen Notoperation um sein Überleben. Die Diagnose nach dem rettenden Eingriff ist niederschmetternd: schweres Schädel-Hirn-Trauma, Wachkoma. Stefans Augen sind geöffnet, doch laut den Ärzten nimmt er nichts mehr wahr und wird nie wieder erwachen.

Herbst 2014, gut ein Jahr nach der Katastrophe. Für seine Lebensgefährtin Heike, mit der er seit zehn Jahren zusammen ist, war ein Leben ohne ihn nie eine Option. Sie hat ihren Beruf als Physiotherapeutin aufgegeben und pflegt Stefan rund um die Uhr selbst – in einem alten, kaum barrierefreien Fachwerkhaus in der Eifel. Der Alltag ist ein zäher, kräftezehrender Kraftakt: von der mühsamen Sondenernährung per Hand, bei der Heike ihren gesamten Körper einsetzen muss, um die Nahrung durchzudrücken, bis hin zum behutsamen Umlagern gelähmter Gliedmaßen. Professionelle Pflegekräfte gibt es nicht. Mit 700 Euro Pflegegeld und einem monatlichen Gesamtbudget von gerade einmal 1.800 Euro steht die fünfköpfige Familie vor massiven finanziellen Entbehrungen.

Getragen wird diese Last von der gesamten Familie. Obwohl Stefan nicht der leibliche Vater von Heikes drei Söhnen ist, hat er diese Rolle längst mit voller Hingabe ausgefüllt. Nun gibt die Familie ihm diesen Rückhalt zurück. Der 14-jährige Leon packt mit an, wenn Stefan in den Rollstuhl gehoben werden muss, während der zehnjährige Philipp und der ältere, hörgeschädigte Lukas ihren eigenen Weg finden müssen, mit der neuen Realität umzugehen. Als Heike ihre Kinder fragte, ob Stefan vielleicht in ein Heim solle, gab es keine zwei Meinungen: Stefan bleibt zu Hause, sie würden ihn niemals hergeben.

Trotz aller medizinischen Prognosen und der bleiernen Ungewissheit, wie die Zukunft aussehen wird, bleibt Heike an Stefans Seite. Mit unerschütterlicher Zärtlichkeit redet sie auf ihn ein, sucht den Blickkontakt und fordert ihn leise auf: „Du musst halt weiter kämpfen, ne? Du machst das auch.“`,
    decisionMoments: {
      centralQuestion: '„Wie wird Stefans weitere Versorgung nach der Akut- und Reha-Phase organisiert – und welche Konsequenzen hat das für Heikes Existenz und die drei heranwachsenden Söhne?“',
      contextDescription: 'Stefan überlebt die Notoperation, doch die Prognose lautet Wachkoma. Heike steht vor der schwersten Wahl ihres Lebens: Gibt sie ihren Beruf und ihr bisheriges Leben auf, um ihn im engen, nicht barrierefreien Fachwerkhaus selbst zu pflegen, riskiert sie die Überlastung ihrer Familie, oder wählt sie eine professionelle Unterbringung?',
      derivable: [
        {
          title: 'Notfallmedizinische Lebenserhaltung',
          person: 'Ärztliches Team / Chirurgen',
          description: 'Durchführung einer achtstündigen Notoperation zur Akutrettung bei unklarer Überlebensprognose.',
        },
        {
          title: 'Häusliche Übernahme statt Heimunterbringung',
          person: 'Heike gemeinsam mit den drei Söhnen',
          description: 'Entscheidung, Stefan nach der Akut- und Reha-Phase zu Hause aufzunehmen, anstatt ihn in einer stationären Pflegeeinrichtung unterzubringen.',
        },
        {
          title: 'Berufsaufgabe zugunsten der Vollzeitpflege',
          person: 'Heike',
          description: 'Kündigung bzw. Aufgabe der eigenen Erwerbstätigkeit als Physiotherapeutin, um die 24-Stunden-Pflege eigenständig zu leisten.',
        },
        {
          title: 'Einbindung der Kinder in physische Pflegehandlungen',
          person: 'Heike',
          description: 'Entscheidung, die minderjährigen Söhne (insbesondere den 14-jährigen Leon) aktiv bei schweren Transfers (Bett–Rollstuhl) mithelfen zu lassen.',
        },
        {
          title: 'Umgang mit finanziellen Restriktionen',
          person: 'Heike',
          description: 'Entscheidung, die Pflege trotz massiver finanzieller Einbußen (Leben von 700 € Pflegegeld und 1.800 € Familiengesamteinkommen) ohne externen Pflegedienst durchzuführen.',
        },
      ],
      probable: [
        {
          title: 'Anlage und Akzeptanz einer PEG-Magensonde',
          person: 'Heike als gesetzliche Betreuerin',
          description: 'Einwilligung in die enterale Ernährung zur Sicherstellung des Überlebens bei Schluckunfähigkeit.',
        },
        {
          title: 'Ablehnung professioneller ambulanter Pflegedienste',
          person: 'Heike',
          description: 'Entscheidung gegen das Hinzuziehen eines ambulanten Dienstes, mutmaßlich aus Kostengründen oder dem Anspruch, die Pflege komplett selbst zu bewältigen.',
        },
        {
          title: 'Verzicht auf bauliche Barrierefreiheit',
          person: 'Heike',
          description: 'Beibehaltung des Wohnens im nicht behindertengerechten Fachwerkhaus aufgrund fehlender finanzieller Mittel oder mangelnder Umbaumöglichkeiten.',
        },
      ],
      hypothetical: [
        {
          title: 'Stationäre Unterbringung',
          description: 'Wie hätte sich das Familiensystem entwickelt, wenn Heike und die Kinder sich für ein Pflegeheim entschieden hätten?',
        },
        {
          title: 'Frühe Entlastungsstrukturen',
          description: 'Entscheidung für den Einsatz von Verhinderungspflege, Entlastungsbetrag oder ambulanter Intensivpflege von Beginn an.',
        },
        {
          title: 'Berufliche Teilzeit',
          description: 'Entscheidung Heikes, stundenweise im Beruf zu bleiben, um finanzielle Unabhängigkeit und geistigen Ausgleich zu bewahren.',
        },
      ],
      reflectionPrompt: 'Welche Konsequenzen hat die Entscheidung, Angehörige und minderjährige Kinder in hochkomplexe körperliche Pflegehandlungen einzubinden, für das gesamte Familiensystem?',
      adventureTeaser: 'Im kommenden Fall-Adventure erproben Sie in der Rolle der Bezugspflegekraft, wie Sie im ersten Schockmoment Heikes Vertrauen gewinnen und die Weichen zwischen Paternalismus, Partizipation und reiner Informationsvermittlung stellen.',
    },
    mapCoordinates: { x: 42, y: 32 },
    badgeId: 'badge_anamnese_profi',
    teacherGuide: {
      doppelstunde: 3,
      topic: 'Gameloop 1: Informationssammlung (Entscheidungsprotokoll & Checkliste_Pflegeanamnese) in der Akutphase',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden erfassen systematisch pflegerelevante Daten aus Videosequenz 1 im Entscheidungsprotokoll und den 13 ABEDL.',
        'Sie analysieren die Kommunikations- und Mobilitätseinschränkungen und identifizieren Ressourcen von Heike und Stefan.',
        'In der Simulation erproben sie die 3 Entscheidungsmodelle im Umgang mit Heikes Schock.',
      ],
      schedule: [
        {
          phase: '1. Video ansehen',
          timeMinutes: 15,
          activity: 'Videosequenz 1 (SlidePresenter) gemeinsam oder individuell in der App sichten.',
          socialForm: 'Einzelarbeit / Plenum',
          media: 'SlidePresenter Video 1',
          didacticNotes: 'Fokus auf Details: Beatmungsschlauch, Heikes Körpersprache, Stefans Augen.',
        },
        {
          phase: '2. Dokumentation (Formulare)',
          timeMinutes: 30,
          activity: 'Befüllen von „Entscheidungsprotokoll“ und „Checkliste_Pflegeanamnese“ (13 ABEDL nach Krohwinkel).',
          socialForm: 'Einzelarbeit / Partnerarbeit',
          media: 'Digitale Formulare in der App',
          didacticNotes: 'Auf präzise Symptome und Ressourcen achten (Heikes Präsenz).',
        },
        {
          phase: '3. Simulation (Adventure)',
          timeMinutes: 20,
          activity: 'Lernende wählen in der Simulation ihre Haltung (Paternalistisch, Partizipativ, Informed Consent).',
          socialForm: 'Einzelarbeit',
          media: 'Chat-Komponente in der App',
          didacticNotes: 'State-Tracking ermittelt den Grad der Partizipation.',
        },
        {
          phase: '4. Auswertung & Word-Export',
          timeMinutes: 15,
          activity: 'Auswertung der Haltung, Passworteingabe zur Musterlösung (PEF-ETHIK-3) und Word-Export (.docx).',
          socialForm: 'Plenum',
          media: 'Export-Engine & Musterlösung',
          didacticNotes: 'Vergleich der eigenen Dokumentation mit der offiziellen Musterlösung.',
        },
        {
          phase: '5. Abschlussreflexion',
          timeMinutes: 10,
          activity: 'Kurz-Feedback zur Dynamik zwischen Schonung und Einbezug.',
          socialForm: 'Plenum',
          media: 'Tafel',
          didacticNotes: 'Vorbereitung auf DS 4.',
        },
      ],
      blackboardSummary: `KERNPUNKTE DS 3 (AKUTPHASE):
- Wer war zu sehen: Stefan (intubiert/sediert), Heike (schockiert), Pflegekraft.
- Was ist passiert: Erster Besuch nach dem Unfall. Heike steht fassungslos vor den Intensivgeräten.
- Entscheidungsdilemma: Wie bindet man Angehörige behutsam ein, ohne sie zu überfordern?
- PEF-Leitlinie: Ängste validieren, Orientierung schenken, schrittweise Co-Entscheidungen ermöglichen.`,
      reflectionPrompts: [
        'Wie wirkt sich ein paternalistisches Wegschicken der Angehörigen langfristig auf das Vertrauensverhältnis aus?',
        'Wie schützt partizipative Kommunikation vor Angehörigen-Traumatisierung?',
      ],
    },
    simulation: {
      id: 'sim_ds3',
      title: 'Simulation: Erste Begegnung auf der Intensivstation',
      initialDescription: 'Stefan liegt nach dem schweren Schädel-Hirn-Trauma intubiert im Intensivbett. Monitore piepen. Heike betritt zitternd das Zimmer. Sie sind die Bezugspflegekraft.',
      passwordFragment: 'AUTONOMIE',
      reflectionQuestions: [
        'Wie wirkt sich Ihre gewählte Haltung auf Heikes Vertrauen in das Pflegeteam aus?',
        'Wie schützt PEF vor Traumatisierung der Angehörigen?',
      ],
      steps: [
        {
          id: 'step_ds3_1',
          title: 'Situation 1: Der erste Schockmoment',
          speaker: 'Heike',
          speakerRole: 'Lebenspartnerin',
          speakerAvatar: 'https://github.com/jansonjanson/PEFStefanHeike/blob/main/Heike%20Avatar.jpg?raw=true',
          sceneDescription: 'Heike steht mit Tränen in den Augen an der Zimmertür und traut sich kaum an das Bett.',
          dialogueText: '„Mein Gott... Stefan... Was haben die vielen Schläuche zu bedeuten? Kann er mich überhaupt hören? Ich weiß überhaupt nicht, was ich tun soll... Soll ich lieber draußen warten?“',
          dilemmaPrompt: 'Wie reagieren Sie als Pflegefachkraft und welches Modell wählen Sie?',
          options: [
            {
              id: 'opt_ds3_paternalistic',
              model: 'paternalistic',
              modelLabel: 'Paternalistisches Modell',
              quote: '„Frau Heike, bitte treten Sie zurück auf den Flur. Stefan braucht jetzt absolute Ruhe und die Intensivgeräte sind zu kompliziert für Sie. Verlassen Sie sich einfach ganz auf uns.“',
              actionText: 'Heike aus dem Zimmer verweisen, um ungestört medizinische Routinen durchzuführen.',
              immediateReaction: 'Heike weicht verunsichert zurück, fühlt sich wie ein Störfaktor und verlässt mit Tränen den Raum.',
              explanation: 'Paternalistisch: Die Pflegekraft übernimmt die totale Kontrolle und schließt die engste Bezugsperson aus.',
              statsImpact: { pefScore: 0, paternalisticScore: 1, informedScore: 0, autonomyScore: -1 },
            },
            {
              id: 'opt_ds3_pef',
              model: 'pef',
              modelLabel: 'Partizipative Entscheidungsfindung (PEF)',
              quote: '„Kommen Sie ganz in Ruhe näher, Frau Heike. Nehmen Sie gern seine Hand. Stefan spürt Ihre Anwesenheit. Die Schläuche unterstützen ihn beim Atmen. Wir entscheiden bei jedem Schritt gemeinsam, wie weit Sie mitwirken möchten. Möchten Sie sich erst setzen oder ihm etwas vertrautes erzählen?“',
              actionText: 'Heike behutsam an das Bett führen, Ängste validieren, Orientierung geben und gemeinsam Schritte absprechen.',
              immediateReaction: 'Heike atmet tief durch und fasst vorsichtig Stefans Hand. Ihre Anspannung weicht spürbar.',
              explanation: 'Partizipativ (PEF): Gleichberechtigte Einbeziehung, emotionale Sicherheit und geteilte Handlungsplanung auf Augenhöhe.',
              statsImpact: { pefScore: 1, paternalisticScore: 0, informedScore: 0, autonomyScore: 1 },
            },
            {
              id: 'opt_ds3_informed',
              model: 'informed',
              modelLabel: 'Informed Consent / Konsumenten-Modell',
              quote: '„Hier sind die Informationsbroschüren über SHT Grad III und Beatmungsmedizin. Sie können entscheiden, ob Sie die Basale Stimulation selbst durchführen oder ob wir das machen sollen. Lesen Sie sich das durch und sagen Sie mir Bescheid.“',
              actionText: 'Heike Informationsmaterial aushändigen und die Entscheidung über Pflegemaßnahmen ihr allein überlassen.',
              immediateReaction: 'Heike hält die Papiere mit zittrigen Händen, blickt hilflos zwischen Fachbegriffen und Stefan hin und her und wirkt völlig überfordert.',
              explanation: 'Informed Consent: Reine Faktenübermittlung ohne emotionale Begleitung überfordert Angehörige in akuten Krisen.',
              statsImpact: { pefScore: 0, paternalisticScore: 0, informedScore: 1, autonomyScore: 0 },
            },
          ],
        },
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Stefan (nach schwerem SHT, intubiert/beatmet, sediert), Heike (Lebenspartnerin), Bezugspflegekraft, Intensivarzt.',
        whatHappened: 'Stefan wurde nach dem schweren Unfall aufgenommen. Heike besucht ihn zum ersten Mal und erlebt die Entfremdung durch die Intensivmedizin.',
        decisionsMade: 'Beginn der vorsichtigen Kontaktaufnahme (Basale Stimulation), Absprache zur Einbindung Heikes in die Pflege.',
        ethicalDilemmas: 'Wann schützt Schonung vor Belastung und wann wird sie zur Ausgrenzung der wichtigsten Bezugsperson?',
      },
      abedl: {
        1: {
          info: 'Keine verbale Artikulation möglich (orotrachealer Tubus, Sedierung). Reagiert reflexartig auf Berührungsreize.',
          pesr: 'P: Verlust der verbalen Kommunikation. E: Intubation und SHT. S: Fehlende Lautäußerung. R: Beruhigende Reaktion auf Heikes Stimme.',
        },
        2: {
          info: 'Vollständige Bettlägerigkeit, Tonuserhöhung der Extremitäten, Decubitus- und Kontrakturrisiko.',
          pesr: 'P: Immobilität und Kontrakturgefahr. E: Zerebrale Schädigung. S: Spastische Tendenzen. R: Passive Durchbewegung durch Physiotherapie.',
        },
        3: {
          info: 'Invasive Beatmung über Tubus, Absaugbedarf bei Sekretstau, Vitalparameter über Monitor überwacht.',
          pesr: 'P: Beeinträchtigte Spontanatmung und Aspirationsgefahr. E: Zentrale Atemregulationsstörung nach SHT. S: Beatmungspflicht. R: Intensivmedizinisches Monitoring.',
        },
        4: {
          info: 'Vollständige Übernahme der Körperpflege und Hautpflege erforderlich.',
          pesr: 'P: Selbstversorgungsdefizit Körperpflege. E: Koma/Sedierung. S: Unfähigkeit zur Eigenpflege. R: Einbeziehung gewohnter Pflegeprodukte durch Heike.',
        },
        7: {
          info: 'Nahrungskarenz, parenterale Infusionstherapie, Magensonde zur Magenentlastung.',
          pesr: 'P: Unfähigkeit zur oralen Nahrungsaufnahme. E: Schluckreflexausfall. S: Nüchternzustand. R: Angepasste parenterale Ernährung.',
        },
        12: {
          info: 'Heike ist die wichtigste soziale Bezugsperson, leidet unter akuter Schockbelastung.',
          pesr: 'P: Gefahr der Überlastung der Lebenspartnerin. E: Lebensbedrohliche Erkrankung des Partners. S: Weinen, Rückzugsgedanken. R: Ausgeprägte Liebe zu Stefan.',
        },
        13: {
          info: 'Existenzielle Grenzerfahrung: Konfrontation mit potenzieller Behinderung und Lebensplanverlust.',
          pesr: 'P: Existenzielle Lebenskrise für das Paar. E: Plötzlicher Unfall. S: Ungewissheit über die Prognose. R: Gemeinsame Biographie.',
        },
      },
      decisionAnalysis: 'In der Akutphase muss die Pflegekraft partizipativ vorgehen: Heike Raum geben, Orientierung schenken und als Co-Expertin einbinden.',
      passwordHint: 'Das Passwort für DS 4 lautet: AUTONOMIE',
    },
    requiredPassword: 'PARTIZIPATION',
  },

  // ==========================================
  // DS 4: Spezialklinik und das veränderte Zuhause (Loop 2)
  // ==========================================
  {
    id: 4,
    title: 'Spezialklinik und das veränderte Zuhause',
    subtitle: 'Videosequenz 2 • PEG-Ernährung, Dysphagie & neue Gehversuche',
    locationName: '4. Spezialklinik und verändertes Zuhause',
    icon: 'HeartPulse',
    timeEstimate: '90 Minuten',
    videoUrl: 'https://app.slidepresenter.com/presentations/e8dfe12a-167b-4d55-824a-6c0053c887b4',
    videoTitle: 'Videosequenz 2: Der Kampf um Atmung und erste Nahrung',
    videoDuration: 'ca. 10 Min.',
    videoDescription: 'Stefan hat nach der Not-OP kein Tracheostoma, wird jedoch über eine PEG-Magensonde versorgt. Heike kämpft um eine spezialisierte Zweitmeinung in Belgien und erste Gehversuche daheim.',
    narrativeSummary: `Ein Jahr nach dem Unfall sind die sichtbaren Fortschritte winzig, fast unmerklich für die Außenwelt. Doch Heike spürt genau, dass Stefan da ist. Mit unendlicher Geduld und ihrer Erfahrung als Physiotherapeutin fordert sie ihn heraus: „Kopf hoch… Traust du dich zu stehen?“ Jeder Muskelkrampf, jeder mühsame Versuch, die Füße auf den Boden zu stellen, ist ein zäher Kampf gegen den eigenen Körper. Heike will sich mit dem Stillstand nicht abfinden und stößt im Internet auf einen renommierten Koma-Spezialisten in Belgien. Doch das System stellt sich quer: Die Krankenkasse lehnt die Kostenübernahme ab – bei einem diagnostizierten Wachkoma-Patienten sieht man schlicht keine Veranlassung für teure Spezialuntersuchungen. Erst als Heike sich hartnäckig bis zum Direktor der Kasse durchkämpft, lenken die Behörden nach monatelanger Verzögerung ein.

Die Reise nach Belgien bringt die Wende, doch sie ist bittersüß. Die Ärzte stellen fest: Stefan ist gar nicht mehr im Wachkoma – er ist bei vollem Bewusstsein. Gleichzeitig folgt der nächste schwere Schlag der Mediziner: Seine Persönlichkeit werde nie mehr die alte sein, sprechen oder laufen werde er nie wieder. Eine Diagnose, die Heike zutiefst niederschmettert. Vor allem der Verlust der Nähe schmerzt: nie wieder ein gesprochenes „Ich liebe dich“, nie wieder von ihm fest in den Arm genommen zu werden, obwohl sie spürt, wie sehr er es will.

Zwei Jahre nach dem Unfall straft Stefan die Prognosen der Mediziner jedoch Stück für Stück Lügen. Mit eisernem Willen und Heikes unermüdlicher Unterstützung beginnt er, entgegen aller Vorhersagen, wieder erste Schritte zu wagen: „Fuß zur Seite und nachstellen… Ja, super. Perfekt.“ Doch der wachsende Mut bringt neue Gefahren. Da Stefan mobiler wird und mehr allein versucht, drohen gefährliche Stürze. Dazu kommen unvorhersehbare emotionale Ausbrüche: Stefan schreit, wird wütend – eine Folge der schweren Hirnverletzung, die die Familie vor völlig neue Zerreißproben stellt.

In den heranwachsenden Söhnen spiegeln sich die extremen Belastungen der vergangenen Jahre wider. Einer der Jungen erinnert sich offen daran, wie groß die Furcht war, die Mutter und die gesamte Familie könnten an dieser Dauerbelastung zerbrechen; am Anfang war er der Einzige, der Stefans Verlegung in ein Heim befürwortet hatte. Heute steht er voll dahinter: Stefan soll nicht in einem Krankenhaus verkümmern, sondern gehört zu ihnen. Auch wenn er ihn nie seinen leiblichen Vater nennen konnte, ist Stefan die Vaterfigur, für die die Söhne nun beschützend einspringen.

Im Jahr 2015 hellt sich zumindest die finanzielle Lage vorsichtig auf: Nachdem ihre Geschichte im Fernsehen ausgestrahlt wurde, machen Betroffene Heike darauf aufmerksam, dass der Familie eine Rente zusteht – 1.000 Euro mehr im Monat federn die größte Not ab. Aus Spenden kann sogar ein spezieller Schwimmrollstuhl finanziert werden. Doch der wirkliche Mittelpunkt bleibt der kräftezehrende Weg zurück ins Leben. Als Stefan bei den Gehübungen von Emotionen übermannt wird und zu weinen beginnt, fängt Heike ihn behutsam auf: „Komm her… Nein, jetzt nicht weinen… Lauf, lauf. Mach langsam. Immer erst, wenn der Fuß am Boden ist.“ Ein Schritt nach dem anderen.`,
    decisionMoments: {
      centralQuestion: '„Wie weit lohnt es sich, bürokratische Grenzen und Dienstwege der Krankenkasse zu durchbrechen, um Stefans tatsächliches Bewusstsein aufzudecken – und wie geht Heike mit der ernüchternden Diagnose um, dass seine alte Persönlichkeit für immer verloren ist?“',
      contextDescription: 'Für das deutsche Gesundheitssystem ist Stefan als dauerhafter Wachkoma-Patient abgeschrieben, die Krankenkasse verweigert die Kostenübernahme für Spezialisten. Doch Heike kämpft sich bis zum Vorstand durch und erzwingt eine Zweitmeinung in Belgien. Das Ergebnis ist eine Sensation – und ein schwerer Schock zugleich: Stefan ist bei vollem Bewusstsein, aber seine alte Persönlichkeit wird nie zurückkehren.',
      derivable: [
        {
          title: 'Einholen einer internationalen Zweitmeinung',
          person: 'Heike',
          description: 'Entscheidung zur Suche und Kontaktaufnahme mit einem Koma-Spezialisten in Belgien gegen den Status quo der Erstdiagnose.',
        },
        {
          title: 'Kostenübernahme-Eskalation',
          person: 'Heike',
          description: 'Beschreiten des Beschwerdewegs direkt über die Leitungsebene der Krankenkasse nach formeller Erstablehnung.',
        },
        {
          title: 'Konfrontation mit der neuen Prognose',
          person: 'Heike',
          description: 'Akzeptanz der Diagnose (Bewusstsein vorhanden, aber keine Wiederherstellung der alten Persönlichkeit / Verlust von Sprache und freiem Gehen) und Fortführung der Förderung.',
        },
        {
          title: 'Beginn aktiver Steh- und Gehversuche',
          person: 'Heike',
          description: 'Initiierung risikobehafteter Transfers und Schritte trotz Sturzgefahr und ärztlicher Skepsis.',
        },
        {
          title: 'Beantragung zustehender Sozialleistungen',
          person: 'Heike',
          description: 'Beantragung einer Erwerbsminderungs-/Unfallrente und Durchführung eines Spendenaufrufs nach medialer Berichterstattung.',
        },
      ],
      probable: [
        {
          title: 'Risikoabwägung bei Mobilitätsübungen',
          person: 'Heike',
          description: 'Bewusste Inkaufnahme des Risikos von Stürzen oder Umkippen des Stuhls zugunsten der Aktivierung und Autonomie Stefans.',
        },
        {
          title: 'Umgang mit herausforderndem Verhalten',
          person: 'Heike',
          description: 'Entscheidung, Stefans emotionale Ausbrüche und Schreie daheim auszuhalten und pädagogisch/pflegerisch aufzufangen, statt medikamentös zu sedieren.',
        },
        {
          title: 'Interessenkonflikt der Söhne',
          person: 'Älterer Sohn',
          description: 'Entscheidung der älteren Söhne, ihre Zweifel an der Belastbarkeit der Mutter zurückzustellen und das Modell mitzutragen.',
        },
      ],
      hypothetical: [
        {
          title: 'Akzeptanz der Ablehnung der Krankenkasse',
          description: 'Was wäre passiert, wenn Heike nach der ersten Ablehnung resigniert und Stefan als dauerhaften Wachkomapatienten belassen hätte?',
        },
        {
          title: 'Medikamentöse Intervention bei Unruhe',
          description: 'Gabe von Sedativa/Neuroleptika zur Dämpfung der Wutausbrüche und Schreiphasen (mit dem Risiko des Verlusts von Wachheit und Fortschritten).',
        },
        {
          title: 'Sicherheitsfixierung vs. Bewegungsdrang',
          description: 'Einsatz von Fixiergurten oder Bettgittern gegen Stürze (Gefahr der Freiheitsentziehung und Frustration).',
        },
      ],
      reflectionPrompt: 'Wo verläuft die Grenze zwischen fördernder Aktivierung und unvertretbarem Risiko, wenn Patienten wie Stefan ihren eigenen Körper neu erproben?',
      adventureTeaser: 'Im kommenden Fall-Adventure begleiten Sie das heikle Dilemma um Stefans Wunsch nach oraler Nahrung und Kaffeegeschmack trotz Schluckstörung: Wie balancieren Sie Aspirationsschutz und Lebensfreude im pflegerischen Dialog aus?',
    },
    mapCoordinates: { x: 58, y: 55 },
    badgeId: 'badge_pef_champion',
    teacherGuide: {
      doppelstunde: 4,
      topic: 'Gameloop 2: Zweitmeinung Belgien, Dysphagie und ethische Entscheidungen zur Mobilisation',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden erfassen die ABEDL 3 (Vitale Funktionen) und ABEDL 7 (Essen & Trinken) unter Bedingungen von Dysphagie und PEG-Versorgung.',
        'Sie analysieren die Risiken zwischen Aspirationspneumonie und Lebensqualität durch Geschmackserlebnisse.',
        'In der Simulation navigieren sie den Konflikt zwischen Risikominimierung und Heikes Wunsch nach oralen Reizen.',
      ],
      schedule: [
        {
          phase: '1. Video ansehen',
          timeMinutes: 15,
          activity: 'Videosequenz 2 sichten. Beobachtungsfokus: Schluckreflex, Mimik, Frustration.',
          socialForm: 'Einzelarbeit',
          media: 'SlidePresenter Video 2',
          didacticNotes: 'Auf mimische Reaktionen von Stefan beim Absaugen achten.',
        },
        {
          phase: '2. Dokumentation (Formulare)',
          timeMinutes: 30,
          activity: 'Befüllen von Entscheidungsprotokoll und Checkliste_Pflegeanamnese (ABEDL 3 und 7).',
          socialForm: 'Partnerarbeit',
          media: 'Digitale Formulare',
          didacticNotes: 'Beobachtungen präzise erfassen: Schluckstörung (Dysphagie), PEG-Sonde, Wunsch nach Geschmacksempfinden.',
        },
        {
          phase: '3. Simulation (Adventure)',
          timeMinutes: 20,
          activity: 'Lernende wählen im Mini-Adventure die Haltung zum Thema Schluckversuche vs. Sondenernährung.',
          socialForm: 'Einzelarbeit',
          media: 'Chat-Komponente',
          didacticNotes: 'Tracking der Hidden Stats.',
        },
        {
          phase: '4. Auswertung & Word-Export',
          timeMinutes: 15,
          activity: 'Auswertung der Haltung, Passworteingabe (AUTONOMIE-8) zur Musterlösung und Word-Export.',
          socialForm: 'Plenum',
          media: 'Export-Engine',
          didacticNotes: 'Reflexion über partizipative Ethikberatung.',
        },
        {
          phase: '5. Zusammenfassung',
          timeMinutes: 10,
          activity: 'Sicherung der Kernpunkte zu Dysphagie und Lebensqualität.',
          socialForm: 'Plenum',
          media: 'Tafel',
          didacticNotes: 'Vorbereitung auf Frührehabilitation (DS 5).',
        },
      ],
      blackboardSummary: `DILEMMA: PEG-SONDE & SCHLUCKVERSUCHE:
- Furcht vor Aspiration vs. Wunsch nach normalem Geschmack.
- PEF-Lösung: Logopädische FEES-Diagnostik, strukturierte therapeutische Geschmacksproben unter sorgfältigem Aspirationsschutz, geteilte Entscheidung mit Heike über Sondennutzung.`,
      reflectionPrompts: [
        'Warum ist der Verzicht auf jede orale Kost für wache Patienten oft eine psychische Qual?',
        'Wie bindet PEF Logopädie, Pflege, Arzt und Angehörige an einen runden Tisch?',
      ],
    },
    simulation: {
      id: 'sim_ds4',
      title: 'Simulation: Das Dilemma um orale Geschmackserlebnisse',
      initialDescription: 'Stefan blickt traurig auf den Kaffeebecher in Heikes Hand. Er hat Durst. Der Schluckreflex ist unvollständig, Stefan wird über die PEG ernährt. Der Stationsarzt rät zur reinen PEG-Sondenernährung.',
      passwordFragment: 'PARTNERSCHAFT',
      reflectionQuestions: [
        'Wie haben Sie das Sicherheitsbedürfnis (Aspirationsschutz) mit dem Lebensqualitätsbedürfnis ausbalanciert?',
        'Welche Rolle spielt Heikes Fachwissen über Stefans Vorlieben?',
      ],
      steps: [
        {
          id: 'step_ds4_1',
          title: 'Situation: Darf Stefan einen Tropfen Kaffee schmecken?',
          speaker: 'Heike',
          speakerRole: 'Lebenspartnerin',
          speakerAvatar: 'https://github.com/jansonjanson/PEFStefanHeike/blob/main/Heike%20Avatar.jpg?raw=true',
          sceneDescription: 'Heike hält eine kleine Tasse Kaffee. Stefan fixiert sie mit den Augen und leckt sich über die Lippen.',
          dialogueText: '„Stefan liebt seinen Kaffee so sehr. Kann ich ihm nicht nur einen Tropfen auf die Zunge tupfen? Der Arzt meinte streng, das sei lebensgefährlich. Aber Stefan schaut mich so flehend an... Was sollen wir tun?“',
          dilemmaPrompt: 'Welche Haltung nehmen Sie als Pflegefachkraft ein?',
          options: [
            {
              id: 'opt_ds4_paternalistic',
              model: 'paternalistic',
              modelLabel: 'Paternalistisches Modell',
              quote: '„Nein, auf keinen Fall! Der Arzt hat ein striktes Schluckverbot verhängt. Stellen Sie die Tasse sofort weg. Wenn er aspiriert, bekommen wir hier riesige Probleme.“',
              actionText: 'Striktes Verbot aussprechen, die Kaffeetasse entfernen und auf ärztliche Anordnung pochen.',
              immediateReaction: 'Heike zieht eingeschüchtert die Hand zurück. Stefan wendet enttäuscht den Blick ab und schließt resigniert die Augen.',
              explanation: 'Paternalistisch: Rein risikoaverse Verbote ohne Erklärung erzeugen Frustration und schließen Lebensqualität kategorisch aus.',
              statsImpact: { pefScore: 0, paternalisticScore: 1, informedScore: 0, autonomyScore: -1 },
            },
            {
              id: 'opt_ds4_pef',
              model: 'pef',
              modelLabel: 'Partizipative Entscheidungsfindung (PEF)',
              quote: '„Ich verstehe Ihren Wunsch so gut, Frau Heike. Die Gefahr des Verschluckens in die Lunge ist real, aber wir können gemeinsam mit der Logopädin sichere Geschmacksproben planen. Ich hole einen Schaumstofftupfer: Wir benetzen nur leicht seine Lippen mit dem Kaffeearoma, unter sorgfältigem Aspirationsschutz, und beobachten seine Reaktion gemeinsam.“',
              actionText: 'Risiken transparent benennen, aber gemeinsam mit Heike und Logopädie eine sichere, basale Geschmackserfahrung ermöglichen.',
              immediateReaction: 'Heike lächelt erleichtert. Als der Kaffeeduft Stefans Lippen berührt, entspannen sich seine Gesichtszüge spürbar.',
              explanation: 'Partizipativ (PEF): Wissenschaftlich fundierte Risikoabwägung kombiniert mit existenzieller Fürsorge und partnerschaftlicher Durchführung.',
              statsImpact: { pefScore: 1, paternalisticScore: 0, informedScore: 0, autonomyScore: 1 },
            },
            {
              id: 'opt_ds4_informed',
              model: 'informed',
              modelLabel: 'Informed Consent / Konsumenten-Modell',
              quote: '„Das Aspirationsrisiko liegt statistisch bei 35%, eine Pneumonie kann tödlich sein. Sie haben das Sorgerecht: Entscheiden Sie selbst, ob Sie ihm den Kaffee geben wollen oder nicht. Ich halte mich da raus.“',
              actionText: 'Rein statistische Risiken nennen und die lebensbedrohliche Entscheidung komplett Heike überlassen.',
              immediateReaction: 'Heike gerät in Panik vor möglicher Schuld am Tod ihres Partners und stellt die Tasse zitternd weg.',
              explanation: 'Informed Consent: Das bloße Nennen von Mortalitätsrisiken ohne pflegerische Handlungsoptionen lässt Angehörige in Schuldängsten allein.',
              statsImpact: { pefScore: 0, paternalisticScore: 0, informedScore: 1, autonomyScore: 0 },
            },
          ],
        },
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Stefan (Dysphagie, PEG-Sondenernährung), Heike, Pflegefachkraft, Logopädin, Stationsarzt.',
        whatHappened: 'Diskussion um Weaning-Fortschritte, orales Schlucktraining vs. PEG-Versorgung. Heike wünscht sich Lebensqualität für Stefan.',
        decisionsMade: 'Durchführung einer FEES-Diagnostik. Strukturierte basale Geschmacksstimulation mit Kaffee-Tupfer unter Aufsicht.',
        ethicalDilemmas: 'Sicherheit (Vermeidung von Lungenentzündung) vs. Wohlbefinden und basale Lebensfreude (Geschmackssinn).',
      },
      abedl: {
        3: {
          info: 'PEG-Magensonde, Schluckstörung (Dysphagie) ohne Tracheostoma. Mundpflege und gezielte basale Stimulation.',
          pesr: 'P: Eingeschränkte Spontanatmung und Sekretretention. E: Zerebrale Parese der Atemmuskulatur. S: Rasselnde Atemgeräusche. R: Gute Sauerstoffsättigung bei Weaning-Intervallen.',
        },
        7: {
          info: 'Schwere neurogene Dysphagie. Enterale Ernährung über PEG-Sonde. Wunsch nach oralen Geschmacksimpulsen.',
          pesr: 'P: Schluckstörung mit hoher Aspirationsgefahr. E: Schädigung der Hirnnervenkerne. S: Verschlucken bei Speichel. R: Hohe Motivation bei vertrauten Aromen (Kaffee).',
        },
      },
      decisionAnalysis: 'Gute Pflegepraxis findet den Korridor zwischen Sicherheit und Autonomie durch interprofessionelle PEF.',
      passwordHint: 'Das Passwort für DS 5 lautet: PARTNERSCHAFT',
    },
    requiredPassword: 'AUTONOMIE',
  },

  // ==========================================
  // DS 5: Komplikationen auf dem Weg der Besserung (Loop 3)
  // ==========================================
  {
    id: 5,
    title: 'Komplikationen auf dem Weg der Besserung',
    subtitle: 'Videosequenz 3 • Frührehabilitation, Talker, Frustration & Reha-Ziele',
    locationName: '5. Komplikationen & Frühreha',
    icon: 'Bot',
    timeEstimate: '90 Minuten',
    videoUrl: 'https://app.slidepresenter.com/presentations/46eba7a7-3e4d-4c70-ad6c-e9e1b6bb584a?time=0',
    videoTitle: 'Videosequenz 3: Auf dem Weg zur Verständigung',
    videoDuration: 'ca. 11 Min.',
    videoDescription: 'Stefan ist in der Frühreha. Es wird versucht, mit Augensteuerungs-Computern (Talker) und Buchstabentafeln eine Brücke zur Kommunikation zu bauen.',
    narrativeSummary: `August 2015: Zum ersten Mal seit Wochen sitzt die Familie wieder gemeinsam am Tisch im Fachwerkhaus in der Eifel. Drei Wochen lang waren die Söhne im Ferienlager – drei Wochen, in denen Heike die Pflege rund um die Uhr völlig allein stemmen musste. Es war ein beklemmender Vorgeschmack auf das, was unweigerlich kommen wird. Lukas und Leon werden in wenigen Jahren mit der Schule fertig sein und für Ausbildung oder Studium das Eifeldorf verlassen. Heike weiß, wie knapp das Zeitfenster ist: Bis die Jungs flügge werden, muss Stefan wieder selbstständig auf die Beine kommen. „Bis dahin muss der Stefan ans Laufen gekommen sein und sich selber sicher bewegen können… Mit Rollator oder auch ohne. Das schaffst du, oder?“ Stefan nickt – ein stilles Versprechen, für das beide jeden Tag kämpfen.

Ein knappes Jahr später, im Sommer 2016, zerbricht dieser Traum jäh. Ein Magengeschwür durchbricht Stefans Zwölffingerdarm-Wand; wieder schwebt er in akuter Lebensgefahr und überlebt nur um Haaresbreite im Krankenhaus. Die Folgen des Eingriffs sind verheerend: Stefan wirkt apathisch, schweißgebadet, reagiert kaum noch auf Ansprache und bricht den Blickkontakt ab. Seine Lunge ist voller Schleim, der ständig abgesaugt werden muss. Durch das wochenlange Liegen auf der Intensivstation sind fast alle mühsam antrainierten motorischen Fähigkeiten wieder verloren gegangen – ein furchtbarer Rückschlag, der Heike an die Grenze der Verzweiflung bringt: „Ich weiß nicht, wie lange wir für diesen Kraftaufbau brauchen. Ich weiß gar nichts im Moment.“

Trotz der Schwäche blitzt Stefans Bewusstsein immer wieder durch. Als Heike ihn im Krankenbett vor die Wahl stellt – Augenbrauen heben für nach Hause, Nase rümpfen für die Verlegung auf eine normale Station –, hebt er unmissverständlich die Brauen: Er will heim, zurück zu seiner Familie.

Doch die Heimkehr muss warten, denn das System der aufopferungsvollen Pflege fordert seinen Tribut. Die wochenlange Dauerbelastung am Krankenbett bringt Heikes eigenen Körper zum Zusammenbruch: Mit hohem Fieber erkrankt sie schwer und muss selbst stationär im Krankenhaus aufgenommen werden. Zum ersten Mal zeigt sich schonungslos, wie fragil das gesamte Familiengefüge ist, wenn diejenige wegbricht, die alles zusammenhält.`,
    decisionMoments: {
      centralQuestion: '„Wie wird auf Stefans Willen (\'nach Hause\') reagiert, wenn sein Zustand instabil ist und Heike durch die chronische Dauerbelastung selbst im Krankenhaus zusammenbricht?“',
      contextDescription: 'Nach einem lebensgefährlichen Darmdurchbruch und wochenlangem Stillstand verlangt Stefan über mimische Codes: \'Ich will nach Hause!\' Doch Heikes Kräfte sind am Ende – sie bricht mit hohem Fieber zusammen und muss selbst stationär aufgenommen werden. Das Pflegesystem kollabiert.',
      derivable: [
        {
          title: 'Formulierung eines zeitlichen Mobilisationsziels',
          person: 'Heike',
          description: 'Festlegung, dass Stefan bis zum Auszug der Söhne (Schulabschluss/Lehre) selbstständig mobil sein muss.',
        },
        {
          title: 'Etablierung eines nonverbalen Kommunikationscodes',
          person: 'Heike und Stefan',
          description: 'Vereinbarung klarer mimischer Signale (Augenbrauen heben = nach Hause; Nase rümpfen = Station) zur Ermittlung des Patientenwillens.',
        },
        {
          title: 'Ausübung des Patientenwillens',
          person: 'Stefan',
          description: 'Bewusste Entscheidung gegen den weiteren Verbleib im Krankenhaus und für die häusliche Rückkehr.',
        },
        {
          title: 'Übernahme intensivpflegerischer Maßnahmen im Krankenhaus',
          person: 'Heike',
          description: 'Durchführung von Lungenabsaugung und Grundpflege direkt am Klinikbett durch die Angehörige.',
        },
        {
          title: 'Notfallmäßige stationäre Eigenaufnahme',
          person: 'Heike',
          description: 'Akzeptanz der eigenen Behandlungsbedürftigkeit bei akutem Fieber und physischer Dekompensation.',
        },
      ],
      probable: [
        {
          title: 'Notfallintervention bei Perforation',
          person: 'Ärztliches Notfallteam',
          description: 'Notoperation bei Ulkusdurchbruch im Zwölffingerdarm zur Abwendung einer tödlichen Peritonitis/Sepsis.',
        },
        {
          title: 'Krisenmanagement bei Wegfall der Hauptpflegeperson',
          person: 'Keine Angabe im Transkript',
          description: 'Organisation einer ad-hoc Notbetreuung für Stefan, während Heike selbst stationär isoliert/behandelt wird (mutmaßlich Verbleib in Klinik / Söhne).',
        },
        {
          title: 'Pneumonieprophylaxe vs. Reha-Stopp',
          person: 'Ärztliches/pflegerisches Team der Klinik',
          description: 'Priorisierung der vitalen Stabilisierung (Absaugen, Schonung) gegenüber der bisherigen Mobilisation.',
        },
      ],
      hypothetical: [
        {
          title: 'Respektierung des Patientenwillens vs. medizinische Notwendigkeit',
          description: 'Entlassung nach Hause auf Stefans Wunsch trotz akuter Instabilität oder erzwungener Verbleib auf Normalstation?',
        },
        {
          title: 'Frühzeitige Inanspruchnahme von Kurzzeitpflege',
          description: 'Entscheidung zur Entlastung Heikes nach Stefans Stabilisierung, um ihren Zusammenbruch zu verhindern.',
        },
        {
          title: 'PEG- und Ernährungsentscheidung',
          description: 'Bei wiederkehrendem Schleim und Absaugbedarf: Vollständige enterale PEG-Ernährung vs. vorsichtige basale Geschmacksstimulation.',
        },
      ],
      reflectionPrompt: 'Wie können professionelle Pflegekräfte die nonverbalen Willensbekundungen schwerkranker Menschen validieren, wenn Angehörige und medizinisches Team gegensätzliche Prioritäten setzen?',
      adventureTeaser: 'Im kommenden Fall-Adventure stehen Sie vor der Situation, dass Stefan bei der Augensteuerung frustriert verweigert: Zwingen Sie ihn autoritär zum Weitermachen oder handeln Sie partizipativ eine Pause mit alternativen Ja/Nein-Kodes aus?',
    },
    mapCoordinates: { x: 74, y: 40 },
    badgeId: 'badge_code_breaker',
    teacherGuide: {
      doppelstunde: 5,
      topic: 'Gameloop 3: Unterstützte Kommunikation (UK), Frustrationsbewältigung und Reha-Zielvereinbarungen',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden erfassen ABEDL 1 (Kommunizieren) und ABEDL 9 (Sich beschäftigen) mit modernen Hilfsmitteln (Talker, Eyetracker).',
        'Sie erkennen die immense psychische Belastung durch den "Locked-In"-Zustand und motorische Erschöpfung.',
        'In der Simulation erproben sie PEF bei der Vereinbarung realistischer Therapie- und Pausenzeiten.',
      ],
      schedule: [
        {
          phase: '1. Video ansehen',
          timeMinutes: 15,
          activity: 'Videosequenz 3 analysieren. Fokus: Augenbewegungen, Frustration beim Tippen, Therapeutenverhalten.',
          socialForm: 'Einzelarbeit',
          media: 'SlidePresenter Video 3',
          didacticNotes: 'Achten auf Stefans Erschöpfung nach nur 5 Minuten Computerarbeit.',
        },
        {
          phase: '2. Dokumentation (Formulare)',
          timeMinutes: 30,
          activity: 'Eintragung in Entscheidungsprotokoll und Checkliste_Pflegeanamnese (ABEDL 1, 9, 13).',
          socialForm: 'Partnerarbeit',
          media: 'App-Formulare',
          didacticNotes: 'Ressourcen herausarbeiten: Intellektuelles Verständnis ist vorhanden!',
        },
        {
          phase: '3. Simulation (Adventure)',
          timeMinutes: 20,
          activity: 'Simulation: Stefan verweigert frustriert den Talker nach wiederholten Fehlkalibrierungen.',
          socialForm: 'Einzelarbeit',
          media: 'Chat-Komponente',
          didacticNotes: 'Wie reagiert die Pflegekraft auf Wut und Verweigerung?',
        },
        {
          phase: '4. Auswertung & Word-Export',
          timeMinutes: 15,
          activity: 'Eingabe des Passworts (PARTNER-4), Freischaltung der Musterlösung und Word-Export.',
          socialForm: 'Plenum',
          media: 'Export-Engine',
          didacticNotes: 'Reflexion: Geduld und Zeit als pflegeethische Ressource.',
        },
        {
          phase: '5. Abschlussrunde',
          timeMinutes: 10,
          activity: 'Synthese zu Hilfsmittelversorgung und Motivation.',
          socialForm: 'Plenum',
          media: 'Tafel',
          didacticNotes: 'Vorbereitung auf Entlassmanagement (DS 6).',
        },
      ],
      blackboardSummary: `UNTERSTÜTZTE KOMMUNIKATION (UK):
- Talker / Augensteuerung erfordert höchste Konzentration.
- Paternalismus: Zwingen zur Übung ("Sie müssen aber, sonst machen Sie keine Fortschritte").
- PEF: Pausen aushandeln, Frustration validieren, alternative Ja/Nein-Kodes (z.B. Blinzeln) etablieren.`,
      reflectionPrompts: [
        'Wie fühlt es sich an, wenn das Denken schneller ist als die technische Eingabe?',
        'Wie kann Heike als Übersetzerin für Stefans Mikro-Mimik einbezogen werden?',
      ],
    },
    simulation: {
      id: 'sim_ds5',
      title: 'Simulation: Der Abbruch beim Kommunikationstraining',
      initialDescription: 'Stefan sitzt im Therapiestuhl vor dem Augensteuerungs-Monitor. Die Kalibrierung schlägt zum dritten Mal fehl. Er schließt wütend die Augen, dreht den Kopf weg und atmet heftig vor Anstrengung. Die Ergotherapeutin möchte die Stunde abbrechen.',
      passwordFragment: 'KROHWINKEL',
      reflectionQuestions: [
        'Wie haben Sie Stefans nonverbale Verweigerung interpretiert?',
        'Wie schaffen Sie Raum für Autonomie, ohne den Reha-Fortschritt aufzugeben?',
      ],
      steps: [
        {
          id: 'step_ds5_1',
          title: 'Situation: Wut und Erschöpfung am Bildschirm',
          speaker: 'Heike',
          speakerRole: 'Lebenspartnerin',
          speakerAvatar: 'https://github.com/jansonjanson/PEFStefanHeike/blob/main/Heike%20Avatar.jpg?raw=true',
          sceneDescription: 'Heike streicht Stefan über die Schulter. Stefan presst die Lippen zusammen und verweigert jeden Blickkontakt zum Bildschirm.',
          dialogueText: '„Er ist fix und fertig. Heute geht einfach gar nichts mehr. Wenn wir ihn jetzt zwingen, hasst er das Gerät für immer. Aber wenn er es nicht lernt, kann er uns nie wieder sagen, was er denkt... Was sollen wir jetzt tun?“',
          dilemmaPrompt: 'Welche Reaktion wählen Sie?',
          options: [
            {
              id: 'opt_ds5_paternalistic',
              model: 'paternalistic',
              modelLabel: 'Paternalistisches Modell',
              quote: '„Herr Stefan, jetzt reißen Sie sich bitte zusammen! Ohne Fleiß kein Preis. Wir haben nur diesen Therapie-Slot und wenn Sie jetzt streiken, verlieren Sie den Reha-Platz. Noch 10 Minuten durchziehen!“',
              actionText: 'Stefan autoritär zum Weitermachen drängen, um das vorgegebene Therapiepensum zu erfüllen.',
              immediateReaction: 'Stefan spannt den gesamten Oberkörper spastisch an, sein Puls schießt hoch und er verweigert jegliche Kooperation.',
              explanation: 'Paternalistisch: Zwang und Missachtung von Erschöpfungsgrenzen zerstören die Motivation und verstärken Spastiken.',
              statsImpact: { pefScore: 0, paternalisticScore: 1, informedScore: 0, autonomyScore: -1 },
            },
            {
              id: 'opt_ds5_pef',
              model: 'pef',
              modelLabel: 'Partizipative Entscheidungsfindung (PEF)',
              quote: '„Stefan, ich sehe, wie anstrengend das heute ist und wie wütend die Technik macht. Lass uns die Augensteuerung für heute beiseite schieben. Stefan, blinzle einmal für Ja: Möchtest du heute lieber mit Heike und der Buchstabentafel arbeiten oder einfach eine halbe Stunde Musik hören und ausruhen?“',
              actionText: 'Frustration anerkennen, Druck herausnehmen und über einfache Ja/Nein-Signale Stefans Entscheidung für den Rest des Tages einholen.',
              immediateReaction: 'Stefan öffnet die Augen, schaut die Pflegekraft dankbar an und blinzelt zweimal bewusst für die Pause mit Musik.',
              explanation: 'Partizipativ (PEF): Echte Selbstbestimmung bedeutet auch das Recht, eine Pause einzufordern. Wertschätzender Einbezug stärkt die Selbstwirksamkeit.',
              statsImpact: { pefScore: 1, paternalisticScore: 0, informedScore: 0, autonomyScore: 1 },
            },
            {
              id: 'opt_ds5_informed',
              model: 'informed',
              modelLabel: 'Informed Consent / Konsumenten-Modell',
              quote: '„Die Krankenkasse zahlt den Talker nur bei dokumentierter Nutzung von 45 min täglich. Wenn wir abbrechen, sinkt die Bewilligungswahrscheinlichkeit um 60%. Entscheiden Sie beide, ob Sie abbrechen wollen.“',
              actionText: 'Verwaltungsrichtlinien und Quoten aufzählen und die Entscheidung ohne Hilfestellung dem Paar überlassen.',
              immediateReaction: 'Heike gerät in schwere Gewissensbisse zwischen Stefans Qual und bürokratischem Verlust des Hilfsmittels.',
              explanation: 'Informed Consent: Das Reduzieren von existenziellen Pflegeentscheidungen auf bürokratische Kennzahlen verfehlt den humanistischen Pflegeauftrag.',
              statsImpact: { pefScore: 0, paternalisticScore: 0, informedScore: 1, autonomyScore: 0 },
            },
          ],
        },
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Stefan (in Frührehabilitation), Heike, Pflegefachkraft, Ergotherapeutin, Logopädin.',
        whatHappened: 'Einsatz von High-Tech-Kommunikationshilfen (Eyetracker/Talker). Grenzen der Belastbarkeit und Frustrationsbewältigung bei motorischer Ermüdung.',
        decisionsMade: 'Einigung auf flexible Therapieintervalle (max. 15 min Talker), Ergänzung durch Niedrigschwellen-Tools (Partner-unterstütztes Scanning mit Buchstabentafel).',
        ethicalDilemmas: 'Fördern und Fordern (Reha-Potential ausschöpfen) vs. Recht auf Erholung und Würde im Scheitern.',
      },
      abedl: {
        1: {
          info: 'Einsatz von Augensteuerungs-Computer. Rasche Ermüdbarkeit der Augenmuskulatur nach 10–15 Minuten. Zuverlässiger Ja/Nein-Kode über Blinzeln etabliert.',
          pesr: 'P: Kommunikationsbarriere bei technischer Überforderung. E: Zerebrale Parese und okulomotorische Ermüdung. S: Frustrationsgesten, Abwenden des Kopfes. R: Sehr gutes Sprachverständnis, hohe kognitive Präsenz.',
        },
        9: {
          info: 'Interesse an Motorsport und Lieblingsmusik. Bedürfnis nach Normalität und Auszeiten von der Dauertherapie.',
          pesr: 'P: Gefahr des Reha-Burnouts und Sinnverlusts. E: Monotoner Therapiealltag. S: Antriebslosigkeit. R: Musiktherapie und gemeinsames Anschauen von Rennvideos mit Heike.',
        },
      },
      decisionAnalysis: 'Partizipative Zielvereinbarungen (Goal Attainment Scaling) verhindern Überforderung und stärken die Patientenautonomie.',
      passwordHint: 'Das Passwort für DS 6 lautet: KROHWINKEL',
    },
    requiredPassword: 'PARTNERSCHAFT',
  },

  // ==========================================
  // DS 6: Umbauarbeiten (Loop 4)
  // ==========================================
  {
    id: 6,
    title: 'Umbauarbeiten',
    subtitle: 'Videosequenz 4 • Wohnraumanpassung, Entlassung & Angehörigenbelastung',
    locationName: '6. Umbauarbeiten & Zuhause',
    icon: 'Home',
    timeEstimate: '90 Minuten',
    videoUrl: 'https://app.slidepresenter.com/presentations/b29b77b4-810d-4c5a-a961-3b7a7a07c29d?time=0',
    videoTitle: 'Videosequenz 4: Die schwerste Entscheidung – Wo ist Zukunft?',
    videoDuration: 'ca. 12 Min.',
    videoDescription: 'Die Reha-Phase endet. Die zentrale Lebensentscheidung steht an: Kann Heike die 24-Stunden-Intensivpflege zu Hause stemmen oder ist eine Spezialeinrichtung notwendig?',
    narrativeSummary: `Drei weitere Jahre sind vergangen, gezeichnet von Rückschlägen und erneuten Krankenhausaufenthalten, die Stefan überstehen musste. Doch der Lebenswille ist ungebrochen. Noch immer lebt die Familie in dem alten Fachwerkhaus, dessen Kälte die Jungs draußen mit schwerer körperlicher Arbeit trotzen: Sie spalten Holz, um Vorräte für den bevorstehenden Winter anzulegen.

Sechs Jahre nach dem Unfall sind die Söhne an der Situation gewachsen, doch die Zeit bleibt nicht stehen. Lukas ist mittlerweile 21 Jahre alt und steht kurz vor dem Auszug – eine Ausbildung zum Touristikkaufmann zieht ihn nach Norddeutschland. Damit bricht eine feste Säule im eingespielten Pflegealltag weg. Seine Aufgaben, wie die großen Wocheneinkäufe, muss nun der 18-jährige Leon übernehmen, der parallel vor seinem Abitur steht. Der jüngste Bruder Philipp, inzwischen 14, behauptet sich trotz der extremen häuslichen Belastung als einer der Klassenbesten. Die Jungs reflektieren ihre Jugend mit einer erstaunlichen, fast schmerzhaften Reife: Sie haben gelernt, mit diesem Leben zurechtzukommen, auch wenn es alles andere als einfach ist. „Ich denke, aus dem Ganzen sind wir als Kinder einfach gewachsen“, sagt einer von ihnen beim Holzhacken, „und später werden wir mal bessere Erwachsene sein als andere.“

Ein kleiner Lichtblick verschafft Heike neuen Spielraum: Durch ein kleines Erbe konnte sie einen Teil des alten Stalls ausbauen lassen. Wo früher Enge herrschte, gibt es nun mehr Platz für gezielte Bewegungstherapie und ein spezielles Laufgeschirr, das Stefan beim Gehtraining sichert. Die Fortschritte zeigen sich in den kleinen, kostbaren Momenten des Alltags: Gemeinsam üben sie Handgriffe, bis Stefan es schafft, den Knopf der Kaffeemaschine zu drücken, um Heike einen Kaffee zu kochen. „Danke schön“, sagt sie lächelnd. Wenn man ihn fragt, spürt man seinen klaren Willen: Stefan will leben, und sie finden Freude an diesem gemeinsamen Leben.

Gleichzeitig wirft die unerbittliche Realität lange Schatten auf die Beziehung. Heike spricht mit schonungsloser Ehrlichkeit über den Verlust ihrer Partnerschaft auf Augenhöhe: Ein gegenseitiges Geben und Nehmen, wie es eine Liebesbeziehung ausmacht, gibt es nicht mehr. Es ist eine tiefe, emotionale Abhängigkeitsbeziehung geworden – geprägt von Fürsorge, Nähe und Verantwortung, aber eben keine Partnerschaft mehr im klassischen Sinn.

Die körperliche Zeche dafür zahlt vor allem Heike. Seit den letzten Klinikaufenthalten ist der Pflegeaufwand noch einmal drastisch gestiegen: Alle vier Stunden benötigt Stefan einen neuen Blasenkatheter – rund um die Uhr, ohne Unterbrechung. An erholsamen Schlaf ist nicht zu denken. Selten kommt Heike auf mehr als vier Stunden Ruhe in der Nacht. Doch wenn Stefan nach einer weiteren anstrengenden Stehübung erschöpft vor ihr steht, zählt nur der Augenblick: „Bist du stolz? Kannst du sein. Hast du wirklich gut gemacht.“`,
    decisionMoments: {
      centralQuestion: '„Wie wird Stefans urologische Versorgung organisiert, ohne Heike durch den nächtlichen 4-Stunden-Rhythmus physisch zu zerstören – und wie viel Verantwortung für Haus und Hof darf den verbleibenden Söhnen nach Lukas\' Auszug aufgebürdet werden?“',
      contextDescription: 'Lukas zieht für seine Lehre nach Norddeutschland aus, Leon und Philipp müssen neben Schule und Abitur schwere körperliche Arbeiten wie Wocheneinkäufe und Holzhacken übernehmen. Gleichzeitig bestimmt ein unerbittlicher 4-Stunden-Takt Tag und Nacht: Um Stefan vor Infektionen zu schützen, lehnt man einen Dauerkatheter ab und setzt auf das Katheterisieren per Hand – Heike schläft kaum noch vier Stunden am Stück.',
      derivable: [
        {
          title: 'Auszug und Zukunftsplanung der Kinder',
          person: 'Lukas, Leon, Heike',
          description: 'Zulassen und Unterstützen des Auszugs der älteren Söhne (Ausbildung Norddeutschland, Abitur) trotz des drohenden Wegfalls im Pflegesystem.',
        },
        {
          title: 'Investition privater Mittel in Therapieinfrastruktur',
          person: 'Heike',
          description: 'Verwendung von geerbtem Geld für den barrierearmen Umbau des Stalls und die Anschaffung professioneller Hilfsmittel (Laufgeschirr), statt für private Altersvorsorge oder Haushaltshilfen.',
        },
        {
          title: 'Erhaltung der Partizipation und Alltagskompetenz',
          person: 'Heike',
          description: 'Systematisches Training basaler Alltagshandlungen (z. B. Knopf der Kaffeemaschine drücken) zur Förderung von Selbstwirksamkeit.',
        },
        {
          title: 'Offene Reflexion des Therapieziels (Leben vs. Sterben)',
          person: 'Heike und Stefan',
          description: 'Regelmäßige Überprüfung von Stefans Lebenswillen durch gezieltes Nachfragen.',
        },
        {
          title: 'Neudefinition der Beziehungsgrundlage',
          person: 'Heike',
          description: 'Akzeptanz der Wandlung von einer partnerschaftlichen Liebesbeziehung hin zu einer asymmetrischen Pflege- und Abhängigkeitsbeziehung.',
        },
        {
          title: 'Frequentes intermittierendes Katheterisieren (ISK)',
          person: 'Heike',
          description: 'Durchführung der Katheterisierung im 4-Stunden-Rhythmus rund um die Uhr in Eigenregie mit Inkaufnahme von chronischem Schlafentzug.',
        },
      ],
      probable: [
        {
          title: 'Ablehnung eines dauerhaften Verweilkatheters (DK / SPK)',
          person: 'Heike in Absprache mit Urologen',
          description: 'Bewusste Entscheidung für den ISK alle 4 Stunden (vermutlich zur Infektionsprophylaxe oder Kontinenzförderung) trotz massiver Störung der Nachtruhe.',
        },
        {
          title: 'Umverteilung familiärer Versorgungsaufgaben',
          person: 'Heike und die verbleibenden Söhne',
          description: 'Neuzuweisung von Haushalts- und Logistikpflichten an die verbleibenden jüngeren Söhne (z. B. Holzhacken, Großeinkäufe).',
        },
      ],
      hypothetical: [
        {
          title: 'Anlage eines suprapubischen Katheters (SPK)',
          description: 'Entscheidung für einen SPK, um Heikes Nachtschlaf zu retten, gegen das Risiko von Harnwegsinfekten oder Katheterblockaden.',
        },
        {
          title: 'Einsatz einer nächtlichen Pflegeassistenz',
          description: 'Delegation der Nachtpflege (Katheterisierung) an einen ambulanten Pflegedienst zur Burnout-Prävention bei Heike.',
        },
        {
          title: 'Auszugsstopp für Kinder',
          description: 'Festhalten der Söhne im Haushalt durch moralischen Druck zur Absicherung der Pflegekette.',
        },
      ],
      reflectionPrompt: 'Wie verändert sich die partnerschaftliche Entscheidungsfindung (PEF), wenn aus einer Liebesbeziehung auf Augenhöhe eine chronische 24-Stunden-Pflegeabhängigkeit wird?',
      adventureTeaser: 'Im kommenden Fall-Adventure führen Sie das entscheidende Entlassungsberatungsgespräch: Wie moderieren Sie Heikes Schuldgefühle und eröffnen reale Lösungen mit ambulanter Intensivpflege, ohne Heike allein zu lassen?',
    },
    mapCoordinates: { x: 86, y: 65 },
    badgeId: 'badge_code_breaker',
    teacherGuide: {
      doppelstunde: 6,
      topic: 'Gameloop 4: Entlassmanagement, Angehörigen-Burnout (Caregiver Burden) und partnerschaftliche Zukunftsplanung',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden erfassen ABEDL 10 (Sexualität/Partnerschaft), ABEDL 11 (Sichere Umgebung/Umbau) und ABEDL 12 (Soziale Beziehungen).',
        'Sie erkennen den schmerzhaften Rollenwandel von Heike: von der Liebespartnerin zur 24/7-Pflegekraft.',
        'In der Simulation moderieren sie das existenzielle Gespräch zwischen Heikes Loyalität, Stefans Wünschen und professionellen Hilfen.',
      ],
      schedule: [
        {
          phase: '1. Video ansehen',
          timeMinutes: 15,
          activity: 'Sichten von Videosequenz 4. Beobachtungsfokus: Heikes Erschöpfung, Tränen, Stefans Blick.',
          socialForm: 'Einzelarbeit',
          media: 'SlidePresenter Video 4',
          didacticNotes: 'Die seelische Zerrissenheit Heikes verdeutlichen.',
        },
        {
          phase: '2. Dokumentation (Formulare)',
          timeMinutes: 30,
          activity: 'Befüllen von Entscheidungsprotokoll und Checkliste_Pflegeanamnese (ABEDL 10, 11, 12).',
          socialForm: 'Partnerarbeit',
          media: 'App-Formulare & Docx-Export',
          didacticNotes: 'Fokus auf Überlastung der pflegenden Angehörigen und partnerschaftliche Entlastungsmöglichkeiten.',
        },
        {
          phase: '3. Simulation (Adventure)',
          timeMinutes: 20,
          activity: 'Simulation: Das Beratungsgespräch zur Entlassung. Heimunterbringung vs. Intensivpflegedienst zu Hause.',
          socialForm: 'Einzelarbeit',
          media: 'Chat-Komponente',
          didacticNotes: 'Wie verhindert die Pflegekraft Schuldgefühle bei Heike?',
        },
        {
          phase: '4. Auswertung & Word-Export',
          timeMinutes: 15,
          activity: 'Passworteingabe (KROHWINKEL-7), Freischaltung der Musterlösung und Word-Export.',
          socialForm: 'Plenum',
          media: 'Export-Engine',
          didacticNotes: 'Synthese: Wie stützt PEF das gesamte Familiensystem?',
        },
        {
          phase: '5. Abschlussüberleitung',
          timeMinutes: 10,
          activity: 'Vorbereitung auf das Finale in DS 7.',
          socialForm: 'Plenum',
          media: 'Tafel',
          didacticNotes: 'Überleitung zur häuslichen Pflege.',
        },
      ],
      blackboardSummary: `ENTLASSUNGSMANAGEMENT & CAREGIVER BURDEN:
- Heikes Dilemma: Versprechen ("Ich lasse dich nie im Stich") vs. physische/psychische Erschöpfung.
- Gefahr paternalistischer Beratung: Zwang zum Heim ("Sie schaffen das sowieso nicht") oder Verklärung der häuslichen Pflege.
- PEF-Ansatz: Realistische Bedarfsanalyse, Einbindung ambulanter Intensivpflege (1:1), Entlastungsangebote, Erhalt der Partnerrolle.`,
      reflectionPrompts: [
        'Wie verändert sich eine Liebesbeziehung, wenn einer der Partner zum Vollzeit-Pfleger wird?',
        'Welche Unterstützungsnetzwerke sind unverzichtbar, damit eine Rückkehr nach Hause gelingen kann?',
      ],
    },
    simulation: {
      id: 'sim_ds6',
      title: 'Simulation: Das Entlassungsgespräch – Heim oder Daheim?',
      initialDescription: 'Die Entlassung aus der Rehaklinik steht in 3 Wochen an. Heike sitzt mit tiefen Augenringen im Besprechungszimmer. Der Sozialdienst drängt auf eine Entscheidung für ein Pflegeheim. Heike bricht in Tränen aus.',
      passwordFragment: 'FINALE',
      reflectionQuestions: [
        'Wie gelingt es, Heike vor Selbstaufgabe zu schützen, ohne ihre Wünsche zu übergehen?',
        'Wie wurde Stefan in diese Zukunftsentscheidung einbezogen?',
      ],
      steps: [
        {
          id: 'step_ds6_1',
          title: 'Situation: Heikes Tränen und Schuldgefühle',
          speaker: 'Heike',
          speakerRole: 'Lebenspartnerin',
          speakerAvatar: 'https://github.com/jansonjanson/PEFStefanHeike/blob/main/Heike%20Avatar.jpg?raw=true',
          sceneDescription: 'Heike vergräbt das Gesicht in den Händen. Auf dem Tisch liegen Prospekte von Schwerstpflegeheimen.',
          dialogueText: '„Wenn ich ihn in ein Heim gebe, breche ich mein Versprechen. Ich fühle mich wie eine Verräterin! Aber wenn ich ihn nach Hause hole und ganz alleine pflegen muss, gehe ich kaputt... Ich schlafe seit Wochen keine Nacht mehr durch. Was ist die richtige Entscheidung?“',
          dilemmaPrompt: 'Wie führen Sie das Beratungsgespräch nach den Grundsätzen der PEF?',
          options: [
            {
              id: 'opt_ds6_paternalistic',
              model: 'paternalistic',
              modelLabel: 'Paternalistisches Modell',
              quote: '„Frau Heike, sehen Sie den Tatsachen ins Auge: Sie können das zu Hause niemals leisten. Unterschreiben Sie die Heimanmeldung. Das ist das einzig Vernünftige für alle Beteiligten.“',
              actionText: 'Heike die Entscheidung abnehmen und sie resolut zur Heimanmeldung drängen.',
              immediateReaction: 'Heike fühlt sich als Versagerin abgestempelt. Tief sitzende Schuldgefühle belasten die Beziehung nachhaltig.',
              explanation: 'Paternalistisch: Die Fachkraft entscheidet über den Lebensort und entwertet Heikes Gefühle als irrational.',
              statsImpact: { pefScore: 0, paternalisticScore: 1, informedScore: 0, autonomyScore: -1 },
            },
            {
              id: 'opt_ds6_pef',
              model: 'pef',
              modelLabel: 'Partizipative Entscheidungsfindung (PEF)',
              quote: '„Frau Heike, Sie sind keine Verräterin – Sie kämpfen seit Monaten heldenhaft. Es gibt nicht nur Schwarz oder Weiß. Wir können ein häusliches Versorgungsnetz mit einem ambulanten Intensivpflegedienst aufbauen, sodass Sie Partnerin bleiben dürfen und die schwere medizinische Pflege in professionellen Händen liegt. Lassen Sie uns gemeinsam mit Stefan die Optionen und Grenzen durchgehen.“',
              actionText: 'Schuldgefühle abbauen, Hybridmodelle (ambulante 1:1-Intensivpflege zu Hause) eröffnen und Stefan partizipativ einbinden.',
              immediateReaction: 'Heike blickt überrascht auf. Ein Hoffnungsschimmer kehrt zurück; sie fühlt sich verstanden und entlastet.',
              explanation: 'Partizipativ (PEF): Eröffnung realer Handlungsalternativen jenseits falscher Dichotomien; Schutz der Partnerrolle bei gleichzeitiger Versorgungssicherheit.',
              statsImpact: { pefScore: 1, paternalisticScore: 0, informedScore: 0, autonomyScore: 1 },
            },
            {
              id: 'opt_ds6_informed',
              model: 'informed',
              modelLabel: 'Informed Consent / Konsumenten-Modell',
              quote: '„Hier ist die Liste mit 14 Heimen und 8 Pflegediensten sowie den monatlichen Zuzahlungstabellen nach SGB XI. Sie müssen das bis Freitag mit der Pflegekasse klären.“',
              actionText: 'Reine Adresslisten und Finanztabellen übergeben und Heike mit der Entscheidung allein lassen.',
              immediateReaction: 'Heike starrt auf die endlose Liste und sinkt verzweifelt in sich zusammen.',
              explanation: 'Informed Consent: Reine Bürokratie ohne Begleitung führt Angehörige in die psychosoziale Dekompensation.',
              statsImpact: { pefScore: 0, paternalisticScore: 0, informedScore: 1, autonomyScore: 0 },
            },
          ],
        },
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Heike, Stefan, Bezugspflegekraft, Sozialdienst, ambulanter Intensivpflegedienst.',
        whatHappened: 'Vorbereitung der Entlassung nach monatelanger Klinik- und Rehapflege. Auseinandersetzung mit Wohnraumanpassung, Umbauarbeiten und Pflegebelastung.',
        decisionsMade: 'Entscheidung für die Rückkehr in eine barrierefreie Wohnung mit Unterstützung eines spezialisierten ambulanten 24h-Intensivpflegedienstes.',
        ethicalDilemmas: 'Schutz der pflegenden Angehörigen vor Burnout vs. Stefans existentieller Wunsch nach häuslicher Geborgenheit.',
      },
      abedl: {
        10: {
          info: 'Verlust der bisherigen Rollenverteilung als Liebespaar. Heike gerät in die Rolle der Pflegerin/Managerin. Schamgefühle bei Intimpflege durch Angehörige.',
          pesr: 'P: Gefährdung der partnerschaftlichen Intimität und Rollenidentität. E: Schwere Pflegebedürftigkeit und Abhängigkeit. S: Rückzug, emotionale Erschöpfung. R: Tiefe gegenseitige Liebe und gemeinsames Bekenntnis zueinander.',
        },
        11: {
          info: 'Notwendigkeit barrierefreier Wohnraumanpassung (Pflegebett, Deckenlifter, Notstromaggregat für Beatmung/Absaugung).',
          pesr: 'P: Sicherheitsrisiko bei technischer Notfallsituation zu Hause. E: Abhängigkeit von Beatmungsgeräten. S: Angst vor Notfallsituationen oder Sondenfehllage. R: Installation professioneller Notfallketten.',
        },
        12: {
          info: 'Soziales Umfeld bricht teilweise weg. Freunde ziehen sich aus Überforderung zurück.',
          pesr: 'P: Soziale Isolation des Paares. E: Barrieren und Berührungsängste des Umfelds. S: Fehlende Besuche. R: Einige treue Freunde aus der Motorsport-Zeit, die Besuche aufrechterhalten.',
        },
      },
      decisionAnalysis: 'PEF ist der Schlüssel für nachhaltige Entlassungen: Nur wenn Angehörige gestärkt und professionell entlastet werden, gelingt Häuslichkeit.',
      passwordHint: 'Für das Finale in DS 7: FINALE',
    },
    requiredPassword: 'KROHWINKEL',
  },

  // ==========================================
  // DS 7: Finale (Videosequenz 5 + Nachbesprechung)
  // ==========================================
  {
    id: 7,
    title: 'Finale',
    subtitle: 'Videosequenz 5 • Nachbesprechung, Evaluation & Abschluss-Zertifikat',
    locationName: '7. Finale & Nachbesprechung',
    icon: 'Trophy',
    timeEstimate: '90 Minuten',
    videoUrl: 'https://app.slidepresenter.com/presentations/87e3e111-e072-4b05-a384-5af77b284961?time=0',
    videoTitle: 'Videosequenz 5: Das Finale – Leben mit der Entscheidung',
    videoDuration: 'ca. 12 Min.',
    videoDescription: 'Videosequenz 5 und die bewegende Originaldokumentation über Stefan und Heikes Alltag zu Hause. Reflexion des gesamten Lernwegs.',
    mapCoordinates: { x: 92, y: 30 },
    badgeId: 'badge_grand_master',
    teacherGuide: {
      doppelstunde: 7,
      topic: 'Finale Synthese: Emotionale Aufarbeitung, Transfer in den Pflegealltag und Kompetenzzertifikat',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden reflektieren ihre eigene emotionale Entwicklung entlang der 7 Doppelstunden.',
        'Sie ziehen ein fundiertes Fazit zur praktischen Umsetzbarkeit von PEF in unterschiedlichen Settings (Klinik, Reha, Langzeitpflege).',
        'Sie formulieren ihr persönliches „Pflegerisches Ethik-Manifest“ für die eigene berufliche Identität.',
      ],
      schedule: [
        {
          phase: '1. Video 5 & Doku-Ausschnitt',
          timeMinutes: 20,
          activity: 'Gemeinsames Sichten von Videosequenz 5 (SlidePresenter) und Ausschnitten der YouTube-Dokumentation.',
          socialForm: 'Plenum',
          media: 'SlidePresenter Video 5 & YouTube',
          didacticNotes: 'Raum für emotionale Stille und Betroffenheit lassen.',
        },
        {
          phase: '2. Murmelphase & Gefühlsreflexion',
          timeMinutes: 15,
          activity: 'Paarweiser Austausch: Was hat mich am Fall Stefan & Heike am tiefsten berührt? Wo habe ich meine eigene Haltung verändert?',
          socialForm: 'Partnerarbeit',
          media: 'Reflexionskarten',
          didacticNotes: 'Emotionale Entlastung und Validierung der Lernenden.',
        },
        {
          phase: '3. Synthese & Unterrichts-Evaluation',
          timeMinutes: 25,
          activity: 'Transfer in den Ausbildungsalltag und Ausfüllen der Unterrichtsevaluation in der App.',
          socialForm: 'Gruppenarbeit / Einzelarbeit',
          media: 'App Evaluations-Bereich',
          didacticNotes: 'Konkrete Handlungsschritte für den Pflegealltag formulieren.',
        },
        {
          phase: '4. Abschluss-Zertifikat & Gesamtexport',
          timeMinutes: 20,
          activity: 'Generierung des personalisierten Ausbildungs-Zertifikats und Export des gesamten Portfolios als Word-Dossier.',
          socialForm: 'Einzelarbeit',
          media: 'App Export-Engine',
          didacticNotes: 'Feierlicher Abschluss der Unterrichtsreihe.',
        },
      ],
      blackboardSummary: `DAS VERMÄCHTNIS VON HEIKE & STEFAN:
1. Partnerschaftliche Entscheidungsfindung ist kein Methoden-Katalog, sondern eine innere Haltung.
2. Auch bei schwerster Kommunikationsbehinderung bleibt der Mensch Träger unantastbarer Würde und individueller Werte.
3. Angehörige sind keine Besucher, sondern elementare Partner im Pflegeprozess.
4. Pflegekräfte sind Anwälte der Autonomie in Momenten existenzieller Verwundbarkeit.`,
      reflectionPrompts: [
        'Was nehmen Sie aus dieser Reise für Ihre eigene Haltung als Pflegefachkraft mit?',
        'Welcher Satz von Heike oder welche Reaktion von Stefan wird Ihnen in Erinnerung bleiben?',
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Heike, Stefan, Pflegeteam, Gemeinschaft.',
        whatHappened: 'Rückblick auf den gesamten Weg von der Notaufnahme über Intensivstation und Reha bis in das neu gestaltete Leben zu Hause.',
        decisionsMade: 'Gemeinsame Akzeptanz des neuen Lebensabschnitts bei maximaler Wahrung von Würde, Selbstbestimmung und geteilter Partnerschaft.',
        ethicalDilemmas: 'Wie bleibt Liebe lebendig, wenn das Schicksal alle bisherigen Lebenspläne umwirft?',
      },
      abedl: {
        13: {
          info: 'Gelebte Versöhnung mit dem veränderten Schicksal. Finden von Sinn und tiefem Zusammenhalt im Alltag.',
          pesr: 'P: Bewältigung einer lebenslangen chronischen Behinderung. E: Schädel-Hirn-Trauma. S: Dauerhafte Pflegeabhängigkeit. R: Herausragende Resilienz des Paares, gelebte Partnerschaftlichkeit auf Augenhöhe.',
        },
      },
      decisionAnalysis: 'Das Finale zeigt: PEF führt zu nachhaltigen, von allen getragenen Entscheidungen, die Menschen auch in dunkelsten Zeiten Halt geben.',
      passwordHint: 'Zertifikat & Meister-Status freigeschaltet!',
    },
    requiredPassword: 'FINALE',
  },
];
