import "./shared/infrastructure/load-env-vars";

import bodyParser from "body-parser";
import express from "express";

import { config } from "./shared/infrastructure/config";
import { userRouter } from "./users/infrastructure/rest-api/user-router";

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/users", userRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
