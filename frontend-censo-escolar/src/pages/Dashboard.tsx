import { useState, useEffect, useMemo, useCallback, useRef, type FormEvent } from 'react';
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
  totalEscolas: number;
  displayName?: string;
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
  bounds: [[number, number], [number, number]] | null;
  availableYears: number[];
  selectedYear: number;
}

interface IndicadoresApiResponse {
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

interface EscolaGeoResponse {
  id_escola: number;
  geometry: string;
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
// Configuração de API
// ============================================================

const BASE_URL = 'http://localhost:8000';

function parsePointFromGeometry(geometry: string): [number, number] | null {
  const trimmed = geometry.trim();
  const hexCandidate = trimmed.startsWith('\\x') || trimmed.startsWith('0x')
    ? trimmed.slice(2)
    : trimmed;

  const hexMatch = hexCandidate.match(/^[0-9a-fA-F]+$/);
  if (hexMatch) {
    if (hexCandidate.length % 2 !== 0) return null;
    const bytes = new Uint8Array(hexCandidate.length / 2);
    for (let i = 0; i < hexCandidate.length; i += 2) {
      bytes[i / 2] = Number.parseInt(hexCandidate.slice(i, i + 2), 16);
    }

    const dataView = new DataView(bytes.buffer);
    const littleEndian = dataView.getUint8(0) === 1;
    const geomType = dataView.getUint32(1, littleEndian);
    const hasSrid = (geomType & 0x20000000) !== 0;
    const baseType = geomType & 0x0fffffff;

    if (baseType === 1) {
      let offset = 5;
      if (hasSrid) {
        offset += 4;
      }

      const x = dataView.getFloat64(offset, littleEndian);
      const y = dataView.getFloat64(offset + 8, littleEndian);
      if (Number.isFinite(x) && Number.isFinite(y)) return [y, x];
    }

    return null;
  }

  const wktCandidate = trimmed.includes(';') ? trimmed.split(';').pop() || trimmed : trimmed;
  const wktMatch = wktCandidate.match(/POINT\s*\(\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\)/i);
  if (wktMatch) {
    const lng = Number(wktMatch[1]);
    const lat = Number(wktMatch[2]);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return [lat, lng];
  }

  const jsonMatch = trimmed.match(/-?\d+(?:\.\d+)?/g);
  if (jsonMatch && jsonMatch.length >= 2) {
    const [lngStr, latStr] = jsonMatch;
    const lng = Number(lngStr);
    const lat = Number(latStr);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return [lat, lng];
  }

  return null;
}

function resolveThemeMetric(themeId: string, escola: EscolaGeoResponse): boolean {
  switch (themeId) {
    case 'infraestrutura':
      return (
        escola.agua_potavel &&
        !escola.energia_inexistente &&
        !escola.esgoto_inexistente &&
        !escola.tratamento_lixo_inexistente
      );
    case 'laboratorio':
      return escola.laboratorio_ciencias || escola.laboratorio_informatica;
    case 'acessibilidade':
      return escola.banheiro;
    case 'alimentacao':
      return escola.alimentacao || escola.refeitorio || escola.cozinha;
    case 'internet':
      return false;
    default:
      return true;
  }
}

function buildHeatmapPointsFromEscolas(
  escolas: EscolaGeoResponse[],
  themeId: string
): HeatmapPoint[] {
  return escolas.reduce<HeatmapPoint[]>((acc, escola) => {
    const coords = parsePointFromGeometry(escola.geometry);
    if (!coords) return acc;
    const intensity = resolveThemeMetric(themeId, escola) ? 1.0 : 0.25;
    acc.push({ lat: coords[0], lng: coords[1], intensity });
    return acc;
  }, []);
}

function extractAvailableYears(escolas: EscolaGeoResponse[]): number[] {
  const years = new Set<number>();
  for (const escola of escolas) {
    const year = Number(escola.ano);
    if (!Number.isNaN(year)) years.add(year);
  }
  return Array.from(years).sort((a, b) => b - a);
}

function buildMunicipioInfo(codigoMunicipio: string, totalEscolas: number, displayName?: string): MunicipioInfo {
  return {
    codigo: codigoMunicipio,
    totalEscolas,
    displayName,
  };
}

function computeBounds(points: HeatmapPoint[]): [[number, number], [number, number]] | null {
  if (points.length === 0) return null;

  let minLat = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;
  let minLng = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    minLat = Math.min(minLat, point.lat);
    maxLat = Math.max(maxLat, point.lat);
    minLng = Math.min(minLng, point.lng);
    maxLng = Math.max(maxLng, point.lng);
  }

  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ];
}

function buildKpis(themeId: string, data: IndicadoresApiResponse): KpiData[] {
  const total = data.total_escolas;
  const pct = (value: number) => (total > 0 ? ((value / total) * 100).toFixed(1) : '0.0');
  const pctInverse = (value: number) =>
    (total > 0 ? (100 - (value / total) * 100).toFixed(1) : '0.0');

  const baseKpi = (label: string, value: string): KpiData => ({
    label,
    value,
    change: 'Atual',
    changeType: 'neutral',
  });

  const kpisByTheme: Record<string, KpiData[]> = {
    infraestrutura: [
      baseKpi('Água potável', `${pct(data.agua_potavel)}%`),
      baseKpi('Energia elétrica', `${pctInverse(data.energia_inexistente)}%`),
      baseKpi('Esgoto', `${pctInverse(data.esgoto_inexistente)}%`),
      baseKpi('Trat. de lixo', `${pctInverse(data.tratamento_lixo_inexistente)}%`),
    ],
    laboratorio: [
      baseKpi('Lab. Informática', `${pct(data.laboratorio_informatica)}%`),
      baseKpi('Lab. Ciências', `${pct(data.laboratorio_ciencias)}%`),
      baseKpi('Biblioteca', `${pct(data.biblioteca)}%`),
      baseKpi('Cozinha', `${pct(data.cozinha)}%`),
    ],
    alimentacao: [
      baseKpi('Refeitório', `${pct(data.refeitorio)}%`),
      baseKpi('Cozinha', `${pct(data.cozinha)}%`),
      baseKpi('Alimentação', `${pct(data.alimentacao)}%`),
      baseKpi('Dormitório aluno', `${pct(data.dormitorio_aluno)}%`),
    ],
    acessibilidade: [
      baseKpi('Banheiro', `${pct(data.banheiro)}%`),
      baseKpi('Quadra esportes', `${pct(data.quadra_esportes)}%`),
      baseKpi('Biblioteca', `${pct(data.biblioteca)}%`),
      baseKpi('Cozinha', `${pct(data.cozinha)}%`),
    ],
  };

  return kpisByTheme[themeId] || kpisByTheme['infraestrutura'];
}

/**
 * Busca os dados do dashboard para um município e tema específicos.
 */
async function fetchDashboardData(
  municipioTerm: string,
  themeId: string,
  ano: number
): Promise<DashboardData> {
  const encodedMunicipio = encodeURIComponent(municipioTerm.trim());

  const geoYearsRes = await fetch(
    `${BASE_URL}/escolas/municipios/${encodedMunicipio}`
  );
  if (!geoYearsRes.ok) {
    throw new Error(`Erro ao buscar anos disponíveis do município ${municipioTerm}`);
  }

  const escolasTodas: EscolaGeoResponse[] = await geoYearsRes.json();
  const availableYears = extractAvailableYears(escolasTodas);
  const selectedYear = availableYears.includes(ano) ? ano : availableYears[0] || ano;
  const query = `?ano=${selectedYear}`;

  const indicadoresRes = await fetch(
    `${BASE_URL}/escolas/municipios/${encodedMunicipio}/indicadores${query}`
  );
  if (!indicadoresRes.ok) {
    throw new Error(`Erro ao buscar indicadores do município ${municipioTerm}`);
  }

  const indicadores: IndicadoresApiResponse = await indicadoresRes.json();

  const geoRes = await fetch(
    `${BASE_URL}/escolas/municipios/${encodedMunicipio}${query}`
  );
  if (!geoRes.ok) {
    throw new Error(`Erro ao buscar escolas do município ${municipioTerm}`);
  }

  const escolas: EscolaGeoResponse[] = await geoRes.json();
  const heatmapPoints = buildHeatmapPointsFromEscolas(escolas, themeId);
  const bounds = computeBounds(heatmapPoints);
  const municipio = buildMunicipioInfo(municipioTerm, indicadores.total_escolas, municipioTerm);
  const kpis = buildKpis(themeId, indicadores);
  return { municipio, heatmapPoints, kpis, bounds, availableYears, selectedYear };
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

function FitBounds({ bounds }: { bounds: [[number, number], [number, number]] }) {
  const map = useMap();

  useEffect(() => {
    if (!bounds) return;
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, bounds]);

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
      {/* Margem inferior padronizada no layout do card */}
      <div className="flex justify-between items-start mb-2">
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
    <div className="gradient-legend space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-slate-600">Intensidade — {theme.label}</span>
      </div>
      <div
        className="h-3 rounded-full shadow-inner"
        style={{ background: gradientCSS }}
      />
      <div className="flex justify-between">
        <span className="text-[10px] text-slate-400 font-medium">Baixo</span>
        <span className="text-[10px] text-slate-400 font-medium">Médio</span>
        <span className="text-[10px] text-slate-400 font-medium">Alto</span>
      </div>
    </div>
  );
}

function MunicipioHeader({ municipio, activeTheme, displayName }: { municipio: MunicipioInfo | null; activeTheme: HeatmapTheme; displayName: string }) {
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
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold text-slate-900">
            Município {displayName}
          </h1>
          <p className="text-sm text-slate-500">
            {municipio.totalEscolas.toLocaleString('pt-BR')} escolas
          </p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg font-semibold border border-teal-100">
          {activeTheme.label}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// Dashboard Principal
// ============================================================

export default function Dashboard() {
  const [activeThemeId, setActiveThemeId] = useState<string>('infraestrutura');
  const [codigoMunicipio, setCodigoMunicipio] = useState<string>('3106200');
  const [codigoMunicipioInput, setCodigoMunicipioInput] = useState<string>('3106200');
  const [municipioDisplayName, setMunicipioDisplayName] = useState<string>('3106200');
  const [ano, setAno] = useState<number>(2023);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [heatmapPoints, setHeatmapPoints] = useState<HeatmapPoint[]>([]);
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [municipio, setMunicipio] = useState<MunicipioInfo | null>(null);
  const [mapBounds, setMapBounds] = useState<[[number, number], [number, number]] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const lastLoadedRequest = useRef<{ themeId: string; municipio: string; year: number } | null>(null);

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

  const loadData = useCallback(async (themeId: string, municipioCodigo: string, anoSelecionado: number) => {
    if (!municipioCodigo) return;

    const currentRequest = { themeId, municipio: municipioCodigo, year: anoSelecionado };
    if (
      lastLoadedRequest.current &&
      lastLoadedRequest.current.themeId === currentRequest.themeId &&
      lastLoadedRequest.current.municipio === currentRequest.municipio &&
      lastLoadedRequest.current.year === currentRequest.year
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchDashboardData(municipioCodigo, themeId, anoSelecionado);
      setMunicipio(data.municipio);
      setHeatmapPoints(data.heatmapPoints);
      setKpis(data.kpis);
      setMapBounds(data.bounds);
      setAvailableYears(data.availableYears);
      lastLoadedRequest.current = {
        themeId,
        municipio: municipioCodigo,
        year: data.selectedYear,
      };

      if (data.selectedYear !== anoSelecionado) {
        setAno(data.selectedYear);
      }
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(activeThemeId, codigoMunicipio, ano);
  }, [activeThemeId, codigoMunicipio, ano, loadData]);

  const handleThemeChange = (themeId: string) => {
    setActiveThemeId(themeId);
  };

  const handleMunicipioSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = codigoMunicipioInput.trim();
    if (trimmed && trimmed !== codigoMunicipio) {
      setCodigoMunicipio(trimmed);
      setMunicipioDisplayName(trimmed);
    }
  };

  return (
    <div className="dashboard-container">

      {/* ================= SIDEBAR ================= */}
      <aside className="dashboard-sidebar">
        <div className="p-5 space-y-6">

          {/* Logo do Dashboard */}
          <div className="pb-4 border-b border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
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

          {/* Seletor de Tema - Padronizado com space-y */}
          <div className="space-y-3">
            <label className="filter-label flex items-center gap-2">
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

          {/* Filtros adicionais - Padronizado com space-y */}
          <div className="border-t border-slate-700/60 pt-5 space-y-5">
            <label className="filter-label flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filtros
            </label>

            {/* Código do Município */}
            <form onSubmit={handleMunicipioSubmit} className="space-y-2">
              <p className="text-[11px] text-slate-500 uppercase tracking-wide font-bold">
                Código ou Nome do Município
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="text"
                  className="filter-select flex-1"
                  placeholder="Ex: 3106200 ou Belo Horizonte"
                  value={codigoMunicipioInput}
                  onChange={(event) => setCodigoMunicipioInput(event.target.value)}
                />
                <button type="submit" className="btn-header-outline px-3 py-2 text-xs">
                  Aplicar
                </button>
              </div>
            </form>

            {/* Ano */}
            <div className="space-y-2">
              <p className="text-[11px] text-slate-500 uppercase tracking-wide font-bold">
                Ano
              </p>
              <select
                className="filter-select"
                value={ano}
                onChange={(event) => setAno(Number(event.target.value))}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard-main">
        {/* Usando space-y-6 para o espaçamento principal */}
        <div className="dashboard-content space-y-6">

          {/* Header do Município */}
          <MunicipioHeader municipio={municipio} activeTheme={activeTheme} displayName={municipioDisplayName} />

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
              {municipio && mapBounds && heatmapPoints.length > 0 && (
                <MapContainer
                  center={[
                    (mapBounds[0][0] + mapBounds[1][0]) / 2,
                    (mapBounds[0][1] + mapBounds[1][1]) / 2,
                  ]}
                  zoom={12}
                  className="w-full h-full"
                  key={`map-${municipio.codigo}`}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />

                  {!isLoading && (
                    <>
                      <FitBounds bounds={mapBounds} />
                      <HeatmapLayer
                        points={heatmapPoints}
                        options={heatmapOptions}
                      />
                    </>
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
