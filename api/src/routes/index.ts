import { Application, Router } from "express";
import usersRouter from "./users.router";
import tasksRouter from "./tasks.router";
import tokensRouter from "./tokens.router";

const routerApi = Router();

const appRouter = (app:Application) => {
	app.use("/api/v1", routerApi);

	routerApi.use("/users", usersRouter);
	routerApi.use("/tasks", tasksRouter);
	routerApi.use("/tokens", tokensRouter);
};

export default appRouter;