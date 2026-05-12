import { ICacheService } from '../../application/interfaces/infrastructure/ICacheService';

export class MemoryCacheService implements ICacheService {
    private cache = new Map<string, { value: any; expireAt: number }>();

    async get<T>(key: string): Promise<T | null> {
        const item = this.cache.get(key);
        
        if (!item) {
            return null;
        }

        if (Date.now() > item.expireAt) {
            this.cache.delete(key);
            return null;
        }

        return item.value as T;
    }

    async set(key: string, value: any, ttl: number = 3600): Promise<void> {
        const expireAt = Date.now() + ttl * 1000;
        this.cache.set(key, { value, expireAt });
    }

    async delete(key: string): Promise<void> {
        this.cache.delete(key);
    }
}