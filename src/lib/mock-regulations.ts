import { Regulation } from "@/components/RegulationCard";

export const mockRegulations: Regulation[] = [
  {
    id: "1",
    title: "Corporate Sustainability Reporting Directive (CSRD)",
    celexNumber: "32022L2464",
    publicationDate: "2022-12-16",
    summary: "Amends existing reporting requirements under the Non-Financial Reporting Directive (NFRD) and introduces more detailed reporting requirements for a wider scope of companies, including mandatory sustainability reporting standards.",
    highlights: [
      "Extended scope to all large companies and listed SMEs",
      "Mandatory double materiality assessment",
      "Third-party assurance requirement for sustainability reports",
    ],
    category: "Sustainability Reporting",
    tags: ["ESG", "Corporate Governance", "Disclosure", "Audit"],
    documentType: "Directive",
    eurLexUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2464",
  },
  {
    id: "2",
    title: "Corporate Sustainability Due Diligence Directive (CSDDD)",
    celexNumber: "32024L1760",
    publicationDate: "2024-07-05",
    summary: "Establishes a corporate due diligence duty to identify, prevent, mitigate and account for adverse human rights and environmental impacts in companies' operations, subsidiaries and value chains.",
    highlights: [
      "Mandatory human rights and environmental due diligence",
      "Climate transition plans aligned with Paris Agreement",
      "Civil liability for failures in due diligence",
    ],
    category: "Due Diligence",
    tags: ["Human Rights", "Supply Chain", "Climate", "Liability"],
    documentType: "Directive",
    eurLexUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L1760",
  },
  {
    id: "3",
    title: "EU Taxonomy Climate Delegated Act",
    celexNumber: "32021R2139",
    publicationDate: "2021-12-09",
    summary: "Technical screening criteria for determining the conditions under which an economic activity qualifies as contributing substantially to climate change mitigation or adaptation.",
    highlights: [
      "Defines technical criteria for climate-related activities",
      "Do No Significant Harm (DNSH) criteria established",
      "Activity-specific thresholds and metrics",
    ],
    category: "Sustainable Finance",
    tags: ["Taxonomy", "Climate", "Investment", "Green Finance"],
    documentType: "Delegated Regulation",
    eurLexUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2139",
  },
  {
    id: "4",
    title: "Sustainable Finance Disclosure Regulation (SFDR)",
    celexNumber: "32019R2088",
    publicationDate: "2019-12-09",
    summary: "Harmonised rules for financial market participants and financial advisers on transparency regarding the integration of sustainability risks and adverse sustainability impacts.",
    highlights: [
      "Principal Adverse Impact (PAI) statements mandatory for large firms",
      "Article 8 and Article 9 fund classifications",
      "Pre-contractual and periodic disclosure requirements",
    ],
    category: "Sustainable Finance",
    tags: ["ESG", "Disclosure", "Investment", "Financial Services"],
    documentType: "Regulation",
    eurLexUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019R2088",
  },
  {
    id: "5",
    title: "European Green Bond Standard Regulation",
    celexNumber: "32023R2631",
    publicationDate: "2023-11-30",
    summary: "Establishes uniform requirements for issuers of bonds that wish to use the designation 'European green bond' or 'EuGB', linking proceeds to EU Taxonomy-aligned activities.",
    highlights: [
      "Mandatory EU Taxonomy alignment for use of proceeds",
      "External review requirements by registered reviewers",
      "Flexibility pocket of up to 15% for non-taxonomy activities",
    ],
    category: "Sustainable Finance",
    tags: ["Green Bonds", "Taxonomy", "Capital Markets", "Disclosure"],
    documentType: "Regulation",
    eurLexUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R2631",
  },
  {
    id: "6",
    title: "Deforestation Regulation (EUDR)",
    celexNumber: "32023R1115",
    publicationDate: "2023-06-09",
    summary: "Rules to minimize EU-driven global deforestation and forest degradation by setting mandatory due diligence rules for operators who place specific commodities on the EU market.",
    highlights: [
      "Applies to cattle, cocoa, coffee, palm oil, rubber, soya, wood",
      "Geolocation requirements for product traceability",
      "Risk-based country benchmarking system",
    ],
    category: "Environment",
    tags: ["Deforestation", "Supply Chain", "Due Diligence", "Commodities"],
    documentType: "Regulation",
    eurLexUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1115",
  },
];

export const getFilteredRegulations = (
  languages: string[],
  dateFrom?: Date,
  dateTo?: Date
): Regulation[] => {
  // In production, this would call the backend API
  // For now, return mock data with simple filtering
  let filtered = [...mockRegulations];
  
  if (dateFrom) {
    filtered = filtered.filter(
      (r) => new Date(r.publicationDate) >= dateFrom
    );
  }
  
  if (dateTo) {
    filtered = filtered.filter(
      (r) => new Date(r.publicationDate) <= dateTo
    );
  }
  
  return filtered;
};
