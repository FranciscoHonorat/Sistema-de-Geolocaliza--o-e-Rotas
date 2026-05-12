import type { BuscarEnderecoOutputDTO, CalcularRotaOutputDTO } from '../../application/dtos';
import type { IMapProvider } from '../../application/interfaces/infrastructure/IMapProvider';
import type { Coordenada } from '../../domian/value-objects/coordenada';

export class GoogleMapsProvider implements IMapProvider {
    private baseUrl = "https://maps.googleapis.com/maps/api";

    constructor(private apiKey: string) {
        if(!apiKey) {
            throw new Error("Google Maps API key is required.");
        }
    }

    //Conceito: sempre validar configurações no constructor.
    validarCoordenadas(latitude: number, longitude: number): boolean {
        return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
    }

    //Conceito: encapsular chamadas externas em métodos privados.
    private async fetchFromGoogleMaps(endpoint: string, params: Record<string, string>): Promise<any> {
        const url = new URL(`${this.baseUrl}/${endpoint}`);
        params.key = this.apiKey;
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
        }
        return response.json();
    }

    //Conceito: métodos públicos claros e focados.
    async buscarEnderecoPorCoordenadas(latitude: number, longitude: number): Promise<BuscarEnderecoOutputDTO> {
        if (!this.validarCoordenadas(latitude, longitude)) {
            throw new Error("Coordenadas inválidas.");
        }
        
        //TODO: fazer requisição http
        // TODO: Transformar resposta Google → DTO
        const data = await this.fetchFromGoogleMaps('geocode/json', { latlng: `${latitude},${longitude}` });
        
        // TODO: Transformar resposta real do Google Maps
        throw new Error('Google Maps implementation pending');
    }

    async calcularRota(origem: Coordenada, destino: Coordenada): Promise<CalcularRotaOutputDTO> {
        // 🎓 CONCEITO: Como Coordenada não expõe getters, vamos usar uma abordagem diferente
        // TODO: Adicionar getters na classe Coordenada ou usar outra estratégia
        
        //TODO: Implementar Directions API
        // const data = await this.fetchFromGoogleMaps('directions/json', { 
        //     origin: `lat,lng`,
        //     destination: `lat,lng`
        // });
        
        //TODO: Transformar resposta Google → DTO
        throw new Error('Google Maps Directions implementation pending');
    }
}