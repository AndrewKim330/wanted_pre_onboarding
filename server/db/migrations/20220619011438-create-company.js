'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Companies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            company_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            country: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            state: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            company_mail: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Companies');
    },
};