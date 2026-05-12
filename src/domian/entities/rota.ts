import { CoordenadaDTO } from '../../application/dtos';

export class Rota {
    private _id: string;
    private _origem: CoordenadaDTO;
    private _destino: CoordenadaDTO;
    private _criadoEm: Date;

    constructor(origem: CoordenadaDTO, destino: CoordenadaDTO) {
        this._id = this.gerarId();
        this._origem = origem;
        this._destino = destino;
        this._criadoEm = new Date();
    }

    get id(): string {
        return this._id;
    }

    get origem(): CoordenadaDTO {
        return this._origem;
    }

    get destino(): CoordenadaDTO {
        return this._destino;
    }

    get criadoEm(): Date {
        return this._criadoEm;
    }

    private gerarId(): string {
        return `rota_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}