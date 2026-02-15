
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical error rendering the app:", error);
    rootElement.innerHTML = `
      <div style="padding: 2rem; font-family: sans-serif; text-align: center;">
        <h2 style="color: #ef4444;">שגיאה בטעינת האפליקציה</h2>
        <p>נסה לרענן את הדף</p>
      </div>
    `;
  }
}
