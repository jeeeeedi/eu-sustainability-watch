// Official EuroVoc domains and subdomains - the EU's multilingual thesaurus
// Source: https://eur-lex.europa.eu/browse/eurovoc.html

export interface EurovocSubdomain {
  id: string;
  label: string;
}

export interface EurovocTopic {
  id: string;
  label: string;
  descriptor: string;
  subdomains: EurovocSubdomain[];
}

export const eurovocTopics: EurovocTopic[] = [
  {
    id: "04",
    label: "Politics",
    descriptor: "POLITICS",
    subdomains: [
      { id: "0406", label: "Political framework" },
      { id: "0411", label: "Political party" },
      { id: "0416", label: "Electoral procedure and voting" },
      { id: "0421", label: "Parliament" },
      { id: "0426", label: "Parliamentary proceedings" },
      { id: "0431", label: "Politics and public safety" },
    ],
  },
  {
    id: "08",
    label: "International Relations",
    descriptor: "INTERNATIONAL RELATIONS",
    subdomains: [
      { id: "0806", label: "International affairs" },
      { id: "0811", label: "Cooperation policy" },
      { id: "0816", label: "International balance" },
      { id: "0821", label: "Defence" },
    ],
  },
  {
    id: "10",
    label: "European Union",
    descriptor: "EUROPEAN UNION",
    subdomains: [
      { id: "1006", label: "EU institutions and European civil service" },
      { id: "1011", label: "European Union law" },
      { id: "1016", label: "European construction" },
      { id: "1021", label: "EU finance" },
    ],
  },
  {
    id: "12",
    label: "Law",
    descriptor: "LAW",
    subdomains: [
      { id: "1206", label: "Sources and branches of the law" },
      { id: "1211", label: "Civil law" },
      { id: "1216", label: "Criminal law" },
      { id: "1221", label: "Justice" },
      { id: "1226", label: "Organisation of the legal system" },
      { id: "1231", label: "International law" },
      { id: "1236", label: "Rights and freedoms" },
    ],
  },
  {
    id: "16",
    label: "Economics",
    descriptor: "ECONOMICS",
    subdomains: [
      { id: "1606", label: "Economic policy" },
      { id: "1611", label: "Economic growth" },
      { id: "1616", label: "Regions and regional policy" },
      { id: "1621", label: "Economic structure" },
      { id: "1626", label: "National accounts" },
      { id: "1631", label: "Economic analysis" },
    ],
  },
  {
    id: "20",
    label: "Trade",
    descriptor: "TRADE",
    subdomains: [
      { id: "2006", label: "Trade policy" },
      { id: "2011", label: "Tariff policy" },
      { id: "2016", label: "Trade" },
      { id: "2021", label: "International trade" },
      { id: "2026", label: "Consumption" },
      { id: "2031", label: "Marketing" },
      { id: "2036", label: "Distribution" },
    ],
  },
  {
    id: "24",
    label: "Finance",
    descriptor: "FINANCE",
    subdomains: [
      { id: "2406", label: "Monetary relations" },
      { id: "2411", label: "Monetary economics" },
      { id: "2416", label: "Financial institutions and credit" },
      { id: "2421", label: "Free movement of capital" },
      { id: "2426", label: "Financing and investment" },
      { id: "2431", label: "Insurance" },
      { id: "2436", label: "Public finance and budget policy" },
      { id: "2441", label: "Budget" },
      { id: "2446", label: "Taxation" },
      { id: "2451", label: "Prices" },
    ],
  },
  {
    id: "28",
    label: "Social Questions",
    descriptor: "SOCIAL QUESTIONS",
    subdomains: [
      { id: "2806", label: "Family" },
      { id: "2811", label: "Migration" },
      { id: "2816", label: "Demography and population" },
      { id: "2821", label: "Social framework" },
      { id: "2826", label: "Social affairs" },
      { id: "2831", label: "Culture and religion" },
      { id: "2836", label: "Social protection" },
      { id: "2841", label: "Health" },
      { id: "2846", label: "Construction and town planning" },
    ],
  },
  {
    id: "32",
    label: "Education and Communications",
    descriptor: "EDUCATION AND COMMUNICATIONS",
    subdomains: [
      { id: "3206", label: "Education" },
      { id: "3211", label: "Teaching" },
      { id: "3216", label: "Organisation of teaching" },
      { id: "3221", label: "Documentation" },
      { id: "3226", label: "Communications" },
      { id: "3231", label: "Information and information processing" },
      { id: "3236", label: "Information technology and data processing" },
    ],
  },
  {
    id: "36",
    label: "Science",
    descriptor: "SCIENCE",
    subdomains: [
      { id: "3606", label: "Natural and applied sciences" },
      { id: "3611", label: "Humanities" },
    ],
  },
  {
    id: "40",
    label: "Business and Competition",
    descriptor: "BUSINESS AND COMPETITION",
    subdomains: [
      { id: "4006", label: "Business organisation" },
      { id: "4011", label: "Business classification" },
      { id: "4016", label: "Legal form of organisations" },
      { id: "4021", label: "Management" },
      { id: "4026", label: "Accounting" },
      { id: "4031", label: "Competition" },
    ],
  },
  {
    id: "44",
    label: "Employment and Working Conditions",
    descriptor: "EMPLOYMENT AND WORKING CONDITIONS",
    subdomains: [
      { id: "4406", label: "Employment" },
      { id: "4411", label: "Labour market" },
      { id: "4416", label: "Organisation of work and working conditions" },
      { id: "4421", label: "Personnel management and staff remuneration" },
      { id: "4426", label: "Labour law and labour relations" },
    ],
  },
  {
    id: "48",
    label: "Transport",
    descriptor: "TRANSPORT",
    subdomains: [
      { id: "4806", label: "Transport policy" },
      { id: "4811", label: "Organisation of transport" },
      { id: "4816", label: "Land transport" },
      { id: "4821", label: "Maritime and inland waterway transport" },
      { id: "4826", label: "Air and space transport" },
    ],
  },
  {
    id: "52",
    label: "Environment",
    descriptor: "ENVIRONMENT",
    subdomains: [
      { id: "5206", label: "Environmental policy" },
      { id: "5211", label: "Natural environment" },
      { id: "5216", label: "Deterioration of the environment" },
    ],
  },
  {
    id: "56",
    label: "Agriculture, Forestry and Fisheries",
    descriptor: "AGRICULTURE, FORESTRY AND FISHERIES",
    subdomains: [
      { id: "5606", label: "Agricultural policy" },
      { id: "5611", label: "Agricultural structures and production" },
      { id: "5616", label: "Farming systems" },
      { id: "5621", label: "Cultivation of agricultural land" },
      { id: "5626", label: "Means of agricultural production" },
      { id: "5631", label: "Agricultural activity" },
      { id: "5636", label: "Forestry" },
      { id: "5641", label: "Fisheries" },
    ],
  },
  {
    id: "60",
    label: "Agri-Foodstuffs",
    descriptor: "AGRI-FOODSTUFFS",
    subdomains: [
      { id: "6006", label: "Plant product" },
      { id: "6011", label: "Animal product" },
      { id: "6016", label: "Processed agricultural produce" },
      { id: "6021", label: "Beverages and sugar" },
      { id: "6026", label: "Foodstuff" },
      { id: "6031", label: "Food technology" },
    ],
  },
  {
    id: "64",
    label: "Production, Technology and Research",
    descriptor: "PRODUCTION, TECHNOLOGY AND RESEARCH",
    subdomains: [
      { id: "6406", label: "Production" },
      { id: "6411", label: "Technology and technical regulations" },
      { id: "6416", label: "Research and intellectual property" },
    ],
  },
  {
    id: "66",
    label: "Energy",
    descriptor: "ENERGY",
    subdomains: [
      { id: "6606", label: "Energy policy" },
      { id: "6611", label: "Coal and mining industries" },
      { id: "6616", label: "Oil industry" },
      { id: "6621", label: "Electrical and nuclear industries" },
      { id: "6626", label: "Soft energy" },
    ],
  },
  {
    id: "68",
    label: "Industry",
    descriptor: "INDUSTRY",
    subdomains: [
      { id: "6806", label: "Industrial structures and policy" },
      { id: "6811", label: "Chemistry" },
      { id: "6816", label: "Iron, steel and other metal industries" },
      { id: "6821", label: "Mechanical engineering" },
      { id: "6826", label: "Electronics and electrical engineering" },
      { id: "6831", label: "Building and public works" },
      { id: "6836", label: "Wood industry" },
      { id: "6841", label: "Leather and textile industries" },
      { id: "6846", label: "Miscellaneous industries" },
    ],
  },
  {
    id: "72",
    label: "Geography",
    descriptor: "GEOGRAPHY",
    subdomains: [
      { id: "7206", label: "Europe" },
      { id: "7211", label: "Regions of EU Member States" },
      { id: "7216", label: "America" },
      { id: "7221", label: "Africa" },
      { id: "7226", label: "Asia and Oceania" },
      { id: "7231", label: "Economic geography" },
      { id: "7236", label: "Political geography" },
    ],
  },
  {
    id: "76",
    label: "International Organisations",
    descriptor: "INTERNATIONAL ORGANISATIONS",
    subdomains: [
      { id: "7606", label: "United Nations" },
      { id: "7611", label: "European organisations" },
      { id: "7616", label: "Extra-European organisations" },
      { id: "7621", label: "Intergovernmental organisations" },
      { id: "7626", label: "Non-governmental organisations" },
    ],
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

export type EuLanguage = (typeof euLanguages)[number];

// Helper to get all topic IDs (domains + subdomains) for flat selection
export const getAllTopicOptions = () => {
  const options: { id: string; label: string; parentId?: string; parentLabel?: string }[] = [];
  
  eurovocTopics.forEach((domain) => {
    options.push({ id: domain.id, label: domain.label });
    domain.subdomains.forEach((sub) => {
      options.push({ 
        id: sub.id, 
        label: sub.label, 
        parentId: domain.id, 
        parentLabel: domain.label 
      });
    });
  });
  
  return options;
};
