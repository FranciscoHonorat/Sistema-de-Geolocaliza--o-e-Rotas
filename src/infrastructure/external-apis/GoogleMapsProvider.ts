import axios from 'axios';
import { IMapProvider } from '../../application/interfaces/infrastructure/IMapProvider';

export class GoogleMapsProvider implements IMapProvider {
    private apiKey: string;
    private baseUrl = 'https://maps.googleapis.com/maps/api';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async geocode(address: string): Promise<any> {
        const response = await this.fetchFromGoogleMaps('geocode/json', { address });
        
        if (response.results && response.results.length > 0) {
            const result = response.results[0];
            return {
                location: {
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng
                },
                formatted_address: result.formatted_address,
                city: result.address_components.find((c: any) => c.types.includes('locality'))?.long_name,
                state: result.address_components.find((c: any) => c.types.includes('administrative_area_level_1'))?.short_name,
                country: result.address_components.find((c: any) => c.types.includes('country'))?.long_name
            };
        }
        
        throw new Error('Endereço não encontrado');
    }

    async reverseGeocode(lat: number, lng: number): Promise<any> {
        const response = await this.fetchFromGoogleMaps('geocode/json', { latlng: `${lat},${lng}` });
        
        if (response.results && response.results.length > 0) {
            const result = response.results[0];
            return {
                location: { latitude: lat, longitude: lng },
                formatted_address: result.formatted_address
            };
        }
        
        throw new Error('Local não encontrado');
    }

    async getDirections(origin: any, destination: any, mode: string): Promise<any> {
        const originStr = `${origin.latitude},${origin.longitude}`;
        const destinationStr = `${destination.latitude},${destination.longitude}`;
        
        const response = await this.fetchFromGoogleMaps('directions/json', {
            origin: originStr,
            destination: destinationStr,
            mode
        });

        if (response.routes && response.routes.length > 0) {
            const route = response.routes[0];
            const leg = route.legs[0];
            
            return {
                distance: leg.distance.value / 1000,
                duration: leg.duration.value / 60,
                steps: leg.steps.map((step: any) => ({
                    distancia: step.distance.value / 1000,
                    duracao: step.duration.value / 60,
                    instrucao: step.html_instructions.replace(/<[^>]*>/g, '')
                }))
            };
        }

        throw new Error('Rota não encontrada');
    }

    private async fetchFromGoogleMaps(endpoint: string, params: any): Promise<any> {
        const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
            params: { ...params, key: this.apiKey }
        });
        return response.data;
    }
}