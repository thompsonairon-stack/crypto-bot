import { MarketTick } from "@etheros/core/src/types/domain";

export interface ExchangeAdapter {
  name: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  subscribe(symbols: string[], onTick: (tick: MarketTick) => void): Promise<void>;
}
