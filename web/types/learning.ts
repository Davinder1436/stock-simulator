// Learning Module Type Definitions

export interface ModuleMetadata {
  module_id: string;
  level: number;
  level_name: string;
  module_title: string;
  module_description: string;
  estimated_duration_minutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  prerequisites: string[];
  learning_objectives: string[];
  total_lessons: number;
  total_quiz_questions: number;
  pass_percentage: number;
  next_module: string | null;
}

export interface ContentBlock {
  type: 'text' | 'definition' | 'example' | 'key_point' | 'function_card' | 
        'comparison' | 'timeline' | 'property_grid' | 'concept_breakdown' | 
        'real_world' | 'insight' | 'money_pyramid' | 'process_flow' | 'formula';
  content?: string;
  term?: string;
  definition?: string;
  title?: string;
  points?: string[];
  functions?: FunctionCard[];
  items?: ComparisonItem[];
  events?: TimelineEvent[];
  properties?: Property[];
  pillars?: ConceptPillar[];
  scenarios?: Scenario[];
  layers?: MoneyLayer[];
  steps?: ProcessStep[];
  formula?: string;
  example?: string;
  note?: string;
}

export interface FunctionCard {
  number: number;
  title: string;
  description: string;
  example: string;
}

export interface ComparisonItem {
  name?: string;
  medium?: string;
  unit?: string;
  store?: string;
  overall?: string;
  era?: string;
  source?: string;
  example?: string;
  vulnerability?: string;
}

export interface TimelineEvent {
  period: string;
  title: string;
  description: string;
  example: string;
}

export interface Property {
  property: string;
  description: string;
  good_example: string;
  bad_example: string;
  icon: string;
}

export interface ConceptPillar {
  pillar: string;
  description: string;
  explanation: string;
  strength: string;
}

export interface Scenario {
  scenario: string;
  failure?: string;
  description: string;
  lesson?: string;
  effect?: string;
}

export interface MoneyLayer {
  layer: string;
  description: string;
  percentage: string;
  example: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  money_supply: string;
}

export interface QuizCheck {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

export interface Lesson {
  lesson_id: string;
  lesson_number: number;
  title: string;
  subtitle: string;
  duration_minutes: number;
  content_blocks: ContentBlock[];
  quiz_check: QuizCheck;
}

export interface Question {
  question_id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'scenario';
  options: string[];
  correct_answer: number;
  explanation: string;
  points: number;
}

export interface ModuleQuiz {
  quiz_id: string;
  title: string;
  description: string;
  time_limit_minutes: number;
  passing_score: number;
  questions: Question[];
}

export interface CompletionBadge {
  badge_id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface AdditionalResource {
  type: 'article' | 'video' | 'tool' | 'book';
  title: string;
  description: string;
  url: string;
  duration?: string;
}

export interface LearningModule {
  module_metadata: ModuleMetadata;
  lessons: Lesson[];
  module_quiz: ModuleQuiz;
  completion_badge: CompletionBadge;
  additional_resources: AdditionalResource[];
}

// User Progress Types
export interface UserProgress {
  module_id: string;
  lessons_completed: string[];
  current_lesson: number;
  quiz_attempts: QuizAttempt[];
  completed: boolean;
  score?: number;
  completion_date?: string;
}

export interface QuizAttempt {
  attempt_id: string;
  date: string;
  score: number;
  answers: Record<string, number>;
  time_taken_minutes: number;
  passed: boolean;
}
