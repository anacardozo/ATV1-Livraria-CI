import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Livro extends Model {
    declare id: number;
    declare titulo: string;
    declare autor: string;
    declare preco: number;
    declare sinopse: string;
    declare anoPublicacao: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Livro.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        preco: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        sinopse: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        anoPublicacao: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'livros',
        timestamps: true
    }
);