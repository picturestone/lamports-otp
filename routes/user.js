const express = require('express');
const router = express.Router();
const user = require('../models/user');
const userdao = require('../database/userdao');

router.post('/', function (req, res, next) {
    username = req.body.username;
    password = req.body.password;

    if (!username || !password) {
        res.statusMessage = 'Username or password missing';
        res.sendStatus(400);
    } else {
        userdao.getByUsername(username, (foundUser) => {
            if (foundUser) {
                res.statusMessage = 'User with this username already exists';
                res.sendStatus(400);
            } else {
                // TODO get default index from config
                userdao.insert(new user(username, password, 10), () => {
                    res.sendStatus(201);
                });
            }
        });
    }
});

module.exports = router;