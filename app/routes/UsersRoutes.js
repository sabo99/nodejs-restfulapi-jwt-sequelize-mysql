const router = require('express').Router();
const { Validations, JWT } = require('../middlewares');
const Controllers = require('../controllers/UsersController');

router.get('/all', [JWT.verifyToken], Controllers.findAll);

router.get('/find', [JWT.verifyToken], Controllers.findById);

router.put(
    '/:id',
    [
        JWT.verifyToken,
        // Validations.checkEmailOrUsernameExists,
        Validations.updatedUserValidation,
    ],
    Controllers.updateUser,
);

router.patch(
    '/:id',
    [
        JWT.verifyToken,
        Validations.checkEmailOrUsernameExists,
        Validations.updatedUserValidation,
    ],
    Controllers.updateUser,
);

router.delete(
    '/:id',
    [JWT.verifyToken, Validations.deletedUserValidation],
    Controllers.deleteUser,
);

module.exports = router;
