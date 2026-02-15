
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const startApp = () => {
    const container = document.getElementById('root');
    if (container) {
        try {
            const root = createRoot(container);
            root.render(<App />);
        } catch (e) {
            console.error("Failed to render App:", e);
        }
    }
};

// הרצה כשהדף מוכן
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}
