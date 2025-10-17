'use client';

import React from 'react';
import { useLongTermSimulation } from '@/context/LongTermSimulationContext';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  SkipForward,
  Clock,
  Zap,
} from 'lucide-react';

export const TimelineControl: React.FC = () => {
  const {
    state,
    currentMonthData,
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    resetSimulation,
    setSpeed,
    skipToEnd,
  } = useLongTermSimulation();

  if (!state.chapterData) return null;

  const { totalMonths } = state.chapterData.chapterInfo;
  const progress = (state.currentMonth / totalMonths) * 100;
  const isComplete = state.currentMonth >= totalMonths;

  const speedOptions = [
    { value: 0.25, label: '0.25x', icon: '🐌', description: '4 min/month' },
    { value: 0.5, label: '0.5x', icon: '🐢', description: '2 min/month' },
    { value: 1, label: '1x', icon: '▶️', description: '1 min/month' },
    { value: 2, label: '2x', icon: '⏩', description: '30 sec/month' },
    { value: 5, label: '5x', icon: '🚀', description: '12 sec/month' },
    { value: 10, label: '10x', icon: '⚡', description: '6 sec/month' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {state.chapterData.chapterInfo.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {state.chapterData.chapterInfo.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Clock className="w-4 h-4" />
            <span>
              Month {state.currentMonth} / {totalMonths}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow-lg">
              {progress.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Current Date Display */}
        {currentMonthData && (
          <div className="mt-3 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium">
              📅 {currentMonthData.realDate}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="px-5 py-4 space-y-4">
        {/* Main Control Buttons */}
        <div className="flex items-center justify-center gap-3">
          {/* Reset Button */}
          <button
            onClick={resetSimulation}
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Play/Pause Button */}
          {!isComplete && (
            <>
              {!state.isRunning || state.isPaused ? (
                <button
                  onClick={state.isRunning ? resumeSimulation : startSimulation}
                  className="p-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all"
                  title="Start/Resume"
                >
                  <Play className="w-6 h-6 text-white" fill="white" />
                </button>
              ) : (
                <button
                  onClick={pauseSimulation}
                  className="p-4 rounded-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all"
                  title="Pause"
                >
                  <Pause className="w-6 h-6 text-white" fill="white" />
                </button>
              )}
            </>
          )}

          {/* Complete Badge */}
          {isComplete && (
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg">
              ✅ Simulation Complete!
            </div>
          )}

          {/* Skip to End Button */}
          {!isComplete && (
            <button
              onClick={skipToEnd}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Skip to End"
            >
              <SkipForward className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          )}
        </div>

        {/* Speed Control */}
        {!isComplete && (
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Simulation Speed
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {speedOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSpeed(option.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    state.speed === option.value
                      ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  title={option.description}
                >
                  <div className="text-base">{option.icon}</div>
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-[10px] opacity-75">{option.description}</div>
                </button>
              ))}
            </div>
            <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
              {state.speed === 1 
                ? '1 minute real time = 1 month simulation' 
                : state.speed < 1
                ? `${Math.round(60 / state.speed)} seconds = 1 month`
                : `${Math.round(60 / state.speed)} seconds = 1 month`}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <div className="text-lg">💡</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                How to Play
              </div>
              <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Click Play to start the 5-year investment journey</li>
                <li>• Each minute represents 1 month of real time (adjustable)</li>
                <li>• Adjust speed from 0.25x (slow) to 10x (very fast)</li>
                <li>• Watch events unfold and learn investment concepts</li>
                <li>• Make decisions when prompted</li>
                <li>• Complete the quiz at the end to earn your badge!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                state.isRunning && !state.isPaused
                  ? 'bg-green-500 animate-pulse'
                  : 'bg-gray-400'
              }`}
            />
            <span className="text-gray-600 dark:text-gray-400">
              {state.isRunning && !state.isPaused
                ? 'Simulation Running'
                : state.isPaused
                ? 'Paused'
                : 'Ready to Start'}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Speed: {state.speed}x
          </div>
        </div>
      </div>
    </div>
  );
};
