const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3099',
  'http://localhost:3019',
  'http://localhost:3005',
  'http://stswm.nomoredomains.xyz',
  'https://stswm.nomoredomains.xyz',
  'http://stswm.movie.nomoredomains.xyz',
  'https://stswm.movie.nomoredomains.xyz',
  'http://api.stswm.nomoreparties.sbs',
  'https://api.stswm.nomoreparties.sbs',
  'http://api.stswm.movie.nomoredomains.xyz',
  'https://api.stswm.movie.nomoredomains.xyz',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  next();
};

module.exports = cors;
