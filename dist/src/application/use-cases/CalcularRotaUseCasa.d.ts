import type { CalcularRotaInputDTO, CalcularRotaOutputDTO } from '../dtos';
import type { ICalcularRotaUseCase } from '../interfaces/ICalcularRotaUseCase';
export declare class CalcularRotaUseCase implements ICalcularRotaUseCase {
    /**
     * Executa o cálculo de rota
     * Este é o ponto de entrada da nossa lógica de aplicação
     */
    execute(input: CalcularRotaInputDTO): Promise<CalcularRotaOutputDTO>;
    private validarEntrada;
    private validarCoordenada;
    private converterParaCoordenada;
    private gerarId;
}
//# sourceMappingURL=CalcularRotaUseCasa.d.ts.map