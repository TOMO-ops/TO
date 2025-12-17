import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Role } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          relative max-w-[85%] md:max-w-[75%] lg:max-w-[65%] rounded-2xl px-5 py-4 shadow-sm text-sm md:text-base leading-relaxed
          ${
            isUser
              ? 'bg-indigo-600 text-white rounded-br-none'
              : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
          }
        `}
      >
        {/* Avatar / Label */}
        <div className={`text-xs font-bold mb-1 opacity-70 ${isUser ? 'text-indigo-100' : 'text-slate-500'}`}>
            {isUser ? 'Bạn' : 'Tomodachi'}
        </div>

        {/* Content */}
        <div className={`prose ${isUser ? 'prose-invert' : 'prose-slate'} max-w-none break-words`}>
          <ReactMarkdown
            components={{
              // Customize list items to look better
              ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1 my-2" {...props} />,
              // Customize headings for the Japanese section usually
              h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 border-b border-opacity-30 pb-1 border-current" {...props} />,
              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-current opacity-90" {...props} />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        
        {/* Timestamp */}
        <div className={`text-[10px] text-right mt-2 opacity-60`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
