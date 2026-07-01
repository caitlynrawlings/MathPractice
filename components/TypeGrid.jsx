import TypeCard from "@/components/TypeCard";
import { QUESTION_TYPES, colorForType } from "@/lib/questionTypes";

export default function TypeGrid({ onSelect }) {
  return (
    <>
      <div className="section-label">Practice one skill</div>
      <div className="grid">
        {QUESTION_TYPES.map((t) => (
          <TypeCard key={t.id} type={t} color={colorForType(t.id)} onClick={() => onSelect(t.id)} />
        ))}
      </div>
    </>
  );
}
