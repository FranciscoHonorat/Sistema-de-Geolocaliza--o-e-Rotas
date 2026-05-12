import type { ILogger } from "../../application/interfaces";

export class ConsoleLogger implements ILogger {
    constructor(private environment: 'development' | 'production' = 'development') {}
    
    info(mensagem: string, contexto?: any): void {
        // 🎓 CONCEITO: Cores no terminal
        const timestamp = new Date().toISOString();
        console.log(`\x1b[36m[INFO]\x1b[0m ${timestamp} - ${mensagem}`, contexto || '');
    }
    
    error(mensagem: string, erro?: Error, contexto?: any): void {
        const timestamp = new Date().toISOString();
        console.error(`\x1b[31m[ERROR]\x1b[0m ${timestamp} - ${mensagem}`, erro?.stack || erro, contexto || '');
    }
    
    warn(mensagem: string, contexto?: any): void {
        const timestamp = new Date().toISOString();
        console.warn(`\x1b[33m[WARN]\x1b[0m ${timestamp} - ${mensagem}`, contexto || '');
    }

    debug(mensagem: string, contexto?: any): void {
           if (this.environment === 'development') {
            const timestamp = new Date().toISOString();
            console.debug(`\x1b[32m[DEBUG]\x1b[0m ${timestamp} - ${mensagem}`, contexto || '');
        }
    }
}