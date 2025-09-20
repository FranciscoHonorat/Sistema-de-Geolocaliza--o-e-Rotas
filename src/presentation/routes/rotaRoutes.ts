import { Router } from 'express';
import { RotaController } from '../controllers/RotaController';

const router = Router();
const rotaController = new RotaController();

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

export default router;