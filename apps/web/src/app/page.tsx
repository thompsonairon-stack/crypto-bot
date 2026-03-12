import { StatusCard } from "../components/status-card";

const cards = [
  {
    title: "Runtime",
    value: "Ready",
    description: "Core agent runtime primitives and event bus are scaffolded."
  },
  {
    title: "API",
    value: "Online",
    description: "Express routes are available for health and trading signals."
  },
  {
    title: "Adapters",
    value: "Mocked",
    description: "Exchange, LLM, and storage adapters are wired for extension."
  }
];

export default function HomePage() {
  return (
    <main className="container">
      <h1>EtherOS Control Plane</h1>
      <p>Monorepo scaffold is active. Start implementing strategy and execution logic.</p>
      <section className="grid">
        {cards.map((card) => (
          <StatusCard key={card.title} {...card} />
        ))}
      </section>
    </main>
  );
}
