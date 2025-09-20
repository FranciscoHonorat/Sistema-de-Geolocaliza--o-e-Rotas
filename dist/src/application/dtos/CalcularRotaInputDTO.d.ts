import { CoordenadaDTO } from './CoordenadaDTO';
export interface CalcularRotaInputDTO {
    origem: CoordenadaDTO;
    destino: CoordenadaDTO;
    tipoRota?: 'mais-curta' | 'mais-rapida';
    waypoints?: CoordenadaDTO[];
    veiculo?: 'carro' | 'bicicleta' | 'a-pe';
    evitar?: ('pedagio' | 'ferrys' | 'estradas')[];
    idDaRequisicaoTracking?: string;
    timestampDaRequisicao?: string;
    unidadeDeMedida?: 'km' | 'miles';
    nivelDePrecissao?: 'baixa' | 'media' | 'alta';
}
//# sourceMappingURL=CalcularRotaInputDTO.d.ts.map