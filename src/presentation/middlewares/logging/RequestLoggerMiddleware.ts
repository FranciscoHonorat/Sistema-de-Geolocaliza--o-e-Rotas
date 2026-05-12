import { Request, Response, NextFunction } from 'express';

export const RequestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const inicio = Date.now();
    
    res.on('finish', () => {
        const duracao = Date.now() - inicio;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} - ${duracao}ms`);
    });
    
    next();
};