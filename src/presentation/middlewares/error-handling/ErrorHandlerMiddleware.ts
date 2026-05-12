import { Request, Response, NextFunction } from 'express';

export class ErrorHandlerMiddleware {
    handle = (erro: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.error('Erro capturado:', erro.message);
        console.error('Stack:', erro.stack);
        
        res.status(500).json({
            success: false,
            error: erro.message || 'Erro interno do servidor',
            timestamp: new Date().toISOString()
        });
    };
}