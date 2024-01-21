import "@core/config/load-env-vars";

import { Server } from "./server";

new Server().start().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
}

process.on("uncaughtException", handleError);
