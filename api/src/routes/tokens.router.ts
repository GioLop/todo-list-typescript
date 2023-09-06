import { Request, Response, Router } from "express";
import db from "../db";

const tokensRouter = Router();

tokensRouter.post("/refresh", async (req:Request, res:Response) => {
	const result = await db.task.findMany();
	
	res.json({
		message: "tasks",
		data: result
	});
});

tokensRouter.delete("/", async (req:Request, res:Response) => {
	const result = await db.task.findMany();
	
	res.json({
		message: "tasks",
		data: result
	});
});


export default tokensRouter;