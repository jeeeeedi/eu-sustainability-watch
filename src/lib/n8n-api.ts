import { Regulation } from "@/components/RegulationCard";
import { getFilteredRegulations } from "@/lib/mock-regulations";

// n8n webhook response type (matches Supabase documents table)
interface N8nRegulation {
  title: string;
  celex_number: string;
  document_type: string;
  publication_date: string;
  eurovoc_descriptors: string[];
  summary: string;
  official_url: string;
  languages: string[];
  urgency: string | null;
  compliance_requirements: string[];
  affected_sectors: string[];
  implementation_timeline: string | null;
  executive_summary: string | null;
  created_at: string;
}

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// n8n webhook for triggering new searches
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || "";

// n8n webhook for fetching live results
const N8N_LIVE_RESULTS_URL = import.meta.env.VITE_N8N_LIVE_RESULTS_URL || "https://jeeeeedi.app.n8n.cloud/webhook-test/507f7862-1341-4dcd-9839-b698a4e72af2";

// Map n8n response to our Regulation interface
function mapN8nToRegulation(item: N8nRegulation, index: number): Regulation {
  // Derive category from document type or title
  const category = deriveCategory(item.title, item.document_type);
  
  // Extract tags from eurovoc descriptors and affected sectors
  const tags = [
    ...(item.eurovoc_descriptors || []),
    ...(item.affected_sectors || []),
  ].filter(Boolean);

  // Generate highlights from summary (first few sentences)
  const highlights = extractHighlights(item.summary);

  return {
    id: item.celex_number || `reg-${index}`,
    title: item.title || "Untitled Document",
    celexNumber: item.celex_number || "",
    publicationDate: item.publication_date || "",
    summary: item.summary || "No summary available.",
    highlights,
    category,
    tags: tags.length > 0 ? tags : [item.document_type || "General"],
    documentType: item.document_type || "Document",
    eurLexUrl: item.official_url || "",
  };
}

function deriveCategory(title: string | null, documentType: string | null): string {
  const lowerTitle = (title || "").toLowerCase();
  
  if (lowerTitle.includes("environment") || lowerTitle.includes("sustainability") || lowerTitle.includes("climate")) {
    return "Environment";
  }
  if (lowerTitle.includes("trade") || lowerTitle.includes("import") || lowerTitle.includes("export") || lowerTitle.includes("duty") || lowerTitle.includes("dumping")) {
    return "Trade";
  }
  if (lowerTitle.includes("transport") || lowerTitle.includes("aviation") || lowerTitle.includes("air")) {
    return "Transport";
  }
  if (lowerTitle.includes("fisheries") || lowerTitle.includes("fishing")) {
    return "Fisheries";
  }
  if (lowerTitle.includes("safety") || lowerTitle.includes("toy")) {
    return "Consumer Safety";
  }
  if (lowerTitle.includes("due diligence") || lowerTitle.includes("corporate")) {
    return "Corporate Governance";
  }
  if (lowerTitle.includes("dual-use")) {
    return "Security";
  }
  
  return documentType || "General";
}

function extractHighlights(summary: string): string[] {
  if (!summary) return [];
  
  // Split by common delimiters and take first 3 meaningful items
  const sentences = summary
    .split(/[.•\n]/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 200);
  
  return sentences.slice(0, 3);
}

export interface FetchRegulationsParams {
  themes?: string[];
  languages?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  keywords?: string;
}

export async function fetchRegulationsFromN8n(
  params?: FetchRegulationsParams
): Promise<Regulation[]> {
  // Check if Supabase is configured
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.log("Supabase not configured, using mock data");
    return getFilteredRegulations(
      params?.themes || [],
      params?.languages || ["EN"],
      params?.dateFrom,
      params?.dateTo
    );
  }

  try {
    // Build Supabase query URL
    let url = `${SUPABASE_URL}/rest/v1/documents?select=*&order=publication_date.desc`;
    
    // Add date filters if provided
    if (params?.dateFrom) {
      url += `&publication_date=gte.${params.dateFrom.toISOString().split("T")[0]}`;
    }
    if (params?.dateTo) {
      url += `&publication_date=lte.${params.dateTo.toISOString().split("T")[0]}`;
    }

    console.log("Fetching from Supabase:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: N8nRegulation[] = await response.json();
    console.log("Received data from Supabase:", data.length, "regulations");
    
    // Map Supabase response to our Regulation interface
    return data.map((item, index) => mapN8nToRegulation(item, index));
  } catch (error) {
    console.error("Failed to fetch regulations from Supabase:", error);
    console.log("Falling back to mock data");
    return getFilteredRegulations(
      params?.themes || [],
      params?.languages || ["EN"],
      params?.dateFrom,
      params?.dateTo
    );
  }
}

// Trigger a new search via n8n and get results
// This calls the eurlex-search webhook which triggers Skyvern
// For live results, we need to wait and poll, or use a different endpoint
export async function triggerN8nSearch(params: FetchRegulationsParams): Promise<{ 
  status: string; 
  message: string;
  regulations?: Regulation[];
}> {
  if (!N8N_WEBHOOK_URL) {
    throw new Error("N8N webhook URL not configured");
  }

  console.log("Triggering n8n search:", N8N_WEBHOOK_URL);

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      themes: params.themes || [],
      languages: params.languages || ["EN"],
      dateFrom: params.dateFrom?.toISOString().split("T")[0],
      dateTo: params.dateTo?.toISOString().split("T")[0],
      keywords: params.keywords || "",
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  // Check if response contains regulations array (live results from skyvern-results webhook)
  if (Array.isArray(data)) {
    return {
      status: "success",
      message: `Found ${data.length} regulations`,
      regulations: data.map((item: N8nRegulation, index: number) => mapN8nToRegulation(item, index)),
    };
  }
  
  // Otherwise it's a status message (from eurlex-search webhook)
  return data;
}

// Fetch live results directly from n8n webhook
export async function fetchFromN8nWebhook(
  params?: FetchRegulationsParams
): Promise<Regulation[]> {
  try {
    console.log("Fetching live results from n8n webhook:", N8N_LIVE_RESULTS_URL);

    const response = await fetch(N8N_LIVE_RESULTS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received data from n8n:", data.length, "regulations");

    // Handle both array response and object with data property
    const regulations: N8nRegulation[] = Array.isArray(data) ? data : data.data || [];
    
    // Map to our Regulation interface
    let mapped = regulations.map((item, index) => mapN8nToRegulation(item, index));

    // Apply client-side filtering if params provided
    if (params?.dateFrom) {
      mapped = mapped.filter(r => new Date(r.publicationDate) >= params.dateFrom!);
    }
    if (params?.dateTo) {
      mapped = mapped.filter(r => new Date(r.publicationDate) <= params.dateTo!);
    }

    return mapped;
  } catch (error) {
    console.error("Failed to fetch from n8n webhook:", error);
    console.log("Falling back to mock data");
    return getFilteredRegulations(
      params?.themes || [],
      params?.languages || ["EN"],
      params?.dateFrom,
      params?.dateTo
    );
  }
}
