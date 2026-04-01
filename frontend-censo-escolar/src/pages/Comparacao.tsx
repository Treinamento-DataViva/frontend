import { useState, useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { Download, Share2 } from "lucide-react";

const BASE_URL = "http://localhost:8000";
const ANOS = [2024, 2023, 2022, 2021, 2020, 2019];

const ESTADOS = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" },
  { sigla: "BR", nome: "Média Nacional" },
];

interface ApiResponse {
  sigla_uf: string;
  total_escolas: number;
  agua_potavel: number;
  agua_inexistente: number;
  energia_inexistente: number;
  esgoto_inexistente: number;
  tratamento_lixo_inexistente: number;
  banheiro: number;
  biblioteca: number;
  cozinha: number;
  dormitorio_aluno: number;
  laboratorio_informatica: number;
  laboratorio_ciencias: number;
  quadra_esportes: number;
  refeitorio: number;
  alimentacao: number;
}

interface RegionalStats {
  nome: string;
  sigla: string;
  total_escolas: number;
  infraestrutura_score: number;
  agua_potavel_pct: number;
  energia_pct: number;
  esgoto_pct: number;
  laboratorio_ciencias_pct: number;
  laboratorio_informatica_pct: number;
  banheiro_pct: number;
  biblioteca_pct: number;
  cozinha_pct: number;
  quadra_esportes_pct: number;
  refeitorio_pct: number;
  alimentacao_pct: number;
}

function calcularStats(data: ApiResponse): RegionalStats {
  const total = data.total_escolas;
  const pct = (v: number) => total > 0 ? parseFloat(((v / total) * 100).toFixed(1)) : 0;

  const agua_potavel_pct = pct(data.agua_potavel);
  const energia_pct = parseFloat((100 - pct(data.energia_inexistente)).toFixed(1));
  const esgoto_pct = parseFloat((100 - pct(data.esgoto_inexistente)).toFixed(1));
  const laboratorio_ciencias_pct = pct(data.laboratorio_ciencias);
  const laboratorio_informatica_pct = pct(data.laboratorio_informatica);
  const banheiro_pct = pct(data.banheiro);
  const biblioteca_pct = pct(data.biblioteca);
  const cozinha_pct = pct(data.cozinha);
  const quadra_esportes_pct = pct(data.quadra_esportes);
  const refeitorio_pct = pct(data.refeitorio);
  const alimentacao_pct = pct(data.alimentacao);

  // Score: média ponderada das métricas principais (0–10)
  const score = parseFloat((
    (agua_potavel_pct + energia_pct + esgoto_pct +
      laboratorio_ciencias_pct + laboratorio_informatica_pct +
      banheiro_pct + quadra_esportes_pct) / 7 / 10
  ).toFixed(1));

  const nome = ESTADOS.find((e) => e.sigla === data.sigla_uf)?.nome ?? data.sigla_uf;

  return {
    nome,
    sigla: data.sigla_uf,
    total_escolas: total,
    infraestrutura_score: score,
    agua_potavel_pct,
    energia_pct,
    esgoto_pct,
    laboratorio_ciencias_pct,
    laboratorio_informatica_pct,
    banheiro_pct,
    biblioteca_pct,
    cozinha_pct,
    quadra_esportes_pct,
    refeitorio_pct,
    alimentacao_pct,
  };
}

async function fetchStats(sigla_uf: string, ano: number): Promise<RegionalStats> {
  const res = await fetch(`${BASE_URL}/escolas/uf/${sigla_uf}?ano=${ano}`);
  if (!res.ok) throw new Error(`Erro ao buscar dados para ${sigla_uf}/${ano}`);
  const data: ApiResponse = await res.json();
  return calcularStats(data);
}

export default function ComparativaRegional() {
  const [regiaoA, setRegiaoA] = useState("SP");
  const [regiaoB, setRegiaoB] = useState("BR");
  const [ano, setAno] = useState(2023);
  const [dadosRegiaoA, setDadosRegiaoA] = useState<RegionalStats | null>(null);
  const [dadosRegiaoB, setDadosRegiaoB] = useState<RegionalStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

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

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    setErro(null);
    try {
      const [a, b] = await Promise.all([
        fetchStats(regiaoA, ano),
        fetchStats(regiaoB, ano),
      ]);
      setDadosRegiaoA(a);
      setDadosRegiaoB(b);
    } catch (e: any) {
      setErro(e.message ?? "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const radarOption = useMemo(() => {
    if (!dadosRegiaoA || !dadosRegiaoB) return {};
    return {
      backgroundColor: "transparent",
      tooltip: { trigger: "item" },
      legend: {
        bottom: 10,
        data: [dadosRegiaoA.nome, dadosRegiaoB.nome],
        textStyle: { color: "#64748b" },
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
        axisName: { color: "#475569", fontSize: 12 },
        splitLine: { lineStyle: { color: "#cbd5e1" } },
        splitArea: {
          show: true,
          areaStyle: { color: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.3)"] },
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
              name: dadosRegiaoA.nome,
              areaStyle: { color: "rgba(14, 165, 233, 0.2)" },
              lineStyle: { color: "#0ea5e9", width: 2 },
              itemStyle: { color: "#0ea5e9" },
            },
            {
              value: [
                dadosRegiaoB.agua_potavel_pct,
                dadosRegiaoB.energia_pct,
                dadosRegiaoB.esgoto_pct,
                dadosRegiaoB.laboratorio_ciencias_pct,
                dadosRegiaoB.laboratorio_informatica_pct,
              ],
              name: dadosRegiaoB.nome,
              areaStyle: { color: "rgba(71, 85, 105, 0.1)" },
              lineStyle: { color: "#475569", width: 2, type: "dashed" },
              itemStyle: { color: "#475569" },
            },
          ],
        },
      ],
    };
  }, [dadosRegiaoA, dadosRegiaoB]);

  const infraComponents = [
    {
      label: "Água potável",
      valueA: dadosRegiaoA?.agua_potavel_pct ?? 0,
      valueB: dadosRegiaoB?.agua_potavel_pct ?? 0,
    },
    {
      label: "Laboratórios de Ciências e Informática",
      valueA: dadosRegiaoA
        ? (dadosRegiaoA.laboratorio_ciencias_pct + dadosRegiaoA.laboratorio_informatica_pct) / 2
        : 0,
      valueB: dadosRegiaoB
        ? (dadosRegiaoB.laboratorio_ciencias_pct + dadosRegiaoB.laboratorio_informatica_pct) / 2
        : 0,
    },
    {
      label: "Acesso a saneamento (esgoto)",
      valueA: dadosRegiaoA?.esgoto_pct ?? 0,
      valueB: dadosRegiaoB?.esgoto_pct ?? 0,
    },
  ];

  const calcularVariacao = (a: number, b: number) =>
    b > 0 ? ((a - b) / b) * 100 : 0;

  const indicadoresDetalhados = [
    {
      nome: "Água potável",
      descricao: "% de escolas com acesso",
      valorA: dadosRegiaoA?.agua_potavel_pct ?? 0,
      valorB: dadosRegiaoB?.agua_potavel_pct ?? 0,
      unidade: "%",
    },
    {
      nome: "Energia elétrica",
      descricao: "% de escolas com acesso",
      valorA: dadosRegiaoA?.energia_pct ?? 0,
      valorB: dadosRegiaoB?.energia_pct ?? 0,
      unidade: "%",
    },
    {
      nome: "Esgoto",
      descricao: "% de escolas com acesso",
      valorA: dadosRegiaoA?.esgoto_pct ?? 0,
      valorB: dadosRegiaoB?.esgoto_pct ?? 0,
      unidade: "%",
    },
    {
      nome: "Banheiro",
      descricao: "% de escolas com banheiro",
      valorA: dadosRegiaoA?.banheiro_pct ?? 0,
      valorB: dadosRegiaoB?.banheiro_pct ?? 0,
      unidade: "%",
    },
    {
      nome: "Biblioteca",
      descricao: "% de escolas com biblioteca",
      valorA: dadosRegiaoA?.biblioteca_pct ?? 0,
      valorB: dadosRegiaoB?.biblioteca_pct ?? 0,
      unidade: "%",
    },
    {
      nome: "Cozinha",
      descricao: "% de escolas com cozinha",
      valorA: dadosRegiaoA?.cozinha_pct ?? 0,
      valorB: dadosRegiaoB?.cozinha_pct ?? 0,
      unidade: "%",
    },
    {
      nome: "Quadra de esportes",
      descricao: "% de escolas com quadra",
      valorA: dadosRegiaoA?.quadra_esportes_pct ?? 0,
      valorB: dadosRegiaoB?.quadra_esportes_pct ?? 0,
      unidade: "%",
    },
    {
      nome: "Refeitório",
      descricao: "% de escolas com refeitório",
      valorA: dadosRegiaoA?.refeitorio_pct ?? 0,
      valorB: dadosRegiaoB?.refeitorio_pct ?? 0,
      unidade: "%",
    },
    {
      nome: "Alimentação",
      descricao: "% de escolas com programa de alimentação",
      valorA: dadosRegiaoA?.alimentacao_pct ?? 0,
      valorB: dadosRegiaoB?.alimentacao_pct ?? 0,
      unidade: "%",
    },
    {
      nome: "Lab. Informática",
      descricao: "% de escolas com laboratório",
      valorA: dadosRegiaoA?.laboratorio_informatica_pct ?? 0,
      valorB: dadosRegiaoB?.laboratorio_informatica_pct ?? 0,
      unidade: "%",
    },
    {
      nome: "Lab. Ciências",
      descricao: "% de escolas com laboratório",
      valorA: dadosRegiaoA?.laboratorio_ciencias_pct ?? 0,
      valorB: dadosRegiaoB?.laboratorio_ciencias_pct ?? 0,
      unidade: "%",
    },
  ];

  return (
    <div className="flex gap-6 h-full w-full overflow-y-auto p-6">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-800 text-white rounded-xl p-6 h-fit sticky top-24 shrink-0">
        <div className="space-y-6">

          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Configuração de Comparação
          </h3>

          {/* Container padronizado para os inputs sem usar mb-* avulsos */}
          <div className="space-y-4">
            {/* Ano */}
            <div>
              <label className="block text-sm text-slate-300 mb-1">Ano</label>
              <select
                value={ano}
                onChange={(e) => setAno(Number(e.target.value))}
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ANOS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Região A */}
            <div>
              <label className="block text-sm text-slate-300 mb-1">Região Alvo (A)</label>
              <select
                value={regiaoA}
                onChange={(e) => setRegiaoA(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ESTADOS.map((e) => (
                  <option key={e.sigla} value={e.sigla}>{e.nome}</option>
                ))}
              </select>
            </div>

            {/* Região B */}
            <div>
              <label className="block text-sm text-slate-300 mb-1">Referência (B)</label>
              <select
                value={regiaoB}
                onChange={(e) => setRegiaoB(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ESTADOS.map((e) => (
                  <option key={e.sigla} value={e.sigla}>{e.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={carregarDados}
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            Atualizar Benchmark
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start justify-between">
            {/* Agrupamento com space-y-2 para os textos respirarem melhor */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Explorador · Ferramenta de Avaliação Comparativa
              </p>
              <h1 className="text-3xl font-bold text-slate-900">
                Análises Comparativas Regionais
              </h1>
              <p className="text-sm text-slate-600">
                Comparando <strong>{dadosRegiaoA?.nome ?? regiaoA}</strong> com{" "}
                <strong>{dadosRegiaoB?.nome ?? regiaoB}</strong> — Censo {ano}.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition flex items-center gap-2">
                <Download className="w-4 h-4" /> Exportar CSV/PDF
              </button>
            </div>
          </div>
        </div>

        {/* ERRO */}
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4 text-sm">
            ⚠️ {erro}
          </div>
        )}

        {/* CARDS */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-linear-to-br from-blue-50 to-white rounded-xl shadow-sm border border-blue-200 p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase">Região Alvo</p>
                <h3 className="text-lg font-bold text-slate-900">{dadosRegiaoA?.nome ?? regiaoA}</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">ESCOLAS</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dadosRegiaoA?.total_escolas.toLocaleString("pt-BR") ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">SCORE INFRAESTRUTURA</p>
                <p className="text-2xl font-bold text-blue-600">
                  {dadosRegiaoA?.infraestrutura_score ?? "—"} / 10
                </p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-slate-50 to-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold">B</div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase">Referência</p>
                <h3 className="text-lg font-bold text-slate-900">{dadosRegiaoB?.nome ?? regiaoB}</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">TAMANHO DA AMOSTRA</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dadosRegiaoB?.total_escolas.toLocaleString("pt-BR") ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">SCORE INFRAESTRUTURA</p>
                <p className="text-2xl font-bold text-slate-600">
                  {dadosRegiaoB?.infraestrutura_score ?? "—"} / 10
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RADAR + BARRAS */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Capability Benchmark</h3>
            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
              </div>
            ) : dadosRegiaoA && dadosRegiaoB ? (
              <ReactECharts option={radarOption} style={{ height: "320px" }} />
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-400 text-sm">
                Clique em "Atualizar Benchmark" para carregar os dados.
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">
              Comparação de componentes de infraestrutura
            </h3>
            <div className="space-y-5">
              {infraComponents.map((item, idx) => {
                const variance = calcularVariacao(item.valueA, item.valueB);
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-slate-600">{item.label}</p>
                      <span className={`text-xs font-semibold ${variance > 0 ? "text-teal-600" : variance < 0 ? "text-red-600" : "text-slate-500"}`}>
                        {variance > 0 ? "+" : ""}{variance.toFixed(1)}% variação
                      </span>
                    </div>
                    {/* Barra A */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs w-4 text-blue-500 font-bold">A</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full transition-all duration-500" style={{ width: `${item.valueA}%` }} />
                      </div>
                      <span className="text-xs text-slate-500 w-10 text-right">{item.valueA.toFixed(1)}%</span>
                    </div>
                    {/* Barra B */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-4 text-slate-500 font-bold">B</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 rounded-full transition-all duration-500" style={{ width: `${item.valueB}%` }} />
                      </div>
                      <span className="text-xs text-slate-500 w-10 text-right">{item.valueB.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* TABELA */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">Matriz de Dados Detalhada</h3>
            <p className="text-xs text-slate-500 font-medium">Censo Escolar {ano}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Indicador</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    Região A — {dadosRegiaoA?.sigla ?? regiaoA}
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Região B — {dadosRegiaoB?.sigla ?? regiaoB}
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Desempenho Relativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {indicadoresDetalhados.map((ind, idx) => {
                  const diff = ind.valorA - ind.valorB;
                  const diffPct = ind.valorB > 0 ? ((diff / ind.valorB) * 100).toFixed(1) : "—";
                  const isPositive = diff > 0;
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{ind.nome}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{ind.descricao}</p>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-slate-900">
                        {ind.valorA}{ind.unidade}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-slate-900">
                        {ind.valorB}{ind.unidade}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${isPositive ? "bg-teal-50 text-teal-700" : diff === 0 ? "bg-slate-100 text-slate-600" : "bg-red-50 text-red-700"
                          }`}>
                          {isPositive ? "+" : ""}{diffPct}%{" "}
                          {isPositive ? "ACIMA" : diff === 0 ? "IGUAL" : "ABAIXO"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
