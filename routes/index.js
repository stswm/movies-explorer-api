const router = require('express').Router();

const { userRouter } = require('./users');
const { movieRouter } = require('./movies');
const {
  validateNewUser,
  validateLogin,
} = require('../middlewares/validator');
const {
  createUser,
  login,
} = require('../controllers/users');
const { badUrl } = require('../controllers/main');
const auth = require('../middlewares/auth');

router.post('/signup', validateNewUser, createUser);
router.post('/signin', validateLogin, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', badUrl);

module.exports = router;
