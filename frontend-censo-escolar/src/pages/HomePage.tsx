import { Link } from 'react-router-dom';
// Importação da imagem adicionada (Ajuste o '../assets' se a sua pasta estiver em outro nível)
import imagemHero from '../assets/imagem.png';

export default function HomePage() {
  return (
    <div className="page-container">

      {/* 1. Bloco Hero */}
      <section className="card-hero">
        <div className="md:w-1/2 space-y-6">
          <span className="badge-teal">Visualização Principal</span>
          <br></br>
          <br></br>
          <h1 className="title-xl text-slate-900">
            Diagnóstico do <br /> Cenário Escolar
          </h1>

          {/* TEXTO ATUALIZADO PARA REFLETIR O DASHBOARD DE HEATMAP MUNICIPAL */}
          <p className="text-hero-desc text-justify">
            Explore nosso mapa de calor interativo. Visualize a distribuição espacial da infraestrutura escolar, acessibilidade e alimentação, analisando indicadores detalhados por município através de dados oficiais do Censo Escolar.
          </p>
          <br></br>
          <div>
            <Link to="/dashboard" className="btn-primary">
              Acessar Dashboard
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Ilustração - Imagem Importada */}
        <div className="md:w-1/2 flex justify-center lg:justify-end items-center">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-square flex items-center justify-center p-4">
            <img
              src={imagemHero}
              alt="Ilustração do cenário escolar"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* 2. Bloco Comparação - RADAR + BARRAS HORIZONTAIS */}
      <section className="card-dark">
        <div className="md:w-1/3 space-y-6">
          <h2 className="title-lg text-white">
            Análises<br />Comparativas
          </h2>

          <p className="text-dark-desc text-justify">
            Compare seu estado com a Média Nacional ou com outras unidades da federação usando os índices oficiais do Censo Escolar.
          </p>

          {/* BOTÃO ATUALIZADO: Padronizado com o botão principal para ter o mesmo tamanho */}
          <div>
            <Link
              to="/comparacao"
              className="btn-teal"
            >
              Comparar Agora
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* PAINEL SVG DE DADOS */}
        <div className="md:w-2/3 flex justify-center items-center w-full mt-8 md:mt-0">
          <svg
            className="w-full max-w-2xl h-auto drop-shadow-lg"
            viewBox="0 0 520 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fundo do painel */}
            <rect x="10" y="10" width="500" height="220" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />

            {/* --- LADO ESQUERDO: GRÁFICO DE RADAR --- */}
            <g transform="translate(30, 0)">
              {/* Teias do Radar */}
              <polygon points="100,55 166,103 141,182 59,182 34,103" stroke="#334155" strokeWidth="1" fill="none" />
              <polygon points="100,80 145,111 126,161 74,161 55,111" stroke="#334155" strokeWidth="1" fill="none" />
              <polygon points="100,105 119,119 112,141 88,141 81,119" stroke="#334155" strokeWidth="1" fill="none" />

              {/* Eixos */}
              <line x1="100" y1="125" x2="100" y2="55" stroke="#334155" strokeWidth="1" />
              <line x1="100" y1="125" x2="166" y2="103" stroke="#334155" strokeWidth="1" />
              <line x1="100" y1="125" x2="141" y2="182" stroke="#334155" strokeWidth="1" />
              <line x1="100" y1="125" x2="59" y2="182" stroke="#334155" strokeWidth="1" />
              <line x1="100" y1="125" x2="34" y2="103" stroke="#334155" strokeWidth="1" />

              {/* Área de Dados 1 (Ex: Média Nacional - Slate Escuro) */}
              <polygon points="100,85 135,115 120,150 80,140 65,105" fill="#475569" fillOpacity="0.6" stroke="#64748b" strokeWidth="1.5" />

              {/* Área de Dados 2 (Ex: Estado Selecionado - Teal animado) */}
              <polygon points="100,65 150,110 130,170 85,165 45,115" fill="#14b8a6" fillOpacity="0.5" stroke="#14b8a6" strokeWidth="2" className="animate-pulse" />
            </g>

            {/* --- LADO DIREITO: GRÁFICO DE BARRAS HORIZONTAIS --- */}
            <g transform="translate(240, 10)">
              {/* Grade Vertical */}
              <line x1="70" y1="30" x2="70" y2="190" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="130" y1="30" x2="130" y2="190" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="190" y1="30" x2="190" y2="190" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="250" y1="30" x2="250" y2="190" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

              {/* Eixo Base (Vertical) */}
              <line x1="10" y1="30" x2="10" y2="190" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />

              {/* Grupo de Barras 1 */}
              <rect x="10" y="50" width="110" height="14" rx="2" fill="#14b8a6" className="animate-pulse opacity-90" />
              <rect x="10" y="68" width="60" height="14" rx="2" fill="#475569" />

              {/* Grupo de Barras 2 */}
              <rect x="10" y="100" width="220" height="14" rx="2" fill="#14b8a6" className="animate-pulse opacity-90" />
              <rect x="10" y="118" width="140" height="14" rx="2" fill="#475569" />

              {/* Grupo de Barras 3 */}
              <rect x="10" y="150" width="160" height="14" rx="2" fill="#14b8a6" className="animate-pulse opacity-90" />
              <rect x="10" y="168" width="90" height="14" rx="2" fill="#475569" />

              {/* Linha de Tendência ligando os pontos teal */}
              <path d="M120 57 L230 107 L170 157" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="120" cy="57" r="4" fill="#0ea5e9" />
              <circle cx="230" cy="107" r="4" fill="#0ea5e9" />
              <circle cx="170" cy="157" r="4" fill="#0ea5e9" />
            </g>
          </svg>
        </div>
      </section>

      {/* 3. Bloco Sobre - COM ILUSTRAÇÃO DO LIVRO/DADOS */}
      <section className="card-teal">
        <div className="md:w-3/5 space-y-6">
          <h2 className="title-lg">
            Sobre o <br /> DataEscola
          </h2>

          <p className="text-teal-desc text-justify">
            A principal plataforma independente de tecnologia para visualizar e analisar dados oficiais do Censo da Educação Brasileira. Conheça nossa história, a metodologia aplicada e a equipe por trás do projeto.
          </p>

          <div>
            <Link to="/sobre" className="btn-secondary">
              Conheça o projeto
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Ilustração Decorativa (Livro e Metodologia) */}
        <div className="md:w-2/5 flex justify-center items-center w-full mt-8 md:mt-0">
          <svg
            className="w-full max-w-xs h-auto"
            viewBox="0 0 300 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Círculo de fundo para destaque */}
            <circle cx="150" cy="100" r="85" fill="#ffffff" fillOpacity="0.1" />

            {/* Páginas do Livro */}
            <path d="M150 160 C150 160 110 170 60 150 L60 70 C110 90 150 80 150 80 Z" fill="#f8fafc" stroke="#334155" strokeWidth="3" strokeLinejoin="round" />
            <path d="M150 160 C150 160 190 170 240 150 L240 70 C190 90 150 80 150 80 Z" fill="#ffffff" stroke="#334155" strokeWidth="3" strokeLinejoin="round" />
            <path d="M150 80 L150 160" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

            {/* Elementos de Texto (Linhas) na página esquerda */}
            <line x1="80" y1="105" x2="130" y2="105" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <line x1="80" y1="120" x2="115" y2="120" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <line x1="80" y1="135" x2="125" y2="135" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

            {/* Elementos de Gráfico na página direita */}
            <rect x="175" y="115" width="12" height="25" rx="2" fill="#14b8a6" />
            <rect x="195" y="100" width="12" height="40" rx="2" fill="#475569" />
            <rect x="215" y="85" width="12" height="55" rx="2" fill="#14b8a6" />

            {/* Lupa (Análise de Dados) sobre a página esquerda */}
            <circle cx="110" cy="95" r="22" fill="#ffffff" fillOpacity="0.9" stroke="#0ea5e9" strokeWidth="4" />
            <path d="M98 95 L110 83 M102 102 L120 85" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <line x1="126" y1="111" x2="148" y2="133" stroke="#0ea5e9" strokeWidth="5" strokeLinecap="round" />

            {/* Decorações flutuantes animadas */}
            <circle cx="75" cy="50" r="5" fill="#f8fafc" className="animate-bounce" />
            <rect x="235" y="45" width="8" height="8" rx="1" fill="#0ea5e9" transform="rotate(15 235 45)" className="animate-pulse" />
            <path d="M255 120 L260 115 L265 120 M260 115 L260 125" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

    </div>
  );
}