// Official EuroVoc domains - the EU's multilingual thesaurus
// Source: https://eur-lex.europa.eu/browse/eurovoc.html

export const eurovocTopics = [
  {
    id: "04",
    label: "Politics",
    descriptor: "POLITICS",
  },
  {
    id: "08",
    label: "International Relations",
    descriptor: "INTERNATIONAL RELATIONS",
  },
  {
    id: "10",
    label: "European Union",
    descriptor: "EUROPEAN UNION",
  },
  {
    id: "12",
    label: "Law",
    descriptor: "LAW",
  },
  {
    id: "16",
    label: "Economics",
    descriptor: "ECONOMICS",
  },
  {
    id: "20",
    label: "Trade",
    descriptor: "TRADE",
  },
  {
    id: "24",
    label: "Finance",
    descriptor: "FINANCE",
  },
  {
    id: "28",
    label: "Social Questions",
    descriptor: "SOCIAL QUESTIONS",
  },
  {
    id: "32",
    label: "Education and Communications",
    descriptor: "EDUCATION AND COMMUNICATIONS",
  },
  {
    id: "36",
    label: "Science",
    descriptor: "SCIENCE",
  },
  {
    id: "40",
    label: "Business and Competition",
    descriptor: "BUSINESS AND COMPETITION",
  },
  {
    id: "44",
    label: "Employment and Working Conditions",
    descriptor: "EMPLOYMENT AND WORKING CONDITIONS",
  },
  {
    id: "48",
    label: "Transport",
    descriptor: "TRANSPORT",
  },
  {
    id: "52",
    label: "Environment",
    descriptor: "ENVIRONMENT",
  },
  {
    id: "56",
    label: "Agriculture, Forestry and Fisheries",
    descriptor: "AGRICULTURE, FORESTRY AND FISHERIES",
  },
  {
    id: "60",
    label: "Agri-Foodstuffs",
    descriptor: "AGRI-FOODSTUFFS",
  },
  {
    id: "64",
    label: "Production, Technology and Research",
    descriptor: "PRODUCTION, TECHNOLOGY AND RESEARCH",
  },
  {
    id: "66",
    label: "Energy",
    descriptor: "ENERGY",
  },
  {
    id: "68",
    label: "Industry",
    descriptor: "INDUSTRY",
  },
  {
    id: "72",
    label: "Geography",
    descriptor: "GEOGRAPHY",
  },
  {
    id: "76",
    label: "International Organisations",
    descriptor: "INTERNATIONAL ORGANISATIONS",
  },
];

export const euLanguages = [
  { code: "EN", label: "English" },
  { code: "DE", label: "German (Deutsch)" },
  { code: "FR", label: "French (Français)" },
  { code: "ES", label: "Spanish (Español)" },
  { code: "IT", label: "Italian (Italiano)" },
  { code: "NL", label: "Dutch (Nederlands)" },
  { code: "PL", label: "Polish (Polski)" },
  { code: "PT", label: "Portuguese (Português)" },
  { code: "SV", label: "Swedish (Svenska)" },
  { code: "DA", label: "Danish (Dansk)" },
  { code: "FI", label: "Finnish (Suomi)" },
  { code: "EL", label: "Greek (Ελληνικά)" },
  { code: "CS", label: "Czech (Čeština)" },
  { code: "HU", label: "Hungarian (Magyar)" },
  { code: "RO", label: "Romanian (Română)" },
  { code: "BG", label: "Bulgarian (Български)" },
  { code: "SK", label: "Slovak (Slovenčina)" },
  { code: "SL", label: "Slovenian (Slovenščina)" },
  { code: "HR", label: "Croatian (Hrvatski)" },
  { code: "LT", label: "Lithuanian (Lietuvių)" },
  { code: "LV", label: "Latvian (Latviešu)" },
  { code: "ET", label: "Estonian (Eesti)" },
  { code: "MT", label: "Maltese (Malti)" },
  { code: "GA", label: "Irish (Gaeilge)" },
];

export type EurovocTopic = typeof eurovocTopics[number];
export type EuLanguage = typeof euLanguages[number];
