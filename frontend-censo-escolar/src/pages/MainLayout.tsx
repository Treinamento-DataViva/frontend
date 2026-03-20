
import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* HEADER */}
      <header className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
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
              className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white transition"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          
          <p>© 2026 DataEscola</p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">
              Privacidade
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Contato
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}