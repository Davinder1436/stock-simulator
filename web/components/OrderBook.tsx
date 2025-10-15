'use client';

import { useState } from 'react';
import { useSimulation } from '@/context/SimulationContext';
import { ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function OrderBook() {
  const { visibleOrders } = useSimulation();
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedOrders = isExpanded ? visibleOrders : visibleOrders.slice(-10);

  return (
    <div className="bg-market-card border border-market-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Order Book</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span className="text-sm">{isExpanded ? 'Collapse' : 'Expand'}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className="text-sm text-gray-400 mb-4">
        Showing {displayedOrders.length} of {visibleOrders.length} transactions
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {displayedOrders.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No transactions yet. Start the simulation to see market activity.
          </div>
        ) : (
          displayedOrders.reverse().map((order, index) => (
            <div 
              key={`${order.timestamp}-${order.actor_id}-${index}`}
              className="bg-market-bg border border-market-border rounded p-3 hover:bg-market-bg/50 transition-colors animate-slide-up"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {order.action === 'buy' ? (
                    <ArrowUpRight className="text-market-green" size={16} />
                  ) : (
                    <ArrowDownRight className="text-market-red" size={16} />
                  )}
                  <span className={`font-semibold ${
                    order.action === 'buy' ? 'text-market-green' : 'text-market-red'
                  }`}>
                    {order.action.toUpperCase()}
                  </span>
                </div>
                <div className="text-gray-400 text-xs">{order.timestamp}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                <div>
                  <span className="text-gray-400">Actor: </span>
                  <span className="text-white font-medium capitalize">
                    {order.actor_type.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Quantity: </span>
                  <span className="text-white font-medium">{order.quantity}</span>
                </div>
                <div>
                  <span className="text-gray-400">Price: </span>
                  <span className="text-white font-medium">₹{order.price.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-400">Total: </span>
                  <span className="text-white font-medium">
                    ₹{(order.price * order.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-400 italic">
                "{order.reason}"
              </div>

              <div className="flex gap-3 mt-2 text-xs">
                <div>
                  <span className="text-gray-500">Emotion: </span>
                  <span className="text-gray-300">{(order.emotion_index * 100).toFixed(0)}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Speed: </span>
                  <span className="text-gray-300">{(order.reaction_speed * 100).toFixed(0)}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Influence: </span>
                  <span className="text-gray-300">{(order.influence_weight * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
