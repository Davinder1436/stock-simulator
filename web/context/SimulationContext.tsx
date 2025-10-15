'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { SimulationData, Portfolio, UserTrade, SimulationState, PricePoint, BotOrder, MarketNews, TeachingTip, ChapterInfo } from '@/types/simulation';

interface TipEntry {
  tip: TeachingTip;
  timestamp: string;
}

interface SimulationContextType {
  data: SimulationData | null;
  state: SimulationState;
  portfolio: Portfolio;
  currentPrice: number;
  currentPricePoint: PricePoint | null;
  visibleOrders: BotOrder[];
  visibleNews: MarketNews[];
  activeTips: TipEntry[];
  selectedChapter: ChapterInfo | null;
  loadChapter: (chapter: ChapterInfo | null) => void;
  startSimulation: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  executeTrade: (action: 'buy' | 'sell', quantity: number) => boolean;
  resetSimulation: () => void;
  dismissTip: (index: number) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

const INITIAL_CASH = 100000;

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SimulationData | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterInfo | null>(null);
  const [state, setState] = useState<SimulationState>({
    isRunning: false,
    isPaused: false,
    isComplete: false,
    currentTime: 0,
    currentTickIndex: 0,
  });
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: INITIAL_CASH,
    shares: 0,
    averageBuyPrice: 0,
    trades: [],
  });
  const [activeTips, setActiveTips] = useState<TipEntry[]>([]);
  const shownTipsRef = useRef<Set<string>>(new Set());

  // Load chapter data
  const loadChapter = useCallback((chapter: ChapterInfo | null) => {
    if (!chapter) {
      setData(null);
      setSelectedChapter(null);
      return;
    }
    
    fetch(`/${chapter.fileName}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setSelectedChapter(chapter);
        // Reset simulation state
        setState({
          isRunning: false,
          isPaused: false,
          isComplete: false,
          currentTime: 0,
          currentTickIndex: 0,
        });
        setPortfolio({
          cash: INITIAL_CASH,
          shares: 0,
          averageBuyPrice: 0,
          trades: [],
        });
        setActiveTips([]);
        shownTipsRef.current = new Set();
      })
      .catch(console.error);
  }, []);

  // Current market data
  const currentPricePoint = data && state.currentTickIndex < data.price_series.length 
    ? data.price_series[state.currentTickIndex] 
    : null;
  const currentPrice = currentPricePoint?.price || data?.simulation_metadata.base_price || 0;

  // Visible orders and news (up to current time)
  const visibleOrders = data?.bot_orders.filter(order => {
    const [min, sec] = order.timestamp.split(':').map(Number);
    const orderTime = min * 60 + sec;
    return orderTime <= state.currentTime;
  }) || [];

  const visibleNews = data?.market_news.filter(news => {
    const [min, sec] = news.timestamp.split(':').map(Number);
    const newsTime = min * 60 + sec;
    return newsTime <= state.currentTime;
  }) || [];

  // Timer logic with teaching tips
  useEffect(() => {
    if (!state.isRunning || state.isPaused || !data) return;

    const interval = setInterval(() => {
      setState(prev => {
        const newTime = prev.currentTime + 1;
        const newTickIndex = Math.floor(newTime / data.simulation_metadata.tick_interval_sec);
        
        if (newTime >= data.simulation_metadata.duration_minutes * 60) {
          return {
            ...prev,
            isRunning: false,
            isComplete: true,
            currentTime: data.simulation_metadata.duration_minutes * 60,
            currentTickIndex: data.price_series.length - 1,
          };
        }

        return {
          ...prev,
          currentTime: newTime,
          currentTickIndex: Math.min(newTickIndex, data.price_series.length - 1),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, state.isPaused, data]);

  // Separate effect for checking teaching tips
  useEffect(() => {
    if (!state.isRunning || state.isPaused || !data || !data.teaching_tips) return;
    
    const timestamp = `${String(Math.floor(state.currentTime / 60)).padStart(2, '0')}:${String(state.currentTime % 60).padStart(2, '0')}`;
    
    // Check if we've already shown this tip
    if (shownTipsRef.current.has(timestamp)) return;
    
    const tip = data.teaching_tips.find(t => t.timestamp === timestamp);
    
    if (tip) {
      setActiveTips(prevTips => [...prevTips, { tip, timestamp }]);
      shownTipsRef.current.add(timestamp);
    }
  }, [state.currentTime, state.isRunning, state.isPaused, data]);

  const startSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
  }, []);

  const pauseSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const executeTrade = useCallback((action: 'buy' | 'sell', quantity: number): boolean => {
    if (!currentPrice || quantity <= 0) return false;

    const totalCost = currentPrice * quantity;

    if (action === 'buy') {
      if (portfolio.cash < totalCost) {
        return false; // Insufficient funds
      }

      const newShares = portfolio.shares + quantity;
      const newAverageBuyPrice = portfolio.shares === 0 
        ? currentPrice 
        : (portfolio.averageBuyPrice * portfolio.shares + totalCost) / newShares;

      const trade: UserTrade = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: `${Math.floor(state.currentTime / 60)}:${(state.currentTime % 60).toString().padStart(2, '0')}`,
        action: 'buy',
        quantity,
        price: currentPrice,
        total: totalCost,
      };

      setPortfolio({
        cash: portfolio.cash - totalCost,
        shares: newShares,
        averageBuyPrice: newAverageBuyPrice,
        trades: [...portfolio.trades, trade],
      });
      return true;
    } else {
      if (portfolio.shares < quantity) {
        return false; // Insufficient shares
      }

      const trade: UserTrade = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: `${Math.floor(state.currentTime / 60)}:${(state.currentTime % 60).toString().padStart(2, '0')}`,
        action: 'sell',
        quantity,
        price: currentPrice,
        total: totalCost,
      };

      setPortfolio({
        cash: portfolio.cash + totalCost,
        shares: portfolio.shares - quantity,
        averageBuyPrice: portfolio.shares === quantity ? 0 : portfolio.averageBuyPrice,
        trades: [...portfolio.trades, trade],
      });
      return true;
    }
  }, [currentPrice, portfolio, state.currentTime]);

  const resetSimulation = useCallback(() => {
    setState({
      isRunning: false,
      isPaused: false,
      isComplete: false,
      currentTime: 0,
      currentTickIndex: 0,
    });
    setPortfolio({
      cash: INITIAL_CASH,
      shares: 0,
      averageBuyPrice: 0,
      trades: [],
    });
    setActiveTips([]);
    shownTipsRef.current = new Set();
  }, []);

  const dismissTip = useCallback((index: number) => {
    setActiveTips(prevTips => prevTips.filter((_, i) => i !== index));
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        data,
        state,
        portfolio,
        currentPrice,
        currentPricePoint,
        visibleOrders,
        visibleNews,
        activeTips,
        selectedChapter,
        loadChapter,
        startSimulation,
        pauseSimulation,
        resumeSimulation,
        executeTrade,
        resetSimulation,
        dismissTip,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
