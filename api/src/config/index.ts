import "dotenv/config";

const config = {
	env: process.env.NODE_ENV || "dev",
	isProd: process.env.NODE_ENV === "production",
	port: process.env.PORT || 8000,
	dbUrl: process.env.DATABASE_URL,
	apiKey: process.env.API_KEY,
	passwordHashSalt: parseInt(process.env.PASSWORD_HASH_SALT || "10", 10),
	jwtSecret: process.env.JWT_SECRET,
	jwtExpiresIn: process.env.JWT_EXPIRES_IN,
	refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
	refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

export default config;