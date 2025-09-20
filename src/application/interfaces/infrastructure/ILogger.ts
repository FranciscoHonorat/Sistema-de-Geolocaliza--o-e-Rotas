export interface ILogger {
    info(mensagem: string, contexto?: any): void;
    error(mensagem: string, erro?: Error, contexto?: any): void;
    warn(mensagem: string, contexto?: any): void;
    debug(mensagem: string, contexto?: any): void;
}