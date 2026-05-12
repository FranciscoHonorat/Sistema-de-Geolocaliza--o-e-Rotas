import type { CalcularRotaInputDTO, CalcularRotaOutputDTO } from '../../dtos';

/**
 * Interface que define o contrato para cálculo de rotas
 * 
 * Esta interface segue o Dependency Inversion Principle (SOLID),
 * permitindo que o Controller dependa de uma abstração ao invés
 * da implementação concreta do Use Case.
 * 
 * @example
 * ```typescript
 * const useCase: ICalcularRotaUseCase = new CalcularRotaUseCase();
 * const resultado = await useCase.executar({
 *   origem: { latitude: -23.5505, longitude: -46.6333 },
 *   destino: { latitude: -22.9068, longitude: -43.1729 }
 * });
 * ```
 */
export interface ICalcularRotaUseCase {
    /**
     * Executa o cálculo de rota entre dois pontos
     * 
     * @param input - Dados de entrada contendo origem e destino
     * @returns Promise que resolve com o resultado do cálculo
     * @throws {Error} Quando coordenadas são inválidas
     * @throws {Error} Quando ocorre erro na criação de objetos Domain
     * 
     * @example
     * ```typescript
     * const resultado = await executar({
     *   origem: { latitude: -23.5505, longitude: -46.6333 },
     *   destino: { latitude: -22.9068, longitude: -43.1729 }
     * });
     * ```
     */
    executar(input: CalcularRotaInputDTO): Promise<CalcularRotaOutputDTO>;
}