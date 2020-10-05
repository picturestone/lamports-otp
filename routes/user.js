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

router.put('/', function (req, res, next) {
    if (!req.session.loggedin) {
        res.statusMessage = 'Not logged in';
        res.sendStatus(401);
    } else {
        password = req.body.password;

        if (!password) {
            res.statusMessage = 'Password missing';
            res.sendStatus(400);
        } else {
            userdao.getByUsername(req.session.username, (foundUser) => {
                if (foundUser) {
                    foundUser.password = password;
                    // TODO get index from config
                    foundUser.index = 10;
                    userdao.updateByUsername(foundUser.username, foundUser, () => {
                        res.statusMessage = 'Password changed';
                        res.sendStatus(200);
                    });
                } else {
                    res.statusMessage = 'User in session not found. Try logging in again.';
                    res.sendStatus(404);
                }
            });
        }
    }
});

module.exports = router;