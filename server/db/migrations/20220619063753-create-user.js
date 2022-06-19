'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      desired_position: {
        type: Sequelize.STRING
      },
      user_mail: {
        type: Sequelize.STRING
      },
      tech_stack: {
        type: Sequelize.STRING
      },
      certificates: {
        type: Sequelize.STRING
      },
      career: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};