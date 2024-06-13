import { Outlet, useNavigate } from 'react-router-dom';

export default function Root() {
  const navigate = useNavigate();
  return (
    <div className='Root'>
      <header>
        <h1 onClick={() => navigate('/')}>Cinemania</h1>
        <hr />
      </header>

      <Outlet />
    </div>
  );
}
