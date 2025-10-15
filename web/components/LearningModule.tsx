'use client';

import { useState } from 'react';
import { useSimulation } from '@/context/SimulationContext';
import { GraduationCap, Award, TrendingUp, Target, Star, CheckCircle, XCircle } from 'lucide-react';

export default function LearningModule() {
  const { data, portfolio, state } = useSimulation();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (!data || !state.isComplete) return null;

  const learningModule = data.learning_module;
  const initialCash = 100000;
  const finalValue = portfolio.cash + (portfolio.shares * (data.price_series[data.price_series.length - 1]?.price || 0));
  const profitLoss = finalValue - initialCash;
  const profitLossPercent = ((profitLoss / initialCash) * 100).toFixed(2);
  
  // Calculate score
  const tradingScore = Math.max(0, Math.min(100, 50 + (parseFloat(profitLossPercent) * 2)));
  const quizScore = showResults 
    ? (selectedAnswers.filter((ans, idx) => ans === learningModule.post_simulation_analysis.quiz_questions[idx]?.correct_answer).length / learningModule.post_simulation_analysis.quiz_questions.length) * 100
    : 0;
  const totalScore = Math.round((tradingScore * 0.6) + (quizScore * 0.4));

  const getPerformanceGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-400', label: 'Excellent!' };
    if (score >= 80) return { grade: 'A', color: 'text-green-400', label: 'Great Job!' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-400', label: 'Good Work!' };
    if (score >= 60) return { grade: 'C', color: 'text-yellow-400', label: 'Keep Learning!' };
    return { grade: 'D', color: 'text-red-400', label: 'Try Again!' };
  };

  const performance = getPerformanceGrade(totalScore);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuizIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuizIndex < learningModule.post_simulation_analysis.quiz_questions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const currentQuestion = learningModule.post_simulation_analysis.quiz_questions[currentQuizIndex];

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap size={32} />
              <div>
                <h1 className="text-3xl font-bold">Simulation Complete!</h1>
                <p className="text-blue-100">Let's review what you learned</p>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-market-card border border-market-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Your Performance</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-5xl font-bold ${performance.color} mb-2`}>
                  {performance.grade}
                </div>
                <div className="text-gray-400">{performance.label}</div>
                <div className="text-2xl font-semibold text-white mt-2">{totalScore}/100</div>
              </div>

              <div className="bg-market-bg rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-blue-400" size={20} />
                  <span className="text-gray-400">Trading Performance</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {Math.round(tradingScore)}/100
                </div>
                <div className={`text-sm ${profitLoss >= 0 ? 'text-market-green' : 'text-market-red'}`}>
                  {profitLoss >= 0 ? '+' : ''}₹{profitLoss.toFixed(2)} ({profitLoss >= 0 ? '+' : ''}{profitLossPercent}%)
                </div>
              </div>

              <div className="bg-market-bg rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="text-purple-400" size={20} />
                  <span className="text-gray-400">Quiz Score</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {showResults ? Math.round(quizScore) : '?'}/100
                </div>
                <div className="text-sm text-gray-400">
                  {showResults 
                    ? `${selectedAnswers.filter((ans, idx) => ans === learningModule.post_simulation_analysis.quiz_questions[idx]?.correct_answer).length}/${learningModule.post_simulation_analysis.quiz_questions.length} correct`
                    : 'Complete quiz below'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* What Happened */}
          <div className="bg-market-card border border-market-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-3">What Happened</h3>
            <p className="text-gray-300 leading-relaxed">
              {learningModule.post_simulation_analysis.what_happened}
            </p>
          </div>

          {/* Key Lessons */}
          <div className="bg-market-card border border-market-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Key Lessons</h3>
            <div className="space-y-4">
              {learningModule.post_simulation_analysis.key_lessons.map((lesson, index) => (
                <div key={index} className="bg-market-bg rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Star className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-white font-semibold mb-1">{lesson.lesson}</h4>
                      <p className="text-gray-400 text-sm">{lesson.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Principles */}
          <div className="bg-market-card border border-market-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Trading Principles Demonstrated</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {learningModule.post_simulation_analysis.trading_principles_demonstrated.map((principle, index) => (
                <div key={index} className="flex items-start gap-2 bg-market-bg rounded p-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-gray-300 text-sm">{principle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          {!showResults ? (
            <div className="bg-market-card border border-market-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Knowledge Check</h3>
                <span className="text-sm text-gray-400">
                  Question {currentQuizIndex + 1} of {learningModule.post_simulation_analysis.quiz_questions.length}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-lg text-white mb-4">{currentQuestion.question}</h4>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedAnswers[currentQuizIndex] === index
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-market-border bg-market-bg hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuizIndex] === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-500'
                        }`}>
                          {selectedAnswers[currentQuizIndex] === index && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="text-white">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuizIndex] === undefined}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all"
              >
                {currentQuizIndex < learningModule.post_simulation_analysis.quiz_questions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          ) : (
            <div className="bg-market-card border border-market-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quiz Results</h3>
              <div className="space-y-4">
                {learningModule.post_simulation_analysis.quiz_questions.map((question, qIndex) => {
                  const isCorrect = selectedAnswers[qIndex] === question.correct_answer;
                  return (
                    <div key={qIndex} className="bg-market-bg rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                        ) : (
                          <XCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                        )}
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">{question.question}</h4>
                          <div className={`text-sm mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            Your answer: {question.options[selectedAnswers[qIndex]]}
                          </div>
                          {!isCorrect && (
                            <div className="text-sm text-blue-400 mb-1">
                              Correct answer: {question.options[question.correct_answer]}
                            </div>
                          )}
                          <p className="text-gray-400 text-sm italic">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Connection */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 text-white">
            <h3 className="text-2xl font-bold mb-4">Real World Connection</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-100 mb-1">Case Study</h4>
                <p className="text-white">{learningModule.real_world_connection.case_study}</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-100 mb-1">Historical Context</h4>
                <p className="text-white/90">{learningModule.real_world_connection.historical_context}</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-100 mb-1">Parallel Analysis</h4>
                <p className="text-white/90">{learningModule.real_world_connection.parallel_analysis}</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-100 mb-1">Modern Relevance</h4>
                <p className="text-white/90">{learningModule.real_world_connection.modern_relevance}</p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          {showResults && (
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-lg transition-all text-lg"
            >
              Start New Simulation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
