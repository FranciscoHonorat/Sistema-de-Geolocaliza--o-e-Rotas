// Conceito: Domain Service Interface
// Contrato para cálculo de distância entre coordenadas geográficas

import { Coordenada } from "../value-objects/coordenada";

export interface IDistanceCalculator {
    //Método principal para calcular distância
    calcular(origem: Coordenada, destino: Coordenada): number; // Retorna distância em km
    
    //Metadata do algoritmo usado
    readonly algoritmo: string;
}