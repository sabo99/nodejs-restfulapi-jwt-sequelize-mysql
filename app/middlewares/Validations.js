const Joi = require('joi');
const db = require('../models');
const Users = db.Users;

createdUserValidation = (req, res, next) => {
	const { error } = Joi.object({
		email: Joi.string().email().required(),
		username: Joi.string().min(4).required(),
		password: Joi.string().min(6).required(),
	}).validate(req.body);

	if (error)
		return res
			.status(422)
			.send({ code: 422, message: error.details[0].message });

	next();
};

checkEmailOrUsernameExists = async (req, res, next) => {
	const emailExist = await Users.findOne({
		where: { email: req.body.email },
	});
	if (emailExist != null)
		return res
			.status(422)
			.send({ code: 422, message: 'Email is already exist!' });

	const usernameExist = await Users.findOne({
		where: { username: req.body.username },
	});
	if (usernameExist != null)
		return res
			.status(422)
			.send({ code: 422, message: 'Username is already exist!' });

	next();
};

signInValidation = (req, res, next) => {
	const { error, value } = Joi.object({
		username: Joi.string().min(4).required(),
		password: Joi.string().min(6).required(),
	}).validate(req.body);

	if (error)
		return res
			.status(422)
			.send({ code: 422, message: error.details[0].message });

	next();
};

updatedUserValidation = async (req, res, next) => {
	await Users.findOne({ where: { id: req.params.id } })
		.then((user) => {
			if (!user)
				return res
					.status(404)
					.send({ code: 404, message: 'User id Not Found' });

			if (!Object.keys(req.body).length)
				return res
					.status(422)
					.send({ code: 422, message: 'Undefine Request Body!' });

			if (user) {
				req.body.email =
					typeof req.body.email != 'undefined'
						? req.body.email
						: user.dataValues.email;

				req.body.username =
					typeof req.body.username != 'undefined'
						? req.body.username
						: user.dataValues.username;

				req.body.password =
					typeof req.body.password != 'undefined'
						? req.body.password
						: user.dataValues.password;

				const { error, value } = Joi.object({
					email: Joi.string().email().required(),
					username: Joi.string().min(4).required(),
					password: Joi.string().min(6).required(),
				}).validate(req.body);

				if (error)
					return res
						.status(422)
						.send({ code: 422, message: error.details[0].message });

				next();
			}
		})
		.catch((err) => {
			res.status(500).send({ code: 500, message: err });
		});
};

deletedUserValidation = async (req, res, next) => {
	await Users.findOne({ where: { id: req.params.id } })
		.then((user) => {
			if (!user)
				return res
					.status(404)
					.send({ code: 404, message: 'User id Not Found' });

			next();
		})
		.catch((err) => {
			res.status(500).send({ code: 500, message: err });
		});
};

uniqueValue = (errors) => {
	const errorMessage = {};
	let message, field;
	errors.forEach((e) => {
		field = e.path[0].toUpperCase() + e.path.substring(1);
		switch (e.validatorKey) {
			case 'is_null':
				message = `${field} cannot be null`;
				break;
			case 'not_unique':
				message = `${field} is already exist. ${field} must be unique`;
				break;
			default:
				break;
		}
		errorMessage[e.path] = message;
	});

	return errorMessage;
};

module.exports = {
	checkEmailOrUsernameExists,
	createdUserValidation,
	signInValidation,
	updatedUserValidation,
	deletedUserValidation,
	uniqueValue,
};
