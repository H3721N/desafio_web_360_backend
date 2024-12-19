const express = require('express');
const router = express.Router();

const { loginCtrl } = require('./auth.controller');

router.post('/login', loginCtrl);

//router.post('/register', registerCtrl);

module.exports = router;