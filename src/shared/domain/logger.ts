interface MessageWithContext {
  message: string;
  context: Record<string, unknown>;
}

type SimpleMessage = string;

export type Message = SimpleMessage | MessageWithContext;

export interface Logger {
  info(message: Message): void;
  error(message: Message): void;
}
