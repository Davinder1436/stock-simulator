'use client';

import { useSimulation } from '@/context/SimulationContext';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

export default function Timer() {
  const { state, data, startSimulation, pauseSimulation, resumeSimulation, resetSimulation } = useSimulation();

  if (!data) return null;

  const minutes = Math.floor(state.currentTime / 60);
  const seconds = state.currentTime % 60;
  const totalSeconds = data.simulation_metadata.duration_minutes * 60;
  const progress = (state.currentTime / totalSeconds) * 100;

  const formatTime = (m: number, s: number) => {
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-market-card border border-market-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-blue-400" size={24} />
          <h3 className="text-xl font-semibold text-white">Market Timer</h3>
        </div>
        
        {state.isComplete && (
          <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-semibold">
            COMPLETED
          </div>
        )}
      </div>

      {/* Time Display */}
      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-white mb-2 font-mono">
          {formatTime(minutes, seconds)}
        </div>
        <div className="text-gray-400 text-sm">
          / {data.simulation_metadata.duration_minutes}:00
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full h-3 bg-market-bg rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Start</span>
          <span>{progress.toFixed(1)}%</span>
          <span>End</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-2">
        {!state.isRunning && !state.isComplete && (
          <button
            onClick={startSimulation}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Play size={20} />
            Start Simulation
          </button>
        )}

        {state.isRunning && !state.isPaused && !state.isComplete && (
          <button
            onClick={pauseSimulation}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Pause size={20} />
            Pause
          </button>
        )}

        {state.isRunning && state.isPaused && !state.isComplete && (
          <button
            onClick={resumeSimulation}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Play size={20} />
            Resume
          </button>
        )}

        {(state.currentTime > 0 || state.isComplete) && (
          <button
            onClick={resetSimulation}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-market-border grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-400 mb-1">Tick Interval</div>
          <div className="text-white font-semibold">{data.simulation_metadata.tick_interval_sec}s</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Total Ticks</div>
          <div className="text-white font-semibold">
            {state.currentTickIndex + 1} / {data.simulation_metadata.total_ticks}
          </div>
        </div>
      </div>
    </div>
  );
}
