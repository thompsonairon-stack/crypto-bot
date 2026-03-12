import { Request, Response } from "express";
import { TradingSignal } from "@etheros/core/src/types/domain";

const mockSignals: TradingSignal[] = [
  {
    symbol: "ETH-USD",
    action: "buy",
    confidence: 0.72,
    rationale: "Momentum breakout above short-term resistance.",
    createdAt: new Date().toISOString()
  }
];

export function listSignals(_req: Request, res: Response): void {
  res.json({ signals: mockSignals });
}
