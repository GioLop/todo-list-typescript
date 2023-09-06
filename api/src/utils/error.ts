import Boom from "@hapi/boom";
import { ERROR_MESSAGES } from "./messages";

const {
	USER_NOT_FOUND,
	USER_EXISTS,
	UNAUTHORIZED,
	WRONG_PASSWORD
} = ERROR_MESSAGES;

class CustomError {
	userNotFound = (userEmail: string) => 
		Boom.notFound(`${userEmail} ${USER_NOT_FOUND}`);

	badRequest = (error?:Error) => 
		Boom.badRequest(error);
	
	userExists = (email?:string) => 
		Boom.badRequest(`${email} ${USER_EXISTS}`);
	
	couldNotCreate = (error?:Error) => 
		Boom.badRequest(error);
	
	unauthorizedUser = () => 
		Boom.unauthorized(`${UNAUTHORIZED}`);
	
	wrongPassword = () => 
		Boom.unauthorized(`${WRONG_PASSWORD}`);
}

const error = new CustomError();

export default error;
