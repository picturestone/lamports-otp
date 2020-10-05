const express = require('express');
const session = require('express-session');
var cookieParser = require('cookie-parser');
let config = require('./models/configuration');
config = new config();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();
app.use(cookieParser());
app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        expires: false,
        httpOnly: false
    }
}));
app.use(express.json());
// Cors settings.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.sendStatus(404);
});

const port = config.port;
const host = config.host;
app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`);
})