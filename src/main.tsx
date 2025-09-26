import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/react-learning/">
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
