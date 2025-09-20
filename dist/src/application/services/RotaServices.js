"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotaService = void 0;
const CalcularRotaUseCase_1 = require("../use-cases/CalcularRotaUseCase");
class RotaService {
    constructor(dependencies) {
        // Criar instâncias dos Use Cases
    }
    async calcularRota(input) {
        const useCase = new CalcularRotaUseCase_1.CalcularRotaUseCase();
        return await useCase.executar(input);
    }
}
exports.RotaService = RotaService;
//# sourceMappingURL=RotaServices.js.map