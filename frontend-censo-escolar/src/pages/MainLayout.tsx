import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* HEADER /}
      <header className="bg-green-600 text-white p-4">
        <h1>DataEdu</h1>
      </header>

      {/ CONTEÚDO DINÂMICO /}
      <main className="flex-1">
        <Outlet />
      </main>

      {/ FOOTER */}
            <footer className="bg-gray-900 text-white p-4 text-center">
                © 2026 - Projeto Censo Escolar
            </footer>
        </div>
    );
}