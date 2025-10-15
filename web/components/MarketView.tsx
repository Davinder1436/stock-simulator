'use client';

import { useSimulation } from '@/context/SimulationContext';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import CandlestickChart from './CandlestickChart';

export default function MarketView() {
  const { data, currentPricePoint, currentPrice, state } = useSimulation();

  if (!data) return <div className="text-white">Loading market data...</div>;

  const visibleData = data.price_series.slice(0, state.currentTickIndex + 1);
  const priceChange = currentPrice - data.simulation_metadata.base_price;
  const priceChangePercent = ((priceChange / data.simulation_metadata.base_price) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <div className="space-y-4">
      {/* Current Price Display */}
      <div className="bg-market-card border border-market-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-gray-400 text-sm mb-1">{data.simulation_metadata.stock_symbol}</h2>
            <h1 className="text-4xl font-bold text-white">{data.simulation_metadata.stock_name}</h1>
          </div>
          <div className={`px-3 py-1 rounded text-sm font-medium ${
            data.simulation_metadata.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
            data.simulation_metadata.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {data.simulation_metadata.difficulty.toUpperCase()}
          </div>
        </div>
        
        <div className="flex items-end gap-4">
          <div className="text-5xl font-bold text-white">
            ₹{currentPrice.toFixed(2)}
          </div>
          <div className={`flex items-center gap-2 pb-2 ${isPositive ? 'text-market-green' : 'text-market-red'}`}>
            {isPositive ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            <span className="text-2xl font-semibold">
              {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent}%)
            </span>
          </div>
        </div>

        {currentPricePoint && (
          <div className="mt-4 flex gap-6 text-sm">
            <div>
              <span className="text-gray-400">Volume: </span>
              <span className="text-white font-semibold">{currentPricePoint.volume.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-400">Trend: </span>
              <span className={`font-semibold ${
                currentPricePoint.trend === 'up' ? 'text-market-green' :
                currentPricePoint.trend === 'down' ? 'text-market-red' :
                'text-gray-400'
              }`}>
                {currentPricePoint.trend.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Sentiment: </span>
              <span className="text-white font-semibold">
                {(currentPricePoint.sentiment_index * 100).toFixed(0)}%
              </span>
            </div>
            <div>
              <span className="text-gray-400">Dominant Actor: </span>
              <span className="text-white font-semibold capitalize">
                {currentPricePoint.dominant_actor.replace('_', ' ')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Price Chart */}
      <div className="bg-market-card border border-market-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-blue-400" size={20} />
          <h3 className="text-xl font-semibold text-white">Candlestick Chart</h3>
          {currentPricePoint?.candle_pattern && currentPricePoint.candle_pattern !== 'none' && (
            <span className="ml-auto px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">
              Pattern: {currentPricePoint.candle_pattern.replace('_', ' ').toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <CandlestickChart data={visibleData} width={Math.max(800, visibleData.length * 15)} height={400} />
        </div>
      </div>

      {/* Market Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-market-card border border-market-border rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-1">Opening Price</div>
          <div className="text-white text-xl font-semibold">
            ₹{data.simulation_metadata.base_price.toFixed(2)}
          </div>
        </div>
        <div className="bg-market-card border border-market-border rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-1">Day High</div>
          <div className="text-market-green text-xl font-semibold">
            ₹{Math.max(...visibleData.map(d => d.price)).toFixed(2)}
          </div>
        </div>
        <div className="bg-market-card border border-market-border rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-1">Day Low</div>
          <div className="text-market-red text-xl font-semibold">
            ₹{Math.min(...visibleData.map(d => d.price)).toFixed(2)}
          </div>
        </div>
        <div className="bg-market-card border border-market-border rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-1">Total Volume</div>
          <div className="text-white text-xl font-semibold">
            {(currentPricePoint?.volume || 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
