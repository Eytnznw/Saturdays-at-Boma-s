
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Error rendering the app:", error);
  rootElement.innerHTML = `<div style="padding: 20px; text-align: center; color: red;">
    <h2>שגיאה בטעינת האתר</h2>
    <p>${error instanceof Error ? error.message : 'שגיאה לא ידועה'}</p>
  </div>`;
}
