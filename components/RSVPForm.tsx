
import React, { useState } from 'react';
import { Guest } from '../types';

interface RSVPFormProps {
  onAddGuest: (guest: Guest) => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onAddGuest }) => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [date, setDate] = useState(() => {
    // Default to next Friday
    const d = new Date();
    d.setDate(d.getDate() + (5 + 7 - d.getDay()) % 7);
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;

    const newGuest: Guest = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      count,
      eventDate: date,
      dietaryNotes: notes,
      timestamp: Date.now()
    };

    onAddGuest(newGuest);
    setSubmitted(true);
    
    setTimeout(() => {
        setSubmitted(false);
        setName('');
        setCount(1);
        setNotes('');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4 animate-bounceIn">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl">
          <i className="fa-solid fa-check"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-800">איזה כיף! נתראה בשבת</h3>
        <p className="text-gray-500">הפרטים שלך נשמרו בהצלחה.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">הרשמה למפגש</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">תאריך השבת</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">שם המשתתף / משפחה</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="למשל: משפחת כהן"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">כמות אנשים (כולל ילדים)</label>
          <div className="flex items-center gap-4">
            <button 
              type="button" 
              onClick={() => setCount(Math.max(1, count - 1))}
              className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
            >
              -
            </button>
            <div className="text-2xl font-black w-8 text-center">{count}</div>
            <button 
              type="button" 
              onClick={() => setCount(count + 1)}
              className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">הערות / מה מביאים? (אופציונלי)</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="למשל: פשטידת תירס וסלט ירוק"
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          אני מגיע/ה! 🚀
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;
