import { useNavigate, useParams } from 'react-router-dom';
import MoviePoster from '../components/MoviePoster';
import { useEffect, useState } from 'react';

export default function Confirm() {
  const { id } = useParams();
  const navigate = useNavigate();
  // get title, poster, year of movie with matching ID with API call?
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isQuizAvailable, setQuizAvailable] = useState(false);
  const [chosenMovie, setChosenMovie] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  async function getQuiz() {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/get_quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          movie_title: chosenMovie.title,
          movie_year: chosenMovie.date.slice(0, 4),
        }),
      });
      // console.warn('res', await res.json());
      // ***START HERE: handling 404 error specifically, as it's user-directed
      // if (res.status === 200) {
      const questions = await res.json();
      console.warn('data', questions, JSON.parse(questions));
      setQuizQuestions([...JSON.parse(questions)]);
      // } else {
      //   console.error(res.error);
      // }
    } catch (error) {
      console.error();
    }
  }

  useEffect(() => {
    async function getMovieDetails() {
      const res = await fetch('http://localhost:5000/get_movie_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ movie_id: id }),
      });
      const details = await res.json();
      console.warn('details:', details);
      setChosenMovie({
        title: details.movie_title,
        date: details.release_date,
        poster: details.poster_url,
        director: details.director,
      });
    }

    getMovieDetails();
  }, [id]);

  useEffect(() => {
    if (quizQuestions.length > 0) {
      navigate(`/play/${id}`, {
        state: { movieTitle: chosenMovie.title, questions: quizQuestions },
      });
    }
  }, [quizQuestions]); // TODO: try adding 'navigate' to dependencies

  return (
    <div className='Confirm'>
      {chosenMovie && (
        <>
          <MoviePoster
            id={id}
            title={chosenMovie.title}
            poster={chosenMovie.poster}
            date={chosenMovie.date}
          />

          {isLoading ? (
            <div className='loading-container'>
              <div className='loading-icon'></div>
              <p>Generating quiz...</p>
            </div>
          ) : (
            <button
              type='button'
              onClick={getQuiz}
            >
              Start quiz
            </button>
          )}
        </>
      )}

      {/* {quizQuestions.length > 0 && (
        <button
          type='button'
          onClick={() =>
            navigate('/play', {
              state: { movieTitle: title, questions: quizQuestions },
            })
          }
        >
          Go to quiz
        </button>
      )} */}
    </div>
  );
}
