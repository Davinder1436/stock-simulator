export interface ChapterInfo {
  chapterId: string;
  title: string;
  subtitle: string;
  duration: number;
  timeScale: string;
  totalMonths: number;
  difficulty: string;
  objectives: string[];
  initialSetup: {
    userProfile: UserProfile;
    goalToAchieve: GoalToAchieve;
  };
}

export interface UserProfile {
  name: string;
  age: number;
  monthlySalary: number;
  monthlyExpenses: number;
  availableToInvest: number;
  initialSavings: number;
  emergencyFund: number;
  riskProfile: string;
}

export interface GoalToAchieve {
  targetAmount: number;
  purpose: string;
  timeframe: string;
}

export interface InvestmentOption {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  minInvestment: number;
  lockInPeriod: number;
  taxImplication: {
    [key: string]: string;
  };
  historicalReturn: string;
  riskLevel: string;
  liquidity: string;
  volatilityFactor: number;
  earlyWithdrawalPenalty?: number;
}

export interface TeachingMoment {
  concept: string;
  explanation: string;
  tip?: string;
  example?: string;
  calculation?: string;
  stats?: any;
  insight?: string;
  perspective?: string;
  action?: string;
  actionRequired?: string;
  recommendation?: string;
  taxSaving?: string;
  comparison?: string;
  visualization?: string;
  popupTiming: string;
}

export interface TimelineEvent {
  type: string;
  title: string;
  description: string;
  impact?: string;
  teachingMoment?: TeachingMoment;
  options?: string[];
  recommendation?: string;
}

export interface NewsItem {
  headline: string;
  impact: string;
  affectedAssets: string[];
  sentiment: string;
  marketImpact?: {
    [assetId: string]: number;
  };
}

export interface MarketData {
  nifty50Index: number;
  nifty50MonthlyReturn: number;
  governmentBondsRate: number;
  governmentBondsMonthlyReturn: number;
  fdRate: number;
  fdMonthlyReturn: number;
  inflationRate: number;
  goldPrice: number;
  goldMonthlyReturn: number;
  savingsAccountRate: number;
  savingsAccountMonthlyReturn: number;
  sentiment: string;
  volatilityIndex: number;
}

export interface PortfolioBreakdown {
  [key: string]: number;
}

export interface Milestone {
  type: string;
  message: string;
  badge: string;
}

export interface UserFinancials {
  totalInvested: number;
  currentValue: number;
  returns: number;
  returnsPercentage: number;
  xirr?: number;
  cashAvailable: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  portfolioBreakdown: PortfolioBreakdown;
  totalNetWorth?: number;
  milestone?: Milestone;
}

export interface TimelineMonth {
  month: number;
  timestamp: string;
  realDate: string;
  events: TimelineEvent[];
  marketData: MarketData;
  news?: NewsItem[];
  salaryExpenses: {
    monthlySalary: number;
    monthlyExpenses: number;
    availableToInvest: number;
    salaryChangePercent: number;
    expensesChangePercent: number;
  };
  userFinancials?: UserFinancials; // Made optional - will be calculated
}

export interface InvestmentDistribution {
  [assetId: string]: number; // asset ID to monthly amount
}

export interface AssetHolding {
  assetId: string;
  units: number;
  averageCost: number;
  currentValue: number;
  invested: number;
  returns: number;
  returnsPercentage: number;
  monthlyInvestment: number;
}

export interface FixedDepositHolding {
  fdId: string;
  amount: number;
  startMonth: number;
  maturityMonth: number;
  rateAtStart: number;
  status: 'active' | 'matured' | 'broken';
  maturityValue: number;
  currentValue: number;
}

export interface UserPortfolio {
  cash: number;
  assetHoldings: {
    [assetId: string]: AssetHolding;
  };
  fixedDeposits: FixedDepositHolding[];
  totalInvested: number;
  currentValue: number;
  totalReturns: number;
  totalReturnsPercentage: number;
  xirr?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  title: string;
  passingScore: number;
  totalQuestions: number;
  questions: QuizQuestion[];
}

export interface LongTermChapterData {
  chapterInfo: ChapterInfo;
  availableInvestmentOptions: InvestmentOption[];
  timeline: TimelineMonth[];
  quiz: Quiz;
  performanceMetrics?: any;
}

export interface SimulationState {
  isRunning: boolean;
  isPaused: boolean;
  currentMonth: number;
  speed: number;
  selectedChapter: string | null;
  chapterData: LongTermChapterData | null;
  userDecisions: {
    [key: string]: any;
  };
  showTeachingPopup: boolean;
  currentTeachingMoment: TeachingMoment | null;
  achievements: string[];
  investmentDistribution: InvestmentDistribution;
  userPortfolio: UserPortfolio;
  monthlyIncome: number;
  monthlyExpenses: number;
}
