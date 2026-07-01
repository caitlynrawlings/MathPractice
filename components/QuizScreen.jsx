import ChoiceButton from "@/components/ChoiceButton";
import { colorForType } from "@/lib/questionTypes";
import ChartsRenderer from "@/components/ChartsRenderer";

const renderPrompt = (prompt) => {
  // CASE 1: plain string
  if (typeof prompt === "string") {
    return <div>{prompt}</div>;
  }

  // CASE 2: block system (preferred)
  if (prompt.blocks) {
    return prompt.blocks.map((block, idx) => {
      switch (block.type) {
        case "text":
          return <div key={idx}>{block.value}</div>;

        case "svg":
          return (
            <div
              key={idx}
              dangerouslySetInnerHTML={{ __html: block.value }}
            />
          );

        case "chart":
          return (
            <div key={idx} className="question-chart">
              <ChartsRenderer spec={block.value} />
            </div>
          );

        default:
          return null;
      }
    });
  }

  // CASE 3: legacy object (backwards compatibility)
  return (
    <>
      {prompt.text && <div>{prompt.text}</div>}

      {prompt.svg && (
        <div dangerouslySetInnerHTML={{ __html: prompt.svg }} />
      )}

      {prompt?.chart && (
        <div className="question-chart">
        </div>
      )}
    </>
  );
};

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
          {renderPrompt(question.prompt)}
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
