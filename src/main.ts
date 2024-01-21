import "@core/config/load-env-vars";

import { Server } from "./server";

new Server().start().catch(handleError);

function handleError(error: unknown) {
  console.error(error);
  process.exit(1);
}

process.on("uncaughtException", handleError);
