module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Account', {
        balance: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
};
