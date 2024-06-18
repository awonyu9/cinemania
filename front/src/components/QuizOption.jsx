export default function QuizOption({
  text,
  isCorrect,
  getClassName,
  setSelectedOption,
  setScore,
  onClick,
}) {
  return (
    <button
      type='button'
      className={`QuizOption ${getClassName()}`}
      onClick={() => {
        setSelectedOption(text);
        isCorrect && setScore((curr) => curr + 1);
        onClick();
      }}
    >
      {text}
    </button>
  );
}
