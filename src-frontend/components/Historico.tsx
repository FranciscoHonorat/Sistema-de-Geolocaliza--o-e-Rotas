import { useEffect, useState } from 'react';

interface HistoricoItem {
  id: string;
  tipo: string;
  dados: string;
  timestamp: Date;
}

export const Historico: React.FC = () => {
  const [items, setItems] = useState<HistoricoItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('historico');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  const addItem = (tipo: string, dados: string) => {
    const newItem: HistoricoItem = {
      id: Date.now().toString(),
      tipo,
      dados,
      timestamp: new Date(),
    };

    const newItems = [newItem, ...items].slice(0, 5);
    setItems(newItems);
    localStorage.setItem('historico', JSON.stringify(newItems));
  };

  // Expor função globalmente para uso em outros componentes
  (window as any).addToHistory = addItem;

  return (
    <div className="card">
      <h2>📜 Últimas Buscas</h2>
      <div id="historico">
        {items.length === 0 ? (
          <p style={{ color: '#999' }}>Nenhum histórico ainda</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="historico-item">
              <strong>{item.tipo}</strong><br />
              {item.dados}<br />
              <small>{new Date(item.timestamp).toLocaleString('pt-BR')}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};