// DTO = contrato de dados entre camadas
interface CoordenadaDTO {
    // o que é uma coordenada precisa ter para trafegaar entre camadas?
    latitude: number; //latitude entre -90 e 90
    longitude: number; //longitude entre -180 e 180

    // altitude e precisão
    altitude?: number; // em metros, opcional
    precisao?: number; // em metros, opcional
    
    // sistema de coordenadas
    sistemaDeCoordenadas?: 'WGS84' | 'GCJ-02' | 'BD-09'; // futuro, opcional
}

interface CalcularRotaInputDTO {
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

interface CalcularRotaOutputDTO {
    // O que vou devolver após calcular?
    id: string;
    //Precisão de distância:
    distanciaPrecisa: number; //distância em casas decimais
    distanciaArredondada: number; //distância arredondada
    unidade: 'km' | 'miles'; // unidade de medida

    //Metadados úteis
    tempoDeProcessamento: number; // em ms
    waypoints?: CoordenadaDTO[]; // pontos intermediários usados

    //Detalhes da rota
    calculadoEm: string; // timestamp ISO
    algoritmo?: 'haversine' | 'enum'; // futuro: qual algoritmo foi usado
    versaoApi: string; // para controle de versão
}

interface ValidacaoErrorDTO {
    campo: string; // qual campo deu erro
    mensagem: string; // mensagem de erro
    tipo: 'validacao' | 'sistema'; // tipo de erro
    detalhes?: string; // detalhes adicionais sobre o erro

    valorRecebido?: any; // valor que causou o erro
    valorEsperado?: any; // valor esperado
    codigoDoErro?: string; // código interno do erro
}