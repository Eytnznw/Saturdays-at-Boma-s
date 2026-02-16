
import React, { useState } from 'react';
import { Message } from '../types';

const MessageBoard: React.FC<{ messages: Message[], onAddMessage: (m: Message) => void }> = ({ messages, onAddMessage }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const send = (e: any) => {
    e.preventDefault();
    if (!name || !text) return;
    onAddMessage({ id: Math.random().toString(36).substr(2,9), author: name, content: text, timestamp: Date.now() });
    setText('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">ברכות והודעות</h2>
      <form onSubmit={send} className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3">
        <input placeholder="שמך" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl outline-none" />
        <div className="flex gap-2">
          <input placeholder="הודעה..." value={text} onChange={e => setText(e.target.value)} className="flex-grow p-3 bg-gray-50 rounded-xl outline-none" />
          <button className="bg-indigo-600 text-white p-3 rounded-xl"><i className="fa-solid fa-paper-plane"></i></button>
        </div>
      </form>
      <div className="space-y-3">
        {messages.map(m => (
          <div key={m.id} className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm animate-itemEnter">
            <p className="font-bold text-indigo-600 text-sm mb-1">{m.author}</p>
            <p className="text-gray-700 text-sm">{m.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBoard;
