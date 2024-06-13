/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export default function MoviePoster({ id, title, poster, date }) {
  // console.log('poster prop', poster);
  return (
    <div className='MoviePoster'>
      <img
        src={`${poster}`}
        alt={`Movie poster for ${title}`}
      />
      <p>
        <span>{title}</span> ({date.slice(0, 4)})
      </p>
    </div>
  );
}
