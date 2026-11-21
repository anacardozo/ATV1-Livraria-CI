"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./docs/swagger.json"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rota de Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: Math.floor(process.uptime()),
        mensagem: 'Backend rodando com sucesso.',
        timestamp: new Date().toISOString(),
    });
});
// Rota da documentação interativa
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Registra todas as rotas da aplicação sob o prefixo /api
app.use('/api', routes_1.appRoutes);
async function main() {
    try {
        await database_1.sequelize.authenticate();
        console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso!');
        app.listen(PORT, () => {
            console.log(`Servidor rodando em: http://localhost:${PORT}`);
            console.log(`Swagger: http://localhost:${PORT}/api/docs`);
            console.log(`Healt Check disponivel em: http://localhost:${PORT}/api/health`);
        });
    }
    catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
}
main();
