export interface EURLexSearchParams {
  keywords: string;
  topics: string[];
  dateFrom: string; // YYYY-MM-DD
  dateTo: string;   // YYYY-MM-DD
  languages: string[];
  documentTypes: ('regulation' | 'directive' | 'decision')[];
  excludeConsolidated: boolean;
  excludeCorrigenda: boolean;
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
