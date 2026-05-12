import { CoordenadaDTO } from './CoordenadaDTO';

export interface CalcularRotaInputDTO {
    origem: CoordenadaDTO;
    destino: CoordenadaDTO;
    modoViagem?: string;
}