/* eslint-disable no-console */
import { Logger } from "./logger";

export class ConsoleLogger implements Logger {
  info(message: string, attributes: unknown = {}) {
    const msg = {
      message,
      attributes,
    };

    console.log(msg);
  }
}
