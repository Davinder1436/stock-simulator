'use client';

import React from 'react';
import { useLearning } from '@/context/LearningContext';
import { Trophy, XCircle, CheckCircle, RotateCcw, ArrowRight, Award } from 'lucide-react';

export default function QuizResults() {
  const { currentModule, userProgress, quizAnswers, setViewMode, goToQuiz } = useLearning();

  if (!currentModule || !userProgress || userProgress.quiz_attempts.length === 0) {
    return null;
  }

  const latestAttempt = userProgress.quiz_attempts[userProgress.quiz_attempts.length - 1];
  const quiz = currentModule.module_quiz;
  const passed = latestAttempt.passed;
  const score = latestAttempt.score;

  const correctAnswers = quiz.questions.filter(
    (q) => latestAttempt.answers[q.question_id] === q.correct_answer
  ).length;

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const gradeInfo = getGrade(score);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Results Header */}
      <div className={`p-12 text-center ${
        passed
          ? 'bg-gradient-to-r from-green-500 to-emerald-600'
          : 'bg-gradient-to-r from-orange-500 to-red-600'
      } text-white`}>
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          {passed ? (
            <Trophy className="w-14 h-14 text-green-600" />
          ) : (
            <RotateCcw className="w-14 h-14 text-orange-600" />
          )}
        </div>

        <h2 className="text-4xl font-bold mb-3">
          {passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}
        </h2>
        <p className="text-xl opacity-90 mb-6">
          {passed
            ? "You've successfully completed this module!"
            : "You're almost there! Review and try again."}
        </p>

        {/* Score Display */}
        <div className="inline-block bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-6xl font-bold text-gray-900 mb-2">
            {score.toFixed(0)}%
          </div>
          <div className="text-gray-600 text-lg">Your Score</div>
          <div className={`mt-4 inline-block px-6 py-2 ${gradeInfo.bg} ${gradeInfo.color} rounded-full text-2xl font-bold`}>
            {gradeInfo.grade}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 p-8 bg-gray-50">
        <div className="bg-white p-6 rounded-lg text-center shadow">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {correctAnswers}/{quiz.questions.length}
          </div>
          <div className="text-sm text-gray-600">Correct Answers</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg text-center shadow">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {latestAttempt.time_taken_minutes.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Minutes Taken</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg text-center shadow">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {quiz.passing_score}%
          </div>
          <div className="text-sm text-gray-600">Passing Score</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg text-center shadow">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {userProgress.quiz_attempts.length}
          </div>
          <div className="text-sm text-gray-600">Total Attempts</div>
        </div>
      </div>

      {/* Question Review */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-purple-600" />
          Question Review
        </h3>

        <div className="space-y-6">
          {quiz.questions.map((question, index) => {
            const userAnswer = latestAttempt.answers[question.question_id];
            const isCorrect = userAnswer === question.correct_answer;

            return (
              <div
                key={question.question_id}
                className={`border-2 rounded-lg p-6 ${
                  isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                }`}
              >
                {/* Question */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Question {index + 1}
                    </h4>
                    <p className="text-gray-700">{question.question}</p>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3 ml-14">
                  {question.options.map((option, oIndex) => {
                    const isUserAnswer = userAnswer === oIndex;
                    const isCorrectAnswer = question.correct_answer === oIndex;

                    let className = 'p-4 rounded-lg border-2 ';
                    if (isCorrectAnswer) {
                      className += 'border-green-500 bg-green-100';
                    } else if (isUserAnswer && !isCorrect) {
                      className += 'border-red-500 bg-red-100';
                    } else {
                      className += 'border-gray-300 bg-white';
                    }

                    return (
                      <div key={oIndex} className={className}>
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                            isCorrectAnswer
                              ? 'bg-green-500 text-white'
                              : isUserAnswer
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + oIndex)}
                          </div>
                          <span className="flex-1 text-gray-900">{option}</span>
                          {isCorrectAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                          {isUserAnswer && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="mt-4 ml-14 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm text-gray-700">
                    <strong className="text-blue-900">Explanation:</strong> {question.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 p-8 bg-gray-50">
        <div className="flex items-center justify-between">
          {!passed && (
            <button
              onClick={() => {
                goToQuiz();
              }}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Quiz
            </button>
          )}

          {passed && currentModule.module_metadata.next_module && (
            <button
              onClick={() => {
                // Navigate to next module
                window.location.href = `/learn/${currentModule.module_metadata.next_module}`;
              }}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              Next Module
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {passed && (
            <button
              onClick={() => setViewMode('lesson')}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-100 border-2 border-gray-300 transition-all"
            >
              Review Lessons
            </button>
          )}
        </div>

        {/* Badge Achievement */}
        {passed && (
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-xl text-center">
            <div className="text-4xl mb-3">🏅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Badge Earned: {currentModule.completion_badge.title}
            </h3>
            <p className="text-gray-700">{currentModule.completion_badge.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
