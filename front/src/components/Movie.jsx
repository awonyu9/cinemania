import { Link } from 'react-router-dom';

export default function MoviePoster({ id, title, poster }) {
  return (
    <div className='MoviePoster'>
      <Link to={`/confirm/${id}`}>
        <img
          src={poster}
          alt={`Movie poster for ${title}`}
        />
        <p>{title}</p>
      </Link>
    </div>
  );
}
