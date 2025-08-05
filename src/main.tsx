import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '../src/stylesheet/styles.scss';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>
);
