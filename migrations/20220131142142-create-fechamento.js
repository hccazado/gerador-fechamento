'use strict';

const { sequelize } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fechamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      nroFechamento: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.DATEONLY
      },
      ID_comprador: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model:{
            tableName: "Clientes"
          },
          key: "id",
        }
      },
      ID_vendedor: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model:{
            tableName: "Clientes"
          },
          key: "id",
        }
      },
      pc: {
        type: Sequelize.STRING
      },
      ID_retirada: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model:{
            tableName: "Armazems"
          },
          key: "id",
        }
      },
      ID_descarga: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model:{
            tableName: "Armazems"
          },
          key: "id",
        }
      },
      condicaoVenda: {
        type: Sequelize.STRING
      },
      preco: {
        type: Sequelize.DECIMAL(10,2)
      },
      quantidade: {
        type: Sequelize.FLOAT
      },
      modalidade: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      pagamento: {
        type: Sequelize.STRING
      },
      corretor: {
        type: Sequelize.STRING
      },
      corretagemVendedor: {
        type: Sequelize.FLOAT
      },
      corretagemComprador: {
        type: Sequelize.FLOAT
      },
      obs: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fechamentos');
  }
};