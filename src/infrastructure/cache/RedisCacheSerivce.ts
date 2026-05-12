import { ICacheService } from '../../application/interfaces/infrastructure/ICacheService';

export class RedisCacheService implements ICacheService {
    constructor(private _redisUrl: string) {
        console.log('Redis configurado:', this._redisUrl);
    }

    async get<T>(key: string): Promise<T | null> {
        console.log('Redis get:', key);
        return null;
    }

    async set(key: string, _value: any, _ttl?: number): Promise<void> {
        console.log('Redis set:', key);
    }

    async delete(key: string): Promise<void> {
        console.log('Redis delete:', key);
    }
}