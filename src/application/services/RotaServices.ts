import { CalcularRotaInputDTO, CalcularRotaOutputDTO } from '../dtos';
import { CalcularRotaUseCase } from '../use-cases/CalcularRotaUseCase';
import type { IEnderecoRepository } from '../interfaces/repositories/IEnderecoRepository';

interface Dependencies {
    enderecoRepository: IEnderecoRepository;
}

export class RotaService {
    constructor(private dependencies: Dependencies) {
        // Dependências injetadas via constructor
    }
    
    async calcularRota(input: CalcularRotaInputDTO): Promise<CalcularRotaOutputDTO> {
        const useCase = new CalcularRotaUseCase(this.dependencies.enderecoRepository);
        return await useCase.executar(input);
    }
    
    // Futuros métodos relacionados a rotas
}