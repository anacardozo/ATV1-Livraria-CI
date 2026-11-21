"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.livroRoutes = void 0;
const express_1 = require("express");
const LivroController_1 = require("../controllers/LivroController");
const router = (0, express_1.Router)();
exports.livroRoutes = router;
// Mapeamneto dos Verbos HTTP para os métodos do LivroController
router.get('/', LivroController_1.LivroController.index);
router.get('/:id', LivroController_1.LivroController.show);
router.post('/', LivroController_1.LivroController.create);
router.put('/:id', LivroController_1.LivroController.update);
router.delete('/:id', LivroController_1.LivroController.delete);
