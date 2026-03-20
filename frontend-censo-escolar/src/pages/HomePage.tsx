// src/pages/HomePage.tsx

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white py-24 px-6 text-center rounded-2xl mb-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-md">
            Bem-vindo ao Censo Escolar
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-blue-100 font-light">
            Uma plataforma moderna para visualização, análise e compreensão dos dados educacionais.
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:bg-gray-50 transition-all duration-300">
            Começe Agora
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 hover:border-blue-200 transition-all duration-300 group cursor-pointer">
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-blue-700 transition-colors">Dados Abertos</h2>
          <p className="text-slate-600 leading-relaxed">
            Acesse informações detalhadas e atualizadas sobre o cenário educacional com precisão.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 hover:border-indigo-200 transition-all duration-300 group cursor-pointer">
          <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-indigo-700 transition-colors">Análise Profunda</h2>
          <p className="text-slate-600 leading-relaxed">
            Explore métricas e indicadores com visualizações intuitivas e poderosas.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 hover:border-purple-200 transition-all duration-300 group cursor-pointer">
          <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-purple-700 transition-colors">Tecnologia</h2>
          <p className="text-slate-600 leading-relaxed">
            Construído com React, Vite e Tailwind CSS para máxima performance e escalabilidade.
          </p>
        </div>

      </section>
    </>
  );
}