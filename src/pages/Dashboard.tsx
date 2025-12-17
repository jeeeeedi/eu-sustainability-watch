import { useState, useEffect } from "react";
import { Download, RefreshCw, LayoutGrid, List, FileText, Filter } from "lucide-react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import RegulationCard, { Regulation } from "@/components/RegulationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchRegulationsFromN8n } from "@/lib/n8n-api";
import { eurovocThemes, euLanguages } from "@/lib/eurovoc-themes";

const Dashboard = () => {
  const location = useLocation();
  const searchParams = location.state || {};
  
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const searchId: string | undefined = searchParams.searchId;
  const selectedThemes: string[] = searchParams.themes || [];
  const selectedLanguages: string[] = searchParams.languages || ["EN"];
  const keywords: string = searchParams.keywords || "";
  const dateRange = {
    from: searchParams.dateFrom ? new Date(searchParams.dateFrom) : undefined,
    to: searchParams.dateTo ? new Date(searchParams.dateTo) : undefined,
  };

  // Fetch regulations from Supabase (filtered by searchId)
  const fetchRegulations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchRegulationsFromN8n({
        searchId, // Filter by this search session
        themes: selectedThemes,
        languages: selectedLanguages,
        dateFrom: dateRange.from,
        dateTo: dateRange.to,
        keywords,
        recentMinutes: 60, // Fallback if no searchId
        limit: 100,
      });
      setRegulations(data);
    } catch (err) {
      console.error("Failed to fetch regulations:", err);
      setError("Failed to load regulations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount and when search params change
  useEffect(() => {
    fetchRegulations();
  }, []);

  const handleRefresh = async () => {
    await fetchRegulations();
  };

  const getThemeLabels = () => {
    const labels: string[] = [];
    eurovocThemes.forEach((domain) => {
      if (selectedThemes.includes(domain.id)) {
        labels.push(domain.label);
      }
      domain.subdomains.forEach((sub) => {
        if (selectedThemes.includes(sub.id)) {
          labels.push(sub.label);
        }
      });
    });
    return labels;
  };

  const getLanguageLabels = () => {
    return euLanguages
      .filter((lang) => selectedLanguages.includes(lang.code))
      .map((lang) => lang.label.split(" ")[0]);
  };

  const stats = [
    { label: "Total Regulations", value: regulations.length, icon: FileText },
    { label: "Themes Tracked", value: selectedThemes.length || "All", icon: Filter },
    { label: "Languages", value: selectedLanguages.length, icon: LayoutGrid },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="container py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Regulations Found</h1>
              <p className="text-muted-foreground mt-1">
                {isLoading
                  ? "Loading results..."
                  : `Found ${regulations.length} regulations matching your criteria`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedThemes.length > 0 || selectedLanguages.length > 0 || keywords) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {keywords && (
                <Badge variant="default" className="bg-primary/10 text-primary">
                  "{keywords}"
                </Badge>
              )}
              {getThemeLabels().map((label) => (
                <Badge key={label} variant="secondary" className="tag-theme">
                  {label}
                </Badge>
              ))}
              {getLanguageLabels().map((label) => (
                <Badge key={label} variant="outline">
                  {label}
                </Badge>
              ))}
              {dateRange.from && dateRange.to && (
                <Badge variant="outline">
                  {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                </Badge>
              )}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="card-elevated">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="card-elevated">
                    <CardHeader>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-full mt-2" />
                      <Skeleton className="h-4 w-48 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-20 w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-14" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : regulations.length > 0 ? (
                <div className={viewMode === "grid" ? "space-y-4" : "space-y-2"}>
                  {regulations.map((regulation, index) => (
                    <RegulationCard key={regulation.id} regulation={regulation} index={index} />
                  ))}
                </div>
              ) : (
                <Card className="card-elevated">
                  <CardContent className="p-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">No regulations found</h3>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search criteria or expanding the date range.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-base">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Categories Found
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {[...new Set(regulations.map((r) => r.category))].map((cat) => (
                        <Badge key={cat} variant="secondary" className="tag-category">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Document Types
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {[...new Set(regulations.map((r) => r.documentType))].map((type) => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-subtle">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Data sourced from{" "}
              <a
                href="https://eur-lex.europa.eu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                EUR-Lex
              </a>
              {" "}• Official EU law database
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} EU Sustainability Tracker
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
