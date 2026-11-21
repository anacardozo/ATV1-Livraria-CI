"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Livro extends sequelize_1.Model {
}
exports.Livro = Livro;
Livro.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    autor: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: false,
    },
    preco: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    sinopse: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    anoPublicacao: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'livros',
    timestamps: true,
});
