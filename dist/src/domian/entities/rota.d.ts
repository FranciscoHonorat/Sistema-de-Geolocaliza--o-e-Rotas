import { Coordenada } from '../value-objects/coordenada';
export declare class Rota {
    private id;
    private origem;
    private destino;
    constructor(id: string, origem: Coordenada, destino: Coordenada);
    get distanciaTotal(): number;
    get getId(): string;
    get getOrigem(): Coordenada;
    get getDestino(): Coordenada;
}
//# sourceMappingURL=rota.d.ts.map