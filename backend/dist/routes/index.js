"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const express_1 = require("express");
const livroRoutes_1 = require("./livroRoutes");
const router = (0, express_1.Router)();
exports.appRoutes = router;
// registra as rotas de livros sob o prefixo /livros
router.use('/livros', livroRoutes_1.livroRoutes);
