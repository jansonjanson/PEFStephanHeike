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
    imageUrl: 'https://github.com/jansonjanson/PEFStephanHeike/blob/main/Heike%20Avatar.jpg?raw=true',
    bio: 'Kämpft mit unendlicher Liebe und Loyalität um Stephans Lebensqualität und Würde, steht jedoch vor immensen existenziellen Entscheidungen.',
  },
  stephan: {
    id: 'stephan',
    name: 'Stephan',
    role: 'Patient / Lebenspartner',
    imageUrl: 'https://github.com/jansonjanson/PEFStephanHeike/blob/main/Stephan%20Rollstuhl%20Avatar.jpg?raw=true',
    bio: 'Vor dem Unfall passionierter Motorsportler; nach schwerem Schädel-Hirn-Trauma nonverbal, jedoch mit intaktem Verstand, Wahrnehmung und Lebenswillen.',
  },
  sohn1: {
    id: 'sohn1',
    name: 'Pascal',
    role: 'Sohn (jüngster)',
    imageUrl: 'https://github.com/jansonjanson/PEFStephanHeike/blob/main/Sohn%201%20Avatar.jpg?raw=true',
    bio: 'Erlebt die veränderte Familiensituation und unterstützt Heike bei den alltäglichen Herausforderungen.',
  },
  sohn2_leon: {
    id: 'sohn2_leon',
    name: 'Leon',
    role: 'Sohn',
    imageUrl: 'https://github.com/jansonjanson/PEFStephanHeike/blob/main/Sohn%202%20Leon%20Avatar.jpg?raw=true',
    bio: 'Sucht trotz der Schwere der Erkrankung den familiären Rückhalt und hilft bei der täglichen Pflege.',
  },
  sohn3_lukas: {
    id: 'sohn3_lukas',
    name: 'Lukas',
    role: 'Sohn (ältester)',
    imageUrl: 'https://github.com/jansonjanson/PEFStephanHeike/blob/main/Sohn%203%20Lukas%20Avatar.jpg?raw=true',
    bio: 'Ältester Sohn von Heike, packt im Haushalt mit an und steht der Familie zur Seite.',
  },
  paar: {
    id: 'paar',
    name: 'Heike & Stephan',
    role: 'Lebenspartnerschaft vor & nach dem Schicksalsschlag',
    imageUrl: 'https://github.com/jansonjanson/PEFStephanHeike/blob/main/Heike%20Stephan%20Paar.jpg?raw=true',
    bio: 'Das Paar vor und nach dem schweren Umbruch – Symbol für Liebe, Resilienz und partnerschaftliche Entscheidungsfindung auf Augenhöhe.',
  },
};
