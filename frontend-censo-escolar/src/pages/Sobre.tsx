import { useState } from 'react';

// Importando as imagens diretamente da pasta assets
import manAvatar from '../assets/man.png';
import womanAvatar from '../assets/woman.png';

const teamMembers = [
    {
        name: 'Ana Clara',
        role: 'Texto',
        avatar: womanAvatar,
        socials: {
            github: 'https://github.com/Anaarjo',
            linkedin: 'https://www.linkedin.com/in/ana-clara-rodrigues-de-araújo-453376111/',
            email: 'mailto:anaclara2002araujo@gmail.com'
        }
    },
    {
        name: 'João Victor',
        role: 'Texto',
        avatar: manAvatar,
        socials: {
            github: 'https://github.com/jvvls',
            linkedin: 'https://www.linkedin.com/in/joaovictorvial/',
            email: 'mailto:joaovictorvial@gmail.com'
        }
    },
    {
        name: 'Paulo',
        role: 'Texto',
        avatar: manAvatar,
        socials: {
            github: 'https://github.com/paulocarmonaa',
            linkedin: 'https://www.linkedin.com/in/paulohenriquecarmonaramos/',
            email: 'mailto:paulo.carmona17@gmail.com'
        }
    },
    {
        name: 'Pedro',
        role: 'Texto',
        avatar: manAvatar,
        socials: {
            github: 'https://github.com/PedroGCorrea',
            linkedin: 'https://www.linkedin.com/in/pedroguimaraescorrea/',
            email: 'mailto:pedrogdcorrea@gmail.com'
        }
    },
];

export default function Sobre() {
    const [activeTab, setActiveTab] = useState<'projeto' | 'equipe'>('projeto');

    return (
        <div className="about-container">

            {/* Breadcrumb */}
            <nav className="about-breadcrumb">
                Home &gt; <span className="text-slate-900 font-bold">Sobre</span>
            </nav>

            {/* Hero Section */}
            <section className="about-hero">
                <div className="md:w-1/2">
                    <h1 className="about-hero-title">Sobre</h1>
                    <p className="about-hero-subtitle">
                        Conheça o DataEscola, sua história e seus objetos de ação
                    </p>
                </div>
                <div className="about-hero-text">
                    {/* Adicionado text-justify */}
                    <p className="text-justify">
                        O DataEscola é uma plataforma de visualização e análise de dados educacionais,
                        criada para tornar mais acessível a compreensão da infraestrutura escolar no
                        Brasil. Por meio de uma interface interativa, o sistema permite explorar o cenário
                        nacional, comparar realidades regionais e aprofundar análises específicas com
                        apoio de filtros e seleções.
                    </p>
                </div>
            </section>

            {/* Animated Toggle Switch */}
            <div className="mb-12">
                <div className="toggle-container">
                    {/* Fundo deslizante */}
                    <div
                        className={`toggle-slider ${activeTab === 'equipe' ? 'translate-x-full' : 'translate-x-0'}`}
                    />

                    {/* Botões */}
                    <button
                        onClick={() => setActiveTab('projeto')}
                        className={`toggle-btn ${activeTab === 'projeto' ? 'text-white' : 'text-slate-600 hover:text-slate-800'}`}
                    >
                        O Projeto
                    </button>
                    <button
                        onClick={() => setActiveTab('equipe')}
                        className={`toggle-btn ${activeTab === 'equipe' ? 'text-white' : 'text-slate-600 hover:text-slate-800'}`}
                    >
                        Equipe
                    </button>
                </div>
            </div>

            {/* Content: O Projeto */}
            {activeTab === 'projeto' && (
                <div className="animate-in fade-in duration-500">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Coluna Esquerda: Textos */}
                        <div className="lg:w-[45%] space-y-10">
                            {/* Adicionado space-y-4 para padronizar o espaçamento interno */}
                            <section className="space-y-4">
                                <h2 className="section-title">O projeto</h2>
                                {/* Adicionado text-justify e removido o mb-4 isolado */}
                                <p className="section-paragraph text-justify">
                                    O DataEscola foi desenvolvido com a finalidade de organizar e apresentar dados sobre a infraestrutura educacional brasileira de forma mais intuitiva, visual e acessível. A proposta central é facilitar a interpretação de informações qualificadas, apoiando análises comparativas, investigações detalhadas e uma visão ampla do contexto nacional. Com isso, a plataforma busca reduzir a complexidade da leitura de bases educacionais e ampliar o acesso a informações relevantes para estudos, pesquisas e tomada de decisão.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h3 className="section-subtitle">O Problema</h3>
                                <p className="section-paragraph text-justify">
                                    O acesso a informações claras e organizadas sobre a infraestrutura escolar no Brasil ainda é um desafio. Embora existam bases públicas com grande volume de dados, muitas vezes essas informações estão dispersas, em formatos técnicos ou pouco intuitivos, o que dificulta a interpretação por estudantes, pesquisadores, gestores e pela sociedade em geral. Além disso, comparar realidades regionais, identificar desigualdades entre escolas e compreender indicadores educacionais de forma visual e acessível nem sempre é simples. A ausência de uma visualização centralizada e interativa limita a capacidade de análise e a tomada de decisão baseada em dados.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h3 className="section-subtitle">A Solução</h3>
                                <p className="section-paragraph text-justify">
                                    O <strong>DataEscola</strong> foi desenvolvido para transformar dados educacionais em informações mais acessíveis, visuais e compreensíveis. A plataforma reúne indicadores relevantes sobre a infraestrutura escolar e os apresenta em uma interface moderna, intuitiva e interativa. Por meio de gráficos, filtros e comparações, o sistema permite que o usuário explore os dados em diferentes níveis de detalhe, desde uma visão geral do cenário nacional até análises mais específicas por escola, região e critérios selecionados. O objetivo é apoiar a compreensão do panorama educacional brasileiro, facilitar análises comparativas e contribuir para uma leitura mais estratégica e transparente dos dados.
                                </p>
                            </section>

                            {/* Card DataViva Integrado */}
                            {/* Adicionado space-y-4 para empurrar os elementos internamente de forma fluida */}
                            <section className="dataviva-card space-y-4">
                                <div className="dataviva-card-stripe"></div>
                                <h3 className="dataviva-card-title flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#1ab09d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    Tecnologia DataViva
                                </h3>
                                <p className="section-paragraph text-justify">
                                    O DataEscola é impulsionado pela expertise tecnológica do <strong>DataViva</strong>. Como plataforma parceira, o DataViva fornece a robustez em arquitetura de dados necessária para processar e visualizar o censo escolar de forma escalável e performática.
                                </p>
                                {/* Transformado em block para respeitar o space-y-4 adequadamente */}
                                <div className="pt-2">
                                    <a href="https://dataviva.info/" target="_blank" rel="noopener noreferrer" className="dataviva-card-link inline-flex items-center gap-1">
                                        Conheça o DataViva <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </section>
                        </div>

                        {/* Coluna Direita: Imagens e Tópicos */}
                        <div className="lg:w-[55%] space-y-10">

                            {/* Mockup Placeholder - Censo Escolar */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="w-full aspect-4/3 bg-slate-100 flex items-center justify-center text-slate-400 font-mono text-sm border-b border-slate-200">
                                    [ IMAGEM DO DASHBOARD / MOCKUP ]
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Adicionado space-y-2 aos sub-tópicos para padronizar distância entre h4 e p */}
                                <div className="space-y-2">
                                    <h4 className="feature-title">Visão geral da infraestrutura nacional</h4>
                                    <p className="section-paragraph text-justify">Nesta seção, o usuário tem acesso a uma leitura ampla do cenário educacional brasileiro, com indicadores gerais sobre infraestrutura escolar em nível nacional. Essa visão permite identificar padrões, tendências e aspectos relevantes relacionados às condições das escolas no país.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="feature-title">Análises comparativas regionais</h4>
                                    <p className="section-paragraph text-justify">A plataforma também oferece recursos para comparar diferentes contextos regionais. Por meio de filtros e seleções, o usuário pode analisar escolas, localidades ou grupos específicos, observando diferenças e semelhanças entre os dados apresentados.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="feature-title">Análises detalhadas</h4>
                                    <p className="section-paragraph text-justify">Para uma exploração mais aprofundada, o sistema disponibiliza análises detalhadas que permitem examinar informações específicas de forma mais precisa. Essa funcionalidade é útil para usuários que desejam investigar recortes particulares e compreender melhor determinados indicadores.</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="feature-title">Público-alvo</h4>
                                <p className="text-sm text-slate-600">O projeto pode ser útil para:</p>
                                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                                    <li>estudantes e pesquisadores</li>
                                    <li>gestores educacionais</li>
                                    <li>profissionais da área de dados e educação</li>
                                    <li>cidadãos interessados em compreender o cenário da infraestrutura escolar no Brasil</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* Content: Equipe */}
            {activeTab === 'equipe' && (
                <div className="animate-in fade-in duration-500">
                    <h2 className="section-title mb-12">Equipe</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                        {teamMembers.map((member, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                {/* Avatar */}
                                <div className="team-avatar-container w-24 h-24 rounded-full overflow-hidden mb-4">
                                    <img src={member.avatar} alt={`Avatar de ${member.name}`} className="w-full h-full object-cover" />
                                </div>

                                <h3 className="font-bold text-slate-900">{member.name}</h3>
                                <p className="text-xs text-slate-500 mb-4 mt-1">{member.role}</p>

                                {/* Social Icons */}
                                <div className="flex items-center gap-3 text-slate-400">
                                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                    </a>
                                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                    </a>
                                    <a href={member.socials.email} className="hover:text-red-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}