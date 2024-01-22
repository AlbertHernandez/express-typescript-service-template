import * as nock from "nock";
import request from "supertest";

import { Server } from "@src/server";

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

  it("/GET health", async () => {
    const response = await request(server.getHttpServer()!).get("/health");
    expect(response.status).toBe(200);
  });
});
