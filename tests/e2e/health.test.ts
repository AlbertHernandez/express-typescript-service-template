import request from "supertest";

import { Server } from "../../src/server";

describe("Health", () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it("/GET health", () => {
    return request(server.getHttpServer()!).get("/health").expect(200);
  });
});
