import { Outlet, Link, useLocation } from "react-router-dom";

export default function MainLayout() {
  // 1. Pegamos a rota atual do navegador
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    // 2. Se for Dashboard, travamos a altura na tela toda (h-screen overflow-hidden). 
    // Se for outra página, deixamos rolar normalmente (min-h-screen).
    <div className={`flex flex-col bg-gray-50 ${isDashboard ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      
      {/* HEADER (Fixo e igual para todas as páginas) */}
      <header className="bg-blue-900 text-white shadow-md shrink-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          
          {/* Logo / Título */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center font-bold text-blue-900">
              D
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              DataEscola
            </h1>
          </div>

          {/* Navegação */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-300 transition">
              Início
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
      {/* 3. A mágica acontece aqui: 
          Se for Dashboard -> Ocupa tudo, sem margem, sem padding.
          Se não for -> Fica na caixa de max-w-7xl com padding. */}
      <main className={`flex-1 w-full ${isDashboard ? 'flex flex-col relative' : 'max-w-7xl mx-auto px-6 py-8'}`}>
        <Outlet />
      </main>

      {/* FOOTER GLOBAL */}
      {/* 4. Escondemos este footer no Dashboard, pois o Dashboard já tem o rodapé específico dele */}
      {!isDashboard && (
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