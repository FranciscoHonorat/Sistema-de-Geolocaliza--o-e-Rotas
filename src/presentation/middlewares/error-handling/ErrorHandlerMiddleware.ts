import { NextFunction, Request, Response } from 'express';

export class ErrorHandlerMiddleware {
    constructor(private options: { environment?: string } = {}) {}

    handle = (erro: Error, req: Request, res: Response, next: NextFunction) => {
        //Log estruturado
        console.error('Error capturado', {
            message: erro.message,
            stack: erro.stack,
            method: req.method,
            url: req.url
        });

        //Conceito resposta baseada no ambiente
        const isDev = this.options.environment === 'development';

        res.status(500).json({
            error: 'Error interno do servidor',
            message: isDev ? erro.message: 'Algo deu errado',
            timestamp: new Date().toISOString()
        });
    };
}