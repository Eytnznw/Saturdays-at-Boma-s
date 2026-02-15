
import React, { useState, useEffect } from 'react';
import { Guest, Message } from '../types';
import { generateCommunitySummary } from '../services/geminiService';

interface DashboardProps {
  guests: Guest[];
  messages: Message[];
}

const Dashboard: React.FC<DashboardProps> = ({ guests, messages }) => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const total = guests.reduce((sum, g) => sum + g.count, 0);

    useEffect(() => {
        // טעינת סיכום ה-AI ברקע בלבד
        if (messages.length > 0 && !summary) {
            setLoading(true);
            generateCommunitySummary(messages)
                .then(res => setSummary(res))
                .catch(() => setSummary('שבת שלום לכל הקהילה!'))
                .finally(() => setLoading(false));
        }
    }, [messages.length]);

    return (
        <div className="space-y-6 animate-itemEnter">
            {/* כרטיס נתונים מרכזי - מופיע מיד */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-800 to-blue-900 text-white p-8 shadow-xl">
                <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-1">שבת לבומה 🕯️</h2>
                    <p className="opacity-70 text-sm">המפגש הקהילתי שלנו</p>
                    <div className="flex gap-4 mt-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10">
                            <div className="text-[10px] uppercase opacity-60 font-bold">משתתפים</div>
                            <div className="text-3xl font-black">{total}</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10">
                            <div className="text-[10px] uppercase opacity-60 font-bold">משפחות</div>
                            <div className="text-3xl font-black">{guests.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* מיקום - מופיע מיד */}
            <div className="bg-amber-50 p-4 rounded-2xl flex items-center gap-4 border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                    <div className="font-bold text-amber-900 text-sm">מיקום המפגש</div>
                    <div className="text-amber-800 opacity-80 text-xs">בדשא המרכזי, נפגשים בשישי אחה"צ</div>
                </div>
            </div>

            {/* סיכום AI - נטען בנפרד ולא עוצר את הדף */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2 text-sm flex items-center gap-2">
                    <i className="fa-solid fa-sparkles text-amber-500"></i>
                    עדכוני קהילה
                </h3>
                <div className="text-gray-600 text-sm leading-relaxed">
                    {loading ? (
                        <span className="flex items-center gap-2 text-indigo-300 animate-pulse">
                            <i className="fa-solid fa-circle-notch animate-spin"></i>
                            מעדכן...
                        </span>
                    ) : (
                        summary || 'אין עדכונים חדשים כרגע. כתבו משהו בלוח ההודעות!'
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
