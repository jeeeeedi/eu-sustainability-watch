export interface EURLexSearchParams {
  searchId: string; // Unique ID to track this search session
  keywords: string;
  dateFrom: string; // YYYY-MM-DD
  dateTo: string;   // YYYY-MM-DD
  languages: string[];
  documentTypes: ('regulation' | 'directive' | 'decision')[];
  excludeConsolidated: boolean;
  excludeCorrigenda: boolean;
}

// Generate a unique search ID (short format to match n8n workflow)
export function generateSearchId(): string {
  // return Math.random().toString(36).substring(2, 10);
  return 'qkn6epbk'; // TODO: Hardcoded for testing, uncomment above for prod
}

export async function triggerEURLexSearch(params: EURLexSearchParams) {
  const response = await fetch('https://jeeeeedi.app.n8n.cloud/webhook-test/eurlex-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  
  if (!response.ok) {
    throw new Error(`EUR-Lex search failed: ${response.statusText}`);
  }
  
  return response.json();
}
