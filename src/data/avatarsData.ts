export interface CharacterAvatar {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio?: string;
}

export const CHARACTER_AVATARS: { [key: string]: CharacterAvatar } = {
  heike: {
    id: 'heike',
    name: 'Heike',
    role: 'Lebenspartnerin & pflegende Angehörige',
    imageUrl: '/images/Heike%20Avatar.jpg',
    bio: 'Kämpft mit unendlicher Liebe und Loyalität um Stefans Lebensqualität und Würde, steht jedoch vor immensen existenziellen Entscheidungen.',
  },
  stephan: {
    id: 'stephan',
    name: 'Stefan',
    role: 'Patient / Lebenspartner',
    imageUrl: '/images/Stephan%20Rollstuhl%20Avatar.jpg',
    bio: 'Vor dem Unfall passionierter Motorsportler; nach schwerem Schädel-Hirn-Trauma nonverbal, jedoch mit intaktem Verstand, Wahrnehmung und Lebenswillen.',
  },
  sohn1: {
    id: 'sohn1',
    name: 'Philipp',
    role: 'Sohn (jüngster)',
    imageUrl: '/images/Sohn%201%20Avatar.jpg',
    bio: 'Erlebt die veränderte Familiensituation und unterstützt Heike bei den alltäglichen Herausforderungen.',
  },
  sohn2_leon: {
    id: 'sohn2_leon',
    name: 'Leon',
    role: 'Sohn',
    imageUrl: '/images/Sohn%202%20Leon%20Avatar.jpg',
    bio: 'Sucht trotz der Schwere der Erkrankung den familiären Rückhalt und hilft bei der täglichen Pflege.',
  },
  sohn3_lukas: {
    id: 'sohn3_lukas',
    name: 'Lukas',
    role: 'Sohn (ältester)',
    imageUrl: '/images/Sohn%203%20Lukas%20Avatar.jpg',
    bio: 'Ältester Sohn von Heike, packt im Haushalt mit an und steht der Familie zur Seite.',
  },
  paar: {
    id: 'paar',
    name: 'Heike & Stefan',
    role: 'Lebenspartnerschaft vor & nach dem Schicksalsschlag',
    imageUrl: '/images/Heike%20Stephan%20Paar.jpg',
    bio: 'Das Paar vor und nach dem schweren Umbruch – Symbol für Liebe, Resilienz und partnerschaftliche Entscheidungsfindung auf Augenhöhe.',
  },
};
