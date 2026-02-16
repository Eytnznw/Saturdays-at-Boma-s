
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
      <header className="bg-indigo-900 text-white p-6 sticky top-0 z-50 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">שבת לבומה 🕯️</h1>
          <p className="text-indigo-200 text-[10px] font-medium opacity-80">קהילה חמה ומחברת</p>
        </div>
        <button 
          onClick={() => setView(ViewType.DASHBOARD)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <i className="fa-solid fa-house"></i>
        </button>
      </header>

      <main className="flex-grow p-4 pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around py-3 z-50 shadow-lg">
        <NavButton active={activeView === ViewType.DASHBOARD} onClick={() => setView(ViewType.DASHBOARD)} icon="fa-home" label="בית" />
        <NavButton active={activeView === ViewType.GUESTS} onClick={() => setView(ViewType.GUESTS)} icon="fa-users" label="מי בא?" />
        <NavButton active={activeView === ViewType.RSVP} onClick={() => setView(ViewType.RSVP)} icon="fa-calendar-plus" label="הרשמה" />
        <NavButton active={activeView === ViewType.MESSAGES} onClick={() => setView(ViewType.MESSAGES)} icon="fa-comments" label="הודעות" />
        <NavButton active={activeView === ViewType.SEARCH} onClick={() => setView(ViewType.SEARCH)} icon="fa-search" label="חיפוש" />
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${active ? 'text-indigo-700 font-bold' : 'text-gray-400'}`}>
    <i className={`fa-solid ${icon} ${active ? 'text-xl' : 'text-lg'}`}></i>
    <span className="text-[10px]">{label}</span>
  </button>
);

export default Layout;
