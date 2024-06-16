import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function Results() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { movie, score, n_questions } = location.state;
  console.warn('results movie and score', movie, score);

  // async function generateNewQuiz() {}

  useEffect(() => {
    console.log('quizQuestions', quizQuestions);
    if (quizQuestions.length > 0) {
      navigate(`/play/${id}`, {
        state: { movie, questions: quizQuestions },
      });
    }
  }, [quizQuestions]);

  return (
    <div className='Results'>
      <h2>
        Movie: <span className='italics'>{movie.title}</span> (
        {movie.date.slice(0, 4)})
      </h2>
      <p>
        Final score: {score}/{n_questions}
      </p>
      <img
        src={movie.poster}
        alt={`Movie poster for ${movie.title}`}
      />
      <div className='nav-buttons'>
        <button
          type='button'
          onClick={async () => {
            // ***START HERE***
            // TODO: function I put in utils should be fetchQuiz, not fetchPlot
            // so I just did this in a dirty way for the time being
            try {
              setLoading(true);
              const res = await fetch('http://localhost:5000/get_quiz', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
                body: JSON.stringify({
                  movie_title: movie.title,
                  plot: movie.plot,
                }),
              });
              const questions = await res.json();
              console.log('questions', questions);
              setQuizQuestions([...JSON.parse(questions)]);
            } catch (error) {
              console.error();
            }
          }}
        >
          Same movie, different quiz
        </button>
        <button
          type='button'
          onClick={() => navigate('/')}
        >
          New movie, new quiz
        </button>
      </div>
      {isLoading && (
        <div className='loading-container'>
          <div className='loading-icon'></div>
          <p>Generating quiz...</p>
        </div>
      )}
    </div>
  );
}
