import { BuscarEnderecoOutputDTO } from "../../dtos";

export interface IEnderecoRepository {
    // Buscar por CEP (geocoding)
    buscarPorCep(cep: string): Promise<BuscarEnderecoOutputDTO | null>;
}