const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})