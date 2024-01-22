import { Request, Response } from "express";

import { UserController } from "@contexts/users/api/user-controller";

describe("UserController", () => {
  let controller: UserController;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    controller = new UserController();
  });

  describe("run", () => {
    it("should respond with status 200", () => {
      controller.run(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ users: "ok" });
    });
  });
});
