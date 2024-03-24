import { Request, Response } from "express";

export class UserController {
  run(req: Request, res: Response) {
    res.status(200).send({ users: "ok" });
  }
}
