/* eslint-disable react/prop-types */

export default function MoviePoster({ title, poster, year, director = null }) {
  // console.log('poster prop', poster);
  return (
    <div className='MoviePoster'>
      <img
        src={poster}
        alt={`Movie poster for ${title}`}
      />
      <p>
        <span className='italics'>{title}</span>
        {year && ` (${year})`} {director && `by ${director}`}
      </p>
    </div>
  );
}
