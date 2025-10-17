'use client';

import React, { useState, useEffect } from 'react';
import { useLongTermSimulation } from '@/context/LongTermSimulationContext';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Info, Sliders, PiggyBank, Lock, Unlock } from 'lucide-react';
import { InvestmentDistribution } from '@/types/longterm';

export const InvestmentPanel: React.FC = () => {
  const {
    state,
    currentMonthData,
    updateInvestmentDistribution,
    createFixedDeposit,
    breakFixedDeposit,
  } = useLongTermSimulation();

  const [distribution, setDistribution] = useState<InvestmentDistribution>({});
  const [fdAmount, setFdAmount] = useState('10000');

  // Initialize distribution from state
  useEffect(() => {
    if (Object.keys(state.investmentDistribution).length > 0) {
      setDistribution(state.investmentDistribution);
    }
  }, [state.investmentDistribution]);

  if (!state.chapterData || !currentMonthData) return null;

  const { availableInvestmentOptions } = state.chapterData;
  const availableToInvest = currentMonthData.salaryExpenses.availableToInvest;
  const portfolio = state.userPortfolio;

  // Calculate total distribution
  const totalDistribution = Object.values(distribution).reduce((sum, val) => sum + val, 0);
  const remaining = availableToInvest - totalDistribution;

  const handleDistributionChange = (assetId: string, amount: number) => {
    const newDistribution = {
      ...distribution,
      [assetId]: Math.max(0, amount),
    };
    setDistribution(newDistribution);
  };

  const handleSaveDistribution = () => {
    updateInvestmentDistribution(distribution);
  };

  const handleCreateFD = () => {
    const amount = parseInt(fdAmount);
    if (amount >= 10000 && amount <= portfolio.cash) {
      createFixedDeposit(amount);
      setFdAmount('10000');
    }
  };

  const handleBreakFD = (fdId: string) => {
    if (confirm('Breaking FD early will result in 50% penalty on returns. Continue?')) {
      breakFixedDeposit(fdId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-white">
          <div className="text-xs font-medium text-blue-100 mb-1">Available Cash</div>
          <div className="text-2xl font-bold">₹{(portfolio.cash / 100000).toFixed(2)}L</div>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-4 text-white">
          <div className="text-xs font-medium text-green-100 mb-1">Monthly to Invest</div>
          <div className="text-2xl font-bold">₹{(availableToInvest / 1000).toFixed(0)}k</div>
        </div>
        <div className={`bg-gradient-to-br rounded-lg p-4 text-white ${
          remaining >= 0 ? 'from-purple-600 to-purple-700' : 'from-red-600 to-red-700'
        }`}>
          <div className="text-xs font-medium text-white/80 mb-1">
            {remaining >= 0 ? 'Unallocated' : 'Over Allocated!'}
          </div>
          <div className="text-2xl font-bold">₹{(remaining / 1000).toFixed(0)}k</div>
        </div>
      </div>

      {/* Investment Distribution Strategy */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Monthly Investment Strategy
              </h3>
            </div>
            {remaining >= 0 && (
              <button
                onClick={handleSaveDistribution}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Apply Strategy
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Set how much to invest automatically each month across different assets
          </p>
        </div>

        <div className="p-5 space-y-4">
          {availableInvestmentOptions
            .filter(opt => opt.id !== 'savings-account' && opt.id !== 'fixed-deposit')
            .map(option => {
              const currentAmount = distribution[option.id] || 0;
              const percentage = availableToInvest > 0 ? (currentAmount / availableToInvest) * 100 : 0;
              const holding = portfolio.assetHoldings[option.id];

              return (
                <div
                  key={option.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {option.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getRiskLevelStyle(option.riskLevel)}`}>
                          {option.riskLevel.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {option.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {option.historicalReturn}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600 dark:text-gray-400">
                          Liquidity: {option.liquidity}
                        </span>
                        {getVolatilityIndicator(option.volatilityFactor)}
                      </div>
                    </div>
                  </div>

                  {/* Amount Slider */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Monthly SIP Amount
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={currentAmount}
                          onChange={(e) => handleDistributionChange(option.id, parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 text-sm text-right border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          min="0"
                          max={availableToInvest}
                          step="500"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                    
                    <input
                      type="range"
                      value={currentAmount}
                      onChange={(e) => handleDistributionChange(option.id, parseInt(e.target.value))}
                      min="0"
                      max={availableToInvest}
                      step="100"
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    
                    {/* Quick Presets */}
                    <div className="flex gap-1 mt-2">
                      {[25, 50, 75, 100].map(pct => (
                        <button
                          key={pct}
                          onClick={() => handleDistributionChange(option.id, Math.floor(availableToInvest * pct / 100))}
                          className="flex-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current Holdings */}
                  {holding && holding.invested > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mt-3">
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div>
                          <div className="text-gray-600 dark:text-gray-400 mb-1">Invested</div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            ₹{(holding.invested / 1000).toFixed(0)}k
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 dark:text-gray-400 mb-1">Current</div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            ₹{(holding.currentValue / 1000).toFixed(0)}k
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 dark:text-gray-400 mb-1">Returns</div>
                          <div className={`font-semibold ${holding.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {holding.returns >= 0 ? '+' : ''}₹{(holding.returns / 1000).toFixed(1)}k
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 dark:text-gray-400 mb-1">Gain %</div>
                          <div className={`font-semibold flex items-center gap-1 ${holding.returnsPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {holding.returnsPercentage >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {holding.returnsPercentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Fixed Deposits Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Fixed Deposits
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Locked for 12 months • Current rate: {currentMonthData.marketData.fdRate}% p.a.
          </p>
        </div>

        <div className="p-5 space-y-4">
          {/* Create New FD */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Create New FD</h4>
            <div className="flex gap-2">
              <input
                type="number"
                value={fdAmount}
                onChange={(e) => setFdAmount(e.target.value)}
                placeholder="Minimum ₹10,000"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                min="10000"
                step="1000"
              />
              <button
                onClick={handleCreateFD}
                disabled={parseInt(fdAmount) < 10000 || parseInt(fdAmount) > portfolio.cash}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                Create FD
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Available cash: ₹{(portfolio.cash / 1000).toFixed(0)}k • Maturity value: ₹{((parseInt(fdAmount) || 0) * (1 + currentMonthData.marketData.fdRate / 100) / 1000).toFixed(0)}k
            </p>
          </div>

          {/* Active FDs */}
          {portfolio.fixedDeposits.length > 0 ? (
            <div className="space-y-2">
              {portfolio.fixedDeposits.map((fd) => {
                const monthsRemaining = fd.maturityMonth - state.currentMonth;
                const isMatured = fd.status === 'matured';
                const isBroken = fd.status === 'broken';

                return (
                  <div
                    key={fd.fdId}
                    className={`border rounded-lg p-3 ${
                      isMatured
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : isBroken
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ₹{(fd.amount / 1000).toFixed(0)}k
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            isMatured
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : isBroken
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {isMatured ? 'MATURED' : isBroken ? 'BROKEN' : 'ACTIVE'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Rate: {fd.rateAtStart}% • 
                          {isMatured
                            ? ` Matured`
                            : isBroken
                            ? ` Withdrawn with penalty`
                            : ` ${monthsRemaining} months remaining`}
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          Current Value: ₹{(fd.currentValue / 1000).toFixed(1)}k
                          {!isBroken && !isMatured && (
                            <span className="text-xs text-gray-500 ml-2">
                              (Maturity: ₹{(fd.maturityValue / 1000).toFixed(1)}k)
                            </span>
                          )}
                        </div>
                      </div>
                      {fd.status === 'active' && (
                        <button
                          onClick={() => handleBreakFD(fd.fdId)}
                          className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300 rounded text-xs font-medium transition-colors"
                        >
                          Break FD
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <PiggyBank className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No fixed deposits yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Market Volatility Indicator */}
      {currentMonthData.marketData.volatilityIndex > 20 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
                High Market Volatility
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                Volatility Index: {currentMonthData.marketData.volatilityIndex} • 
                Consider staying the course with your SIP strategy during market turbulence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Allocation Summary */}
      {totalDistribution > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Your Monthly Investment Strategy
              </h4>
              <div className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                {Object.entries(distribution)
                  .filter(([_, amount]) => amount > 0)
                  .map(([assetId, amount]) => {
                    const option = availableInvestmentOptions.find(opt => opt.id === assetId);
                    return (
                      <div key={assetId} className="flex justify-between">
                        <span>{option?.name}:</span>
                        <span className="font-medium">
                          ₹{(amount / 1000).toFixed(0)}k ({((amount / availableToInvest) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function getRiskLevelStyle(riskLevel: string): string {
  switch (riskLevel.toLowerCase()) {
    case 'none':
    case 'very-low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
    case 'low':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
    case 'moderate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
}

function getVolatilityIndicator(volatilityFactor: number) {
  if (volatilityFactor === 0) {
    return (
      <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
        <span>●</span>
        <span>Stable</span>
      </span>
    );
  } else if (volatilityFactor <= 0.3) {
    return (
      <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
        <span>●</span>
        <span>Low Volatility</span>
      </span>
    );
  } else if (volatilityFactor <= 0.6) {
    return (
      <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
        <span>●</span>
        <span>Moderate Volatility</span>
      </span>
    );
  } else {
    return (
      <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
        <span>●</span>
        <span>High Volatility</span>
      </span>
    );
  }
}
