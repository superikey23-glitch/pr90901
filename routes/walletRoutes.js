const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.get('/', walletController.getWallet);
router.post('/wallet/deposit', walletController.deposit);
router.post('/wallet/buy', walletController.buy);
router.post('/wallet/transfer', walletController.transfer);

module.exports = router;
