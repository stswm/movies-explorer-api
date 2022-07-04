const Movie = require('../models/movies');
const { ServerError } = require('../Errors/ServerError');
const { NotFoundErr } = require('../Errors/NotFoundErr');
const { BadReqestError } = require('../Errors/BadReqestError');
const { ForbiddenError } = require('../Errors/ForbiddenError');
const { errMsg } = require('../utils/constants');

const getMovies = (_, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(() => {
      next(new ServerError(errMsg.serverErr));
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        return next(new BadReqestError(`Field(s) ${fields} are not correct`));
      }
      return next(new ServerError(errMsg.serverErr));
    });
};

const deleteMovie = (req, res, next) => {
  const id = req.params._id;

  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundErr(errMsg.movieNotFoundErr));
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(errMsg.forbErrMsg);
      }
      return movie.remove().then(() => res.status(200).send(movie));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadReqestError(errMsg.movieIdNotCorrErr));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
