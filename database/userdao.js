const databasewrapper = require('./databasewrapper');
const user = require('../models/user');

module.exports = class userrepository {
    static getByUsername(username, cb) {
        const db = databasewrapper.getDb();
        let sql = `SELECT * FROM users WHERE username = ?`;

        db.get(sql, [username], (err, row) => {
            if(err) {
                return console.log(err.message);
            }
            if (row) {
                cb(new user(row.username, row.password, row.indexcounter));
            } else {
                cb(undefined);
            }
        });

        db.close();
    }

    static insert(user, cb) {
        const db = databasewrapper.getDb();
        let sql = `INSERT INTO users(username, password, indexcounter) VALUES(?, ?, ?)`;

        db.run(sql, [user.username, user.password, user.index], (err, row) => {
            if(err) {
                return console.log(err.message);
            }
            cb(row);
        });
    }

    static updateByUsername(username, user, cb) {
        const db = databasewrapper.getDb();
        let sql = `UPDATE users SET username = ?, password = ?, indexcounter = ? WHERE username = ?`;

        db.run(sql, [user.username, user.password, user.index, username], (err, row) => {
            if(err) {
                return console.log(err.message);
            }
            cb(row);
        });
    }
}