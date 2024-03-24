import http from "node:http";
import { AddressInfo } from "node:net";

import express, { Express } from "express";

import { config } from "@shared/config/config";

import { healthRouter } from "./health/api/health-router";
import { userRouter } from "./users/api/user-router";

export class Server {
  private readonly app: Express;
  private httpServer?: http.Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use("/health", healthRouter);
    this.app.use("/users", userRouter);
  }

  async start(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.app.listen(config.server.port, () => {
        const { port } = this.httpServer?.address() as AddressInfo;
        // eslint-disable-next-line no-console
        console.log(`App is ready and listening on port ${port} 🚀`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }

  getHttpServer(): http.Server | undefined {
    return this.httpServer;
  }
}
