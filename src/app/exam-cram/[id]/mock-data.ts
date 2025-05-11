import { Question } from './store';

// Mock questions with different types (multiple-choice, short-answer, essay)
export const mockQuestions: Question[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    text: 'Which of the following is NOT a characteristic of a good learning objective?',
    options: [
      'Specific and measurable',
      'Achievable within a defined timeframe',
      'Focused on teaching methods rather than outcomes',
      'Relevant to the overall learning goals'
    ],
    correctAnswer: 2, // 0-based index
    explanation: 'Good learning objectives focus on learning outcomes, not teaching methods. They should be specific, measurable, achievable, relevant, and time-bound (SMART).'
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    text: 'According to cognitive load theory, which memory system has the most limited capacity?',
    options: [
      'Long-term memory',
      'Working memory',
      'Sensory memory',
      'Procedural memory'
    ],
    correctAnswer: 1,
    explanation: 'Working memory has a very limited capacity, typically holding only 4-7 items at once. This is why chunking information and reducing extraneous cognitive load is important for effective learning.'
  },
  {
    id: 'q3',
    type: 'short-answer',
    text: 'Define "spaced repetition" and explain its significance in learning.',
    correctAnswer: ['spaced repetition', 'spacing effect', 'distributed practice'],
    explanation: 'Spaced repetition is a learning technique where information is reviewed at increasing intervals, rather than all at once (massed practice). It significantly improves long-term retention by strengthening memory traces just as they begin to fade.'
  },
  {
    id: 'q4',
    type: 'essay',
    text: 'Compare and contrast intrinsic, extraneous, and germane cognitive load. How might an instructor optimize each type to improve learning outcomes?',
    correctAnswer: '(Instructor evaluation required)',
    explanation: 'An effective answer should define the three types of cognitive load: intrinsic (complexity inherent to the material), extraneous (unnecessary processing due to poor design), and germane (effort for schema construction). Instructors should manage intrinsic load through scaffolding and segmenting, minimize extraneous load through clear design, and optimize germane load by using relevant examples and activities.'
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    text: 'Which learning technique has been shown to be MOST effective for long-term retention?',
    options: [
      'Highlighting text',
      'Rereading material',
      'Practice testing',
      'Summarizing content'
    ],
    correctAnswer: 2,
    explanation: 'Research in cognitive psychology has consistently shown that practice testing (retrieval practice) is one of the most effective learning techniques. The act of recalling information strengthens memory more than passive review methods.'
  }
];

// Mock support material for each question
export const mockSupportMaterial = {
  'q1': {
    title: 'Learning Objectives: The SMART Framework',
    summary: 'Effective learning objectives should be Specific, Measurable, Achievable, Relevant, and Time-bound.',
    fullContent: `
      <h3>The SMART Framework for Learning Objectives</h3>
      <p>Learning objectives should follow the SMART criteria:</p>
      <ul>
        <li><strong>Specific</strong>: Clearly define what the learner will be able to do</li>
        <li><strong>Measurable</strong>: Include criteria for evaluating success</li>
        <li><strong>Achievable</strong>: Realistic given resources and constraints</li>
        <li><strong>Relevant</strong>: Aligned with broader educational goals</li>
        <li><strong>Time-bound</strong>: Include a timeframe for achievement</li>
      </ul>
      <p>Good objectives focus on learning outcomes (what students will know or be able to do), not on teaching activities or content coverage.</p>
      <h4>Examples:</h4>
      <p><em>Poor objective</em>: "Students will learn about Newton's laws."</p>
      <p><em>Better objective</em>: "By the end of the lesson, students will be able to apply Newton's three laws of motion to predict the behavior of objects in simple physical scenarios."</p>
    `,
    key_terms: {
      'Learning Objectives': 'Statements that define what learners should know or be able to do after instruction',
      'SMART Criteria': 'Framework for creating effective objectives: Specific, Measurable, Achievable, Relevant, Time-bound'
    }
  },
  'q2': {
    title: 'Cognitive Load Theory and Memory Systems',
    summary: 'Working memory has a very limited capacity compared to other memory systems, creating a bottleneck for learning.',
    fullContent: `
      <h3>Memory Systems in Learning</h3>
      <p>Human memory consists of multiple systems that process information differently:</p>
      <ul>
        <li><strong>Sensory memory</strong>: Very brief storage of sensory information (1-3 seconds)</li>
        <li><strong>Working memory</strong>: Limited-capacity system for temporarily holding and manipulating information (typically 4-7 items for about 20 seconds)</li>
        <li><strong>Long-term memory</strong>: Vast storage system with potentially unlimited capacity and duration</li>
      </ul>
      <h4>Cognitive Load Theory</h4>
      <p>Developed by John Sweller, this theory emphasizes working memory limitations as a key consideration in instructional design. When cognitive load exceeds working memory capacity, learning is impaired.</p>
      <p>Three types of cognitive load:</p>
      <ul>
        <li><strong>Intrinsic load</strong>: Inherent complexity of the material</li>
        <li><strong>Extraneous load</strong>: Unnecessary processing caused by poor instruction</li>
        <li><strong>Germane load</strong>: Beneficial processing that builds schemas and automation</li>
      </ul>
    `,
    key_terms: {
      'Working Memory': 'Limited-capacity system for temporarily holding and processing information',
      'Cognitive Load Theory': 'Educational theory focusing on working memory limitations in learning',
      'Schema': 'Organized pattern of knowledge that helps manage cognitive load'
    }
  },
  'q3': {
    title: 'Spaced Repetition: Optimal Timing for Learning',
    summary: 'Spaced repetition involves reviewing information at increasing intervals to maximize retention while minimizing study time.',
    fullContent: `
      <h3>The Science of Spaced Repetition</h3>
      <p>Spaced repetition is based on the spacing effect, first documented by Hermann Ebbinghaus in 1885. His forgetting curve showed that memory retention declines exponentially over time.</p>
      <p>Key principles:</p>
      <ul>
        <li>Information is best remembered when studied several times spaced over a longer period</li>
        <li>The optimal time to review is just as you're starting to forget</li>
        <li>Each successful recall strengthens the memory and increases the optimal interval before the next review</li>
      </ul>
      <h4>Implementation Methods</h4>
      <ul>
        <li><strong>Spaced repetition software</strong>: Apps like Anki and SuperMemo that use algorithms to schedule optimal review times</li>
        <li><strong>Flashcard systems</strong>: Physical or digital cards reviewed at increasing intervals</li>
        <li><strong>Distributed practice</strong>: Dividing study sessions across days or weeks rather than cramming</li>
      </ul>
      <p>Research consistently shows that spaced repetition can improve long-term retention by 200-400% compared to massed practice (cramming).</p>
    `,
    key_terms: {
      'Spacing Effect': 'The phenomenon whereby learning is greater when studying is spread out over time',
      'Forgetting Curve': 'Mathematical formula describing the rate at which information is forgotten',
      'Distributed Practice': 'Study schedule where practice is spread out over time'
    }
  },
  'q4': {
    title: 'Types of Cognitive Load in Instructional Design',
    summary: 'Effective instruction requires managing intrinsic load, minimizing extraneous load, and optimizing germane load.',
    fullContent: `
      <h3>Understanding the Three Types of Cognitive Load</h3>

      <h4>Intrinsic Cognitive Load</h4>
      <p>This is the inherent difficulty of the material itself.</p>
      <ul>
        <li>Determined by element interactivity (how many elements must be processed simultaneously)</li>
        <li>Cannot be eliminated but can be managed through sequencing and scaffolding</li>
        <li>Examples: Learning basic addition has low intrinsic load; understanding quantum physics has high intrinsic load</li>
      </ul>

      <h4>Extraneous Cognitive Load</h4>
      <p>This is unnecessary processing imposed by poor instructional design.</p>
      <ul>
        <li>Doesn't contribute to learning and should be minimized</li>
        <li>Caused by confusing explanations, irrelevant information, or poor presentation</li>
        <li>Examples: Cluttered slides, unnecessary decorative images, split-attention effect</li>
      </ul>

      <h4>Germane Cognitive Load</h4>
      <p>This is productive mental effort that contributes to learning.</p>
      <ul>
        <li>Devoted to schema acquisition and automation</li>
        <li>Should be maximized within the limitations of total working memory capacity</li>
        <li>Examples: Comparing examples, self-explanation, elaborative questioning</li>
      </ul>

      <h4>Instructional Design Implications</h4>
      <p>Effective instruction requires balancing these three types of load:</p>
      <ul>
        <li>Manage intrinsic load through sequencing, scaffolding, and segmenting complex material</li>
        <li>Reduce extraneous load through clear, concise presentation and eliminating distractions</li>
        <li>Optimize germane load by encouraging meaningful processing through relevant activities</li>
      </ul>
    `,
    key_terms: {
      'Intrinsic Cognitive Load': 'Mental effort required by the inherent complexity of learning material',
      'Extraneous Cognitive Load': 'Unnecessary mental effort caused by poor instructional design',
      'Germane Cognitive Load': 'Beneficial mental effort that contributes to schema construction',
      'Element Interactivity': 'The degree to which elements of a task must be processed simultaneously'
    }
  },
  'q5': {
    title: 'Evidence-Based Learning Techniques',
    summary: 'Practice testing and retrieval practice are among the most effective learning strategies according to cognitive research.',
    fullContent: `
      <h3>Comparing Learning Technique Effectiveness</h3>
      <p>A comprehensive review by Dunlosky et al. (2013) evaluated ten common learning techniques based on scientific evidence:</p>

      <h4>High Utility Techniques</h4>
      <ul>
        <li><strong>Practice Testing</strong>: Taking practice tests or engaging in retrieval practice</li>
        <li><strong>Distributed Practice</strong>: Spreading learning over time</li>
      </ul>

      <h4>Moderate Utility Techniques</h4>
      <ul>
        <li><strong>Elaborative Interrogation</strong>: Generating explanations for why facts are true</li>
        <li><strong>Self-Explanation</strong>: Explaining steps taken during problem-solving</li>
        <li><strong>Interleaved Practice</strong>: Mixing different problem types together</li>
      </ul>

      <h4>Low Utility Techniques</h4>
      <ul>
        <li><strong>Summarization</strong>: Writing summaries of texts</li>
        <li><strong>Highlighting/Underlining</strong>: Marking important text</li>
        <li><strong>Keyword Mnemonic</strong>: Using keywords and imagery to associate materials</li>
        <li><strong>Imagery for Text</strong>: Forming mental images of text material</li>
        <li><strong>Rereading</strong>: Restudying text material after initial reading</li>
      </ul>

      <h4>Why Practice Testing Is Most Effective</h4>
      <p>Practice testing enhances learning through multiple mechanisms:</p>
      <ul>
        <li>Direct strengthening of memory through retrieval</li>
        <li>Identification of knowledge gaps</li>
        <li>Deeper processing of material</li>
        <li>Transfer of knowledge to new contexts</li>
        <li>Reduction of test anxiety in actual assessment situations</li>
      </ul>
    `,
    key_terms: {
      'Retrieval Practice': 'The act of recalling information from memory',
      'Testing Effect': 'The finding that retrieving information enhances later retention',
      'Desirable Difficulty': 'Challenging learning conditions that slow down initial learning but enhance long-term retention'
    }
  },
  'default': {
    title: 'Learning Strategies Overview',
    summary: 'Effective learning requires understanding how memory works and applying evidence-based techniques.',
    fullContent: `
      <h3>Principles of Effective Learning</h3>
      <p>Research in cognitive psychology has identified several key principles that enhance learning:</p>

      <h4>1. Active Processing</h4>
      <p>Engagement with material through questioning, application, and retrieval practice leads to better learning outcomes than passive review.</p>

      <h4>2. Spaced Practice</h4>
      <p>Distributing study sessions over time is more effective than cramming, leveraging the spacing effect to improve retention.</p>

      <h4>3. Interleaving</h4>
      <p>Mixing different topics or problem types together during practice improves discrimination and transfer of learning.</p>

      <h4>4. Elaboration</h4>
      <p>Connecting new information to existing knowledge through examples, analogies, and explanations enhances understanding and retention.</p>

      <h4>5. Dual Coding</h4>
      <p>Combining verbal and visual information creates multiple pathways for retrieval and deeper processing.</p>

      <h4>6. Concrete Examples</h4>
      <p>Abstract concepts are better understood and remembered when illustrated with specific examples.</p>

      <h4>7. Metacognition</h4>
      <p>Awareness and regulation of one's own learning processes leads to more effective study habits and better outcomes.</p>
    `,
    key_terms: {
      'Active Learning': 'Instructional approaches that engage students in the learning process',
      'Metacognition': 'Awareness and understanding of one\'s own thought processes',
      'Transfer of Learning': 'Application of knowledge and skills learned in one context to different situations'
    }
  }
};
