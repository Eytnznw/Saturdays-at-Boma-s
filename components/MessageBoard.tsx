
import React, { useState } from 'react';
import { Message } from '../types';

interface MessageBoardProps {
  messages: Message[];
  onAddMessage: (msg: Message) => void;
}

const MessageBoard: React.FC<MessageBoardProps> = ({ messages, onAddMessage }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      author,
      content,
      timestamp: Date.now()
    };

    onAddMessage(newMessage);
    setContent('');
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 px-2">לוח הודעות וברכות</h2>
      
      <form onSubmit={handleSubmit} className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 space-y-3">
        <div className="flex gap-2">
            <input 
                type="text" 
                placeholder="השם שלך"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-1/3 px-3 py-2 rounded-xl text-sm border-transparent focus:ring-indigo-500 outline-none"
            />
            <input 
                type="text" 
                placeholder="כתוב משהו נחמד..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-grow px-3 py-2 rounded-xl text-sm border-transparent focus:ring-indigo-500 outline-none"
            />
            <button 
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
            >
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </div>
      </form>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <i className="fa-solid fa-comments text-4xl mb-2 opacity-20"></i>
            <p>לוח ההודעות ריק... תגידו שבת שלום!</p>
          </div>
        ) : (
          messages.sort((a, b) => b.timestamp - a.timestamp).map((msg) => (
            <div key={msg.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm animate-slideIn">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-indigo-700">{msg.author}</span>
                <span className="text-[10px] text-gray-400">{new Date(msg.timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{msg.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageBoard;
