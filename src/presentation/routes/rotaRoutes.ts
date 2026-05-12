import { Router } from 'express';
import { RotaController } from '../controllers/RotaController';
import { BuscarEnderecoUseCase } from '../../application/use-cases/BuscarEnderecoUseCase';
import { CalcularRotaUseCase } from '../../application/use-cases/CalcularRotaUseCase';
import { OpenStreetMapProvider } from '../../infrastructure/external-apis/OpenStreetMap';
import { MemoryCacheService } from '../../infrastructure/cache/MemoryCacheService';
import { ConsoleLogger } from '../../infrastructure/external-apis/ConsoleLogger';
import { MemoryRotaRepository } from '../../infrastructure/database/MemoryRotaRepository';
import { HaversineDistanceCalculator } from '../../domian/services/HaversineDistanceCalculator';

const router = Router();

// Instanciar providers e serviços
const mapProvider = new OpenStreetMapProvider();
const cacheService = new MemoryCacheService();
const logger = new ConsoleLogger();
const rotaRepository = new MemoryRotaRepository();
const distanceCalculator = new HaversineDistanceCalculator();

// Instanciar Use Cases
const buscarEnderecoUseCase = new BuscarEnderecoUseCase(
    mapProvider,
    cacheService,
    logger
);

const calcularRotaUseCase = new CalcularRotaUseCase(
    mapProvider,
    rotaRepository,
    distanceCalculator,
    logger
);

// Instanciar Controller
const rotaController = new RotaController(
    buscarEnderecoUseCase,
    calcularRotaUseCase
);

// Definir rotas
router.get('/endereco', rotaController.buscarEndereco);
router.post('/rota', rotaController.calcularRota);

export default router;