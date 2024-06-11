import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MoviePoster from '../components/Movie';

export default function Home() {
  const [movieQuery, setMovieQuery] = useState('');
  const [movieResults, setMovieResults] = useState([
    { title: 'Barbie', id: 1, poster: '../src/assets/react.svg' },
  ]);

  return (
    <div className='Home'>
      <label htmlFor='searchMovieInput'>Search for a movie</label>
      <input
        type='text'
        id='searchMovieInput'
      />

      <div className='movie-results'>
        {movieResults?.map((movie) => (
          <MoviePoster
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster}
          />
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
