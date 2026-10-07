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
  { id: 1, name: '1. kommunizieren zu können', desc: 'Sprechen, Mimik, Gestik, Hilfsmittel, Verstehen, Orientierung' },
  { id: 2, name: '2. sich bewegen zu können', desc: 'Lageveränderung, Mobilität, Transfer, Lähmungen, Spastik, Tonus' },
  { id: 3, name: '3. vitale Funktionen des Lebens aufrecht erhalten zu können', desc: 'Atmung, Kreislauf, Thermoregulation, Aspiration' },
  { id: 4, name: '4. sich pflegen zu können', desc: 'Körperpflege, Hautzustand, Mundpflege, Haare, Nägel, Intimpflege' },
  { id: 5, name: '5. sich kleiden zu können', desc: 'An- und Auskleiden, Kleidungsauswahl, Hilfsmittelbedarf' },
  { id: 6, name: '6. ausscheiden zu können', desc: 'Kontinenz, Blasen-/Darmmanagement, Inkontinenzhilfen, Obstipation' },
  { id: 7, name: '7. essen und trinken zu können', desc: 'Schluckstörung (Dysphagie), PEG-Sonde, Diät, Flüssigkeitsbedarf' },
  { id: 8, name: '8. ruhen, schlafen und sich entspannen zu können', desc: 'Schlaf-Wach-Rhythmus, Schlafstörungen, Lagerung zur Nacht' },
  { id: 9, name: '9. sich beschäftigen, lernen, sich entwickeln zu können', desc: 'Hobbys, Interessen, Tagesstruktur, kognitive Stimulation, Talker' },
  { id: 10, name: '10. die eigene Sexualität leben zu können', desc: 'Partnerschaft, Intimität, Schamgefühl, Rollenverständnis' },
  { id: 11, name: '11. für eine sichere / fördernde Umgebung sorgen können', desc: 'Sturzrisiko, Notrufsysteme, Orientierungshilfen, Barrierefreiheit' },
  { id: 12, name: '12. soziale Beziehungen sichern und gestalten zu können', desc: 'Angehörige (Heike, Söhne), Freunde, soziale Kontakte, Berufsrolle' },
  { id: 13, name: '13. Mit existentiellen Erfahrungen umgehen und sich entwickeln zu können', desc: 'Krankheitsverarbeitung, Sinnfindung, Ängste, Hoffnung, Ethik' },
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
  const situationNum = Math.max(1, moduleNumber - 2); // DS 3 = Situation 1, DS 4 = Situation 2, etc.

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header / Alexianer Header simulation
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: 'Alexianer',
                bold: true,
                size: 24,
                color: '990000',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: 'ALEXIANER AKADEMIE FÜR PFLEGE',
                size: 14,
                color: '666666',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'CE08 – U2 Partnerschaftliche Entscheidungsfindung\nJ.Rosenow',
                size: 18,
                color: '333333',
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: `Zusammenfassung Situation ${situationNum}`,
                bold: true,
                size: 26,
                color: '264653',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Fall Stefan & Heike • Erstellt von: ${author} am ${currentDate}`,
                italics: true,
                size: 16,
                color: '666666',
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Table 1: Entscheidungsprotokoll / 3. Entscheidungsidentifikation (Layout exactly matching PDF)
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 38, type: WidthType.PERCENTAGE },
                    shading: { fill: 'D1E7DD', type: ShadingType.CLEAR, color: 'auto' }, // Soft green matching PDF
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'Wer war zu sehen/zu hören?\n(Personen/Rolle)',
                            bold: true,
                            size: 20,
                            color: '1B4332',
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 62, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: zusatzdoc.who || '— Keine Angaben eingetragen —', size: 20 })],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 38, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F3D5EB', type: ShadingType.CLEAR, color: 'auto' }, // Soft lilac/pink matching PDF
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'Was ist passiert?\n(Situation)',
                            bold: true,
                            size: 20,
                            color: '5C1D4E',
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 62, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: zusatzdoc.whatHappened || '— Keine Angaben eingetragen —', size: 20 })],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 38, type: WidthType.PERCENTAGE },
                    shading: { fill: 'FDE2D2', type: ShadingType.CLEAR, color: 'auto' }, // Soft orange/peach matching PDF
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'Welche Entscheidungen wurden getroffen?\n(Entscheidungen)',
                            bold: true,
                            size: 20,
                            color: '7A3211',
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 62, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: zusatzdoc.decisionMomentsIdentified || zusatzdoc.decisionsMade || '— Keine Angaben eingetragen —', size: 20 })],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '' }),
          new Paragraph({ text: '' }),

          // SECTION 2: CHECKLISTE PFLEGEANAMNESE
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: 'Checkliste – Pflegeanamnese (13 ABEDL)',
                bold: true,
                size: 24,
                color: '264653',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'ABEDL-einbeziehende Konzepte und Kategorien – Strukturierungsmodell nach Krohwinkel 2013',
                italics: true,
                size: 16,
                color: '555555',
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Table 2: 13 ABEDL Table matching PDF layout
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 35, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E2E8F0', type: ShadingType.CLEAR, color: 'auto' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'ABEDL Kategorie nach Krohwinkel', bold: true, color: '264653' })] })],
                  }),
                  new TableCell({
                    width: { size: 65, type: WidthType.PERCENTAGE },
                    shading: { fill: 'E2E8F0', type: ShadingType.CLEAR, color: 'auto' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Pflegerelevante Informationen, Befunde & Ressourcen', bold: true, color: '264653' })] })],
                  }),
                ],
              }),
              ...ABEDL_DEFINITIONS.map((item) => {
                const entry = abedl[item.id] || { info: '' };

                return new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [new TextRun({ text: item.name, bold: true, size: 18, color: '264653' })],
                        }),
                        new Paragraph({
                          children: [new TextRun({ text: item.desc, italics: true, size: 14, color: '666666' })],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [new TextRun({ text: entry.info || '— Keine Eintragung —', size: 18 })],
                        }),
                      ],
                    }),
                  ],
                });
              }),
            ],
          }),

          new Paragraph({ text: '' }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Alexianer Akademie für Pflege • Fall Stefan & Heike • Partnerschaftliche Entscheidungsfindung',
                italics: true,
                size: 14,
                color: '999999',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Pflegeanamnese_Situation${situationNum}_DS${moduleNumber}.docx`);
}
