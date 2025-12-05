import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Download, RefreshCw, LayoutGrid, List, FileText } from "lucide-react";
import Header from "@/components/Header";
import RegulationCard, { Regulation } from "@/components/RegulationCard";
import RssLinkGenerator from "@/components/RssLinkGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { mockRegulations, getFilteredRegulations } from "@/lib/mock-regulations";
import { eurovocTopics, euLanguages } from "@/lib/eurovoc-topics";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const topics = searchParams.get("topics")?.split(",").filter(Boolean) || [];
  const languages = searchParams.get("languages")?.split(",").filter(Boolean) || ["EN"];
  const dateFrom = searchParams.get("from") ? new Date(searchParams.get("from")!) : undefined;
  const dateTo = searchParams.get("to") ? new Date(searchParams.get("to")!) : undefined;

  useEffect(() => {
    const loadRegulations = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const filtered = getFilteredRegulations(topics, languages, dateFrom, dateTo);
      setRegulations(filtered);
      setIsLoading(false);
    };

    loadRegulations();
  }, [searchParams]);

  const getTopicLabels = () => {
    return eurovocTopics
      .filter((topic) => topics.includes(topic.id))
      .map((topic) => topic.label);
  };

  const getLanguageLabels = () => {
    return euLanguages
      .filter((lang) => languages.includes(lang.code))
      .map((lang) => lang.label.split(" ")[0]);
  };

  const stats = [
    {
      label: "Total Regulations",
      value: regulations.length,
      icon: FileText,
    },
    {
      label: "Topics Tracked",
      value: topics.length || "All",
      icon: Filter,
    },
    {
      label: "Languages",
      value: languages.length,
      icon: LayoutGrid,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Regulations Dashboard
            </h1>
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
            <Button variant="outline" size="sm">
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
        {(topics.length > 0 || languages.length > 0) && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {getTopicLabels().map((label) => (
              <Badge key={label} variant="secondary" className="tag-topic">
                {label}
              </Badge>
            ))}
            {getLanguageLabels().map((label) => (
              <Badge key={label} variant="outline">
                {label}
              </Badge>
            ))}
            {dateFrom && dateTo && (
              <Badge variant="outline">
                {dateFrom.toLocaleDateString()} - {dateTo.toLocaleDateString()}
              </Badge>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="card-elevated">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-eu-navy/10">
                  <stat.icon className="h-5 w-5 text-eu-navy" />
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
              // Loading skeletons
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
                  <RegulationCard
                    key={regulation.id}
                    regulation={regulation}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <Card className="card-elevated">
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    No regulations found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search criteria or expanding the date range.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RssLinkGenerator
              topics={topics}
              languages={languages}
              dateFrom={dateFrom}
              dateTo={dateTo}
            />

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
      </main>
    </div>
  );
};

export default Dashboard;
