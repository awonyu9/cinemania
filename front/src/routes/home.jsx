import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import MoviePoster from '../components/MoviePoster';

export default function Home() {
  const navigate = useNavigate();
  const [movieQuery, setMovieQuery] = useState('');
  const [movieResults, setMovieResults] = useState([]);

  useEffect(() => {
    async function searchMovies() {
      try {
        const res = await fetch('http://localhost:5000/search_movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ query: movieQuery }),
        });
        const data = await res.json();
        console.warn('data', data);
        setMovieResults([...data.results]);
      } catch (error) {
        console.error(error);
      }
    }
    searchMovies();
  }, [movieQuery]);

  return (
    <div className='Home'>
      <div className='search-bar-container'>
        <label htmlFor='searchMovieInput'>Search for a movie</label>
        {/* <input
          type='text'
          id='searchMovieInput'
          value={movieQuery}
          onChange={(e) => setMovieQuery(e.target.value)}
        /> */}
        {movieResults && (
          <ReactSearchAutocomplete
            items={movieResults}
            className='search-bar'
            inputSearchString={movieQuery}
            fuseOptions={{ keys: ['title', 'original_title', 'release_date'] }}
            resultStringKeyName='title'
            placeholder='Start typing...'
            autoFocus
            inputDebounce={500}
            formatResult={(movie) => (
              <>
                <span className='italics'>{movie.title}</span>{' '}
                {`(${movie.release_date.slice(0, 4)})`}
              </>
            )}
            styling={{
              borderRadius: '0',
              iconColor: 'black',
              searchIconMargin: '0 0 0 10px',
              clearIconMargin: '10px 10px 0 0',
            }}
            onSearch={(string, results) => {
              console.log('onsearch', string, results);
              setMovieQuery(string);
            }}
            onSelect={(movie) => {
              console.log('onselect', movie);
              navigate(`/confirm/${movie.id}`);
            }}
          />
        )}
      </div>

      {/* <div className='movie-results'>
        {movieResults?.map((movie) => (
          <Link
            to={`/confirm/${movie.id}`}
            key={movie.id}
          >
            <MoviePoster
              id={movie.id}
              title={movie.title}
              poster={'https://image.tmdb.org/t/p/w200/' + movie.poster_path}
              date={movie.release_date}
            />
          </Link>
        ))}
      </div> */}

      <Outlet />
    </div>
  );
}
