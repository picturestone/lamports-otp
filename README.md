# Lamports-OTP

This server is made to work with the lamports-otp client found in the [lamports-otp-client repository](https://github.com/picturestone/lamports-otp-client).

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
