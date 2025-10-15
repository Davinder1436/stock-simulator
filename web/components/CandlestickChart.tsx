'use client';

import { PricePoint } from '@/types/simulation';
import { useMemo } from 'react';

interface CandlestickData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isGreen: boolean;
  candle_pattern?: string;
}

interface CandlestickChartProps {
  data: PricePoint[];
  width?: number;
  height?: number;
  candlePeriodSeconds?: number; // How many seconds per candle
}

export default function CandlestickChart({ 
  data, 
  width = 1000, 
  height = 500,
  candlePeriodSeconds = 20 // Default: 1 candle every 20 seconds
}: CandlestickChartProps) {
  const candlestickData = useMemo(() => {
    // Group price points by time period (e.g., 20 seconds per candle)
    const candles: CandlestickData[] = [];
    
    // Parse timestamps and group by period
    const groupedData: { [key: number]: PricePoint[] } = {};
    
    data.forEach(point => {
      const [min, sec] = point.timestamp.split(':').map(Number);
      const totalSeconds = min * 60 + sec;
      const periodIndex = Math.floor(totalSeconds / candlePeriodSeconds);
      
      if (!groupedData[periodIndex]) {
        groupedData[periodIndex] = [];
      }
      groupedData[periodIndex].push(point);
    });

    // Create candles from grouped data
    Object.entries(groupedData).forEach(([periodIndex, group]) => {
      if (group.length === 0) return;

      // First price in period is open
      const open = group[0].price;
      // Last price in period is close
      const close = group[group.length - 1].price;
      // Highest price in period
      const high = Math.max(...group.map(p => p.price));
      // Lowest price in period
      const low = Math.min(...group.map(p => p.price));
      // Use last volume value
      const volume = group[group.length - 1].volume;
      // Check for any special patterns in this period
      const pattern = group.find(p => p.candle_pattern && p.candle_pattern !== 'none')?.candle_pattern;

      candles.push({
        timestamp: group[0].timestamp,
        open,
        high,
        low,
        close,
        volume,
        isGreen: close >= open,
        candle_pattern: pattern,
      });
    });

    return candles;
  }, [data, candlePeriodSeconds]);

  const { minPrice, maxPrice, priceRange } = useMemo(() => {
    if (candlestickData.length === 0) {
      return { minPrice: 0, maxPrice: 100, priceRange: 100 };
    }
    const prices = candlestickData.flatMap(c => [c.high, c.low]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.05; // 5% padding
    return {
      minPrice: min - padding,
      maxPrice: max + padding,
      priceRange: (max - min + 2 * padding),
    };
  }, [candlestickData]);

  const chartHeight = height - 120; // Reserve space for axis and volume with margin
  const chartWidth = width - 100;
  
  // Calculate candle width - gap is 20% of candle width
  const candleWidth = Math.max(6, Math.min(24, chartWidth / (candlestickData.length * 1.2)));
  const candleGap = candleWidth * 0.2; // Gap is 20% of candle width
  const candleSpacing = candleWidth + candleGap;

  const priceToY = (price: number) => {
    return 40 + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  const formatPrice = (price: number) => `₹${price.toFixed(2)}`;

  // Y-axis labels
  const yAxisLabels = useMemo(() => {
    const labels = [];
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
      const price = minPrice + (priceRange * i) / steps;
      labels.push({
        price,
        y: priceToY(price),
      });
    }
    return labels;
  }, [minPrice, priceRange]);

  // X-axis labels - show every 5th candle or less
  const xAxisLabels = useMemo(() => {
    const labels = [];
    const step = Math.max(1, Math.ceil(candlestickData.length / 10));
    for (let i = 0; i < candlestickData.length; i += step) {
      labels.push({
        timestamp: candlestickData[i].timestamp,
        x: 80 + i * candleSpacing + candleWidth / 2,
      });
    }
    return labels;
  }, [candlestickData, candleSpacing, candleWidth]);

  const getPatternColor = (pattern?: string) => {
    if (!pattern || pattern === 'none') return null;
    
    const colors: Record<string, string> = {
      doji: '#fbbf24',
      hammer: '#10b981',
      shooting_star: '#ef4444',
      marubozu: '#8b5cf6',
      engulfing_bull: '#22c55e',
      engulfing_bear: '#dc2626',
      spinning_top: '#6366f1',
    };
    
    return colors[pattern] || '#3b82f6';
  };

  if (candlestickData.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-400">
        Waiting for market data...
      </div>
    );
  }

  return (
    <div className="relative">
      <svg width={width} height={height} className="bg-market-bg">
        {/* Grid lines */}
        <g>
          {yAxisLabels.map((label, i) => (
            <line
              key={`grid-${i}`}
              x1={80}
              y1={label.y}
              x2={width - 20}
              y2={label.y}
              stroke="#334155"
              strokeWidth={0.5}
              strokeDasharray="3,3"
              opacity={0.3}
            />
          ))}
        </g>

        {/* Y-axis labels */}
        <g>
          {yAxisLabels.map((label, i) => (
            <text
              key={`ylabel-${i}`}
              x={70}
              y={label.y + 4}
              textAnchor="end"
              fontSize={12}
              fill="#94a3b8"
              fontFamily="monospace"
            >
              {formatPrice(label.price)}
            </text>
          ))}
        </g>

        {/* X-axis labels */}
        <g>
          {xAxisLabels.map((label, i) => (
            <text
              key={`xlabel-${i}`}
              x={label.x}
              y={height - 35}
              textAnchor="middle"
              fontSize={11}
              fill="#94a3b8"
              fontFamily="monospace"
            >
              {label.timestamp}
            </text>
          ))}
        </g>

        {/* Candlesticks */}
        <g>
          {candlestickData.map((candle, i) => {
            const x = 80 + i * candleSpacing;
            const openY = priceToY(candle.open);
            const closeY = priceToY(candle.close);
            const highY = priceToY(candle.high);
            const lowY = priceToY(candle.low);
            
            const color = candle.isGreen ? '#10b981' : '#ef4444';
            const patternColor = getPatternColor(candle.candle_pattern);
            const wickX = x + candleWidth / 2;
            const bodyHeight = Math.max(2, Math.abs(closeY - openY));

            return (
              <g key={`candle-${i}`}>
                {/* Wick (high-low line) */}
                <line
                  x1={wickX}
                  y1={highY}
                  x2={wickX}
                  y2={lowY}
                  stroke={color}
                  strokeWidth={1.5}
                />
                
                {/* Body (open-close rectangle) */}
                <rect
                  x={x}
                  y={Math.min(openY, closeY)}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={candle.isGreen ? color : '#1e293b'}
                  stroke={color}
                  strokeWidth={1.5}
                />

                {/* Pattern indicator (glow effect) */}
                {patternColor && (
                  <>
                    <rect
                      x={x - 2}
                      y={Math.min(openY, closeY) - 2}
                      width={candleWidth + 4}
                      height={bodyHeight + 4}
                      fill="none"
                      stroke={patternColor}
                      strokeWidth={2}
                      opacity={0.7}
                      rx={2}
                    />
                    <circle
                      cx={wickX}
                      cy={Math.min(openY, closeY) - 10}
                      r={4}
                      fill={patternColor}
                      opacity={0.9}
                    />
                  </>
                )}

                {/* Hover target for tooltip */}
                <rect
                  x={x - 2}
                  y={40}
                  width={candleWidth + 4}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-crosshair"
                >
                  <title>
                    {candle.timestamp}
                    {'\n'}Open: {formatPrice(candle.open)}
                    {'\n'}High: {formatPrice(candle.high)}
                    {'\n'}Low: {formatPrice(candle.low)}
                    {'\n'}Close: {formatPrice(candle.close)}
                    {'\n'}Change: {formatPrice(candle.close - candle.open)} ({((candle.close - candle.open) / candle.open * 100).toFixed(2)}%)
                    {candle.candle_pattern && candle.candle_pattern !== 'none' ? `\n\nPattern: ${candle.candle_pattern.replace('_', ' ').toUpperCase()}` : ''}
                  </title>
                </rect>
              </g>
            );
          })}
        </g>

        {/* Volume bars (at bottom with margin) */}
        <g opacity={0.4}>
          {candlestickData.map((candle, i) => {
            const x = 80 + i * candleSpacing;
            const maxVolume = Math.max(...candlestickData.map(c => c.volume));
            const volumeHeight = (candle.volume / maxVolume) * 40; // Reduced from 50 to 40
            const volumeY = height - 70 - volumeHeight; // Increased margin from 55 to 70

            return (
              <rect
                key={`vol-${i}`}
                x={x}
                y={volumeY}
                width={candleWidth}
                height={volumeHeight}
                fill={candle.isGreen ? '#10b981' : '#ef4444'}
              />
            );
          })}
        </g>

        {/* Volume label */}
        <text
          x={40}
          y={height - 50}
          fontSize={10}
          fill="#64748b"
          fontFamily="monospace"
        >
          Volume
        </text>
      </svg>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-market-card/90 backdrop-blur-sm border border-market-border rounded-lg p-3 text-xs space-y-2">
        <div className="font-semibold text-gray-300 mb-2">Legend</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-5 bg-market-green border border-market-green"></div>
          <span className="text-gray-300">Bullish (Close &gt; Open)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-5 bg-market-bg border border-market-red"></div>
          <span className="text-gray-300">Bearish (Close &lt; Open)</span>
        </div>
        <div className="border-t border-market-border my-2"></div>
        <div className="text-gray-400 text-[10px]">
          {candlePeriodSeconds}s per candle<br/>
          {candlestickData.length} candles shown
        </div>
      </div>
    </div>
  );
}
