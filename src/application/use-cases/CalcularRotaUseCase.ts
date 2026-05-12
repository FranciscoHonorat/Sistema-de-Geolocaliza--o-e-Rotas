import { ICalcularRotaUseCase } from '../interfaces/use-cases/ICalcularRotaUseCase';
import { CalcularRotaInputDTO, CalcularRotaOutputDTO } from '../dtos';
import { IMapProvider } from '../interfaces/infrastructure/IMapProvider';
import { IRotaRepository } from '../interfaces/repositories/IRotaRepository';
import { IDistanceCalculator } from '../../domian/interfaces/IDistanceCalculator';
import { ILogger } from '../interfaces/infrastructure/ILogger';
import { Rota } from '../../domian/entities/rota';

export class CalcularRotaUseCase implements ICalcularRotaUseCase {
    constructor(
        private mapProvider: IMapProvider,
        private rotaRepository: IRotaRepository,
        private distanceCalculator: IDistanceCalculator,
        private logger: ILogger
    ) {}

    async execute(input: CalcularRotaInputDTO): Promise<CalcularRotaOutputDTO> {
        try {
            this.logger.info('Calculando rota...', input);

            this.validarCoordenadas(input.origem);
            this.validarCoordenadas(input.destino);

            const distanciaDireta = this.distanceCalculator.calculate(
                input.origem,
                input.destino
            );

            const rotaData = await this.mapProvider.getDirections(
                input.origem,
                input.destino,
                input.modoViagem || 'driving'
            );

            const rota = new Rota(
                input.origem,
                input.destino
            );

            await this.rotaRepository.save(rota);

            return {
                origem: input.origem,
                destino: input.destino,
                distancia: rotaData.distance,
                duracao: rotaData.duration,
                distanciaDireta,
                passos: rotaData.steps,
                modoViagem: input.modoViagem || 'driving',
                calculadoEm: new Date().toISOString()
            };

        } catch (error) {
            this.logger.error('Erro ao calcular rota', error as Error);
            throw error;
        }
    }

    private validarCoordenadas(coord: any): void {
        if (!coord.latitude || !coord.longitude) {
            throw new Error('Coordenadas inválidas');
        }
        if (coord.latitude < -90 || coord.latitude > 90) {
            throw new Error('Latitude fora do intervalo válido');
        }
        if (coord.longitude < -180 || coord.longitude > 180) {
            throw new Error('Longitude fora do intervalo válido');
        }
    }
}