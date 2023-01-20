import { FakeEmailSender } from "./email-sender/fake-email-sender";
import { ConsoleLogger } from "./logger/console-logger";

export const logger = new ConsoleLogger();
export const emailSender = new FakeEmailSender(logger);
