'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Armazem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Armazem.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    ie: DataTypes.STRING,
    cep: DataTypes.CHAR(10),
    rua: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Armazem',
  });
  return Armazem;
};