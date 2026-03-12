export type AgentId = string;

export interface MarketTick {
  symbol: string;
  price: number;
  timestamp: string;
}

export interface TradingSignal {
  symbol: string;
  action: "buy" | "sell" | "hold";
  confidence: number;
  rationale: string;
  createdAt: string;
}
