/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function QuizOption({ text, correct }) {
  const [correctClass, setCorrectClass] = useState('');
  function checkAnswer() {
    if (correct) {
      setCorrectClass('correct');
    } else {
      setCorrectClass('incorrect');
    }
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
