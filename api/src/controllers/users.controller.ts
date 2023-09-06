import { NextFunction, Request, Response } from "express";

import UsersService from "../services/users.service";
import { SUCCESS_MESSAGES } from "../utils/messages";
import { signAccessToken, signRefreshToken } from "../utils/tokens";

import type { User } from "@prisma/client";
import UserTokensService from "../services/userTokens.service";

const {
	USER_CREATED,
	USER_EXISTS,
	USER_SIGNED,
	USER_DELETED,
	CURRENT_USER,
} = SUCCESS_MESSAGES;

const usersService = new UsersService();
const userTokensService = new UserTokensService();

class UsersController {
	async get (_req:Request, res:Response) {
		const result = await usersService.getAll();
		
		res
			.status(200)
			.json({
				message: "users",
				data: result
			});
	}

	async signup (req:Request, res:Response, next: NextFunction) {
		const { firstName, lastName, email, password } = req.body;

		try {
			const result = await usersService.create({
				firstName,
				lastName,
				email,
				password
			});
	
			res
				.status(201)
				.json({
					message: USER_CREATED,
					data: result
				});
		} catch (error) {
			next(error);
		}
	}
	
	async validate (req:Request, res:Response, next:NextFunction) {
		const { email } = req.body;

		try {
			const result = await usersService.validateEmail(email);
			
			res
				.status(200)
				.json({
					message: USER_EXISTS,
					data: result
				});    
		} catch (error) {
			next(error);
		}
	}

	async signin (req:Request, res:Response, next:NextFunction) {
		try {
			const { id, firstName, lastName, email } = req.user as User;
			
			const accessToken = await signAccessToken(id);
			const refreshToken = await signRefreshToken(email);
			
			await userTokensService.replaceToken(email, refreshToken);
			
			const data = { 
				firstName,
				lastName,
				email,
				accessToken,
				refreshToken
			};
			
			res
				.status(200)
				.json({
					message: USER_SIGNED,
					data
				});
		} catch (err) {
			next(err);
		}
	}

	async current (req:Request, res:Response, next:NextFunction) {
		try {
			const { id } = req.user as User;
			const data = await usersService.getById(id);
			
			res
				.status(200)
				.json({ 
					message: CURRENT_USER,
					data
				});
		} catch (err) {
			next(err);
		}
	}

	async delete (req:Request, res:Response, next:NextFunction) {
		try {
			const { email } = req.body;

			const result = await usersService.delete(email);

			res
				.status(410)
				.json({
					message: USER_DELETED,
					data: result
				});	
		} catch (err) {
			next(err);
		}
	}
}

export default UsersController;