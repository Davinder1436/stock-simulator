'use client';

import React, { useState, useEffect } from 'react';
import { Lesson, ContentBlock } from '@/types/learning';
import { 
  BookOpen, Lightbulb, CheckCircle, TrendingUp, 
  AlertCircle, Info, Award, Calculator 
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';

interface LessonContentProps {
  lesson: Lesson;
}

export default function LessonContent({ lesson }: LessonContentProps) {
  const { markLessonComplete, userProgress } = useLearning();
  const [showQuizCheck, setShowQuizCheck] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const isLessonCompleted = userProgress?.lessons_completed.includes(lesson.lesson_id);

  // Reset quiz check state when lesson changes
  useEffect(() => {
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [lesson.lesson_id]);

  const handleQuizCheck = (answer: number) => {
    setSelectedAnswer(answer);
    setHasAnswered(true);
    
    if (answer === lesson.quiz_check.correct_answer && !isLessonCompleted) {
      markLessonComplete(lesson.lesson_id);
    }
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-6">
            {block.content}
          </p>
        );

      case 'definition':
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 text-lg mb-2">{block.term}</h3>
                <p className="text-gray-700">{block.definition}</p>
              </div>
            </div>
          </div>
        );

      case 'example':
        return (
          <div key={index} className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                {block.title && (
                  <h4 className="font-bold text-green-900 mb-2">{block.title}</h4>
                )}
                <p className="text-gray-700">{block.content}</p>
              </div>
            </div>
          </div>
        );

      case 'key_point':
        return (
          <div key={index} className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <h4 className="font-bold text-yellow-900 text-lg">Key Takeaways</h4>
            </div>
            <ul className="space-y-2 ml-9">
              {block.points?.map((point, i) => (
                <li key={i} className="text-gray-700 flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'function_card':
        return (
          <div key={index} className="grid gap-4 mb-6">
            {block.functions?.map((func, i) => (
              <div key={i} className="bg-white border-2 border-blue-200 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {func.number}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg mb-2">{func.title}</h4>
                    <p className="text-gray-700 mb-3">{func.description}</p>
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-300">
                      <p className="text-sm text-gray-700"><strong>Example:</strong> {func.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'comparison':
        return (
          <div key={index} className="mb-6">
            {block.title && (
              <h4 className="font-bold text-gray-900 text-lg mb-4">{block.title}</h4>
            )}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-semibold">Item</th>
                    {block.items?.[0]?.medium && <th className="border border-gray-300 p-3 text-left font-semibold">Medium of Exchange</th>}
                    {block.items?.[0]?.unit && <th className="border border-gray-300 p-3 text-left font-semibold">Unit of Account</th>}
                    {block.items?.[0]?.store && <th className="border border-gray-300 p-3 text-left font-semibold">Store of Value</th>}
                    {block.items?.[0]?.overall && <th className="border border-gray-300 p-3 text-left font-semibold">Overall</th>}
                    {block.items?.[0]?.era && <th className="border border-gray-300 p-3 text-left font-semibold">Era</th>}
                    {block.items?.[0]?.source && <th className="border border-gray-300 p-3 text-left font-semibold">Value Source</th>}
                    {block.items?.[0]?.vulnerability && <th className="border border-gray-300 p-3 text-left font-semibold">Vulnerability</th>}
                  </tr>
                </thead>
                <tbody>
                  {block.items?.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">{item.name || item.era}</td>
                      {item.medium && <td className="border border-gray-300 p-3">{item.medium}</td>}
                      {item.unit && <td className="border border-gray-300 p-3">{item.unit}</td>}
                      {item.store && <td className="border border-gray-300 p-3">{item.store}</td>}
                      {item.overall && <td className="border border-gray-300 p-3">{item.overall}</td>}
                      {item.source && <td className="border border-gray-300 p-3">{item.source}</td>}
                      {item.example && <td className="border border-gray-300 p-3 text-sm">{item.example}</td>}
                      {item.vulnerability && <td className="border border-gray-300 p-3 text-sm">{item.vulnerability}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div key={index} className="mb-6">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500"></div>
              <div className="space-y-8">
                {block.events?.map((event, i) => (
                  <div key={i} className="relative pl-20">
                    <div className="absolute left-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {i + 1}
                    </div>
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                      <div className="text-sm text-blue-600 font-semibold mb-1">{event.period}</div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{event.title}</h4>
                      <p className="text-gray-700 mb-3">{event.description}</p>
                      <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-300">
                        <p className="text-sm text-gray-700"><strong>Example:</strong> {event.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'property_grid':
        return (
          <div key={index} className="grid grid-cols-2 gap-4 mb-6">
            {block.properties?.map((prop, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-indigo-300 hover:shadow-lg transition-all">
                <h4 className="font-bold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                  {prop.property}
                </h4>
                <p className="text-gray-700 text-sm mb-3">{prop.description}</p>
                <div className="space-y-2">
                  <div className="bg-green-50 p-2 rounded border-l-4 border-green-400">
                    <p className="text-xs text-gray-700"><strong className="text-green-700">✓ Good:</strong> {prop.good_example}</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded border-l-4 border-red-400">
                    <p className="text-xs text-gray-700"><strong className="text-red-700">✗ Bad:</strong> {prop.bad_example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'concept_breakdown':
        return (
          <div key={index} className="mb-6">
            {block.title && (
              <h4 className="font-bold text-gray-900 text-xl mb-4">{block.title}</h4>
            )}
            <div className="space-y-4">
              {block.pillars?.map((pillar, i) => (
                <div key={i} className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 rounded-r-lg p-6">
                  <h5 className="font-bold text-purple-900 text-lg mb-2">{pillar.pillar}</h5>
                  <p className="text-gray-700 font-semibold mb-2">{pillar.description}</p>
                  <p className="text-gray-600 mb-3">{pillar.explanation}</p>
                  <div className="inline-block bg-purple-100 px-3 py-1 rounded-full">
                    <p className="text-sm font-semibold text-purple-900">{pillar.strength}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'insight':
        return (
          <div key={index} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <Info className="w-6 h-6 flex-shrink-0" />
              <h4 className="font-bold text-xl">{block.title}</h4>
            </div>
            <p className="text-white/90 whitespace-pre-line ml-9">{block.content}</p>
          </div>
        );

      case 'real_world':
        return (
          <div key={index} className="mb-6">
            {block.title && (
              <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                {block.title}
              </h4>
            )}
            <div className="space-y-4">
              {block.scenarios?.map((scenario, i) => (
                <div key={i} className="bg-orange-50 border-2 border-orange-300 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      !
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-bold text-orange-900">{scenario.scenario}</h5>
                        {scenario.failure && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                            {scenario.failure}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">{scenario.description}</p>
                      {scenario.lesson && (
                        <div className="bg-white p-3 rounded border-l-4 border-orange-400">
                          <p className="text-sm font-semibold text-gray-700">
                            <strong>Lesson:</strong> {scenario.lesson}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'money_pyramid':
      case 'process_flow':
        return (
          <div key={index} className="mb-6">
            {block.title && (
              <h4 className="font-bold text-gray-900 text-lg mb-4">{block.title}</h4>
            )}
            <div className="space-y-3">
              {(block.layers || block.steps)?.map((item: any, i) => (
                <div key={i} className="bg-white border-2 border-blue-200 rounded-lg p-5 hover:border-blue-400 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                      {item.step || i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h5 className="font-bold text-gray-900">{item.layer || item.title}</h5>
                        {item.percentage && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                            {item.percentage}
                          </span>
                        )}
                        {item.money_supply && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                            {item.money_supply}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{item.description}</p>
                      {item.example && (
                        <p className="text-xs text-gray-600 italic">{item.example}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'formula':
        return (
          <div key={index} className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-300 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <Calculator className="w-6 h-6 text-teal-600 flex-shrink-0" />
              <h4 className="font-bold text-teal-900 text-lg">{block.title}</h4>
            </div>
            <div className="bg-white p-4 rounded border-2 border-teal-200 mb-4">
              <pre className="text-center font-mono text-lg text-gray-900 font-bold">
                {block.formula}
              </pre>
            </div>
            {block.example && (
              <div className="bg-teal-100 p-4 rounded">
                <p className="text-sm text-gray-700 whitespace-pre-line font-mono">{block.example}</p>
              </div>
            )}
            {block.note && (
              <p className="text-xs text-gray-600 italic mt-3">{block.note}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Render all content blocks */}
      {lesson.content_blocks.map((block, index) => renderContentBlock(block, index))}

      {/* Quick Quiz Check */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-purple-900">Quick Check</h3>
        </div>
        
        <p className="text-lg text-gray-700 font-semibold mb-6">
          {lesson.quiz_check.question}
        </p>

        <div className="space-y-3 mb-6">
          {lesson.quiz_check.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === lesson.quiz_check.correct_answer;
            const showResult = hasAnswered;

            return (
              <button
                key={index}
                onClick={() => !hasAnswered && handleQuizCheck(index)}
                disabled={hasAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  !showResult
                    ? isSelected
                      ? 'border-purple-500 bg-purple-100'
                      : 'border-gray-300 bg-white hover:border-purple-300 hover:bg-purple-50'
                    : isCorrect
                    ? 'border-green-500 bg-green-100'
                    : isSelected
                    ? 'border-red-500 bg-red-100'
                    : 'border-gray-300 bg-gray-100'
                } ${hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    !showResult
                      ? isSelected
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                      : isCorrect
                      ? 'bg-green-500 text-white'
                      : isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1 font-medium text-gray-900">{option}</span>
                  {showResult && isCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div className={`p-4 rounded-lg ${
            selectedAnswer === lesson.quiz_check.correct_answer
              ? 'bg-green-100 border-2 border-green-300'
              : 'bg-blue-100 border-2 border-blue-300'
          }`}>
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Explanation:</strong> {lesson.quiz_check.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
