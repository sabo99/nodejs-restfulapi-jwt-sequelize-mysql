const db = require('../models');
const Users = db.Users;

const bcrypt = require('bcryptjs');
const { Validations } = require('../middlewares');

findAll = async (req, res) => {
    try {
        const users = await Users.findAll();

        if (users.length == 0)
            return res.status(404).send({ code: 404, message: 'Not Found' });

        users.map((user) => delete user.dataValues.password);
        res.status(200).send({ code: 200, message: 'Success', users: users });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: error,
        });
    }
};

findById = async (req, res) => {
    try {
        const user = await Users.findOne({ where: { id: req.query.id } });

        if (!user)
            return res.status(404).send({ code: 404, message: 'Not Found' });

        delete user.dataValues.password;
        res.status(200).send({ code: 200, message: 'Success', user: user });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: error,
        });
    }
};

updateUser = async (req, res) => {
    try {
        const updatedUser = await Users.update(
            {
                email: req.body.email,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
            },
            {
                where: { id: req.params.id },
            },
        );

        return updatedUser == 1
            ? res.status(200).send({ code: 200, message: 'User Updated!' })
            : res.status(400).send({ code: 404, message: 'Failed Updated!' });
    } catch (error) {
        if (error.name) {
            const { errors } = error;
            const messages = Validations.uniqueValue(errors);

            res.status(422).send({ code: 422, messages: messages });
        } else {
            res.status(500).send({
                code: 500,
                message: error,
            });
        }
    }
};

deleteUser = async (req, res) => {
    try {
        const deletedUser = await Users.destroy({
            where: { id: req.params.id },
        });

        return deletedUser == 1
            ? res.status(200).send({ code: 200, message: 'User Deleted!' })
            : res.status(400).send({ code: 404, message: 'Failed Updated!' });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: error,
        });
    }
};

module.exports = {
    findAll,
    findById,
    updateUser,
    deleteUser,
};
