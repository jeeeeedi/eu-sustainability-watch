import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, ArrowRight, Shield, Bell, FileSearch } from "lucide-react";
import { DateRange } from "react-day-picker";
import Header from "@/components/Header";
import TopicSelector from "@/components/TopicSelector";
import LanguageSelector from "@/components/LanguageSelector";
import DateRangePicker from "@/components/DateRangePicker";
import RssLinkGenerator from "@/components/RssLinkGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["EN"]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (selectedTopics.length === 0) {
      toast({
        title: "Please select at least one topic",
        description: "Choose from the Eurovoc descriptors to narrow your search.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay - in production this would trigger Skyvern
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Store search params and navigate to dashboard
    const searchParams = new URLSearchParams({
      topics: selectedTopics.join(","),
      languages: selectedLanguages.join(","),
      from: dateRange?.from?.toISOString() || "",
      to: dateRange?.to?.toISOString() || "",
    });
    
    setIsSearching(false);
    navigate(`/dashboard?${searchParams.toString()}`);
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
        <div className="container relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center space-y-6 animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Stay Ahead of{" "}
              <span className="text-gradient">EU Sustainability</span>{" "}
              Regulations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track, analyze, and stay compliant with the latest European sustainability 
              directives. Powered by automated EUR-Lex monitoring and AI-driven insights.
            </p>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="container pb-16">
        <Card className="card-elevated max-w-4xl mx-auto">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg eu-gradient">
                <Search className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold">Search Regulations</h2>
                <p className="text-sm text-muted-foreground">
                  Define your search criteria using Eurovoc descriptors
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <TopicSelector
                  selectedTopics={selectedTopics}
                  onTopicsChange={setSelectedTopics}
                />
              </div>
              
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
              
              <LanguageSelector
                selectedLanguages={selectedLanguages}
                onLanguagesChange={setSelectedLanguages}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="eu"
                size="lg"
                className="flex-1"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <span className="animate-pulse">Searching EUR-Lex...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Search Regulations
                  </>
                )}
              </Button>
              <Button
                variant="eu-outline"
                size="lg"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* RSS Generator */}
        <div className="max-w-4xl mx-auto mt-6">
          <RssLinkGenerator
            topics={selectedTopics}
            languages={selectedLanguages}
            dateFrom={dateRange?.from}
            dateTo={dateRange?.to}
          />
        </div>
      </section>

      {/* Features */}
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
