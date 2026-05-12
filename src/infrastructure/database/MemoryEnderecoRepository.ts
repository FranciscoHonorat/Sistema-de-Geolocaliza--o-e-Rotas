import { IEnderecoRepository } from '../../application/interfaces/repositories/IEnderecoRepository';
import { BuscarEnderecoOutputDTO } from '../../application/dtos';

export class MemoryEnderecoRepository implements IEnderecoRepository {
    private _enderecos = new Map<string, BuscarEnderecoOutputDTO>();

    async buscarPorCep(cep: string): Promise<BuscarEnderecoOutputDTO | null> {
        return {
            endereco: `${cep} - Rua Exemplo, Bairro Exemplo, Cidade Exemplo - EX`,
            coordenadas: { latitude: -23.55, longitude: -46.63 },
            cep,
            cidade: 'Cidade Exemplo',
            estado: 'EX',
            pais: 'Brasil'
        };
    }

    async salvar(endereco: BuscarEnderecoOutputDTO): Promise<void> {
        if (endereco.cep) {
            this._enderecos.set(endereco.cep, endereco);
        }
    }
}