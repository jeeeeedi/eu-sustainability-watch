import { useState } from "react";
import { Search, Sparkles, Shield, Bell, FileSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import Header from "@/components/Header";
import ThemeSelector from "@/components/ThemeSelector";
import LanguageSelector from "@/components/LanguageSelector";
import DateRangePicker from "@/components/DateRangePicker";
import RssLinkGenerator from "@/components/RssLinkGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { triggerEURLexSearch, generateSearchId } from "@/lib/eurlex-api";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["EN"]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [keywords, setKeywords] = useState("sustainability");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!keywords.trim()) {
      toast({
        title: "Missing Keywords",
        description: "Please enter at least one keyword to search.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);

    try {
      // Generate unique search ID for this session
      const searchId = generateSearchId();

      const formattedDateFrom = dateRange?.from
        ? dateRange.from.toISOString().split('T')[0]
        : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const formattedDateTo = dateRange?.to
        ? dateRange.to.toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      const searchParams = {
        searchId,
        keywords: keywords.trim(),
        themes: selectedThemes,
        dateFrom: formattedDateFrom,
        dateTo: formattedDateTo,
        languages: selectedLanguages,
        documentTypes: ['regulation', 'directive', 'decision'] as ('regulation' | 'directive' | 'decision')[],
        excludeConsolidated: false,
        excludeCorrigenda: false,
      };

      await triggerEURLexSearch(searchParams);

      toast({
        title: "Search Started",
        description: "EUR-Lex search initiated. Results will be processed shortly.",
      });

      navigate("/dashboard", {
        state: {
          searchId,
          themes: selectedThemes,
          languages: selectedLanguages,
          dateFrom: formattedDateFrom,
          dateTo: formattedDateTo,
          keywords,
        },
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "Failed to initiate search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

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

      {/* Search Section */}
      <section className="container pb-8">
        <Card className="card-elevated max-w-5xl mx-auto">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Search className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Search Regulations</h2>
                <p className="text-sm text-muted-foreground">
                  Define your search criteria with your chosen keywords plus EuroVoc descriptors
                </p>
              </div>
            </div>

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
                <ThemeSelector selectedThemes={selectedThemes} onThemesChange={setSelectedThemes} />
              </div>

              <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />

              <LanguageSelector
                selectedLanguages={selectedLanguages}
                onLanguagesChange={setSelectedLanguages}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="default"
                size="lg"
                onClick={handleSearch}
                disabled={isSearching}
                className="flex-1"
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
        </Card>

        {/* RSS Generator */}
        <div className="max-w-5xl mx-auto mt-6">
          <RssLinkGenerator
            themes={selectedThemes}
            languages={selectedLanguages}
            dateFrom={dateRange?.from}
            dateTo={dateRange?.to}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="card-elevated animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <feature.icon className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="font-medium text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
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

export default Index;
