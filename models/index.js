const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './wallet.db'
});

const User = require('./User')(sequelize, DataTypes);
const Account = require('./Account')(sequelize, DataTypes);
const Transaction = require('./Transaction')(sequelize, DataTypes);

User.hasMany(Account);
Account.belongsTo(User);
Account.hasMany(Transaction);
Transaction.belongsTo(Account);

module.exports = { sequelize, User, Account, Transaction };
