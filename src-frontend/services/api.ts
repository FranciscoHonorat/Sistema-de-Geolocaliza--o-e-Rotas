const API_URL = '/api';

export interface Coordenadas {
  latitude: number;
  longitude: number;
}

export interface BuscarEnderecoResponse {
  endereco: string;
  coordenadas: Coordenadas;
  cidade?: string;
  estado?: string;
  pais?: string;
}

export interface CalcularRotaResponse {
  origem: Coordenadas;
  destino: Coordenadas;
  distancia: number;
  duracao: number;
  distanciaDireta: number;
  passos: any[];
  modoViagem: string;
}

export const apiService = {
  async buscarEndereco(endereco: string): Promise<BuscarEnderecoResponse> {
    const response = await fetch(
      `${API_URL}/endereco?endereco=${encodeURIComponent(endereco)}`
    );
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Erro ao buscar endereço');
    }
    
    return data.data;
  },

  async calcularRota(
    origem: Coordenadas,
    destino: Coordenadas,
    modoViagem: string = 'driving'
  ): Promise<CalcularRotaResponse> {
    const response = await fetch(`${API_URL}/rota`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origem, destino, modoViagem }),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Erro ao calcular rota');
    }
    
    return data.data;
  },
};