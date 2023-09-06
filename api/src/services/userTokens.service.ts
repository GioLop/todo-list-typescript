import db from "../db";
// import bcrypt from "bcrypt";
// import * as jwt from "jsonwebtoken";

// import type { 
// 	UserRefreshToken
// } from "@prisma/client";

//import error from "../utils/error";
// import config from "../config";

// type UserRefreshToken = 
//	Omit<PrismaUserRefreshToken, "id" | "createdAt" | "updatedAt">;

const { userRefreshToken } = db;

class UserTokensService {
	async create(token:string, userEmail:string) {
		return await userRefreshToken.create({
			data: {
				value: token,
				userEmail
			}
		});
	}

	async getByUserEmail(userEmail:string) {
		return await userRefreshToken
			.findUnique({ 
				where: { userEmail: userEmail } 
			});
	}
	
	async delete(tokenId: number) {
		return await userRefreshToken
			.delete({ 
				where: { id:tokenId }
			});
	}

	async replaceToken(userEmail:string, token:string) {
		const userToken = await this.getByUserEmail(userEmail);
			
		if (userToken) {
			await this.delete(userToken.id);
		}

		return await this.create(token, userEmail);
	}
}

export default UserTokensService;