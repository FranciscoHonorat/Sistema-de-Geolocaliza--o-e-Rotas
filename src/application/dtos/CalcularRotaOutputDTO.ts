import { CoordenadaDTO } from './CoordenadaDTO';

export interface CalcularRotaOutputDTO {
    origem: CoordenadaDTO;
    destino: CoordenadaDTO;
    distancia: number;
    duracao: number;
    distanciaDireta: number;
    passos: Array<{
        distancia: number;
        duracao: number;
        instrucao: string;
    }>;
    modoViagem: string;
    calculadoEm: string;
}