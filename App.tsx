
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RSVPForm from './components/RSVPForm';
import GuestList from './components/GuestList';
import MessageBoard from './components/MessageBoard';
import SearchTool from './components/SearchTool';
import { Guest, Message, ViewType } from './types';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
    const [guests, setGuests] = useState<Guest[]>(() => {
        const saved = localStorage.getItem('labuma_guests');
        return saved ? JSON.parse(saved) : [];
    });
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('labuma_messages');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => { 
        localStorage.setItem('labuma_guests', JSON.stringify(guests)); 
    }, [guests]);
    
    useEffect(() => { 
        localStorage.setItem('labuma_messages', JSON.stringify(messages)); 
    }, [messages]);

    const handleAddGuest = (g: Guest) => {
        setGuests(prev => [...prev, g]);
        setTimeout(() => setActiveView(ViewType.GUESTS), 800);
    };

    const handleAddMessage = (m: Message) => {
        setMessages(prev => [m, ...prev]);
    };

    return (
        <Layout activeView={activeView} setView={setActiveView}>
            {activeView === ViewType.DASHBOARD && (
                <Dashboard guests={guests} messages={messages} />
            )}
            {activeView === ViewType.RSVP && (
                <RSVPForm onAddGuest={handleAddGuest} />
            )}
            {activeView === ViewType.GUESTS && (
                <GuestList guests={guests} />
            )}
            {activeView === ViewType.MESSAGES && (
                <MessageBoard messages={messages} onAddMessage={handleAddMessage} />
            )}
            {activeView === ViewType.SEARCH && (
                <SearchTool />
            )}
        </Layout>
    );
};

export default App;
