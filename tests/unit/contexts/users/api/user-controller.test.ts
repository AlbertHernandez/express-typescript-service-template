import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { vi } from "vitest";

import { ConsoleLogger } from "@/shared/logger/console-logger";
import { Logger } from "@/shared/logger/logger";

import { UserController } from "@/contexts/users/api/user-controller";

describe("UserController", () => {
  let controller: UserController;
  let logger: Logger;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as Response;
    logger = new ConsoleLogger();
    controller = new UserController({ logger });
  });

  describe("run", () => {
    it("should respond with status 200", () => {
      controller.run(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith({ users: "ok" });
    });
  });
});
