/* eslint-disable react/prop-types */

export default function MoviePoster({ title, poster, date, director = null }) {
  // console.log('poster prop', poster);
  return (
    <div className='MoviePoster'>
      <img
        src={poster}
        alt={`Movie poster for ${title}`}
      />
      <p>
        <span className='italics'>{title}</span>
        {date && ` (${date.slice(0, 4)})`} {director && `by ${director}`}
      </p>
    </div>
  );
}
