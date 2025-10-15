export interface SimulationMetadata {
  chapter: number;
  title: string;
  real_case_reference: string;
  stock_name: string;
  stock_symbol: string;
  base_price: number;
  difficulty: 'easy' | 'medium' | 'hard';
  duration_minutes: number;
  tick_interval_sec: number;
  total_ticks: number;
  learning_objectives: string[];
  market_context: string;
  expected_outcome: string;
}

export interface MarketNews {
  timestamp: string;
  headline: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact_strength: number;
  expected_effect: string;
  sector_context: string;
  trigger_type: string;
}

export interface BotOrder {
  timestamp: string;
  actor_id: string;
  actor_type: string;
  action: 'buy' | 'sell';
  quantity: number;
  price: number;
  reason: string;
  emotion_index: number;
  reaction_speed: number;
  influence_weight: number;
}

export interface PricePoint {
  timestamp: string;
  price: number;
  volume: number;
  trend: 'up' | 'down' | 'flat' | 'volatile';
  dominant_actor: string;
  sentiment_index: number;
  candle_pattern?: 'doji' | 'hammer' | 'shooting_star' | 'marubozu' | 'engulfing_bull' | 'engulfing_bear' | 'spinning_top' | 'none';
}

export interface TeachingTip {
  timestamp: string;
  category: 'candle_pattern' | 'chart_pattern' | 'indicator' | 'concept' | 'risk_management' | 'market_psychology';
  title: string;
  content: string;
  related_concept: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  visual_indicator: string;
  duration_seconds: number;
}

export interface DifficultyCalibration {
  complexity_score: number;
  noise_level: 'low' | 'medium' | 'high' | 'extreme';
  trend_clarity: 'low' | 'medium' | 'high' | 'extreme-chaotic';
  volatility: 'low' | 'medium' | 'high' | 'medium-high' | 'extreme';
  actor_diversity: 'low' | 'moderate' | 'high' | 'moderate-high' | 'very high';
  news_frequency: 'low' | 'medium' | 'high' | 'very high';
  teaching_focus: string;
}

export interface LearningModule {
  pre_simulation_briefing: {
    context: string;
    key_concepts: string[];
    what_to_watch: string[];
  };
  post_simulation_analysis: {
    what_happened: string;
    key_lessons: Array<{
      lesson: string;
      explanation: string;
    }>;
    trading_principles_demonstrated: string[];
    quiz_questions: Array<{
      question: string;
      options: string[];
      correct_answer: number;
      explanation: string;
    }>;
  };
  real_world_connection: {
    case_study: string;
    historical_context: string;
    parallel_analysis: string;
    modern_relevance: string;
  };
}

export interface SimulationData {
  simulation_metadata: SimulationMetadata;
  market_news: MarketNews[];
  bot_orders: BotOrder[];
  price_series: PricePoint[];
  teaching_tips?: TeachingTip[];
  learning_module: LearningModule;
  difficulty_calibration?: DifficultyCalibration;
}

export interface ChapterInfo {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  fileName: string;
}

export interface UserTrade {
  id: string;
  timestamp: string;
  action: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
}

export interface Portfolio {
  cash: number;
  shares: number;
  averageBuyPrice: number;
  trades: UserTrade[];
}

export interface SimulationState {
  isRunning: boolean;
  isPaused: boolean;
  isComplete: boolean;
  currentTime: number; // in seconds
  currentTickIndex: number;
}
