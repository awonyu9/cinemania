import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { fetchQuiz } from '../utils';
import MoviePoster from '../components/MoviePoster';

export default function Results() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { movie, score, n_questions } = location.state;

  // for test purposes:
  // const movie = {
  //   plot: 'this',
  //   poster:
  //     'https://image.tmdb.org/t/p/original/8qQmKfcowF34ZLKilPGJGsNd4FW.jpg',
  //   title: 'The Movie',
  //   year: '2000',
  // };
  // const score = 10;
  // const n_questions = 10;

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
        Movie: <span className='italics'>{movie.title}</span> ({movie.year})
      </h2>

      <p>
        Final score: {score}/{n_questions}
      </p>

      <MoviePoster
        poster={movie.poster}
        year={movie.year}
      />

      <div className='nav-buttons'>
        <button
          type='button'
          onClick={async () => {
            setLoading(true);
            const res = await fetchQuiz(movie.title, movie.plot);
            const questions = await res.json();
            setQuizQuestions([...JSON.parse(questions)]);
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

      {isLoading && <Loading message='Generating quiz...' />}
    </div>
  );
}
