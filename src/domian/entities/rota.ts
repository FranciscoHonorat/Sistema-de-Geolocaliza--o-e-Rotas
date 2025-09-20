import { Coordenada } from '../value-objects/coordenada';

export class Rota {
    constructor(
        private id: string,
        private origem: Coordenada,
        private destino: Coordenada,
    ) {}

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