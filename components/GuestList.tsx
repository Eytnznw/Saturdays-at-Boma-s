
import React from 'react';
import { Guest } from '../types';

const GuestList: React.FC<{ guests: Guest[] }> = ({ guests }) => {
  const grouped = guests.reduce((acc, g) => {
    if (!acc[g.eventDate]) acc[g.eventDate] = [];
    acc[g.eventDate].push(g);
    return acc;
  }, {} as any);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold px-2">מי מגיע?</h2>
      {Object.keys(grouped).sort().reverse().map(date => (
        <div key={date} className="space-y-3">
          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full inline-block font-bold text-sm mb-2">{date}</div>
          {grouped[date].map((g: any) => (
            <div key={g.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center animate-itemEnter">
              <div>
                <p className="font-bold text-gray-800">{g.name}</p>
                <p className="text-xs text-gray-400">{g.dietaryNotes || 'לא צוין מה מביאים'}</p>
              </div>
              <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-black text-sm">{g.count}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GuestList;
