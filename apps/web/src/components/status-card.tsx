interface StatusCardProps {
  title: string;
  value: string;
  description: string;
}

export function StatusCard({ title, value, description }: StatusCardProps) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p className="value">{value}</p>
      <p>{description}</p>
    </article>
  );
}
