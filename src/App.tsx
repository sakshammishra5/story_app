import React, { useEffect, useRef, useState } from 'react';
import { StoryList } from './components/storyList';
import { StoryViewer } from './components/storyViewer';
import { stories } from './data/stories';
import './App.css';

export const App: React.FC = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transitionState, setTransitionState] = useState<'idle' | 'entering' | 'exiting'>('idle');
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startStory = (index: number) => {
    setIsLoading(true);
    setCurrentStoryIndex(index);
    setProgress(0);
    setTransitionState('entering');
    setTimeout(() => setTransitionState('idle'), 300);
  };

  const nextStory = () => {
    if (currentStoryIndex === null || currentStoryIndex >= stories.length - 1) {
      closeStory();
      return;
    }
    setTransitionState('exiting');
    setTimeout(() => {
      setIsLoading(true);
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
      setTransitionState('entering');
      setTimeout(() => setTransitionState('idle'), 300);
    }, 300);
  };

  const prevStory = () => {
    if (currentStoryIndex === null || currentStoryIndex <= 0) return;
    setTransitionState('exiting');
    setTimeout(() => {
      setIsLoading(true);
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
      setTransitionState('entering');
      setTimeout(() => setTransitionState('idle'), 300);
    }, 300);
  };

  const closeStory = () => {
    setTransitionState('exiting');
    setTimeout(() => {
      setCurrentStoryIndex(null);
      setProgress(0);
      setTransitionState('idle');
    }, 300);
  };

  useEffect(() => {
    if (currentStoryIndex !== null) {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - (startTimeRef.current || 0);
        const newProgress = (elapsed / 5000) * 100;
        setProgress(newProgress);
        if (newProgress >= 100) {
          nextStory();
        }
      }, 50);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [currentStoryIndex]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="stories-container">
      <StoryList stories={stories} onStoryClick={startStory} />
      {currentStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          currentStoryIndex={currentStoryIndex}
          progress={progress}
          isLoading={isLoading}
          transitionState={transitionState}
          onPrev={prevStory}
          onNext={nextStory}
          onImageLoad={handleImageLoad}
        />
      )}
    </div>
  );
};