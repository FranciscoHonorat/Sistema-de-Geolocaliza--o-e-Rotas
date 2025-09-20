"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RotaController_1 = require("../controllers/RotaController");
const router = (0, express_1.Router)();
const rotaController = new RotaController_1.RotaController();
// Todas as rotas de /api/rotas/*
router.post('/calcular', (req, res) => {
    rotaController.calcularDistancia(req, res);
});
router.get('/historico', (req, res) => {
    // Futura: lista de histórico de rotas
    res.status(501).json({
        message: 'Funcionalidade em desenvolvimento',
        endpoint: 'GET /api/rotas/historico'
    });
});
router.delete('/:id', (req, res) => {
    // Futura: delete de rota específica por id
    res.status(501).json({
        message: 'Funcionalidade em desenvolvimento',
        endpoint: `DELETE /api/rotas/${req.params.id}`
    });
});
exports.default = router;
//# sourceMappingURL=rotaRoutes.js.map