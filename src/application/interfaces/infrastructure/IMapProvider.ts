import type { Coordenada } from "../../../domian/value-objects/coordenada";
import type { BuscarEnderecoOutputDTO, CalcularRotaOutputDTO } from "../../dtos";

export interface IMapProvider {
    // Buscar endereço por coordenadas (geocoding reverso)
    buscarEnderecoPorCoordenadas(latitude: number, longitude: number): Promise<BuscarEnderecoOutputDTO>;

    // Calcular rota entre pontos
    calcularRota(origem: Coordenada, destino: Coordenada): Promise<CalcularRotaOutputDTO>;
    
    // Validar se coordenadas são válidas
    validarCoordenadas(latitude: number, longitude: number): boolean;
}
