"use strict";
/*
Entrada: São Paulo (-23.5505, -46.6333) e Rio de Janeiro (-22.9068, -43.1729)
Saída: Distância em km
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordenada = void 0;
class Coordenada {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        // validação: latitude entre -90 e 90
        if (latitude < -90 || latitude > 90) {
            throw new Error('Latitude inválida');
        }
        // validação: longitude entre -180 e 180
        if (longitude < -180 || longitude > 180) {
            throw new Error('Longitude inválida');
        }
    }
    distanciaAte(outra) {
        // Fórmula de Haversine para calcular a distância
        const R = 6371; // Raio da terra em km
        const dLat = (outra.latitude - this.latitude) * Math.PI / 180;
        const dLon = (outra.longitude - this.longitude) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.latitude * Math.PI / 180) * Math.cos(outra.latitude * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // Retornar a distância em quilômetros
        return R * c;
    }
}
exports.Coordenada = Coordenada;
//# sourceMappingURL=coordenada.js.map