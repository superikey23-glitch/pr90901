const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User, Account } = require('./models');
const walletRoutes = require('./routes/walletRoutes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', walletRoutes);

(async () => {
  await sequelize.sync({ force: false });

  const count = await User.count();
  if (count === 0) {
    const u1 = await User.create({ name: 'Вы' });
    const u2 = await User.create({ name: 'Иван' });
    const u3 = await User.create({ name: 'Мария' });

    for (let i = 0; i < 4; i++) await Account.create({ UserId: u1.id });
    for (let i = 0; i < 4; i++) await Account.create({ UserId: u2.id });
    for (let i = 0; i < 4; i++) await Account.create({ UserId: u3.id });
    console.log('Созданы пользователи и счета');
  }
})();

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
