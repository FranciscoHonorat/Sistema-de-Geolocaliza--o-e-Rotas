import type { ICacheService } from "../../application/interfaces";

export class MemoryCacheService implements ICacheService {
    //Conceito map para armazenar dados
    private cache = new Map<string, { data: any; expiry?: number }>();

    async salvar(chave: string, dados: any, ttlSegundos?: number): Promise<void> {
        const expiry = ttlSegundos ? Date.now() + (ttlSegundos * 1000) : undefined;
        this.cache.set(chave, { data: dados, expiry });
    }

    async buscar<T>(chave: string): Promise<T | null> {
        const item = this.cache.get(chave);

        if (!item) return null;

        //Verificar expiração
        if (item.expiry && Date.now() > item.expiry) {
            this.cache.delete(chave);
            return null;
        }

        return item.data as T;
    }

    async remover(chave: string): Promise<void> {
        this.cache.delete(chave);
    }

    async limpar(): Promise<void> {
        this.cache.clear();
    }
}