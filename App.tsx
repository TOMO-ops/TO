import React, { useState, useEffect, useRef } from 'react';
import { Message, Role, Topic } from './types';
import { sendMessageStream, resetChat } from './services/geminiService';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import TopicSelector from './components/TopicSelector';
import { Eraser, RefreshCw } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setHasStarted(true);

    try {
      // 2. Prepare Placeholder for AI Message
      const botMsgId = (Date.now() + 1).toString();
      const botMsgPlaceholder: Message = {
        id: botMsgId,
        role: Role.MODEL,
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };
      
      setMessages((prev) => [...prev, botMsgPlaceholder]);

      // 3. Stream response
      const stream = sendMessageStream(text);
      let accumulatedText = '';

      for await (const chunk of stream) {
        accumulatedText += chunk;
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === botMsgId 
              ? { ...msg, content: accumulatedText } 
              : msg
          )
        );
      }

      // 4. Finalize
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === botMsgId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );

    } catch (error) {
      console.error("Failed to generate response", error);
      const errorMsg: Message = {
        id: Date.now().toString(),
        role: Role.MODEL,
        content: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau. (Sorry, I encountered an error.)",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicSelect = (topic: Topic) => {
    handleSendMessage(`${topic.promptPrefix} (Hãy tư vấn cho tôi về ${topic.labelVi})`);
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cuộc trò chuyện này?")) {
      setMessages([]);
      setHasStarted(false);
      resetChat();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 relative">
      
      {/* Header */}
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">Tomodachi</h1>
              <p className="text-[10px] text-slate-500 font-medium">Trợ lý cuộc sống Nhật Bản</p>
            </div>
          </div>
          
          {hasStarted && (
            <button 
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Bắt đầu lại / Reset"
            >
              <Eraser className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
        
        {!hasStarted ? (
          <div className="h-full flex flex-col items-center justify-center min-h-[400px]">
            <div className="mb-8 text-center animate-fade-in-up">
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-lg mb-4">
                 <span className="text-3xl">🇯🇵 🤝 🇻🇳</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Xin chào! / こんにちは!</h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Tôi là bạn đồng hành của bạn tại Nhật Bản. Tôi có thể giúp gì cho bạn hôm nay?
              </p>
            </div>
            
            <TopicSelector onSelectTopic={handleTopicSelect} disabled={isLoading} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            
            {/* Typing Indicator if loading but no message content yet (edge case) */}
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === Role.USER && (
               <div className="flex justify-start w-full mb-6">
                 <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                 </div>
               </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading} 
      />
    </div>
  );
}
