require('dotenv').config()

module.exports = class configuration {
    get sessionSecret() {
        return process.env.SESSION_SECRET;
    }

    get index() {
        return process.env.PASSWORD_USES;
    }

    get port() {
        return process.env.PORT;
    }

    get host() {
        return process.env.HOST;
    }
}