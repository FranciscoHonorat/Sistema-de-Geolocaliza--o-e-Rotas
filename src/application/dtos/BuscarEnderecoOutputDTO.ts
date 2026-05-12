export interface BuscarEnderecoOutputDTO {
    enderecoCompleto: string;

    //componentes separados
    rua?: string;
    numero?: string;
    bairro?: string;
    cidade: string;
    estado: string;
    pais: string;
    cep?: string;

    //metadados
    coordenadas: {
        latitude: number;
        longitude: number;
    };
    provedor: string;
    calculadoEm: string;
    tempoDeProcessamento: number; // em ms
}