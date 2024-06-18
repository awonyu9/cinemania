import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import Question from '../components/Question.jsx';
import MoviePoster from '../components/MoviePoster.jsx';

export default function Quiz() {
  const location = useLocation();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const { movie, questions } = location.state;

  return (
    <div className='Quiz'>
      <MoviePoster
        year={movie.year}
        poster={movie.backdrop}
        isBackdrop
      />
      <h2>
        Movie: <span className='italics'>{movie.title}</span> ({movie.year})
      </h2>

      <Question
        movie={movie}
        movieId={id}
        score={score}
        setScore={setScore}
        questions={questions}
        n={currentQuestion}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />
    </div>
  );
}
