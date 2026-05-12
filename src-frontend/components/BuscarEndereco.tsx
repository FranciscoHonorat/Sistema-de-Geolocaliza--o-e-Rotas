import { useState } from 'react';
import { apiService, BuscarEnderecoResponse } from '../services/api';

interface BuscarEnderecoProps {
  onResultado: (resultado: BuscarEnderecoResponse) => void;
}

export const BuscarEndereco: React.FC<BuscarEnderecoProps> = ({ onResultado }) => {
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState<BuscarEnderecoResponse | null>(null);

  const handleBuscar = async () => {
    if (!endereco.trim()) {
      setErro('Digite um endereço');
      return;
    }

    setLoading(true);
    setErro('');
    
    try {
      const data = await apiService.buscarEndereco(endereco);
      setResultado(data);
      onResultado(data);
    } catch (error: any) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>📍 Buscar Endereço</h2>
      <div className="form-group">
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          placeholder="Ex: Avenida Paulista, São Paulo"
          onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
        />
        <button onClick={handleBuscar} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      
      {erro && (
        <div className="resultado show" style={{ borderLeftColor: '#dc3545' }}>
          ❌ {erro}
        </div>
      )}
      
      {resultado && !erro && (
        <div className="resultado show">
          <strong>📍 Endereço:</strong> {resultado.endereco}<br />
          <strong>🌆 Cidade:</strong> {resultado.cidade || 'N/A'}<br />
          <strong>🗺️ Estado:</strong> {resultado.estado || 'N/A'}<br />
          <strong>🧭 Coordenadas:</strong>{' '}
          {resultado.coordenadas.latitude.toFixed(6)},{' '}
          {resultado.coordenadas.longitude.toFixed(6)}
        </div>
      )}
    </div>
  );
};