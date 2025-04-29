const express = require('express');
const router = express.Router();
const { completeOrder } = require('../controllers/paymentController');

router.post('/order-complete', completeOrder);

module.exports = router;
