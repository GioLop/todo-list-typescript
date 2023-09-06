import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { default as _error } from "../utils/error";

type requestProps = "body" | "params" | "headers" | "query"

const validatorHandler = (
	schema: Joi.ObjectSchema, 
	property: requestProps
) => 
	(req:Request, res:Response, next:NextFunction) => {
		const data = req[property];
		const { error } = schema.validate(data, { abortEarly: false });

		if (!error) {
			next();
			return;
		}

		next(_error.badRequest(error));
	};

export default validatorHandler;