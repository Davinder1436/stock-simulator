'use client';

import { ChapterInfo } from '@/types/simulation';
import { BookOpen, TrendingUp, Zap, Target } from 'lucide-react';

const chapters: ChapterInfo[] = [
  {
    id: 1,
    title: 'The Calm Before the Rally',
    difficulty: 'easy',
    description: 'Introduction to stock trading basics. Learn fundamental concepts in a stable market with clear trends and minimal volatility.',
    fileName: 'chapter1-data.json',
  },
  {
    id: 6,
    title: 'The Inflation Scare',
    difficulty: 'medium',
    description: 'Experience macro-driven selloffs and increased volatility. Learn about bearish patterns, RSI indicators, and risk management.',
    fileName: 'chapter6-data.json',
  },
  {
    id: 11,
    title: 'Flash Crash Frenzy',
    difficulty: 'hard',
    description: 'Face extreme market conditions with a simulated flash crash. Master advanced patterns, liquidity dynamics, and crisis management.',
    fileName: 'chapter11-data.json',
  },
];

interface ChapterSelectionProps {
  onSelectChapter: (chapter: ChapterInfo) => void;
}

export default function ChapterSelection({ onSelectChapter }: ChapterSelectionProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'from-green-600 to-emerald-600';
      case 'medium':
        return 'from-yellow-600 to-orange-600';
      case 'hard':
        return 'from-red-600 to-rose-600';
      default:
        return 'from-blue-600 to-purple-600';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Target className="text-green-400" size={24} />;
      case 'medium':
        return <TrendingUp className="text-yellow-400" size={24} />;
      case 'hard':
        return <Zap className="text-red-400" size={24} />;
      default:
        return <BookOpen className="text-blue-400" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-market-bg flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg">
              <BookOpen size={32} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white">Dhaniverse Market Simulator</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Learn stock trading through immersive, data-driven simulations
          </p>
        </div>

        {/* Chapter Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-market-card border border-market-border rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer group"
              onClick={() => onSelectChapter(chapter)}
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${getDifficultyColor(chapter.difficulty)} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 opacity-10">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <path d="M0,100 L50,50 L100,80 L150,30 L200,60" stroke="white" strokeWidth="4" fill="none" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/80 text-sm font-semibold">CHAPTER {chapter.id}</span>
                    {getDifficultyIcon(chapter.difficulty)}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{chapter.title}</h2>
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold uppercase">
                    {chapter.difficulty}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {chapter.description}
                </p>

                {/* Features based on difficulty */}
                <div className="space-y-2 mb-6">
                  {chapter.difficulty === 'easy' && (
                    <>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span>Basic candlestick patterns</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span>Clear trends & low volatility</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span>Fundamental concepts</span>
                      </div>
                    </>
                  )}
                  {chapter.difficulty === 'medium' && (
                    <>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span>Advanced patterns & indicators</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span>Moderate volatility & news impact</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span>Risk management focus</span>
                      </div>
                    </>
                  )}
                  {chapter.difficulty === 'hard' && (
                    <>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <span>Extreme volatility & flash crash</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <span>High-frequency trading dynamics</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <span>Crisis management & psychology</span>
                      </div>
                    </>
                  )}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                  Start Chapter {chapter.id}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>💡 Each chapter teaches unique concepts through real market scenarios</p>
          <p className="mt-2">Start with Chapter 1 if you're new to trading</p>
        </div>
      </div>
    </div>
  );
}
