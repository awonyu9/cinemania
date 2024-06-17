export default function MoviePoster({
  title,
  poster,
  year,
  director = null,
  isBackdrop,
}) {
  return (
    <div className='MoviePoster'>
      <img
        src={poster}
        alt={`Movie ${isBackdrop ? 'backdrop' : 'poster'} for ${title}`}
      />
      {title && (
        <p>
          <span className='italics'>{title}</span>
          {year && ` (${year})`} {director && `by ${director}`}
        </p>
      )}
    </div>
  );
}
