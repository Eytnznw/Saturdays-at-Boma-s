
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// שכבת הגנה למניעת קריסה אם process לא מוגדר (סיבה נפוצה ל"לא נפתח")
if (typeof (window as any).process === 'undefined') {
    (window as any).process = { env: {} };
}

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
