'use client';

import React from 'react';
import { useLongTermSimulation } from '@/context/LongTermSimulationContext';
import { TrendingUp, TrendingDown, DollarSign, Target, Award, Activity, AlertCircle, CheckCircle } from 'lucide-react';

export const PortfolioOverview: React.FC = () => {
  const { currentMonthData, state } = useLongTermSimulation();

  if (!currentMonthData) return null;

  const portfolio = state.userPortfolio;
  const marketData = currentMonthData.marketData;
  const isPositive = portfolio.totalReturns >= 0;

  // Calculate allocation percentages
  const totalValue = portfolio.currentValue;
  const allocations: Array<{
    name: string;
    value: number;
    percentage: number;
    color: string;
    assetId: string;
    returns: number;
    returnsPercentage: number;
  }> = [];

  // Add asset holdings
  Object.values(portfolio.assetHoldings).forEach((holding) => {
    const option = state.chapterData?.availableInvestmentOptions.find(
      opt => opt.id === holding.assetId
    );
    if (option && holding.currentValue > 0) {
      allocations.push({
        name: option.name,
        value: holding.currentValue,
        percentage: totalValue > 0 ? (holding.currentValue / totalValue) * 100 : 0,
        color: getColorForAsset(holding.assetId),
        assetId: holding.assetId,
        returns: holding.returns,
        returnsPercentage: holding.returnsPercentage,
      });
    }
  });

  // Add FDs
  const fdValue = portfolio.fixedDeposits.reduce((sum, fd) => sum + fd.currentValue, 0);
  if (fdValue > 0) {
    const fdInvested = portfolio.fixedDeposits.reduce((sum, fd) => sum + fd.amount, 0);
    const fdReturns = fdValue - fdInvested;
    allocations.push({
      name: 'Fixed Deposits',
      value: fdValue,
      percentage: totalValue > 0 ? (fdValue / totalValue) * 100 : 0,
      color: '#10b981',
      assetId: 'fixed-deposit',
      returns: fdReturns,
      returnsPercentage: fdInvested > 0 ? (fdReturns / fdInvested) * 100 : 0,
    });
  }

  // Add cash
  if (portfolio.cash > 0) {
    allocations.push({
      name: 'Cash',
      value: portfolio.cash,
      percentage: totalValue > 0 ? (portfolio.cash / totalValue) * 100 : 0,
      color: '#6b7280',
      assetId: 'cash',
      returns: 0,
      returnsPercentage: 0,
    });
  }

  // Sort by value descending
  allocations.sort((a, b) => b.value - a.value);

  const netWorth = portfolio.currentValue;
  const monthlyIncome = currentMonthData.salaryExpenses.monthlySalary;
  const monthlyExpenses = currentMonthData.salaryExpenses.monthlyExpenses;

  return (
    <div className="space-y-4">
      {/* Net Worth Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-indigo-100 text-sm font-medium">Total Net Worth</span>
          <Award className="w-5 h-5 text-indigo-200" />
        </div>
        <div className="text-4xl font-bold mb-1">
          ₹{(netWorth / 100000).toFixed(2)}L
        </div>
        <div className="flex items-center gap-2 text-indigo-100 text-sm">
          <span>Month {state.currentMonth} of {state.chapterData?.chapterInfo.totalMonths}</span>
          <span>•</span>
          <span className={marketData.sentiment === 'positive' ? 'text-green-300' : marketData.sentiment === 'negative' ? 'text-red-300' : 'text-indigo-100'}>
            {marketData.sentiment.charAt(0).toUpperCase() + marketData.sentiment.slice(1)} Market
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Invested */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">
              Total Invested
            </span>
            <DollarSign className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{(portfolio.totalInvested / 100000).toFixed(2)}L
          </div>
        </div>

        {/* Current Value */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">
              Portfolio Value
            </span>
            <Target className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{((portfolio.currentValue - portfolio.cash) / 100000).toFixed(2)}L
          </div>
        </div>

        {/* Returns */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">
              Absolute Returns
            </span>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
          </div>
          <div
            className={`text-xl font-bold ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? '+' : ''}₹{(portfolio.totalReturns / 100000).toFixed(2)}L
          </div>
          <div
            className={`text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? '+' : ''}{portfolio.totalReturnsPercentage.toFixed(2)}%
          </div>
        </div>

        {/* Cash Available */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">
              Cash Available
            </span>
            <DollarSign className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{(portfolio.cash / 1000).toFixed(0)}k
          </div>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Asset Allocation
          </h3>
          <Activity className="w-4 h-4 text-gray-500" />
        </div>

        {/* Allocation Bar */}
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-3 flex">
          {allocations
            .filter(a => a.percentage > 0)
            .map((allocation, idx) => (
              <div
                key={idx}
                style={{
                  width: `${allocation.percentage}%`,
                  backgroundColor: allocation.color,
                }}
                className="h-full transition-all duration-300 hover:opacity-80"
                title={`${allocation.name}: ${allocation.percentage.toFixed(1)}%`}
              />
            ))}
        </div>

        {/* Allocation Details */}
        <div className="space-y-2">
          {allocations.map((allocation, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 flex-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: allocation.color }}
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {allocation.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-600 dark:text-gray-400">
                  ₹{(allocation.value / 1000).toFixed(0)}k
                </span>
                <span className="text-gray-500 dark:text-gray-500 w-12 text-right">
                  {allocation.percentage.toFixed(1)}%
                </span>
                {allocation.returns !== 0 && (
                  <span className={`w-16 text-right font-medium ${
                    allocation.returnsPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {allocation.returnsPercentage >= 0 ? '+' : ''}
                    {allocation.returnsPercentage.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Cash Flow */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Monthly Cash Flow
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Income</span>
            <span className="font-medium text-green-600">
              +₹{(monthlyIncome / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Expenses</span>
            <span className="font-medium text-red-600">
              -₹{(monthlyExpenses / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="font-semibold text-gray-900 dark:text-white">Available to Invest</span>
            <span className="font-bold text-blue-600">
              ₹{((monthlyIncome - monthlyExpenses) / 1000).toFixed(0)}k
            </span>
          </div>
        </div>
      </div>

      {/* Market Indicators */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Market Indicators
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Nifty 50</div>
            <div className={`text-sm font-bold ${
              marketData.nifty50MonthlyReturn >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {marketData.nifty50Index.toLocaleString()}
              <span className="text-xs ml-1">
                ({marketData.nifty50MonthlyReturn >= 0 ? '+' : ''}{marketData.nifty50MonthlyReturn.toFixed(1)}%)
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Gold Price</div>
            <div className={`text-sm font-bold ${
              marketData.goldMonthlyReturn >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ₹{marketData.goldPrice.toLocaleString()}
              <span className="text-xs ml-1">
                ({marketData.goldMonthlyReturn >= 0 ? '+' : ''}{marketData.goldMonthlyReturn.toFixed(1)}%)
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">FD Rate</div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              {marketData.fdRate.toFixed(1)}% p.a.
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Inflation</div>
            <div className="text-sm font-bold text-orange-600">
              {marketData.inflationRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Investment Status */}
      {Object.keys(state.investmentDistribution).length > 0 ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-900 dark:text-green-200">
              SIP Active • Automated monthly investments running
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-900 dark:text-amber-200">
              No active SIP • Set your investment strategy to start building wealth
            </span>
          </div>
        </div>
      )}

      {/* FD Summary */}
      {portfolio.fixedDeposits.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-blue-700 dark:text-blue-300 mb-1">
                Fixed Deposits
              </div>
              <div className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                {portfolio.fixedDeposits.filter(fd => fd.status === 'active').length} Active • 
                {portfolio.fixedDeposits.filter(fd => fd.status === 'matured').length} Matured
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-blue-700 dark:text-blue-300 mb-1">Total Value</div>
              <div className="text-sm font-bold text-blue-900 dark:text-blue-100">
                ₹{(fdValue / 1000).toFixed(0)}k
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function getColorForAsset(assetId: string): string {
  const colors: { [key: string]: string } = {
    'nifty50-index': '#3b82f6',    // blue
    'gold': '#f59e0b',              // amber
    'government-bonds': '#10b981',  // green
    'fixed-deposit': '#10b981',     // green
    'savings-account': '#6b7280',   // gray
    'savings': '#6b7280',           // gray
    'cash': '#6b7280',              // gray
    'nifty50': '#3b82f6',           // blue
    'fd': '#10b981',                // green
  };
  return colors[assetId] || '#8b5cf6'; // default purple
}
