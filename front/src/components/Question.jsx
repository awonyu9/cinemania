import { useNavigate } from 'react-router-dom';
import QuizOption from './QuizOption';
import { useEffect, useRef, useState } from 'react';

export default function Question({
  movie,
  movieId,
  questions,
  n,
  score,
  setScore,
  currentQuestion,
  setCurrentQuestion,
}) {
  const navigate = useNavigate();
  const question = questions[n - 1];
  const timeout = 1000;
  const latestScore = useRef(score);

  const [selectedOption, setSelectedOption] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  function handleClick() {
    setHasStarted(true);
    setTimeout(() => {
      if (currentQuestion < questions.length) {
        setCurrentQuestion((curr) => curr + 1);
        setHasStarted(false);
      } else {
        navigate(`/results/${movieId}`, {
          state: {
            movie,
            score: latestScore.current,
            n_questions: questions.length,
          },
        });
      }
    }, timeout);
  }

  function getOptionClassName(option) {
    if (hasStarted) {
      if (option.correct) return 'correct';
      else if (selectedOption === option.text) return 'incorrect';
    }
  }

  useEffect(() => {
    latestScore.current = score;
  }, [score]);

  return (
    <div className='Question'>
      <p>
        Q{n}: {question.question}
      </p>
      <div className='question-block'>
        {question.options.map((option, j) => (
          <QuizOption
            text={option.text}
            isCorrect={option.correct}
            getClassName={() => getOptionClassName(option)}
            setSelectedOption={setSelectedOption}
            setScore={setScore}
            onClick={handleClick}
            key={j}
          />
        ))}
      </div>
    </div>
  );
}
