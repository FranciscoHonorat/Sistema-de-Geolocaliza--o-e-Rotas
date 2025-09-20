"use strict";
// ===== USE CASE: CALCULAR ROTA =====
// Orquestra a lógica de negócio para calcular rotas
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcularRotaUseCase = void 0;
const coordenada_1 = require("../../domian/value-objects/coordenada");
const rota_1 = require("../../domian/entities/rota");
class CalcularRotaUseCase {
    /**
     * Executa o cálculo de rota
     * Este é o ponto de entrada da nossa lógica de aplicação
     */
    async execute(input) {
        try {
            // ===== PASSO 1: VALIDAÇÃO =====
            this.validarEntrada(input);
            // ===== PASSO 2: CONVERSÃO DTO → DOMAIN =====
            const origem = this.converterParaCoordenada(input.origem);
            const destino = this.converterParaCoordenada(input.destino);
            // ===== PASSO 3: LÓGICA DE DOMÍNIO =====
            const inicioProcessamento = Date.now();
            const idRota = this.gerarId();
            const rota = new rota_1.Rota(idRota, origem, destino);
            const distancia = rota.distanciaTotal;
            const fimProcessamento = Date.now();
            // ===== PASSO 4: CONVERSÃO DOMAIN → DTO =====
            const resultado = {
                id: this.gerarId(),
                distanciaPrecisa: distancia,
                distanciaArredondada: Math.round(distancia * 100) / 100,
                unidade: input.unidadeDeMedida || 'km',
                tempoDeProcessamento: fimProcessamento - inicioProcessamento,
                calculadoEm: new Date().toISOString(),
                algoritmo: 'haversine',
                versaoApi: '1.0.0'
            };
            return resultado;
        }
        catch (error) {
            throw new Error(`Erro ao calcular rota: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    }
    // ===== MÉTODOS PRIVADOS (HELPERS) =====
    validarEntrada(input) {
        if (!input.origem || !input.destino) {
            throw new Error('Origem e destino são obrigatórios');
        }
        // Valida coordenadas
        this.validarCoordenada(input.origem, 'origem');
        this.validarCoordenada(input.destino, 'destino');
    }
    validarCoordenada(coord, nome) {
        if (typeof coord.latitude !== 'number' || typeof coord.longitude !== 'number') {
            throw new Error(`${nome}: latitude e longitude devem ser números`);
        }
        if (coord.latitude < -90 || coord.latitude > 90) {
            throw new Error(`${nome}: latitude deve estar entre -90 e 90`);
        }
        if (coord.longitude < -180 || coord.longitude > 180) {
            throw new Error(`${nome}: longitude deve estar entre -180 e 180`);
        }
    }
    converterParaCoordenada(coordDto) {
        return new coordenada_1.Coordenada(coordDto.latitude, coordDto.longitude);
    }
    gerarId() {
        return `rota_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
exports.CalcularRotaUseCase = CalcularRotaUseCase;
//# sourceMappingURL=CalcularRotaUseCasa.js.map