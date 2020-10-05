const express = require('express');
const session = require('express-session');
const cors = require('cors');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();
// TODO put secret in config
app.use(session({
    secret: 'otp-secret'
}));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.sendStatus(404);
  });

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})