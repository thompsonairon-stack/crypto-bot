export type EventHandler<TPayload> = (payload: TPayload) => Promise<void> | void;

export class EventBus<TEvents extends Record<string, unknown>> {
  private handlers = new Map<keyof TEvents, Set<EventHandler<any>>>();

  subscribe<TKey extends keyof TEvents>(
    event: TKey,
    handler: EventHandler<TEvents[TKey]>
  ): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }

    this.handlers.get(event)?.add(handler as EventHandler<any>);

    return () => {
      this.handlers.get(event)?.delete(handler as EventHandler<any>);
    };
  }

  async publish<TKey extends keyof TEvents>(event: TKey, payload: TEvents[TKey]): Promise<void> {
    const listeners = this.handlers.get(event);
    if (!listeners?.size) return;

    await Promise.all(Array.from(listeners).map((listener) => listener(payload)));
  }
}
