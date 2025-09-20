import { Router } from 'express';
import { CalcularRotaUseCase } from '../../application/use-cases/CalcularRotaUseCase';
import { RotaController } from '../controllers/RotaController';
import type { IEnderecoRepository } from '../../application/interfaces/repositories/IEnderecoRepository';

const router = Router();

// 🔧 Mock Repository para testes (substitui banco de dados)
const mockEnderecoRepository: IEnderecoRepository = {
  async buscarPorCep(cep: string) {
    // Mock simples - retorna estrutura completa do DTO
    return {
      enderecoCompleto: `${cep} - Rua Teste, Centro, São Paulo - SP`,
      rua: "Rua Teste",
      bairro: "Centro", 
      cidade: "São Paulo",
      estado: "SP",
      pais: "Brasil",
      cep,
      coordenadas: { latitude: -23.5505, longitude: -46.6333 },
      provedor: "Mock",
      calculadoEm: new Date().toISOString(),
      tempoDeProcessamento: 50
    };
  }
};

// ✅ Dependency Injection correto
const calcularRotaUseCase = new CalcularRotaUseCase(mockEnderecoRepository);
const rotaController = new RotaController(calcularRotaUseCase);

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