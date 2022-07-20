const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../utils/config');
const User = require('../models/users');

const { ServerError } = require('../Errors/ServerError');
const { NotFoundErr } = require('../Errors/NotFoundErr');
const { BadReqestError } = require('../Errors/BadReqestError');
const { AuthError } = require('../Errors/AuthError');
const { ConflictingError } = require('../Errors/ConflictingError');
const { errMsg } = require('../utils/constants');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundErr(errMsg.userNotFoundErr));
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundErr(errMsg.notFoundErrDBMsg));
      } else {
        next(new ServerError(errMsg.serverErr));
      }
    });
};

const updateUserProf = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user.user._id;
  User.findByIdAndUpdate(
    id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((userInfo) => {
      if (!userInfo) {
        return next(new NotFoundErr(errMsg.userNotFoundErr));
      }
      return res.status(200).send(userInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        return next(new BadReqestError(`Field(s) ${fields} are not correct`));
      }
      return next(new ConflictingError(errMsg.emailBusyErr));
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        next(new BadReqestError(`Field(s) ${fields} are not correct`));
      } if (err.code === 11000) {
        return next(new ConflictingError(errMsg.emailBusyErr));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new AuthError(errMsg.authorizationErrMsg));
    });
};

module.exports = {
  getUser,
  updateUserProf,
  createUser,
  login,
};
