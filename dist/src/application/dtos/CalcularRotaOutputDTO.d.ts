import { CoordenadaDTO } from './CoordenadaDTO';
export interface CalcularRotaOutputDTO {
    id: string;
    distanciaPrecisa: number;
    distanciaArredondada: number;
    unidade: 'km' | 'miles';
    tempoDeProcessamento: number;
    waypoints?: CoordenadaDTO[];
    calculadoEm: string;
    algoritmo?: 'haversine' | 'enum';
    versaoApi: string;
}
//# sourceMappingURL=CalcularRotaOutputDTO.d.ts.map