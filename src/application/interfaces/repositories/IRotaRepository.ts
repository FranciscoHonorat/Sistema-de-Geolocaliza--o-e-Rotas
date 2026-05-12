import { Rota } from '../../../domian/entities/rota';

export interface IRotaRepository {
    save(rota: Rota): Promise<void>;
    findById(id: string): Promise<Rota | null>;
    findAll(): Promise<Rota[]>;
    findByUsuarioId(usuarioId: string): Promise<Rota[]>;
}