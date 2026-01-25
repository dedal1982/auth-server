const router = require('express').Router();

const { login } = require('../controllers/users');
const { validateLogin } = require('../middlewares/requestValidation');

router.post('/signin', validateLogin, login);

module.exports = router;
