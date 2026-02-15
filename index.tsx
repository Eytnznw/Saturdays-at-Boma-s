
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Entry point for the Shabbat Labuma application.
 */
const rootElement = document.getElementById('root');
const splashScreen = document.getElementById('splash-screen');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

    // הסרת מסך הטעינה לאחר שהאפליקציה מוכנה
    // נותנים ל-React שבריר שנייה לסיים את הרינדור הראשוני
    setTimeout(() => {
        if (splashScreen) {
            splashScreen.classList.add('hidden');
            // הסרה פיזית מה-DOM לאחר האנימציה
            setTimeout(() => splashScreen.remove(), 500);
        }
    }, 100);
}
