import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import MainLayout from './pages/MainLayout';
import HomePage from './pages/HomePage';
import Sobre from './pages/Sobre';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={
      <div className="p-8 text-center text-slate-600">
        Carregando...
      </div>
    }>
      <BrowserRouter>

        <Routes>
          {/* Layout envolvendo tudo */}
          <Route path="/" element={<MainLayout />}>

            {/* Página Home */}
            <Route index element={<HomePage />} />

            {/* Página Sobre */}
            <Route path="sobre" element={<Sobre />} />

          </Route>
        </Routes>

      </BrowserRouter>
    </Suspense>
  </StrictMode>
);