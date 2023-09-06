import { Request, Response, Router } from "express";
import passport from "passport";

import UsersController from "../controllers/users.controller";
import { checkApiKey } from "../middlewares/auth.handler";
import validatorHandler from "../middlewares/validator.handler";

import { 
	createUserSchema,
	loginUserSchema,
	validateUserSchema
} from "../schemas/users.schema";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get(
	"/",
	usersController.get);

usersRouter.get(
	"/me",
	passport.authenticate("jwt", { session: false }),
	usersController.current);

usersRouter.get(
	"/new-url",
	checkApiKey,
	async (_req:Request, res:Response) => {
		res.status(200).json({
			message: "allowed",
			data: "new-url"
		});
	});

usersRouter.post(
	"/signup", 
	validatorHandler(createUserSchema, "body"),
	usersController.signup);

usersRouter.post(
	"/validate",
	validatorHandler(validateUserSchema, "body"),
	usersController.validate);

usersRouter.post(
	"/signin",
	validatorHandler(loginUserSchema, "body"),
	passport.authenticate("local", { session: false }),
	usersController.signin);

usersRouter.delete(
	"/delete",
	validatorHandler(validateUserSchema, "body"),
	usersController.delete);

export default usersRouter;