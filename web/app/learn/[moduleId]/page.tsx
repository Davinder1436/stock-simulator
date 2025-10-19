'use client';

import { LearningProvider } from '@/context/LearningContext';
import LearningModuleViewer from '@/components/learning/LearningModuleViewer';

export default function LearnModulePage({ params }: { params: { moduleId: string } }) {
  return (
    <LearningProvider>
      <LearningModuleViewer moduleId={params.moduleId} />
    </LearningProvider>
  );
}
