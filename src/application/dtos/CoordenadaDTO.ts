export interface CoordenadaDTO {
    // o que é uma coordenada precisa ter para trafegaar entre camadas?
    latitude: number; //latitude entre -90 e 90
    longitude: number; //longitude entre -180 e 180

    // altitude e precisão
    altitude?: number; // em metros, opcional
    precisao?: number; // em metros, opcional
    
    // sistema de coordenadas
    sistemaDeCoordenadas?: 'WGS84' | 'GCJ-02' | 'BD-09'; // futuro, opcional
}