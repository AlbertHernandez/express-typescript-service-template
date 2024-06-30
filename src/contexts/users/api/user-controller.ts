import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Logger } from "@/shared/logger/logger";

export class UserController {
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  run(req: Request, res: Response) {
    this.logger.info("Received request to get user");
    res.status(StatusCodes.OK).send({ users: "ok" });
  }
}
