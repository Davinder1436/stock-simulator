'use client';

import React from 'react';
import { useLongTermSimulation } from '@/context/LongTermSimulationContext';
import {
  BarChart3,
  TrendingUp,
  Calculator,
  PiggyBank,
  Percent,
  FileText,
  Award,
} from 'lucide-react';

export const StatsPanel: React.FC = () => {
  const { currentMonthData, state } = useLongTermSimulation();

  if (!currentMonthData || !state.chapterData || !currentMonthData.userFinancials) return null;

  const { userFinancials, marketData } = currentMonthData;
  const { chapterInfo } = state.chapterData;

  // Calculate tax estimates
  const stcgTax = calculateSTCG(userFinancials);
  const ltcgTax = calculateLTCG(userFinancials);

  // Calculate progress towards goal
  const goalProgress =
    ((userFinancials.currentValue || 0) / chapterInfo.initialSetup.goalToAchieve.targetAmount) *
    100;

  // Calculate inflation adjusted returns
  const inflationAdjustedReturn = userFinancials.xirr
    ? userFinancials.xirr - marketData.inflationRate
    : 0;

  return (
    <div className="space-y-4">
      {/* Performance Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Performance Metrics
          </h3>
        </div>

        <div className="space-y-4">
          {/* XIRR */}
          {userFinancials.xirr && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  XIRR (Annualized)
                </span>
                <span className="text-lg font-bold text-purple-600">
                  {userFinancials.xirr.toFixed(2)}%
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Your actual return rate considering investment timing
              </div>
            </div>
          )}

          {/* Absolute Returns */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Absolute Returns
              </span>
              <span
                className={`text-lg font-bold ${
                  (userFinancials.returns || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {(userFinancials.returns || 0) >= 0 ? '+' : ''}
                {(userFinancials.returnsPercentage || 0).toFixed(2)}%
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Total portfolio appreciation
            </div>
          </div>

          {/* Inflation Adjusted Returns */}
          {userFinancials.xirr && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Real Returns (Inflation Adjusted)
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {inflationAdjustedReturn.toFixed(2)}%
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                After accounting for {marketData.inflationRate}% inflation
              </div>
            </div>
          )}

          {/* Comparison with Benchmark */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              vs. Nifty 50 Benchmark
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Your Portfolio
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {userFinancials.returnsPercentage.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-gray-700 dark:text-gray-300">Nifty 50</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {calculateNiftyReturn(marketData).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Progress */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg p-5 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5" />
          <h3 className="font-semibold">Goal Progress</h3>
        </div>
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-green-100">
              {chapterInfo.initialSetup.goalToAchieve.purpose}
            </span>
            <span className="text-lg font-bold">{goalProgress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-green-900/50 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(goalProgress, 100)}%` }}
            />
          </div>
        </div>
        <div className="text-sm text-green-100">
          ₹{((userFinancials.currentValue || 0) / 100000).toFixed(2)}L of ₹
          {(chapterInfo.initialSetup.goalToAchieve.targetAmount / 100000).toFixed(2)}L
        </div>
      </div>

      {/* Tax Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Tax Summary</h3>
        </div>

        <div className="space-y-3">
          {/* LTCG */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <div>
                <div className="text-xs font-medium text-green-700 dark:text-green-300">
                  Long-Term Capital Gains
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  (Holdings &gt; 1 year)
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-900 dark:text-green-100">
                  ₹{ltcgTax.toLocaleString()}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  10% on gains &gt; ₹1L
                </div>
              </div>
            </div>
          </div>

          {/* STCG */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <div>
                <div className="text-xs font-medium text-orange-700 dark:text-orange-300">
                  Short-Term Capital Gains
                </div>
                <div className="text-xs text-orange-600 dark:text-orange-400">
                  (Holdings &lt; 1 year)
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-orange-900 dark:text-orange-100">
                  ₹{stcgTax.toLocaleString()}
                </div>
                <div className="text-xs text-orange-600 dark:text-orange-400">15% flat</div>
              </div>
            </div>
          </div>

          {/* Tax Saved */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-blue-600" />
              <div className="flex-1">
                <div className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Tax Benefit of Long-Term Holding
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                  First ₹1 lakh LTCG is tax-free! Stay invested to save taxes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Investment Statistics
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Months Invested
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {state.currentMonth} months
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Contributions
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              ₹{(userFinancials.totalInvested || 0).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Average Monthly Investment
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              ₹
              {state.currentMonth > 0
                ? Math.round((userFinancials.totalInvested || 0) / state.currentMonth).toLocaleString()
                : 0}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Wealth Generated
            </span>
            <span className="text-sm font-semibold text-green-600">
              ₹{(userFinancials.returns || 0).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Current Market Rate
            </span>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                Nifty: {(marketData.nifty50Index || 0).toLocaleString()}
              </div>
              <div
                className={`text-xs font-medium ${
                  (marketData.nifty50MonthlyReturn || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {(marketData.nifty50MonthlyReturn || 0) >= 0 ? '+' : ''}
                {(marketData.nifty50MonthlyReturn || 0).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      {state.achievements.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5" />
            <h3 className="font-semibold">Achievements Unlocked</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {state.achievements.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-medium"
              >
                🏆 {formatBadgeName(badge)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function calculateSTCG(financials: any): number {
  // Simplified: Assume 15% on short-term gains
  // In reality, this would track individual holdings
  return 0; // Placeholder
}

function calculateLTCG(financials: any): number {
  // Simplified: 10% on LTCG above 1 lakh
  const ltcgGains = Math.max(0, financials.returns - 100000);
  return Math.round(ltcgGains * 0.1);
}

function calculateNiftyReturn(marketData: any): number {
  // Calculate Nifty return from baseline (simplified)
  const baseline = 14000;
  return ((marketData.nifty50Index - baseline) / baseline) * 100;
}

function formatBadgeName(badge: string): string {
  return badge
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function Target(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
