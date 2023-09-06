const ERROR_MESSAGES = {
	BAD_REQUEST: "somethig went wrong with the data",
	USER_NOT_FOUND: "doesn't exist in our system",
	USER_EXISTS: "is already a user in our system",
	UNAUTHORIZED: "You are not allowed to see this content",
	WRONG_PASSWORD: "The password doesn't match"
};

const SUCCESS_MESSAGES = {
	USER_CREATED: "User created",
	USER_EXISTS: "User exists in our system",
	USER_SIGNED: "User signed succesfully",
	USER_DELETED: "User deleted",
	CURRENT_USER: "Current user",
};

export {
	ERROR_MESSAGES,
	SUCCESS_MESSAGES
};