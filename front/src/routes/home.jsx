import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export default function Home() {
  const navigate = useNavigate();
  const [movieQuery, setMovieQuery] = useState(null);
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
        <ReactSearchAutocomplete
          items={movieResults}
          className='search-bar'
          fuseOptions={{ keys: ['title', 'original_title', 'release_date'] }}
          resultStringKeyName='title'
          placeholder='Start typing...'
          autoFocus
          inputDebounce={500}
          maxResults={15}
          formatResult={(movie) => (
            <>
              <span className='italics'>{movie.title}</span>
              {` (${movie.release_date.slice(0, 4)})`}
            </>
          )}
          styling={{
            borderRadius: '0',
            iconColor: 'black',
            searchIconMargin: '0 0 0 10px',
            clearIconMargin: '10px 10px 0 0',
          }}
          onSearch={(string) => {
            setMovieQuery(string);
          }}
          onSelect={(movie) => {
            navigate(`/confirm/${movie.id}`);
          }}
        />
      </div>

      <Outlet />
    </div>
  );
}
