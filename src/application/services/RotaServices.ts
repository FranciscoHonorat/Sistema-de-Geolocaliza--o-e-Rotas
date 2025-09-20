import { CalcularRotaInputDTO, CalcularRotaOutputDTO } from '../dtos';
import { CalcularRotaUseCase } from '../use-cases/CalcularRotaUseCase';

interface Dependencies {
    // Futuras dependências
}

export class RotaService {
    constructor(dependencies?: Dependencies) {
        // Criar instâncias dos Use Cases
    }
    
    async calcularRota(input: CalcularRotaInputDTO): Promise<CalcularRotaOutputDTO> {
        const useCase = new CalcularRotaUseCase();
        return await useCase.executar(input);
    }
    
    // Futuros métodos relacionados a rotas
}