'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.belongsTo(models.Fechamento,{
        foreignKey: "id"
      })
    }
  }
  Cliente.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    ie: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    cep: DataTypes.CHAR(10),
    rua: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};