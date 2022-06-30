const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const {
  createUser,
  login,
} = require('./controllers/users');
const {
  validateNewUser,
  validateLogin,
} = require('./middlewares/validator');
const { errorHeandler } = require('./controllers/main');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { userRouter } = require('./routes/users');
const { movieRouter } = require('./routes/movies');

const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviedb');

app.use(express.json());
app.use(requestLogger);

app.post('/signup', validateNewUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);
app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHeandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
