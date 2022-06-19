'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Notices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            company_id: {
                type: Sequelize.INTEGER,
            },
            hiring_position: {
                type: Sequelize.STRING,
            },
            hiring_incentive: {
                type: Sequelize.INTEGER,
            },
            hiring_detail: {
                type: Sequelize.STRING,
            },
            required_stack: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Notices');
    },
};
