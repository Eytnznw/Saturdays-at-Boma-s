
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// וידוא שהאלמנט קיים והרצה מיידית
const container = document.getElementById('root');

if (container) {
    try {
        const root = createRoot(container);
        root.render(
            <React.Suspense fallback={null}>
                <App />
            </React.Suspense>
        );
    } catch (e) {
        console.error("React Init Error:", e);
        container.innerHTML = '<div style="padding:20px; text-align:center;">חלה שגיאה בטעינה. אנא רענן את הדף.</div>';
    }
}
