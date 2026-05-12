export interface ICacheService {
    // Salvar dados no cache
    salvar(chave: string, dados: any, ttlSegundos?: number): Promise<void>;
    
    // Buscar dados do cache
    buscar<T>(chave: string): Promise<T | null>;
    
    // Remover do cache
    remover(chave: string): Promise<void>;
    
    // Limpar cache completo
    limpar(): Promise<void>;
}