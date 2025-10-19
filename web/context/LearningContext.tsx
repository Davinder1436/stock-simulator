'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LearningModule, UserProgress, QuizAttempt } from '@/types/learning';

interface LearningContextType {
  // Module data
  currentModule: LearningModule | null;
  loadModule: (moduleId: string) => Promise<void>;
  
  // Navigation
  currentLesson: number;
  setCurrentLesson: (lesson: number) => void;
  nextLesson: () => void;
  previousLesson: () => void;
  goToQuiz: () => void;
  
  // Progress
  userProgress: UserProgress | null;
  markLessonComplete: (lessonId: string) => void;
  submitQuiz: (answers: Record<string, number>, timeTaken: number) => void;
  
  // UI State
  viewMode: 'lesson' | 'quiz' | 'results';
  setViewMode: (mode: 'lesson' | 'quiz' | 'results') => void;
  
  // Quiz state
  quizAnswers: Record<string, number>;
  setQuizAnswer: (questionId: string, answer: number) => void;
  quizStartTime: number | null;
  startQuiz: () => void;
  
  // Loading state
  loading: boolean;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [currentModule, setCurrentModule] = useState<LearningModule | null>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [viewMode, setViewMode] = useState<'lesson' | 'quiz' | 'results'>('lesson');
  const [quizAnswers, setQuizAnswersState] = useState<Record<string, number>>({});
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Load module data
  const loadModule = async (moduleId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/learning-modules/module-${moduleId}.json`);
      const data: LearningModule = await response.json();
      setCurrentModule(data);
      
      // Load or initialize user progress
      const savedProgress = localStorage.getItem(`module_progress_${moduleId}`);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setUserProgress(progress);
        setCurrentLesson(progress.current_lesson || 0);
      } else {
        const newProgress: UserProgress = {
          module_id: moduleId,
          lessons_completed: [],
          current_lesson: 0,
          quiz_attempts: [],
          completed: false,
        };
        setUserProgress(newProgress);
        setCurrentLesson(0);
      }
      
      setViewMode('lesson');
    } catch (error) {
      console.error('Error loading module:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (userProgress && currentModule) {
      localStorage.setItem(
        `module_progress_${currentModule.module_metadata.module_id}`,
        JSON.stringify(userProgress)
      );
    }
  }, [userProgress, currentModule]);

  // Navigation functions
  const nextLesson = () => {
    if (currentModule && currentLesson < currentModule.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setUserProgress(prev => prev ? { ...prev, current_lesson: currentLesson + 1 } : null);
    }
  };

  const previousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setUserProgress(prev => prev ? { ...prev, current_lesson: currentLesson - 1 } : null);
    }
  };

  const goToQuiz = () => {
    setViewMode('quiz');
    setQuizAnswersState({});
  };

  // Progress tracking
  const markLessonComplete = (lessonId: string) => {
    setUserProgress(prev => {
      if (!prev) return null;
      
      const alreadyCompleted = prev.lessons_completed.includes(lessonId);
      if (alreadyCompleted) return prev;
      
      return {
        ...prev,
        lessons_completed: [...prev.lessons_completed, lessonId],
      };
    });
  };

  // Quiz functions
  const startQuiz = () => {
    setQuizStartTime(Date.now());
    setQuizAnswersState({});
  };

  const setQuizAnswer = (questionId: string, answer: number) => {
    setQuizAnswersState(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const submitQuiz = (answers: Record<string, number>, timeTaken: number) => {
    if (!currentModule || !userProgress) return;

    const questions = currentModule.module_quiz.questions;
    let correctCount = 0;
    
    questions.forEach(q => {
      if (answers[q.question_id] === q.correct_answer) {
        correctCount++;
      }
    });

    const score = (correctCount / questions.length) * 100;
    const passed = score >= currentModule.module_quiz.passing_score;

    const attempt: QuizAttempt = {
      attempt_id: `attempt_${Date.now()}`,
      date: new Date().toISOString(),
      score,
      answers,
      time_taken_minutes: timeTaken,
      passed,
    };

    setUserProgress(prev => {
      if (!prev) return null;
      
      const updatedProgress: UserProgress = {
        ...prev,
        quiz_attempts: [...prev.quiz_attempts, attempt],
        completed: passed,
        score: passed ? score : prev.score,
        completion_date: passed ? new Date().toISOString() : prev.completion_date,
      };
      
      return updatedProgress;
    });

    setViewMode('results');
  };

  const value: LearningContextType = {
    currentModule,
    loadModule,
    currentLesson,
    setCurrentLesson,
    nextLesson,
    previousLesson,
    goToQuiz,
    userProgress,
    markLessonComplete,
    submitQuiz,
    viewMode,
    setViewMode,
    quizAnswers,
    setQuizAnswer,
    quizStartTime,
    startQuiz,
    loading,
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
