"use client";

import { useCallback, useState } from "react";
import Header from "@/components/Header";
import MixedCard from "@/components/MixedCard";
import TypeGrid from "@/components/TypeGrid";
import QuizScreen from "@/components/QuizScreen";
import { getType, pickRandomType } from "@/lib/questionTypes";

export default function Page() {
  const [screen, setScreen] = useState("home"); // 'home' | 'quiz'
  const [mode, setMode] = useState(null); // 'single' | 'mixed'
  const [activeTypeId, setActiveTypeId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [lastMixedId, setLastMixedId] = useState(null);

  const buildQuestion = useCallback(
    (typeId, mixed) => {
      let type = getType(typeId);
      if (mixed) {
        type = pickRandomType(lastMixedId);
        setLastMixedId(type.id);
      }
      setActiveTypeId(type.id);
      setQuestion(type.generate());
      setSelected(null);
      setAnswered(false);
    },
    [lastMixedId]
  );

  const startSingle = (typeId) => {
    setMode("single");
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setScreen("quiz");
    buildQuestion(typeId, false);
  };

  const startMixed = () => {
    setMode("mixed");
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setLastMixedId(null);
    setScreen("quiz");
    buildQuestion(null, true);
  };

  const choose = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const wasCorrect = question.choices[idx].correct;
    setScore((s) => ({ correct: s.correct + (wasCorrect ? 1 : 0), total: s.total + 1 }));
    setStreak((s) => (wasCorrect ? s + 1 : 0));
  };

  const next = () => {
    buildQuestion(mode === "single" ? activeTypeId : null, mode === "mixed");
  };

  const goHome = () => {
    setScreen("home");
    setQuestion(null);
  };

  return (
    <div className="app-root">
      {screen === "home" && (
        <>
          <Header />
          <MixedCard onClick={startMixed} />
          <TypeGrid onSelect={startSingle} />
        </>
      )}

      {screen === "quiz" && (
        <QuizScreen
          question={question}
          activeType={getType(activeTypeId)}
          mode={mode}
          score={score}
          streak={streak}
          selected={selected}
          answered={answered}
          onChoose={choose}
          onNext={next}
          onBack={goHome}
        />
      )}
    </div>
  );
}
