export default function MixedCard({ onClick }) {
  return (
    <button className="mixed-card" onClick={onClick}>
      <div>
        <div className="mixed-card-title">🎲 Mixed Practice</div>
        <div className="mixed-card-sub">
          Cycles through all 12 skills in random order — you won&apos;t know what&apos;s next.
        </div>
      </div>
      <div className="mixed-arrow">→</div>
    </button>
  );
}
