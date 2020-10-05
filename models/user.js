module.exports = class user {
    constructor(username, password, index) {
        this.username = username;
        this.password = password;
        this.index = index;
    }

    get username() {
        return this._username;
    }

    set username(username) {
        this._username = username;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }

    get index() {
        return this._index;
    }

    set index(index) {
        this._index = index;
    }
}