import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeadingLevel,
  AlignmentType,
  ShadingType
} from 'docx';
import { saveAs } from 'file-saver';
import { ZusatzdocData } from '../types';

export const ABEDL_DEFINITIONS = [
  { id: 1, name: '1. Kommunizieren', desc: 'Sprechen, Mimik, Gestik, Hilfsmittel, Verstehen, Orientierung' },
  { id: 2, name: '2. Sich bewegen', desc: 'Lageveränderung, Mobilität, Transfer, Lähmungen, Spastik, Tonus' },
  { id: 3, name: '3. Vitale Funktionen des Lebens aufrechterhalten', desc: 'Atmung, Trachealkanüle, Kreislauf, Thermoregulation, Aspiration' },
  { id: 4, name: '4. Sich pflegen', desc: 'Körperpflege, Hautzustand, Mundpflege, Haare, Nägel, Intimpflege' },
  { id: 5, name: '5. Essen und trinken', desc: 'Schluckstörung (Dysphagie), PEG-Sonde, Diät, Flüssigkeitsbedarf' },
  { id: 6, name: '6. Ausscheiden', desc: 'Kontinenz, Blasen-/Darmmanagement, Inkontinenzhilfen, Obstipation' },
  { id: 7, name: '7. Sich kleiden', desc: 'An- und Auskleiden, Kleidungsauswahl, Hilfsmittelbedarf' },
  { id: 8, name: '8. Ruhen und schlafen', desc: 'Schlaf-Wach-Rhythmus, Schlafstörungen, Lagerung zur Nacht' },
  { id: 9, name: '9. Sich beschäftigen', desc: 'Hobbys, Interessen, Tagesstruktur, kognitive Stimulation' },
  { id: 10, name: '10. Die eigene Sexualität leben', desc: 'Partnerschaft, Intimität, Schamgefühl, Rollenverständnis' },
  { id: 11, name: '11. Für eine sichere Umgebung sorgen', desc: 'Sturzrisiko, Notrufsysteme, Orientierungshilfen, Barrierefreiheit' },
  { id: 12, name: '12. Soziale Bereiche des Lebens sichern', desc: 'Angehörige (Heike), Freunde, soziale Kontakte, Berufsrolle' },
  { id: 13, name: '13. Mit existenziellen Erfahrungen des Lebens umgehen', desc: 'Krankheitsverarbeitung, Sinnfindung, Ängste, Hoffnung, Ethik' },
];

export async function exportNursingDossierDocx(
  moduleTitle: string,
  moduleNumber: number,
  zusatzdoc: ZusatzdocData,
  abedl: { [key: number]: { info: string; pesr: { p: string; e: string; s: string; r: string } } },
  studentName?: string
) {
  const author = studentName?.trim() || 'Auszubildende/r Pflegefachkraft';
  const currentDate = new Date().toLocaleDateString('de-DE');

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header / Title block
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.TITLE,
            children: [
              new TextRun({
                text: 'GENERALISTISCHE PFLEGEAUSBILDUNG',
                bold: true,
                size: 28,
                color: '0D5C75',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Pflegedokumentation & Anamnese – Fall Stephan & Heike (DS ${moduleNumber})`,
                bold: true,
                size: 22,
                color: '333333',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Modul: ${moduleTitle} | Erstellt am: ${currentDate} von: ${author}`,
                italics: true,
                size: 18,
                color: '666666',
              }),
            ],
          }),
          new Paragraph({ text: '' }), // spacing

          // SECTION 1: ZUSATZDOC V.2
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '1. Zusatzdoc V.2 – Situationsanalyse & Entscheidungen',
                bold: true,
                size: 24,
                color: '0D5C75',
              }),
            ],
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E6F4F8', type: ShadingType.CLEAR, color: 'auto' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Leitfrage', bold: true, color: '0D5C75' })] })],
                  }),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E6F4F8', type: ShadingType.CLEAR, color: 'auto' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Dokumentierte Beobachtungen & Analyse', bold: true, color: '0D5C75' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Wer war zu sehen / zu hören?', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: zusatzdoc.who || '(Keine Angabe)' })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Was ist passiert?', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: zusatzdoc.whatHappened || '(Keine Angabe)' })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Welche Entscheidungen wurden getroffen?', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: zusatzdoc.decisionsMade || '(Keine Angabe)' })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Ethische Dilemmata / Haltungen', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: zusatzdoc.ethicalDilemmas || '(Keine Angabe)' })],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '' }),
          new Paragraph({ text: '' }),

          // SECTION 2: CHECKLISTE PFLEGEANAMNESE (13 ABEDL NACH KROHWINKEL)
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '2. Checkliste Pflegeanamnese (13 ABEDL nach Krohwinkel)',
                bold: true,
                size: 24,
                color: '0D5C75',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Strukturierte Erfassung der pflegerelevanten Informationen sowie PESR-Pflegediagnosen (Problem, Ätiologie, Symptome, Ressourcen).',
                italics: true,
                size: 18,
                color: '555555',
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: '0D5C75', type: ShadingType.CLEAR, color: 'auto' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'ABEDL Kategorie', bold: true, color: 'FFFFFF' })] })],
                  }),
                  new TableCell({
                    width: { size: 35, type: WidthType.PERCENTAGE },
                    shading: { fill: '0D5C75', type: ShadingType.CLEAR, color: 'auto' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Pflegerelevante Informationen', bold: true, color: 'FFFFFF' })] })],
                  }),
                  new TableCell({
                    width: { size: 40, type: WidthType.PERCENTAGE },
                    shading: { fill: '0D5C75', type: ShadingType.CLEAR, color: 'auto' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'PESR Struktur (P - E - S - R)', bold: true, color: 'FFFFFF' })] })],
                  }),
                ],
              }),
              ...ABEDL_DEFINITIONS.map((item) => {
                const entry = abedl[item.id] || { info: '', pesr: { p: '', e: '', s: '', r: '' } };
                const pesrLines = [
                  entry.pesr?.p ? `P: ${entry.pesr.p}` : '',
                  entry.pesr?.e ? `E: ${entry.pesr.e}` : '',
                  entry.pesr?.s ? `S: ${entry.pesr.s}` : '',
                  entry.pesr?.r ? `R: ${entry.pesr.r}` : '',
                ].filter(Boolean);

                return new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [new TextRun({ text: item.name, bold: true, color: '0D5C75' })],
                        }),
                        new Paragraph({
                          children: [new TextRun({ text: item.desc, italics: true, size: 14, color: '777777' })],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: entry.info || '— Keine Besonderheiten dokumentiert —',
                          children: [new TextRun({ text: entry.info || '— Keine Eintragung —', size: 18 })],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: pesrLines.length > 0
                        ? pesrLines.map((line) => new Paragraph({ children: [new TextRun({ text: line, size: 18 })] }))
                        : [new Paragraph({ children: [new TextRun({ text: '— Keine Pflegediagnose —', italics: true, size: 16, color: '888888' })] })],
                    }),
                  ],
                });
              }),
            ],
          }),

          new Paragraph({ text: '' }),
          new Paragraph({ text: '' }),

          // Footer note
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Lernplattform Partnerschaftliche Entscheidungsfindung in der Pflege • Fall Stephan & Heike',
                italics: true,
                size: 16,
                color: '999999',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Pflegeanamnese_Stephan_Heike_DS${moduleNumber}.docx`);
}
