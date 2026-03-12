export interface StateStore<TState> {
  get(): Promise<TState | null>;
  set(next: TState): Promise<void>;
}

export class InMemoryStateStore<TState> implements StateStore<TState> {
  private state: TState | null = null;

  async get(): Promise<TState | null> {
    return this.state;
  }

  async set(next: TState): Promise<void> {
    this.state = next;
  }
}
