export type Kind = 'on_message_command';
export type BaseEvent = {
  kind: Kind;
  payload: Record<string, unknown>;
  chatId: string;
  timestamp?: string;
};

type CommandEvent = {
  command: string;
  metadata: Record<string, unknown>;
};

export type Event =
  | BaseEvent
  | { kind: 'on_message_command'; payload: CommandEvent };
