import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Importando as páginas
import HomePage from './pages/HomePage';
import Sobre from './pages/Sobre';

// Componente simples de Menu Superior (Navbar)
const NavBar = () => {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex gap-6 items-center">
        <span className="font-bold text-xl text-blue-400 mr-4">Censo Escolar</span>
        {/* O Link substitui a tag <a> para não recarregar a página */}
        <Link to="/" className="hover:text-blue-300 transition-colors">
          Início
        </Link>
        <Link to="/sobre" className="hover:text-blue-300 transition-colors">
          Sobre o Projeto
        </Link>
      </div>
    </nav>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* O fallback do Suspense mostra algo enquanto os componentes carregam */}
    <Suspense fallback={<div className="p-8 text-center text-slate-600">Carregando o Censo Escolar...</div>}>

      {/* BrowserRouter é o "motor" que gerencia as URLs */}
      <BrowserRouter>

        {/* O NavBar fica solto aqui para aparecer em TODAS as páginas */}
        <NavBar />

        {/* O Routes define qual componente renderizar dependendo do caminho (path) */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>

      </BrowserRouter>

    </Suspense>
  </StrictMode>
);