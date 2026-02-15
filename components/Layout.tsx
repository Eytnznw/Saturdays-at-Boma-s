
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-white shadow-xl relative">
      <header className="bg-indigo-900 text-white p-6 sticky top-0 z-50 shadow-md flex flex-col items-center sm:items-start">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-extrabold tracking-tight">שבת לבומה 🕯️</h1>
          <button 
            onClick={() => setView(ViewType.DASHBOARD)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Home"
          >
            <i className="fa-solid fa-house text-lg"></i>
          </button>
        </div>
        <p className="text-indigo-200 text-xs mt-1 font-medium italic opacity-80">נפגשים, אוכלים, מחייכים</p>
      </header>

      <main className="flex-grow p-4 pb-28">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around py-3 px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
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
        <NavButton 
          active={activeView === ViewType.SEARCH} 
          onClick={() => setView(ViewType.SEARCH)} 
          icon="fa-magnifying-glass" 
          label="חיפוש" 
        />
      </nav>
    </div>
  );
};

const NavButton = React.memo(({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-200 ${active ? 'text-indigo-700 scale-105' : 'text-gray-400 hover:text-indigo-400'}`}
  >
    <i className={`fa-solid ${icon} ${active ? 'text-xl' : 'text-lg'}`}></i>
    <span className="text-[11px] font-bold">{label}</span>
  </button>
));

export default Layout;
