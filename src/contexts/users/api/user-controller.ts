import { Request, Response } from "express";

import { Logger } from "@shared/logger/logger";

export class UserController {
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  run(req: Request, res: Response) {
    this.logger.info("Received request to get user");
    res.status(200).send({ users: "ok" });
  }
}
