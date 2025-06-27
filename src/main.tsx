import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../src/stylesheet/styles.scss';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
