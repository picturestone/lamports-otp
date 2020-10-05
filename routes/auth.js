const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const userdao = require('../database/userdao');

router.post('/index', function (req, res, next) {
    username = req.body.username;

    if (!username) {
        res.statusMessage = 'Username missing';
        res.sendStatus(400);
    } else {
        userdao.getByUsername(username, (user) => {
            if (user) {
                // Don't actually safe the subtraction of the index. Otherwise, failed login attempts would always subtract from the index.
                // Plus, malicous users could let the index of other users run down to 0.
                res.send({ index: user.index - 1 });
            } else {
                res.sendStatus(404);
            }
        });
    }
});

router.get('/index', function (req, res, next) {
    // TODO get from configuration
    res.send({ index: 10 });
});

router.post('/login', function (req, res, next) {
    username = req.body.username;
    password = req.body.password;

    if (!username || !password) {
        res.statusMessage = 'Username or password missing';
        res.sendStatus(400);
    } else {
        userdao.getByUsername(username, (user) => {
            if (user) {
                authenticate(user, password, (isAuthenticated) => {
                    if (isAuthenticated) {
                        res.sendStatus(200);
                    } else {
                        res.statusMessage = 'Wrong username or password';
                        res.sendStatus(401);
                    }
                });
            } else {
                res.statusMessage = 'Wrong username or password';
                res.sendStatus(401);
            }
        });
    }
});

function authenticate(user, password, cb) {
    let isAuthenticated = false;
    let hashedPassword = hash(password);
    user.index = user.index - 1;

    // user.index >= 0 because hashing the password 0 times is still a legit login.
    while (!isAuthenticated && user.index >= 0) {
        if (hashedPassword === user.password) {
            isAuthenticated = true;
        } else {
            user.index = user.index - 1;
            hashedPassword = hash(hashedPassword);
        }
    }

    if (isAuthenticated) {
        user.password = password;
        userdao.updateByUsername(user.username, user, () => {
            cb(isAuthenticated);
        });
    } else {
        cb(isAuthenticated);
    }
}

function hash(val) {
    return crypto.createHash('sha256').update(val).digest('hex');
}

module.exports = router;