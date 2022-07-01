const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { errorHeandler } = require('./controllers/main');

const { requestLogger, errorLogger } = require('./middlewares/logger');


const routes = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviedb');

app.use(express.json());
app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHeandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
