const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const { Schema } = mongoose;

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => isUrl(link),
      message: 'inValid link',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => isUrl(link),
      message: 'inValid link',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => isUrl(link),
      message: 'inValid link',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId:
    {
      type: String,
      required: true,
    },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
