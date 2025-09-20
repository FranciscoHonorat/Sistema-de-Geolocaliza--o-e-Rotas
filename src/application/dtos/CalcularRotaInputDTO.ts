import { CoordenadaDTO } from './CoordenadaDTO';

export interface CalcularRotaInputDTO {
// O que preciso receber para calcular uma rota?
    origem: CoordenadaDTO;
    destino: CoordenadaDTO;

    //tipos de rota
    tipoRota?: 'mais-curta' | 'mais-rapida'; 
    waypoints?: CoordenadaDTO[]; //pontos intermediários
    veiculo?: 'carro' | 'bicicleta' | 'a-pe'; //futuro
    evitar?: ('pedagio' | 'ferrys' | 'estradas')[]; //futuro

    //Metadados:
    idDaRequisicaoTracking?: string; // para rastrear requisições
    timestampDaRequisicao?: string; // para saber quando foi feita

    //Preferências
    unidadeDeMedida?: 'km' | 'miles'; // futuro
    nivelDePrecissao?: 'baixa' | 'media' | 'alta'; // futuro
}