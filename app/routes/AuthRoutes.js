const router = require('express').Router();
const { Validations } = require('../middlewares');
const Controllers = require('../controllers/AuthController');

router.post(
    '/signup',
    [Validations.createdUserValidation, Validations.checkEmailOrUsernameExists],
    Controllers.signUp,
);

router.post('/signin', [Validations.signInValidation], Controllers.signIn);

module.exports = router;
