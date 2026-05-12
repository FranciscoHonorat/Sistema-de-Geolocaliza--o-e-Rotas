import type { ICacheService } from "../../application/interfaces";

export class RedisCacheService implements ICacheService {
    constructor(private redisUrl: string) {
        //TODO: conectar ao redis quando implmentar
    }

    async salvar(chave: string, dados: any, ttlSegundos?: number): Promise<void> {
        // TODO: redis Set com TTL
        throw new Error("Redis implementação pendente.");
    }

    async buscar<T>(chave: string): Promise<T | null> {
        // TODO: Redis GET com parse JSON
        throw new Error("Redis implementação pendente.");
    }

    async remover(chave: string): Promise<void> {
        // TODO: Redis DEL
        throw new Error("Redis implementação pendente.");
    }

    async limpar(): Promise<void> {
        // TODO: Redis FLUSHDB
        throw new Error("Redis implementação pendente.");
    }
}