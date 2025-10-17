'use client';

import React from 'react';
import { useLongTermSimulation } from '@/context/LongTermSimulationContext';
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Lightbulb,
  Calendar,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';

export const LongTermNewsFeed: React.FC = () => {
  const { currentMonthData, state } = useLongTermSimulation();

  if (!currentMonthData) return null;

  const { events, news, realDate, marketData } = currentMonthData;

  return (
    <div className="space-y-4">
      {/* Current Date Display */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <div>
              <div className="text-sm font-medium text-purple-100">Current Period</div>
              <div className="text-xl font-bold">{realDate}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-purple-100">Market Sentiment</div>
            <div className="text-sm font-bold">
              {marketData.sentiment.charAt(0).toUpperCase() + marketData.sentiment.slice(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Market News Section */}
      {news && news.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Newspaper className="w-4 h-4" />
            Market News & Updates
          </h3>
          {news.map((newsItem, idx) => {
            const affectedAssets = state.chapterData?.availableInvestmentOptions.filter(
              opt => newsItem.affectedAssets.includes(opt.id)
            );

            return (
              <div
                key={idx}
                className={`rounded-lg p-4 border shadow-sm ${getNewsStyle(
                  newsItem.sentiment
                )}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNewsIcon(newsItem.sentiment)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                      {newsItem.headline}
                    </h4>

                    {/* Affected Assets */}
                    {affectedAssets && affectedAssets.length > 0 && (
                      <div className="mb-2">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Impact on:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {affectedAssets.map((asset) => {
                            const impactPercent = newsItem.marketImpact?.[asset.id];
                            return (
                              <div
                                key={asset.id}
                                className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                              >
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {asset.name}
                                </span>
                                {impactPercent !== undefined && (
                                  <span
                                    className={`flex items-center font-semibold ${
                                      impactPercent > 0
                                        ? 'text-green-600'
                                        : impactPercent < 0
                                        ? 'text-red-600'
                                        : 'text-gray-600'
                                    }`}
                                  >
                                    {impactPercent > 0 ? (
                                      <ArrowUpRight className="w-3 h-3" />
                                    ) : impactPercent < 0 ? (
                                      <ArrowDownRight className="w-3 h-3" />
                                    ) : (
                                      <Minus className="w-3 h-3" />
                                    )}
                                    {impactPercent > 0 ? '+' : ''}
                                    {impactPercent.toFixed(1)}%
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Impact Badge */}
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${getImpactStyle(
                          newsItem.impact
                        )}`}
                      >
                        {newsItem.impact.toUpperCase()} IMPACT
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${getSentimentStyle(
                          newsItem.sentiment
                        )}`}
                      >
                        {newsItem.sentiment.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Events Section */}
      {events && events.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Important Events
          </h3>
          {events.map((event, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-4 border-l-4 shadow-sm ${getEventStyle(
                event.type
              )}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">{getEventIcon(event.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    {event.type === 'milestone' && (
                      <Award className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {event.description}
                  </p>

                  {/* Teaching Moment */}
                  {event.teachingMoment && (
                    <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1">
                            💡 {event.teachingMoment.concept}
                          </div>
                          <p className="text-xs text-blue-800 dark:text-blue-300">
                            {event.teachingMoment.explanation}
                          </p>
                          {event.teachingMoment.tip && (
                            <div className="mt-2 text-xs italic text-blue-700 dark:text-blue-400">
                              💡 Tip: {event.teachingMoment.tip}
                            </div>
                          )}
                          {event.teachingMoment.action && (
                            <div className="mt-2 bg-white dark:bg-gray-800 rounded p-2 text-xs font-medium text-blue-900 dark:text-blue-100">
                              ⚡ {event.teachingMoment.action}
                            </div>
                          )}
                          {event.teachingMoment.example && (
                            <div className="mt-2 bg-white dark:bg-gray-800 rounded p-2 text-xs text-gray-700 dark:text-gray-300">
                              <strong>Example:</strong> {event.teachingMoment.example}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendation */}
                  {event.recommendation && (
                    <div className="mt-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-2 text-xs text-green-800 dark:text-green-300">
                      <strong>💡 Recommendation:</strong> {event.recommendation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Market Performance Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          This Month's Market Performance
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-2">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Nifty 50</div>
            <div
              className={`text-sm font-bold flex items-center gap-1 ${
                marketData.nifty50MonthlyReturn >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {marketData.nifty50MonthlyReturn >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {marketData.nifty50MonthlyReturn >= 0 ? '+' : ''}
              {marketData.nifty50MonthlyReturn.toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-2">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Gold</div>
            <div
              className={`text-sm font-bold flex items-center gap-1 ${
                marketData.goldMonthlyReturn >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {marketData.goldMonthlyReturn >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {marketData.goldMonthlyReturn >= 0 ? '+' : ''}
              {marketData.goldMonthlyReturn.toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-2">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Gov Bonds</div>
            <div className="text-sm font-bold text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +{marketData.governmentBondsMonthlyReturn.toFixed(2)}%
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-2">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Volatility</div>
            <div
              className={`text-sm font-bold ${
                marketData.volatilityIndex > 20
                  ? 'text-red-600'
                  : marketData.volatilityIndex > 15
                  ? 'text-yellow-600'
                  : 'text-green-600'
              }`}
            >
              {marketData.volatilityIndex} VIX
            </div>
          </div>
        </div>
      </div>

      {/* No Events Message */}
      {(!events || events.length === 0) && (!news || news.length === 0) && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Newspaper className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No events or news this month</p>
          <p className="text-xs mt-1">Markets continue as usual</p>
        </div>
      )}
    </div>
  );
};

function getEventStyle(eventType: string): string {
  switch (eventType) {
    case 'simulation-start':
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-500';
    case 'teaching':
      return 'bg-purple-50 dark:bg-purple-900/20 border-purple-500';
    case 'market-movement':
      return 'bg-green-50 dark:bg-green-900/20 border-green-500';
    case 'market-correction':
      return 'bg-red-50 dark:bg-red-900/20 border-red-500';
    case 'personal-event':
      return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500';
    case 'milestone':
      return 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500';
    case 'decision-prompt':
      return 'bg-amber-50 dark:bg-amber-900/20 border-amber-500';
    default:
      return 'bg-gray-50 dark:bg-gray-800 border-gray-300';
  }
}

function getEventIcon(eventType: string): React.ReactNode {
  switch (eventType) {
    case 'market-movement':
    case 'market-correction':
      return <TrendingUp className="w-5 h-5 text-green-600" />;
    case 'teaching':
      return <Lightbulb className="w-5 h-5 text-purple-600" />;
    case 'milestone':
      return <Award className="w-5 h-5 text-yellow-600" />;
    case 'personal-event':
      return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    default:
      return <Newspaper className="w-5 h-5 text-gray-600" />;
  }
}

function getNewsStyle(sentiment: string): string {
  switch (sentiment.toLowerCase()) {
    case 'bullish':
      return 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800';
    case 'bearish':
      return 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800';
    default:
      return 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700';
  }
}

function getNewsIcon(sentiment: string): React.ReactNode {
  switch (sentiment.toLowerCase()) {
    case 'bullish':
      return <TrendingUp className="w-5 h-5 text-green-600" />;
    case 'bearish':
      return <TrendingDown className="w-5 h-5 text-red-600" />;
    default:
      return <Minus className="w-5 h-5 text-gray-600" />;
  }
}

function getImpactStyle(impact: string): string {
  switch (impact.toLowerCase()) {
    case 'positive':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
    case 'negative':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
}

function getSentimentStyle(sentiment: string): string {
  switch (sentiment.toLowerCase()) {
    case 'bullish':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
    case 'bearish':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
  }
}
