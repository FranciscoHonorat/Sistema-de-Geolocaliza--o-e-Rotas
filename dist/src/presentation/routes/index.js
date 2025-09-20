"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rotaRoutes_1 = __importDefault(require("./rotaRoutes"));
//import usuarioRoutes from './usuarioRoutes';
const router = (0, express_1.Router)();
// Organizar por módulos
router.use('/rotas', rotaRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map