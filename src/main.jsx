import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

if (window.location.hash) {
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}`
  );
}

window.scrollTo(0, 0);
window.addEventListener(
  'load',
  () => {
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  },
  { once: true }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
