import { useState } from "react";
import { Copy, Check, Rss, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface RssLinkGeneratorProps {
  topics: string[];
  languages: string[];
  dateFrom?: Date;
  dateTo?: Date;
}

const RssLinkGenerator = ({ topics, languages, dateFrom, dateTo }: RssLinkGeneratorProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateRssUrl = () => {
    const baseUrl = window.location.origin + "/api/rss";
    const params = new URLSearchParams();
    
    if (topics.length > 0) {
      params.set("topics", topics.join(","));
    }
    if (languages.length > 0) {
      params.set("languages", languages.join(","));
    }
    if (dateFrom) {
      params.set("from", dateFrom.toISOString().split("T")[0]);
    }
    if (dateTo) {
      params.set("to", dateTo.toISOString().split("T")[0]);
    }
    
    return `${baseUrl}?${params.toString()}`;
  };

  const rssUrl = generateRssUrl();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(rssUrl);
      setCopied(true);
      toast({
        title: "RSS link copied!",
        description: "Add this to your RSS reader for weekly updates.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const hasFilters = topics.length > 0 || languages.length > 0;

  return (
    <Card className="card-elevated border-eu-teal/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-eu-teal/10">
            <Rss className="h-4 w-4 text-eu-teal" />
          </div>
          RSS Feed Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Subscribe to receive weekly updates on new regulations matching your filters.
        </p>
        
        {hasFilters ? (
          <>
            <div className="flex gap-2">
              <Input
                readOnly
                value={rssUrl}
                className="text-xs font-mono bg-muted"
              />
              <Button
                variant="eu-teal"
                size="icon"
                onClick={copyToClipboard}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Bell className="h-3.5 w-3.5" />
              <span>Updates delivered every Monday at 9:00 AM CET</span>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Select topics and languages to generate your personalized RSS feed link.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RssLinkGenerator;
