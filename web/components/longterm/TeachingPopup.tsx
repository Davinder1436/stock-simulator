'use client';

import React from 'react';
import { useLongTermSimulation } from '@/context/LongTermSimulationContext';
import { X, Lightbulb, BookOpen, TrendingUp } from 'lucide-react';

export const TeachingPopup: React.FC = () => {
  const { state, dismissTeachingPopup } = useLongTermSimulation();

  if (!state.showTeachingPopup || !state.currentTeachingMoment) return null;

  const { currentTeachingMoment } = state;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl text-white relative">
          <button
            onClick={dismissTeachingPopup}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-lg">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-purple-100">Learning Moment</div>
              <h2 className="text-2xl font-bold">{currentTeachingMoment.concept}</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Main Explanation */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Explanation
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentTeachingMoment.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* Tip */}
          {currentTeachingMoment.tip && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <div className="text-xl">💡</div>
                <div>
                  <div className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                    Pro Tip
                  </div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    {currentTeachingMoment.tip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Example */}
          {currentTeachingMoment.example && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                    Example
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    {currentTeachingMoment.example}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Calculation */}
          {currentTeachingMoment.calculation && (
            <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Calculation
              </div>
              <pre className="text-xs text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap">
                {currentTeachingMoment.calculation}
              </pre>
            </div>
          )}

          {/* Stats */}
          {currentTeachingMoment.stats && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="text-sm font-semibold text-green-900 dark:text-green-200 mb-2">
                Your Progress
              </div>
              <div className="space-y-2">
                {Object.entries(currentTeachingMoment.stats).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="font-semibold text-green-900 dark:text-green-100">
                      {typeof value === 'number' 
                        ? value.toLocaleString() 
                        : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insight */}
          {currentTeachingMoment.insight && (
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <div className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-1">
                💎 Key Insight
              </div>
              <p className="text-sm text-purple-800 dark:text-purple-300">
                {currentTeachingMoment.insight}
              </p>
            </div>
          )}

          {/* Action Required */}
          {currentTeachingMoment.actionRequired && (
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <div className="text-sm font-semibold text-orange-900 dark:text-orange-200 mb-1">
                ⚡ Action Required
              </div>
              <p className="text-sm text-orange-800 dark:text-orange-300">
                {currentTeachingMoment.actionRequired}
              </p>
            </div>
          )}

          {/* Recommendation */}
          {currentTeachingMoment.recommendation && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <div className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 mb-1">
                ✅ Recommendation
              </div>
              <p className="text-sm text-indigo-800 dark:text-indigo-300">
                {currentTeachingMoment.recommendation}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <button
            onClick={dismissTeachingPopup}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Got it! Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};
