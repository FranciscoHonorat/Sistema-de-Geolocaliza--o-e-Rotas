import axios from 'axios';
import { IMapProvider } from '../../application/interfaces/infrastructure/IMapProvider'; // ✅ ADICIONAR

interface NominatimResponse {
    lat: string;
    lon: string;
    display_name: string;
    address: {
        city?: string;
        state?: string;
        country?: string;
        postcode?: string;
    };
}

interface OSRMResponse {
    routes: Array<{
        distance: number;
        duration: number;
        legs: Array<{
            steps: Array<{
                distance: number;
                duration: number;
                instruction: string;
            }>;
        }>;
    }>;
}

export class OpenStreetMapProvider implements IMapProvider {
    private nominatimBaseUrl = 'https://nominatim.openstreetmap.org';
    private osrmBaseUrl = 'https://router.project-osrm.org';
    private userAgent = 'Sistema-Geolocalizacao-e-Rotas/1.0';

    async geocode(address: string): Promise<any> {
        try {
            const response = await axios.get<NominatimResponse[]>(
                `${this.nominatimBaseUrl}/search`,
                {
                    params: {
                        q: address,
                        format: 'json',
                        addressdetails: 1,
                        limit: 1,
                    },
                    headers: {
                        'User-Agent': this.userAgent,
                    }
                }
            );

            if (response.data.length === 0) {
                throw new Error('Endereço não encontrado');
            }

            const data = response.data[0];
            return {
                location: {
                    latitude: parseFloat(data.lat),
                    longitude: parseFloat(data.lon),
                },
                formatted_address: data.display_name,
                city: data.address.city,
                state: data.address.state,
                country: data.address.country,
                postal_code: data.address.postcode,
            };
        } catch (error) {
            throw new Error(`Erro ao geocodificar: ${error}`);
        }
    }

    async reverseGeocode(lat: number, lng: number): Promise<any> {
        try {
            const response = await axios.get<NominatimResponse>(
                `${this.nominatimBaseUrl}/reverse`,
                {
                    params: {
                        lat,
                        lon: lng,
                        format: 'json',
                        addressdetails: 1
                    },
                    headers: {
                        'User-Agent': this.userAgent
                    }
                }
            );

            return {
                location: {
                    latitude: parseFloat(response.data.lat),
                    longitude: parseFloat(response.data.lon),
                },
                formatted_address: response.data.display_name,
                city: response.data.address.city,
                state: response.data.address.state,
                country: response.data.address.country,
            };
        } catch (error) {
            throw new Error(`Erro ao geocodificar reverso: ${error}`);
        }
    }

    async getDirections(origin: any, destination: any, mode: string): Promise<any> {
        try {
            const osrmMode = this.convertMode(mode);
            
            const response = await axios.get<OSRMResponse>(
                `${this.osrmBaseUrl}/route/v1/${osrmMode}/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}`,
                {
                    params: {
                        overview: 'full',
                        steps: true,
                        geometries: 'geojson'
                    }
                }
            );

            if (!response.data.routes || response.data.routes.length === 0) {
                throw new Error('Nenhuma rota encontrada');
            }

            const route = response.data.routes[0];
            const steps = route.legs[0].steps.map(step => ({
                distancia: step.distance,
                duracao: step.duration,
                instrucao: step.instruction || 'Continuar'
            }));

            return {
                distance: route.distance / 1000, // metros para km
                duration: route.duration / 60, // segundos para minutos
                steps
            };
        } catch (error) {
            throw new Error(`Erro ao calcular rota: ${error}`);
        }
    }
    
    private convertMode(mode: string): string {
        const modeMap: Record<string, string> = {
            'driving': 'car',
            'walking': 'foot',
            'bicycling': 'bike',
            'car': 'car'
        };
        return modeMap[mode] || 'car';
    }
}
