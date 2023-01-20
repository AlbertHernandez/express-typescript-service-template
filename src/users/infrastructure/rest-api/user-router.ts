import express from "express";

import { userController } from "../dependencies";

const userRouter = express.Router();

userRouter.post(
  "/:id/welcome",
  userController.sendWelcomeMessage.bind(userController)
);

export { userRouter };
