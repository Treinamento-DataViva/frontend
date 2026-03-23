import { Outlet, Link, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  // Verificamos se estamos no Dashboard ou na Comparação para liberar o layout de tela cheia
  // Ambas as ferramentas geralmente precisam de 100% da altura para mapas e gráficos.
  const isFullScreenPage = location.pathname === '/dashboard' || location.pathname === '/comparacao';

  return (
    <div className={`flex flex-col bg-gray-50 ${isFullScreenPage ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>

      {/* HEADER */}
      <header className="bg-blue-900 text-white shadow-md shrink-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo / Título */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center font-bold text-blue-900">
              D
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              DataEscola
            </h1>
          </Link>

          {/* Navegação Atualizada */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-300 transition">
              Início
            </Link>

            {/* Novo link de Comparações */}
            <Link to="/comparacao" className="hover:text-blue-300 transition">
              Comparações
            </Link>

            <Link to="/sobre" className="hover:text-blue-300 transition">
              Sobre
            </Link>

            <Link
              to="/dashboard"
              className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white transition shadow-sm"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO */}

      <main className={`flex-1 w-full ${isFullScreenPage ? 'flex flex-col relative min-h-0' : 'max-w-7xl mx-auto px-6 py-8'}`}>
        <Outlet />
      </main>

      {/* FOOTER GLOBAL */}
      {/* Escondido em Dashboard e Comparação para focar nos dados */}
      {!isFullScreenPage && (
        <footer className="bg-blue-950 text-blue-200 mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 DataEscola</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition">Privacidade</span>
              <span className="hover:text-white cursor-pointer transition">Contato</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}