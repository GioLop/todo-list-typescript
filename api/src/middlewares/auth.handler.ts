import { NextFunction, Request, Response } from "express";
import error from "../utils/error";
import config from "../config";

const apiKey = config.apiKey; 

const checkApiKey = (req:Request, res:Response, next:NextFunction) => {
	const { apikey } = req.headers;
	
	if (apikey !== apiKey) next(error.unauthorizedUser());

	next();
};

export { checkApiKey };