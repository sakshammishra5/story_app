import React from 'react';
import { Story } from '../types/Story';

interface StoryListProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

export const StoryList: React.FC<StoryListProps> = ({ stories, onStoryClick }) => {
  return (
    <div className="story-list">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className="story-preview"
          onClick={() => onStoryClick(index)}
        >
          <img src={story.url} alt={story.user} />
        </div>
      ))}
    </div>
  );
};