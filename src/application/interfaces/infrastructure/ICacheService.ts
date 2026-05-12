export interface ICacheService {
    // Salvar dados no cache
    set(key: string, value: any, ttl?: number): Promise<void>;

    // Buscar dados do cache
    get<T>(key: string): Promise<T | null>;

    // Remover do cache
    delete(key: string): Promise<void>;
}