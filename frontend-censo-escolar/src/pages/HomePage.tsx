import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="page-container">

      {/* 1. Bloco Hero */}
      <section className="card-hero">
        {/* Padronizado com space-y-6 */}
        <div className="md:w-1/2 space-y-6">
          <span className="badge-teal">Visualização Principal</span>

          <h1 className="title-xl text-slate-900">
            Diagnóstico do <br /> Cenário Escolar
          </h1>

          {/* Adicionado text-justify */}
          <p className="text-hero-desc text-justify">
            Explore nosso painel interativo. Saiba qual a composição da infraestrutura escolar, métricas de saneamento e a conectividade em todo o país através de dados oficiais do Censo Escolar.
          </p>

          {/* Removido o pt-4 para deixar o space-y-6 ditar a distância de forma uniforme */}
          <div>
            <Link to="/dashboard" className="btn-primary">
              Acessar Dashboard
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Ilustração */}
        <div className="md:w-1/2 flex justify-center lg:justify-end">
          <div className="hero-circle">
            <svg className="hero-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. Bloco Comparação - ATUALIZADO */}
      <section className="card-dark">
        {/* Atualizado de space-y-4 para space-y-6 para manter o padrão */}
        <div className="md:w-1/3 space-y-6">
          <h2 className="title-lg text-white">
            Análises<br />Comparativas
          </h2>

          {/* Adicionado text-justify */}
          <p className="text-dark-desc text-justify">
            Compare seu município ou estado com a Média Nacional usando os índices do Censo Escolar.
          </p>

          {/* Removido mt-4 para usar o espaçamento do container */}
          <div>
            <Link to="/comparacao" className="btn-teal">
              Comparar Agora
            </Link>
          </div>
        </div>

        <div className="md:w-2/3 flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {[1, 2, 3].map((item) => (
            <Link key={item} to="/comparacao" className="placeholder-card border-slate-700 hover:border-teal-500 transition-all cursor-pointer">
              <svg className="w-8 h-8 mb-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium text-slate-300">Ver Comparativo #{item}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Bloco Sobre */}
      <section className="card-teal">
        {/* Já estava com space-y-6, mantido */}
        <div className="md:w-3/5 space-y-6">
          <h2 className="title-lg">
            Sobre o <br /> DataEscola
          </h2>

          {/* Adicionado text-justify */}
          <p className="text-teal-desc text-justify">
            A principal plataforma independente de tecnologia para visualizar e analisar dados oficiais do Censo da Educação Brasileira. Conheça nossa história, a metodologia aplicada e a equipe por trás do projeto.
          </p>

          {/* Removido pt-2 para usar o espaçamento do container */}
          <div>
            <Link to="/sobre" className="btn-secondary">
              Conheça o projeto
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Decorativo */}
        <div className="md:w-2/5 flex justify-center w-full">
          <div className="about-box">
            <svg className="about-box-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="about-box-text">Documentação & Metodologia</span>
          </div>
        </div>
      </section>

    </div>
  );
}