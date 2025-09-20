import type { BuscarEnderecoOutputDTO } from "../../application/dtos/BuscarEnderecoOutputDTO";
import type { IEnderecoRepository } from "../../application/interfaces";

export class MemoryEnderecoRepository implements IEnderecoRepository {
    //Simuular banco com map

    private enderecos = new Map<string, BuscarEnderecoOutputDTO>();

    async buscarPorCep(cep: string): Promise<BuscarEnderecoOutputDTO | null> {
        return {
            enderecoCompleto: `${cep} - Rua Exemplo, Bairro Exemplo, Cidade Exemplo - EX`,
            rua: "Rua Exemplo",
            bairro: "Bairro Exemplo",
            cidade: "São Paulo",
            estado: "SP",
            pais: "Brasil",
            cep,
            coordenadas: {
                //correção de coordenadas fictícias
                latitude: -23.5505 + (Math.random() - 0.5) * 0.1,
                longitude: -46.6333 + (Math.random() - 0.5) * 0.1
            },
            provedor: "Memory Mock",
            calculadoEm: new Date().toISOString(),
            tempoDeProcessamento: Math.random() * 100
        };
    }
}