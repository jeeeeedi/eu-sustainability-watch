import { useState, useEffect } from "react";
import { Search, Sparkles, Shield, Bell, FileSearch, ChevronUp, ChevronDown, Filter, Download, RefreshCw, LayoutGrid, List, FileText } from "lucide-react";
import { DateRange } from "react-day-picker";
import Header from "@/components/Header";
import TopicSelector from "@/components/TopicSelector";
import LanguageSelector from "@/components/LanguageSelector";
import DateRangePicker from "@/components/DateRangePicker";
import RssLinkGenerator from "@/components/RssLinkGenerator";
import RegulationCard, { Regulation } from "@/components/RegulationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { getFilteredRegulations } from "@/lib/mock-regulations";
import { eurovocTopics, euLanguages } from "@/lib/eurovoc-topics";

const Index = () => {
  const { toast } = useToast();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["EN"]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [keywords, setKeywords] = useState("sustainability");
  const [isSearching, setIsSearching] = useState(false);
  const [searchOpen, setSearchOpen] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const filtered = getFilteredRegulations(selectedTopics, selectedLanguages, dateRange?.from, dateRange?.to);
    setRegulations(filtered);
    setIsLoading(false);
    setIsSearching(false);
    setSearchOpen(false);
  };

  const getTopicLabels = () => {
    const labels: string[] = [];
    eurovocTopics.forEach((domain) => {
      if (selectedTopics.includes(domain.id)) {
        labels.push(domain.label);
      }
      domain.subdomains.forEach((sub) => {
        if (selectedTopics.includes(sub.id)) {
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
    { label: "Topics Tracked", value: selectedTopics.length || "All", icon: Filter },
    { label: "Languages", value: selectedLanguages.length, icon: LayoutGrid },
  ];

  const features = [
    {
      icon: FileSearch,
      title: "EUR-Lex Integration",
      description: "Automated scraping of official EU legislation database",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Summaries",
      description: "Intelligent extraction of key highlights and implications",
    },
    {
      icon: Bell,
      title: "RSS Updates",
      description: "Weekly digest of new regulations matching your criteria",
    },
    {
      icon: Shield,
      title: "Compliance Focused",
      description: "Curated for corporate sustainability professionals",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 eu-gradient opacity-5" />
        <div className="container relative py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight font-sans">
              Stay Ahead of EU Sustainability Regulations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track, analyze, and stay compliant with the latest European sustainability
              directives. Powered by automated EUR-Lex monitoring and AI-driven insights.
            </p>
          </div>
        </div>
      </section>

      {/* Collapsible Search Section */}
      <section className="container pb-8">
        <Collapsible open={searchOpen} onOpenChange={setSearchOpen}>
          <Card className="card-elevated max-w-5xl mx-auto">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 md:p-6 cursor-pointer hover:bg-muted/50 transition-colors rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg eu-gradient">
                    <Search className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold font-sans">Search Regulations</h2>
                    <p className="text-sm text-muted-foreground">
                      {hasSearched
                        ? `${selectedTopics.length} topics, ${selectedLanguages.length} languages${keywords ? `, "${keywords}"` : ""}`
                        : "Define your search criteria using Eurovoc descriptors"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  {searchOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="p-4 md:p-6 pt-0 space-y-6 border-t">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Keywords Input */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-foreground">Keywords</label>
                    <Input
                      placeholder="Enter keywords (e.g., sustainability, carbon, ESG)..."
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate multiple keywords with commas
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <TopicSelector selectedTopics={selectedTopics} onTopicsChange={setSelectedTopics} />
                  </div>

                  <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />

                  <LanguageSelector
                    selectedLanguages={selectedLanguages}
                    onLanguagesChange={setSelectedLanguages}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    variant="eu"
                    size="lg"
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="flex-1 text-brand-cream bg-primary"
                  >
                    {isSearching ? (
                      <span className="animate-pulse">Searching EUR-Lex...</span>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        Search Regulations
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>

          {/* RSS Generator */}
          <div className="max-w-5xl mx-auto mt-6">
            <RssLinkGenerator
              topics={selectedTopics}
              languages={selectedLanguages}
              dateFrom={dateRange?.from}
              dateTo={dateRange?.to}
            />
          </div>
        </Collapsible>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="container pb-12">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground font-sans">Regulations Found</h2>
                <p className="text-muted-foreground mt-1">
                  {isLoading
                    ? "Loading results..."
                    : `Found ${regulations.length} regulations matching your criteria`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="font-sans">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={handleSearch}>
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
            {(selectedTopics.length > 0 || selectedLanguages.length > 0 || keywords) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {keywords && (
                  <Badge variant="default" className="bg-primary/10 text-primary">
                    "{keywords}"
                  </Badge>
                )}
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
                {dateRange?.from && dateRange?.to && (
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
      )}

      {/* Features - only show if no search has been made */}
      {!hasSearched && (
        <section className="container pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="card-elevated animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-eu-teal/10">
                    <feature.icon className="h-5 w-5 text-eu-teal" />
                  </div>
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

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
                className="text-eu-teal hover:underline"
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

export default Index;
