import type { CalcularRotaInputDTO, CalcularRotaOutputDTO } from '../dtos';
export interface ICalcularRotaUseCase {
    /**
     * Executa o cálculo de rota entre dois pontos
     * @param input - Dados de entrada (origem, destino, preferências)
     * @returns Promise com resultado do cálculo (distância, metadados, etc)
     * @throws Error em caso de dados inválidos ou erro no cálculo
     */
    execute(input: CalcularRotaInputDTO): Promise<CalcularRotaOutputDTO>;
}
//# sourceMappingURL=ICalcularRotaUseCase.d.ts.map