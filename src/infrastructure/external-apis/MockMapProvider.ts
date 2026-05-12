import { IMapProvider } from '../../application/interfaces/infrastructure/IMapProvider';

export class MockMapProvider implements IMapProvider {
    async geocode(address: string): Promise<any> {
        await this.simularLatencia();
        
        return {
            location: {
                latitude: -23.5505 + (Math.random() - 0.5) * 0.1,
                longitude: -46.6333 + (Math.random() - 0.5) * 0.1
            },
            formatted_address: address,
            city: 'São Paulo',
            state: 'SP',
            country: 'Brasil',
            postal_code: '01310-100'
        };
    }

    async reverseGeocode(lat: number, lng: number): Promise<any> {
        await this.simularLatencia();
        
        return {
            location: { latitude: lat, longitude: lng },
            formatted_address: this.gerarEnderecoFake(lat, lng),
            city: 'Cidade Mock',
            state: 'Estado Mock',
            country: 'Brasil'
        };
    }

    async getDirections(_origin: any, _destination: any, _mode: string): Promise<any> {
        await this.simularLatencia();
        
        const distanciaKm = Math.random() * 50 + 10;
        
        return {
            distance: distanciaKm,
            duration: distanciaKm * 2,
            steps: [
                {
                    distancia: distanciaKm * 0.4,
                    duracao: distanciaKm * 0.8,
                    instrucao: 'Siga em frente pela Avenida Principal'
                },
                {
                    distancia: distanciaKm * 0.3,
                    duracao: distanciaKm * 0.6,
                    instrucao: 'Vire à direita na Rua Secundária'
                },
                {
                    distancia: distanciaKm * 0.3,
                    duracao: distanciaKm * 0.6,
                    instrucao: 'Chegue ao seu destino à esquerda'
                }
            ]
        };
    }

    private async simularLatencia(): Promise<void> {
        const delay = Math.random() * 500 + 200;
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    private gerarEnderecoFake(lat: number, _lng: number): string {
        const ruas = ['Avenida Paulista', 'Rua Augusta', 'Avenida Faria Lima', 'Rua da Consolação'];
        const bairros = ['Jardins', 'Pinheiros', 'Vila Mariana', 'Moema'];
        
        const rua = ruas[Math.floor(Math.random() * ruas.length)];
        const numero = Math.floor(Math.random() * 2000) + 1;
        const bairro = bairros[Math.floor(Math.random() * bairros.length)];
        
        return `${rua}, ${numero} - ${bairro}, São Paulo - SP, ${Math.abs(lat).toFixed(5)}`;
    }
}