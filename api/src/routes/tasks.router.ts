import { Request, Response, Router } from "express";
import db from "../db";

const tasksRouter = Router();

tasksRouter.get("/", async (req:Request, res:Response) => {
	const result = await db.task.findMany();
	res.json({
		message: "tasks",
		data: result
	});
});

tasksRouter.post("/", async (req:Request, res:Response) => {
	const { description, userId } = req.body;

	const result = await db.task.create({
		data: {
			description,
			userId
		}
	});

	res.json({
		message: "task created",
		data: result
	});
});

export default tasksRouter;