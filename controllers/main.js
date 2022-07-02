const { NotFoundErr } = require('../Errors/NotFoundErr');
const { errMsg } = require('../utils/constants');

const badUrl = (_req, _res, next) => {
  next(new NotFoundErr(errMsg.pageNotFoundErr));
};
const errorHeandler = (err, _, res, next) => {
  res.status(err.code).send({
    message: err.code === 500
      ? errMsg.serverErr
      : err.message,
  });
  next();
};

module.exports = {
  badUrl,
  errorHeandler,
};
