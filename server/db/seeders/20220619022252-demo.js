'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    user_name: 'Andrew',
                    gender: 'male',
                    desired_position: 'backend_developer',
                    user_mail: 'rendezvous330@gmail.com',
                    tech_stack: 'Javascript, Node.js',
                    certificates: '',
                    career: '',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            'Companies',
            [
                {
                    company_name: 'backend_company',
                    country: 'Korea',
                    state: 'Pangyo',
                    company_mail: 'admin@backend_company.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );

        const company_ids = await queryInterface.sequelize.query(
            `SELECT id FROM "Companies";`
        );

        await queryInterface.bulkInsert(
            'Notices',
            [
                {
                    companies_id: company_ids[0][0].id,
                    hiring_incentive: '1000000',
                    hiring_position: 'Korea',
                    hiring_details: 'Pangyo',
                    required_stack: 'admin@backend_conpany.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('People', null, {});
    },
};
