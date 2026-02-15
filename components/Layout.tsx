
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-white shadow-xl">
      <header className="bg-indigo-900 text-white p-6 sticky top-0 z-10 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight">שבת לבומה 🕯️</h1>
          <button 
            onClick={() => setView(ViewType.DASHBOARD)}
            className="text-indigo-200 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-house text-xl"></i>
          </button>
        </div>
        <p className="text-indigo-200 text-sm mt-1 font-medium italic">נפגשים, אוכלים, מחייכים</p>
      </header>

      <main className="flex-grow p-4 pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white border-t border-gray-200 flex justify-around py-3 px-2 z-20">
        <NavButton 
          active={activeView === ViewType.DASHBOARD} 
          onClick={() => setView(ViewType.DASHBOARD)} 
          icon="fa-calendar-day" 
          label="בית" 
        />
        <NavButton 
          active={activeView === ViewType.GUESTS} 
          onClick={() => setView(ViewType.GUESTS)} 
          icon="fa-users" 
          label="מי בא?" 
        />
        <NavButton 
          active={activeView === ViewType.RSVP} 
          onClick={() => setView(ViewType.RSVP)} 
          icon="fa-pen-to-square" 
          label="הרשמה" 
        />
        <NavButton 
          active={activeView === ViewType.MESSAGES} 
          onClick={() => setView(ViewType.MESSAGES)} 
          icon="fa-comment-dots" 
          label="הודעות" 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-indigo-700 scale-110' : 'text-gray-400 hover:text-indigo-400'}`}
  >
    <i className={`fa-solid ${icon} text-lg`}></i>
    <span className="text-xs font-bold">{label}</span>
  </button>
);

export default Layout;
