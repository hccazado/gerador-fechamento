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
      Fechamento.hasOne(models.Cliente,{
        foreignKey:"id",
        as: "comprador"
      }),
      Fechamento.hasOne(models.Cliente,{
        foreignKey: "id",
        referenceKey: "ID_Vendedor",
        as: "vendedor"
      }),
      Fechamento.hasMany(models.Armazem,{
        foreignKey: "id",
        as: "retirada"
      }),
      Fechamento.hasMany(models.Armazem,{
        foreignKey: "id",
        as: "descarga"
      })
    }
  }
  Fechamento.init({
    nroFechamento: DataTypes.STRING,
    ID_comprador: DataTypes.INTEGER,
    ID_vendedor: DataTypes.INTEGER,
    pc: DataTypes.STRING,
    data: DataTypes.DATEONLY,
    ID_retirada: DataTypes.INTEGER,
    ID_descarga: DataTypes.INTEGER,
    condicaoVenda: DataTypes.STRING,
    preco: DataTypes.DECIMAL(10,2),
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