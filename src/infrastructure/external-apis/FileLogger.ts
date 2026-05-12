import type { ILogger } from '../../application/interfaces/infrastructure/ILogger';
import fs from 'fs';
import path from 'path';

// Logger que escreve em arquivos para produção
export class FileLogger implements ILogger {
    constructor(private logPath: string = './logs') {}

    private async ensureDir(): Promise<void> {
        const dir = path.resolve(this.logPath);
        try {
            await fs.promises.mkdir(dir, { recursive: true });
        } catch (err) {
            // se falhar, não progagar; fallback será console
            console.error('Falha ao criar diretório de logs:', err);
        }
    }

    private async write(level: string, mensagem: string, contexto?: any): Promise<void> {
        try {
            await this.ensureDir();
            const dir = path.resolve(this.logPath);
            const date = new Date().toISOString().slice(0, 10);
            const file = path.join(dir, `${level}-${date}.log`);
            let meta = '';
            if (contexto !== undefined) {
                try {
                    meta = ' ' + JSON.stringify(contexto);
                } catch (err) {
                    meta = ' [contexto não serializável]';
                }
            }
            const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${mensagem}${meta}\n`;
            await fs.promises.appendFile(file, line, { encoding: 'utf8' });
        } catch (err) {
            // Nunca lançar: em caso de erro, logar no console para método ainda funcionar
            // Mantém a aplicação resiliente se FS falhar
            // eslint-disable-next-line no-console
            console.error('FileLogger fallback, erro ao escrever log em arquivo:', err);
        }

    }
    
    info(mensagem: string, contexto?: any): void {
        void this.write('info', mensagem, contexto);
    }
    
    error(mensagem: string, erro?: Error, contexto?: any): void {
        const contex = { ...contexto, error: erro ? {message: erro.message, stack: erro.stack } : undefined };
        void this.write('error', mensagem, contex);
    }
    
    warn(mensagem: string, contexto?: any): void {
        void this.write('warn', mensagem, contexto);
    }
    
    debug(mensagem: string, contexto?: any): void {
        // Somente escreve debug se não for production
        if (process.env.NODE_ENV !== 'production') {
            void this.write('debug', mensagem, contexto);
        }
    }
}