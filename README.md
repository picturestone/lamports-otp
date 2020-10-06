# Lamports-OTP

This server is made to work with the lamports-otp client found in the [lamports-otp-client repository](https://github.com/picturestone/lamports-otp-client).

The default user `root` with the password `root` is already available. The password is valid for 1000 logins. After that, the password must be changed. It can also be changed before. New passwords are always valid for howerver `PASSWORD_USES` is configured.

## Routes

### POST `/users`

Adds a new user. Send the following data:

```json
{
    'username': <username>,
    'password': <password>
}
```

`<username>` is the username as a string.

`<password>` is the password as a string, hashed with sha256 converted to HEX for as many times as a request to GET `auth/index` returns.

### PUT `/users`

Use this route to change the password for the logged in user. Send the following data:

```json
{
    'password': <password>
}
```

`<password>` is the password as a string, hashed with sha256 converted to HEX for as many times as a request to GET `auth/index` returns.

### GET `auth/index`

Returns the number of uses per newly set password (which is the configured parameter `PASSWORD_USES`). Returns the following data:

```json
{
    'index': <index>
}
```

`<index>` is the number of uses for which a newly set password is valid.

### POST `auth/index`

Use this route to get the number of hashes necessary for the next login. Send the following data:

```json
{
    'username': <username>
}
```

`<username>` is the username as a string.

Returns the following data:

```json
{
    'index': <index>
}
```

`<index>` is the number of hashes necessary for the password to be valid on the next login.

### POST `auth/login`

Use this route for the login. Send the following data:


```json
{
    'username': <username>,
    'password': <password>
}
```


`<username>` is the username as a string.

`<password>` is the password as a string, hashed with sha256 converted to HEX for as many times as a request to POST `auth/index` returns.

### GET `auth/logout`

Use this route to logout and invalidate the session of the currently logged in user.

## Installation

### Prerequisits

The following are prerequisits for running this website.

* git, downloadable [here](https://git-scm.com/downloads)
* node, downloadable [here](https://nodejs.org/en/download)

### Setup

This is the setup procedure:

1. Enter in the terminal: `git clone https://github.com/picturestone/lamports-otp`
1. Go to the folder `lamports-otp`
1. Download dependencies: `npm install`
1. Configurate (see Installation > Configuration) - This is optional.
1. Start the sever: `node app.js`

If all configurations are unchanged the server is reachable via the url [http://localhost:3000/](http://localhost:3000/)

### Configuration

The following parameters are configurable in the `lamports-otp/.env` file.

* `SESSION_SECRET` used to hash the session with HMAC
* `PASSWORD_USES` defines the index initially set for new accounts or changed passwords
* `PORT` is the port used by the server
* `HOST` is the host the server is running on
