import ChoiceButton from "@/components/ChoiceButton";
import { colorForType } from "@/lib/questionTypes";

export default function QuizScreen({
  question,
  activeType,
  mode,
  score,
  streak,
  selected,
  answered,
  onChoose,
  onNext,
  onBack,
}) {
  if (!question || !activeType) return null;

  return (
    <>
      <div className="quiz-top">
        <button className="back-btn" onClick={onBack}>
          ← Back to skills
        </button>
        <div className="stat-pills">
          <div className="pill">
            Score {score.correct}/{score.total}
          </div>
          <div className="pill">🔥 Streak {streak}</div>
        </div>
      </div>

      <div className="type-banner">
        <span className="dot" style={{ "--card-color": colorForType(activeType.id) }}></span>
        {mode === "mixed" ? "Mixed Practice · " : ""}
        {activeType.icon} {activeType.name}
      </div>

      <div className="question-card">
        <div className="question-text">
          {typeof question.prompt === "string" ? (
            question.prompt
          ) : (
            <>
              <div>{question.prompt.text}</div>

              {question.prompt.svg && (
                <div
                  className="question-svg"
                  dangerouslySetInnerHTML={{ __html: question.prompt.svg }}
                />
              )}
            </>
          )}
        </div>
        <div className="choices">
          {question.choices.map((c, idx) => (
            <ChoiceButton
              key={idx}
              choice={c}
              index={idx}
              answered={answered}
              selected={selected}
              onClick={() => onChoose(idx)}
            />
          ))}
        </div>

        {answered && (
          <div className="feedback-row">
            <div className={`feedback-msg ${question.choices[selected].correct ? "good" : "bad"}`}>
              {question.choices[selected].correct
                ? "✅ Nice work — that's correct!"
                : "❌ Not quite — check the highlighted answer."}
            </div>
            <button className="next-btn" onClick={onNext}>
              Next question →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
