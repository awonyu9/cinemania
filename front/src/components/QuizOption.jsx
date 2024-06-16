import { useState } from 'react';

export default function QuizOption({
  text,
  correct,
  timeout,
  setScore,
  onClick,
}) {
  const [correctClass, setCorrectClass] = useState('');
  function checkAnswer() {
    if (correct) {
      setCorrectClass('correct');
      setScore((curr) => curr + 1);
    } else {
      setCorrectClass('incorrect');
    }
    onClick();
    setTimeout(() => setCorrectClass(''), timeout);
  }

  return (
    <button
      type='button'
      className={`Option ${correctClass}`}
      onClick={checkAnswer}
    >
      {text}
    </button>
  );
}
