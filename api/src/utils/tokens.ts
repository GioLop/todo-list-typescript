import * as jwt from "jsonwebtoken";
import config from "../config";

const {
	jwtSecret,
	jwtExpiresIn,
	refreshTokenSecret,
	refreshTokenExpiresIn
} = config;

const signRefreshToken = async (userEmail :string) => {
	const payload = {
		sub: userEmail
	};
	
	const token = 
		jwt.sign(
			payload,
			`${refreshTokenSecret}`,
			{ expiresIn: refreshTokenExpiresIn }
		);
	
	return token;
};

const signAccessToken = async (userId:number) => {
	const payload = {
		sub: userId
	};
	
	const token = jwt.sign(
		payload,
		`${jwtSecret}`,
		{ expiresIn: jwtExpiresIn });
	
	return token;
};

export {
	signRefreshToken,
	signAccessToken
};