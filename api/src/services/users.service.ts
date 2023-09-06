import db from "../db";
import bcrypt from "bcrypt";

import type { User as PrismaUser } from "@prisma/client";

import error from "../utils/error";
import config from "../config";

const { 
	passwordHashSalt,
} = config;

const { user } = db;

type User = Omit<PrismaUser, "id">;

class UsersService {
	async create(userData: User) {
		const { email, password } = userData;
		
		try {
			const hashPass =  
				await bcrypt.hash(password, passwordHashSalt);
			const {
				firstName, 
				lastName,
				id 
			} = await user.create({ 
				data: { ...userData, password:hashPass }});

			return  {
				firstName, 
				lastName,
				email,
				id 
			};	
		} catch (err) {
			throw error.userExists(email);
		}
		
	}

	async getAll() {
		return await user.findMany();
	}

	async getByEmail(email:string) {
		const result = await user.findUnique({ where: { email: email } });
		
		if (result === null) {
			throw error.userNotFound(email);
		}
		
		return result;
	}

	async getById(id:number) {
		const result = await user.findFirst({ where: { id: id } });
		
		if (result === null) {
			throw error.userNotFound(`${id}`);
		}
		
		const { firstName, lastName, email } = result;

		return { firstName, lastName, email };
	}

	async validateEmail(_email:string) {
		const { email } = await this.getByEmail(_email);
		
		return {
			email
		};
	}

	async comparePassword(email:string, password: string) {
		const result = await this.getByEmail(email);
		const isMatch = await bcrypt.compare(password, result.password);
		
		if (!isMatch) throw error.wrongPassword();

		return result;
	}

	async delete(email:string) {
		return await user.delete({ where: { email: email } });
	}

	async update(email:string, changes: User) {
		return await user.update({ 
			where: { email: email },
			data: changes 
		});
	}
}

export default UsersService;