const { User, Account, Transaction } = require('../models');

exports.getWallet = async (req, res) => {
    const users = await User.findAll({ include: Account });
    const transactions = await Transaction.findAll({ order: [['createdAt', 'DESC']] });
    res.render('index', { users, transactions });
};

exports.deposit = async (req, res) => {
    const { accountId, amount } = req.body;
    const acc = await Account.findByPk(accountId);
    if (acc) {
        acc.balance += parseInt(amount);
        await acc.save();
        await Transaction.create({ type: 'Пополнение', amount, AccountId: acc.id });
    }
    res.redirect('/');
};

exports.buy = async (req, res) => {
    const { accountId, item, cost } = req.body;
    const acc = await Account.findByPk(accountId);

    if (acc && acc.balance >= parseInt(cost)) {
        acc.balance -= parseInt(cost);
        await acc.save();
        await Transaction.create({
            type: `Покупка: ${item}`,
            amount: parseInt(cost),
            AccountId: acc.id
        });
    }

    res.redirect('/');
};

exports.transfer = async (req, res) => {
    const { fromId, toId, amount } = req.body;
    if (fromId === toId) return res.redirect('/');

    const fromAcc = await Account.findByPk(fromId);
    const toAcc = await Account.findByPk(toId);

    if (fromAcc && toAcc && fromAcc.balance >= amount) {
        fromAcc.balance -= parseInt(amount);
        toAcc.balance += parseInt(amount);
        await fromAcc.save();
        await toAcc.save();
        await Transaction.create({ type: `Перевод ${amount}р со счёта ${fromId} на ${toId}`, amount, AccountId: fromAcc.id });
    }

    res.redirect('/');
};
