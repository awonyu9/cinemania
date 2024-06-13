import { useNavigate, useParams } from 'react-router-dom';
import MoviePoster from '../components/MoviePoster';
import { useEffect, useState } from 'react';

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
        // console.warn('details:', details);
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
        const res = await fetch('http://localhost:5000/get_plot', {
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
        if (res.status === 404) {
          setQuizAvailable(false);
        } else {
          const data = await res.json();
          console.warn('plot:', data.plot);
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
            <p>
              Unfortunately, a quiz can&apos;t be generated due to insufficient
              movie data.
            </p>
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
