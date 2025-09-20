"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./src/presentation/routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
// UMA linha para todas as rotas da API
app.use('/api', routes_1.default);
// Rotas auxiliares
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});
app.get('/', (req, res) => {
    res.status(200).json({
        nome: 'API de Geolocalização e Rotas',
        versao: '1.0.0',
        endpoints: {
            'POST /api/rotas/calcular': 'Calcula distância entre dois pontos',
            'GET /health': 'Verifica status da API',
            'GET /': 'Documentação da API'
        },
        exemplo: {
            url: 'POST /api/rotas/calcular',
            body: {
                origem: { lat: -23.5505, lng: -46.6333 },
                destino: { lat: -22.9068, lng: -43.1729 }
            }
        }
    });
});
//Tratamento de erro global
app.use((error, req, res, next) => {
    console.error('Erro global: ', error.message);
    // Se resposta já foi enviada, delega para Express
    if (res.headersSent) {
        return next(error);
    }
    res.status(500).json({ erro: 'Erro interno do servidor.' });
    // Não chama next() aqui
});
//Inicializar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map