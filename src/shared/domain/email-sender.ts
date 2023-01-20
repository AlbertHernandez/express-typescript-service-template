export interface EmailSender {
  sendMessage(email: string, text: string): Promise<void>;
}
