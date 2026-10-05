import { ModuleData } from '../types';

export const MODULES_DATA: ModuleData[] = [
  // ==========================================
  // DS 1: Präsenz - Das ethische Fundament
  // ==========================================
  {
    id: 1,
    title: 'DS 1: Das ethische Fundament & Autonomieverlust',
    subtitle: 'Präsenzworkshop: Wertehierarchie & Die Zettel-Streichen-Übung',
    locationName: 'Rennstrecke & Lebensumbruch',
    icon: 'Compass',
    timeEstimate: '90 Minuten',
    mapCoordinates: { x: 14, y: 72 },
    badgeId: 'badge_ethik_pionier',
    teacherGuide: {
      doppelstunde: 1,
      topic: 'Ethisches Fundament der Entscheidungsfindung – Autonomie, Vulnerabilität & Paternalismus',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden spüren am eigenen Leib die emotionale Wucht eines fremdbestimmten Kontroll- und Autonomieverlusts.',
        'Sie leiten aus der Selbsterfahrung ethische Kriterien für gelingende Entscheidungen in vulnerablen Pflegesituationen ab.',
        'Sie vollziehen den Perspektivwechsel zu schwerstbetroffenen Menschen wie Stephan (nach Schädel-Hirn-Trauma).',
      ],
      schedule: [
        {
          phase: 'Einstieg & Sensibilisierung',
          timeMinutes: 15,
          activity: 'Begrüßung, Vorstellung des Falls Stephan & Heike. Erläuterung der Bedeutung existenzieller Entscheidungen.',
          socialForm: 'Plenum',
          media: 'App-Startbildschirm & Zitat Heike',
          didacticNotes: 'Fokus auf emotionale Resonanz legen; keine Vorwegnahme theoretischer Modelle.',
        },
        {
          phase: 'Erster Teil: Zettel-Streichen',
          timeMinutes: 20,
          activity: 'Lernende notieren 10 Dinge/Personen/Werte auf Zettel, ohne die ihr Leben nicht vorstellbar wäre. Danach müssen sie selbst 5 davon streichen.',
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
          activity: 'Überleitung zu den 3 theoretischen Entscheidungsmodellen (DS 2) und Ausgabe der Logins für die Lern-App.',
          socialForm: 'Plenum',
          media: 'App-Roadmap Übersicht',
          didacticNotes: 'Aufgabe für DS 2: CNE Fachartikel vorbereitend sichten.',
        },
      ],
      blackboardSummary: `ETHISCHE GRUNDPFEILER DER ENTSCHEIDUNGSFINDUNG:
1. Autonomieprinzip (Selbstbestimmung): Der Patient bleibt Subjekt, kein Objekt.
2. Fürsorgeprinzip vs. Nichtschadensprinzip (Dilemma zwischen Schutz und Entmündigung).
3. Vulnerabilität: Bei Kommunikationsverlust (Aphasie, Koma) droht totaler Kontrollverlust.
4. Kriterien guter Entscheidungen: Transparenz, Einbezug der Lebensgeschichte, multiprofessioneller Dialog, Zeit.`,
      padletQuestions: [
        'Wie hat es sich angefühlt, als der Nachbar über deine Zettel entschieden hat?',
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
        who: 'Stephan (vor dem Unfall gesunder, aktiver Motorsportler/Lebensmensch), Heike (Lebenspartnerin), Pflege-/Ärzteteam.',
        whatHappened: 'Plötzlicher Schicksalsschlag: Schweres Schädel-Hirn-Trauma durch Unfall. Totaler Bruch der bisherigen Lebensbiografie.',
        decisionsMade: 'Notfallmedizinische Maximaltherapie, Übernahme aller Lebensbereiche durch medizinisches Personal.',
        ethicalDilemmas: 'Wer entscheidet, was lebenswert ist? Wie ermittelt man den mutmaßlichen Willen, wenn keine Patientenverfügung vorliegt?',
      },
      abedl: {
        13: {
          info: 'Extremer existenzieller Schock, vollständige Abhängigkeit von Fremdentscheidungen, Verlust der bisherigen Identität.',
          pesr: 'P: Gefahr des Verlusts existenzieller Selbstbestimmung. E: Kommunikationsunfähigkeit nach Trauma. S: Hilflosigkeit, Schock der Angehörigen. R: Enge Bindung zu Heike.',
        },
      },
      decisionAnalysis: 'In DS 1 steht das emotionale Begreifen von Paternalismus und Hilflosigkeit im Vordergrund.',
      passwordHint: 'DS 1 ist der Präsenz-Startpunkt. Das Passwort für DS 2 lautet: THEORIE-2026',
    },
    requiredPassword: 'START',
  },

  // ==========================================
  // DS 2: Theorie & Wissenssicherung
  // ==========================================
  {
    id: 2,
    title: 'DS 2: Die drei Modelle der Entscheidungsfindung',
    subtitle: 'Theoriebaustein, CNE Fachanalyse & Interaktives Wissensquiz',
    locationName: 'Das Seminar & Theoriezentrum',
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
          activity: 'Erarbeitung der Merkmale der 3 Modelle in Kleingruppen anhand des CNE-Fachartikels (Steckbrief-Methode).',
          socialForm: 'Gruppenarbeit',
          media: 'CNE Fachtext / App-Theoriebibliothek',
          didacticNotes: 'Jede Gruppe übernimmt 1 Modell und stellt die Informations- und Machtverteilung dar.',
        },
        {
          phase: 'Interaktive Wissensüberprüfung (App-Quiz)',
          timeMinutes: 25,
          activity: 'Lernende absolvieren das integrierte 8-Fragen Quiz in der App einzeln oder zu zweit.',
          socialForm: 'Einzelarbeit / App',
          media: 'App-Quiz Tab',
          didacticNotes: 'Formatives Feedback: Falschantworten direkt didaktisch erläutern.',
        },
        {
          phase: 'Nachbesprechung & Falltransfer',
          timeMinutes: 25,
          activity: 'Auswertung der Quiz-Ergebnisse im Plenum. Wann ist PEF im Fall Stephan & Heike besonders herausfordernd?',
          socialForm: 'Plenum',
          media: 'Vergleichsmatrix (Beamer)',
          didacticNotes: 'Betonen: PEF ist keine einmalige Handlung, sondern ein kontinuierlicher Prozess!',
        },
      ],
      blackboardSummary: `VERGLEICH DER DREI ENTSCHEIDUNGSMODELLE:

1. PATERNALISTISCHES MODELL:
   - Rolle Pflege/Arzt: Alleiniger Entscheider & Wissensmonopol ("Ich weiß, was das Beste für Sie ist").
   - Rolle Patient: Passiver Empfänger, Wünsche und Werte spielen untergeordnete Rolle.
   - Risiko: Entmündigung, Frustration, Compliance-Probleme.

2. PARTIZIPATIVE ENTSCHEIDUNGSFINDUNG (PEF / Shared Decision Making):
   - Rolle Pflege/Arzt: Fachexperte auf Augenhöhe; teilt evidenzbasiertes Wissen und Handlungsoptionen.
   - Rolle Patient/Angehörige: Experte für die eigene Lebenswelt, persönliche Werte und Präferenzen.
   - Entscheidungsprozess: GEMEINSAM. Geteilte Verantwortung und partnerschaftlicher Konsens.

3. INFORMED DECISION MAKING (Konsumenten-Modell):
   - Rolle Pflege/Arzt: Reiner Informations- und Faktenlieferant (neutral, ohne Beratung/Empfehlung).
   - Rolle Patient: Alleinige Entscheidungslast liegt beim Patienten/Angehörigen.
   - Risiko: Überforderung der Betroffenen in komplexen medizinisch-pflegerischen Krisen.`,
      reflectionPrompts: [
        'Warum ist das reine "Informed Decision Making" bei schwerstkranken Patienten oft eine Überforderung für Angehörige?',
        'Welche Barrieren verhindern im hektischen Pflegealltag eine echte PEF?',
      ],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Welches Kernmerkmal kennzeichnet die "Partizipative Entscheidungsfindung (PEF)" am treffendsten?',
        type: 'multiple_choice',
        options: [
          {
            id: 'q1_a',
            text: 'Die Pflegekraft entscheidet alleine zum Wohle des Patienten, weil sie die größte Fachexpertise besitzt.',
            isCorrect: false,
            explanation: 'Falsch: Das beschreibt das klassische paternalistische Modell (Fürsorge vor Autonomie).',
          },
          {
            id: 'q1_b',
            text: 'Pflegekraft und Patient/Angehörige treffen Entscheidungen als gleichberechtigte Partner auf Basis geteilter Informationen und persönlicher Werte.',
            isCorrect: true,
            explanation: 'Richtig! PEF bedeutet gemeinsame Verantwortung, Informationsaustausch und Konsensfindung auf Augenhöhe.',
          },
          {
            id: 'q1_c',
            text: 'Die Pflegekraft legt lediglich Broschüren hin und überlässt die Entscheidung komplett dem Patienten, ohne Stellung zu nehmen.',
            isCorrect: false,
            explanation: 'Falsch: Das entspricht dem reinen "Informed Decision Making" (Konsumentenmodell), bei dem die Fachkraft sich passiv verhält.',
          },
        ],
      },
      {
        id: 'q2',
        question: 'In welcher Situation kann ein paternalistisches Handeln aus pflegeethischer Sicht vorübergehend unvermeidbar sein?',
        type: 'multiple_choice',
        options: [
          {
            id: 'q2_a',
            text: 'Immer dann, wenn die Pflegekraft unter hohem Zeitdruck steht und die Schicht bald endet.',
            isCorrect: false,
            explanation: 'Falsch: Zeitmangel rechtfertigt niemals die dauerhafte Aushebelung der Patientenautonomie.',
          },
          {
            id: 'q2_b',
            text: 'In akuten Notfallsituationen bei akuter Lebensgefahr und Bewusstlosigkeit, solange kein mutmaßlicher Wille bekannt ist.',
            isCorrect: true,
            explanation: 'Richtig: In der akuten Notfallrettung gilt das Prinzip der Lebenserhaltung (mutmaßlicher Wille zur Rettung), bis differenzierte Absprachen möglich sind.',
          },
          {
            id: 'q2_c',
            text: 'Wenn der Patient eine andere Meinung als das ärztliche Team vertritt.',
            isCorrect: false,
            explanation: 'Falsch: Ein mündiger Patient hat das Recht auf unvernünftige Entscheidungen (Recht auf Krankheit/Therapieablehnung).',
          },
        ],
      },
      {
        id: 'q3',
        question: 'Was ist die größte Gefahr des "Informed Decision Making" für Angehörige wie Heike?',
        type: 'multiple_choice',
        options: [
          {
            id: 'q3_a',
            text: 'Sie erhalten zu wenig medizinische Broschüren.',
            isCorrect: false,
            explanation: 'Falsch: Beim Informed Model erhalten sie zwar viele Daten, aber keine beratende emotionale Begleitung.',
          },
          {
            id: 'q3_b',
            text: 'Schwere emotionale Überlastung und Schuldgefühle, weil sie ohne fachliche Partnerschaft alle tragischen Weichen allein verantworten müssen.',
            isCorrect: true,
            explanation: 'Richtig: Angehörige fühlen sich oft allein gelassen mit der existenziellen Last und quälenden Zukunftsängsten.',
          },
          {
            id: 'q3_c',
            text: 'Dass die Pflegekraft ihnen die Entscheidung komplett abnimmt.',
            isCorrect: false,
            explanation: 'Falsch: Das wäre das paternalistische Modell.',
          },
        ],
      },
      {
        id: 'q4',
        question: 'Welche Aussage beschreibt das Rollenverständnis von Pflegefachkräften in der PEF?',
        type: 'multiple_choice',
        options: [
          {
            id: 'q4_a',
            text: 'Die Pflegekraft ist Vermittlerin, Kommunikatorin und Prozessbegleiterin, die sowohl Fachexpertise als auch Empathie für den Patientenwillen einbringt.',
            isCorrect: true,
            explanation: 'Richtig! Pflegekräfte sind oft die Brücke zwischen ärztlicher Prognose und der gelebten Lebenswelt der Betroffenen.',
          },
          {
            id: 'q4_b',
            text: 'Die Pflegekraft hat keine eigene Meinung und führt stur ärztliche Anweisungen aus.',
            isCorrect: false,
            explanation: 'Falsch: Pflege ist ein eigenständiger Heilberuf mit beruflicher Ethik und Fürsorgepflicht.',
          },
          {
            id: 'q4_c',
            text: 'Die Pflegekraft entscheidet stellvertretend für die Angehörigen über alle Pflegemaßnahmen.',
            isCorrect: false,
            explanation: 'Falsch: Dies verletzt das Prinzip der Partizipation.',
          },
        ],
      },
    ],
    sampleSolution: {
      zusatzdoc: {
        who: 'Pflegefachpersonen, Patient/in, Angehörige (Heike), Ärzteteam.',
        whatHappened: 'Theoretische Durchdringung der drei Entscheidungsmodelle und Reflexion der Machtverhältnisse.',
        decisionsMade: 'Festlegung der Kriterien für partnerschaftliche Zusammenarbeit in der Pflegeausbildung.',
        ethicalDilemmas: 'Spannungsfeld zwischen Fürsorgepflicht (Beneficence) und Autonomieprinzip (Autonomy).',
      },
      abedl: {
        1: {
          info: 'Kommunikation ist die Grundvoraussetzung für jedes partizipative Modell. Bei Aphasie/Trachealkanüle müssen basale und gestützte Kommunikationsformen genutzt werden.',
          pesr: 'P: Eingeschränkte verbale Kommunikationsfähigkeit. E: Neurologische Schädigung. S: Fehlende Lautsprache. R: Nonverbale Signale, Mimik, Anwesenheit der Bezugsperson.',
        },
      },
      decisionAnalysis: 'PEF ist das Leitbild moderner generalistischer Pflege, da es Autonomie achtet und Überforderung mindert.',
      passwordHint: 'Das Passwort für die DS 3 Musterlösung lautet: PEF-ETHIK-3',
    },
    requiredPassword: 'THEORIE-2026',
  },

  // ==========================================
  // DS 3: App-Phase - Loop 1 (Akutklinik)
  // ==========================================
  {
    id: 3,
    title: 'DS 3: Gameloop 1 – Akutklinik & Erste Weichenstellungen',
    subtitle: 'Videosequenz 1: Notfallanamnese, Zusatzdoc & Simulation',
    locationName: 'Akutklinik / Notaufnahme',
    icon: 'Activity',
    timeEstimate: '90 Minuten',
    videoUrl: 'https://app.slidepresenter.com/presentations/0888b573-24ee-4ae4-bdd8-44a95bf1c4e0?time=0',
    videoTitle: 'Videosequenz 1: Die Akutphase nach dem Unfall',
    videoDuration: 'ca. 8-10 Min.',
    videoDescription: 'Stephan liegt nach dem schweren Unfall in der Akutklinik. Heike erlebt den ersten Schock und muss die veränderte Situation begreifen.',
    mapCoordinates: { x: 42, y: 32 },
    badgeId: 'badge_anamnese_profi',
    teacherGuide: {
      doppelstunde: 3,
      topic: 'Gameloop 1: Informationssammlung (Zusatzdoc & ABEDL) und erste Simulation in der Akutphase',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden erfassen systematisch pflegerelevante Daten aus Videosequenz 1 mit dem Zusatzdoc V.2 und den 13 ABEDL.',
        'Sie formulieren erste PESR-Pflegediagnosen zur Kommunikations- und Mobilitätseinschränkung.',
        'In der Simulation erproben sie die 3 Entscheidungsmodelle im Umgang mit Heikes Schock und Stephans Beatmungssituation.',
      ],
      schedule: [
        {
          phase: 'Schritt 1: Videoeinstieg',
          timeMinutes: 15,
          activity: 'Gemeinsames oder individuelles Anschauen von Videosequenz 1 in der App.',
          socialForm: 'Einzelarbeit / Plenum',
          media: 'SlidePresenter Video 1',
          didacticNotes: 'Fokus auf Details lenken: Monitoring, Beatmungsschlauch, Heikes Körpersprache.',
        },
        {
          phase: 'Schritt 2: Dokumentation (ABEDL & Zusatzdoc)',
          timeMinutes: 30,
          activity: 'Lernende befüllen die digitalen Formulare (Zusatzdoc V.2 und ABEDL 1-13 mit PESR).',
          socialForm: 'Einzelarbeit / Partnerarbeit',
          media: 'App-Formulare & Docx-Export',
          didacticNotes: 'Auf präzise Symptombeschreibungen und Ressourcen achten (Heikes Präsenz als Ressource).',
        },
        {
          phase: 'Schritt 3: Identifikation der Entscheidungsmomente',
          timeMinutes: 10,
          activity: 'Welche existenziellen Weichen stehen jetzt an? (Beatmungsentwöhnung, Einbezug Heikes).',
          socialForm: 'Plenum',
          media: 'Metaplan',
          didacticNotes: 'Vorbereitung auf das Mini-Adventure.',
        },
        {
          phase: 'Schritt 4: Das Mini-Adventure (Simulation)',
          timeMinutes: 20,
          activity: 'Durchspielen der interaktiven Simulation. Lernende wählen ihre Haltung (Paternalistisch, PEF, Informed).',
          socialForm: 'Einzelarbeit',
          media: 'App-Simulation Tab',
          didacticNotes: 'Hidden Stats tracken im Hintergrund den Grad der Partizipation.',
        },
        {
          phase: 'Schritt 5: Auswertung & Musterlösung',
          timeMinutes: 15,
          activity: 'Generierung des Passwort-Fragments (PEF-ETHIK-3), Freischaltung der Musterlösung und Nachbesprechung.',
          socialForm: 'Plenum',
          media: 'Passwort-Tresor',
          didacticNotes: 'Vergleich der eigenen Formulareinträge mit der offiziellen Musterlösung.',
        },
      ],
      blackboardSummary: `KERNPUNKTE DS 3 (AKUTPHASE):
- Zusatzdoc: Akute Krise, Heike hochgradig verunsichert, Stephan sediert/beatmet.
- Pflegediagnosen: Beeinträchtigte Spontanatmung (PESR), Gefahr der Reizüberflutung.
- Entscheidungsdilemma: Wie viel Information und Mitbestimmung verträgt eine Angehörige im akuten Schock?
- PEF-Leitlinie: Heike Schritt für Schritt einbinden, ohne sie mit alleiniger Verantwortung zu erdrücken.`,
      reflectionPrompts: [
        'Wie hast du dich in der Simulation entschieden, als Heike weinend vor dem Bett stand?',
        'Welche Folgen hätte ein rein paternalistisches Wegschicken der Angehörigen gehabt?',
      ],
    },
    simulation: {
      id: 'sim_ds3',
      title: 'Simulation: Erste Begegnung auf der Intensivstation',
      initialDescription: 'Stephan liegt nach dem Schädel-Hirn-Trauma intubiert im Intensivbett. Monitore piepen. Heike betritt zum ersten Mal das Zimmer und ist vom Anblick überwältigt. Du bist die verantwortliche Bezugspflegekraft.',
      passwordFragment: 'PEF-ETHIK-3',
      reflectionQuestions: [
        'Wie wirkt sich deine gewählte Haltung auf Heikes Vertrauen in das Pflegeteam aus?',
        'Wie schützt PEF vor Traumatisierung der Angehörigen?',
      ],
      steps: [
        {
          id: 'step_ds3_1',
          title: 'Situation 1: Der erste Schockmoment',
          speaker: 'Heike',
          speakerRole: 'Lebenspartnerin',
          speakerAvatar: '👩',
          sceneDescription: 'Heike steht zitternd an der Tür, traut sich kaum näher zu treten und starrt auf die Schläuche.',
          dialogueText: '„Mein Gott... Stephan... Was haben die ganzen Schläuche zu bedeuten? Kann er mich überhaupt hören? Ich weiß überhaupt nicht, was ich tun soll... Soll ich lieber draußen warten?“',
          dilemmaPrompt: 'Wie reagierst du als Pflegefachkraft und welches Entscheidungsmodell wählst du?',
          options: [
            {
              id: 'opt_ds3_paternalistic',
              model: 'paternalistic',
              modelLabel: '1. Paternalistisches Modell',
              quote: '„Frau Heike, bitte treten Sie zurück auf den Flur. Stephan braucht jetzt absolute Ruhe und die Monitore sind zu kompliziert für Sie. Wir kümmern uns um alles, verlassen Sie sich einfach auf uns.“',
              actionText: 'Heike aus dem Zimmer verweisen, um ungestört medizinische Pflegeroutinen durchzuführen.',
              immediateReaction: 'Heike weicht verunsichert zurück, fühlt sich wie ein störendes Hindernis und verlässt mit Tränen den Raum.',
              explanation: 'Paternalistisch: Die Pflegekraft übernimmt die totale Kontrolle, schließt die Angehörige aus und entmündigt sie aus vermeintlicher Fürsorge.',
              statsImpact: { pefScore: 0, paternalisticScore: 1, informedScore: 0, autonomyScore: -1 },
            },
            {
              id: 'opt_ds3_pef',
              model: 'pef',
              modelLabel: '2. Partizipative Entscheidungsfindung (PEF)',
              quote: '„Kommen Sie ganz in Ruhe näher, Frau Heike. Nehmen Sie gern seine Hand. Stephan spürt Ihre Anwesenheit. Die Schläuche unterstützen ihn beim Atmen. Wir entscheiden bei jedem Schritt gemeinsam, wie weit Sie mitwirken möchten. Möchten Sie sich erst setzen oder ihm etwas vertrautes erzählen?“',
              actionText: 'Heike behutsam an das Bett führen, Ängste validieren, Orientierung geben und gemeinsam die nächsten Schritte absprechen.',
              immediateReaction: 'Heike atmet tief durch, fasst Stephans Hand. Ihre Anspannung weicht spürbar; sie fühlt sich als Partnerin ernst genommen.',
              explanation: 'PEF: Gleichberechtigte Einbeziehung, emotionale Sicherheit, Erforschung der Bedürfnisse und geteilte Handlungsplanung.',
              statsImpact: { pefScore: 1, paternalisticScore: 0, informedScore: 0, autonomyScore: 1 },
            },
            {
              id: 'opt_ds3_informed',
              model: 'informed',
              modelLabel: '3. Informed Decision Making',
              quote: '„Hier sind die Broschüren über Beatmungsmedizin und SHT Grad III. Sie können entscheiden, ob Sie die Basale Stimulation selbst durchführen oder ob wir das machen. Lesen Sie sich das durch und sagen Sie mir dann Bescheid.“',
              actionText: 'Heike Infomaterial aushändigen und die Entscheidung über Pflegemaßnahmen ihr allein überlassen.',
              immediateReaction: 'Heike hält die Papiere mit zittrigen Händen, blickt hilflos zwischen den Fachbegriffen und Stephan hin und her und wirkt völlig überfordert.',
              explanation: 'Informed: Sachliche Faktenübermittlung ohne emotionale Begleitung oder partnerschaftliche Führung überfordert Angehörige in Akutkrisen.',
              statsImpact: { pefScore: 0, paternalisticScore: 0, informedScore: 1, autonomyScore: 0 },
            },
          ],
        },
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Stephan (nach schwerem SHT, intubiert/beatmet, sediert), Heike (Lebenspartnerin, schockiert), Pflegefachkraft der Intensivstation, Intensivmediziner.',
        whatHappened: 'Stephan wurde nach dem schweren Unfall auf der Intensivstation aufgenommen. Er hängt am Beatmungsgerät und an Infusionen. Heike besucht ihn zum ersten Mal und erlebt die Entfremdung des Partners durch die Intensivmedizin.',
        decisionsMade: 'Beginn der vorsichtigen Kontaktaufnahme (Basale Stimulation), Festlegung der Besuchszeiten, Absprache zur Einbindung Heikes in die Körperpflege.',
        ethicalDilemmas: 'Wann schützt Schonung vor Belastung und wann wird sie zur Ausgrenzung der engsten Bezugsperson? Wie kann Stephans mutmaßlicher Wille erforscht werden?',
      },
      abedl: {
        1: {
          info: 'Keine verbale Artikulation möglich (orotrachealer Tubus, Sedierung). Reagiert reflexartig auf Schmerz-/Berührungsreize.',
          pesr: 'P: Vollständiger Verlust der verbalen Kommunikation. E: Intubation und Schädel-Hirn-Trauma. S: Fehlende Lautäußerung, Mimik erstarrt. R: Gehörfunktionen potentiell intakt; beruhigende Reaktion auf Heikes Stimme.',
        },
        2: {
          info: 'Vollständige Bettlägerigkeit, Tonuserhöhung der Extremitäten, Decubitus- und Kontrakturrisiko.',
          pesr: 'P: Immobilität und Kontrakturgefahr. E: Zerebrale Schädigung. S: Spastische Tendenzen, passive Lage. R: Passive Durchbewegung durch Physiotherapie und Pflege.',
        },
        3: {
          info: 'Invasive Beatmung über Tubus, Absaugbedarf bei Sekretstau, Vitalparameter über Monitor überwacht.',
          pesr: 'P: Beeinträchtigte Spontanatmung und Aspirationsgefahr. E: Zentrale Atemregulationsstörung nach SHT. S: Abhängigkeit vom Beatmungsgerät. R: Kontinuierliches intensivmedizinisches Monitoring.',
        },
        4: {
          info: 'Vollständige Übernahme der Körperpflege und Hautpflege erforderlich.',
          pesr: 'P: Selbstversorgungsdefizit Körperpflege. E: Koma/Sedierung. S: Unfähigkeit zur Eigenpflege. R: Intakter Hautzustand bei Aufnahme, Einbeziehung gewohnter Pflegeprodukte durch Heike.',
        },
        5: {
          info: 'Nahrungskarenz, parenterale Infusionstherapie, Magensonde zur Magenentlastung gelegt.',
          pesr: 'P: Unfähigkeit zur oralen Nahrungs- und Flüssigkeitsaufnahme. E: Schluckreflexausfall bei Koma. S: Nüchternzustand. R: Angepasste parenterale Ernährung.',
        },
        12: {
          info: 'Heike ist die wichtigste soziale Stütze und Bezugsperson, leidet jedoch unter akuter Schockbelastung.',
          pesr: 'P: Gefahr der sozialen Isolation und Überlastung der Lebenspartnerin. E: Lebensbedrohliche Erkrankung des Partners. S: Weinen, Rückzugsgedanken. R: Ausgeprägte emotionale Loyalität und Liebe zu Stephan.',
        },
        13: {
          info: 'Existenzielle Grenzerfahrung: Konfrontation mit potenzieller Behinderung, Sterben und Lebensplanverlust.',
          pesr: 'P: Existenzielle Lebenskrise für das Paar. E: Plötzlicher Unfall. S: Ungewissheit über die neurologische Prognose. R: Gemeinsame Biographie und Erinnerungen.',
        },
      },
      decisionAnalysis: 'In der Akutphase muss die Pflegekraft partizipativ vorgehen: Heike Raum geben, Orientierung schenken und schrittweise als Co-Expertin für Stephans Biografie einbinden.',
      passwordHint: 'Das Passwort für DS 4 lautet: AUTONOMIE-8',
    },
    requiredPassword: 'PEF-ETHIK-3',
  },

  // ==========================================
  // DS 4: App-Phase - Loop 2 (Intensiv & Weaning)
  // ==========================================
  {
    id: 4,
    title: 'DS 4: Gameloop 2 – Trachealkanüle, Ernährung & Weaning',
    subtitle: 'Videosequenz 2: PEG-Sonde, Schluckversuche & Partizipation',
    locationName: 'Weaning-Station & Trachealkanülenmanagement',
    icon: 'HeartPulse',
    timeEstimate: '90 Minuten',
    videoUrl: 'https://app.slidepresenter.com/presentations/e8dfe12a-167b-4d55-824a-6c0053c887b4',
    videoTitle: 'Videosequenz 2: Der Kampf um Atmung und erste Nahrung',
    videoDuration: 'ca. 10-12 Min.',
    videoDescription: 'Stephan hat eine Trachealkanüle erhalten. Es geht um die Entwöhnung vom Beatmungsgerät (Weaning), das Schlucken und die Entscheidung über eine PEG-Magensonde.',
    mapCoordinates: { x: 58, y: 55 },
    badgeId: 'badge_pef_champion',
    teacherGuide: {
      doppelstunde: 4,
      topic: 'Gameloop 2: Trachealkanüle, Dysphagie und ethische Entscheidungen zur enteralen Ernährung (PEG)',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden erfassen die ABEDL 3 (Vitale Funktionen) und ABEDL 5 (Essen & Trinken) unter Bedingungen einer Trachealkanüle.',
        'Sie analysieren die Risiken zwischen Aspirationspneumonie und Lebensqualität durch Geschmackserlebnisse.',
        'In der Simulation navigieren sie den Konflikt zwischen ärztlicher Risikominimierung und Heikes Wunsch nach oralen Reizen.',
      ],
      schedule: [
        {
          phase: 'Schritt 1: Videoeinstieg',
          timeMinutes: 15,
          activity: 'Videosequenz 2 sichten. Beobachtungsfokus: Trachealkanüle, Hustenreflex, Frustration.',
          socialForm: 'Einzelarbeit',
          media: 'SlidePresenter Video 2',
          didacticNotes: 'Auf mimische Reaktionen von Stephan beim Absaugen achten.',
        },
        {
          phase: 'Schritt 2: Pflegeanamnese & Zusatzdoc',
          timeMinutes: 30,
          activity: 'Dokumentation der Dysphagie, Kanülenblockung und Sondenernährung in den ABEDL 3 und 5 mit PESR.',
          socialForm: 'Partnerarbeit',
          media: 'App-Formulare & Docx-Export',
          didacticNotes: 'PESR präzise formulieren: Problem (Dysphagie), Ursache (Hirnstammläsion), Symptom (Speichelfluss).',
        },
        {
          phase: 'Schritt 3: Entscheidungs-Dilemma',
          timeMinutes: 10,
          activity: 'Plenumsdiskussion: Wann ist eine PEG-Sonde Fürsorge und wann nimmt sie Autonomie?',
          socialForm: 'Plenum',
          media: 'Tafel',
          didacticNotes: 'Vorbereitung auf die 3 Modelloptionen in der Simulation.',
        },
        {
          phase: 'Schritt 4: Simulation & Entscheidung',
          timeMinutes: 20,
          activity: 'Lernende wählen im Mini-Adventure die Haltung zum Thema Schluckversuche vs. Sondenernährung.',
          socialForm: 'Einzelarbeit',
          media: 'App-Simulation Tab',
          didacticNotes: 'Tracking der Hidden Stats.',
        },
        {
          phase: 'Schritt 5: Auswertung & Freischaltung',
          timeMinutes: 15,
          activity: 'Eingabe des erspielten Passworts (AUTONOMIE-8) zur Musterlösungs-Freischaltung.',
          socialForm: 'Plenum',
          media: 'App Auswertung',
          didacticNotes: 'Reflexion über partizipative Ethikberatung.',
        },
      ],
      blackboardSummary: `DILEMMA: PEG-SONDE & SCHLUCKVERSUCHE:
- Furcht vor Aspiration vs. Wunsch nach normalem Geschmack.
- PEF-Lösung: Logopädische FEES-Diagnostik, strukturierte therapeutische Geschmacksproben (z. B. Lieblingskaffee) unter Schutz der blockierten Kanüle, geteilte Entscheidung mit Heike über Sondennutzung.`,
      reflectionPrompts: [
        'Warum ist der Verzicht auf jede orale Kost für wache Patienten oft eine psychische Qual?',
        'Wie bindet PEF Logopädie, Pflege, Arzt und Angehörige an einen runden Tisch?',
      ],
    },
    simulation: {
      id: 'sim_ds4',
      title: 'Simulation: Das Dilemma um Nahrung und Trachealkanüle',
      initialDescription: 'Stephan blickt traurig auf den Becher Tee, den Heike in der Hand hält. Er hat Durst. Die Trachealkanüle liegt noch, der Schluckreflex ist unvollständig. Der Stationsarzt rät zur reinen PEG-Ernährung ohne orale Versuche.',
      passwordFragment: 'AUTONOMIE-8',
      reflectionQuestions: [
        'Wie hast du das Sicherheitsbedürfnis (Aspirationsschutz) mit dem Lebensqualitätsbedürfnis ausbalanciert?',
        'Welche Rolle spielt Heikes Fachwissen über Stephans Vorlieben?',
      ],
      steps: [
        {
          id: 'step_ds4_1',
          title: 'Situation: Darf Stephan einen Tropfen Kaffee schmecken?',
          speaker: 'Heike',
          speakerRole: 'Lebenspartnerin',
          speakerAvatar: '👩',
          sceneDescription: 'Heike hält eine kleine Tasse Kaffee. Stephan fixiert sie mit den Augen und leckt sich über die Lippen.',
          dialogueText: '„Stephan liebt seinen Kaffee so sehr. Kann ich ihm nicht nur einen Tropfen auf die Zunge tupfen? Der Arzt meinte streng, das sei lebensgefährlich. Aber Stephan schaut mich so flehend an... Was sollen wir tun?“',
          dilemmaPrompt: 'Welche Haltung nimmst du als Pflegefachkraft ein?',
          options: [
            {
              id: 'opt_ds4_paternalistic',
              model: 'paternalistic',
              modelLabel: '1. Paternalistisches Modell',
              quote: '„Nein, auf keinen Fall! Der Arzt hat ein striktes Schluckverbot verhängt. Stellen Sie die Tasse sofort weg. Wenn er aspiriert, bekommen wir hier riesige Probleme.“',
              actionText: 'Striktes Verbot aussprechen, die Kaffeetasse entfernen und auf ärztliche Anordnung pochen.',
              immediateReaction: 'Heike zieht eingeschüchtert die Hand zurück. Stephan wendet enttäuscht den Blick ab und schließt resigniert die Augen.',
              explanation: 'Paternalistisch: Rein risikoaverse Verbote ohne Erklärung erzeugen Frustration und schließen Lebensqualität kategorisch aus.',
              statsImpact: { pefScore: 0, paternalisticScore: 1, informedScore: 0, autonomyScore: -1 },
            },
            {
              id: 'opt_ds4_pef',
              model: 'pef',
              modelLabel: '2. Partizipative Entscheidungsfindung (PEF)',
              quote: '„Ich verstehe Ihren Wunsch so gut, Frau Heike. Die Gefahr des Verschluckens in die Lunge ist real, aber wir können gemeinsam mit der Logopädin sichere Geschmacksproben planen. Ich hole einen Schaumstofftupfer: Wir benetzen nur leicht seine Lippen mit dem Kaffeearoma, während die Kanüle sicher geblockt ist, und beobachten seine Reaktion gemeinsam.“',
              actionText: 'Risiken transparent benennen, aber gemeinsam mit Heike und Logopädie eine sichere, basale Geschmackserfahrung ermöglichen.',
              immediateReaction: 'Heike lächelt erleichtert. Als der Kaffeeduft Stephans Lippen berührt, entspannen sich seine Gesichtszüge spürbar.',
              explanation: 'PEF: Wissenschaftlich fundierte Risikoabwägung kombiniert mit existenzieller Fürsorge und partnerschaftlicher Durchführung.',
              statsImpact: { pefScore: 1, paternalisticScore: 0, informedScore: 0, autonomyScore: 1 },
            },
            {
              id: 'opt_ds4_informed',
              model: 'informed',
              modelLabel: '3. Informed Decision Making',
              quote: '„Das Aspirationsrisiko liegt statistisch bei 35%, eine Pneumonie kann tödlich sein. Sie haben das Sorgerecht: Entscheiden Sie selbst, ob Sie ihm den Kaffee geben wollen oder nicht. Ich halte mich da raus.“',
              actionText: 'Rein statistische Risiken nennen und die lebensbedrohliche Entscheidung komplett Heike überlassen.',
              immediateReaction: 'Heike gerät in Panik vor möglicher Schuld am Tod ihres Partners und stellt die Tasse zitternd weg.',
              explanation: 'Informed: Das bloße Nennen von Mortalitätsrisiken ohne pflegerische Handlungsoptionen lässt Angehörige in Schuldängsten allein.',
              statsImpact: { pefScore: 0, paternalisticScore: 0, informedScore: 1, autonomyScore: 0 },
            },
          ],
        },
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Stephan (Trachealkanüle, Dysphagie), Heike, Pflegefachkraft, Logopädin, Stationsarzt.',
        whatHappened: 'Diskussion um Weaning-Fortschritte, orales Schlucktraining vs. parenterale/PEG-Versorgung. Heike wünscht sich Lebensqualität für Stephan.',
        decisionsMade: 'Durchführung einer fiberoptischen Schluckuntersuchung (FEES). Strukturierte basale Geschmacksstimulation mit Kaffee-Tupfer unter pflegerischer Aufsicht.',
        ethicalDilemmas: 'Sicherheit (Vermeidung von Lungenentzündung) vs. Wohlbefinden und basale Lebensfreude (Geschmackssinn).',
      },
      abedl: {
        3: {
          info: 'Trachealkanüle mit Cuff. Weaning-Versuche mit Sprechventil in Phasen. Sekretabsaugung subglottisch.',
          pesr: 'P: Eingeschränkte Spontanatmung und Sekretretention. E: Zerebrale Parese der Atemmuskulatur. S: Rasselnde Atemgeräusche. R: Gute Sauerstoffsättigung bei Weaning-Intervallen.',
        },
        5: {
          info: 'Schwere neurogene Dysphagie. Enterale Ernährung über PEG-Sonde. Wunsch nach oralen Geschmacksimpulsen.',
          pesr: 'P: Schluckstörung mit hoher Aspirationsgefahr. E: Schädigung der Hirnnervenkerne. S: Verschlucken bei Speichel. R: Hohe Motivation bei vertrauten Aromen (Kaffee).',
        },
      },
      decisionAnalysis: 'Gute Pflegepraxis findet den Korridor zwischen Sicherheit und Autonomie durch interprofessionelle PEF.',
      passwordHint: 'Das Passwort für DS 5 lautet: PARTNER-4',
    },
    requiredPassword: 'AUTONOMIE-8',
  },

  // ==========================================
  // DS 5: App-Phase - Loop 3 (Frühreha & Talker)
  // ==========================================
  {
    id: 5,
    title: 'DS 5: Gameloop 3 – Frühreha, Talker & Frustration',
    subtitle: 'Videosequenz 3: Kommunikationshilfen, Augensteuerung & Reha-Ziele',
    locationName: 'Frührehabilitations-Zentrum',
    icon: 'Bot',
    timeEstimate: '90 Minuten',
    videoUrl: 'https://app.slidepresenter.com/presentations/46eba7a7-3e4d-4c70-ad6c-e9e1b6bb584a?time=0',
    videoTitle: 'Videosequenz 3: Auf dem Weg zur Verständigung',
    videoDuration: 'ca. 10-12 Min.',
    videoDescription: 'Stephan ist in der Frühreha. Es wird versucht, mit Augensteuerungs-Computern (Talker) und Buchstabentafeln eine Brücke zur Kommunikation zu bauen.',
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
          phase: 'Schritt 1: Videoeinstieg',
          timeMinutes: 15,
          activity: 'Videosequenz 3 analysieren. Fokus: Augenbewegungen, Frustration beim Tippen, Therapeutenverhalten.',
          socialForm: 'Einzelarbeit',
          media: 'SlidePresenter Video 3',
          didacticNotes: 'Achten auf Stephans Erschöpfung nach nur 5 Minuten Computerarbeit.',
        },
        {
          phase: 'Schritt 2: Dokumentation',
          timeMinutes: 30,
          activity: 'Eintragung in Zusatzdoc und ABEDL 1, 9, 13 mit PESR-Pflegediagnosen.',
          socialForm: 'Partnerarbeit',
          media: 'App-Formular',
          didacticNotes: 'Ressourcen herausarbeiten: Intellektuelles Verständnis ist vorhanden!',
        },
        {
          phase: 'Schritt 3: Simulation & Dialogbaum',
          timeMinutes: 20,
          activity: 'Simulation: Stephan verweigert frustriert den Talker nach wiederholten Fehlkalibrierungen.',
          socialForm: 'Einzelarbeit',
          media: 'App-Simulation',
          didacticNotes: 'Wie reagiert die Pflegekraft auf Wut und Verweigerung?',
        },
        {
          phase: 'Schritt 4: Auswertung & Freischaltung',
          timeMinutes: 25,
          activity: 'Eingabe des Passworts (PARTNER-4) und Besprechung der Musterlösung.',
          socialForm: 'Plenum',
          media: 'App Auswertung',
          didacticNotes: 'Reflexion: Geduld und Zeit als pflegeethische Ressource.',
        },
      ],
      blackboardSummary: `UNTERSTÜTZTE KOMMUNIKATION (UK):
- Talker / Augensteuerung erfordert höchste Konzentration.
- Paternalismus: Zwingen zur Übung ("Sie müssen aber, sonst machen Sie keine Fortschritte").
- PEF: Pausen aushandeln, Frustration validieren, alternative Ja/Nein-Kodes (z.B. Blinzeln) etablieren.`,
      reflectionPrompts: [
        'Wie fühlt es sich an, wenn das Denken schneller ist als die technische Eingabe?',
        'Wie kann Heike als Übersetzerin für Stephans Mikro-Mimik einbezogen werden?',
      ],
    },
    simulation: {
      id: 'sim_ds5',
      title: 'Simulation: Der Abbruch beim Kommunikationstraining',
      initialDescription: 'Stephan sitzt im Therapiestuhl vor dem Augensteuerungs-Monitor. Die Kalibrierung schlägt zum dritten Mal fehl. Er schließt wütend die Augen, dreht den Kopf weg und atmet heftig durch die Kanüle. Die Ergotherapeutin möchte die Stunde abbrechen.',
      passwordFragment: 'PARTNER-4',
      reflectionQuestions: [
        'Wie hast du Stephans nonverbale Verweigerung interpretiert?',
        'Wie schaffst du Raum für Autonomie, ohne den Reha-Fortschritt aufzugeben?',
      ],
      steps: [
        {
          id: 'step_ds5_1',
          title: 'Situation: Wut und Erschöpfung am Bildschirm',
          speaker: 'Heike',
          speakerRole: 'Lebenspartnerin',
          speakerAvatar: '👩',
          sceneDescription: 'Heike streicht Stephan über die Schulter. Stephan presst die Lippen zusammen und verweigert jeden Blickkontakt zum Bildschirm.',
          dialogueText: '„Er ist fix und fertig. Heute geht einfach gar nichts mehr. Wenn wir ihn jetzt zwingen, hasst er das Gerät für immer. Aber wenn er es nicht lernt, kann er uns nie wieder sagen, was er denkt... Was sollen wir jetzt tun?“',
          dilemmaPrompt: 'Welche Reaktion wählst du?',
          options: [
            {
              id: 'opt_ds5_paternalistic',
              model: 'paternalistic',
              modelLabel: '1. Paternalistisches Modell',
              quote: '„Herr Stephan, jetzt reißen Sie sich bitte zusammen! Ohne Fleiß kein Preis. Wir haben nur diesen Therapie-Slot und wenn Sie jetzt streiken, verlieren Sie den Reha-Platz. Noch 10 Minuten durchziehen!“',
              actionText: 'Stephan autoritär zum Weitermachen drängen, um das vorgegebene Therapiepensum zu erfüllen.',
              immediateReaction: 'Stephan spannt den gesamten Oberkörper spastisch an, sein Puls schießt hoch und er verweigert jegliche Kooperation.',
              explanation: 'Paternalistisch: Zwang und Missachtung von Erschöpfungsgrenzen zerstören die Motivation und verstärken Spastiken.',
              statsImpact: { pefScore: 0, paternalisticScore: 1, informedScore: 0, autonomyScore: -1 },
            },
            {
              id: 'opt_ds5_pef',
              model: 'pef',
              modelLabel: '2. Partizipative Entscheidungsfindung (PEF)',
              quote: '„Stephan, ich sehe, wie anstrengend das heute ist und wie wütend die Technik macht. Lass uns die Augensteuerung für heute beiseite schieben. Stephan, blinzle einmal für Ja: Möchtest du heute lieber mit Heike und der Buchstabentafel arbeiten oder einfach eine halbe Stunde Musik hören und ausruhen?“',
              actionText: 'Frustration anerkennen, Druck herausnehmen und über einfache Ja/Nein-Signale Stephans Entscheidung für den Rest des Tages einholen.',
              immediateReaction: 'Stephan öffnet die Augen, schaut die Pflegekraft dankbar an und blinzelt zweimal bewusst für die Pause mit Musik.',
              explanation: 'PEF: Echte Selbstbestimmung bedeutet auch das Recht, eine Pause einzufordern. Wertschätzender Einbezug stärkt die Selbstwirksamkeit.',
              statsImpact: { pefScore: 1, paternalisticScore: 0, informedScore: 0, autonomyScore: 1 },
            },
            {
              id: 'opt_ds5_informed',
              model: 'informed',
              modelLabel: '3. Informed Decision Making',
              quote: '„Die Krankenkasse zahlt den Talker nur bei dokumentierter Nutzung von 45 min täglich. Wenn wir abbrechen, sinkt die Bewilligungswahrscheinlichkeit um 60%. Entscheiden Sie beide, ob Sie abbrechen wollen.“',
              actionText: 'Verwaltungsrichtlinien und Quoten aufzählen und die Entscheidung ohne Hilfestellung dem Paar überlassen.',
              immediateReaction: 'Heike gerät in schwere Gewissensbisse zwischen Stephans Qual und bürokratischem Verlust des Hilfsmittels.',
              explanation: 'Informed: Das Reduzieren von existenziellen Pflegeentscheidungen auf bürokratische Kennzahlen verfehlt den humanistischen Pflegeauftrag.',
              statsImpact: { pefScore: 0, paternalisticScore: 0, informedScore: 1, autonomyScore: 0 },
            },
          ],
        },
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Stephan (in Frührehabilitation), Heike, Pflegefachkraft, Ergotherapeutin, Logopädin.',
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
      passwordHint: 'Das Passwort für DS 6 lautet: KROHWINKEL-7',
    },
    requiredPassword: 'PARTNER-4',
  },

  // ==========================================
  // DS 6: App-Phase - Loop 4 (Pflegeheim vs. Zuhause)
  // ==========================================
  {
    id: 6,
    title: 'DS 6: Gameloop 4 – Zuhause oder Pflegeheim?',
    subtitle: 'Videosequenz 4: Angehörigenbelastung, Langzeitpflege & Rollenkonflikt',
    locationName: 'Sozialdienst & Entlassmanagement',
    icon: 'Home',
    timeEstimate: '90 Minuten',
    videoUrl: 'https://app.slidepresenter.com/presentations/b29b77b4-810d-4c5a-a961-3b7a7a07c29d?time=0',
    videoTitle: 'Videosequenz 4: Die schwerste Entscheidung – Wo ist Zukunft?',
    videoDuration: 'ca. 10-12 Min.',
    videoDescription: 'Die Reha-Phase endet. Die zentrale Lebensentscheidung steht an: Kann Heike die 24-Stunden-Intensivpflege zu Hause stemmen oder ist eine Spezialeinrichtung notwendig?',
    mapCoordinates: { x: 86, y: 65 },
    badgeId: 'badge_code_breaker',
    teacherGuide: {
      doppelstunde: 6,
      topic: 'Gameloop 4: Entlassmanagement, Angehörigen-Burnout (Caregiver Burden) und partnerschaftliche Zukunftsplanung',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden erfassen ABEDL 10 (Sexualität/Partnerschaft) und ABEDL 12 (Soziale Bereiche) im Kontext schwerster Pflegebedürftigkeit.',
        'Sie erkennen den schmerzhaften Rollenwandel von Heike: von der Liebespartnerin zur 24/7-Pflegekraft.',
        'In der Simulation moderieren sie das existenzielle Gespräch zwischen Heikes Loyalität, Stephans Wünschen und professionellen Hilfen.',
      ],
      schedule: [
        {
          phase: 'Schritt 1: Videoeinstieg',
          timeMinutes: 15,
          activity: 'Sichten von Videosequenz 4. Beobachtungsfokus: Heikes Erschöpfung, Tränen, Stephans Blick.',
          socialForm: 'Einzelarbeit',
          media: 'SlidePresenter Video 4',
          didacticNotes: 'Die seelische Zerrissenheit Heikes verdeutlichen.',
        },
        {
          phase: 'Schritt 2: Dokumentation',
          timeMinutes: 30,
          activity: 'Befüllen von Zusatzdoc und ABEDL 10, 11, 12 mit detaillierten PESR-Pflegediagnosen.',
          socialForm: 'Partnerarbeit',
          media: 'App-Formulare & Docx-Export',
          didacticNotes: 'Fokus auf Überlastung der pflegenden Angehörigen (Pflegediagnose: Rollenüberlastung).',
        },
        {
          phase: 'Schritt 3: Simulation & Dilemmata',
          timeMinutes: 20,
          activity: 'Simulation: Das Beratungsgespräch zur Entlassung. Heimunterbringung vs. Intensivpflegedienst zu Hause.',
          socialForm: 'Einzelarbeit',
          media: 'App-Simulation Tab',
          didacticNotes: 'Wie verhindert die Pflegekraft Schuldgefühle bei Heike?',
        },
        {
          phase: 'Schritt 4: Auswertung & Musterlösung',
          timeMinutes: 25,
          activity: 'Passworteingabe (KROHWINKEL-7), Freischaltung und Reflexion im Plenum.',
          socialForm: 'Plenum',
          media: 'App Auswertung',
          didacticNotes: 'Synthese: Wie stützt PEF das gesamte Familiensystem?',
        },
      ],
      blackboardSummary: `ENTLASSUNGSMANAGEMENT & CAREGIVER BURDEN:
- Heikes Dilemma: Versprechen ("Ich lasse dich nie im Stich") vs. physische/psychische Erschöpfung.
- Gefahr paternalistischer Beratung: Zwang zum Heim ("Sie schaffen das sowieso nicht") oder Verklärung der häuslichen Pflege.
- PEF-Ansatz: Realistische Bedarfsanalyse, Einbindung ambulanter Intensivpflege (1:1), Entlastungsangebote (Verhinderungspflege, Tagespflege), Erhalt der Partnerrolle.`,
      reflectionPrompts: [
        'Wie verändert sich eine Liebesbeziehung, wenn einer der Partner zum Vollzeit-Pfleger wird?',
        'Welche Unterstützungsnetzwerke sind unverzichtbar, damit eine Rückkehr nach Hause gelingen kann?',
      ],
    },
    simulation: {
      id: 'sim_ds6',
      title: 'Simulation: Das Entlassungsgespräch – Heim oder Daheim?',
      initialDescription: 'Die Entlassung aus der Rehaklinik steht in 3 Wochen an. Heike sitzt mit tiefen Augenringen im Besprechungszimmer. Der Sozialdienst drängt auf eine Entscheidung für ein Pflegeheim. Heike bricht in Tränen aus.',
      passwordFragment: 'KROHWINKEL-7',
      reflectionQuestions: [
        'Wie gelingt es, Heike vor Selbstaufgabe zu schützen, ohne ihre Wünsche zu übergehen?',
        'Wie wurde Stephan in diese Zukunftsentscheidung einbezogen?',
      ],
      steps: [
        {
          id: 'step_ds6_1',
          title: 'Situation: Heikes Tränen und Schuldgefühle',
          speaker: 'Heike',
          speakerRole: 'Lebenspartnerin',
          speakerAvatar: '👩',
          sceneDescription: 'Heike vergräbt das Gesicht in den Händen. Auf dem Tisch liegen Prospekte von Schwerstpflegeheimen.',
          dialogueText: '„Wenn ich ihn in ein Heim gebe, breche ich mein Versprechen. Ich fühle mich wie eine Verräterin! Aber wenn ich ihn nach Hause hole und ganz alleine pflegen muss, gehe ich kaputt... Ich schlafe seit Wochen keine Nacht mehr durch. Was ist die richtige Entscheidung?“',
          dilemmaPrompt: 'Wie führst du das Beratungsgespräch nach den Grundsätzen der PEF?',
          options: [
            {
              id: 'opt_ds6_paternalistic',
              model: 'paternalistic',
              modelLabel: '1. Paternalistisches Modell',
              quote: '„Frau Heike, sehen Sie den Tatsachen ins Auge: Sie können das zu Hause niemals leisten. Unterschreiben Sie die Heimanmeldung. Das ist das einzig Vernünftige für alle Beteiligten.“',
              actionText: 'Heike die Entscheidung abnehmen und sie resolut zur Heimanmeldung drängen.',
              immediateReaction: 'Heike fühlt sich als Versagerin abgestempelt. Tief sitzende Schuldgefühle belasten die Beziehung nachhaltig.',
              explanation: 'Paternalistisch: Die Fachkraft entscheidet über den Lebensort und entwertet Heikes Gefühle als irrational.',
              statsImpact: { pefScore: 0, paternalisticScore: 1, informedScore: 0, autonomyScore: -1 },
            },
            {
              id: 'opt_ds6_pef',
              model: 'pef',
              modelLabel: '2. Partizipative Entscheidungsfindung (PEF)',
              quote: '„Frau Heike, Sie sind keine Verräterin – Sie kämpfen seit Monaten heldenhaft. Es gibt nicht nur Schwarz oder Weiß. Wir können ein häusliches Versorgungsnetz mit einem ambulanten Intensivpflegedienst aufbauen, sodass Sie Partnerin bleiben dürfen und die schwere medizinische Pflege in professionellen Händen liegt. Lassen Sie uns gemeinsam mit Stephan die Optionen und Grenzen durchgehen.“',
              actionText: 'Schuldgefühle abbauen, Hybridmodelle (ambulante 1:1-Intensivpflege zu Hause) eröffnen und Stephan partizipativ einbinden.',
              immediateReaction: 'Heike blickt überrascht auf. Ein Hoffnungsschimmer kehrt zurück; sie fühlt sich verstanden und entlastet.',
              explanation: 'PEF: Eröffnung realer Handlungsalternativen jenseits falscher Dichotomien; Schutz der Partnerrolle bei gleichzeitiger Versorgungssicherheit.',
              statsImpact: { pefScore: 1, paternalisticScore: 0, informedScore: 0, autonomyScore: 1 },
            },
            {
              id: 'opt_ds6_informed',
              model: 'informed',
              modelLabel: '3. Informed Decision Making',
              quote: '„Hier ist die Liste mit 14 Heimen und 8 Pflegediensten sowie den monatlichen Zuzahlungstabellen nach SGB XI. Sie müssen das bis Freitag mit der Pflegekasse klären.“',
              actionText: 'Reine Adresslisten und Finanztabellen übergeben und Heike mit der Entscheidung allein lassen.',
              immediateReaction: 'Heike starrt auf die endlose Liste und sinkt verzweifelt in sich zusammen.',
              explanation: 'Informed: Reine Bürokratie ohne Begleitung führt Angehörige in die psychosoziale Dekompensation.',
              statsImpact: { pefScore: 0, paternalisticScore: 0, informedScore: 1, autonomyScore: 0 },
            },
          ],
        },
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Heike, Stephan, Bezugspflegekraft, Sozialdienst, ambulanter Intensivpflegedienst.',
        whatHappened: 'Vorbereitung der Entlassung nach monatelanger Klinik- und Rehapflege. Auseinandersetzung mit Pflegebelastung, Wohnraumanpassung und Lebensqualität.',
        decisionsMade: 'Entscheidung für die Rückkehr in eine barrierefreie Wohnung mit Unterstützung eines spezialisierten ambulanten 24h-Intensivpflegedienstes.',
        ethicalDilemmas: 'Schutz der pflegenden Angehörigen vor Burnout vs. Stephans existentieller Wunsch nach häuslicher Geborgenheit.',
      },
      abedl: {
        10: {
          info: 'Verlust der bisherigen Rollenverteilung als Liebespaar. Heike gerät in die Rolle der Pflegerin/Managerin. Schamgefühle bei Intimpflege durch Angehörige.',
          pesr: 'P: Gefährdung der partnerschaftlichen Intimität und Rollenidentität. E: Schwere Pflegebedürftigkeit und Abhängigkeit. S: Rückzug, emotionale Erschöpfung. R: Tiefe gegenseitige Liebe und gemeinsames Bekenntnis zueinander.',
        },
        11: {
          info: 'Notwendigkeit barrierefreier Wohnraumanpassung (Pflegebett, Deckenlifter, Notstromaggregat für Beatmung/Absaugung).',
          pesr: 'P: Sicherheitsrisiko bei technischer Notfallsituation zu Hause. E: Abhängigkeit von Beatmungsgeräten. S: Angst vor Stromausfall oder Kanülenfehllage. R: Installation professioneller Notfallketten.',
        },
        12: {
          info: 'Soziales Umfeld bricht teilweise weg. Freunde ziehen sich aus Überforderung zurück.',
          pesr: 'P: Soziale Isolation des Paares. E: Barrieren und Berührungsängste des Umfelds. S: Fehlende Besuche. R: Einige treue Freunde aus der Motorsport-Zeit, die Besuche aufrechterhalten.',
        },
      },
      decisionAnalysis: 'PEF ist der Schlüssel für nachhaltige Entlassungen: Nur wenn Angehörige gestärkt und professionell entlastet werden, gelingt Häuslichkeit.',
      passwordHint: 'Für das Finale in DS 7: FINALE-HEIKE-STEPHAN',
    },
    requiredPassword: 'KROHWINKEL-7',
  },

  // ==========================================
  // DS 7: Finale, Evaluation & Transfer
  // ==========================================
  {
    id: 7,
    title: 'DS 7: Finale Synthese, Doku & Transfer in die Praxis',
    subtitle: 'Videosequenz 5 & Original-Dokumentation: Rückblick & Ethik-Zertifikat',
    locationName: 'Das neue Zuhause & Zukunftsraum',
    icon: 'Trophy',
    timeEstimate: '90 Minuten',
    videoUrl: 'https://app.slidepresenter.com/presentations/87e3e111-e072-4b05-a384-5af77b284961?time=0',
    videoTitle: 'Videosequenz 5: Das Finale – Leben mit der Entscheidung',
    videoDuration: 'ca. 12 Min.',
    videoDescription: 'Videosequenz 5 und die bewegende Originaldokumentation über Stephan und Heikes Alltag zu Hause. Reflexion des gesamten Lernwegs.',
    mapCoordinates: { x: 92, y: 30 },
    badgeId: 'badge_grand_master',
    teacherGuide: {
      doppelstunde: 7,
      topic: 'Finale Synthese: Emotionale Aufarbeitung, Transfer in den Pflegealltag und Kompetenzzertifikat',
      duration: '90 Minuten',
      pedagogicalGoals: [
        'Die Lernenden reflektieren ihre eigene emotionale Entwicklung entlang der 7 Doppelstunden.',
        'Sie ziehen ein fundiertes Fazit zur praktischen Umsetzbarkeit von PEF in unterschiedlichen Settings (Klinik, Reha, Langzeitpflege).',
        'Sie formulieren ihr persönliches "Pflegerisches Ethik-Manifest" für die eigene berufliche Identität.',
      ],
      schedule: [
        {
          phase: 'Schritt 1: Das Finale (Video 5 & Doku-Ausschnitt)',
          timeMinutes: 20,
          activity: 'Gemeinsames Sichten von Videosequenz 5 und Ausschnitten der Originaldokumentation (YouTube-Link).',
          socialForm: 'Plenum',
          media: 'SlidePresenter Video 5 & YouTube Doku',
          didacticNotes: 'Raum für emotionale Stille und Betroffenheit lassen.',
        },
        {
          phase: 'Schritt 2: Murmelphase & Gefühlsreflexion',
          timeMinutes: 15,
          activity: 'Paarweiser Austausch: Was hat mich am Fall Stephan & Heike am tiefsten berührt? Wo habe ich meine eigene Haltung verändert?',
          socialForm: 'Partnerarbeit',
          media: 'Reflexionskarten',
          didacticNotes: 'Emotionale Entlastung und Validierung der Lernenden.',
        },
        {
          phase: 'Schritt 3: Synthese & Transfer-Matrix',
          timeMinutes: 25,
          activity: 'Transfer in den Ausbildungsalltag: Wie kann ich morgen auf meiner Station partizipativer handeln?',
          socialForm: 'Gruppenarbeit',
          media: 'Transfer-Board in der App',
          didacticNotes: 'Konkrete Handlungsschritte formulieren (z. B. "Ich frage den Patienten vor jeder Maßnahme nach seinen Wünschen").',
        },
        {
          phase: 'Schritt 4: Abschluss-Zertifikat & Gesamtexport',
          timeMinutes: 20,
          activity: 'Generierung des personalisierten Ausbildungs-Zertifikats und Export des gesamten Portfolios als Word-Dossier.',
          socialForm: 'Einzelarbeit',
          media: 'App Export-Engine',
          didacticNotes: 'Feierlicher Abschluss der Unterrichtsreihe.',
        },
      ],
      blackboardSummary: `DAS VERMÄCHTNIS VON HEIKE & STEPHAN:
1. Partnerschaftliche Entscheidungsfindung ist kein Methoden-Katalog, sondern eine innere Haltung.
2. Auch bei schwerster Kommunikationsbehinderung bleibt der Mensch Träger unantastbarer Würde und individueller Werte.
3. Angehörige sind keine Besucher, sondern elementare Partner im Pflegeprozess.
4. Pflegekräfte sind Anwälte der Autonomie in Momenten existenzieller Verwundbarkeit.`,
      reflectionPrompts: [
        'Was nimmst du aus dieser 7-teiligen Reise für deine eigene Haltung als Pflegefachkraft mit?',
        'Welcher Satz von Heike oder welche Reaktion von Stephan wird dir in Erinnerung bleiben?',
      ],
    },
    sampleSolution: {
      zusatzdoc: {
        who: 'Heike, Stephan, Pflegeteam, Gemeinschaft.',
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
      passwordHint: 'Zertifikat freigeschaltet!',
    },
    requiredPassword: 'FINALE-HEIKE-STEPHAN',
  },
];
