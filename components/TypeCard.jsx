export default function TypeCard({ type, color, onClick }) {
  return (
    <button className="type-card" style={{ "--card-color": color }} onClick={onClick}>
      <div className="type-icon">{type.icon}</div>
      <div className="type-name">{type.name}</div>
      <div className="type-cta">Practice →</div>
    </button>
  );
}
