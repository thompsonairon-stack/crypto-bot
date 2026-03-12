import { MarketTick, TradingSignal } from "../types/domain";

export interface AgentContext {
  strategyId: string;
  riskProfile: "low" | "medium" | "high";
}

export interface TradingAgent {
  id: string;
  name: string;
  onTick(tick: MarketTick, context: AgentContext): Promise<TradingSignal | null>;
}

export interface AgentRegistry {
  register(agent: TradingAgent): void;
  get(agentId: string): TradingAgent | undefined;
  list(): TradingAgent[];
}

export class InMemoryAgentRegistry implements AgentRegistry {
  private agents = new Map<string, TradingAgent>();

  register(agent: TradingAgent): void {
    this.agents.set(agent.id, agent);
  }

  get(agentId: string): TradingAgent | undefined {
    return this.agents.get(agentId);
  }

  list(): TradingAgent[] {
    return Array.from(this.agents.values());
  }
}
