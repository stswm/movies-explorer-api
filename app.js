const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const { errorHeandler } = require('./controllers/main');
const { ENV_PORT, DB_URL } = require('./utils/config');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes');

const app = express();

mongoose.connect(DB_URL, () => {
  console.log('Connection to DB successfully');
});

app.use(requestLogger);
app.use(errorLogger);
app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use('/', routes);

app.use(errors());
app.use(errorHeandler);

app.listen(ENV_PORT, () => {
  console.log(`App listening on port ${ENV_PORT}`);
});
