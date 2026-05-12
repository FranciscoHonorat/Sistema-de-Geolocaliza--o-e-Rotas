import { CalcularRotaInputDTO, CalcularRotaOutputDTO } from '../dtos';
import { CalcularRotaUseCase } from '../use-cases/CalcularRotaUseCase';
import { IEnderecoRepository } from '../interfaces/repositories/IEnderecoRepository';
import { IRotaRepository } from '../interfaces/repositories/IRotaRepository';
import { IMapProvider } from '../interfaces/infrastructure/IMapProvider';
import { IDistanceCalculator } from '../../domian/interfaces/IDistanceCalculator';
import { ILogger } from '../interfaces/infrastructure/ILogger';

interface RotaServicesDependencies {
    enderecoRepository: IEnderecoRepository;
    rotaRepository: IRotaRepository;
    mapProvider: IMapProvider;
    distanceCalculator: IDistanceCalculator;
    logger: ILogger;
}

export class RotaServices {
    constructor(private dependencies: RotaServicesDependencies) {}

    async calcularRota(input: CalcularRotaInputDTO): Promise<CalcularRotaOutputDTO> {
        const useCase = new CalcularRotaUseCase(
            this.dependencies.mapProvider,
            this.dependencies.rotaRepository,
            this.dependencies.distanceCalculator,
            this.dependencies.logger
        );
        return await useCase.execute(input);
    }
}