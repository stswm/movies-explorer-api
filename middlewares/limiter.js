const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  // standardHeaders: true,
  handler: (req, res) => res.status(429).json({
    error: 'Слишком много запросов, повторите позднее',
  }),
});

module.exports = limiter;
