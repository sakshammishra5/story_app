import React from 'react';
import { Story } from '../types/Story';

interface StoryViewerProps {
  stories: Story[];
  currentStoryIndex: number;
  progress: number;
  isLoading: boolean;
  transitionState: 'idle' | 'entering' | 'exiting';
  onPrev: () => void;
  onNext: () => void;
  onImageLoad: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  currentStoryIndex,
  progress,
  isLoading,
  transitionState,
  onPrev,
  onNext,
  onImageLoad,
}) => {
  return (
    <div className={`story-viewer ${currentStoryIndex === null ? 'hidden' : ''}`}>
      {isLoading && <div className="loading">Loading...</div>}
      <>
        <div className="progress-bar-container">
          {stories.map((_, index) => (
            <div key={index} className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width:
                    index === currentStoryIndex
                      ? `${progress}%`
                      : index < currentStoryIndex
                      ? '100%'
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>
        <div className="tap-area left" onClick={onPrev}></div>
        <div className="tap-area right" onClick={onNext}></div>
        <img
          src={stories[currentStoryIndex]?.url}
          alt="story"
          className={`story-image ${transitionState}`}
          onLoad={onImageLoad}
        />
      </>
    </div>
  );
};