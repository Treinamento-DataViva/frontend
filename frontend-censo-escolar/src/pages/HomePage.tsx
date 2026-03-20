// src/pages/HomePage.tsx
import React from 'react';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">

            {/* Hero Section - Cabeçalho principal */}
            <header className="bg-blue-700 text-white py-24 px-6 text-center shadow-md">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Bem-vindo ao Censo Escolar
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-blue-100">
                    Uma plataforma moderna para visualização, análise e compreensão dos dados educacionais.
                </p>
            </header>

            {/* Conteúdo Principal - Cards explicativos */}
            <main className="grow max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">Dados Abertos</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Acesse informações detalhadas e atualizadas sobre o cenário educacional de forma transparente e acessível.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">Análise Profunda</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Explore métricas e indicadores através de ferramentas de visualização focadas na experiência do usuário.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">Tecnologia</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Desenvolvido com React e ecossistema moderno para garantir velocidade, responsividade e segurança.
                        </p>
                    </div>

                </div>
            </main>

            {/* Footer Básico */}
            <footer className="bg-slate-900 text-slate-300 py-8 text-center mt-auto">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Projeto Censo Escolar. Construído com base no DataViva.
                </p>
            </footer>

        </div>
    );
}