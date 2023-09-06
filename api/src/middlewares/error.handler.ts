import { boomify, isBoom } from "@hapi/boom";
import type { NextFunction, Request, Response } from "express";

const logErrors = (
	err:Error, _req:Request, _res:Response, next:NextFunction) => {
	console.log("logs error");
	console.log(err);
	next(err);
};

const errorHandler = (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	err:Error, _req:Request, res:Response, next:NextFunction) => {
	console.log("error handler");
	res.status(500).json({
		message: err.message,
		stack: err.stack
	});
};

const boomErrorHandler = (
	err:Error, _req:Request, res:Response, next:NextFunction) => {
	const _isBoom = isBoom(err);
	
	if (!_isBoom) next(err);
	
	const { output: { statusCode, payload } } = boomify(err);
	res.status(statusCode).json(payload);
};

export {
	logErrors,
	errorHandler,
	boomErrorHandler
};