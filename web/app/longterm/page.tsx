'use client';

import React, { useState, useEffect } from 'react';
import { LongTermSimulationProvider, useLongTermSimulation } from '@/context/LongTermSimulationContext';
import { PortfolioOverview } from '@/components/longterm/PortfolioOverview';
import { InvestmentPanel } from '@/components/longterm/InvestmentPanel';
import { LongTermNewsFeed } from '@/components/longterm/LongTermNewsFeed';
import { StatsPanel } from '@/components/longterm/StatsPanel';
import { TimelineControl } from '@/components/longterm/TimelineControl';
import { TeachingPopup } from '@/components/longterm/TeachingPopup';
import { 
  Wallet, 
  TrendingUp, 
  Newspaper, 
  BarChart3, 
  BookOpen, 
  ArrowLeft,
  Lock
} from 'lucide-react';

const chapters = [
  {
    id: 'chapter-1',
    title: 'Chapter 1: Basic SIP in Index Fund',
    subtitle: 'Single instrument, no complexity',
    description: 'Learn SIP, compounding basics',
    difficulty: 'Beginner',
    duration: '60 minutes',
    locked: false,
  },
  {
    id: 'chapter-2',
    title: 'Chapter 2: Multi-asset Allocation',
    subtitle: 'Equities + FDs + Gold',
    description: 'Learn diversification',
    difficulty: 'Beginner',
    duration: '60 minutes',
    locked: true,
  },
  {
    id: 'chapter-3',
    title: 'Chapter 3: Active Management',
    subtitle: 'Add mutual funds, sector rotation',
    description: 'Learn rebalancing',
    difficulty: 'Intermediate',
    duration: '60 minutes',
    locked: true,
  },
  {
    id: 'chapter-4',
    title: 'Chapter 4: Tax Optimization',
    subtitle: 'Tax-saving instruments',
    description: 'LTCG/STCG planning',
    difficulty: 'Intermediate',
    duration: '60 minutes',
    locked: true,
  },
  {
    id: 'chapter-5',
    title: 'Chapter 5: Life Events + Goals',
    subtitle: 'Handle emergencies, major expenses',
    description: 'Goal-based planning',
    difficulty: 'Advanced',
    duration: '60 minutes',
    locked: true,
  },
  {
    id: 'chapter-6',
    title: 'Chapter 6: Advanced Strategies',
    subtitle: 'Market timing (and why not to)',
    description: 'Bear market strategies, Retirement planning',
    difficulty: 'Advanced',
    duration: '60 minutes',
    locked: true,
  },
];

function LongTermSimulatorContent() {
  const { state, loadChapter } = useLongTermSimulation();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'invest' | 'news' | 'stats'>('portfolio');
  const [showChapterSelection, setShowChapterSelection] = useState(!state.selectedChapter);

  useEffect(() => {
    setShowChapterSelection(!state.selectedChapter);
  }, [state.selectedChapter]);

  const handleChapterSelect = async (chapterId: string) => {
    await loadChapter(chapterId);
    setShowChapterSelection(false);
  };

  const handleBackToChapters = () => {
    setShowChapterSelection(true);
  };

  if (showChapterSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Long-Term Investment Simulator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Master the art of wealth creation through systematic investing. Experience 5 years of investing in just 60 minutes!
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Interactive Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>Real Market Scenarios</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>Earn Badges</span>
              </div>
            </div>
          </div>

          {/* Chapter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter, idx) => (
              <div
                key={chapter.id}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all ${
                  chapter.locked
                    ? 'border-gray-200 dark:border-gray-700 opacity-75'
                    : 'border-blue-200 dark:border-blue-800 hover:border-blue-400 hover:shadow-xl cursor-pointer'
                }`}
                onClick={() => !chapter.locked && handleChapterSelect(chapter.id)}
              >
                {/* Chapter Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {idx + 1}
                </div>

                {/* Locked Badge */}
                {chapter.locked && (
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center shadow-lg">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        chapter.difficulty === 'Beginner' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : chapter.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {chapter.difficulty}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ⏱️ {chapter.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {chapter.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {chapter.description}
                    </p>
                  </div>

                  {!chapter.locked ? (
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                      Start Chapter
                    </button>
                  ) : (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-semibold py-3 rounded-lg text-center">
                      Complete Previous Chapters
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  What You'll Learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Systematic Investment Plans (SIP) and their power</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>The magic of compounding over time</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Asset allocation and diversification strategies</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Tax optimization (LTCG vs STCG)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Managing market volatility with discipline</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Goal-based investing and retirement planning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Teaching Popup */}
      <TeachingPopup />

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToChapters}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Long-Term Investment Simulator
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Build wealth through disciplined investing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {state.achievements.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    🏆 {state.achievements.length} Badges
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Timeline Control */}
          <div className="lg:col-span-3">
            <TimelineControl />
          </div>

          {/* Left Column - Portfolio Overview */}
          <div className="lg:col-span-1 space-y-6">
            <PortfolioOverview />
          </div>

          {/* Middle & Right Columns - Tabbed Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('invest')}
                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'invest'
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Wallet className="w-4 h-4" />
                      <span>Invest</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('news')}
                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'news'
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Newspaper className="w-4 h-4" />
                      <span>Events & News</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'stats'
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Stats & Tax</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'invest' && <InvestmentPanel />}
                {activeTab === 'news' && <LongTermNewsFeed />}
                {activeTab === 'stats' && <StatsPanel />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LongTermPage() {
  return (
    <LongTermSimulationProvider>
      <LongTermSimulatorContent />
    </LongTermSimulationProvider>
  );
}
