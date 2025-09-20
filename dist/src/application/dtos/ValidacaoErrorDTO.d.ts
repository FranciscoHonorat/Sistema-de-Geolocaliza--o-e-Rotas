export interface ValidacaoErrorDTO {
    campo: string;
    mensagem: string;
    tipo: 'validacao' | 'sistema';
    detalhes?: string;
    valorRecebido?: any;
    valorEsperado?: any;
    codigoDoErro?: string;
}
//# sourceMappingURL=ValidacaoErrorDTO.d.ts.map