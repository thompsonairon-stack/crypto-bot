export interface LlmAdapter {
  provider: string;
  generate(prompt: string): Promise<string>;
}

export class MockLlmAdapter implements LlmAdapter {
  provider = "mock";

  async generate(prompt: string): Promise<string> {
    return `Mock response for prompt: ${prompt.slice(0, 120)}`;
  }
}
