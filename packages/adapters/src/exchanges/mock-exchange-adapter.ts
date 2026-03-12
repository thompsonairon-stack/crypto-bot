import { MarketTick } from "@etheros/core/src/types/domain";
import { ExchangeAdapter } from "./exchange-adapter";

export class MockExchangeAdapter implements ExchangeAdapter {
  name = "mock";
  private timer: NodeJS.Timeout | null = null;

  async connect(): Promise<void> {
    return;
  }

  async disconnect(): Promise<void> {
    if (this.timer) clearInterval(this.timer);
  }

  async subscribe(symbols: string[], onTick: (tick: MarketTick) => void): Promise<void> {
    this.timer = setInterval(() => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)] ?? "ETH-USD";
      onTick({
        symbol,
        price: 3000 + Math.random() * 500,
        timestamp: new Date().toISOString()
      });
    }, 1000);
  }
}
