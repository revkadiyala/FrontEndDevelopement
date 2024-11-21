import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Create a root container
const container = document.getElementById('root');
const root = createRoot(container);

// Render the App component to the root container
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
