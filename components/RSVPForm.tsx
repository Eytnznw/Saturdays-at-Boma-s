
import React, { useState } from 'react';
import { Guest } from '../types';

const RSVPForm: React.FC<{ onAddGuest: (g: Guest) => void }> = ({ onAddGuest }) => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + (5 + 7 - d.getDay()) % 7);
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onAddGuest({ id: Math.random().toString(36).substr(2, 9), name, count, eventDate: date, dietaryNotes: notes, timestamp: Date.now() });
    setDone(true);
  };

  if (done) return (
    <div className="text-center py-20 space-y-4 animate-bounceIn">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
        <i className="fa-solid fa-check"></i>
      </div>
      <h3 className="text-2xl font-bold">נרשמת בהצלחה!</h3>
      <p className="text-gray-500">מחכים לראות אתכם בשבת.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
      <h2 className="text-2xl font-bold mb-4">הרשמה לשבת</h2>
      <div>
        <label className="block text-xs font-bold mb-1 opacity-60 uppercase">תאריך</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div>
        <label className="block text-xs font-bold mb-1 opacity-60 uppercase">שם משפחה / פרטי</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div>
        <label className="block text-xs font-bold mb-1 opacity-60 uppercase">כמות אנשים: {count}</label>
        <input type="range" min="1" max="15" value={count} onChange={e => setCount(parseInt(e.target.value))} className="w-full" />
      </div>
      <div>
        <label className="block text-xs font-bold mb-1 opacity-60 uppercase">מה מביאים? (אופציונלי)</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">אני מגיע/ה!</button>
    </form>
  );
};

export default RSVPForm;
