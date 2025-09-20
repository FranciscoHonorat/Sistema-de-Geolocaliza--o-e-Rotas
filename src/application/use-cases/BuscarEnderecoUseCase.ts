import { BuscarEnderecoInputDTO, BuscarEnderecoOutputDTO } from "../dtos";

export class BuscarEnderecoUseCase {
    // método 1: validação
    private validarInput(input: BuscarEnderecoInputDTO): void {
        // validar coordenadas
        if (typeof input.latitude !== 'number' || typeof input.longitude !== 'number') {
            throw new Error('Latitude e longitude devem ser números.');
        }

        // validar faixa de valores
        if (input.latitude < -90 || input.latitude > 90) {
            throw new Error('Latitude inválida. Deve estar entre -90 e 90.');
        }

        if (input.longitude < -180 || input.longitude > 180) {
            throw new Error('Longitude inválida. Deve estar entre -180 e 180.');
        }
    }

    // método 2: buscar endereço
    private async buscarEndereco(latitude: number, longitude: number): Promise<any> {
        const enderecosMock: { [key: string]: any } = {
            "-23.5505,-46.6333": {
                endereco: "Avenida Paulista, 1000 - Bela Vista, São Paulo - SP",
                cidade: "São Paulo",
                estado: "SP",
                pais: "Brasil"
            },
            "-22.9068,-43.1729": {
                endereco: "Copacabana, Rio de Janeiro - RJ",
                cidade: "Rio de Janeiro", 
                estado: "RJ",
                pais: "Brasil"
            }
        };
        
        const chave = `${latitude},${longitude}`;
        await new Promise(resolve => setTimeout(resolve, 50));
        
        return enderecosMock[chave] || null;
    }

    //métod 3 execução principal
    async executar(input: BuscarEnderecoInputDTO): Promise<BuscarEnderecoOutputDTO> {
        // 1. Validar entrada
        this.validarInput(input);

        // 2. Medir tempo de processamento
        const inicio = Date.now();

        // 3. Buscar endereço
        const resultado = await this.buscarEndereco(input.latitude, input.longitude);
        if (!resultado) {
            throw new Error('Endereço não encontrado para as coordenadas fornecidas.');
        }

        const fim = Date.now();

        // 4. Transformar resultado seguindo DTO COMPLETO
        const output: BuscarEnderecoOutputDTO = {
            enderecoCompleto: resultado.endereco,  
            cidade: resultado.cidade,              
            estado: resultado.estado,              
            pais: resultado.pais,                  
            coordenadas: { latitude: input.latitude, longitude: input.longitude }, 
            provedor: 'mock-interno',              
            calculadoEm: new Date().toISOString(), 
            tempoDeProcessamento: fim - inicio     
        };

        return output;
    }
}