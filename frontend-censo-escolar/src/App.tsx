import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import MainLayout from './pages/MainLayout';
import HomePage from './pages/HomePage';
import Sobre from './pages/Sobre';
import Dashboard from './pages/Dashboard';
import Comparacao from './pages/Comparacao';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="p-8 text-center text-slate-600">Carregando...</div>}>
      <BrowserRouter>
        <Routes>
          {/* MainLayout envolve TUDO para garantir o Header em todas as telas */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="comparacao" element={<Comparacao />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);