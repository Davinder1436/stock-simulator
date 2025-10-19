'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, Clock, Award, Target, TrendingUp, 
  Lock, CheckCircle, Play, ArrowRight 
} from 'lucide-react';

interface Module {
  id: string;
  level: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number;
  lessons: number;
  locked: boolean;
  completed: boolean;
}

export default function LearnPage() {
  // This would come from API/context in production
  const level1Modules: Module[] = [
    {
      id: '1.1',
      level: 1,
      title: 'Understanding Money',
      description: 'Grasp what money is, its evolution, and fundamental principles',
      difficulty: 'beginner',
      duration: 45,
      lessons: 6,
      locked: false,
      completed: false,
    },
    {
      id: '1.2',
      level: 1,
      title: 'Banking System Fundamentals',
      description: 'Understand how banks operate and their role in the economy',
      difficulty: 'beginner',
      duration: 50,
      lessons: 7,
      locked: false,
      completed: false,
    },
    {
      id: '1.3',
      level: 1,
      title: 'Time Value of Money',
      description: 'Master concepts of interest, inflation, and present/future value',
      difficulty: 'beginner',
      duration: 40,
      lessons: 5,
      locked: false,
      completed: false,
    },
    {
      id: '1.4',
      level: 1,
      title: 'Personal Finance Basics',
      description: 'Build foundation for financial planning and discipline',
      difficulty: 'beginner',
      duration: 48,
      lessons: 6,
      locked: false,
      completed: false,
    },
  ];

  const level2Modules: Module[] = [
    {
      id: '2.1',
      level: 2,
      title: 'Companies & Shareholding Basics',
      description: 'Understand company structures, shares, and what ownership means',
      difficulty: 'beginner',
      duration: 52,
      lessons: 6,
      locked: false,
      completed: false,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-blue-100 text-blue-700';
      case 'advanced': return 'bg-purple-100 text-purple-700';
      case 'expert': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Dhaniverse Learning
              </h1>
              <p className="text-lg text-gray-600">
                Master finance from fundamentals to advanced trading
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>0 badges earned</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="w-5 h-5 text-blue-500" />
                <span>0% complete</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white shadow-xl">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Start Your Financial Education Journey
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                Learn everything from how money works to advanced trading strategies. 
                Built with bite-sized lessons, interactive quizzes, and practical examples.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/learn/1"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  Start Learning
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">6</div>
                <div className="text-blue-100">Levels</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">35</div>
                <div className="text-blue-100">Modules</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">240+</div>
                <div className="text-blue-100">Lessons</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-blue-100">Hours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path - Level 1 */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Level 1: Foundation</h2>
          <p className="text-gray-600 text-lg">
            Start with the basics - understand money, banking, and personal finance
          </p>
        </div>

        <div className="grid gap-6">
          {level1Modules.map((module, index) => (
            <div
              key={module.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                module.locked ? 'opacity-60' : 'hover:-translate-y-1'
              }`}
            >
              <div className="p-8">
                <div className="flex items-start gap-6">
                  {/* Module Number */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0 ${
                    module.completed
                      ? 'bg-green-500 text-white'
                      : module.locked
                      ? 'bg-gray-300 text-gray-500'
                      : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                  }`}>
                    {module.completed ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : module.locked ? (
                      <Lock className="w-8 h-8" />
                    ) : (
                      `1.${index + 1}`
                    )}
                  </div>

                  {/* Module Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {module.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                      {module.completed && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Completed ✓
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4">{module.description}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{module.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>Badge on completion</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {module.locked ? (
                      <button
                        disabled
                        className="px-6 py-3 bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                      >
                        <Lock className="w-5 h-5" />
                      </button>
                    ) : module.completed ? (
                      <Link
                        href={`/learn/${module.id}`}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-200 hover:bg-blue-50 transition-all"
                      >
                        Review
                        <TrendingUp className="w-5 h-5" />
                      </Link>
                    ) : (
                      <Link
                        href={`/learn/${module.id}`}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                      >
                        Start
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar (if in progress) */}
              {!module.locked && !module.completed && (
                <div className="h-2 bg-gray-200">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: '0%' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Learning Path - Level 2 */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Level 2: Corporate & Investment Fundamentals</h2>
          <p className="text-gray-600 text-lg">
            Understand companies, shares, financial statements, and investment basics
          </p>
        </div>

        <div className="grid gap-6">
          {level2Modules.map((module, index) => (
            <div
              key={module.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                module.locked ? 'opacity-60' : 'hover:-translate-y-1'
              }`}
            >
              <div className="p-8">
                <div className="flex items-start gap-6">
                  {/* Module Number */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0 ${
                    module.completed
                      ? 'bg-green-500 text-white'
                      : module.locked
                      ? 'bg-gray-300 text-gray-500'
                      : 'bg-gradient-to-br from-purple-500 to-pink-600 text-white'
                  }`}>
                    {module.completed ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : module.locked ? (
                      <Lock className="w-8 h-8" />
                    ) : (
                      `2.${index + 1}`
                    )}
                  </div>

                  {/* Module Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {module.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                      {module.completed && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Completed ✓
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4">{module.description}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{module.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>Badge on completion</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {module.locked ? (
                      <button
                        disabled
                        className="px-6 py-3 bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                      >
                        <Lock className="w-5 h-5" />
                      </button>
                    ) : module.completed ? (
                      <Link
                        href={`/learn/${module.id}`}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg border-2 border-purple-200 hover:bg-purple-50 transition-all"
                      >
                        Review
                        <TrendingUp className="w-5 h-5" />
                      </Link>
                    ) : (
                      <Link
                        href={`/learn/${module.id}`}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                      >
                        Start
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar (if in progress) */}
              {!module.locked && !module.completed && (
                <div className="h-2 bg-gray-200">
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600" style={{ width: '0%' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">More Modules Coming Soon</h3>
          <p className="text-gray-600">
            Financial Statements • Financial Ratios • Corporate Actions • Investment Instruments
          </p>
        </div>
      </section>

      {/* Old Coming Soon - Remove this */}
      {/* 
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">More Levels Coming Soon</h3>
          <p className="text-gray-600">
            Level 2: Corporate & Investment Fundamentals • Level 3: Stock Market Mechanics • And more!
          </p>
        </div>
      </section>
      */}

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Learn with Dhaniverse?
        </h2>
        
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bite-Sized Lessons</h3>
            <p className="text-gray-600">
              Learn in 5-10 minute focused sessions. Perfect for busy schedules.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Practical Examples</h3>
            <p className="text-gray-600">
              Real-world scenarios and calculations. Learn by doing.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Earn Badges</h3>
            <p className="text-gray-600">
              Track progress with achievements and badges for completed modules.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
