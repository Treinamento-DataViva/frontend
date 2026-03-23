import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const estados = [
  { sigla: "AC", nome: "Acre" }, { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" }, { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" }, { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" }, { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" }, { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" }, { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" }, { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" }, { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" }, { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" }, { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" }, { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" }, { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" }, { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" },
];

export default function Dashboard() {
  return (
    // Container Principal: Ocupa todo o espaço restante do MainLayout (h-full)
    <div className="flex h-full w-full bg-slate-50 font-sans overflow-hidden">

      {/* ================= SIDEBAR (Filtros) ================= */}
      <aside className="w-[300px] shrink-0 bg-slate-900 text-slate-300 flex flex-col h-full overflow-y-auto z-20 shadow-xl">
        <div className="p-6 space-y-8">

          {/* Busca */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Buscar & Filtrar</label>
            <div className="relative">
              <svg className="w-4 h-4 absolute left-3 top-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input
                type="text"
                placeholder="Buscar por nome..."
                className="w-full bg-slate-800 text-white text-sm rounded-lg pl-9 pr-3 py-2.5 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
              />
            </div>
          </div>

          {/* Região */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Região</label>
            <div className="space-y-3">
              <select className="w-full bg-slate-800 text-sm text-slate-200 rounded-lg px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-teal-500 appearance-none">
                <option value="">Todos os Estados</option>
                {estados.map((estado) => (
                  <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>
                ))}
              </select>
              <select className="w-full bg-slate-800 text-sm text-slate-200 rounded-lg px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-teal-500 appearance-none">
                <option value="">Todos os Municípios</option>
              </select>
            </div>
          </div>

          {/* Tipo de Escola (Checkboxes) */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tipo de Escola</label>
            <div className="space-y-2.5">
              {['Estado (Estadual)', 'Municipal (Municipal)', 'Privada (Privada)', 'Federal'].map((tipo, idx) => (
                <label key={tipo} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked={idx === 0 || idx === 1} />
                    <div className="w-4 h-4 rounded bg-slate-800 border border-slate-600 peer-checked:bg-teal-500 peer-checked:border-teal-500 transition-colors flex items-center justify-center">
                      <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{tipo}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags de Infraestrutura */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tags de Infraestrutura</label>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-teal-500 text-white text-[10px] font-bold uppercase rounded-md">Internet</button>
              <button className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-[10px] font-bold uppercase rounded-md transition-colors">Computer Lab</button>
              <button className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-[10px] font-bold uppercase rounded-md transition-colors">Library</button>
              <button className="px-3 py-1 bg-teal-500 text-white text-[10px] font-bold uppercase rounded-md">Potable Water</button>
              <button className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-[10px] font-bold uppercase rounded-md transition-colors">Sports Court</button>
            </div>
          </div>

          <div className="pt-4">
            <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors border border-slate-700">
              Limpar Filtros
            </button>
          </div>

        </div>
      </aside>

      {/* ================= MAIN CONTENT (Área Direita) ================= */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative">
        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">

          {/* 1. Header do Dashboard */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Visão geral da infraestrutura nacional</h1>
              <div className="flex items-center text-sm text-slate-500 gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Brasil • Exibindo 178,354 schools</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg shadow hover:bg-slate-800 transition-colors">Map View</button>
              <button className="px-4 py-2 bg-white text-slate-700 border border-slate-200 text-sm font-medium rounded-lg shadow-sm hover:bg-slate-50 transition-colors">Comparação</button>
              <button className="px-4 py-2 bg-white text-slate-700 border border-slate-200 text-sm font-medium rounded-lg shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Export Report
              </button>
            </div>
          </div>
          {/* 2. Cards de KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                label: 'Laboratório',
                value: '45.2%',
                icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', // Ícone de Becker (Química/Ciência)
                color: 'text-purple-500', bg: 'bg-purple-50', change: '+3.1%', changeColor: 'text-emerald-500'
              },
              {
                label: 'Energia',
                value: '98.5%',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z', // Ícone de Raio (Energia)
                color: 'text-yellow-500', bg: 'bg-yellow-50', change: '+0.5%', changeColor: 'text-emerald-500'
              },
              {
                label: 'Biblioteca',
                value: '62.1%',
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', // Ícone de Livro aberto
                color: 'text-blue-500', bg: 'bg-blue-50', change: '-1.2%', changeColor: 'text-red-500'
              },
              {
                label: 'Quadra Esportiva',
                value: '54.8%',
                icon: 'M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M4 12h16 M12 4v16', // Ícone de Quadra/Grid
                color: 'text-orange-500', bg: 'bg-orange-50', change: '+5.4%', changeColor: 'text-emerald-500'
              },
              {
                label: 'Refeitório',
                value: '88.3%',
                icon: 'M3 8h14v7a4 4 0 01-4 4H7a4 4 0 01-4-4V8z M17 10h1a2 2 0 010 4h-1', // Ícone de Caneca/Comida
                color: 'text-red-500', bg: 'bg-red-50', change: 'Estável', changeColor: 'text-slate-400'
              },
            ].map((kpi, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:border-slate-200 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={kpi.icon}></path>
                    </svg>
                  </div>
                  <span className={`text-xs font-bold ${kpi.changeColor}`}>{kpi.change}</span>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">{kpi.value}</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">{kpi.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 3. Área do Mapa */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-1 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Distribuição Regional (Mapa)</h3>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-sm"></span> Alta Qualidade</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-sm"></span> Média</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-300 shadow-sm"></span> Baixa Qualidade</span>
              </div>
            </div>
            {/* O z-0 aqui é crucial para o mapa não sobrepor modais/dropdowns do Tailwind */}
            <div className="w-full h-[450px] rounded-b-xl overflow-hidden relative z-0">
              <MapContainer center={[-14.235, -51.9253]} zoom={4} className="w-full h-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
              </MapContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}