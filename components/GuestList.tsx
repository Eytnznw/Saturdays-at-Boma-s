
import React from 'react';
import { Guest } from '../types';

interface GuestListProps {
  guests: Guest[];
}

const GuestList: React.FC<GuestListProps> = ({ guests }) => {
  // Group guests by date
  const groupedGuests = guests.reduce((groups, guest) => {
    const date = guest.eventDate || 'תאריך לא ידוע';
    if (!groups[date]) groups[date] = [];
    groups[date].push(guest);
    return groups;
  }, {} as Record<string, Guest[]>);

  // Sort dates descending
  const sortedDates = Object.keys(groupedGuests).sort((a, b) => b.localeCompare(a));

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold text-gray-800">רשימת משתתפים</h2>
      </div>

      {sortedDates.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400">
          <i className="fa-solid fa-calendar-xmark text-5xl mb-4 opacity-30"></i>
          <p className="font-medium">אין עדיין רשומים לאף תאריך.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((date) => {
            const dateGuests = groupedGuests[date];
            const totalOnDate = dateGuests.reduce((sum, g) => sum + g.count, 0);

            return (
              <div key={date} className="space-y-3">
                <div className="flex items-center gap-3 sticky top-[80px] bg-white/90 backdrop-blur py-2 z-10">
                  <div className="h-px flex-grow bg-gray-200"></div>
                  <h3 className="font-black text-indigo-900 bg-indigo-50 px-4 py-1.5 rounded-full text-sm shadow-sm border border-indigo-100">
                    {formatDate(date)} 
                    <span className="mr-2 opacity-60 text-xs">({totalOnDate} איש)</span>
                  </h3>
                  <div className="h-px flex-grow bg-gray-200"></div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {dateGuests.sort((a, b) => b.timestamp - a.timestamp).map((guest) => (
                    <div key={guest.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-indigo-200 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-50 to-blue-50 flex items-center justify-center text-indigo-600 font-bold group-hover:from-indigo-600 group-hover:to-blue-600 group-hover:text-white transition-all text-sm">
                          {guest.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{guest.name}</h4>
                          {guest.dietaryNotes && (
                            <p className="text-[11px] text-gray-500 mt-0.5 max-w-[200px] truncate">{guest.dietaryNotes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                        <i className="fa-solid fa-user-group text-[10px] text-gray-400"></i>
                        <span className="font-bold text-gray-700 text-sm">{guest.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GuestList;
