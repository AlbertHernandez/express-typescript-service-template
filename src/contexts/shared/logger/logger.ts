// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Attributes = any;

export interface Logger {
  info: (message: string, attributes?: Attributes) => void;
}
