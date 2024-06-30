import { StatusCodes } from "http-status-codes";
import * as nock from "nock";
import request from "supertest";

import { Server } from "@/app/server";

describe("Health", () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
    nock.disableNetConnect();
    nock.enableNetConnect("127.0.0.1");
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(async () => {
    await server.stop();
    nock.enableNetConnect();
  });

  it("/GET api/health", async () => {
    const response = await request(server.getHttpServer()!).get("/api/health");
    expect(response.status).toBe(StatusCodes.OK);
  });
});
