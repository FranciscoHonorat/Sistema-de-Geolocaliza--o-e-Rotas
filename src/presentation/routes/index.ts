import { Router } from 'express';
import rotaRoutes from './rotaRoutes';
//import usuarioRoutes from './usuarioRoutes';

const router = Router();

// Organizar por módulos
router.use('/rotas', rotaRoutes);

export default router;