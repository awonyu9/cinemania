import { useEffect, useState } from 'react';

export default function QuizOption({
  text,
  isCorrect,
  isSelected,
  hasStarted,
  timeout,
  setSelectedOption,
  setScore,
  onClick,
}) {
  const [correctClass, setCorrectClass] = useState('');

  useEffect(() => {
    if (hasStarted) {
      if (isCorrect) {
        setCorrectClass('correct');
        if (isSelected) {
          setScore((curr) => curr + 1);
        }
      } else {
        if (isSelected) {
          setCorrectClass('incorrect');
        }
      }
      setTimeout(() => setCorrectClass(''), timeout);
    }
  }, [hasStarted, isCorrect, isSelected, setScore, timeout]);

  return (
    <button
      type='button'
      className={`QuizOption ${correctClass}`}
      onClick={() => {
        setSelectedOption(text);
        onClick();
      }}
    >
      {text}
    </button>
  );
}
