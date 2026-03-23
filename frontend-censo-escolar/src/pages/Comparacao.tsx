import { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { Search, ChevronDown, Download, Share2 } from "lucide-react";

interface EscolaData {
  id: number;
  id_escola: number;
  ano: number;
  nome_escola: string;
  sigla_uf: string;
  rede: string;
  agua_potavel: boolean;
  agua_inexistente: boolean;
  energia_inexistente: boolean;
  esgoto_inexistente: boolean;
  tratamento_lixo_inexistente: boolean;
  banheiro: boolean;
  biblioteca: boolean;
  cozinha: boolean;
  dormitorio_aluno: boolean;
  laboratorio_informatica: boolean;
  laboratorio_ciencias: boolean;
  quadra_esportes: boolean;
  refeitorio: boolean;
  alimentacao: boolean;
}

interface RegionalStats {
  nome: string;
  sigla: string;
  total_escolas: number;
  infraestrutura_score: number;
  // Métricas para o radar
  agua_potavel_pct: number;
  energia_pct: number;
  esgoto_pct: number;
  laboratorio_ciencias_pct: number;
  laboratorio_informatica_pct: number;
  // Indicadores detalhados
  escolas_agua_potavel_pct: number;
  relacao_aluno_professor: number;
  instalacoes_esportivas_pct: number;
  acesso_internet_fibra_pct: number;
}

export default function ComparativaRegional() {
  const [regiaoA, setRegiaoA] = useState<string>("SP");
  const [regiaoB, setRegiaoB] = useState<string>("BRASIL");
  const [dadosRegiaoA, setDadosRegiaoA] = useState<RegionalStats | null>(null);
  const [dadosRegiaoB, setDadosRegiaoB] = useState<RegionalStats | null>(null);
  const [loading, setLoading] = useState(false);

  // Filtros
  const [filtros, setFiltros] = useState({
    populacao_infraestrutura: true,
    conectividade_digital: true,
    metricas_saneamento: true,
    qualificacao_pessoal: false,
    link_historico_ideb: false,
  });

  const [configuracoes, setConfiguracoes] = useState({
    tabela_lado_lado: true,
    exibir_mapa_calor: false,
  });

  // Estados brasileiros
  const estados = [
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
    { sigla: "MG", nome: "Minas Gerais" },
    { sigla: "BA", nome: "Bahia" },
    { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "PR", nome: "Paraná" },
    { sigla: "PE", nome: "Pernambuco" },
    { sigla: "CE", nome: "Ceará" },
    { sigla: "PA", nome: "Pará" },
    { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "BRASIL", nome: "Média Nacional" },
  ];

  // Simular busca de dados (substituir por API real)
  useEffect(() => {
    carregarDados();
  }, [regiaoA, regiaoB]);

  const carregarDados = async () => {
    setLoading(true);
    // Simulação - substituir por fetch real do backend
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dados mockados baseados na imagem
    const mockA: RegionalStats = {
      nome: "São Paulo (SP)",
      sigla: "SP",
      total_escolas: 28452,
      infraestrutura_score: 8.2,
      agua_potavel_pct: 98.4,
      energia_pct: 99.2,
      esgoto_pct: 95.8,
      laboratorio_ciencias_pct: 52.1,
      laboratorio_informatica_pct: 82.1,
      escolas_agua_potavel_pct: 98.4,
      relacao_aluno_professor: 22.4,
      instalacoes_esportivas_pct: 45.2,
      acesso_internet_fibra_pct: 82.1,
    };

    const mockB: RegionalStats = {
      nome: "Média nacional",
      sigla: "BR",
      total_escolas: 178354,
      infraestrutura_score: 7.4,
      agua_potavel_pct: 94.1,
      energia_pct: 96.8,
      esgoto_pct: 88.3,
      laboratorio_ciencias_pct: 52.1,
      laboratorio_informatica_pct: 68.4,
      escolas_agua_potavel_pct: 94.1,
      relacao_aluno_professor: 24.8,
      instalacoes_esportivas_pct: 52.1,
      acesso_internet_fibra_pct: 68.4,
    };

    setDadosRegiaoA(regiaoA === "SP" ? mockA : mockB);
    setDadosRegiaoB(regiaoB === "BRASIL" ? mockB : mockA);
    setLoading(false);
  };

  // Configuração do gráfico radar
  const radarOption = useMemo(() => {
    if (!dadosRegiaoA || !dadosRegiaoB) return {};

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
      },
      legend: {
        bottom: 10,
        data: ["Região A", "Região B"],
        textStyle: {
          color: "#64748b",
        },
      },
      radar: {
        indicator: [
          { name: "Água", max: 100 },
          { name: "Energia", max: 100 },
          { name: "Esgoto", max: 100 },
          { name: "Lab. Ciências", max: 100 },
          { name: "Lab. Info.", max: 100 },
        ],
        shape: "polygon",
        splitNumber: 4,
        axisName: {
          color: "#475569",
          fontSize: 12,
        },
        splitLine: {
          lineStyle: {
            color: "#cbd5e1",
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)"],
          },
        },
      },
      series: [
        {
          name: "Benchmark",
          type: "radar",
          data: [
            {
              value: [
                dadosRegiaoA.agua_potavel_pct,
                dadosRegiaoA.energia_pct,
                dadosRegiaoA.esgoto_pct,
                dadosRegiaoA.laboratorio_ciencias_pct,
                dadosRegiaoA.laboratorio_informatica_pct,
              ],
              name: "Região A",
              areaStyle: {
                color: "rgba(14, 165, 233, 0.2)",
              },
              lineStyle: {
                color: "#0ea5e9",
                width: 2,
              },
              itemStyle: {
                color: "#0ea5e9",
              },
            },
            {
              value: [
                dadosRegiaoB.agua_potavel_pct,
                dadosRegiaoB.energia_pct,
                dadosRegiaoB.esgoto_pct,
                dadosRegiaoB.laboratorio_ciencias_pct,
                dadosRegiaoB.laboratorio_informatica_pct,
              ],
              name: "Região B",
              areaStyle: {
                color: "rgba(71, 85, 105, 0.1)",
              },
              lineStyle: {
                color: "#475569",
                width: 2,
                type: "dashed",
              },
              itemStyle: {
                color: "#475569",
              },
            },
          ],
        },
      ],
    };
  }, [dadosRegiaoA, dadosRegiaoB]);

  // Dados para gráficos de infraestrutura
  const infraComponents = [
    {
      label: "Conectividade de fibra óptica de banda larga",
      valueA: dadosRegiaoA?.acesso_internet_fibra_pct || 0,
      valueB: dadosRegiaoB?.acesso_internet_fibra_pct || 0,
    },
    {
      label: "Disponibilidade dos Laboratórios de Ciência e Tecnologia",
      valueA: dadosRegiaoA?.laboratorio_ciencias_pct || 0,
      valueB: dadosRegiaoB?.laboratorio_ciencias_pct || 0,
    },
    {
      label: "Acesso completo a instalações sanitárias básicas",
      valueA: dadosRegiaoA?.esgoto_pct || 0,
      valueB: dadosRegiaoB?.esgoto_pct || 0,
    },
  ];

  const calcularVariacao = (a: number, b: number) => {
    const diff = ((a - b) / b) * 100;
    return diff;
  };

  const indicadoresDetalhados = [
    {
      nome: "Escolas com água potável",
      descricao: "Rede pública urbana",
      valorA: dadosRegiaoA?.escolas_agua_potavel_pct || 0,
      valorB: dadosRegiaoB?.escolas_agua_potavel_pct || 0,
      unidade: "%",
    },
    {
      nome: "Relação média aluno/professor",
      descricao: "Ensino Médio/Ensino Médio",
      valorA: dadosRegiaoA?.relacao_aluno_professor || 0,
      valorB: dadosRegiaoB?.relacao_aluno_professor || 0,
      unidade: "",
    },
    {
      nome: "Instalações esportivas",
      descricao: "Quadras cobertas",
      valorA: dadosRegiaoA?.instalacoes_esportivas_pct || 0,
      valorB: dadosRegiaoB?.instalacoes_esportivas_pct || 0,
      unidade: "%",
    },
    {
      nome: "Acesso a Internet por Fibra Óptica",
      descricao: "Velocidade >100Mbps disponível",
      valorA: dadosRegiaoA?.acesso_internet_fibra_pct || 0,
      valorB: dadosRegiaoB?.acesso_internet_fibra_pct || 0,
      unidade: "%",
    },
  ];

  return (
    <div className="flex gap-6 h-full w-full overflow-y-auto p-6">
      {/* SIDEBAR DE FILTROS */}

      <aside className="w-64 bg-slate-800 text-white rounded-xl p-6 h-fit sticky top-24 shrink-0">
        <div className="space-y-6">
          {/* Configuração de Comparação */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
              Configuração de Comparação
            </h3>
            <div className="space-y-2">
              <label className="block text-sm text-slate-300">
                Região Alvo (A)
              </label>
              <select
                value={regiaoA}
                onChange={(e) => setRegiaoA(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {estados.map((e) => (
                  <option key={e.sigla} value={e.sigla}>
                    {e.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Região de Referência */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Região de Referência (B)
            </label>
            <select
              value={regiaoB}
              onChange={(e) => setRegiaoB(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {estados.map((e) => (
                <option key={e.sigla} value={e.sigla}>
                  {e.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Métricas para Comparar */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
              Métricas para Comparar
            </h3>
            <div className="space-y-2.5">
              {Object.entries(filtros).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setFiltros({ ...filtros, [key]: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition">
                    {key
                      .split("_")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Configurações de Exibição */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
              Configurações de Exibição
            </h3>
            <div className="space-y-2.5">
              {Object.entries(configuracoes).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setConfiguracoes({ ...configuracoes, [key]: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white transition">
                    {key
                      .split("_")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Botão Atualizar */}
          <button
            onClick={carregarDados}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Atualizar Benchmark
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 space-y-6">
        {/* HEADER */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                Explorador de · Ferramenta de Avaliação Comparativa
              </p>
              <h1 className="text-3xl font-bold text-slate-900">
                Análises Comparativas Regionais
              </h1>
              <p className="text-sm text-slate-600 mt-2">
                Comparando {dadosRegiaoA?.nome || regiaoA} com a{" "}
                {dadosRegiaoB?.nome || "Média Nacional"} usando os Índices do Censo 2023.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300 transition flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Analysis
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export CSV/PDF
              </button>
            </div>
          </div>
        </div>

        {/* CARDS DE RESUMO */}
        <div className="grid grid-cols-2 gap-6">
          {/* Região A */}
          <div className="bg-linear-to-br from-blue-50 to-white rounded-xl shadow-sm border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">REGIÃO ALVO</p>
                <h3 className="text-lg font-bold text-slate-900">
                  {dadosRegiaoA?.nome || regiaoA}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">ESCOLAS</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dadosRegiaoA?.total_escolas.toLocaleString("pt-BR") || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">PONTUAÇÃO DE INFRAESTRUTURA</p>
                <p className="text-2xl font-bold text-blue-600">
                  {dadosRegiaoA?.infraestrutura_score || "-"} / 10
                </p>
              </div>
            </div>
          </div>

          {/* Região B */}
          <div className="bg-linear-to-br from-slate-50 to-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold">
                B
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">REFERÊNCIA</p>
                <h3 className="text-lg font-bold text-slate-900">
                  {dadosRegiaoB?.nome || regiaoB}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">TAMANHO DA AMOSTRA</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dadosRegiaoB?.total_escolas.toLocaleString("pt-BR") || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">PONTUAÇÃO DE INFRAESTRUTURA</p>
                <p className="text-2xl font-bold text-slate-600">
                  {dadosRegiaoB?.infraestrutura_score || "-"} / 10
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RADAR E GRÁFICOS DE INFRAESTRUTURA */}
        <div className="grid grid-cols-2 gap-6">
          {/* Radar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">
              Capability Benchmark
            </h3>
            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <ReactECharts option={radarOption} style={{ height: "320px" }} />
            )}
          </div>

          {/* Componentes de Infraestrutura */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700">
                Comparação de componentes de infraestrutura
              </h3>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-slate-100 rounded">
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-slate-100 rounded">
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {infraComponents.map((item, idx) => {
                const variance = calcularVariacao(item.valueA, item.valueB);
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-slate-600">{item.label}</p>
                      <span
                        className={`text-xs font-semibold ${variance > 0 ? "text-teal-600" : "text-red-600"
                          }`}
                      >
                        {variance > 0 ? "+" : ""}
                        {variance.toFixed(1)}% Variance
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.valueA}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* TABELA DETALHADA */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">
              Matriz de Dados Detalhada
            </h3>
            <p className="text-xs text-slate-500">
              Conjunto de dados de benchmarking v2.4
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Indicador Métrico
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Valor da Região A
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Valor da Região B
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Desempenho Relativo
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {indicadoresDetalhados.map((ind, idx) => {
                  const diff = ind.valorA - ind.valorB;
                  const diffPct = ((diff / ind.valorB) * 100).toFixed(1);
                  const isPositive = diff > 0;

                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{ind.nome}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {ind.descricao}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-slate-900">
                        {ind.valorA}
                        {ind.unidade}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-slate-900">
                        {ind.valorB}
                        {ind.unidade}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${isPositive
                            ? "bg-teal-50 text-teal-700"
                            : diff === 0
                              ? "bg-slate-100 text-slate-600"
                              : "bg-red-50 text-red-700"
                            }`}
                        >
                          {isPositive ? "+" : ""}
                          {diffPct}%{" "}
                          {isPositive
                            ? "ACIMA"
                            : diff === 0
                              ? "IGUAL"
                              : "ABAIXO"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Carregar Mais Atributos (mais de 42 métricas) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}