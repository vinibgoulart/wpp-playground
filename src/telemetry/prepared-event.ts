import { sendEvent } from './metrics';
import type { Event } from './types';

export class PreparedEvent {
  private event: Event;
  private metadata: Record<string, unknown> = {};

  constructor(event: Event) {
    this.event = { ...event, timestamp: new Date().getTime().toString() };
  }

  flush() {
    // @ts-ignore
    return sendEvent({
      ...this.event,
      payload: {
        ...this.event.payload,
        // @ts-ignore
        metadata: { ...this.event.payload.metadata, ...this.metadata },
      },
    });
  }

  patchMetadata(metadata: Record<string, unknown>) {
    this.metadata = Object.assign(this.metadata, metadata);
  }
}
