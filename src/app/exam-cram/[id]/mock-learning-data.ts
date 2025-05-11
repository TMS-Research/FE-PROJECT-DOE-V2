// Define the type for a learning material
export interface LearningMaterial {
  id: string;
  type: 'note' | 'analogy' | 'definition' | 'example' | 'flashcard' | 'quiz';
  title: string;
  content: {
    text: string[];
    lists?: {
      type: 'bullet' | 'numbered';
      items: string[];
    }[];
    // For flashcard
    frontContent?: string;
    backContent?: string;
    // For quiz
    question?: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
  };
}

// Example learning materials for standard form topic
const standardFormMaterials: LearningMaterial[] = [
  {
    id: 'sf-note-1',
    type: 'note',
    title: 'Understanding Standard Form',
    content: {
      text: [
        'Standard form is a way of writing very large or very small numbers in a more compact form.',
        'It is also known as scientific notation.'
      ]
    }
  },
  {
    id: 'sf-definition-1',
    type: 'definition',
    title: 'Standard Form Definition',
    content: {
      text: [
        'A number is in standard form when it is written as:',
        'a × 10ⁿ',
        'where 1 ≤ a < 10 and n is an integer.'
      ]
    }
  },
  {
    id: 'sf-example-1',
    type: 'example',
    title: 'Examples of Standard Form',
    content: {
      text: [
        'Large numbers examples:',
        '4,500,000 = 4.5 × 10⁶',
        '783,000,000 = 7.83 × 10⁸',
        '',
        'Small numbers examples:',
        '0.00076 = 7.6 × 10⁻⁴',
        '0.00000542 = 5.42 × 10⁻⁶'
      ]
    }
  },
  {
    id: 'sf-flashcard-1',
    type: 'flashcard',
    title: 'Converting to Standard Form',
    content: {
      text: [''],
      frontContent: 'How do you convert 3,750,000 to standard form?',
      backContent: '3.75 × 10⁶\n\nMove the decimal point to the left until you have a number between 1 and 10, then count how many places you moved it to get the power of 10.'
    }
  },
  {
    id: 'sf-quiz-1',
    type: 'quiz',
    title: 'Standard Form Quiz',
    content: {
      text: [''],
      question: 'Which of the following is the correct standard form of 0.00093?',
      options: [
        '9.3 × 10⁻⁴',
        '9.3 × 10⁻³',
        '9.3 × 10⁻⁵',
        '0.93 × 10⁻³'
      ],
      correctAnswer: '9.3 × 10⁻⁴',
      explanation: 'To convert 0.00093 to standard form, we move the decimal point to the right 4 places to get 9.3, so it becomes 9.3 × 10⁻⁴'
    }
  }
];

// More topic examples can be added here
export const mockLearningMaterials = {
  'standard-form': standardFormMaterials,
  // Add more topics as needed
};
