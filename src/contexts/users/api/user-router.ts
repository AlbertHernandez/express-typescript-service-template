import express from "express";

import { ConsoleLogger } from "@/shared/logger/console-logger";

import { UserController } from "./user-controller";

const userRouter = express.Router();

const logger = new ConsoleLogger();
const userController = new UserController({ logger });

userRouter.get("/", userController.run.bind(userController));

export { userRouter };
