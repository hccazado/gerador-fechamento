'use strict';
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
      comprador: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model:{
            tableName: "Clientes"
          },
          key: "id",
        }
      },
      vendedor: {
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
      retirada: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model:{
            tableName: "Armazems"
          },
          key: "id",
        }
      },
      descarga: {
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
        type: Sequelize.FLOAT
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