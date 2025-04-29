const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mailController = require('../controllers/mailController');

router.post('/send-email', mailController.sendEmail);

module.exports = router;
