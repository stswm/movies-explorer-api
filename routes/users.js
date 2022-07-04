const router = require('express').Router();
const {
  getUser,
  updateUserProf,
} = require('../controllers/users');
const {
  validateUpdateUserProf,
  validateUserId,
} = require('../middlewares/validator');

router.get('/me', validateUserId, getUser);
router.patch('/me', validateUpdateUserProf, updateUserProf);

module.exports.userRouter = router;
