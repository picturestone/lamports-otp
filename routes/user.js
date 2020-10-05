const express = require('express');
const router = express.Router();
const user = require('../models/user');
const userdao = require('../database/userdao');

router.post('/', function (req, res, next) {
    username = req.body.username;
    password = req.body.password;

    // TODO get default index from config
    userdao.insert(new user(username, password, 10), () => {
        res.sendStatus(201);
    });
});

module.exports = router;