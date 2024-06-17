import { useNavigate, useParams } from 'react-router-dom';
import MoviePoster from '../components/MoviePoster';
import { useEffect, useState } from 'react';
import { fetchMovieDetails, fetchPlot, fetchQuiz } from '../utils';
import Loading from '../components/Loading';

export default function Confirm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [moviePlot, setMoviePlot] = useState(undefined);
  const [chosenMovie, setChosenMovie] = useState(undefined);
  const [waitingForPlot, setWaitingForPlot] = useState(true);
  const [waitingForQuiz, setWaitingForQuiz] = useState(false);

  async function getQuiz() {
    setWaitingForQuiz(true);
    const res = await fetchQuiz(chosenMovie.title, moviePlot);
    const questions = await res.json();
    setQuizQuestions([...JSON.parse(questions)]);
  }

  useEffect(() => {
    async function getMovieDetails() {
      const res = await fetchMovieDetails(id);
      const details = await res.json();
      setChosenMovie({
        title: details.movie_title,
        year: details.release_year,
        poster: details.poster_url,
        backdrop: details.backdrop_url,
        director: details.director,
      });
    }

    getMovieDetails();
  }, [id]);

  useEffect(() => {
    setMoviePlot(undefined);
    setWaitingForPlot(true);

    async function getPlot() {
      const res = await fetchPlot(chosenMovie);
      if (res.status !== 404) {
        const data = await res.json();
        setMoviePlot(data.plot);
      }
      setWaitingForPlot(false);
    }

    chosenMovie && getPlot();
  }, [chosenMovie]);

  useEffect(() => {
    if (quizQuestions.length > 0) {
      navigate(`/play/${id}`, {
        state: {
          movie: { ...chosenMovie, plot: moviePlot },
          questions: quizQuestions,
        },
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
            year={chosenMovie.year}
            director={chosenMovie.director}
          />

          {waitingForPlot ? (
            <Loading />
          ) : moviePlot ? (
            waitingForQuiz ? (
              <Loading message='Generating quiz...' />
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
