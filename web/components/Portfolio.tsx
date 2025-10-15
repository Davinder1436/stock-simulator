'use client';

import { useState } from 'react';
import { useSimulation } from '@/context/SimulationContext';
import { Wallet, TrendingUp, TrendingDown, History, Plus, Minus } from 'lucide-react';

export default function Portfolio() {
  const { portfolio, currentPrice, executeTrade, state } = useSimulation();
  const [tradeQuantity, setTradeQuantity] = useState(10);
  const [showTradeForm, setShowTradeForm] = useState(false);

  const portfolioValue = portfolio.cash + (portfolio.shares * currentPrice);
  const unrealizedPnL = portfolio.shares > 0 
    ? (currentPrice - portfolio.averageBuyPrice) * portfolio.shares 
    : 0;
  const unrealizedPnLPercent = portfolio.averageBuyPrice > 0
    ? ((currentPrice - portfolio.averageBuyPrice) / portfolio.averageBuyPrice) * 100
    : 0;

  const handleBuy = () => {
    const success = executeTrade('buy', tradeQuantity);
    if (success) {
      setShowTradeForm(false);
      setTradeQuantity(10);
    } else {
      alert('Insufficient funds!');
    }
  };

  const handleSell = () => {
    const success = executeTrade('sell', tradeQuantity);
    if (success) {
      setShowTradeForm(false);
      setTradeQuantity(10);
    } else {
      alert('Insufficient shares!');
    }
  };

  return (
    <div className="space-y-4">
      {/* Portfolio Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Wallet size={24} />
          <h3 className="text-xl font-semibold">Your Portfolio</h3>
        </div>
        
        <div className="text-4xl font-bold mb-2">
          ₹{portfolioValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        
        <div className={`flex items-center gap-2 text-lg ${
          unrealizedPnL >= 0 ? 'text-green-200' : 'text-red-200'
        }`}>
          {unrealizedPnL >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          <span>
            {unrealizedPnL >= 0 ? '+' : ''}₹{unrealizedPnL.toFixed(2)} 
            ({unrealizedPnL >= 0 ? '+' : ''}{unrealizedPnLPercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-market-card border border-market-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Holdings</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Available Cash</span>
            <span className="text-white font-semibold">
              ₹{portfolio.cash.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Shares Owned</span>
            <span className="text-white font-semibold">{portfolio.shares}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Average Buy Price</span>
            <span className="text-white font-semibold">
              {portfolio.averageBuyPrice > 0 ? `₹${portfolio.averageBuyPrice.toFixed(2)}` : '-'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Current Market Value</span>
            <span className="text-white font-semibold">
              ₹{(portfolio.shares * currentPrice).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Trading Interface */}
      {state.isRunning && !state.isComplete && (
        <div className="bg-market-card border border-market-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Trade</h4>
          
          {!showTradeForm ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowTradeForm(true)}
                className="bg-market-green hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Buy
              </button>
              <button
                onClick={() => setShowTradeForm(true)}
                className="bg-market-red hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                disabled={portfolio.shares === 0}
              >
                <Minus size={20} />
                Sell
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={tradeQuantity}
                  onChange={(e) => setTradeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-market-bg border border-market-border rounded px-4 py-2 text-white"
                />
                <div className="text-sm text-gray-400 mt-1">
                  Total: ₹{(tradeQuantity * currentPrice).toFixed(2)}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleBuy}
                  className="bg-market-green hover:bg-green-600 text-white font-semibold py-2 rounded transition-colors"
                >
                  Buy
                </button>
                <button
                  onClick={handleSell}
                  className="bg-market-red hover:bg-red-600 text-white font-semibold py-2 rounded transition-colors"
                  disabled={portfolio.shares < tradeQuantity}
                >
                  Sell
                </button>
                <button
                  onClick={() => setShowTradeForm(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Trade History */}
      <div className="bg-market-card border border-market-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <History size={20} className="text-blue-400" />
          <h4 className="text-lg font-semibold text-white">Your Trades</h4>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {portfolio.trades.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No trades yet
            </div>
          ) : (
            portfolio.trades.slice().reverse().map((trade) => (
              <div 
                key={trade.id}
                className="bg-market-bg border border-market-border rounded p-3 text-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-semibold ${
                    trade.action === 'buy' ? 'text-market-green' : 'text-market-red'
                  }`}>
                    {trade.action.toUpperCase()}
                  </span>
                  <span className="text-gray-400">{trade.timestamp}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{trade.quantity} shares @ ₹{trade.price.toFixed(2)}</span>
                  <span className="font-semibold">₹{trade.total.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
