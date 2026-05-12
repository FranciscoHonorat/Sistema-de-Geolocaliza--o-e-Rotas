// Conceito: Domain Service Interface
// Contrato para cálculo de distância entre coordenadas geográficas

import { CoordenadaDTO } from '../../application/dtos';

export interface IDistanceCalculator {
    //Método principal para calcular distância
    calculate(origem: CoordenadaDTO, destino: CoordenadaDTO): number; // Retorna distância em km
}