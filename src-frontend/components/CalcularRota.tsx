import { useState } from 'react';
import { apiService, CalcularRotaResponse, Coordenadas } from '../services/api';

interface CalcularRotaProps {
  onResultado: (resultado: CalcularRotaResponse) => void;
}

export const CalcularRota: React.FC<CalcularRotaProps> = ({ onResultado }) => {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [modoViagem, setModoViagem] = useState('driving');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState<CalcularRotaResponse | null>(null);

  const handleCalcular = async () => {
    if (!origem.trim() || !destino.trim()) {
      setErro('Preencha origem e destino');
      return;
    }

    setLoading(true);
    setErro('');

    try {
      const [latOrigem, lngOrigem] = origem.split(',').map(s => parseFloat(s.trim()));
      const [latDestino, lngDestino] = destino.split(',').map(s => parseFloat(s.trim()));

      if (isNaN(latOrigem) || isNaN(lngOrigem) || isNaN(latDestino) || isNaN(lngDestino)) {
        throw new Error('Coordenadas inválidas. Use o formato: lat,lng');
      }

      const origemCoord: Coordenadas = { latitude: latOrigem, longitude: lngOrigem };
      const destinoCoord: Coordenadas = { latitude: latDestino, longitude: lngDestino };

      const data = await apiService.calcularRota(origemCoord, destinoCoord, modoViagem);
      setResultado(data);
      onResultado(data);
    } catch (error: any) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getModoLabel = (modo: string) => {
    const labels: Record<string, string> = {
      driving: 'Carro',
      walking: 'Caminhando',
      bicycling: 'Bicicleta',
    };
    return labels[modo] || modo;
  };

  return (
    <div className="card">
      <h2>🚗 Calcular Rota</h2>
      <div className="form-group">
        <input
          type="text"
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
          placeholder="Origem (lat,lng) Ex: -23.5505,-46.6333"
        />
        <input
          type="text"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          placeholder="Destino (lat,lng) Ex: -22.9068,-43.1729"
        />
        <select value={modoViagem} onChange={(e) => setModoViagem(e.target.value)}>
          <option value="driving">Carro</option>
          <option value="walking">Caminhando</option>
          <option value="bicycling">Bicicleta</option>
        </select>
        <button onClick={handleCalcular} disabled={loading}>
          {loading ? 'Calculando...' : 'Calcular Rota'}
        </button>
      </div>

      {erro && (
        <div className="resultado show" style={{ borderLeftColor: '#dc3545' }}>
          ❌ {erro}
        </div>
      )}

      {resultado && !erro && (
        <div className="resultado show">
          <strong>📏 Distância (rota):</strong> {resultado.distancia.toFixed(2)} km<br />
          <strong>📐 Distância (linha reta):</strong> {resultado.distanciaDireta.toFixed(2)} km<br />
          <strong>⏱️ Duração estimada:</strong> {Math.round(resultado.duracao)} minutos<br />
          <strong>🚗 Modo:</strong> {getModoLabel(resultado.modoViagem)}
        </div>
      )}
    </div>
  );
};
