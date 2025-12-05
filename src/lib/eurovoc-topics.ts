// Eurovoc descriptors related to sustainability and corporate compliance
// Source: https://eur-lex.europa.eu/browse/eurovoc.html

export const eurovocTopics = [
  {
    id: "sustainable-development",
    label: "Sustainable Development",
    descriptor: "sustainable development",
    children: [
      { id: "green-deal", label: "European Green Deal", descriptor: "European Green Deal" },
      { id: "climate-neutrality", label: "Climate Neutrality", descriptor: "climate neutrality" },
      { id: "circular-economy", label: "Circular Economy", descriptor: "circular economy" },
    ]
  },
  {
    id: "environment",
    label: "Environment",
    descriptor: "environment",
    children: [
      { id: "climate-change", label: "Climate Change", descriptor: "climate change" },
      { id: "pollution", label: "Pollution Control", descriptor: "pollution control" },
      { id: "biodiversity", label: "Biodiversity", descriptor: "biodiversity" },
      { id: "waste-management", label: "Waste Management", descriptor: "waste management" },
      { id: "water-management", label: "Water Management", descriptor: "water management" },
    ]
  },
  {
    id: "energy",
    label: "Energy",
    descriptor: "energy",
    children: [
      { id: "renewable-energy", label: "Renewable Energy", descriptor: "renewable energy" },
      { id: "energy-efficiency", label: "Energy Efficiency", descriptor: "energy efficiency" },
      { id: "energy-policy", label: "Energy Policy", descriptor: "energy policy" },
    ]
  },
  {
    id: "corporate-governance",
    label: "Corporate Governance",
    descriptor: "corporate governance",
    children: [
      { id: "corporate-social-responsibility", label: "Corporate Social Responsibility (CSR)", descriptor: "corporate social responsibility" },
      { id: "sustainability-reporting", label: "Sustainability Reporting", descriptor: "sustainability reporting" },
      { id: "due-diligence", label: "Due Diligence", descriptor: "due diligence" },
    ]
  },
  {
    id: "financial-services",
    label: "Financial Services & ESG",
    descriptor: "financial services",
    children: [
      { id: "sustainable-finance", label: "Sustainable Finance", descriptor: "sustainable finance" },
      { id: "eu-taxonomy", label: "EU Taxonomy", descriptor: "taxonomy" },
      { id: "green-bonds", label: "Green Bonds", descriptor: "green bond" },
    ]
  },
  {
    id: "transport",
    label: "Transport",
    descriptor: "transport",
    children: [
      { id: "sustainable-transport", label: "Sustainable Transport", descriptor: "sustainable transport" },
      { id: "electric-vehicles", label: "Electric Vehicles", descriptor: "electric vehicle" },
      { id: "emissions-standards", label: "Emissions Standards", descriptor: "emission standard" },
    ]
  },
  {
    id: "industry",
    label: "Industry",
    descriptor: "industry",
    children: [
      { id: "industrial-emissions", label: "Industrial Emissions", descriptor: "industrial emission" },
      { id: "ecodesign", label: "Ecodesign", descriptor: "ecodesign" },
      { id: "green-manufacturing", label: "Green Manufacturing", descriptor: "sustainable production" },
    ]
  },
  {
    id: "agriculture",
    label: "Agriculture & Food",
    descriptor: "agriculture",
    children: [
      { id: "sustainable-agriculture", label: "Sustainable Agriculture", descriptor: "sustainable agriculture" },
      { id: "organic-farming", label: "Organic Farming", descriptor: "organic farming" },
      { id: "food-waste", label: "Food Waste", descriptor: "food waste" },
    ]
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
