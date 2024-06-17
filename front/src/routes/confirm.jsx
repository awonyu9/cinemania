import { useNavigate, useParams } from 'react-router-dom';
import MoviePoster from '../components/MoviePoster';
import { useEffect, useState } from 'react';
import { fetchPlot } from '../utils';
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
        setChosenMovie({
          title: details.movie_title,
          year: details.release_year,
          poster: details.poster_url,
          backdrop: details.backdrop_url,
          director: details.director,
        });
      } catch (error) {
        console.error(error);
      }
    }

    getMovieDetails();
  }, [id]);

  useEffect(() => {
    setMoviePlot(undefined);
    setWaitingForPlot(true);

    async function getPlot() {
      try {
        const res = await fetchPlot(chosenMovie);
        if (res.status !== 404) {
          const data = await res.json();
          setMoviePlot(data.plot);
        }
      } catch (error) {
        console.error(error);
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
