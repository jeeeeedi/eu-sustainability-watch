import { ExternalLink, Calendar, FileText, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Regulation {
  id: string;
  title: string;
  celexNumber: string;
  publicationDate: string;
  summary: string;
  highlights: string[];
  category: string;
  tags: string[];
  documentType: string;
  eurLexUrl: string;
}

interface RegulationCardProps {
  regulation: Regulation;
  index: number;
}

const RegulationCard = ({ regulation, index }: RegulationCardProps) => {
  return (
    <Card 
      className="card-elevated overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="tag-category">
                {regulation.category}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {regulation.documentType}
              </Badge>
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground leading-tight">
              {regulation.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                {regulation.celexNumber}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(regulation.publicationDate).toLocaleDateString("en-EU", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            asChild
          >
            <a
              href={regulation.eurLexUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in EUR-Lex"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {regulation.summary}
        </p>
        
        {regulation.highlights.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Key Highlights
            </p>
            <ul className="space-y-1">
              {regulation.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="highlight-badge mt-0.5">NEW</span>
                  <span className="text-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border">
          <Tag className="h-3.5 w-3.5 text-muted-foreground" />
          {regulation.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="tag-topic text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulationCard;
