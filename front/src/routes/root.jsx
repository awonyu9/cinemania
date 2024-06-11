import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div className='Root'>
      <header>
        <h1>
          <Link to='/'>Cinemania</Link>
        </h1>
        <hr />
      </header>

      <Outlet />
    </div>
  );
}
