import type { ILogger } from '../../application/interfaces/infrastructure/ILogger';

// Logger que escreve em arquivos para produção
export class FileLogger implements ILogger {
    constructor(private logPath: string = './logs') {}
    
    info(mensagem: string, contexto?: any): void {
        // TODO: Escrever em arquivo
        // TODO: Rotação de logs
        throw new Error('File logger implementation pending');
    }
    
    error(mensagem: string, erro?: Error, contexto?: any): void {
        // TODO: Escrever erros em arquivo separado
        throw new Error('File logger implementation pending');
    }
    
    warn(mensagem: string, contexto?: any): void {
        // TODO: Escrever warnings em arquivo
        throw new Error('File logger implementation pending');
    }
    
    debug(mensagem: string, contexto?: any): void {
        // TODO: Debug logs (somente em desenvolvimento)
        throw new Error('File logger implementation pending');
    }
}