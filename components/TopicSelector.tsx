import React from 'react';
import { TOPICS } from '../constants';
import { Topic } from '../types';

interface TopicSelectorProps {
  onSelectTopic: (topic: Topic) => void;
  disabled?: boolean;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ onSelectTopic, disabled }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-6 text-center">
        Bạn cần giúp đỡ về vấn đề gì hôm nay?
        <span className="block text-sm font-normal text-slate-500 mt-1">今日はどのような用件でしょうか？</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            disabled={disabled}
            className={`
              flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200
              ${topic.color}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer shadow-sm hover:shadow-md'}
            `}
          >
            <span className="text-4xl mb-3" role="img" aria-label={topic.labelVi}>
              {topic.icon}
            </span>
            <span className="font-bold text-base md:text-lg text-center">{topic.labelVi}</span>
            <span className="text-xs md:text-sm opacity-80 text-center font-medium mt-1">{topic.labelJa}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
