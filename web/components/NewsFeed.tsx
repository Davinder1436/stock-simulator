'use client';

import { useSimulation } from '@/context/SimulationContext';
import { Newspaper, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export default function NewsFeed() {
  const { visibleNews } = useSimulation();

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="text-market-green" size={20} />;
      case 'negative':
        return <TrendingDown className="text-market-red" size={20} />;
      default:
        return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'border-l-market-green bg-green-500/5';
      case 'negative':
        return 'border-l-market-red bg-red-500/5';
      default:
        return 'border-l-gray-500 bg-gray-500/5';
    }
  };

  return (
    <div className="bg-market-card border border-market-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="text-blue-400" size={24} />
        <h3 className="text-xl font-semibold text-white">Market News</h3>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {visibleNews.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No news yet. News will appear as the market day progresses.
          </div>
        ) : (
          visibleNews.slice().reverse().map((news, index) => (
            <div
              key={`${news.timestamp}-${index}`}
              className={`border-l-4 ${getSentimentColor(news.sentiment)} rounded-r-lg p-4 animate-slide-down`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getSentimentIcon(news.sentiment)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{news.timestamp}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        news.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                        news.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {news.sentiment.toUpperCase()}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                        Impact: {(news.impact_strength * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-white font-semibold mb-2 leading-tight">
                    {news.headline}
                  </h4>
                  
                  <p className="text-sm text-gray-400 mb-2">
                    {news.sector_context}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Expected: <span className="text-gray-300">{news.expected_effect}</span></span>
                    <span>Type: <span className="text-gray-300">{news.trigger_type.replace('_', ' ')}</span></span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
