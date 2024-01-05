import express, { Express } from "express";
import http from "http";
import { AddressInfo } from "net";

import { config } from "./config";
import { healthRouter } from "./health/health-router";

export class Server {
  private readonly app: Express;
  private httpServer?: http.Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use("/health", healthRouter);
  }

  async start(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.app.listen(config.server.port, () => {
        const { port } = this.httpServer?.address() as AddressInfo;
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
