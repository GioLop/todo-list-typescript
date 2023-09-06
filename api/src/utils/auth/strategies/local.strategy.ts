import { Strategy }from "passport-local";

import UsersService from "../../../services/users.service";

const usersService = new UsersService();

const LocalStrategy = new Strategy(
	{ usernameField: "email" },
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async (email: string, password:string, done:(...args: any) => void) => {
		try {
			const user = await usersService.comparePassword(email, password);
			done(null, user);
		} catch (error) {
			return done(error, false);
		}
	});

export default LocalStrategy;