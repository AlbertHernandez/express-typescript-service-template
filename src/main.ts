import "@core/log-and-exit-uncaught-exceptions";
import "@core/config/load-env-vars";

import { Server } from "./server";

new Server().start();
