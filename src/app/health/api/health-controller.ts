import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class HealthController {
  run(req: Request, res: Response) {
    res.status(StatusCodes.OK).send();
  }
}
