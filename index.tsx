
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Entry point for the Shabbat Labuma application.
 * Renders the modularized App component into the root DOM element.
 */
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
