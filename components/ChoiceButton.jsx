export default function ChoiceButton({ choice, index, answered, selected, onClick }) {
  let cls = "choice-btn";
  if (answered) {
    if (choice.correct) cls += " correct";
    else if (index === selected) cls += " incorrect";
  }

  return (
    <button className={cls} disabled={answered} onClick={onClick}>
      <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
      <span>{choice.text}</span>
    </button>
  );
}
