'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fechamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nroFechamento: {
        type: Sequelize.STRING
      },
      comprador: {
        type: Sequelize.INTEGER
      },
      vendedor: {
        type: Sequelize.INTEGER
      },
      pc: {
        type: Sequelize.STRING
      },
      retirada: {
        type: Sequelize.INTEGER
      },
      descarga: {
        type: Sequelize.INTEGER
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