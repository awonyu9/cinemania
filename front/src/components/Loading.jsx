export default function Loading({ message }) {
  return (
    <div className='Loading'>
      <div className='icon'></div>
      {message && <p>{message}</p>}
    </div>
  );
}
