import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const resetScrollPosition = () => {
  if (window.location.hash) return;
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
};

resetScrollPosition();

window.addEventListener('load', () => {
  window.requestAnimationFrame(resetScrollPosition);
  window.setTimeout(resetScrollPosition, 100);
}, { once: true });

window.addEventListener('pageshow', resetScrollPosition);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
