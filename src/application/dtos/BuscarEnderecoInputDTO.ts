// O que precisamos receber?
export interface BuscarEnderecoInputDTO {
    latitude: number;
    longitude: number;
    
    // Opcionais para futuro:
    idioma?: 'pt' | 'en' | 'es';
    nivelDetalhamento?: 'basico' | 'completo';
}