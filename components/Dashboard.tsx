
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
        if (messages.length > 0 && !summary) {
            setLoading(true);
            generateCommunitySummary(messages).then(res => {
                setSummary(res);
                setLoading(false);
            });
        }
    }, [messages, summary]);

    return (
        <div className="space-y-6 animate-itemEnter">
            {/* Main Stats Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 to-blue-900 text-white p-8 shadow-2xl min-h-[220px] flex flex-col justify-between">
                <div className="relative z-10">
                    <h2 className="text-4xl font-black mb-1">שבת לבומה</h2>
                    <p className="opacity-80 italic text-sm">המפגש השכונתי השבועי</p>
                    <div className="flex gap-4 mt-8">
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 flex-1 border border-white/20 transition-all hover:bg-white/20">
                            <div className="text-[10px] uppercase opacity-60 font-bold tracking-wider">משתתפים</div>
                            <div className="text-3xl font-black">{total}</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 flex-1 border border-white/20 transition-all hover:bg-white/20">
                            <div className="text-[10px] uppercase opacity-60 font-bold tracking-wider">משפחות</div>
                            <div className="text-3xl font-black">{guests.length}</div>
                        </div>
                    </div>
                </div>
                <i className="fa-solid fa-dove absolute -right-4 -bottom-4 text-9xl opacity-10 rotate-12 pointer-events-none"></i>
            </div>

            {/* AI Community Summary Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[120px]">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-sparkles text-amber-500"></i>
                    מה קורה בקהילה?
                </h3>
                <div className="text-gray-600 text-sm leading-relaxed italic">
                    {loading ? (
                        <div className="flex items-center gap-2 text-indigo-400">
                            <i className="fa-solid fa-circle-notch animate-spin"></i>
                            מנתח הודעות ויוצר סיכום...
                        </div>
                    ) : (
                        summary || 'הלוח מחכה להודעות הראשונות שלכם! כתבו משהו בלוח ההודעות כדי לעדכן את הקהילה.'
                    )}
                </div>
            </div>

            {/* Location Information */}
            <div className="bg-amber-50 p-4 rounded-2xl flex items-center gap-4 border border-amber-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
                    <i className="fa-solid fa-location-dot text-lg"></i>
                </div>
                <div>
                    <div className="font-bold text-amber-900">מיקום המפגש</div>
                    <div className="text-amber-800 opacity-80 text-sm">בדשא המרכזי של לבומה, נפגשים בשישי אחה"צ</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
