import { Request, Response } from "express";

export class HealthController {
  run(req: Request, res: Response) {
    res.status(200).send();
  }
}
