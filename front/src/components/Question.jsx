import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import QuizOption from './QuizOption';
import { useEffect, useRef } from 'react';

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
  // const context = useOutletContext();
  // const { n_question } = useParams();
  // const question = context.questions[n_question - 1];
  const navigate = useNavigate();
  const question = questions[n - 1];
  const timeout = 1000;
  const latestScore = useRef(score);
  console.log('in question, movie:', movie);
  // console.log('outlet q', context.questions, n_question);

  function handleClick() {
    setTimeout(() => {
      if (currentQuestion < questions.length) {
        setCurrentQuestion((curr) => curr + 1);
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
            correct={option.correct}
            timeout={timeout}
            setScore={setScore}
            onClick={handleClick}
            key={j}
          />
        ))}
      </div>
    </div>
  );
}
