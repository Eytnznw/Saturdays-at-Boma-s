
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RSVPForm from './components/RSVPForm';
import GuestList from './components/GuestList';
import MessageBoard from './components/MessageBoard';
import { Guest, Message, ViewType } from './types';

const App: React.FC = () => {
    // Application state for navigation, guests, and messages
    const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
    const [guests, setGuests] = useState<Guest[]>(() => {
        try {
            const saved = localStorage.getItem('labuma_guests');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [messages, setMessages] = useState<Message[]>(() => {
        try {
            const saved = localStorage.getItem('labuma_messages');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Persistence layer for state
    useEffect(() => { 
        localStorage.setItem('labuma_guests', JSON.stringify(guests)); 
    }, [guests]);
    
    useEffect(() => { 
        localStorage.setItem('labuma_messages', JSON.stringify(messages)); 
    }, [messages]);

    const handleAddGuest = (g: Guest) => {
        setGuests(prev => [...prev, g]);
        // Visual transition delay before switching to the guest list
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
        </Layout>
    );
};

export default App;
