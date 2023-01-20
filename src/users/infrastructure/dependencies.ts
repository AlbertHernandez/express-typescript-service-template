import { emailSender, logger } from "../../shared/infrastructure/dependencies";
import { WelcomeMessageSender } from "../application/welcome-message-sender";
import { UserController } from "./rest-api/user-controller";
import { InMemoryUserRepository } from "./user-repository/in-memory-user-repository";

const userRepository = new InMemoryUserRepository();
const welcomeEmailSender = new WelcomeMessageSender(
  userRepository,
  emailSender,
  logger
);

export const userController = new UserController(welcomeEmailSender);
