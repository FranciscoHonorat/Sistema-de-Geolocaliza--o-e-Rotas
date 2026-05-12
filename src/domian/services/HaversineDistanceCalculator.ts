import { IDistanceCalculator } from '../interfaces/IDistanceCalculator';
import { CoordenadaDTO } from '../../application/dtos';

export class HaversineDistanceCalculator implements IDistanceCalculator {
    private readonly EARTH_RADIUS_KM = 6371;

    calculate(origem: CoordenadaDTO, destino: CoordenadaDTO): number {
        const lat1Rad = this.toRadians(origem.latitude);
        const lat2Rad = this.toRadians(destino.latitude);
        const deltaLatRad = this.toRadians(destino.latitude - origem.latitude);
        const deltaLonRad = this.toRadians(destino.longitude - origem.longitude);

        const a = Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
                  Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                  Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return this.EARTH_RADIUS_KM * c;
    }

    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
}