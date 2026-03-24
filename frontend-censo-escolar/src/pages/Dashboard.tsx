import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
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

// Dados mockados de escolas com coordenadas
const escolasMock = [
  // Alta Qualidade (verde/teal)
  { id: 1, nome: "Colégio Estadual Dom Pedro II", cidade: "São Paulo", estado: "SP", lat: -23.5505, lon: -46.6333, qualidade: "alta", tipo: "Estadual", alunos: 1200 },
  { id: 2, nome: "Escola Municipal Santos Dumont", cidade: "Rio de Janeiro", estado: "RJ", lat: -22.9068, lon: -43.1729, qualidade: "alta", tipo: "Municipal", alunos: 850 },
  { id: 3, nome: "Instituto Federal de Brasília", cidade: "Brasília", estado: "DF", lat: -15.7801, lon: -47.9292, qualidade: "alta", tipo: "Federal", alunos: 2100 },
  { id: 4, nome: "Colégio Estadual Visconde de Mauá", cidade: "Curitiba", estado: "PR", lat: -25.4284, lon: -49.2733, qualidade: "alta", tipo: "Estadual", alunos: 980 },
  { id: 5, nome: "Escola Técnica Estadual", cidade: "Belo Horizonte", estado: "MG", lat: -19.9167, lon: -43.9345, qualidade: "alta", tipo: "Estadual", alunos: 1450 },
  
  // Média Qualidade (cinza)
  { id: 6, nome: "Escola Municipal Tiradentes", cidade: "Fortaleza", estado: "CE", lat: -3.7327, lon: -38.5267, qualidade: "media", tipo: "Municipal", alunos: 620 },
  { id: 7, nome: "Colégio Estadual Central", cidade: "Salvador", estado: "BA", lat: -12.9714, lon: -38.5014, qualidade: "media", tipo: "Estadual", alunos: 740 },
  { id: 8, nome: "Escola Estadual Anísio Teixeira", cidade: "Recife", estado: "PE", lat: -8.0476, lon: -34.8770, qualidade: "media", tipo: "Estadual", alunos: 890 },
  { id: 9, nome: "Escola Municipal Barão do Rio Branco", cidade: "Manaus", estado: "AM", lat: -3.1190, lon: -60.0217, qualidade: "media", tipo: "Municipal", alunos: 560 },
  { id: 10, nome: "Colégio Estadual Porto Alegre", cidade: "Porto Alegre", estado: "RS", lat: -30.0346, lon: -51.2177, qualidade: "media", tipo: "Estadual", alunos: 1050 },
  { id: 11, nome: "Escola Municipal Presidente Vargas", cidade: "Belém", estado: "PA", lat: -1.4558, lon: -48.5044, qualidade: "media", tipo: "Municipal", alunos: 480 },
  
  // Baixa Qualidade (laranja)
  { id: 12, nome: "Escola Rural São José", cidade: "Interior BA", estado: "BA", lat: -13.2564, lon: -40.3088, qualidade: "baixa", tipo: "Municipal", alunos: 180 },
  { id: 13, nome: "Escola Municipal Esperança", cidade: "Interior MA", estado: "MA", lat: -4.9609, lon: -45.2744, qualidade: "baixa", tipo: "Municipal", alunos: 230 },
  { id: 14, nome: "Escola Estadual Rural", cidade: "Interior PI", estado: "PI", lat: -7.1155, lon: -41.4635, qualidade: "baixa", tipo: "Estadual", alunos: 145 },
  { id: 15, nome: "Escola Municipal Boa Vista", cidade: "Interior RO", estado: "RO", lat: -10.9387, lon: -62.8279, qualidade: "baixa", tipo: "Municipal", alunos: 195 },
  { id: 16, nome: "Escola Rural Pequeno Príncipe", cidade: "Interior TO", estado: "TO", lat: -10.1753, lon: -48.2982, qualidade: "baixa", tipo: "Municipal", alunos: 167 },
  { id: 17, nome: "Escola Municipal Vista Alegre", cidade: "Interior GO", estado: "GO", lat: -15.8270, lon: -48.0850, qualidade: "baixa", tipo: "Municipal", alunos: 210 },
  
  // Mais escolas espalhadas
  { id: 18, nome: "Colégio Estadual Machado de Assis", cidade: "Florianópolis", estado: "SC", lat: -27.5954, lon: -48.5480, qualidade: "alta", tipo: "Estadual", alunos: 920 },
  { id: 19, nome: "Escola Municipal João Pessoa", cidade: "João Pessoa", estado: "PB", lat: -7.1195, lon: -34.8450, qualidade: "media", tipo: "Municipal", alunos: 580 },
  { id: 20, nome: "Colégio Estadual Amazonas", cidade: "Goiânia", estado: "GO", lat: -16.6869, lon: -49.2648, qualidade: "media", tipo: "Estadual", alunos: 1100 },
  { id: 21, nome: "Escola Municipal Vitória", cidade: "Vitória", estado: "ES", lat: -20.3155, lon: -40.3128, qualidade: "alta", tipo: "Municipal", alunos: 670 },
  { id: 22, nome: "Escola Estadual Senador", cidade: "Teresina", estado: "PI", lat: -5.0949, lon: -42.8042, qualidade: "media", tipo: "Estadual", alunos: 720 },
  { id: 23, nome: "Colégio Municipal Nordeste", cidade: "Natal", estado: "RN", lat: -5.7945, lon: -35.2110, qualidade: "alta", tipo: "Municipal", alunos: 810 },
  { id: 24, nome: "Escola Rural Sertão", cidade: "Interior AL", estado: "AL", lat: -9.6658, lon: -36.6597, qualidade: "baixa", tipo: "Municipal", alunos: 125 },
  { id: 25, nome: "Escola Municipal Pantanal", cidade: "Campo Grande", estado: "MS", lat: -20.4697, lon: -54.6201, qualidade: "media", tipo: "Municipal", alunos: 640 },
];

export default function Dashboard() {
  // Criar ícones customizados para cada nível de qualidade
  const criarIcone = (qualidade: string) => {
    const cores = {
      alta: '#14b8a6', // teal-500
      media: '#cbd5e1', // slate-300
      baixa: '#fdba74', // orange-300
    };

    const svgIcon = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="8" fill="${cores[qualidade as keyof typeof cores]}" stroke="white" stroke-width="2" opacity="0.9"/>
        <circle cx="16" cy="16" r="12" fill="${cores[qualidade as keyof typeof cores]}" opacity="0.3"/>
      </svg>
    `;

    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  return (
    // Container Principal: Ocupa todo o espaço restante do MainLayout (h-full)

    <div className="flex h-full w-full bg-slate-50 font-sans overflow-hidden">

      {/* ================= SIDEBAR (Filtros) ================= */}
      <aside className="w-75 shrink-0 bg-slate-900 text-slate-300 flex flex-col h-full overflow-y-auto z-20 shadow-xl">
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
            <div className="w-full h-112.5 rounded-b-xl overflow-hidden relative z-0">
              <MapContainer center={[-14.235, -51.9253]} zoom={4} className="w-full h-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                
                {/* Marcadores das escolas */}
                {escolasMock.map((escola) => (
                  <Marker 
                    key={escola.id} 
                    position={[escola.lat, escola.lon]}
                    icon={criarIcone(escola.qualidade)}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h3 className="font-bold text-slate-900 mb-2">{escola.nome}</h3>
                        <div className="space-y-1 text-sm text-slate-600">
                          <p><span className="font-medium">Cidade:</span> {escola.cidade}</p>
                          <p><span className="font-medium">Estado:</span> {escola.estado}</p>
                          <p><span className="font-medium">Tipo:</span> {escola.tipo}</p>
                          <p><span className="font-medium">Alunos:</span> {escola.alunos}</p>
                          <div className="mt-2 pt-2 border-t border-slate-200">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                              escola.qualidade === 'alta' ? 'bg-teal-100 text-teal-700' :
                              escola.qualidade === 'media' ? 'bg-slate-200 text-slate-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {escola.qualidade === 'alta' ? 'Alta Qualidade' :
                               escola.qualidade === 'media' ? 'Média Qualidade' :
                               'Baixa Qualidade'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}