import { BuscarEnderecoInputDTO, BuscarEnderecoOutputDTO } from '../../dtos';

export interface IBuscarEnderecoUseCase {
    execute(input: BuscarEnderecoInputDTO): Promise<BuscarEnderecoOutputDTO>;
}