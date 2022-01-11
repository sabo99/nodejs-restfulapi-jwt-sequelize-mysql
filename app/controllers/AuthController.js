const db = require('../models');
const Users = db.Users;

const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const { Validations } = require('../middlewares');

signUp = async (req, res) => {
	try {
		const createdUser = await Users.create({
			email: req.body.email,
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 10),
		});

		delete createdUser.dataValues.password;

		res.status(201).send({
			code: 201,
			message: 'User created',
			user: createdUser,
		});
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

		/** Check Global Errors */
		// res.send(error);
	}
};

signIn = async (req, res) => {
	try {
		await Users.findOne({
			where: { username: req.body.username },
		})
			.then((user) => {
				if (user == null)
					return res.status(404).send({
						code: 404,
						message: 'Username is not registered!',
					});

				const passwordIsValid = bcrypt.compareSync(
					req.body.password,
					user.dataValues.password
				);

				if (!passwordIsValid)
					return res
						.status(401)
						.send({ code: 401, message: 'Invalid Password!' });

				const token = JWT.sign(
					{ id: user.dataValues.id },
					process.env.TOKEN_JWT,
					{
						expiresIn: '1d',
					}
				);

				res.header('x-auth-token', token)
					.status(200)
					.send({
						code: 200,
						message: 'Logged in!',
						user: {
							username: user.username,
							email: user.email,
							token: token,
							expiredIn: '1 day',
						},
					});
			})
			.catch((err) => {
				res.status(500).send({
					code: 500,
					message: err,
				});
			});
	} catch (err) {
		res.status(500).send({
			code: 500,
			message: err,
		});
	}
};

module.exports = {
	signUp,
	signIn,
};
