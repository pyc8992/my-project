const express = require("express");
const router = express.Router();
const userCtrl = require('../controllers/users');

router.get('/', userCtrl.getUser);

router.post('/', userCtrl.createUser);

module.exports = router;