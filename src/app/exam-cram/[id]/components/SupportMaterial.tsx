'use client';

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupportMaterialProps {
  material: {
    title: string;
    summary: string;
    fullContent: string;
    key_terms: Record<string, string>;
  };
}

export default function SupportMaterial({ material }: SupportMaterialProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

  // Helper to highlight key terms in text
  const highlightKeyTerms = (text: string) => {
    let processedText = text;
    const terms = Object.keys(material.key_terms);

    // Sort terms by length (longest first) to prevent highlighting inside already highlighted terms
    terms.sort((a, b) => b.length - a.length);

    for (const term of terms) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      processedText = processedText.replace(
        regex,
        `<span class="relative group cursor-help border-b border-dotted border-primary/50" data-term="${term}">$&</span>`
      );
    }

    return processedText;
  };

  return (
    <div className="border rounded-lg bg-card p-4 h-full overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium flex items-center">
          <BookOpen className="h-4 w-4 mr-2 text-primary" />
          Study Material
        </h3>

        {/* Reading mode slider */}
        <div className="flex items-center text-xs">
          <span className={!showFullContent ? 'font-medium' : 'text-muted-foreground'}>Summary</span>
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="w-12 h-6 mx-2 rounded-full bg-secondary flex items-center p-1 cursor-pointer"
          >
            <div
              className={cn(
                "w-4 h-4 rounded-full bg-primary transition-transform duration-200 ease-in-out",
                showFullContent ? "transform translate-x-6" : ""
              )}
            />
          </button>
          <span className={showFullContent ? 'font-medium' : 'text-muted-foreground'}>Detailed</span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-medium">{material.title}</h4>

        {!showFullContent ? (
          <p className="text-sm">{material.summary}</p>
        ) : (
          <div
            className="text-sm space-y-3"
            dangerouslySetInnerHTML={{
              __html: highlightKeyTerms(material.fullContent)
            }}
            onClick={(e) => {
              // Handle clicks on key terms
              const target = e.target as HTMLElement;
              if (target.dataset.term) {
                setHoveredTerm(target.dataset.term);

                // Auto-hide tooltip after 3 seconds
                setTimeout(() => {
                  if (hoveredTerm === target.dataset.term) {
                    setHoveredTerm(null);
                  }
                }, 3000);
              } else {
                setHoveredTerm(null);
              }
            }}
          />
        )}

        {/* Key terms section */}
        <div className="mt-4">
          <h5 className="text-sm font-medium mb-2">Key Terms</h5>
          <div className="text-xs space-y-2">
            {Object.entries(material.key_terms).map(([term, definition]) => (
              <div key={term} className="pb-2 border-b border-border last:border-0">
                <span className="font-medium text-primary">{term}:</span> {definition}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip for hovered term */}
      {hoveredTerm && (
        <div className="fixed bg-popover text-popover-foreground text-xs p-2 rounded-md shadow-md z-50 max-w-xs">
          <span className="font-medium">{hoveredTerm}:</span> {material.key_terms[hoveredTerm]}
        </div>
      )}
    </div>
  );
}
