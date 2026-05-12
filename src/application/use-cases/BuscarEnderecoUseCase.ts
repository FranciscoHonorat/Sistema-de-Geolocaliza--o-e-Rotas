import { IBuscarEnderecoUseCase } from '../interfaces/use-cases/IBuscarEnderecoUseCase';
import { BuscarEnderecoInputDTO, BuscarEnderecoOutputDTO } from '../dtos';
import { IMapProvider } from '../interfaces/infrastructure/IMapProvider';
import { ICacheService } from '../interfaces/infrastructure/ICacheService';
import { ILogger } from '../interfaces/infrastructure/ILogger';

export class BuscarEnderecoUseCase implements IBuscarEnderecoUseCase {
    constructor(
        private mapProvider: IMapProvider,
        private cacheService: ICacheService,
        private logger: ILogger
    ) {}

    async execute(input: BuscarEnderecoInputDTO): Promise<BuscarEnderecoOutputDTO> {
        try {
            const cacheKey = `endereco:${input.cep || input.endereco}`;
            const cached = await this.cacheService.get<BuscarEnderecoOutputDTO>(cacheKey);

            if (cached) {
                this.logger.info('Endereço encontrado no cache');
                return cached;
            }

            let resultado: BuscarEnderecoOutputDTO;

            if (input.cep) {
                resultado = await this.buscarPorCEP(input.cep);
            } else if (input.endereco) {
                resultado = await this.buscarPorEndereco(input.endereco);
            } else {
                throw new Error('CEP ou endereço é obrigatório');
            }

            await this.cacheService.set(cacheKey, resultado, 86400);
            this.logger.info(`Endereço encontrado: ${resultado.endereco}`);

            return resultado;
        } catch (error) {
            this.logger.error('Erro ao buscar endereço', error as Error);
            throw error;
        }
    }

    private async buscarPorCEP(cep: string): Promise<BuscarEnderecoOutputDTO> {
        const resultado = await this.mapProvider.geocode(cep);
        return {
            endereco: resultado.formatted_address,
            coordenadas: {
                latitude: resultado.location.latitude,
                longitude: resultado.location.longitude
            },
            cep,
            cidade: resultado.city,
            estado: resultado.state,
            pais: resultado.country
        };
    }

    private async buscarPorEndereco(endereco: string): Promise<BuscarEnderecoOutputDTO> {
        const resultado = await this.mapProvider.geocode(endereco);
        return {
            endereco: resultado.formatted_address,
            coordenadas: {
                latitude: resultado.location.latitude,
                longitude: resultado.location.longitude
            },
            cidade: resultado.city,
            estado: resultado.state,
            pais: resultado.country
        };
    }
}