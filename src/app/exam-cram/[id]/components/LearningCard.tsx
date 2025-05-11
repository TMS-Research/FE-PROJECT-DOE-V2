import React from 'react';
import { FileText, Target, BookText, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LearningMaterial } from '../mock-learning-data';

interface LearningCardProps {
  type: 'note' | 'analogy' | 'definition' | 'example';
  title: string;
  content: LearningMaterial['content'];
  onComplete: () => void;
}

const LearningCard: React.FC<LearningCardProps> = ({
  type,
  title,
  content,
  onComplete,
}) => {
  const icons = {
    note: <FileText className="w-6 h-6 text-indigo-500" />,
    analogy: <Lightbulb className="w-6 h-6 text-amber-500" />,
    definition: <BookText className="w-6 h-6 text-purple-500" />,
    example: <Target className="w-6 h-6 text-emerald-500" />,
  };

  const backgrounds = {
    note: 'from-indigo-50 to-blue-50',
    analogy: 'from-amber-50 to-orange-50',
    definition: 'from-purple-50 to-fuchsia-50',
    example: 'from-emerald-50 to-green-50',
  };

  const cardBorders = {
    note: 'border-indigo-200',
    analogy: 'border-amber-200',
    definition: 'border-purple-200',
    example: 'border-emerald-200',
  };

  const iconBackgrounds = {
    note: 'from-indigo-500 to-blue-500',
    analogy: 'from-amber-500 to-orange-500',
    definition: 'from-purple-500 to-fuchsia-500',
    example: 'from-emerald-500 to-green-500',
  };

  const typeLabels = {
    note: 'Note',
    analogy: 'Analogy',
    definition: 'Definition',
    example: 'Example',
  };

  const borderAccents = {
    note: 'before:bg-indigo-500',
    analogy: 'before:bg-amber-500',
    definition: 'before:bg-purple-500',
    example: 'before:bg-emerald-500',
  };

  const renderContent = () => {
    return (
      <div className="space-y-4">
        {content.text.map((paragraph, index) => (
          <p key={index} className="text-gray-700 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}

        {content.lists?.map((list, listIndex) => (
          <div key={listIndex} className="mt-4">
            {list.type === 'bullet' ? (
              <ul className="list-disc pl-6 space-y-3">
                {list.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700 text-lg leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <ol className="list-decimal pl-6 space-y-3">
                {list.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700 text-lg leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-lg max-w-4xl mx-auto transition-all duration-300 animate-fade-in border overflow-hidden",
      cardBorders[type]
    )}>
      {/* Decorative accent strip on top */}
      <div className={cn(
        "relative h-2 w-full bg-gradient-to-r",
        iconBackgrounds[type]
      )} />

      <div className="px-8 py-6 flex items-center">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-r shadow-md",
          iconBackgrounds[type]
        )}>
          {icons[type]}
        </div>
        <div className="ml-5">
          <div className={cn(
            "text-xs font-bold uppercase tracking-wider mb-1",
            type === 'note' ? 'text-indigo-600' :
            type === 'analogy' ? 'text-amber-600' :
            type === 'definition' ? 'text-purple-600' :
            'text-emerald-600'
          )}>
            {typeLabels[type]}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
      </div>

      <div className="p-8 pt-4">
        <div className={cn(
          "rounded-xl p-6 mb-8 bg-gradient-to-br shadow-inner relative border",
          backgrounds[type],
          type === 'note' ? 'border-indigo-100' :
          type === 'analogy' ? 'border-amber-100' :
          type === 'definition' ? 'border-purple-100' :
          'border-emerald-100',
          "before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-l-lg",
          borderAccents[type]
        )}>
          {renderContent()}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onComplete}
            className={cn(
              "text-white px-6 py-3 rounded-full font-medium flex items-center transition-all duration-200 transform hover:scale-105 hover:shadow-md",
              type === 'note' ? 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600' :
              type === 'analogy' ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' :
              type === 'definition' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600' :
              'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600'
            )}
          >
            Continue
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningCard;
