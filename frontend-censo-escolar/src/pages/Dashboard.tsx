import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Extend Leaflet types for leaflet.heat
declare module 'leaflet' {
  function heatLayer(
    latlngs: Array<[number, number, number?]>,
    options?: {
      minOpacity?: number;
      maxZoom?: number;
      max?: number;
      radius?: number;
      blur?: number;
      gradient?: Record<number, string>;
    }
  ): L.Layer;
}

// ============================================================
// Tipos & Interfaces
// ============================================================

interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

interface HeatmapTheme {
  id: string;
  label: string;
  description: string;
  icon: string;
  gradient: Record<number, string>;
  unit: string;
}

interface MunicipioInfo {
  codigo: string;
  nome: string;
  estado: string;
  populacao: number;
  totalEscolas: number;
  center: [number, number];
  zoom: number;
}

interface KpiData {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

interface DashboardData {
  municipio: MunicipioInfo;
  heatmapPoints: HeatmapPoint[];
  kpis: KpiData[];
}

// ============================================================
// Temas disponíveis para o Heatmap
// ============================================================

const heatmapThemes: HeatmapTheme[] = [
  {
    id: 'infraestrutura',
    label: 'Infraestrutura',
    description: 'Índice geral de infraestrutura escolar',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    gradient: { 0.0: '#0d1b2a', 0.2: '#1b3a5c', 0.4: '#2a6f97', 0.6: '#40c9a2', 0.8: '#a8e6cf', 1.0: '#dcedc1' },
    unit: '%',
  },
  {
    id: 'internet',
    label: 'Acesso à Internet',
    description: 'Cobertura de internet nas escolas',
    icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0',
    gradient: { 0.0: '#1a0533', 0.2: '#4a0e6b', 0.4: '#7b2d8e', 0.6: '#c24cf6', 0.8: '#da85ff', 1.0: '#f0c6ff' },
    unit: '%',
  },
  {
    id: 'laboratorio',
    label: 'Laboratórios',
    description: 'Disponibilidade de laboratórios de ciência e informática',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    gradient: { 0.0: '#0c1821', 0.2: '#162a3a', 0.4: '#1d4e89', 0.6: '#3fa7d6', 0.8: '#79d7ed', 1.0: '#c4f0ff' },
    unit: '%',
  },
  {
    id: 'acessibilidade',
    label: 'Acessibilidade',
    description: 'Índice de acessibilidade e inclusão',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    gradient: { 0.0: '#1b0a2e', 0.2: '#3d1a66', 0.4: '#7030a0', 0.6: '#e85d75', 0.8: '#ff9a9e', 1.0: '#ffd6d6' },
    unit: '%',
  },
  {
    id: 'alimentacao',
    label: 'Alimentação Escolar',
    description: 'Presença de refeitório e qualidade da alimentação',
    icon: 'M3 8h14v7a4 4 0 01-4 4H7a4 4 0 01-4-4V8z M17 10h1a2 2 0 010 4h-1',
    gradient: { 0.0: '#1a0a00', 0.2: '#4a2600', 0.4: '#b85c00', 0.6: '#f59e0b', 0.8: '#fbbf24', 1.0: '#fef3c7' },
    unit: '%',
  },
];

// ============================================================
// Dados Mockados — Município de Belo Horizonte (MG)
// ============================================================

const beloHorizonte: MunicipioInfo = {
  codigo: '3106200',
  nome: 'Belo Horizonte',
  estado: 'MG',
  populacao: 2521564,
  totalEscolas: 1247,
  center: [-19.9191, -43.9386],
  zoom: 12,
};

function generateMockHeatmapPoints(
  center: [number, number],
  count: number,
  themeId: string
): HeatmapPoint[] {
  const seed = themeId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pseudoRandom = (i: number) => {
    const x = Math.sin(seed * 9301 + i * 49297 + 233280) * 49297;
    return x - Math.floor(x);
  };

  const points: HeatmapPoint[] = [];
  const clusters = [
    { lat: center[0] + 0.02, lng: center[1] - 0.03, weight: 0.9 },
    { lat: center[0] - 0.01, lng: center[1] + 0.01, weight: 0.7 },
    { lat: center[0] + 0.04, lng: center[1] + 0.02, weight: 0.5 },
    { lat: center[0] - 0.03, lng: center[1] - 0.02, weight: 0.3 },
    { lat: center[0] + 0.01, lng: center[1] + 0.04, weight: 0.6 },
    { lat: center[0] - 0.04, lng: center[1] + 0.03, weight: 0.4 },
    { lat: center[0], lng: center[1], weight: 0.85 },
    { lat: center[0] + 0.03, lng: center[1] - 0.01, weight: 0.55 },
  ];

  for (let i = 0; i < count; i++) {
    const clusterIdx = Math.floor(pseudoRandom(i * 3) * clusters.length);
    const cluster = clusters[clusterIdx];
    const latOffset = (pseudoRandom(i * 7 + 1) - 0.5) * 0.04;
    const lngOffset = (pseudoRandom(i * 11 + 2) - 0.5) * 0.04;
    const baseIntensity = cluster.weight;
    const variation = (pseudoRandom(i * 13 + 3) - 0.5) * 0.3;
    const intensity = Math.max(0.05, Math.min(1.0, baseIntensity + variation));

    points.push({ lat: cluster.lat + latOffset, lng: cluster.lng + lngOffset, intensity });
  }

  return points;
}

function getMockKpis(themeId: string): KpiData[] {
  const kpisByTheme: Record<string, KpiData[]> = {
    infraestrutura: [
      { label: 'Índice Geral', value: '68.4%', change: '+2.3%', changeType: 'positive' },
      { label: 'Escolas Adequadas', value: '854', change: '+45', changeType: 'positive' },
      { label: 'Escolas Críticas', value: '93', change: '-12', changeType: 'positive' },
      { label: 'Investimento/Escola', value: 'R$ 42k', change: '+8.1%', changeType: 'positive' },
    ],
    internet: [
      { label: 'Cobertura Total', value: '72.3%', change: '+5.7%', changeType: 'positive' },
      { label: 'Banda Larga', value: '58.1%', change: '+12.4%', changeType: 'positive' },
      { label: 'Sem Acesso', value: '346', change: '-89', changeType: 'positive' },
      { label: 'Vel. Média', value: '45 Mbps', change: '+15 Mbps', changeType: 'positive' },
    ],
    laboratorio: [
      { label: 'Com Laboratório', value: '45.2%', change: '+3.1%', changeType: 'positive' },
      { label: 'Lab. Informática', value: '564', change: '+28', changeType: 'positive' },
      { label: 'Lab. Ciências', value: '198', change: '-5', changeType: 'negative' },
      { label: 'Equipamentos/Lab', value: '22', change: '+4', changeType: 'positive' },
    ],
    acessibilidade: [
      { label: 'Índice Acessib.', value: '54.8%', change: '+4.2%', changeType: 'positive' },
      { label: 'Rampas', value: '687', change: '+102', changeType: 'positive' },
      { label: 'Banh. Adaptados', value: '412', change: '+56', changeType: 'positive' },
      { label: 'Pisos Táteis', value: '234', change: '+88', changeType: 'positive' },
    ],
    alimentacao: [
      { label: 'Com Refeitório', value: '88.3%', change: 'Estável', changeType: 'neutral' },
      { label: 'Cozinha Própria', value: '1.102', change: '+15', changeType: 'positive' },
      { label: 'Nutricionista', value: '92.1%', change: '+1.8%', changeType: 'positive' },
      { label: 'Refeições/Dia', value: '245k', change: '+12k', changeType: 'positive' },
    ],
  };
  return kpisByTheme[themeId] || kpisByTheme['infraestrutura'];
}

/**
 * Busca os dados do dashboard para um município e tema específicos.
 *
 * TODO: Substituir pela chamada real à API:
 * GET /api/v1/dashboard/{codigoMunicipio}?tema={themeId}
 */
async function fetchDashboardData(
  _codigoMunicipio: string,
  themeId: string
): Promise<DashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const municipio = beloHorizonte;
  const heatmapPoints = generateMockHeatmapPoints(municipio.center, 200, themeId);
  const kpis = getMockKpis(themeId);
  return { municipio, heatmapPoints, kpis };
}

// ============================================================
// Componente HeatmapLayer (inline, usa leaflet.heat)
// ============================================================

interface HeatmapLayerProps {
  points: HeatmapPoint[];
  options?: {
    minOpacity?: number;
    maxZoom?: number;
    max?: number;
    radius?: number;
    blur?: number;
    gradient?: Record<number, string>;
  };
}

function HeatmapLayer({ points, options = {} }: HeatmapLayerProps) {
  const map = useMap();
  const heatLayerRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
    }

    const heatData: [number, number, number][] = points.map((p) => [p.lat, p.lng, p.intensity]);

    const defaultOptions = {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      minOpacity: 0.4,
      ...options,
    };

    const layer = L.heatLayer(heatData, defaultOptions);
    layer.addTo(map);
    heatLayerRef.current = layer;

    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, points, options]);

  return null;
}

// ============================================================
// Sub-componentes de UI
// ============================================================

function ThemeCard({
  theme,
  isActive,
  onClick,
}: {
  theme: HeatmapTheme;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`theme-card ${isActive ? 'theme-card--active' : ''}`}
      id={`theme-${theme.id}`}
    >
      <div className={`theme-card-icon ${isActive ? 'theme-card-icon--active' : ''}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={theme.icon} />
        </svg>
      </div>
      <div className="flex-1 text-left">
        <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-200'}`}>
          {theme.label}
        </div>
        <div className={`text-[11px] leading-snug ${isActive ? 'text-teal-200' : 'text-slate-500'}`}>
          {theme.description}
        </div>
      </div>
      {isActive && (
        <div className="w-1.5 h-8 rounded-full bg-teal-400 shrink-0" />
      )}
    </button>
  );
}

function KpiCard({ kpi }: { kpi: KpiData }) {
  const changeColor =
    kpi.changeType === 'positive'
      ? 'text-emerald-500'
      : kpi.changeType === 'negative'
        ? 'text-red-400'
        : 'text-slate-400';

  return (
    <div className="kpi-card group">
      <div className="flex justify-between items-start mb-3">
        <div className="kpi-label">{kpi.label}</div>
        <span className={`text-xs font-bold ${changeColor}`}>{kpi.change}</span>
      </div>
      <div className="kpi-value">{kpi.value}</div>
    </div>
  );
}

function GradientLegend({ theme }: { theme: HeatmapTheme }) {
  const gradientStops = Object.entries(theme.gradient)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([, color]) => color);

  const gradientCSS = `linear-gradient(to right, ${gradientStops.join(', ')})`;

  return (
    <div className="gradient-legend">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-slate-600">Intensidade — {theme.label}</span>
      </div>
      <div
        className="h-3 rounded-full shadow-inner"
        style={{ background: gradientCSS }}
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-slate-400 font-medium">Baixo</span>
        <span className="text-[10px] text-slate-400 font-medium">Médio</span>
        <span className="text-[10px] text-slate-400 font-medium">Alto</span>
      </div>
    </div>
  );
}

function MunicipioHeader({ municipio, activeTheme }: { municipio: MunicipioInfo | null; activeTheme: HeatmapTheme }) {
  if (!municipio) return null;

  return (
    <div className="municipio-header">
      <div className="flex items-center gap-3">
        <div className="municipio-header-icon">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {municipio.nome}
            <span className="text-slate-400 font-normal ml-2 text-base">— {municipio.estado}</span>
          </h1>
          <p className="text-sm text-slate-500">
            {municipio.totalEscolas.toLocaleString('pt-BR')} escolas • Pop.{' '}
            {municipio.populacao.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg font-semibold border border-teal-100">
          {activeTheme.label}
        </span>
        <button className="btn-header-outline flex items-center gap-2" id="btn-export-report">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exportar
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Dashboard Principal
// ============================================================

export default function Dashboard() {
  const [activeThemeId, setActiveThemeId] = useState<string>('infraestrutura');
  const [heatmapPoints, setHeatmapPoints] = useState<HeatmapPoint[]>([]);
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [municipio, setMunicipio] = useState<MunicipioInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const activeTheme = useMemo(
    () => heatmapThemes.find((t) => t.id === activeThemeId) || heatmapThemes[0],
    [activeThemeId]
  );

  const heatmapOptions = useMemo(
    () => ({
      radius: 25,
      blur: 18,
      maxZoom: 17,
      max: 1.0,
      minOpacity: 0.45,
      gradient: activeTheme.gradient,
    }),
    [activeTheme]
  );

  const loadData = useCallback(async (themeId: string) => {
    setIsLoading(true);
    try {
      const data = await fetchDashboardData('3106200', themeId);
      setMunicipio(data.municipio);
      setHeatmapPoints(data.heatmapPoints);
      setKpis(data.kpis);
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(activeThemeId);
  }, [activeThemeId, loadData]);

  const handleThemeChange = (themeId: string) => {
    setActiveThemeId(themeId);
  };

  return (
    <div className="dashboard-container">

      {/* ================= SIDEBAR ================= */}
      <aside className="dashboard-sidebar">
        <div className="p-5 space-y-6">

          {/* Logo do Dashboard */}
          <div className="pb-4 border-b border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight">Heatmap</h2>
                <p className="text-[11px] text-slate-500">Visualização Espacial</p>
              </div>
            </div>
          </div>

          {/* Seletor de Tema */}
          <div>
            <label className="filter-label mb-3 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Tema do Mapa
            </label>
            <div className="space-y-2">
              {heatmapThemes.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isActive={activeThemeId === theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                />
              ))}
            </div>
          </div>

          {/* Filtros adicionais */}
          <div className="border-t border-slate-700/60 pt-5">
            <label className="filter-label mb-3 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filtros
            </label>

            {/* Tipo de Escola */}
            <div className="mb-4">
              <p className="text-[11px] text-slate-500 uppercase tracking-wide font-bold mb-2">Tipo de Escola</p>
              <div className="space-y-2">
                {['Estadual', 'Municipal', 'Federal', 'Privada'].map((tipo) => (
                  <label key={tipo} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="checkbox-custom">
                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="checkbox-text">{tipo}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Etapa de Ensino */}
            <div className="mb-4">
              <p className="text-[11px] text-slate-500 uppercase tracking-wide font-bold mb-2">Etapa de Ensino</p>
              <div className="flex flex-wrap gap-1.5">
                {['Infantil', 'Fundamental', 'Médio', 'EJA'].map((etapa, i) => (
                  <button
                    key={etapa}
                    className={i < 2 ? 'tag-active' : 'tag-inactive'}
                    id={`etapa-${etapa.toLowerCase()}`}
                  >
                    {etapa}
                  </button>
                ))}
              </div>
            </div>

            {/* Zona */}
            <div>
              <p className="text-[11px] text-slate-500 uppercase tracking-wide font-bold mb-2">Zona</p>
              <select className="filter-select" id="select-zona">
                <option value="">Todas as zonas</option>
                <option value="urbana">Urbana</option>
                <option value="rural">Rural</option>
              </select>
            </div>
          </div>

          {/* Botão Limpar */}
          <button className="btn-clear" id="btn-clear-filters">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Limpar Filtros
            </span>
          </button>

        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard-main">
        <div className="dashboard-content">

          {/* Header do Município */}
          <MunicipioHeader municipio={municipio} activeTheme={activeTheme} />

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="kpi-card animate-pulse">
                  <div className="h-3 w-20 bg-slate-200 rounded mb-4" />
                  <div className="h-7 w-16 bg-slate-200 rounded" />
                </div>
              ))
              : kpis.map((kpi, i) => <KpiCard key={i} kpi={kpi} />)}
          </div>

          {/* Mapa com Heatmap */}
          <div className="map-card">
            <div className="map-header">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-slate-800">Mapa de Calor</h3>
                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-teal-600 font-medium">
                    <div className="w-3 h-3 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                    Carregando...
                  </div>
                )}
              </div>
              <GradientLegend theme={activeTheme} />
            </div>
            <div className="map-wrapper">
              {municipio && (
                <MapContainer
                  center={municipio.center}
                  zoom={municipio.zoom}
                  className="w-full h-full"
                  key={`map-${municipio.codigo}`}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />

                  {!isLoading && heatmapPoints.length > 0 && (
                    <HeatmapLayer
                      points={heatmapPoints}
                      options={heatmapOptions}
                    />
                  )}
                </MapContainer>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}