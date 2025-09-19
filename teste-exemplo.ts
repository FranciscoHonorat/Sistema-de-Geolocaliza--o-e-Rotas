// Teste prático do exemplo que você mencionou
import { Rota } from './domian/entities/rota';
import { Coordenada } from './domian/value-objects/coordenada';

// Exemplo de uso
const saoPaulo = new Coordenada(-23.5505, -46.6333);
const rio = new Coordenada(-22.9068, -43.1729);
const rota = new Rota("rota-1", saoPaulo, rio);

console.log(`Distância: ${rota.distanciaTotal.toFixed(0)} km`);
// Deve imprimir algo como: "Distância: 358 km"

// Você pode testar outros exemplos também:
const brasilia = new Coordenada(-15.7801, -47.9292);
const rotaSPBrasilia = new Rota("rota-2", saoPaulo, brasilia);
console.log(`São Paulo → Brasília: ${rotaSPBrasilia.distanciaTotal.toFixed(0)} km`);

const rotaRioBrasilia = new Rota("rota-3", rio, brasilia);
console.log(`Rio → Brasília: ${rotaRioBrasilia.distanciaTotal.toFixed(0)} km`);