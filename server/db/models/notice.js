'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notice extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Notice.init(
        {
            company_id: DataTypes.STRING,
            hiring_position: DataTypes.STRING,
            hiring_incentive: DataTypes.INTEGER,
            hiring_detail: DataTypes.STRING,
            required_stack: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Notice',
        }
    );
    return Notice;
};
