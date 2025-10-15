'use client';

import { useEffect, useState } from 'react';
import { TeachingTip } from '@/types/simulation';
import { X, Lightbulb, TrendingUp, BarChart2, AlertTriangle, Brain, Activity } from 'lucide-react';

interface TeachingTipPopupProps {
  tip: TeachingTip;
  onClose: () => void;
}

export default function TeachingTipPopup({ tip, onClose }: TeachingTipPopupProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = tip.duration_seconds * 1000;
    const interval = 50;
    const decrement = (100 * interval) / duration;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [tip.duration_seconds, onClose]);

  const getCategoryIcon = () => {
    switch (tip.category) {
      case 'candle_pattern':
        return <Activity className="text-blue-400" size={20} />;
      case 'chart_pattern':
        return <TrendingUp className="text-purple-400" size={20} />;
      case 'indicator':
        return <BarChart2 className="text-green-400" size={20} />;
      case 'risk_management':
        return <AlertTriangle className="text-yellow-400" size={20} />;
      case 'market_psychology':
        return <Brain className="text-pink-400" size={20} />;
      default:
        return <Lightbulb className="text-orange-400" size={20} />;
    }
  };

  const getCategoryColor = () => {
    switch (tip.category) {
      case 'candle_pattern':
        return 'from-blue-600 to-blue-700';
      case 'chart_pattern':
        return 'from-purple-600 to-purple-700';
      case 'indicator':
        return 'from-green-600 to-green-700';
      case 'risk_management':
        return 'from-yellow-600 to-yellow-700';
      case 'market_psychology':
        return 'from-pink-600 to-pink-700';
      default:
        return 'from-orange-600 to-orange-700';
    }
  };

  const getDifficultyBadge = () => {
    const colors = {
      beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
      intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[tip.difficulty_level];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-market-card border border-market-border rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${getCategoryColor()} p-4 relative`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-white/30">
            <div
              className="h-full bg-white transition-all duration-50 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {getCategoryIcon()}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-bold text-lg">{tip.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getDifficultyBadge()}`}>
                    {tip.difficulty_level}
                  </span>
                </div>
                <p className="text-white/80 text-xs capitalize">
                  {tip.category.replace('_', ' ')} • {tip.timestamp}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-gray-200 leading-relaxed">{tip.content}</p>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-300 text-sm">
              <span className="font-semibold">Look for: </span>
              {tip.visual_indicator}
            </p>
          </div>

          <div className="pt-2 border-t border-market-border">
            <p className="text-gray-400 text-xs">
              <span className="font-semibold">Related concept:</span> {tip.related_concept}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
