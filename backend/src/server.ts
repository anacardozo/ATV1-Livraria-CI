import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

import { appRoutes } from './routes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota de Health Check
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        mensagem: 'Backend rodando com sucesso.',
        timestamp: new Date().toISOString()
    });
});

// Rota da documentação interativa
app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Registra todas as rotas da aplicação sob o prefixo /api
app.use('/api', appRoutes);

async function main() {
    try {
        await sequelize.authenticate();

        console.log(
            'Conexão com o banco de dados PostgreSQL estabelecida com sucesso!'
        );

        app.listen(PORT, () => {
            console.log(`Servidor rodando em: http://localhost:${PORT}`);
            console.log(`Swagger: http://localhost:${PORT}/api/docs`);
        });

    } catch (error) {
        console.error(
            'Erro ao conectar com o banco de dados:',
            error
        );
    }
}

main();