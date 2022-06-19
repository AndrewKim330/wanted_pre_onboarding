'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Company.hasMany(models.Notice, {
                foreignKey: 'company_id',
            });
        }
    }
    Company.init(
        {
            company_name: DataTypes.STRING,
            country: DataTypes.STRING,
            state: DataTypes.STRING,
            company_mail: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Company',
        }
    );
    return Company;
};
