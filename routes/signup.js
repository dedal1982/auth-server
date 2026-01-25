const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { validateCreateUser } = require('../middlewares/requestValidation');

router.post('/signup', validateCreateUser, createUser);

module.exports = router;
