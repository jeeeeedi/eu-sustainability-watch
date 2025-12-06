import { useState } from "react";
import { Check, ChevronDown, ChevronRight, Search } from "lucide-react";
import { eurovocTopics, EurovocTopic, EurovocSubdomain } from "@/lib/eurovoc-topics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface TopicSelectorProps {
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;
}

const TopicSelector = ({ selectedTopics, onTopicsChange }: TopicSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDomains, setExpandedDomains] = useState<string[]>([]);

  const toggleTopic = (topicId: string) => {
    onTopicsChange(
      selectedTopics.includes(topicId)
        ? selectedTopics.filter((id) => id !== topicId)
        : [...selectedTopics, topicId]
    );
  };

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) =>
      prev.includes(domainId)
        ? prev.filter((id) => id !== domainId)
        : [...prev, domainId]
    );
  };

  const matchesSearch = (label: string) =>
    label.toLowerCase().includes(searchQuery.toLowerCase());

  const filteredTopics = eurovocTopics.filter(
    (domain) =>
      matchesSearch(domain.label) ||
      domain.subdomains.some((sub) => matchesSearch(sub.label))
  );

  const getSelectedLabels = (): string[] => {
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

  const selectedLabels = getSelectedLabels();

  const isSubdomainSelected = (subdomain: EurovocSubdomain) =>
    selectedTopics.includes(subdomain.id);

  const isDomainPartiallySelected = (domain: EurovocTopic) =>
    domain.subdomains.some((sub) => selectedTopics.includes(sub.id));

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Topics (EuroVoc Domains & Subdomains)
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-10 py-2"
          >
            <div className="flex flex-wrap gap-1 flex-1 text-left">
              {selectedLabels.length === 0 ? (
                <span className="text-muted-foreground">Select topics...</span>
              ) : selectedLabels.length <= 3 ? (
                selectedLabels.map((label) => (
                  <Badge key={label} variant="secondary" className="tag-topic">
                    {label}
                  </Badge>
                ))
              ) : (
                <span className="text-sm">
                  {selectedLabels.length} topics selected
                </span>
              )}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[450px] p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search domains and subdomains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <ScrollArea className="h-[350px]">
            <div className="p-2">
              {filteredTopics.map((domain) => {
                const isExpanded = expandedDomains.includes(domain.id) || searchQuery.length > 0;
                const filteredSubdomains = domain.subdomains.filter((sub) =>
                  matchesSearch(sub.label) || matchesSearch(domain.label)
                );

                return (
                  <Collapsible
                    key={domain.id}
                    open={isExpanded}
                    onOpenChange={() => toggleDomain(domain.id)}
                  >
                    <div className="flex items-center gap-1">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <div
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer flex-1",
                          isDomainPartiallySelected(domain) && "bg-muted/50"
                        )}
                        onClick={() => toggleTopic(domain.id)}
                      >
                        <div
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded border",
                            selectedTopics.includes(domain.id)
                              ? "bg-primary border-primary"
                              : "border-input"
                          )}
                        >
                          {selectedTopics.includes(domain.id) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{domain.label}</span>
                        <Badge variant="outline" className="ml-auto text-xs">
                          {domain.subdomains.length}
                        </Badge>
                      </div>
                    </div>
                    <CollapsibleContent>
                      <div className="ml-9 border-l border-border pl-2 space-y-1 pb-2">
                        {filteredSubdomains.map((subdomain) => (
                          <div
                            key={subdomain.id}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => toggleTopic(subdomain.id)}
                          >
                            <div
                              className={cn(
                                "flex h-4 w-4 items-center justify-center rounded border",
                                isSubdomainSelected(subdomain)
                                  ? "bg-primary border-primary"
                                  : "border-input"
                              )}
                            >
                              {isSubdomainSelected(subdomain) && (
                                <Check className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {subdomain.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </ScrollArea>
          {selectedTopics.length > 0 && (
            <div className="p-3 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => onTopicsChange([])}
              >
                Clear all ({selectedTopics.length})
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TopicSelector;
