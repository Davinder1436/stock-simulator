'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  LongTermChapterData,
  SimulationState,
  TimelineMonth,
  TeachingMoment,
  InvestmentDistribution,
  UserPortfolio,
  AssetHolding,
  FixedDepositHolding,
} from '@/types/longterm';

interface LongTermSimulationContextType {
  state: SimulationState;
  currentMonthData: TimelineMonth | null;
  loadChapter: (chapterId: string) => Promise<void>;
  startSimulation: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  resetSimulation: () => void;
  setSpeed: (speed: number) => void;
  goToMonth: (month: number) => void;
  recordDecision: (decision: string, value: any) => void;
  dismissTeachingPopup: () => void;
  skipToEnd: () => void;
  updateInvestmentDistribution: (distribution: InvestmentDistribution) => void;
  createFixedDeposit: (amount: number) => void;
  breakFixedDeposit: (fdId: string) => void;
}

const LongTermSimulationContext = createContext<LongTermSimulationContextType | undefined>(
  undefined
);

export const useLongTermSimulation = () => {
  const context = useContext(LongTermSimulationContext);
  if (!context) {
    throw new Error('useLongTermSimulation must be used within LongTermSimulationProvider');
  }
  return context;
};

// Helper function to calculate portfolio value based on market data
const calculatePortfolioValue = (
  portfolio: UserPortfolio,
  monthData: TimelineMonth,
  chapterData: LongTermChapterData | null
): UserPortfolio => {
  if (!chapterData) return portfolio;

  const newHoldings: { [assetId: string]: AssetHolding } = {};
  let totalCurrentValue = portfolio.cash;
  let totalInvested = 0;

  // Calculate value for each asset
  Object.keys(portfolio.assetHoldings).forEach((assetId) => {
    const holding = portfolio.assetHoldings[assetId];
    let currentPrice = 0;

    // Get current price based on asset type
    if (assetId === 'nifty50-index') {
      currentPrice = monthData.marketData.nifty50Index;
    } else if (assetId === 'gold') {
      currentPrice = monthData.marketData.goldPrice;
    } else if (assetId === 'government-bonds') {
      // For bonds, calculate based on returns
      const monthlyReturn = monthData.marketData.governmentBondsMonthlyReturn / 100;
      currentPrice = holding.averageCost * (1 + monthlyReturn);
    } else if (assetId === 'savings-account') {
      const monthlyReturn = monthData.marketData.savingsAccountMonthlyReturn / 100;
      currentPrice = holding.averageCost * (1 + monthlyReturn);
    }

    const currentValue = holding.units * currentPrice;
    const returns = currentValue - holding.invested;
    const returnsPercentage = holding.invested > 0 ? (returns / holding.invested) * 100 : 0;

    newHoldings[assetId] = {
      ...holding,
      currentValue,
      returns,
      returnsPercentage,
    };

    totalCurrentValue += currentValue;
    totalInvested += holding.invested;
  });

  // Calculate FD values
  const updatedFDs = portfolio.fixedDeposits.map((fd) => {
    if (fd.status === 'broken') return fd;

    const monthsElapsed = monthData.month - fd.startMonth;
    if (monthsElapsed >= 12 && fd.status === 'active') {
      // FD has matured
      return {
        ...fd,
        status: 'matured' as const,
        currentValue: fd.maturityValue,
      };
    }

    // Calculate current value with accrued interest
    const monthlyRate = fd.rateAtStart / 12 / 100;
    const currentValue = fd.amount * Math.pow(1 + monthlyRate, monthsElapsed);

    return {
      ...fd,
      currentValue,
    };
  });

  const fdValue = updatedFDs.reduce((sum, fd) => sum + fd.currentValue, 0);
  const fdInvested = updatedFDs.reduce((sum, fd) => sum + fd.amount, 0);
  totalCurrentValue += fdValue;
  totalInvested += fdInvested;

  const totalReturns = totalCurrentValue - portfolio.cash - totalInvested;
  const totalReturnsPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

  return {
    ...portfolio,
    assetHoldings: newHoldings,
    fixedDeposits: updatedFDs,
    currentValue: totalCurrentValue,
    totalInvested,
    totalReturns,
    totalReturnsPercentage,
  };
};

// Helper function to process monthly investment
const processMonthlyInvestment = (
  portfolio: UserPortfolio,
  distribution: InvestmentDistribution,
  monthData: TimelineMonth,
  chapterData: LongTermChapterData | null
): UserPortfolio => {
  if (!chapterData) return portfolio;

  const newHoldings = { ...portfolio.assetHoldings };
  let remainingCash = portfolio.cash;

  Object.keys(distribution).forEach((assetId) => {
    const investmentAmount = distribution[assetId];
    if (investmentAmount <= 0 || investmentAmount > remainingCash) return;

    if (assetId === 'fixed-deposit') {
      // Don't process FD here, handled separately
      return;
    }

    let price = 0;
    if (assetId === 'nifty50-index') {
      price = monthData.marketData.nifty50Index;
    } else if (assetId === 'gold') {
      price = monthData.marketData.goldPrice;
    } else if (assetId === 'government-bonds') {
      price = 1000; // Assuming bonds are priced at ₹1000 per unit
    } else if (assetId === 'savings-account') {
      price = 1; // Cash equivalent
    }

    if (price === 0) return;

    const units = investmentAmount / price;
    
    if (!newHoldings[assetId]) {
      newHoldings[assetId] = {
        assetId,
        units: 0,
        averageCost: 0,
        currentValue: 0,
        invested: 0,
        returns: 0,
        returnsPercentage: 0,
        monthlyInvestment: investmentAmount,
      };
    }

    const holding = newHoldings[assetId];
    const totalUnits = holding.units + units;
    const totalInvested = holding.invested + investmentAmount;
    const averageCost = totalInvested / totalUnits;

    newHoldings[assetId] = {
      ...holding,
      units: totalUnits,
      averageCost,
      invested: totalInvested,
      monthlyInvestment: investmentAmount,
    };

    remainingCash -= investmentAmount;
  });

  return {
    ...portfolio,
    cash: remainingCash,
    assetHoldings: newHoldings,
  };
};

export const LongTermSimulationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<SimulationState>({
    isRunning: false,
    isPaused: false,
    currentMonth: 0,
    speed: 1,
    selectedChapter: null,
    chapterData: null,
    userDecisions: {},
    showTeachingPopup: false,
    currentTeachingMoment: null,
    achievements: [],
    investmentDistribution: {},
    userPortfolio: {
      cash: 50000,
      assetHoldings: {},
      fixedDeposits: [],
      totalInvested: 0,
      currentValue: 50000,
      totalReturns: 0,
      totalReturnsPercentage: 0,
    },
    monthlyIncome: 50000,
    monthlyExpenses: 30000,
  });

  const [currentMonthData, setCurrentMonthData] = useState<TimelineMonth | null>(null);

  // Load chapter data
  const loadChapter = useCallback(async (chapterId: string) => {
    try {
      const response = await fetch(`/chapter1-longterm-data-dynamic.json`);
      const data: LongTermChapterData = await response.json();
      
      setState(prev => ({
        ...prev,
        selectedChapter: chapterId,
        chapterData: data,
        currentMonth: 0,
        isRunning: false,
        isPaused: false,
        investmentDistribution: {},
        userPortfolio: {
          cash: data.chapterInfo.initialSetup.userProfile.initialSavings,
          assetHoldings: {},
          fixedDeposits: [],
          totalInvested: 0,
          currentValue: data.chapterInfo.initialSetup.userProfile.initialSavings,
          totalReturns: 0,
          totalReturnsPercentage: 0,
        },
        monthlyIncome: data.chapterInfo.initialSetup.userProfile.monthlySalary,
        monthlyExpenses: data.chapterInfo.initialSetup.userProfile.monthlyExpenses,
      }));

      if (data.timeline && data.timeline.length > 0) {
        setCurrentMonthData(data.timeline[0]);
        
        // Show initial teaching moments
        const initialEvents = data.timeline[0].events.filter(
          e => e.teachingMoment && e.teachingMoment.popupTiming === 'immediate'
        );
        if (initialEvents.length > 0 && initialEvents[0].teachingMoment) {
          setState(prev => ({
            ...prev,
            showTeachingPopup: true,
            currentTeachingMoment: initialEvents[0].teachingMoment!,
          }));
        }
      }
    } catch (error) {
      console.error('Error loading chapter:', error);
    }
  }, []);

  // Update current month data when month changes
  useEffect(() => {
    if (state.chapterData && state.chapterData.timeline) {
      const monthData = state.chapterData.timeline.find(
        m => m.month === state.currentMonth
      );
      if (monthData) {
        setCurrentMonthData(monthData);

        // Update income and expenses from timeline
        setState(prev => ({
          ...prev,
          monthlyIncome: monthData.salaryExpenses.monthlySalary,
          monthlyExpenses: monthData.salaryExpenses.monthlyExpenses,
        }));

        // Process monthly investment and update portfolio
        setState(prev => {
          // Add monthly cash flow
          let newPortfolio = {
            ...prev.userPortfolio,
            cash: prev.userPortfolio.cash + monthData.salaryExpenses.availableToInvest,
          };

          // Process monthly investments based on distribution
          if (Object.keys(prev.investmentDistribution).length > 0) {
            newPortfolio = processMonthlyInvestment(
              newPortfolio,
              prev.investmentDistribution,
              monthData,
              prev.chapterData
            );
          }

          // Calculate current values based on market data
          newPortfolio = calculatePortfolioValue(newPortfolio, monthData, prev.chapterData);

          return {
            ...prev,
            userPortfolio: newPortfolio,
          };
        });

        // Check for teaching moments
        const teachingEvents = monthData.events.filter(
          e => e.teachingMoment && e.teachingMoment.popupTiming === 'immediate'
        );
        if (teachingEvents.length > 0 && teachingEvents[0].teachingMoment) {
          setState(prev => ({
            ...prev,
            showTeachingPopup: true,
            currentTeachingMoment: teachingEvents[0].teachingMoment!,
          }));
        }

        // Check for milestones and achievements
        if (monthData.userFinancials && monthData.userFinancials.milestone) {
          setState(prev => ({
            ...prev,
            achievements: [
              ...prev.achievements,
              monthData.userFinancials!.milestone!.badge,
            ],
          }));
        }
      }
    }
  }, [state.currentMonth, state.chapterData]);

  // Simulation timer
  useEffect(() => {
    if (!state.isRunning || state.isPaused || !state.chapterData) return;

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.currentMonth >= prev.chapterData!.chapterInfo.totalMonths) {
          return { ...prev, isRunning: false };
        }
        return { ...prev, currentMonth: prev.currentMonth + 1 };
      });
    }, 60000 / state.speed); // 60 seconds per month, adjusted by speed

    return () => clearInterval(interval);
  }, [state.isRunning, state.isPaused, state.speed, state.chapterData]);

  const startSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
  }, []);

  const pauseSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const resetSimulation = useCallback(() => {
    if (!state.chapterData) return;
    
    setState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      currentMonth: 0,
      userDecisions: {},
      achievements: [],
      investmentDistribution: {},
      userPortfolio: {
        cash: prev.chapterData!.chapterInfo.initialSetup.userProfile.initialSavings,
        assetHoldings: {},
        fixedDeposits: [],
        totalInvested: 0,
        currentValue: prev.chapterData!.chapterInfo.initialSetup.userProfile.initialSavings,
        totalReturns: 0,
        totalReturnsPercentage: 0,
      },
      monthlyIncome: prev.chapterData!.chapterInfo.initialSetup.userProfile.monthlySalary,
      monthlyExpenses: prev.chapterData!.chapterInfo.initialSetup.userProfile.monthlyExpenses,
    }));
    
    if (state.chapterData && state.chapterData.timeline.length > 0) {
      setCurrentMonthData(state.chapterData.timeline[0]);
    }
  }, [state.chapterData]);

  const setSpeed = useCallback((speed: number) => {
    setState(prev => ({ ...prev, speed }));
  }, []);

  const goToMonth = useCallback((month: number) => {
    setState(prev => ({
      ...prev,
      currentMonth: Math.min(
        month,
        prev.chapterData?.chapterInfo.totalMonths || 60
      ),
    }));
  }, []);

  const recordDecision = useCallback((decision: string, value: any) => {
    setState(prev => ({
      ...prev,
      userDecisions: {
        ...prev.userDecisions,
        [decision]: value,
      },
    }));
  }, []);

  const dismissTeachingPopup = useCallback(() => {
    setState(prev => ({
      ...prev,
      showTeachingPopup: false,
      currentTeachingMoment: null,
    }));
  }, []);

  const skipToEnd = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentMonth: prev.chapterData?.chapterInfo.totalMonths || 60,
      isRunning: false,
    }));
  }, []);

  const updateInvestmentDistribution = useCallback((distribution: InvestmentDistribution) => {
    setState(prev => ({
      ...prev,
      investmentDistribution: distribution,
    }));
  }, []);

  const createFixedDeposit = useCallback((amount: number) => {
    if (!currentMonthData) return;

    setState(prev => {
      if (prev.userPortfolio.cash < amount) return prev;

      const newFD: FixedDepositHolding = {
        fdId: `fd-${Date.now()}`,
        amount,
        startMonth: prev.currentMonth,
        maturityMonth: prev.currentMonth + 12,
        rateAtStart: currentMonthData.marketData.fdRate,
        status: 'active',
        maturityValue: amount * (1 + currentMonthData.marketData.fdRate / 100),
        currentValue: amount,
      };

      return {
        ...prev,
        userPortfolio: {
          ...prev.userPortfolio,
          cash: prev.userPortfolio.cash - amount,
          fixedDeposits: [...prev.userPortfolio.fixedDeposits, newFD],
        },
      };
    });
  }, [currentMonthData]);

  const breakFixedDeposit = useCallback((fdId: string) => {
    setState(prev => {
      const fdIndex = prev.userPortfolio.fixedDeposits.findIndex(fd => fd.fdId === fdId);
      if (fdIndex === -1) return prev;

      const fd = prev.userPortfolio.fixedDeposits[fdIndex];
      if (fd.status !== 'active') return prev;

      // Calculate penalty
      const earlyWithdrawal = fd.currentValue * 0.5; // 50% penalty on returns
      const returnAmount = fd.amount + (fd.currentValue - fd.amount) * 0.5;

      const updatedFDs = [...prev.userPortfolio.fixedDeposits];
      updatedFDs[fdIndex] = {
        ...fd,
        status: 'broken',
        currentValue: returnAmount,
      };

      return {
        ...prev,
        userPortfolio: {
          ...prev.userPortfolio,
          cash: prev.userPortfolio.cash + returnAmount,
          fixedDeposits: updatedFDs,
        },
      };
    });
  }, []);

  return (
    <LongTermSimulationContext.Provider
      value={{
        state,
        currentMonthData,
        loadChapter,
        startSimulation,
        pauseSimulation,
        resumeSimulation,
        resetSimulation,
        setSpeed,
        goToMonth,
        recordDecision,
        dismissTeachingPopup,
        skipToEnd,
        updateInvestmentDistribution,
        createFixedDeposit,
        breakFixedDeposit,
      }}
    >
      {children}
    </LongTermSimulationContext.Provider>
  );
};
