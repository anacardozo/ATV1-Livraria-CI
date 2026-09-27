import { Router, Request, Response } from "express";
import { LivroController } from "../controllers/LivroController";

const router = Router();

// Mapeamneto dos Verbos HTTP para os métodos do LivroController

router.get('/', LivroController.index);
router.get('/:id', LivroController.show);
router.post('/', LivroController.create);
router.put('/:id', LivroController.update);
router.delete('/:id', LivroController.delete);

export { router as livroRoutes };