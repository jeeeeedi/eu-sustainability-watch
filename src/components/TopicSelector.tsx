import { useState } from "react";
import { Check, ChevronDown, ChevronRight, Search } from "lucide-react";
import { eurovocTopics, EurovocTopic } from "@/lib/eurovoc-topics";
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

interface TopicSelectorProps {
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;
}

const TopicSelector = ({ selectedTopics, onTopicsChange }: TopicSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTopic = (topicId: string) => {
    onTopicsChange(
      selectedTopics.includes(topicId)
        ? selectedTopics.filter((id) => id !== topicId)
        : [...selectedTopics, topicId]
    );
  };

  const selectAllInCategory = (category: EurovocTopic) => {
    const childIds = category.children?.map((c) => c.id) || [];
    const allChildIds = [category.id, ...childIds];
    const allSelected = allChildIds.every((id) => selectedTopics.includes(id));
    
    if (allSelected) {
      onTopicsChange(selectedTopics.filter((id) => !allChildIds.includes(id)));
    } else {
      onTopicsChange([...new Set([...selectedTopics, ...allChildIds])]);
    }
  };

  const filteredTopics = eurovocTopics.filter((topic) => {
    const matchesTopic = topic.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChildren = topic.children?.some((child) =>
      child.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesTopic || matchesChildren;
  });

  const getSelectedLabels = () => {
    const labels: string[] = [];
    eurovocTopics.forEach((topic) => {
      if (selectedTopics.includes(topic.id)) {
        labels.push(topic.label);
      }
      topic.children?.forEach((child) => {
        if (selectedTopics.includes(child.id)) {
          labels.push(child.label);
        }
      });
    });
    return labels;
  };

  const selectedLabels = getSelectedLabels();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Topics (Eurovoc Descriptors)
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
        <PopoverContent className="w-[400px] p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <ScrollArea className="h-[300px]">
            <div className="p-2">
              {filteredTopics.map((category) => (
                <div key={category.id} className="mb-1">
                  <div
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => toggleCategory(category.id)}
                  >
                    {expandedCategories.includes(category.id) ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded border",
                        selectedTopics.includes(category.id)
                          ? "bg-primary border-primary"
                          : "border-input"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectAllInCategory(category);
                      }}
                    >
                      {selectedTopics.includes(category.id) && (
                        <Check className="h-3 w-3 text-primary-foreground" />
                      )}
                    </div>
                    <span className="font-medium text-sm">{category.label}</span>
                  </div>
                  {expandedCategories.includes(category.id) && category.children && (
                    <div className="ml-6 pl-4 border-l border-border">
                      {category.children
                        .filter((child) =>
                          child.label.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((child) => (
                          <div
                            key={child.id}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => toggleTopic(child.id)}
                          >
                            <div
                              className={cn(
                                "flex h-4 w-4 items-center justify-center rounded border",
                                selectedTopics.includes(child.id)
                                  ? "bg-secondary border-secondary"
                                  : "border-input"
                              )}
                            >
                              {selectedTopics.includes(child.id) && (
                                <Check className="h-3 w-3 text-secondary-foreground" />
                              )}
                            </div>
                            <span className="text-sm">{child.label}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
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
                Clear all
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TopicSelector;
