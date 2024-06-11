import { useParams } from 'react-router-dom';
import MoviePoster from '../components/Movie';

export default function Confirm() {
  const { id } = useParams();
  // get title, poster, year of movie with matching ID with API call?
  const title = 'Oppenheimer';
  const poster = '../src/assets/react.svg';

  async function getQuiz() {
    // fetch http://localhost:5000/get_quiz, sending movie_name, movie_year
    // redirect to /quiz
  }

  return (
    <div className='Confirm'>
      <MoviePoster
        id={id}
        title={title}
        poster={poster}
      />

      <button
        type='button'
        onClick={getQuiz}
      >
        Start quiz
      </button>
    </div>
  );
}
