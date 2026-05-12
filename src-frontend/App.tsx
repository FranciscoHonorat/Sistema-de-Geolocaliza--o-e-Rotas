import { useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { Mapa } from './components/Mapa';
import { BuscarEndereco } from './components/BuscarEndereco';
import { CalcularRota } from './components/CalcularRota';
import { Historico } from './components/Historico';
import { BuscarEnderecoResponse, CalcularRotaResponse } from './services/api';
import './styles/App.css';

function App() {
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([-23.5505, -46.6333]);
  const [markers, setMarkers] = useState<Array<{ position: LatLngExpression; popup: string }>>([]);
  const [route, setRoute] = useState<LatLngExpression[]>([]);

  const handleEnderecoResultado = (resultado: BuscarEnderecoResponse) => {
    const { coordenadas, endereco } = resultado;
    const position: LatLngExpression = [coordenadas.latitude, coordenadas.longitude];
    
    setMapCenter(position);
    setMarkers([{ position, popup: endereco }]);
    setRoute([]);
    
    (window as any).addToHistory?.('Busca de Endereço', endereco);
  };

  const handleRotaResultado = (resultado: CalcularRotaResponse) => {
    const { origem, destino, distancia, duracao } = resultado;
    
    const posOrigem: LatLngExpression = [origem.latitude, origem.longitude];
    const posDestino: LatLngExpression = [destino.latitude, destino.longitude];
    
    setMarkers([
      { position: posOrigem, popup: '<b>Origem</b>' },
      { position: posDestino, popup: '<b>Destino</b>' },
    ]);
    
    setRoute([posOrigem, posDestino]);
    
    setMapCenter(posOrigem);
    
    (window as any).addToHistory?.(
      'Cálculo de Rota',
      `${distancia.toFixed(2)} km - ${Math.round(duracao)} min`
    );
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>🗺️ Sistema de Geolocalização e Rotas</h1>
          <p>OpenStreetMap Integration - React + TypeScript</p>
        </header>

        <BuscarEndereco onResultado={handleEnderecoResultado} />
        <CalcularRota onResultado={handleRotaResultado} />

        <div className="card">
          <h2>🌍 Mapa Interativo</h2>
          <Mapa center={mapCenter} markers={markers} route={route} />
        </div>

        <Historico />

        <footer>
          <p>&copy; 2024 Sistema de Geolocalização | Powered by OpenStreetMap</p>
        </footer>
      </div>
    </div>
  );
}

export default App;