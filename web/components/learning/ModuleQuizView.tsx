'use client';

import React, { useState, useEffect } from 'react';
import { useLearning } from '@/context/LearningContext';
import { Clock, AlertCircle, CheckCircle, Award } from 'lucide-react';

export default function ModuleQuizView() {
  const {
    currentModule,
    quizAnswers,
    setQuizAnswer,
    submitQuiz,
    quizStartTime,
    startQuiz,
  } = useLearning();

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (currentModule && !hasStarted) {
      setTimeRemaining(currentModule.module_quiz.time_limit_minutes * 60);
    }
  }, [currentModule, hasStarted]);

  useEffect(() => {
    if (!hasStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeRemaining]);

  const handleStart = () => {
    startQuiz();
    setHasStarted(true);
  };

  const handleSubmit = () => {
    if (!quizStartTime || !currentModule) return;
    
    const timeElapsed = (Date.now() - quizStartTime) / 1000 / 60; // minutes
    submitQuiz(quizAnswers, timeElapsed);
  };

  if (!currentModule) return null;

  const quiz = currentModule.module_quiz;
  const answeredCount = Object.keys(quizAnswers).length;
  const totalQuestions = quiz.questions.length;
  const allAnswered = answeredCount === totalQuestions;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!hasStarted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{quiz.title}</h2>
          <p className="text-gray-600 text-lg mb-8">{quiz.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalQuestions}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">{quiz.time_limit_minutes}</div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">{quiz.passing_score}%</div>
              <div className="text-sm text-gray-600">To Pass</div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-yellow-900 mb-2">Before You Start</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• You have {quiz.time_limit_minutes} minutes to complete all questions</li>
                  <li>• You need {quiz.passing_score}% to pass this module</li>
                  <li>• You can review your answers before submitting</li>
                  <li>• The quiz will auto-submit when time runs out</li>
                  <li>• You can retake the quiz if you don't pass</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">{quiz.title}</h2>
            <p className="text-purple-100">
              {answeredCount} of {totalQuestions} answered
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-3xl font-bold mb-1">
              <Clock className="w-8 h-8" />
              {formatTime(timeRemaining)}
            </div>
            <p className={`text-sm ${timeRemaining < 60 ? 'text-red-200' : 'text-purple-100'}`}>
              {timeRemaining < 60 ? 'Hurry up!' : 'Time remaining'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-purple-800 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="p-8 space-y-8 max-h-[600px] overflow-y-auto">
        {quiz.questions.map((question, qIndex) => {
          const selectedAnswer = quizAnswers[question.question_id];
          const isAnswered = selectedAnswer !== undefined;

          return (
            <div
              key={question.question_id}
              className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors"
            >
              {/* Question Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                  isAnswered
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {qIndex + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {question.question}
                    </h3>
                    {isAnswered && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {question.points} points
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 ml-14">
                {question.options.map((option, oIndex) => {
                  const isSelected = selectedAnswer === oIndex;

                  return (
                    <button
                      key={oIndex}
                      onClick={() => setQuizAnswer(question.question_id, oIndex)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-300 bg-white hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          isSelected
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + oIndex)}
                        </div>
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Footer */}
      <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
        <div className="flex items-center justify-between">
          <div>
            {!allAnswered && (
              <div className="flex items-center gap-2 text-orange-600">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  {totalQuestions - answeredCount} question(s) remaining
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              allAnswered
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
