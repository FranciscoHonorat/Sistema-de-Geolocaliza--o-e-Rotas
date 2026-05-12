import { IRotaRepository } from '../../application/interfaces/repositories/IRotaRepository';
import { Rota } from '../../domian/entities/rota';

export class MemoryRotaRepository implements IRotaRepository {
    private rotas: Rota[] = [];

    async save(rota: Rota): Promise<void> {
        this.rotas.push(rota);
    }

    async findById(id: string): Promise<Rota | null> {
        return this.rotas.find(r => r.id === id) || null;
    }

    async findAll(): Promise<Rota[]> {
        return [...this.rotas];
    }

    async findByUsuarioId(_usuarioId: string): Promise<Rota[]> {
        // TODO: Implementar filtro por usuário
        return [...this.rotas];
    }
}