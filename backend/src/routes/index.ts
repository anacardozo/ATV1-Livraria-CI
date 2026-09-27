import { Router } from 'express';
import { livroRoutes } from './livroRoutes';

const router = Router();

// registra as rotas de livros sob o prefixo /livros
router.use('/livros', livroRoutes);

export { router as appRoutes };
