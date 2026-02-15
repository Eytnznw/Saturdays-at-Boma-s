
import React, { useState, useEffect } from 'react';
import { Guest, Message } from '../types';
import { generateCommunitySummary } from '../services/geminiService';

interface DashboardProps {
  guests: Guest[];
  messages: Message[];
}

const Dashboard: React.FC<DashboardProps> = ({ guests, messages }) => {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const totalParticipants = guests.reduce((sum, g) => sum + g.count, 0);

  const fetchSummary = async () => {
    if (messages.length === 0) return;
    setLoading(true);
    const text = await generateCommunitySummary(messages);
    setSummary(text);
    setLoading(false);
  };

  useEffect(() => {
    if (messages.length > 0 && !summary) {
        fetchSummary();
    }
  }, [messages]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-800 text-white p-6 shadow-lg">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">השבת הקרובה</h2>
          <div className="flex items-center gap-2 text-indigo-100 mb-4">
            <i className="fa-solid fa-clock"></i>
            <span>יום שישי, 18:30 | פרשת כי-תצא</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-sm opacity-80">משתתפים סה"כ</div>
              <div className="text-3xl font-black">{totalParticipants}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="text-sm opacity-80">משפחות רשומות</div>
              <div className="text-3xl font-black">{guests.length}</div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
            <i className="fa-solid fa-dove text-9xl"></i>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-wand-magic-sparkles text-indigo-500"></i>
                סיכום האווירה (AI)
            </h3>
            <button 
                onClick={fetchSummary}
                disabled={loading}
                className="text-xs font-semibold text-indigo-600 hover:underline disabled:opacity-50"
            >
                {loading ? 'מעדכן...' : 'רענן סיכום'}
            </button>
        </div>
        <p className="text-gray-600 leading-relaxed italic">
          {loading ? 'הבינה המלאכותית מנתחת את ההודעות שלכם...' : (summary || 'עדיין אין מספיק הודעות כדי לסכם את האווירה. תכתבו משהו!')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-start gap-4">
            <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
                <h4 className="font-bold text-amber-900">מיקום המפגש</h4>
                <p className="text-amber-800 text-sm">בבמה המרכזית (לבומה), דשא קדמי.</p>
            </div>
        </div>
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <i className="fa-solid fa-utensils"></i>
            </div>
            <div>
                <h4 className="font-bold text-blue-900">מה להביא?</h4>
                <p className="text-blue-800 text-sm">כל משפחה מביאה מנה אחת, סכו"ם רב-פעמי ומצב רוח טוב.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
