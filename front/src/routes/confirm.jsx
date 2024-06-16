import { useNavigate, useParams } from 'react-router-dom';
import MoviePoster from '../components/MoviePoster';
import { useEffect, useState } from 'react';
import { fetchPlot } from '../utils';

export default function Confirm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [moviePlot, setMoviePlot] = useState(undefined);
  const [isQuizAvailable, setQuizAvailable] = useState(true);
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
          plot: moviePlot,
        }),
      });
      const questions = await res.json();
      console.warn('data', questions, JSON.parse(questions));
      setQuizQuestions([...JSON.parse(questions)]);
    } catch (error) {
      console.error();
    }
  }

  useEffect(() => {
    async function getMovieDetails() {
      try {
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
      } catch (error) {
        console.error(error);
      }
    }

    getMovieDetails();
  }, [id]);

  useEffect(() => {
    async function getPlot() {
      try {
        const res = await fetchPlot(chosenMovie);
        if (res.status === 404) {
          setQuizAvailable(false);
        } else {
          const data = await res.json();
          // console.warn('plot:', data.plot);
          setMoviePlot(data.plot);
        }
      } catch (error) {
        console.error('catch', error);
      }
    }

    chosenMovie && getPlot();
  }, [chosenMovie]);

  useEffect(() => {
    if (quizQuestions.length > 0) {
      navigate(`/play/${id}`, {
        state: { movie: chosenMovie, questions: quizQuestions },
      });
    }
  }, [quizQuestions]); // TODO: try adding 'navigate' to dependencies

  return (
    <div className='Confirm'>
      {chosenMovie && (
        <>
          <MoviePoster
            title={chosenMovie.title}
            poster={chosenMovie.poster}
            date={chosenMovie.date}
            director={chosenMovie.director}
          />

          {moviePlot && isQuizAvailable ? (
            isLoading ? (
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
            )
          ) : (
            <p className='no-quiz-message'>
              Unfortunately, a quiz cannot be generated due to insufficient
              movie data.
            </p>
          )}
        </>
      )}
    </div>
  );
}
