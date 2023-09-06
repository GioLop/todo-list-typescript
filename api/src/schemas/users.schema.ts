import Joi from "joi";

const email = Joi.string().email();
const firstName = Joi.string().min(5).max(255);
const lastName = Joi.string().min(5).max(255);
const password = Joi.string().alphanum().min(3).max(30);

const createUserSchema = Joi.object({
	email: email.required(),
	firstName: firstName.required(),
	lastName,
	password: password.required()
});

const updateUserSchema = Joi.object({
	email,
	firstName,
	lastName,
	password
});

const loginUserSchema = Joi.object({
	email: email.required(),
	password: password.required()
});

const validateUserSchema = Joi.object({
	email: email.required()
});

export {
	createUserSchema,
	updateUserSchema,
	loginUserSchema,
	validateUserSchema
};