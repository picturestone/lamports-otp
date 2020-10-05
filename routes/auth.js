const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const userdao = require('../database/userdao');

router.post('/index', function(req, res, next) {
    username = req.body.username;

    userdao.getByUsername(username, (user) => {
        if (user) {
            user.index = user.index - 1;
            userdao.updateByUsername(user.username, user, () => {
                res.send({ index: user.index });
            })
        } else {
            res.sendStatus(404);
        }
    });
});

router.post('/login', function(req, res, next) {
    username = req.body.username;
    password = req.body.password;

    userdao.getByUsername(username, (user) => {
        if (user) {
            authenticate(user, password, (isAuthenticated) => {
                if(isAuthenticated) {
                    res.send('Is authenticated');
                } else {
                    res.sendStatus(401);
                }
            });
        } else {
            res.sendStatus(404);
        }
    });
});

function authenticate(user, password, cb) {
    let isAuthenticated = false;
    let hashedPassword = hash(password);

    // user.index >= 0 because hashing the password 0 times is still a legit login.
    while(!isAuthenticated && user.index >= 0) {
        if(hashedPassword === user.password) {
            isAuthenticated = true;
        } else {
            user.index = user.index - 1;
            hashedPassword = hash(hashedPassword);
        }
    }

    if (isAuthenticated) {
        console.log(password);
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