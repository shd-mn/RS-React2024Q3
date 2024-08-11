import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import ErrorBoundary from './components/ErrorBoundary/index.js';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback="Something went wrong!">
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
