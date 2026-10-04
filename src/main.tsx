// Ensure window.fetch is writable and has a setter to avoid TypeError in getter-only environments
(function() {
  try {
    const rawFetch = window.fetch;
    let customFetch = rawFetch;
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get: () => customFetch,
      set: (fn) => {
        customFetch = fn;
      },
    });
  } catch (_e) {
    // Ignore if not configurable
  }
})();

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
