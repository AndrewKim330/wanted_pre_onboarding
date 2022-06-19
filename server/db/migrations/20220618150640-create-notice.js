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
                field: 'companies_id',
                allowNull: false,
                type: Sequelize.STRING,
            },
            hiring_position: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            hiring_incentive: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            hiring_details: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            required_stack: {
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
        await queryInterface.dropTable('Notices');
    },
};
