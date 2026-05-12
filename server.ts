import 'dotenv/config';
import express from 'express';
import path from 'path';
import rotaRoutes from './src/presentation/routes/rotaRoutes';
import { ErrorHandlerMiddleware } from './src/presentation/middlewares/error-handling/ErrorHandlerMiddleware';
import { RequestLoggerMiddleware } from './src/presentation/middlewares/logging/RequestLoggerMiddleware';
import { CorsMiddleware } from './src/presentation/middlewares/security/CorsMiddleware';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CorsMiddleware);
app.use(RequestLoggerMiddleware);

// Servir frontend compilado (produção)
app.use(express.static(path.join(__dirname, '../dist-frontend')));

// Rotas da API
app.use('/api', rotaRoutes);

// Health check
app.get('/health', (_req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// Servir index.html para qualquer rota não-API (SPA)
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '../dist-frontend', 'index.html'));
    }
});

// Tratamento de erro global
const errorHandler = new ErrorHandlerMiddleware();
app.use(errorHandler.handle);

// Inicializar servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
    console.log(`📍 Frontend: http://localhost:${port}`);
    console.log(`📍 API: http://localhost:${port}/api`);
    console.log(`📍 Health: http://localhost:${port}/health`);
});