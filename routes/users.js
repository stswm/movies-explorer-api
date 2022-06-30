const router = require('express').Router();
const {
  getUser,
  updateUserProf,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', updateUserProf);

module.exports.userRouter = router;
