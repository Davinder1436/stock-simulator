'use client';

import { useState } from 'react';
import { useSimulation } from '@/context/SimulationContext';
import MarketView from '@/components/MarketView';
import OrderBook from '@/components/OrderBook';
import Portfolio from '@/components/Portfolio';
import NewsFeed from '@/components/NewsFeed';
import Timer from '@/components/Timer';
import LearningModule from '@/components/LearningModule';
import ChapterSelection from '@/components/ChapterSelection';
import TipsSidebar from '@/components/TipsSidebar';
import { BarChart3, Newspaper, BookOpen, Info, ArrowLeft } from 'lucide-react';
import { ChapterInfo } from '@/types/simulation';

export default function Home() {
  const { data, state, loadChapter, selectedChapter, activeTips, dismissTip } = useSimulation();
  const [activeTab, setActiveTab] = useState<'market' | 'news'>('market');

  // Show chapter selection if no chapter is loaded
  if (!selectedChapter) {
    return <ChapterSelection onSelectChapter={loadChapter} />;
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading market simulation...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-market-bg">
      {/* Header */}
      <header className="bg-market-card border-b border-market-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => loadChapter(null)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-market-border rounded-lg"
                title="Back to chapter selection"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <BarChart3 size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Dhaniverse Market Simulator</h1>
                <p className="text-sm text-gray-400">
                  Chapter {data.simulation_metadata.chapter}: {data.simulation_metadata.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Pre-simulation briefing */}
      {!state.isRunning && state.currentTime === 0 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-6">
            <div className="flex items-start gap-3 mb-4">
              <BookOpen size={24} className="flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Before You Begin</h2>
                <p className="text-blue-100 leading-relaxed mb-4">
                  {data.learning_module.pre_simulation_briefing.context}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-100 mb-2">Key Concepts</h3>
                <ul className="space-y-1">
                  {data.learning_module.pre_simulation_briefing.key_concepts.map((concept, idx) => (
                    <li key={idx} className="text-sm text-white/90">• {concept}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-100 mb-2">What to Watch</h3>
                <ul className="space-y-1">
                  {data.learning_module.pre_simulation_briefing.what_to_watch.map((item, idx) => (
                    <li key={idx} className="text-sm text-white/90">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
            <Info className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-blue-100">
              <p className="font-semibold mb-1">Starting Capital: ₹1,00,000</p>
              <p>Use the timer to start the simulation. You can buy and sell stocks as the market moves. Your goal is to learn market behavior and make informed decisions!</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Market View & Order Book */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 bg-market-card border border-market-border rounded-lg p-1">
              <button
                onClick={() => setActiveTab('market')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded transition-colors ${
                  activeTab === 'market'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <BarChart3 size={18} />
                <span className="font-medium">Market View</span>
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded transition-colors ${
                  activeTab === 'news'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Newspaper size={18} />
                <span className="font-medium">News Feed</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'market' ? <MarketView /> : <NewsFeed />}

            {/* Order Book */}
            <OrderBook />
          </div>

          {/* Right Column - Portfolio & Timer */}
          <div className="space-y-6">
            <Timer />
            <Portfolio />
          </div>
        </div>
      </div>

      {/* Learning Module (shown when complete) */}
      {state.isComplete && <LearningModule />}

      {/* Teaching Tips Sidebar */}
      <TipsSidebar tips={activeTips} onDismiss={dismissTip} />
    </main>
  );
}
