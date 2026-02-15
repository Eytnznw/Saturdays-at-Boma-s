
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RSVPForm from './components/RSVPForm';
import GuestList from './components/GuestList';
import MessageBoard from './components/MessageBoard';
import { ViewType, Guest, Message } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Local storage persistence
  useEffect(() => {
    const savedGuests = localStorage.getItem('labuma_guests');
    const savedMessages = localStorage.getItem('labuma_messages');
    
    if (savedGuests) setGuests(JSON.parse(savedGuests));
    if (savedMessages) setMessages(JSON.parse(savedMessages));

    // Default mock data if empty
    if (!savedMessages) {
        setMessages([
            { id: '1', author: 'מערכת', content: 'ברוכים הבאים לשבת לבומה! מוזמנים להירשם לתאריכים הקרובים.', timestamp: Date.now() }
        ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('labuma_guests', JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem('labuma_messages', JSON.stringify(messages));
  }, [messages]);

  const handleAddGuest = (guest: Guest) => {
    setGuests(prev => [...prev, guest]);
    // After 2 seconds, move to guest list to see the update
    setTimeout(() => setActiveView(ViewType.GUESTS), 2000);
  };

  const handleAddMessage = (msg: Message) => {
    setMessages(prev => [msg, ...prev]);
  };

  const renderContent = () => {
    switch (activeView) {
      case ViewType.DASHBOARD:
        return <Dashboard guests={guests} messages={messages} />;
      case ViewType.RSVP:
        return <RSVPForm onAddGuest={handleAddGuest} />;
      case ViewType.GUESTS:
        return <GuestList guests={guests} />;
      case ViewType.MESSAGES:
        return <MessageBoard messages={messages} onAddMessage={handleAddMessage} />;
      default:
        return <Dashboard guests={guests} messages={messages} />;
    }
  };

  return (
    <Layout activeView={activeView} setView={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
