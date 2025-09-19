"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Teste prático do exemplo que você mencionou
const rota_1 = require("./domian/entities/rota");
const coordenada_1 = require("./domian/value-objects/coordenada");
// Exemplo de uso
const saoPaulo = new coordenada_1.Coordenada(-23.5505, -46.6333);
const rio = new coordenada_1.Coordenada(-22.9068, -43.1729);
const rota = new rota_1.Rota("rota-1", saoPaulo, rio);
console.log(`Distância: ${rota.distanciaTotal.toFixed(0)} km`);
// Deve imprimir algo como: "Distância: 358 km"
// Você pode testar outros exemplos também:
const brasilia = new coordenada_1.Coordenada(-15.7801, -47.9292);
const rotaSPBrasilia = new rota_1.Rota("rota-2", saoPaulo, brasilia);
console.log(`São Paulo → Brasília: ${rotaSPBrasilia.distanciaTotal.toFixed(0)} km`);
const rotaRioBrasilia = new rota_1.Rota("rota-3", rio, brasilia);
console.log(`Rio → Brasília: ${rotaRioBrasilia.distanciaTotal.toFixed(0)} km`);
//# sourceMappingURL=teste-exemplo.js.map