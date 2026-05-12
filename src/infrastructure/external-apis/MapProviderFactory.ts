import type { IMapProvider } from '../../application/interfaces/infrastructure/IMapProvider';
import { GoogleMapsProvider } from './GoogleMapsProvider';

// Factory para criar diferentes provedores de mapas
export class MapProviderFactory {
    static create(type: 'google', config: any): IMapProvider {
        switch (type) {
            case 'google':
                return new GoogleMapsProvider(config.apiKey);
            // case 'openstreet':
            //     return new OpenStreetMapProvider(config);
            default:
                throw new Error(`Map provider ${type} não suportado`);
        }
    }
}

// 🎓 USO:
// const mapProvider = MapProviderFactory.create('google', { apiKey: 'abc123' });