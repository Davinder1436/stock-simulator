'use client';

import React, { useEffect } from 'react';
import { useLearning } from '@/context/LearningContext';
import { 
  BookOpen, Clock, Award, ArrowLeft, ArrowRight, 
  CheckCircle, Circle, Trophy, Target 
} from 'lucide-react';
import LessonContent from './LessonContent';
import ModuleQuizView from './ModuleQuizView';
import QuizResults from './QuizResults';

interface LearningModuleViewerProps {
  moduleId: string;
}

export default function LearningModuleViewer({ moduleId }: LearningModuleViewerProps) {
  const {
    currentModule,
    loadModule,
    currentLesson,
    setCurrentLesson,
    nextLesson,
    previousLesson,
    goToQuiz,
    userProgress,
    viewMode,
    setViewMode,
    loading,
  } = useLearning();

  useEffect(() => {
    loadModule(moduleId);
  }, [moduleId]);

  if (loading || !currentModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading module...</p>
        </div>
      </div>
    );
  }

  const lesson = currentModule.lessons[currentLesson];
  const totalLessons = currentModule.lessons.length;
  const completedLessons = userProgress?.lessons_completed.length || 0;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    Level {currentModule.module_metadata.level}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded capitalize">
                    {currentModule.module_metadata.difficulty}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentModule.module_metadata.module_title}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentModule.module_metadata.estimated_duration_minutes} min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="w-4 h-4" />
                  <span>{completedLessons}/{totalLessons} lessons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar - Lesson List */}
          <aside className="col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Lessons
              </h2>
              
              <div className="space-y-2 mb-6">
                {currentModule.lessons.map((l, index) => {
                  const isCompleted = userProgress?.lessons_completed.includes(l.lesson_id);
                  const isCurrent = index === currentLesson;
                  
                  return (
                    <button
                      key={l.lesson_id}
                      onClick={() => setCurrentLesson(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        isCurrent
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : isCompleted
                          ? 'bg-green-50 border-2 border-green-300'
                          : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500 mb-1">
                            Lesson {l.lesson_number}
                          </div>
                          <div className={`text-sm font-semibold ${
                            isCurrent ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {l.title}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {l.duration_minutes} min
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quiz Button */}
              <button
                onClick={goToQuiz}
                disabled={completedLessons < totalLessons}
                className={`w-full p-4 rounded-lg font-semibold transition-all ${
                  completedLessons >= totalLessons
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5" />
                  <span>Take Quiz</span>
                </div>
                <div className="text-xs mt-1 opacity-80">
                  {completedLessons >= totalLessons
                    ? `${currentModule.module_quiz.questions.length} questions`
                    : 'Complete all lessons first'}
                </div>
              </button>

              {/* Quiz Attempts */}
              {userProgress && userProgress.quiz_attempts.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs font-semibold text-blue-900 mb-2">
                    Previous Attempts
                  </div>
                  {userProgress.quiz_attempts.slice(-3).reverse().map((attempt, index) => (
                    <div key={attempt.attempt_id} className="text-xs text-gray-600 mb-1">
                      <span className={attempt.passed ? 'text-green-600 font-semibold' : 'text-orange-600'}>
                        {attempt.score.toFixed(0)}%
                      </span>
                      {attempt.passed && ' ✓'}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="col-span-9">
            {viewMode === 'lesson' && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Lesson Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
                  <div className="flex items-center gap-2 text-blue-100 text-sm mb-2">
                    <span>Lesson {lesson.lesson_number}</span>
                    <span>•</span>
                    <span>{lesson.duration_minutes} minutes</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{lesson.title}</h2>
                  <p className="text-blue-100 text-lg">{lesson.subtitle}</p>
                </div>

                {/* Lesson Content */}
                <div className="p-8">
                  <LessonContent lesson={lesson} />
                </div>

                {/* Navigation Footer */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={previousLesson}
                      disabled={currentLesson === 0}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                        currentLesson === 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
                      }`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Previous
                    </button>

                    <div className="text-sm text-gray-600">
                      {currentLesson + 1} of {totalLessons}
                    </div>

                    <button
                      onClick={nextLesson}
                      disabled={currentLesson === totalLessons - 1}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                        currentLesson === totalLessons - 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                      }`}
                    >
                      Next
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'quiz' && <ModuleQuizView />}
            {viewMode === 'results' && <QuizResults />}
          </main>
        </div>
      </div>
    </div>
  );
}
