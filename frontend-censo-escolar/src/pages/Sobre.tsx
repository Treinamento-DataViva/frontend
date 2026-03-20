import React from 'react';

export default function Sobre() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Cabeçalho da Página */}
                <header className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-4">
                        Sobre o Projeto
                    </h1>
                    <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
                </header>

                <div className="space-y-12">

                    {/* Seção 1: O Projeto Censo Escolar */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                {/* Ícone simples em SVG */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M8 7h6" /><path d="M8 11h8" /></svg>
                            </span>
                            <h2 className="text-2xl font-bold text-slate-800">Censo Escolar</h2>
                        </div>

                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                O projeto <strong>Censo Escolar</strong> nasceu da necessidade de transformar dados brutos em inteligência estratégica. Nosso foco é facilitar a visualização de indicadores educacionais complexos, permitindo que gestores e pesquisadores tomem decisões baseadas em evidências.
                            </p>
                            <p>
                                Utilizamos tecnologias de ponta para garantir que a navegação seja rápida e que os gráficos sejam intuitivos, focando sempre na acessibilidade e na clareza das informações apresentadas.
                            </p>
                        </div>
                    </section>

                    {/* Seção 2: O Projeto Mãe (DataViva) */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10 hover:shadow-md transition-shadow relative overflow-hidden">
                        {/* Detalhe visual na borda para diferenciar o "Projeto Mãe" */}
                        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
                            </span>
                            <h2 className="text-2xl font-bold text-slate-800">O Ecossistema DataViva</h2>
                        </div>

                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                O Censo Escolar é uma iniciativa que se apoia na robustez do <strong>DataViva</strong>. Como projeto mãe, o DataViva fornece a base metodológica e tecnológica para a exploração de dados socioeconômicos em larga escala no Brasil.
                            </p>
                            <p>
                                A integração entre as plataformas permite uma análise contextualizada, onde a educação não é vista isoladamente, mas como parte fundamental do desenvolvimento econômico e social de cada região.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <a
                                href="https://dataviva.info/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                            >
                                Conheça o DataViva
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}