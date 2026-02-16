
import React, { useState, useEffect } from 'react';
import { Guest, Message } from '../types';
import { generateCommunitySummary } from '../services/geminiService';

const Dashboard: React.FC<{ guests: Guest[], messages: Message[] }> = ({ guests, messages }) => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const total = guests.reduce((sum, g) => sum + g.count, 0);

    useEffect(() => {
        if (messages.length > 0 && !summary) {
            setLoading(true);
            generateCommunitySummary(messages)
                .then(res => setSummary(res))
                .finally(() => setLoading(false));
        }
    }, [messages.length]);

    return (
        <div className="space-y-6 animate-itemEnter">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-800 to-indigo-950 text-white p-8 shadow-xl">
                <h2 className="text-2xl font-black mb-4">סיכום המפגש הקרוב</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/5">
                        <p className="text-[10px] opacity-60 font-bold uppercase">סה"כ משתתפים</p>
                        <p className="text-3xl font-black">{total}</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/5">
                        <p className="text-[10px] opacity-60 font-bold uppercase">בתי אב</p>
                        <p className="text-3xl font-black">{guests.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-wand-magic-sparkles text-amber-500"></i>
                    מה קורה בקהילה? (AI)
                </h3>
                <div className="text-gray-600 text-sm leading-relaxed italic">
                    {loading ? "מנתח את הודעות הקהילה..." : (summary || "כתבו הודעה ראשונה בלוח כדי לראות סיכום!")}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
