import { CoordenadaDTO } from './CoordenadaDTO';

export interface BuscarEnderecoOutputDTO {
    endereco: string;
    coordenadas: CoordenadaDTO;
    cep?: string;
    cidade?: string;
    estado?: string;
    pais?: string;
}