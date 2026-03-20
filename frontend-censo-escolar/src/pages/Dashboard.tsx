import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const estados = [
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
];

export default function Dashboard() {
  return (
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen flex flex-1 min-h-250">
      
      {/* Sidebar */}
      <aside className="w-80 shrink-0 bg-gray-900 text-white p-4 overflow-y-auto relative z-40">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>

        {/* Estado */}
        <div className="mb-4">
          <label className="block mb-1">Estado</label>
          <select className="w-full p-2 bg-gray-800 border border-gray-700 rounded">
            <option value="">Todos</option>
            {estados.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo */}
        <div className="mb-4">
          <label className="block mb-1">Tipo de Escola</label>
          <select className="w-full p-2 bg-gray-800 border border-gray-700 rounded">
            <option value="">Todos</option>
            <option value="privada">Privada</option>
            <option value="estadual">Estadual</option>
            <option value="municipal">Municipal</option>
            <option value="federal">Federal</option>
          </select>
        </div>

        <button className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700 transition">
          Aplicar filtros
        </button>
      </aside>

      {/* Mapa */}
      <div className="flex-1 relative z-0">
        <MapContainer
          center={[-14.235, -51.9253]}
          zoom={4}
          className="w-full h-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}