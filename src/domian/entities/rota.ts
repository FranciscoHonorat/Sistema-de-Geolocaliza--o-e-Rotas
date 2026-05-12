import { Coordenada } from '../value-objects/coordenada';

export class Rota {
    constructor(
        private id: string,
        private origem: Coordenada,
        private destino: Coordenada,
    ) {
        // Validação de ID
        if (!id || id.trim() === '') {
            throw new Error('ID da rota é obrigatório');
        }
        
        // Validação de coordenadas
        if (!origem || !destino) {
            throw new Error('Origem e destino são obrigatórios');
        }
        
        // Validação de origem ≠ destino (opcional)
        if (this.saoIguais(origem, destino)) {
            throw new Error('Origem e destino não podem ser iguais');
        }
    }
    
    private saoIguais(coord1: Coordenada, coord2: Coordenada): boolean {
        // Implementar comparação de coordenadas
        return false; // Simplificado por enquanto
    }

    get distanciaTotal(): number {
        return this.origem.distanciaAte(this.destino);
    }

    // Getters úteis para acessar os dados
    get getId(): string {
        return this.id;
    }

    get getOrigem(): Coordenada {
        return this.origem;
    }

    get getDestino(): Coordenada {
        return this.destino;
    }
}