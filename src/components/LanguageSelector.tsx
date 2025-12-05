import { useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { euLanguages } from "@/lib/eurovoc-topics";
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

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onLanguagesChange: (languages: string[]) => void;
}

const LanguageSelector = ({ selectedLanguages, onLanguagesChange }: LanguageSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleLanguage = (code: string) => {
    onLanguagesChange(
      selectedLanguages.includes(code)
        ? selectedLanguages.filter((c) => c !== code)
        : [...selectedLanguages, code]
    );
  };

  const removeLanguage = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onLanguagesChange(selectedLanguages.filter((c) => c !== code));
  };

  const filteredLanguages = euLanguages.filter((lang) =>
    lang.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSelectedLabels = () => {
    return euLanguages
      .filter((lang) => selectedLanguages.includes(lang.code))
      .map((lang) => ({ code: lang.code, label: lang.label.split(" ")[0] }));
  };

  const selectedLabels = getSelectedLabels();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Languages
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
                <span className="text-muted-foreground">Select languages...</span>
              ) : (
                selectedLabels.map(({ code, label }) => (
                  <Badge
                    key={code}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {label}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={(e) => removeLanguage(code, e)}
                    />
                  </Badge>
                ))
              )}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <ScrollArea className="h-[250px]">
            <div className="p-2">
              {filteredLanguages.map((lang) => (
                <div
                  key={lang.code}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => toggleLanguage(lang.code)}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded border",
                      selectedLanguages.includes(lang.code)
                        ? "bg-secondary border-secondary"
                        : "border-input"
                    )}
                  >
                    {selectedLanguages.includes(lang.code) && (
                      <Check className="h-3 w-3 text-secondary-foreground" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground w-6">
                      {lang.code}
                    </span>
                    <span className="text-sm">{lang.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-3 border-t flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => onLanguagesChange([])}
            >
              Clear
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => onLanguagesChange(["EN", "DE", "FR"])}
            >
              Main EU
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LanguageSelector;
