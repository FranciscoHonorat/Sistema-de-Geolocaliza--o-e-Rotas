"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcularRotaUseCase = void 0;
const rota_1 = require("../../domian/entities/rota");
const coordenada_1 = require("../../domian/value-objects/coordenada");
class CalcularRotaUseCase {
    async executar(input) {
        // 1. Pegar dados do input
        const lat1 = input.origem.latitude;
        const lon1 = input.origem.longitude;
        const lat2 = input.destino.latitude;
        const lon2 = input.destino.longitude;
        // 2. Medir tempo de processamento
        const inicio = Date.now();
        // 3. Criar objetos Coordenada
        const origem = new coordenada_1.Coordenada(lat1, lon1);
        const destino = new coordenada_1.Coordenada(lat2, lon2);
        // 4. Criar rota e calcular
        const id = `rota_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const rota = new rota_1.Rota(id, origem, destino);
        const distancia = rota.distanciaTotal;
        const fim = Date.now();
        // 5. Montar o CalcularRotaOutputDTO (seguindo exatamente o DTO)
        return {
            id: rota.getId,
            distanciaPrecisa: distancia,
            distanciaArredondada: Math.round(distancia * 100) / 100,
            unidade: 'km',
            tempoDeProcessamento: fim - inicio, // ADICIONAR
            calculadoEm: new Date().toISOString(),
            algoritmo: 'haversine',
            versaoApi: '1.0.0'
            // REMOVER: origem e destino (não estão no DTO)
        };
    }
}
exports.CalcularRotaUseCase = CalcularRotaUseCase;
//# sourceMappingURL=CalcularRotaUseCase.js.map