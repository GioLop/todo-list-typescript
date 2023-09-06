import express, { Application } from "express";

import appRouter from "./routes";
import { 
	boomErrorHandler,
	errorHandler,
	logErrors
} from "./middlewares/error.handler";
import config from "./config";
import "./utils/auth";

const app: Application = express();
const { port } = config;

app.use(express.json());

app.get("/", async (req, res) => {
	res.json({
		message: "All ok here",
	});
});

appRouter(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
	console.log("Server is running on port", port);
});