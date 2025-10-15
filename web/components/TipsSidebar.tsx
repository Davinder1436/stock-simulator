'use client';

import { TeachingTip } from '@/types/simulation';
import { X, BookOpen, TrendingUp, AlertTriangle, Target, Trophy, Zap } from 'lucide-react';

interface TipEntry {
  tip: TeachingTip;
  timestamp: string;
}

interface TipsSidebarProps {
  tips: TipEntry[];
  onDismiss: (index: number) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'candle_pattern':
    case 'chart_pattern':
      return <TrendingUp className="w-4 h-4" />;
    case 'risk_management':
      return <AlertTriangle className="w-4 h-4" />;
    case 'market_psychology':
      return <Target className="w-4 h-4" />;
    case 'indicator':
      return <Zap className="w-4 h-4" />;
    case 'concept':
      return <Trophy className="w-4 h-4" />;
    default:
      return <BookOpen className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'candle_pattern':
    case 'chart_pattern':
      return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    case 'risk_management':
      return 'text-red-400 border-red-500/30 bg-red-500/10';
    case 'market_psychology':
      return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
    case 'indicator':
      return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    case 'concept':
      return 'text-green-400 border-green-500/30 bg-green-500/10';
    default:
      return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
  }
};

export default function TipsSidebar({ tips, onDismiss }: TipsSidebarProps) {
  if (tips.length === 0) return null;

  return (
    <div className="fixed right-4 top-20 bottom-4 w-80 flex flex-col gap-2 pointer-events-none z-40">
      <div className="flex-1 overflow-y-auto space-y-2 pointer-events-auto scrollbar-thin scrollbar-thumb-market-border scrollbar-track-transparent">
        {tips.map((entry, index) => {
          const colorClass = getCategoryColor(entry.tip.category);
          
          return (
            <div
              key={index}
              className={`border rounded-lg backdrop-blur-sm shadow-lg p-4 ${colorClass} animate-slide-in-right`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(entry.tip.category)}
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {entry.tip.category.replace('_', ' ')}
                  </span>
                </div>
                <button
                  onClick={() => onDismiss(index)}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                  title="Dismiss tip"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <h4 className="text-sm font-bold text-white mb-2">{entry.tip.title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">{entry.tip.content}</p>
              
              {entry.tip.related_concept && (
                <div className="text-xs text-gray-400 italic border-l-2 border-current pl-2 mb-2">
                  � Related: {entry.tip.related_concept}
                </div>
              )}
              
              <div className="mt-3 pt-2 border-t border-current/20 flex items-center justify-between text-[10px] text-gray-400">
                <span>at {entry.timestamp}</span>
                {entry.tip.difficulty_level === 'advanced' && (
                  <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded font-semibold">
                    ADVANCED
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
