import { EmailSender } from "../../shared/domain/email-sender";
import { Logger } from "../../shared/domain/logger";
import { UserRepository } from "../domain/user-repository";

export class WelcomeMessageSender {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailSender: EmailSender,
    private readonly logger: Logger
  ) {}

  async sendToUser(userId: string): Promise<void> {
    this.logger.info(
      `[WelcomeMessageSender] - Sending welcome email to user: ${userId}`
    );

    const user = await this.userRepository.getById(userId);

    if (!user) {
      const error = new Error(`User not found: ${userId}`);
      this.logger.error(error.message);
      throw error;
    }

    const message = "Welcome dev!";
    await this.emailSender.sendMessage(user.email, message);

    this.logger.info(
      "[WelcomeMessageSender] - Successfully sent the welcome message to the user"
    );
  }
}
