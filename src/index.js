// index.js
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Make sure this path is correct

const container = document.getElementById('app'); // Match this ID with the one in your index.html
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container); // Create a root.

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
