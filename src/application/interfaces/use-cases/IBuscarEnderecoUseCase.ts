import { BuscarEnderecoInputDTO, BuscarEnderecoOutputDTO } from "../../dtos";

export interface IBuscarEnderecoUseCase {
    executar(input: BuscarEnderecoInputDTO): Promise<BuscarEnderecoOutputDTO>;
}