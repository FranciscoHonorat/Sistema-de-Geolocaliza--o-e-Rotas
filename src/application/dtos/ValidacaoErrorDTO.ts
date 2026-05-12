// DTO = contrato de dados entre camadas
export interface ValidacaoErrorDTO {
    campo: string; // qual campo deu erro
    mensagem: string; // mensagem de erro
    tipo: 'validacao' | 'sistema'; // tipo de erro
    detalhes?: string; // detalhes adicionais sobre o erro

    valorRecebido?: any; // valor que causou o erro
    valorEsperado?: any; // valor esperado
    codigoDoErro?: string; // código interno do erro
}