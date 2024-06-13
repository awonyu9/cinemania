import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MoviePoster from '../components/MoviePoster';

export default function Home() {
  const [movieQuery, setMovieQuery] = useState('a');
  const [movieResults, setMovieResults] = useState([]);

  useEffect(() => {
    async function searchMovies() {
      const res = await fetch('http://localhost:5000/search_movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query: movieQuery }),
      });
      const data = await res.json();
      // console.warn('data', data);
      setMovieResults([...data.results]);
      // setQuizQuestions([...questions]);
      // console.warn('jsonified', JSON.parse(data));
      // setPlot(data.plot);
    }
    searchMovies();
  }, [movieQuery]);

  return (
    <div className='Home'>
      <label htmlFor='searchMovieInput'>Search for a movie</label>
      <input
        type='text'
        id='searchMovieInput'
        value={movieQuery}
        onChange={(e) => setMovieQuery(e.target.value)}
      />

      <div className='movie-results'>
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
      </div>

      <Outlet />
    </div>
  );
}
{
  /* <div className="autocomplete">
            <Autocomplete
              items={chosenPlaylistTrackNames}
              shouldItemRender={(item, value) => (
                item.toLowerCase().indexOf(value.toLowerCase()) > -1
                && value !== ""
              )}
              getItemValue={item => item}
              renderItem={(item, isHighlighted) => (
                <div key={item} className={isHighlighted ? "suggestion selected" : "suggestion no-selected"}>
                  {item}
                </div>
              )}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSelect={(value) => setInputValue(value)}
              inputProps={{
                placeholder: "Guess the song title here",
                className:"input"
              }}
              renderMenu={items => (
                <div className="menu" children={items} />
              )}
            />
          </div> */
}
