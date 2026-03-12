import { MockExchangeAdapter } from "@etheros/adapters/src/exchanges/mock-exchange-adapter";
import { EventBus } from "@etheros/core/src/events/event-bus";
import { MarketTick } from "@etheros/core/src/types/domain";

type RuntimeEvents = {
  "market.tick": MarketTick;
};

async function bootstrap(): Promise<void> {
  const events = new EventBus<RuntimeEvents>();
  const exchange = new MockExchangeAdapter();

  events.subscribe("market.tick", (tick) => {
    console.log(`[runtime] tick ${tick.symbol} ${tick.price.toFixed(2)} @ ${tick.timestamp}`);
  });

  await exchange.connect();
  await exchange.subscribe(["ETH-USD", "BTC-USD"], async (tick) => {
    await events.publish("market.tick", tick);
  });
}

bootstrap().catch((error) => {
  console.error("Runtime bootstrap failed", error);
  process.exitCode = 1;
});
