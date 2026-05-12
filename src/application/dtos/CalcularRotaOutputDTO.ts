import { CoordenadaDTO } from './CoordenadaDTO';

export interface CalcularRotaOutputDTO {
    // O que vou devolver após calcular?
    id: string;
    //Precisão de distância:
    distanciaPrecisa: number; //distância em casas decimais
    distanciaArredondada: number; //distância arredondada
    unidade: 'km' | 'miles'; // unidade de medida

    //Metadados úteis
    tempoDeProcessamento: number; // em ms
    waypoints?: CoordenadaDTO[]; // pontos intermediários usados

    //Detalhes da rota
    calculadoEm: string; // timestamp ISO
    algoritmo?: 'haversine' | 'enum'; // futuro: qual algoritmo foi usado
    versaoApi: string; // para controle de versão
}