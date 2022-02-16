'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fechamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fechamento.hasMany(models.Cliente,{
        foreignKey:"comprador",
        as: "comprador"
      }),
      Fechamento.hasMany(models.Cliente,{
        foreignKey: "vendedor",
        as: "vendedor"
      }),
      Fechamento.hasMany(models.Armazem,{
        foreignKey: "retirada",
        as: "retirada"
      }),
      Fechamento.hasMany(models.Armazem,{
        foreignKey: "retirada",
        as: "descarga"
      })
    }
  }
  Fechamento.init({
    nroFechamento: DataTypes.STRING,
    comprador: DataTypes.INTEGER,
    vendedor: DataTypes.INTEGER,
    pc: DataTypes.STRING,
    retirada: DataTypes.INTEGER,
    descarga: DataTypes.INTEGER,
    condicaoVenda: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    quantidade: DataTypes.FLOAT,
    modalidade: DataTypes.STRING,
    descricao: DataTypes.STRING,
    pagamento: DataTypes.STRING,
    corretor: DataTypes.STRING,
    corretagemVendedor: DataTypes.FLOAT,
    corretagemComprador: DataTypes.FLOAT,
    obs: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Fechamento',
  });
  return Fechamento;
};