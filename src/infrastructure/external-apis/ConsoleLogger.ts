import type { ILogger } from "../../application/interfaces";

export class ConsoleLogger implements ILogger {
    info(mensagem: string, contexto?: any): void {
        // formato consistente
        console.log(`[INFO] ${new Date().toISOString()} - ${mensagem}`, contexto || '');
    }

    error(mensagem: string, erro?: Error, contexto?: any): void {
        console.error(`[ERROR] ${new Date().toISOString()} - ${mensagem}`, erro ? erro.stack || erro : '', contexto || '');
    }

    warn(mensagem: string, contexto?: any): void {
        console.warn(`[WARN] ${new Date().toISOString()} - ${mensagem}`, contexto || '');
    }

    debug(mensagem: string, contexto?: any): void {
           if (process.env.NODE_ENV === 'development') {
            console.debug(`[DEBUG] ${new Date().toISOString()} - ${mensagem}`, contexto || '');
        }
    }
}