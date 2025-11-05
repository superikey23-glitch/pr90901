module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Transaction', {
        type: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        description: DataTypes.STRING
    });
};
